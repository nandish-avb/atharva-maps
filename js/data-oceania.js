// Oceania content — names, capitals, cues, levels, guess-game and visuals.

export const COUNTRIES = {
  // ---- Level 1: The Big Two ----
  au: {
    name: 'Australia', capital: 'Canberra', color: '#ffb74d',
    cue: "Australia! Kangaroos go boing boing, koalas hug the trees, and a big big red rock in the middle!",
    findcap: "Canberra! Where does Canberra live? Find Canberra's country!",
  },
  nz: {
    name: 'New Zealand', capital: 'Wellington', color: '#66bb6a',
    cue: "New Zealand! Green green hills of the hobbits! And funny kiwi birds that can't fly!",
    findcap: "Wellington! Where does Wellington live? Find Wellington's country!",
  },

  // ---- Level 2: Island Sprinkles ----
  pg: {
    name: 'Papua New Guinea', capital: 'Port Moresby', color: '#ef5350',
    cue: "Papua New Guinea! Birds of paradise with dancing feathers, and hundreds of different talkings!",
    findcap: "Port Moresby! Where does Port Moresby live? Find its country!",
  },
  fj: {
    name: 'Fiji', capital: 'Suva', color: '#4fc3f7',
    cue: "Fiji! Hundreds of sunny islands, warm blue water, and a big friendly bula hello!",
    findcap: "Suva! Where does Suva live? Find Suva's country!",
  },
  sb: {
    name: 'Solomon Islands', capital: 'Honiara', color: '#81c784',
    cue: "The Solomon Islands! Islands where dolphins play and the sea is full of colourful fish!",
    findcap: "Honiara! Where does Honiara live? Find Honiara's country!",
  },
  vu: {
    name: 'Vanuatu', capital: 'Port Vila', color: '#ba68c8',
    cue: "Vanuatu! An island with a volcano you can peek into — bubbling orange fire, wow!",
    findcap: "Port Vila! Where does Port Vila live? Find Port Vila's country!",
  },
};

export const LEVELS = [
  { name: 'The Big Two', emoji: '🦘', ccs: ['au', 'nz'] },
  { name: 'Island Sprinkles', emoji: '🐚', ccs: ['pg', 'fj', 'sb', 'vu'] },
];

export const SHORT = {
  au: 'Australia', nz: 'N.Zealand', pg: 'P.N.Guinea', fj: 'Fiji',
  sb: 'Solomon', vu: 'Vanuatu',
};

export const GUESS = {
  au: { hint: "My kangaroos go boing boing, my koalas hug trees, and I have a big red rock in my middle!",
    tease: "My name starts with, Aus... Aus...",
    capTease: "My capital city starts with, Canbe... Canbe...",
    flagHint: "Blue with little stars and a small flag in the corner!" },
  nz: { hint: "I have the green hills of the hobbits, and funny kiwi birds that cannot fly!",
    tease: "My name starts with, New Zee... New Zee...",
    capTease: "My capital city starts with, Welling... Welling...",
    flagHint: "Blue with red stars and a small flag in the corner!" },
  pg: { hint: "My birds of paradise have dancing feathers, and my people speak hundreds of talkings!",
    tease: "My name starts with, Papua... Papua...",
    capTease: "My capital city starts with, Port Mor... Port Mor...",
    flagHint: "Red and black with a yellow bird and white stars!" },
  fj: { hint: "I have hundreds of sunny islands and warm blue water — bula hello!",
    tease: "My name starts with, Fee... Fee...",
    capTease: "My capital city starts with, Soo... Soo...",
    flagHint: "Light blue with a small flag and a badge in the corner!" },
  sb: { hint: "My islands have playing dolphins and seas full of colourful fish!",
    tease: "My name starts with, Solo... Solo...",
    capTease: "My capital city starts with, Honia... Honia...",
    flagHint: "Blue and green with a yellow stripe and white stars!" },
  vu: { hint: "I have a volcano you can peek into — bubbling orange fire, wow!",
    tease: "My name starts with, Vanua... Vanua...",
    capTease: "My capital city starts with, Port Vee... Port Vee...",
    flagHint: "Red and green with a black triangle and a yellow sign!" },
};

export const VISUALS = {
  au: { icons: '🦘🐨🪨', capIcons: '🏛️🌳',
    capCue: "Canberra! A green city built around a big lake, made just to be the capital!" },
  nz: { icons: '🌿🥝', capIcons: '💨🎬',
    capCue: "Wellington! The windiest capital in the world, where big movies are made!" },
  pg: { icons: '🦜🪶', capIcons: '🌊⛰️',
    capCue: "Port Moresby! A harbour city with green hills all around!" },
  fj: { icons: '🏝️🌊', capIcons: '🌴🏙️',
    capCue: "Suva! A rainy green city right by the sea!" },
  sb: { icons: '🐬🐠', capIcons: '🌴🌊',
    capCue: "Honiara! A little seaside town with palm trees everywhere!" },
  vu: { icons: '🌋🔥', capIcons: '🌴🌊',
    capCue: "Port Vila! A pretty harbour town with a market full of fruit!" },
};

export const LEVEL_PREFIX = 'level_oc_';
export const ALL_DONE_CLIP = 'all_done_oceania';
