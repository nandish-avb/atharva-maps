// Atharva's World — Europe puzzle engine.
import { MAP_W, MAP_H, SHAPES } from './map-europe.js';
import { COUNTRIES, LEVELS, UI_AUDIO, VISUALS } from './data.js';

// Split an emoji string into whole emoji (handles 🧜‍♀️-style joined ones).
const graphemes = s => typeof Intl.Segmenter !== 'undefined'
  ? [...new Intl.Segmenter('en', { granularity: 'grapheme' }).segment(s)].map(x => x.segment)
  : [...s];

const SVGNS = 'http://www.w3.org/2000/svg';
const $ = id => document.getElementById(id);

/* Short display names so labels fit inside small countries */
const SHORT = {
  gb: 'UK', ch: 'Switz.', nl: 'Nethlds.', be: 'Belg.', lu: 'Lux.',
  cz: 'Czechia', dk: 'Denm.', ee: 'Est.', lv: 'Lat.', lt: 'Lith.',
  ba: 'Bosnia', mk: 'N.Maced.', me: 'Monten.', si: 'Sloven.', xk: 'Kosovo',
  hr: 'Croatia', md: 'Moldova', al: 'Alban.',
};

/* ================= Audio ================= */
const audio = (() => {
  let current = null;
  let queue = [];
  let unlocked = false;
  let muted = false;
  let token = 0;   // bumped on stop(): stale clips can never advance the queue

  function src(key) { return 'assets/audio/' + key + '.mp3'; }

  function stop() {
    token++;
    queue = [];
    if (current) {
      current.onended = current.onerror = null;
      current.pause();
      current = null;
    }
  }

  function playNext() {
    if (!queue.length) { current = null; return; }
    const myToken = token;
    const key = queue.shift();
    const a = new Audio(src(key));
    current = a;
    let done = false;
    // A slow-loading clip that gets interrupted rejects its play() promise
    // AND may fire onerror — without this guard each interruption spawned a
    // second playback chain (overlapping, repeating speech on slow networks).
    const advance = () => {
      if (done || myToken !== token || current !== a) return;
      done = true;
      playNext();
    };
    a.onended = advance;
    a.onerror = advance;           // missing clip: skip silently
    a.play().catch(advance);
  }

  function speak(keys, { interrupt = true } = {}) {
    if (!unlocked || muted) return;
    if (!Array.isArray(keys)) keys = [keys];
    if (interrupt) stop();
    queue.push(...keys);
    if (!current) playNext();
  }

  return {
    speak, stop,
    unlock() { unlocked = true; },
    get idle() { return !current && !queue.length; },
    setMuted(m) { muted = m; if (m) stop(); },
  };
})();

const praise = () => 'praise_' + (1 + Math.floor(Math.random() * 5));
const tryAgain = () => 'try_again_' + (1 + Math.floor(Math.random() * 2));

/* ================= Single-instance guard =================
   If the app is open in two tabs/windows, both play sounds and the user
   hears everything doubled. The newest window claims playback; older ones
   mute and show a tap-to-resume curtain. */
const instanceId = String(performance.now()) + Math.random();
let channel = null;
try {
  channel = new BroadcastChannel('atharva-maps');
  channel.onmessage = ev => {
    if (ev.data && ev.data.type === 'claim' && ev.data.id !== instanceId) {
      audio.setMuted(true);
      $('curtain').classList.remove('hidden');
    }
  };
} catch (e) { /* very old browser: skip */ }

function claimPlayback() {
  if (channel) channel.postMessage({ type: 'claim', id: instanceId });
  audio.setMuted(false);
  $('curtain').classList.add('hidden');
}

/* ================= State ================= */
const SAVE_KEY = 'atharva-maps-europe-v1';
const state = {
  placed: new Set(),
  level: 0,
  mode: 'puzzle',        // puzzle | flags | capitals
  selectedChip: null,    // cc selected by tap
  quizTarget: null,
  fails: {},             // cc -> miss count (for slot hints)
  lastSpoken: null,      // for the 🔊 replay button
  labels: true,          // country-name labels (for assisting adults)
};

function save() {
  try {
    localStorage.setItem(SAVE_KEY, JSON.stringify({
      placed: [...state.placed], level: state.level, labels: state.labels,
    }));
  } catch (e) { /* private mode etc. */ }
}
function load() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return;
    const d = JSON.parse(raw);
    state.placed = new Set(d.placed || []);
    state.level = Math.min(d.level || 0, LEVELS.length - 1);
    if (d.labels === false) state.labels = false;
  } catch (e) { /* ignore corrupt save */ }
}

const levelCcs = () => LEVELS[state.level].ccs;

/* ================= Board ================= */
const board = $('board');
const boardWrap = $('board-wrap');
const paths = {};    // cc -> <path>
const markers = {};  // cc -> tiny <circle> at slot centroid (for screen positions)
const labels = {};   // cc -> <text>

function buildBoard() {
  for (const [cc, s] of Object.entries(SHAPES)) {
    const p = document.createElementNS(SVGNS, 'path');
    p.setAttribute('d', s.d);
    p.dataset.cc = cc;
    p.classList.add('country');
    board.appendChild(p);
    paths[cc] = p;

    const m = document.createElementNS(SVGNS, 'circle');
    m.setAttribute('cx', s.cx);
    m.setAttribute('cy', s.cy);
    m.setAttribute('r', 0.5);
    m.setAttribute('fill', 'none');
    m.setAttribute('pointer-events', 'none');
    board.appendChild(m);
    markers[cc] = m;
  }
  // Labels on top of every shape
  const lg = document.createElementNS(SVGNS, 'g');
  lg.id = 'labels';
  for (const [cc, s] of Object.entries(SHAPES)) {
    const t = document.createElementNS(SVGNS, 'text');
    t.textContent = SHORT[cc] || COUNTRIES[cc].name;
    t.setAttribute('x', s.cx);
    t.setAttribute('y', s.cy);
    const size = Math.sqrt((s.x1 - s.x0) * (s.y1 - s.y0));
    t.setAttribute('font-size', Math.max(9, Math.min(size * 0.2, 26)));
    t.classList.add('label');
    lg.appendChild(t);
    labels[cc] = t;
  }
  board.appendChild(lg);
}

function refreshBoard() {
  const level = new Set(levelCcs());
  for (const [cc, p] of Object.entries(paths)) {
    p.classList.remove('future', 'slot', 'placed', 'hint');
    p.removeAttribute('fill');
    const t = labels[cc];
    t.classList.remove('on-placed', 'on-slot');
    if (state.placed.has(cc)) {
      p.classList.add('placed');
      p.setAttribute('fill', COUNTRIES[cc].color);
      t.classList.add('on-placed');
    } else if (level.has(cc)) {
      p.classList.add('slot');
      if ((state.fails[cc] || 0) >= 2) p.classList.add('hint');
      t.classList.add('on-slot');
    } else {
      p.classList.add('future');
    }
  }
  document.body.classList.toggle('nolabels', !state.labels);
  $('btn-labels').classList.toggle('active', state.labels);
}

function slotScreenPos(cc) {
  const r = markers[cc].getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

/* ================= View (zoom / pan camera) ================= */
const FULL = { x: 0, y: 0, w: MAP_W, h: MAP_H };
const MIN_W = MAP_W * 0.18;   // max zoom-in ≈ 5.5x
const MAX_W = MAP_W * 1.08;
let view = { ...FULL };
let viewAnim = null;

function applyView() {
  board.setAttribute('viewBox', `${view.x} ${view.y} ${view.w} ${view.h}`);
  if (typeof rp !== 'undefined' && rp) positionQ();  // ❓ follows the camera
}

function renderScale() {
  const r = board.getBoundingClientRect();
  return Math.min(r.width / view.w, r.height / view.h);
}

function screenToMap(px, py) {
  const r = board.getBoundingClientRect();
  const rs = renderScale();
  const offX = (r.width - view.w * rs) / 2;
  const offY = (r.height - view.h * rs) / 2;
  return { x: view.x + (px - r.left - offX) / rs, y: view.y + (py - r.top - offY) / rs };
}

function clampView(v) {
  v.w = Math.max(MIN_W, Math.min(v.w, MAX_W));
  v.h = v.w * (MAP_H / MAP_W);
  const mX = v.w * 0.12, mY = v.h * 0.12;
  v.x = Math.max(-mX, Math.min(v.x, MAP_W - v.w + mX));
  v.y = Math.max(-mY, Math.min(v.y, MAP_H - v.h + mY));
  return v;
}

function setView(v, animate = true) {
  const target = clampView({ ...v });
  if (viewAnim) cancelAnimationFrame(viewAnim);
  if (!animate) { view = target; applyView(); return; }
  const from = { ...view };
  const t0 = performance.now();
  const DUR = 340;
  const ease = t => 1 - Math.pow(1 - t, 3);
  const step = now => {
    const t = Math.min(1, (now - t0) / DUR);
    const k = ease(t);
    view = {
      x: from.x + (target.x - from.x) * k,
      y: from.y + (target.y - from.y) * k,
      w: from.w + (target.w - from.w) * k,
      h: from.h + (target.h - from.h) * k,
    };
    applyView();
    if (t < 1) viewAnim = requestAnimationFrame(step);
    else viewAnim = null;
  };
  viewAnim = requestAnimationFrame(step);
}

function fitCcs(ccs, pad = 0.22) {
  if (!ccs.length) return { ...FULL };
  let x0 = Infinity, y0 = Infinity, x1 = -Infinity, y1 = -Infinity;
  for (const cc of ccs) {
    const s = SHAPES[cc];
    x0 = Math.min(x0, s.x0); y0 = Math.min(y0, s.y0);
    x1 = Math.max(x1, s.x1); y1 = Math.max(y1, s.y1);
  }
  let w = (x1 - x0) * (1 + pad * 2), h = (y1 - y0) * (1 + pad * 2);
  // match the board's aspect so the region fills the frame
  const aspect = MAP_W / MAP_H;
  if (w / h < aspect) w = h * aspect; else h = w / aspect;
  return { x: (x0 + x1) / 2 - w / 2, y: (y0 + y1) / 2 - h / 2, w, h };
}

function zoomAt(px, py, factor) {
  const pt = screenToMap(px, py);
  const w = Math.max(MIN_W, Math.min(view.w / factor, MAX_W));
  const f = view.w / w;
  setView({
    x: pt.x - (pt.x - view.x) / f,
    y: pt.y - (pt.y - view.y) / f,
    w, h: w * (MAP_H / MAP_W),
  }, false);
}

function boardCenter() {
  const r = board.getBoundingClientRect();
  return { x: r.left + r.width / 2, y: r.top + r.height / 2 };
}

const isFullView = () => view.w > MAP_W * 0.97;

function homeView() {
  // 🗺️ toggles between the whole map and the current level's region
  if (state.mode !== 'puzzle') {
    setView(isFullView() ? fitCcs([...state.placed]) : FULL);
  } else {
    setView(isFullView() ? fitCcs(levelCcs()) : FULL);
  }
}

/* ================= Layout ================= */
function fitBoard() {
  const tilt = $('board-tilt');
  const availW = boardWrap.clientWidth - 16;
  const availH = boardWrap.clientHeight - 12;
  const scale = Math.min(availW / MAP_W, availH / MAP_H);
  tilt.style.width = Math.floor(MAP_W * scale) + 'px';
  tilt.style.height = Math.floor(MAP_H * scale) + 'px';
}
window.addEventListener('resize', fitBoard);

/* ================= Tray ================= */
const tray = $('tray');

function chipSvg(cc) {
  const s = SHAPES[cc];
  const w = s.x1 - s.x0, h = s.y1 - s.y0;
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.setAttribute('viewBox', `${s.x0} ${s.y0} ${w} ${h}`);
  const p = document.createElementNS(SVGNS, 'path');
  p.setAttribute('d', s.d);
  p.setAttribute('fill', COUNTRIES[cc].color);
  p.setAttribute('stroke', '#fff');
  p.setAttribute('stroke-width', Math.max(w, h) / 40);
  svg.appendChild(p);
  return svg;
}

function buildTray() {
  tray.innerHTML = '';
  const remaining = levelCcs().filter(cc => !state.placed.has(cc));
  for (const cc of remaining) {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.dataset.cc = cc;
    chip.appendChild(chipSvg(cc));
    const name = document.createElement('span');
    name.className = 'chip-name';
    name.textContent = SHORT[cc] || COUNTRIES[cc].name;
    chip.appendChild(name);
    chip.addEventListener('pointerdown', e => onChipDown(e, cc, chip));
    tray.appendChild(chip);
  }
}

/* ================= Drag & drop ================= */
const fxLayer = $('fx-layer');
let drag = null; // {cc, chip, el, w, h, startX, startY, moved}

function onChipDown(e, cc, chip) {
  if (state.mode !== 'puzzle') return;
  e.preventDefault();
  audio.unlock();
  closeRolePlay(true);
  drag = { cc, chip, el: null, startX: e.clientX, startY: e.clientY, moved: false };
  audio.speak(cc + '_name');
  state.lastSpoken = [cc + '_name'];
  // If his slot is outside the current zoom, glide the camera to the level region.
  const slot = slotScreenPos(cc);
  const r = board.getBoundingClientRect();
  if (slot.x < r.left || slot.x > r.right || slot.y < r.top || slot.y > r.bottom) {
    setView(fitCcs(levelCcs()));
  }
  window.addEventListener('pointermove', onDragMove);
  window.addEventListener('pointerup', onDragUp);
  window.addEventListener('pointercancel', onDragUp);
}

function startFloating(e) {
  const { cc } = drag;
  const s = SHAPES[cc];
  const w = s.x1 - s.x0, h = s.y1 - s.y0;
  // Render at current zoom scale, but magnify tiny countries so he can see them.
  const scale = Math.max(renderScale(), 64 / Math.max(w, h));
  const svg = document.createElementNS(SVGNS, 'svg');
  svg.id = 'drag-piece';
  svg.setAttribute('viewBox', `${s.x0} ${s.y0} ${w} ${h}`);
  svg.setAttribute('width', w * scale);
  svg.setAttribute('height', h * scale);
  const p = document.createElementNS(SVGNS, 'path');
  p.setAttribute('d', s.d);
  p.setAttribute('fill', COUNTRIES[cc].color);
  p.setAttribute('stroke', '#fff');
  p.setAttribute('stroke-width', Math.max(w, h) / 50);
  svg.appendChild(p);
  fxLayer.appendChild(svg);
  drag.el = svg;
  drag.w = w * scale;
  drag.h = h * scale;
  drag.chip.classList.add('ghost');
  moveFloating(e);
}

function moveFloating(e) {
  // Held slightly above the finger so his hand doesn't hide the piece.
  drag.el.style.transform =
    `translate(${e.clientX - drag.w / 2}px, ${e.clientY - drag.h / 2 - 46}px)`;
}

function dragCenter(e) {
  return { x: e.clientX, y: e.clientY - 46 };
}

function onDragMove(e) {
  if (!drag) return;
  if (!drag.moved) {
    const dx = e.clientX - drag.startX, dy = e.clientY - drag.startY;
    if (dx * dx + dy * dy < 100) return;   // 10px threshold
    drag.moved = true;
    startFloating(e);
  } else {
    moveFloating(e);
  }
}

function onDragUp(e) {
  window.removeEventListener('pointermove', onDragMove);
  window.removeEventListener('pointerup', onDragUp);
  window.removeEventListener('pointercancel', onDragUp);
  if (!drag) return;
  const d = drag;
  drag = null;

  if (!d.moved) {           // it was a tap: select the chip
    selectChip(d.cc, d.chip);
    return;
  }
  d.chip.classList.remove('ghost');
  const c = dragCenter(e);
  d.el.remove();
  attemptPlace(d.cc, c.x, c.y, d.chip);
}

function selectChip(cc, chip) {
  const prev = tray.querySelector('.chip.selected');
  if (prev) prev.classList.remove('selected');
  if (state.selectedChip === cc) { state.selectedChip = null; return; }
  chip.classList.add('selected');
  state.selectedChip = cc;
}

function snapRadius(cc) {
  const s = SHAPES[cc];
  const size = Math.min(s.x1 - s.x0, s.y1 - s.y0) * renderScale();
  return Math.max(52, size * 0.6 + 24);   // generous for small fingers
}

function attemptPlace(cc, x, y, chip) {
  const slot = slotScreenPos(cc);
  const dist = Math.hypot(x - slot.x, y - slot.y);
  const hitEl = document.elementFromPoint(x, y);
  const onOwnSlot = hitEl === paths[cc];

  if (dist <= snapRadius(cc) || onOwnSlot) {
    placePiece(cc, chip);
  } else {
    state.fails[cc] = (state.fails[cc] || 0) + 1;
    if (state.fails[cc] >= 2) paths[cc].classList.add('hint');
    audio.speak(tryAgain());
    if (chip) {
      chip.classList.add('selected');
      setTimeout(() => chip.classList.remove('selected'), 300);
    }
  }
}

function placePiece(cc, chip) {
  state.placed.add(cc);
  state.fails[cc] = 0;
  state.selectedChip = null;
  save();
  if (chip) chip.classList.add('gone');

  refreshBoard();
  const p = paths[cc];
  p.classList.add('pop');
  setTimeout(() => p.classList.remove('pop'), 600);

  const slot = slotScreenPos(cc);
  confetti(slot.x, slot.y);
  cueBurst(cc, VISUALS[cc].icons);

  const clips = [praise(), cc + '_cue'];
  audio.speak(clips);
  state.lastSpoken = clips;

  const left = levelCcs().filter(k => !state.placed.has(k));
  if (!left.length) {
    setTimeout(levelComplete, 900);
  }
}

let celebTimer = null;
function levelComplete() {
  const isLast = state.level >= LEVELS.length - 1;
  $('celebrate').classList.remove('hidden');
  bigConfetti();
  audio.speak(isLast ? 'all_done' : 'level_done');
  clearTimeout(celebTimer);
  celebTimer = setTimeout(endCelebrate, isLast ? 4200 : 2600);
}
function endCelebrate() {
  if ($('celebrate').classList.contains('hidden')) return;
  clearTimeout(celebTimer);
  $('celebrate').classList.add('hidden');
  if (state.level < LEVELS.length - 1) {
    state.level++;
    save();
    refreshBoard();
    buildTray();
    updateLevelDots();
    setView(fitCcs(levelCcs()));
  } else {
    setView(FULL);
  }
}
// A tap skips the celebration — adults can push the pace.
$('celebrate').addEventListener('pointerdown', endCelebrate);

/* ================= Board gestures: pan / pinch / tap =================
   One pointer: tap (country info, tap-to-place) or pan when it moves.
   Two pointers: pinch zoom. Mouse wheel: zoom (laptop). */
const pointers = new Map();
let gesture = null;

boardWrap.addEventListener('pointerdown', e => {
  if (drag) return;                      // piece drag owns the pointer
  audio.unlock();
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
  if (pointers.size === 1) {
    gesture = {
      type: 'tap', id: e.pointerId,
      startX: e.clientX, startY: e.clientY,
      viewStart: { ...view }, rs: renderScale(),
    };
  } else if (pointers.size === 2 && gesture) {
    const [a, b] = [...pointers.values()];
    gesture = {
      type: 'pinch',
      d0: Math.hypot(a.x - b.x, a.y - b.y),
      mid: { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 },
      viewStart: { ...view }, w0: view.w,
    };
  }
});

boardWrap.addEventListener('pointermove', e => {
  if (!pointers.has(e.pointerId) || !gesture) return;
  pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

  if (gesture.type === 'pinch' && pointers.size >= 2) {
    const [a, b] = [...pointers.values()];
    const d1 = Math.hypot(a.x - b.x, a.y - b.y);
    if (d1 < 10) return;
    const w = Math.max(MIN_W, Math.min(gesture.w0 * gesture.d0 / d1, MAX_W));
    const f = gesture.viewStart.w / w;
    const pt = screenToMapWith(gesture.viewStart, gesture.mid.x, gesture.mid.y);
    view = clampView({
      x: pt.x - (pt.x - gesture.viewStart.x) / f,
      y: pt.y - (pt.y - gesture.viewStart.y) / f,
      w, h: w * (MAP_H / MAP_W),
    });
    applyView();
    return;
  }

  if (gesture.type === 'tap') {
    const dx = e.clientX - gesture.startX, dy = e.clientY - gesture.startY;
    if (dx * dx + dy * dy > 144) gesture.type = 'pan';   // 12px threshold
  }
  if (gesture.type === 'pan' && !isFullView()) {
    const dx = e.clientX - gesture.startX, dy = e.clientY - gesture.startY;
    view = clampView({
      ...gesture.viewStart,
      x: gesture.viewStart.x - dx / gesture.rs,
      y: gesture.viewStart.y - dy / gesture.rs,
    });
    applyView();
  }
});

function endPointer(e) {
  const wasTap = gesture && gesture.type === 'tap' && gesture.id === e.pointerId;
  pointers.delete(e.pointerId);
  if (!pointers.size) gesture = null;
  if (wasTap && !drag) handleBoardTap(e);
}
boardWrap.addEventListener('pointerup', endPointer);
boardWrap.addEventListener('pointercancel', e => {
  pointers.delete(e.pointerId);
  if (!pointers.size) gesture = null;
});

boardWrap.addEventListener('wheel', e => {
  e.preventDefault();
  zoomAt(e.clientX, e.clientY, Math.exp(-e.deltaY * 0.0016));
}, { passive: false });

function screenToMapWith(v, px, py) {
  const r = board.getBoundingClientRect();
  const rs = Math.min(r.width / v.w, r.height / v.h);
  const offX = (r.width - v.w * rs) / 2;
  const offY = (r.height - v.h * rs) / 2;
  return { x: v.x + (px - r.left - offX) / rs, y: v.y + (py - r.top - offY) / rs };
}

function handleBoardTap(e) {
  if (e.target.closest && e.target.closest('#zoomctl')) return;
  // Tap-to-place: a chip is selected, tapped somewhere on the board
  if (state.mode === 'puzzle' && state.selectedChip) {
    const scc = state.selectedChip;
    const chip = tray.querySelector(`.chip[data-cc="${scc}"]`);
    state.selectedChip = null;
    if (chip) chip.classList.remove('selected');
    attemptPlace(scc, e.clientX, e.clientY, chip);
    return;
  }

  const el = document.elementFromPoint(e.clientX, e.clientY);
  const cc = el && el.dataset ? el.dataset.cc : null;
  if (!cc || !state.placed.has(cc)) {
    if (rp) closeRolePlay();     // tapped the sea: dismiss the guess card
    return;
  }

  if (state.mode === 'puzzle') {
    flash(cc);
    openRolePlay(cc);            // guess first — never tell the name straight away
  } else {
    answerQuiz(cc);
  }
}

function flash(cc) {
  const p = paths[cc];
  p.classList.add('flash');
  setTimeout(() => p.classList.remove('flash'), 650);
}

/* ================= Info banner ================= */
let bannerTimer = null;
function showBanner(cc) {
  const c = COUNTRIES[cc];
  $('banner-flag').src = 'assets/flags/' + cc + '.svg';
  $('banner-name').textContent = c.name;
  $('banner-capital').textContent = c.capital;
  $('banner-icons').textContent = VISUALS[cc].icons + ' ' + VISUALS[cc].capIcons;
  const btn = $('banner-cue');
  btn.onclick = ev => {
    ev.stopPropagation();
    audio.speak(cc + '_cue');
    state.lastSpoken = [cc + '_cue'];
  };
  $('banner').classList.remove('hidden');
  clearTimeout(bannerTimer);
  bannerTimer = setTimeout(() => $('banner').classList.add('hidden'), 6000);
}
$('banner').addEventListener('click', () => $('banner').classList.add('hidden'));

/* ================= Guess role-play =================
   Tap a placed country -> it lifts off the board, the camera swoops in and a
   3D card asks "Kaun hoon main?" — hints first, answer only after guessing
   (or after enough misses). Three rounds: name, capital, flag. */
const gotIt = () => 'got_it_' + (1 + Math.floor(Math.random() * 2));
let rp = null; // {cc, stage: 'name'|'capital'|'flag', hints, wrong}
let rpTimer = null;

function openRolePlay(cc) {
  if (rp && rp.cc === cc) return;
  closeRolePlay(true);
  rp = { cc, stage: 'name', hints: 0, wrong: 0 };
  paths[cc].classList.add('rp-active');
  $('board-tilt').classList.add('rp');
  $('banner').classList.add('hidden');
  $('rp').classList.remove('hidden');
  setView(fitCcs([cc], 0.9));
  setStage('name');
}

function closeRolePlay(silent = false) {
  clearTimeout(rpTimer);
  if (!rp) return;
  paths[rp.cc].classList.remove('rp-active');
  $('board-tilt').classList.remove('rp');
  $('rp').classList.add('hidden');
  rp = null;
  if (!silent) {
    audio.stop();
    if (state.mode === 'puzzle') setView(fitCcs(levelCcs()));
  }
}

function positionQ() {
  if (!rp) return;
  const pos = slotScreenPos(rp.cc);
  const q = $('rp-q');
  q.style.left = (pos.x - 20) + 'px';
  q.style.top = (pos.y - 74) + 'px';
}

function rpFlip(toAnswer) {
  $('rp-inner').classList.toggle('flipped', toAnswer);
}

function miniShape(cc) {
  const svg = chipSvg(cc);
  svg.classList.add('rp-shape');
  return svg;
}

// Animated emoji row; tapping it replays the matching voice clip.
function iconsRow(icons, clip) {
  const div = document.createElement('div');
  div.className = 'rp-icons';
  graphemes(icons).forEach((emo, i) => {
    const s = document.createElement('span');
    s.textContent = emo;
    s.style.animationDelay = (i * 0.13) + 's';
    div.appendChild(s);
  });
  if (clip) {
    div.addEventListener('click', ev => { ev.stopPropagation(); speakRp([clip]); });
  }
  return div;
}

function col(...children) {
  const d = document.createElement('div');
  d.className = 'rp-col';
  d.append(...children);
  return d;
}
function row(...children) {
  const d = document.createElement('div');
  d.className = 'rp-row';
  d.append(...children);
  return d;
}
function el(html) {
  const t = document.createElement('template');
  t.innerHTML = html.trim();
  return t.content.firstChild;
}

function setStage(stage) {
  if (!rp) return;
  rp.stage = stage;
  rp.hints = 0;
  rp.wrong = 0;
  rpFlip(false);
  const cc = rp.cc;
  const front = $('rp-front');
  front.innerHTML = '';
  $('rp-yes').style.display = '';

  if (stage === 'name') {
    // The emoji row is the visual hint — he "reads" the pictures.
    front.appendChild(col(
      row(miniShape(cc), el('<div class="rp-big">❓</div>')),
      iconsRow(VISUALS[cc].icons, cc + '_hint'),
    ));
    speakRp(['guess_who', cc + '_hint']);
  } else if (stage === 'capital') {
    front.appendChild(col(
      el(`<div class="rp-small2">${COUNTRIES[cc].name}</div>`),
      row(iconsRow(VISUALS[cc].capIcons, cc + '_captease'),
          el('<div class="rp-big">❓</div>')),
    ));
    speakRp(['guess_cap', cc + '_captease']);
  } else { // flag
    $('rp-yes').style.display = 'none';   // the flag itself is the answer button
    const opts = flagOptions(cc);
    for (const k of opts) {
      const b = document.createElement('button');
      b.className = 'rp-flag';
      b.innerHTML = `<img src="assets/flags/${k}.svg" alt="">`;
      b.addEventListener('click', ev => { ev.stopPropagation(); onFlagPick(k, b); });
      front.appendChild(b);
    }
    speakRp(['guess_flag']);
  }
}

function speakRp(clips) {
  audio.speak(clips);
  state.lastSpoken = clips;
}

function flagOptions(cc) {
  const pool = [...state.placed].filter(k => k !== cc);
  const all = Object.keys(COUNTRIES).filter(k => k !== cc);
  while (pool.length < 2) {
    const k = all[Math.floor(Math.random() * all.length)];
    if (!pool.includes(k)) pool.push(k);
  }
  const decoys = pool.sort(() => Math.random() - 0.5).slice(0, 2);
  return [cc, ...decoys].sort(() => Math.random() - 0.5);
}

function showAnswerFace(stage, cc) {
  const back = $('rp-answer');
  back.innerHTML = '';
  if (stage === 'name') {
    back.appendChild(col(
      row(miniShape(cc), el(`<div class="rp-word">${COUNTRIES[cc].name}</div>`)),
      iconsRow(VISUALS[cc].icons, cc + '_cue'),
    ));
    cueBurst(cc, VISUALS[cc].icons);
  } else if (stage === 'capital') {
    back.appendChild(col(
      el(`<div class="rp-word">${COUNTRIES[cc].capital}</div>`),
      iconsRow(VISUALS[cc].capIcons, cc + '_capcue'),
    ));
    cueBurst(cc, VISUALS[cc].capIcons);
  } else {
    back.insertAdjacentHTML('beforeend',
      `<img class="rp-bigflag" src="assets/flags/${cc}.svg" alt="">
       <div class="rp-word">${COUNTRIES[cc].name}</div>`);
  }
  rpFlip(true);
}

function rpAdvance(delay) {
  clearTimeout(rpTimer);
  const t0 = performance.now();
  const tick = () => {
    if (!rp) return;
    // Wait for the minimum delay AND for the voice to finish (max 20s safety).
    const waited = performance.now() - t0;
    if ((audio.idle && waited >= delay) || waited > 20000) {
      if (rp.stage === 'name') setStage('capital');
      else if (rp.stage === 'capital') setStage('flag');
      else finishRolePlay();
    } else {
      rpTimer = setTimeout(tick, 300);
    }
  };
  rpTimer = setTimeout(tick, delay);
}

function finishRolePlay() {
  if (!rp) return;
  const cc = rp.cc;
  const pos = slotScreenPos(cc);
  confetti(pos.x, pos.y, 34);
  closeRolePlay(true);
  showBanner(cc);
  if (state.mode === 'puzzle') setView(fitCcs(levelCcs()));
}

const rpAnswered = () => $('rp-inner').classList.contains('flipped');

function rpCorrect() {
  if (!rp || rpAnswered()) return;
  const cc = rp.cc, stage = rp.stage;
  const pos = slotScreenPos(cc);
  confetti(pos.x, pos.y);
  const clips =
    stage === 'name' ? [gotIt(), cc + '_name', cc + '_cue'] :
    stage === 'capital' ? [gotIt(), cc + '_capital', cc + '_capcue'] :
    [gotIt(), cc + '_name'];
  speakRp(clips);
  showAnswerFace(stage, cc);
  rpAdvance(2800);
}

function rpReveal(auto = false) {
  if (!rp || rpAnswered()) return;
  const cc = rp.cc, stage = rp.stage;
  let clips;
  if (stage === 'name') clips = ['reveal', cc + '_name', cc + '_cue'];
  else if (stage === 'capital') clips = ['reveal', cc + '_capital', cc + '_capcue'];
  else clips = ['flag_reveal', cc + '_name'];
  if (auto && stage === 'flag') clips = ['flag_reveal', cc + '_name'];
  speakRp(clips);
  showAnswerFace(stage, cc);
  rpAdvance(stage === 'name' ? 6500 : 3200);
}

function onFlagPick(k, btn) {
  if (!rp || rp.stage !== 'flag' || rpAnswered()) return;
  if (k === rp.cc) {
    btn.classList.add('right');
    rpCorrect();
  } else {
    btn.classList.add('wrong');
    setTimeout(() => btn.classList.remove('wrong'), 600);
    rp.wrong++;
    if (rp.wrong >= 2) rpReveal(true);
    else speakRp([tryAgain(), rp.cc + '_flaghint']);
  }
}

$('rp-hint').addEventListener('click', () => {
  if (!rp || rpAnswered()) return;
  audio.unlock();
  const cc = rp.cc;
  if (rp.stage === 'flag') { speakRp([cc + '_flaghint']); return; }
  rp.hints++;
  if (rp.hints === 1) {
    speakRp(rp.stage === 'name'
      ? ['one_more_hint', cc + '_tease']
      : ['one_more_hint', cc + '_captease']);
  } else {
    rpReveal(true);   // enough misses — gamified reveal
  }
});
$('rp-yes').addEventListener('click', () => { audio.unlock(); rpCorrect(); });
$('rp-reveal').addEventListener('click', () => { audio.unlock(); rpReveal(); });
$('rp-next').addEventListener('click', () => {
  // Speed control: jump straight to the next round, no waiting.
  if (!rp) return;
  audio.unlock();
  clearTimeout(rpTimer);
  audio.stop();
  if (rp.stage === 'name') setStage('capital');
  else if (rp.stage === 'capital') setStage('flag');
  else finishRolePlay();
});
$('rp-close').addEventListener('click', () => closeRolePlay());

/* ================= Quiz modes ================= */
let quizTimer = null;   // single timer — re-tapping buttons must never stack quizzes

function scheduleQuiz(delay) {
  clearTimeout(quizTimer);
  quizTimer = setTimeout(nextQuiz, delay);
}

function setMode(mode) {
  if (mode !== 'puzzle' && state.placed.size < 1) {
    // Nothing on the map yet: gently push back to the puzzle.
    audio.speak('mode_puzzle');
    mode = 'puzzle';
  }
  if (mode === state.mode) {
    // Same button tapped again: just repeat the current prompt.
    if (state.lastSpoken) audio.speak(state.lastSpoken);
    return;
  }
  closeRolePlay(true);
  clearTimeout(quizTimer);
  state.mode = mode;
  state.quizTarget = null;
  state.quizWrong = 0;
  state.selectedChip = null;
  document.querySelectorAll('.mode-btn[data-mode]').forEach(b =>
    b.classList.toggle('active', b.dataset.mode === mode));
  $('banner').classList.add('hidden');
  $('quiz-card').classList.add('hidden');
  tray.style.display = mode === 'puzzle' ? '' : 'none';
  requestAnimationFrame(fitBoard);

  if (mode === 'puzzle') {
    audio.speak('mode_puzzle');
    state.lastSpoken = ['mode_puzzle'];
    setView(fitCcs(levelCcs()));
  } else {
    audio.speak(mode === 'flags' ? 'mode_flags' : 'mode_capitals');
    setView(fitCcs([...state.placed]));
    scheduleQuiz(1800);
  }
}

function nextQuiz() {
  if (state.mode === 'puzzle') return;
  const pool = [...state.placed];
  if (!pool.length) { setMode('puzzle'); return; }
  let cc;
  do { cc = pool[Math.floor(Math.random() * pool.length)]; }
  while (pool.length > 1 && (cc === state.quizTarget || cc === state.lastQuizCc));
  state.lastQuizCc = cc;   // never ask the same question twice in a row
  state.quizTarget = cc;
  state.quizWrong = 0;

  const card = $('quiz-card');
  card.classList.remove('hidden');
  if (state.mode === 'flags') {
    $('quiz-flag').classList.remove('hidden');
    $('quiz-star').classList.add('hidden');
    $('quiz-flag').src = 'assets/flags/' + cc + '.svg';
    audio.speak('flag_prompt');
    state.lastSpoken = ['flag_prompt'];
  } else {
    $('quiz-flag').classList.add('hidden');
    $('quiz-star').classList.remove('hidden');
    audio.speak(cc + '_findcap');
    state.lastSpoken = [cc + '_findcap'];
  }
}

function answerQuiz(cc) {
  if (!state.quizTarget) return;
  if (cc === state.quizTarget) {
    const slot = slotScreenPos(cc);
    confetti(slot.x, slot.y);
    cueBurst(cc, state.mode === 'flags' ? VISUALS[cc].icons : VISUALS[cc].capIcons);
    flash(cc);
    showBanner(cc);
    const clips = state.mode === 'flags'
      ? [praise(), cc + '_name', cc + '_capital']
      : [praise(), cc + '_capital', cc + '_name'];
    audio.speak(clips);
    state.lastSpoken = clips;
    state.quizTarget = null;
    state.quizWrong = 0;
    scheduleQuiz(3400);
  } else {
    const p = paths[cc];
    p.classList.add('wiggle');
    setTimeout(() => p.classList.remove('wiggle'), 550);
    state.quizWrong = (state.quizWrong || 0) + 1;
    if (state.quizWrong >= 2) {
      // Wrong twice: light up the answer so he always ends on success.
      const t = state.quizTarget;
      state.quizTarget = null;
      state.quizWrong = 0;
      const pt = paths[t];
      pt.classList.add('reveal-glow');
      setTimeout(() => pt.classList.remove('reveal-glow'), 2600);
      const pos = slotScreenPos(t);
      confetti(pos.x, pos.y, 18);
      showBanner(t);
      const clips = state.mode === 'flags'
        ? ['quiz_reveal', t + '_name']
        : ['quiz_reveal', t + '_capital', t + '_name'];
      speakRp(clips);
      scheduleQuiz(4200);
    } else {
      audio.speak([cc + '_name', tryAgain()]);
    }
  }
}

/* ================= FX ================= */
function confetti(x, y, n = 26) {
  const colors = ['#ffd026', '#ff6b6b', '#4ecdc4', '#5c9ce6', '#ba68c8', '#81c784'];
  for (let i = 0; i < n; i++) {
    const d = document.createElement('div');
    d.className = 'confetti';
    d.style.background = colors[i % colors.length];
    d.style.left = (x + (Math.random() * 120 - 60)) + 'px';
    d.style.top = (y + (Math.random() * 40 - 20)) + 'px';
    d.style.animationDelay = (Math.random() * 0.25) + 's';
    fxLayer.appendChild(d);
    setTimeout(() => d.remove(), 1800);
  }
}
// Emoji stickers pop up over a country on the 3D board — the physical
// visual for its cue ("waffles over Belgium").
function cueBurst(cc, icons) {
  const pos = slotScreenPos(cc);
  const segs = graphemes(icons);
  segs.forEach((emo, i) => {
    const d = document.createElement('div');
    d.className = 'cue-icon';
    d.textContent = emo;
    d.style.left = (pos.x + (i - (segs.length - 1) / 2) * 46 - 20) + 'px';
    d.style.top = (pos.y - 34) + 'px';
    d.style.animationDelay = (i * 0.16) + 's';
    fxLayer.appendChild(d);
    setTimeout(() => d.remove(), 3400 + i * 160);
  });
}

function bigConfetti() {
  const w = window.innerWidth;
  for (let i = 0; i < 4; i++) {
    setTimeout(() => confetti(Math.random() * w, 80, 22), i * 280);
  }
}

/* ================= Top bar & controls ================= */
function updateLevelDots() {
  const wrap = $('level-dots');
  wrap.innerHTML = '';
  LEVELS.forEach((l, i) => {
    const d = document.createElement('div');
    const done = l.ccs.every(c => state.placed.has(c));
    d.className = 'dot' + (done ? ' done' : '') + (i === state.level ? ' now' : '');
    wrap.appendChild(d);
  });
}

document.querySelectorAll('.mode-btn[data-mode]').forEach(b => {
  b.addEventListener('click', () => { audio.unlock(); setMode(b.dataset.mode); });
});

$('btn-sound').addEventListener('click', () => {
  audio.unlock();
  if (state.lastSpoken) audio.speak(state.lastSpoken);
});

$('btn-labels').addEventListener('click', () => {
  state.labels = !state.labels;
  save();
  refreshBoard();
});

/* ================= Phases (jump / skip / replay any level) ================= */
function resetProgress() {
  state.placed = new Set();
  state.level = 0;
  state.fails = {};
  state.selectedChip = null;
  save();
  refreshBoard();
  buildTray();
  updateLevelDots();
}

function buildPhases() {
  const grid = $('phase-grid');
  grid.innerHTML = '';
  LEVELS.forEach((l, i) => {
    const done = l.ccs.every(c => state.placed.has(c));
    const count = l.ccs.filter(c => state.placed.has(c)).length;
    const b = document.createElement('button');
    b.className = 'phase' + (done ? ' done' : '') + (i === state.level ? ' now' : '');
    b.innerHTML =
      `<div class="ph-emoji">${l.emoji}</div><div class="ph-num">${i + 1}</div>` +
      `<div class="ph-name">${l.name}</div>` +
      `<div class="ph-prog">${done ? '⭐' : count + '/' + l.ccs.length}</div>`;
    b.addEventListener('click', () => selectPhase(i));
    grid.appendChild(b);
  });
}

function openPhases() {
  buildPhases();
  $('phases').classList.remove('hidden');
  audio.speak('pick_phase');
}
function closePhases() {
  $('phases').classList.add('hidden');
  disarmRestart();
}

function selectPhase(i) {
  closePhases();
  closeRolePlay(true);
  state.level = i;
  save();
  if (state.mode !== 'puzzle') setMode('puzzle');
  refreshBoard();
  buildTray();
  updateLevelDots();
  setView(fitCcs(levelCcs()));
  audio.speak(['level_' + (i + 1)]);
  state.lastSpoken = ['level_' + (i + 1)];
}

// Restart needs two taps within 3.5s so little fingers can't wipe progress.
let restartArmed = null;
function disarmRestart() {
  clearTimeout(restartArmed);
  restartArmed = null;
  const b = $('btn-restart-all');
  b.classList.remove('armed');
  b.querySelector('span').textContent = 'Restart all';
}
$('btn-restart-all').addEventListener('click', () => {
  if (!restartArmed) {
    const b = $('btn-restart-all');
    b.classList.add('armed');
    b.querySelector('span').textContent = 'Tap again to erase!';
    restartArmed = setTimeout(disarmRestart, 3500);
  } else {
    disarmRestart();
    closePhases();
    resetProgress();
    audio.speak('fresh_start');
    state.lastSpoken = ['fresh_start'];
    setView(fitCcs(levelCcs()));
  }
});
$('btn-phases-close').addEventListener('click', closePhases);

$('btn-gear').addEventListener('click', () => { audio.unlock(); openPhases(); });
$('level-dots').addEventListener('click', () => { audio.unlock(); openPhases(); });

$('zoom-in').addEventListener('click', () => {
  const c = boardCenter(); zoomAt(c.x, c.y, 1.4);
});
$('zoom-out').addEventListener('click', () => {
  const c = boardCenter(); zoomAt(c.x, c.y, 1 / 1.4);
});
$('zoom-home').addEventListener('click', homeView);

$('curtain').addEventListener('pointerdown', () => {
  audio.unlock();
  claimPlayback();
});

/* ================= Boot ================= */
load();
buildBoard();
applyView();
refreshBoard();
buildTray();
updateLevelDots();
fitBoard();
setView(fitCcs(levelCcs()), false);
document.body.classList.add('booted');
claimPlayback();

window.addEventListener('pointerdown', () => audio.unlock());

/* Start screen: continue where we left off, or start from the beginning. */
const hasProgress = state.placed.size > 0 || state.level > 0;
if (hasProgress) {
  $('btn-continue').querySelector('span').textContent = 'Continue';
  $('btn-startover').classList.remove('hidden');
}

function startGame(fresh) {
  audio.unlock();
  claimPlayback();
  if (fresh) resetProgress();
  $('start-screen').classList.add('hidden');
  const clip = fresh ? 'fresh_start' : (hasProgress ? 'welcome_back' : 'welcome');
  audio.speak(clip);
  state.lastSpoken = [clip];
  setView(fitCcs(levelCcs()));
}
$('btn-continue').addEventListener('click', () => startGame(false));
$('btn-startover').addEventListener('click', () => startGame(true));
