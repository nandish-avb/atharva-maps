// South America content — names, capitals, cues, levels, guess-game and visuals.

export const COUNTRIES = {
  // ---- Level 1: The Big North ----
  br: {
    name: 'Brazil', capital: 'Brasília', color: '#66bb6a',
    cue: "Brazil! The biggest jungle in the world — the Amazon! Monkeys, toucans, and football, goal!",
    findcap: "Brasília! Where does Brasília live? Find Brasília's country!",
  },
  co: {
    name: 'Colombia', capital: 'Bogotá', color: '#ffd54f',
    cue: "Colombia! Coffee beans and the sweetest yummy fruits, and rivers that turn rainbow colours!",
    findcap: "Bogotá! Where does Bogotá live? Find Bogotá's country!",
  },
  ve: {
    name: 'Venezuela', capital: 'Caracas', color: '#ef5350',
    cue: "Venezuela! The tallest waterfall in the whole world — water falling from the sky, whoosh!",
    findcap: "Caracas! Where does Caracas live? Find Caracas's country!",
  },
  gy: {
    name: 'Guyana', capital: 'Georgetown', color: '#4dd0e1',
    cue: "Guyana! A giant waterfall in the jungle, and lily pads SO big a baby could sit on them!",
    findcap: "Georgetown! Where does Georgetown live? Find its country!",
  },
  sr: {
    name: 'Suriname', capital: 'Paramaribo', color: '#81c784',
    cue: "Suriname! Thick green jungle everywhere, with wooden houses painted white!",
    findcap: "Paramaribo! Where does Paramaribo live? Find its country!",
  },
  ec: {
    name: 'Ecuador', capital: 'Quito', color: '#ffb74d',
    cue: "Ecuador! It sits right on the middle line of the Earth! And giant tortoises live here — slow and old!",
    findcap: "Quito! Where does Quito live? Find Quito's country!",
  },

  // ---- Level 2: The Long South ----
  pe: {
    name: 'Peru', capital: 'Lima', color: '#f06292',
    cue: "Peru! Fluffy llamas go spit! And a secret city hides high high in the mountains — Machu Picchu!",
    findcap: "Lima! Where does Lima live? Find Lima's country!",
  },
  bo: {
    name: 'Bolivia', capital: 'La Paz', color: '#ba68c8',
    cue: "Bolivia! A giant mirror on the ground — a salt flat so shiny the sky lives in it!",
    findcap: "La Paz! Where does La Paz live? Find La Paz's country!",
  },
  cl: {
    name: 'Chile', capital: 'Santiago', color: '#42a5f5',
    cue: "Chile! The longest, skinniest country — like a long noodle down the map! And penguins at the bottom!",
    findcap: "Santiago! Where does Santiago live? Find Santiago's country!",
  },
  ar: {
    name: 'Argentina', capital: 'Buenos Aires', color: '#4fc3f7',
    cue: "Argentina! Tango dancing, cowboys called gauchos, and football — Messi, goooal!",
    findcap: "Buenos Aires! Where does Buenos Aires live? Find its country!",
  },
  py: {
    name: 'Paraguay', capital: 'Asunción', color: '#ce93d8',
    cue: "Paraguay! A country with no sea, where everyone drinks a green tea through a metal straw!",
    findcap: "Asunción! Where does Asunción live? Find Asunción's country!",
  },
  uy: {
    name: 'Uruguay', capital: 'Montevideo', color: '#9ccc65',
    cue: "Uruguay! Sunny beaches, lots of cows, and the very first ever football World Cup winner!",
    findcap: "Montevideo! Where does Montevideo live? Find its country!",
  },
};

export const LEVELS = [
  { name: 'The Big North', emoji: '🦜', ccs: ['br', 'co', 've', 'gy', 'sr', 'ec'] },
  { name: 'The Long South', emoji: '🦙', ccs: ['pe', 'bo', 'cl', 'ar', 'py', 'uy'] },
];

export const SHORT = {
  br: 'Brazil', co: 'Colomb.', ve: 'Venez.', gy: 'Guyana', sr: 'Surin.',
  ec: 'Ecuador', pe: 'Peru', bo: 'Bolivia', cl: 'Chile', ar: 'Argent.',
  py: 'Paraguay', uy: 'Uruguay',
};

export const GUESS = {
  br: { hint: "I have the biggest jungle in the world — the Amazon! Monkeys, toucans, and football, goal!",
    tease: "My name starts with, Bra... Bra...",
    capTease: "My capital city starts with, Brasi... Brasi...",
    flagHint: "Green with a yellow diamond and a blue starry circle!" },
  co: { hint: "Coffee beans and sweet fruits grow in me, and my rivers turn rainbow colours!",
    tease: "My name starts with, Colom... Colom...",
    capTease: "My capital city starts with, Bogo... Bogo...",
    flagHint: "Yellow on top, then blue, then red!" },
  ve: { hint: "The tallest waterfall in the whole world falls in me — from way up in the sky!",
    tease: "My name starts with, Vene... Vene...",
    capTease: "My capital city starts with, Cara... Cara...",
    flagHint: "Yellow, blue and red with a curve of white stars!" },
  gy: { hint: "My lily pads are SO big a baby could sit on them, and I have a giant jungle waterfall!",
    tease: "My name starts with, Guy... Guy...",
    capTease: "My capital city starts with, George... George...",
    flagHint: "Green with a red and yellow arrow pointing across!" },
  sr: { hint: "Thick green jungle covers me, with white wooden houses!",
    tease: "My name starts with, Suri... Suri...",
    capTease: "My capital city starts with, Para... Para...",
    flagHint: "Green, white, red, white, green with a yellow star!" },
  ec: { hint: "I sit right on the middle line of the Earth! And giant old tortoises live on my islands!",
    tease: "My name starts with, Ecua... Ecua...",
    capTease: "My capital city starts with, Kee... Kee...",
    flagHint: "Yellow, blue and red with a bird and mountain badge!" },
  pe: { hint: "My llamas go spit! And a secret city hides high in my mountains — Machu Picchu!",
    tease: "My name starts with, Pe... Pe...",
    capTease: "My capital city starts with, Lee... Lee...",
    flagHint: "Red, white, red standing stripes!" },
  bo: { hint: "I have a giant mirror on the ground — a salt flat so shiny the sky lives in it!",
    tease: "My name starts with, Boli... Boli...",
    capTease: "My capital city starts with, La Pa... La Pa...",
    flagHint: "Red, yellow and green sleeping stripes!" },
  cl: { hint: "I am the longest skinniest country — like a long noodle! And penguins live at my bottom!",
    tease: "My name starts with, Chi... Chi...",
    capTease: "My capital city starts with, Santia... Santia...",
    flagHint: "White and red with a blue square and white star!" },
  ar: { hint: "Tango dancing, cowboy gauchos, and football — Messi, goooal!",
    tease: "My name starts with, Argen... Argen...",
    capTease: "My capital city starts with, Bwenos... Bwenos...",
    flagHint: "Light blue and white with a golden sun face!" },
  py: { hint: "I have no sea, and everyone drinks a green tea through a metal straw!",
    tease: "My name starts with, Para... Para...",
    capTease: "My capital city starts with, Asun... Asun...",
    flagHint: "Red, white and blue sleeping stripes with a star badge!" },
  uy: { hint: "Sunny beaches, lots of cows, and I won the very first football World Cup!",
    tease: "My name starts with, Uru... Uru...",
    capTease: "My capital city starts with, Monte... Monte...",
    flagHint: "White and blue stripes with a golden sun!" },
};

export const VISUALS = {
  br: { icons: '🌳🦜⚽', capIcons: '🏙️🛸',
    capCue: "Brasília! A brand new city built to look like an airplane from the sky!" },
  co: { icons: '☕🌈', capIcons: '⛰️☕',
    capCue: "Bogotá! A big city high in the mountains where the clouds float past!" },
  ve: { icons: '💦☁️', capIcons: '⛰️🏙️',
    capCue: "Caracas! A busy city in a valley with a green mountain beside it!" },
  gy: { icons: '💦🪷', capIcons: '🏠🌊',
    capCue: "Georgetown! Pretty white wooden houses by the sea, with a giant clock!" },
  sr: { icons: '🌴🏠', capIcons: '⛪🌴',
    capCue: "Paramaribo! One of the biggest wooden buildings in the world lives here!" },
  ec: { icons: '🌍🐢', capIcons: '⛰️⛪',
    capCue: "Quito! A city right on the middle of the Earth — stand with one foot each side!" },
  pe: { icons: '🦙🏔️', capIcons: '🌊🏛️',
    capCue: "Lima! A big city by the sea, famous for the yummiest food!" },
  bo: { icons: '🪞🧂', capIcons: '🚠⛰️',
    capCue: "La Paz! The highest capital in the world — you ride cable cars in the sky to get around!" },
  cl: { icons: '🍜🐧', capIcons: '⛰️🏙️',
    capCue: "Santiago! A city with snowy mountains peeking right over the buildings!" },
  ar: { icons: '💃🐄⚽', capIcons: '🕺🏛️',
    capCue: "Buenos Aires! The tango dancing city — one two three, dance in the street!" },
  py: { icons: '🧉🌿', capIcons: '🏛️🌊',
    capCue: "Asunción! A warm friendly city by a big river!" },
  uy: { icons: '🏖️🐄', capIcons: '🏖️🎡',
    capCue: "Montevideo! A long beach path where everyone walks, bikes, and watches the sunset!" },
};

export const LEVEL_PREFIX = 'level_sa_';
export const ALL_DONE_CLIP = 'all_done_samerica';
