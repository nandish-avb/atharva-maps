// Country content: names, capitals, funny memory cues (Indian English + light Hinglish),
// level grouping, and piece colours. Audio file names derive from the country code:
//   {cc}_name.mp3, {cc}_cue.mp3, {cc}_capital.mp3, {cc}_find.mp3, {cc}_findcap.mp3

export const COUNTRIES = {
  // ---- Level 1: The Famous Five (west) ----
  it: {
    name: 'Italy', capital: 'Rome', color: '#66bb6a',
    cue: "Italy! Titli! Dekho, Italy looks like a big boot kicking a football! Pizza and pasta come from Italy. Yummy yummy!",
    findcap: "Rome! Where does Rome live? Find Rome's country!",
  },
  fr: {
    name: 'France', capital: 'Paris', color: '#5c9ce6',
    cue: "France! Here stands the tall tall Eiffel Tower — so high, it touches the clouds! And flaky croissants — nom nom!",
    findcap: "Paris! Where does Paris live? Find Paris's country!",
  },
  es: {
    name: 'Spain', capital: 'Madrid', color: '#ef9a4d',
    cue: "Spain! Here people throw tomatoes at each other for fun! Splat splat splat! What a masti!",
    findcap: "Madrid! Where does Madrid live? Find Madrid's country!",
  },
  pt: {
    name: 'Portugal', capital: 'Lisbon', color: '#e57373',
    cue: "Portugal! Ronaldo plays football here. Goal! Siuuu!",
    findcap: "Lisbon! Where does Lisbon live? Find Lisbon's country!",
  },
  ch: {
    name: 'Switzerland', capital: 'Bern', color: '#f06292',
    cue: "Switzerland! Snowy snowy mountains and the yummiest chocolate in the world. A chocolate mountain!",
    findcap: "Bern! Where does Bern live? Find Bern's country!",
  },

  // ---- Level 2: Islands and the Low Lands ----
  gb: {
    name: 'United Kingdom', capital: 'London', color: '#7986cb',
    cue: "United Kingdom! London Bridge is falling down, falling down! And the big clock Big Ben goes dong, dong, dong!",
    findcap: "London! Where does London live? Find London's country!",
  },
  ie: {
    name: 'Ireland', capital: 'Dublin', color: '#81c784',
    cue: "Ireland! Everything here is green green green — like one big garden!",
    findcap: "Dublin! Where does Dublin live? Find Dublin's country!",
  },
  is: {
    name: 'Iceland', capital: 'Reykjavik', color: '#4dd0e1',
    cue: "Iceland! Brrr, so cold! Land of ice and fire — volcanoes go boom and ice is everywhere!",
    findcap: "Reykjavik! Where does Reykjavik live? Find Reykjavik's country!",
  },
  nl: {
    name: 'Netherlands', capital: 'Amsterdam', color: '#ffb74d',
    cue: "Netherlands! Windmills go round and round and round, and tulip flowers smile everywhere!",
    findcap: "Amsterdam! Where does Amsterdam live? Find Amsterdam's country!",
  },
  be: {
    name: 'Belgium', capital: 'Brussels', color: '#a1887f',
    cue: "Belgium! Waffles and chocolates! Nom nom nom! Pet bhar gaya!",
    findcap: "Brussels! Where does Brussels live? Find Brussels' country!",
  },

  // ---- Level 3: The Middle Friends ----
  de: {
    name: 'Germany', capital: 'Berlin', color: '#90a4ae',
    cue: "Germany! Vroom vroom! Fast fast cars are made here — zoom, off they go!",
    findcap: "Berlin! Where does Berlin live? Find Berlin's country!",
  },
  at: {
    name: 'Austria', capital: 'Vienna', color: '#ba68c8',
    cue: "Austria! La la la! The land of music — even the mountains want to sing and dance!",
    findcap: "Vienna! Where does Vienna live? Find Vienna's country!",
  },
  cz: {
    name: 'Czechia', capital: 'Prague', color: '#4db6ac',
    cue: "Czech Republic! Check check! Such a funny name, na? Czech Republic — check check check!",
    findcap: "Prague! Where does Prague live? Find Prague's country!",
  },
  pl: {
    name: 'Poland', capital: 'Warsaw', color: '#f48fb1',
    cue: "Poland! Yummy dumplings called pierogi live here — like little potato pockets! Just like momos!",
    findcap: "Warsaw! Where does Warsaw live? Find Warsaw's country!",
  },
  lu: {
    name: 'Luxembourg', capital: 'Luxembourg City', color: '#fdd835',
    cue: "Luxembourg! So tiny tiny, but so rich — a little treasure box country!",
    findcap: "Luxembourg City! Where does Luxembourg City live? Find its country!",
  },

  // ---- Level 4: The Snowy North ----
  dk: {
    name: 'Denmark', capital: 'Copenhagen', color: '#ff8a65',
    cue: "Denmark! LEGO blocks come from here! Build build build — a tower up to the sky!",
    findcap: "Copenhagen! Where does Copenhagen live? Find Copenhagen's country!",
  },
  no: {
    name: 'Norway', capital: 'Oslo', color: '#64b5f6',
    cue: "Norway! Reindeer live here, and magic green lights dance in the night sky! Wow!",
    findcap: "Oslo! Where does Oslo live? Find Oslo's country!",
  },
  se: {
    name: 'Sweden', capital: 'Stockholm', color: '#ffd54f',
    cue: "Sweden! Yummy meatballs! And IKEA — where whole cupboards come packed in flat boxes!",
    findcap: "Stockholm! Where does Stockholm live? Find Stockholm's country!",
  },
  fi: {
    name: 'Finland', capital: 'Helsinki', color: '#9575cd',
    cue: "Finland! Shhh… Santa Claus lives here! Ho ho ho! Merry Christmas!",
    findcap: "Helsinki! Where does Helsinki live? Find Helsinki's country!",
  },
  ee: {
    name: 'Estonia', capital: 'Tallinn', color: '#4fc3f7',
    cue: "Estonia! A little country that loves computers and robots! Beep beep boop!",
    findcap: "Tallinn! Where does Tallinn live? Find Tallinn's country!",
  },

  // ---- Level 5: The Big East ----
  lv: {
    name: 'Latvia', capital: 'Riga', color: '#aed581',
    cue: "Latvia! Full of forests — trees, trees, everywhere trees!",
    findcap: "Riga! Where does Riga live? Find Riga's country!",
  },
  lt: {
    name: 'Lithuania', capital: 'Vilnius', color: '#ffb300',
    cue: "Lithuania! Everyone here loves basketball! Dribble dribble, jump — dunk!",
    findcap: "Vilnius! Where does Vilnius live? Find Vilnius's country!",
  },
  by: {
    name: 'Belarus', capital: 'Minsk', color: '#8d6e63',
    cue: "Belarus! Big green forests where bison live — big woolly buffaloes with grumpy faces!",
    findcap: "Minsk! Where does Minsk live? Find Minsk's country!",
  },
  ua: {
    name: 'Ukraine', capital: 'Kyiv', color: '#ffee58',
    cue: "Ukraine! Fields and fields of yellow sunflowers, all smiling at the sun!",
    findcap: "Kyiv! Where does Kyiv live? Find Kyiv's country!",
  },
  ru: {
    name: 'Russia', capital: 'Moscow', color: '#ce93d8',
    cue: "Russia! The biggest country in the whole wide world! Matryoshka dolls live here — a doll inside a doll inside a doll!",
    findcap: "Moscow! Where does Moscow live? Find Moscow's country!",
  },
  md: {
    name: 'Moldova', capital: 'Chisinau', color: '#dce775',
    cue: "Moldova! Sweet sweet grapes grow here — angoor! So many angoor!",
    findcap: "Chisinau! Where does Chisinau live? Find Chisinau's country!",
  },

  // ---- Level 6: The Sunny South-East ----
  hu: {
    name: 'Hungary', capital: 'Budapest', color: '#ff7043',
    cue: "Hungary! Are you hungry? Hungary! Hee hee! They eat a yummy red soup called goulash!",
    findcap: "Budapest! Where does Budapest live? Find Budapest's country!",
  },
  ro: {
    name: 'Romania', capital: 'Bucharest', color: '#7e57c2',
    cue: "Romania! Big fairy-tale castles sit on the hills here — just like in storybooks!",
    findcap: "Bucharest! Where does Bucharest live? Find Bucharest's country!",
  },
  bg: {
    name: 'Bulgaria', capital: 'Sofia', color: '#ec407a',
    cue: "Bulgaria! The valley of roses! Pink pink flowers everywhere — mmm, what a lovely smell!",
    findcap: "Sofia! Where does Sofia live? Find Sofia's country!",
  },
  gr: {
    name: 'Greece', capital: 'Athens', color: '#42a5f5',
    cue: "Greece! Very very old country! Blue blue sea, little white houses, and creamy yogurt — yum!",
    findcap: "Athens! Where does Athens live? Find Athens' country!",
  },
  hr: {
    name: 'Croatia', capital: 'Zagreb', color: '#ef5350',
    cue: "Croatia! Dalmatian doggies with black spots come from here — woof woof, like one hundred and one Dalmatians!",
    findcap: "Zagreb! Where does Zagreb live? Find Zagreb's country!",
  },
  rs: {
    name: 'Serbia', capital: 'Belgrade', color: '#26a69a',
    cue: "Serbia! Raspberry country! Little red berries — so sweet, so juicy!",
    findcap: "Belgrade! Where does Belgrade live? Find Belgrade's country!",
  },

  // ---- Level 7: The Balkan Buddies ----
  sk: {
    name: 'Slovakia', capital: 'Bratislava', color: '#66bb6a',
    cue: "Slovakia! Mountains full of castles — so many castles, a castle on every hill!",
    findcap: "Bratislava! Where does Bratislava live? Find Bratislava's country!",
  },
  si: {
    name: 'Slovenia', capital: 'Ljubljana', color: '#29b6f6',
    cue: "Slovenia! The country with love inside its name! S, LOVE, nia! And a pretty lake with a tiny island!",
    findcap: "Ljubljana! Where does Ljubljana live? Find Ljubljana's country!",
  },
  ba: {
    name: 'Bosnia', capital: 'Sarajevo', color: '#ffca28',
    cue: "Bosnia! Old old bridges where brave people jump — splash! — into the river!",
    findcap: "Sarajevo! Where does Sarajevo live? Find Sarajevo's country!",
  },
  me: {
    name: 'Montenegro', capital: 'Podgorica', color: '#ab47bc',
    cue: "Montenegro! It means Black Mountain! A country named after a big black mountain!",
    findcap: "Podgorica! Where does Podgorica live? Find Podgorica's country!",
  },
  al: {
    name: 'Albania', capital: 'Tirana', color: '#ff8a65',
    cue: "Albania! The land of eagles — big big birds flying high high in the sky!",
    findcap: "Tirana! Where does Tirana live? Find Tirana's country!",
  },
  mk: {
    name: 'North Macedonia', capital: 'Skopje', color: '#d4e157',
    cue: "North Macedonia! Statues everywhere! Statue statue! Nobody move — statue!",
    findcap: "Skopje! Where does Skopje live? Find Skopje's country!",
  },
  xk: {
    name: 'Kosovo', capital: 'Pristina', color: '#80cbc4',
    cue: "Kosovo! A baby country — one of the newest countries in the whole world! Goo goo ga ga!",
    findcap: "Pristina! Where does Pristina live? Find Pristina's country!",
  },
};

export const LEVELS = [
  { name: 'The Famous Five', ccs: ['it', 'fr', 'es', 'pt', 'ch'] },
  { name: 'Islands & Low Lands', ccs: ['gb', 'ie', 'is', 'nl', 'be'] },
  { name: 'The Middle Friends', ccs: ['de', 'at', 'cz', 'pl', 'lu'] },
  { name: 'The Snowy North', ccs: ['dk', 'no', 'se', 'fi', 'ee'] },
  { name: 'The Big East', ccs: ['lv', 'lt', 'by', 'ua', 'ru', 'md'] },
  { name: 'The Sunny South-East', ccs: ['hu', 'ro', 'bg', 'gr', 'hr', 'rs'] },
  { name: 'The Balkan Buddies', ccs: ['sk', 'si', 'ba', 'me', 'al', 'mk', 'xk'] },
];

// Generic UI audio clips (file name -> spoken text). Generated by tools/gen-audio.py.
export const UI_AUDIO = {
  welcome: "Namaste! Welcome to your world of maps! Chalo, let's play!",
  mode_puzzle: "Puzzle time! Drag each country to its home on the map!",
  mode_flags: "Flag hunt! Look at the flag and tap its country!",
  mode_capitals: "Capital game! Listen, and find the right country!",
  praise_1: "Shabash! Well done!",
  praise_2: "Wow! Superb!",
  praise_3: "Kya baat hai! Amazing!",
  praise_4: "Yay! You did it!",
  praise_5: "Very good! Bahut badhiya!",
  try_again_1: "Oops! Try again!",
  try_again_2: "Almost! Try once more!",
  level_done: "Hooray! Level complete! Clap clap clap!",
  all_done: "Wow! You finished the whole map of Europe! You are a champion!",
  flag_prompt: "Look at this flag! Which country does it belong to? Tap it!",
};
