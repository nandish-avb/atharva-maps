// Dumps every audio clip (filename -> spoken text) as JSON for gen-audio.py.
// Run (Bash, not PowerShell — its > writes UTF-16):
//   node tools/make-manifest.mjs > tools/audio-manifest.json
import * as EU from '../js/data.js';
import * as AS from '../js/data-asia.js';
import * as AF from '../js/data-africa.js';

const clips = {};
const WORDS = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight'];

function addContinent(D) {
  for (const [cc, c] of Object.entries(D.COUNTRIES)) {
    clips[cc + '_name'] = c.name + '!';
    clips[cc + '_cue'] = c.cue;
    clips[cc + '_capital'] = `${c.name}'s capital is ${c.capital}!`;
    clips[cc + '_findcap'] = c.findcap;
    const g = D.GUESS[cc];
    clips[cc + '_hint'] = g.hint;
    clips[cc + '_tease'] = g.tease;
    clips[cc + '_captease'] = g.capTease;
    clips[cc + '_flaghint'] = g.flagHint;
    clips[cc + '_capcue'] = D.VISUALS[cc].capCue;
  }
  D.LEVELS.forEach((l, i) => {
    clips[D.LEVEL_PREFIX + (i + 1)] = `Level ${WORDS[i]}! ${l.name}!`;
  });
}

addContinent(EU);
addContinent(AS);
addContinent(AF);
Object.assign(clips, EU.UI_AUDIO);
process.stdout.write(JSON.stringify(clips, null, 1));
