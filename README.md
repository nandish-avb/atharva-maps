# Atharva's World — Europe 🧩🌍

A talking 3D puzzle map for little explorers. Made for a 3-year-old who can't
read yet: everything is spoken aloud in warm Indian English (with a sprinkle of
Hinglish), and every country comes with a funny memory cue — *"Italy! Titli!
Looks like a boot kicking a football!"*

It teaches four things on one dashboard:

1. **Placement** — drag each country piece to its home on the map (🧩 Puzzle)
2. **Name** — spoken when he picks up a piece, and again when he places it
3. **Capital** — spoken on tap; quizzed in the ⭐ Capital game
4. **Flag** — shown on tap; quizzed in the 🚩 Flag hunt

## How to play (parent guide)

- **🧩 Puzzle** — tap a piece in the yellow tray (its name is spoken), drag it
  to its place. Snapping is generous. On success: confetti + praise + the funny
  cue. After **2 misses the correct slot starts pulsing** as a hint.
  Tap any placed country anytime → its flag, name and capital pop up and are
  spoken; the 😄 button replays the funny cue.
- **🚩 Flag hunt** — a flag card appears; he taps the matching country.
- **⭐ Capital game** — "Paris! Where does Paris live?" — he taps the country.
- Quiz modes only use countries he has already placed, so they grow with him.
- **Guess role-play**: tapping a placed country never tells him the answer
  straight away. It plays a hint ("I look like a boot kicking a football!") and
  he must recall the name; then the capital, then find-my-flag among three flags.
  Buttons on the card: 🔊 = one more hint (a "Itaa..." syllable tease), ✅ = the
  assisting adult taps this when he says the right answer aloud (celebration!),
  🎁 = reveal. Two misses always end in a happy animated reveal — never a dead end.
- In quiz modes, two wrong taps light up the correct answer so he learns it.
- **Start screen**: every launch asks — ▶️ Continue from where you left off, or
  🔄 Start from the beginning.
- **Phases**: tap ⚙️ (or the progress dots) to open the phase picker — 7 sets
  of countries with progress shown. Jump to, skip, or replay any phase freely.
  The 🔄 Restart-all button inside needs two taps, so small fingers can't
  wipe progress by accident.
- **Speed controls**: ⏭️ on the guess card jumps to the next round instantly;
  tapping the level celebration or the info banner dismisses them.
- **Zoom**: pinch on phone, mouse-wheel on laptop, or the ➕ / ➖ buttons.
  🗺️ jumps between the whole map and the current level's region. The camera
  also flies to each new level's region automatically. Drag the sea to pan.
- **🔤 Country names** on the map and under the tray pieces help the assisting
  adult; the button toggles them off for a harder game.
- If the app is open in two windows at once, only the newest one plays sound —
  the other shows a "tap to play here" curtain (this also prevents doubled audio).
- Europe is split into 7 mini-levels of 5–7 countries (the dots up top).
  The map builds up cumulatively across levels, like his physical cut-out map.
- Progress saves automatically on the device. ⚙️ resets it (asks first).

## Run it at home

Any static file server works. Simplest (already used during development):

```powershell
cd "D:\Claude Projects\Atharva\Maps"
py -m http.server 8080 --bind 0.0.0.0
```

Then on the phone (same Wi-Fi): `http://<this-PC's-IP>:8080`

## Host it on DuckDNS

1. At [duckdns.org](https://www.duckdns.org), create a subdomain (e.g.
   `atharva-maps.duckdns.org`) and install their update script/app so it always
   points at your home IP.
2. On your router, forward an external port (e.g. **8080**) to this PC's local
   IP, port 8080, and keep the server above running.
3. Share `http://atharva-maps.duckdns.org:8080` — daily sessions from anywhere.

**Nicer setup (HTTPS + installable):** use [Caddy](https://caddyserver.com) —
forward ports **80 and 443** on the router, then run:

```
# Caddyfile
atharva-maps.duckdns.org {
    root * "D:\Claude Projects\Atharva\Maps"
    file_server
}
```

`caddy run` gets a free HTTPS certificate automatically. With HTTPS, Android
Chrome's **"Add to Home screen"** installs it fullscreen like a real app
(manifest.json is already set up for that).

> The app is fully static — no accounts, no tracking, no external requests.
> All audio/flags/map data are local files, so it even works offline once loaded.

## Editing content

All learning content lives in [js/data.js](js/data.js) — names, capitals, the
funny cues, level grouping, and piece colours. After changing any **text**,
regenerate the audio:

```powershell
py -m pip install edge-tts        # once
node tools/make-manifest.mjs | Out-File -Encoding utf8 tools/audio-manifest.json
py tools/gen-audio.py             # only makes missing clips
py tools/gen-audio.py --force     # remake everything
```

Voice is `en-IN-NeerjaExpressiveNeural` (see `tools/gen-audio.py` to change
voice or speed).

## Adding the next continent

1. `tools/build-map.mjs` converts Natural Earth data into puzzle shapes.
   It needs `countries-50m.json` (from `https://unpkg.com/world-atlas@2.0.2/countries-50m.json`)
   plus `npm install d3-geo topojson-client`, and currently lists the European
   countries + projection — adjust the country list, projection centre and
   clip window for the new continent, then run `node build-map.mjs`.
2. Add the new countries + cues + levels to `js/data.js`.
3. Download flags: `https://cdn.jsdelivr.net/gh/lipis/flag-icons@7.2.3/flags/4x3/{cc}.svg`
4. Regenerate audio (above).

## Folder map

```
index.html          app shell
css/style.css       all styling incl. the 3D tilted board
js/app.js           puzzle engine (drag-drop, modes, audio, progress)
js/data.js          ✏️ countries, capitals, funny cues, levels
js/map-europe.js    generated country shapes (don't edit by hand)
assets/flags/       39 flag SVGs (flag-icons project, MIT)
assets/audio/       170 spoken clips (generated, free Microsoft neural voice)
tools/              regeneration scripts (audio + map shapes)
```

Map data: Natural Earth (public domain) via the world-atlas project.
