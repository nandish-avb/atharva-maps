// Dumps every audio clip (filename -> spoken text) as JSON for gen-audio.py.
// Run: node tools/make-manifest.mjs > tools/audio-manifest.json
import { COUNTRIES, UI_AUDIO } from '../js/data.js';

const clips = {};
for (const [cc, c] of Object.entries(COUNTRIES)) {
  clips[cc + '_name'] = c.name + '!';
  clips[cc + '_cue'] = c.cue;
  clips[cc + '_capital'] = `${c.name}'s capital is ${c.capital}!`;
  clips[cc + '_findcap'] = c.findcap;
}
Object.assign(clips, UI_AUDIO);
process.stdout.write(JSON.stringify(clips, null, 1));
