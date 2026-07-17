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
  { name: 'The Famous Five', emoji: '🍕', ccs: ['it', 'fr', 'es', 'pt', 'ch'] },
  { name: 'Islands & Low Lands', emoji: '💂', ccs: ['gb', 'ie', 'is', 'nl', 'be'] },
  { name: 'The Middle Friends', emoji: '🚗', ccs: ['de', 'at', 'cz', 'pl', 'lu'] },
  { name: 'The Snowy North', emoji: '🎅', ccs: ['dk', 'no', 'se', 'fi', 'ee'] },
  { name: 'The Big East', emoji: '🌻', ccs: ['lv', 'lt', 'by', 'ua', 'ru', 'md'] },
  { name: 'The Sunny South-East', emoji: '🌹', ccs: ['hu', 'ro', 'bg', 'gr', 'hr', 'rs'] },
  { name: 'The Balkan Buddies', emoji: '🦅', ccs: ['sk', 'si', 'ba', 'me', 'al', 'mk', 'xk'] },
];

/* Short display names so labels fit inside small countries */
export const SHORT = {
  gb: 'UK', ch: 'Switz.', nl: 'Nethlds.', be: 'Belg.', lu: 'Lux.',
  cz: 'Czechia', dk: 'Denm.', ee: 'Est.', lv: 'Lat.', lt: 'Lith.',
  ba: 'Bosnia', mk: 'N.Maced.', me: 'Monten.', si: 'Sloven.', xk: 'Kosovo',
  hr: 'Croatia', md: 'Moldova', al: 'Alban.',
};

// Continent-level clips
export const LEVEL_PREFIX = 'level_';
export const ALL_DONE_CLIP = 'all_done';

// Guess-game content. Per country:
//   hint     — the memory cue WITHOUT the country name (child must recall it)
//   tease    — first-syllable teaser for the name
//   capTease — first-syllable teaser for the capital
//   flagHint — describes the flag's colours/shapes (for the find-my-flag round)
// Audio: {cc}_hint, {cc}_tease, {cc}_captease, {cc}_flaghint
export const GUESS = {
  it: {
    hint: "I look like a big boot kicking a football! Pizza and pasta come from me. My name sounds like Titli!",
    tease: "My name starts with, Itaa... Itaa...",
    capTease: "My capital city starts with, Roh... Roh...",
    flagHint: "Green, white and red standing stripes — pizza colours!",
  },
  fr: {
    hint: "The tall tall Eiffel Tower stands in me — so high it touches the clouds! And flaky croissants, nom nom!",
    tease: "My name starts with, Fraa... Fraa...",
    capTease: "My capital city starts with, Paa... Paa...",
    flagHint: "Blue, white and red standing stripes!",
  },
  es: {
    hint: "In me, people throw tomatoes at each other for fun! Splat splat splat!",
    tease: "My name starts with, Spaa... Spaa...",
    capTease: "My capital city starts with, Maa... Maa...",
    flagHint: "Red, yellow, red — sunshine sleeping stripes!",
  },
  pt: {
    hint: "Ronaldo plays football for me! Goal! Siuuu!",
    tease: "My name starts with, Por... Por...",
    capTease: "My capital city starts with, Liss... Liss...",
    flagHint: "Green and red, with a little round shield!",
  },
  ch: {
    hint: "I have snowy snowy mountains and the yummiest chocolate in the world!",
    tease: "My name starts with, Swit... Swit...",
    capTease: "My capital city starts with, Ber... Ber...",
    flagHint: "Red with a white plus sign, like a doctor's flag!",
  },
  gb: {
    hint: "London Bridge is falling down in me! And my big clock goes dong, dong, dong!",
    tease: "My name starts with, Yoo... Yoo Kay...",
    capTease: "My capital city starts with, Lon... Lon...",
    flagHint: "Red, white and blue crosses, criss cross!",
  },
  ie: {
    hint: "Everything in me is green green green — like one big garden!",
    tease: "My name starts with, Ire... Ire...",
    capTease: "My capital city starts with, Dub... Dub...",
    flagHint: "Green, white and orange standing stripes — like India's colours standing up!",
  },
  is: {
    hint: "Brrr, I am so cold! Land of ice and fire — my volcanoes go boom!",
    tease: "My name starts with, Ice... Ice...",
    capTease: "My capital city starts with, Rey... Rey...",
    flagHint: "Blue with a red and white cross!",
  },
  nl: {
    hint: "My windmills go round and round and round, and tulip flowers smile everywhere!",
    tease: "My name starts with, Neh... Nether...",
    capTease: "My capital city starts with, Am... Am...",
    flagHint: "Red, white and blue sleeping stripes!",
  },
  be: {
    hint: "Waffles and chocolates come from me! Nom nom nom!",
    tease: "My name starts with, Bel... Bel...",
    capTease: "My capital city starts with, Bruh... Bruh...",
    flagHint: "Black, yellow and red standing stripes!",
  },
  de: {
    hint: "Vroom vroom! Fast fast cars are made in me — zoom, off they go!",
    tease: "My name starts with, Jer... Jer...",
    capTease: "My capital city starts with, Ber... Ber...",
    flagHint: "Black, red and yellow sleeping stripes!",
  },
  at: {
    hint: "La la la! I am the land of music — even my mountains sing and dance!",
    tease: "My name starts with, Aus... Aus...",
    capTease: "My capital city starts with, Vee... Vee...",
    flagHint: "Red, white, red sleeping stripes!",
  },
  cz: {
    hint: "My name sounds so funny — like check check! Checking checking, check check!",
    tease: "My name starts with, Che... Che...",
    capTease: "My capital city starts with, Praa... Praa...",
    flagHint: "A blue triangle with white and red!",
  },
  pl: {
    hint: "Yummy dumplings called pierogi live in me — little potato pockets, just like momos!",
    tease: "My name starts with, Poh... Poh...",
    capTease: "My capital city starts with, War... War...",
    flagHint: "White on top, red below — two sleeping stripes!",
  },
  lu: {
    hint: "I am tiny tiny, but so rich — a little treasure box country!",
    tease: "My name starts with, Lux... Lux...",
    capTease: "My capital city starts with, Lux... Lux...",
    flagHint: "Red, white and light blue sleeping stripes!",
  },
  dk: {
    hint: "LEGO blocks come from me! Build build build — a tower up to the sky!",
    tease: "My name starts with, Den... Den...",
    capTease: "My capital city starts with, Koh... Koh...",
    flagHint: "Red with a white cross lying on its side!",
  },
  no: {
    hint: "Reindeer live in me, and magic green lights dance in my night sky!",
    tease: "My name starts with, Nor... Nor...",
    capTease: "My capital city starts with, Oss... Oss...",
    flagHint: "Red with a blue and white cross!",
  },
  se: {
    hint: "Yummy meatballs! And IKEA — where whole cupboards come packed in flat boxes!",
    tease: "My name starts with, Swee... Swee...",
    capTease: "My capital city starts with, Stok... Stok...",
    flagHint: "Blue with a yellow cross!",
  },
  fi: {
    hint: "Shhh… Santa Claus lives in me! Ho ho ho!",
    tease: "My name starts with, Fin... Fin...",
    capTease: "My capital city starts with, Hel... Hel...",
    flagHint: "White with a blue cross!",
  },
  ee: {
    hint: "I am a little country that loves computers and robots! Beep beep boop!",
    tease: "My name starts with, Es... Es...",
    capTease: "My capital city starts with, Tal... Tal...",
    flagHint: "Blue, black and white sleeping stripes!",
  },
  lv: {
    hint: "I am full of forests — trees, trees, everywhere trees!",
    tease: "My name starts with, Lat... Lat...",
    capTease: "My capital city starts with, Ree... Ree...",
    flagHint: "Dark red with a thin white line in the middle!",
  },
  lt: {
    hint: "Everyone in me loves basketball! Dribble dribble, jump — dunk!",
    tease: "My name starts with, Lith... Lith...",
    capTease: "My capital city starts with, Vil... Vil...",
    flagHint: "Yellow, green and red sleeping stripes!",
  },
  by: {
    hint: "I have big green forests where bison live — big woolly buffaloes with grumpy faces!",
    tease: "My name starts with, Bela... Bela...",
    capTease: "My capital city starts with, Min... Min...",
    flagHint: "Red and green, with a pretty pattern on the side!",
  },
  ua: {
    hint: "I have fields and fields of yellow sunflowers, all smiling at the sun!",
    tease: "My name starts with, Yoo... Yoo...",
    capTease: "My capital city starts with, Kee... Kee...",
    flagHint: "Blue sky on top, yellow field below!",
  },
  ru: {
    hint: "I am the biggest country in the whole wide world! Matryoshka dolls live in me — a doll inside a doll inside a doll!",
    tease: "My name starts with, Ruh... Ruh...",
    capTease: "My capital city starts with, Mos... Mos...",
    flagHint: "White, blue and red sleeping stripes!",
  },
  md: {
    hint: "Sweet sweet grapes grow in me — angoor! So many angoor!",
    tease: "My name starts with, Mol... Mol...",
    capTease: "My capital city starts with, Kishi... Kishi...",
    flagHint: "Blue, yellow and red, with an eagle in the middle!",
  },
  hu: {
    hint: "My name sounds just like your tummy talking — are you hungry? Hee hee! I eat yummy red goulash soup!",
    tease: "My name starts with, Hun... Hun...",
    capTease: "My capital city starts with, Buda... Buda...",
    flagHint: "Red, white and green sleeping stripes!",
  },
  ro: {
    hint: "Big fairy-tale castles sit on my hills — just like in storybooks!",
    tease: "My name starts with, Roh... Roh...",
    capTease: "My capital city starts with, Buku... Buku...",
    flagHint: "Blue, yellow and red standing stripes!",
  },
  bg: {
    hint: "I am the valley of roses! Pink pink flowers everywhere — what a lovely smell!",
    tease: "My name starts with, Bul... Bul...",
    capTease: "My capital city starts with, So... So...",
    flagHint: "White, green and red sleeping stripes!",
  },
  gr: {
    hint: "I am very very old! Blue blue sea, little white houses, and creamy yogurt!",
    tease: "My name starts with, Gree... Gree...",
    capTease: "My capital city starts with, Ath... Ath...",
    flagHint: "Blue and white stripes like the sea, with a white cross!",
  },
  hr: {
    hint: "Dalmatian doggies with black spots come from me — woof woof!",
    tease: "My name starts with, Kro... Kro...",
    capTease: "My capital city starts with, Zag... Zag...",
    flagHint: "Red, white and blue, with a little checkerboard!",
  },
  rs: {
    hint: "I am the raspberry country! Little red berries — so sweet, so juicy!",
    tease: "My name starts with, Ser... Ser...",
    capTease: "My capital city starts with, Bel... Bel...",
    flagHint: "Red, blue and white, with an eagle!",
  },
  sk: {
    hint: "My mountains are full of castles — a castle on every hill!",
    tease: "My name starts with, Slo... Slovaa...",
    capTease: "My capital city starts with, Braa... Braa...",
    flagHint: "White, blue and red, with a double cross!",
  },
  si: {
    hint: "There is LOVE hiding inside my name! And I have a pretty lake with a tiny island!",
    tease: "My name starts with, Slo... Slovee...",
    capTease: "My capital city starts with, Lyoo... Lyoo...",
    flagHint: "White, blue and red, with a little mountain picture!",
  },
  ba: {
    hint: "I have old old bridges where brave people jump — splash! — into the river!",
    tease: "My name starts with, Bos... Bos...",
    capTease: "My capital city starts with, Sara... Sara...",
    flagHint: "Blue with a yellow triangle and little stars!",
  },
  me: {
    hint: "My name means Black Mountain! A country named after a big black mountain!",
    tease: "My name starts with, Mon... Monte...",
    capTease: "My capital city starts with, Pod... Pod...",
    flagHint: "Red with gold edges and an eagle!",
  },
  al: {
    hint: "I am the land of eagles — big big birds flying high high in the sky!",
    tease: "My name starts with, Al... Al...",
    capTease: "My capital city starts with, Tee... Tee...",
    flagHint: "Red with a black eagle that has two heads!",
  },
  mk: {
    hint: "Statues everywhere in me! Statue statue! Nobody move — statue!",
    tease: "My name starts with, Mase... Mase...",
    capTease: "My capital city starts with, Sko... Sko...",
    flagHint: "A big yellow sun with rays shining out!",
  },
  xk: {
    hint: "I am a baby country — one of the newest countries in the whole world! Goo goo ga ga!",
    tease: "My name starts with, Koh... Koh...",
    capTease: "My capital city starts with, Prish... Prish...",
    flagHint: "Blue with a yellow map and white stars!",
  },
};

// Visual anchors. Per country:
//   icons    — emoji stickers for the country cue (bounce on map + guess card)
//   capIcons — emoji for the capital's famous thing
//   capCue   — short spoken line about the capital's famous thing ({cc}_capcue.mp3)
export const VISUALS = {
  it: { icons: '👢⚽🍕🍝', capIcons: '🏟️',
    capCue: "Rome! The big big round Colosseum is there — like a giant bowl made of stone!" },
  fr: { icons: '🗼🥐☁️', capIcons: '🗼',
    capCue: "Paris! The tall Eiffel Tower stands right in Paris — so high it tickles the clouds!" },
  es: { icons: '🍅😆🎉', capIcons: '🐻🍓',
    capCue: "Madrid! A friendly bear statue eats berries from a tree in the middle of the city!" },
  pt: { icons: '⚽🥅🎯', capIcons: '🚋',
    capCue: "Lisbon! Yellow trams go ding ding, up and down the hills!" },
  ch: { icons: '🏔️🍫❄️', capIcons: '🐻⏰',
    capCue: "Bern! The city of bears — real bears live in a bear park there!" },
  gb: { icons: '🕰️🌉👑', capIcons: '🕰️🎡',
    capCue: "London! Big Ben goes dong dong, and the giant London Eye wheel turns slowly round!" },
  ie: { icons: '🍀💚🌈', capIcons: '🎻🌈',
    capCue: "Dublin! Happy music plays everywhere, and rainbows hide pots of gold!" },
  is: { icons: '🌋❄️💨', capIcons: '♨️💦',
    capCue: "Reykjavik! Warm water pools outside in the cold — splash splash in the steam!" },
  nl: { icons: '🌷🧀🚲', capIcons: '🚲🛶',
    capCue: "Amsterdam! So many bicycles — ring ring! — and boats float on water streets!" },
  be: { icons: '🧇🍫😋', capIcons: '⚛️',
    capCue: "Brussels! A giant shiny ball building called the Atomium — like a huge silver toy!" },
  de: { icons: '🚗💨🥨', capIcons: '🐻🚦',
    capCue: "Berlin! A funny little green man in the traffic light says walk, walk, walk!" },
  at: { icons: '🎻🎼⛰️', capIcons: '🎡🎹',
    capCue: "Vienna! A giant old wheel turns in the sky, and piano music plays everywhere!" },
  cz: { icons: '✅😄🏰', capIcons: '🕰️✨',
    capCue: "Prague! A magic clock where little statues come out and dance every hour!" },
  pl: { icons: '🥟😋', capIcons: '🧜‍♀️⚔️',
    capCue: "Warsaw! A brave mermaid with a sword guards the whole city!" },
  lu: { icons: '💎📦✨', capIcons: '🌉🏰',
    capCue: "Luxembourg City! Big big bridges fly over a green green valley!" },
  dk: { icons: '🧱🏗️🎨', capIcons: '🧜‍♀️⛵',
    capCue: "Copenhagen! The Little Mermaid sits on a stone by the sea, watching the ships!" },
  no: { icons: '🦌🌌✨', capIcons: '⛵🪓',
    capCue: "Oslo! Real Viking ships live there — big wooden boats of the Vikings!" },
  se: { icons: '🧆📦🛋️', capIcons: '👑🏰',
    capCue: "Stockholm! The king lives in a royal palace with shiny marching guards!" },
  fi: { icons: '🎅🦌🎁', capIcons: '⛪🚢',
    capCue: "Helsinki! A big white church sits on giant steps, and big ships sail right past!" },
  ee: { icons: '🤖💻🎮', capIcons: '🏰🧙',
    capCue: "Tallinn! An old old town with pointy towers — just like a fairy tale!" },
  lv: { icons: '🌲🌳🍄', capIcons: '🐓✨',
    capCue: "Riga! Golden roosters sit on top of the church towers — cock-a-doodle-doo!" },
  lt: { icons: '🏀🙌', capIcons: '🎈⛪',
    capCue: "Vilnius! Hot air balloons float over the old town — up, up, up!" },
  by: { icons: '🦬🌲', capIcons: '🏛️❄️',
    capCue: "Minsk! Big wide streets, and snowy snowy winters — brrr!" },
  ua: { icons: '🌻☀️', capIcons: '⛪✨',
    capCue: "Kyiv! Golden domes shine like little suns on top of the churches!" },
  ru: { icons: '🪆❄️🐻', capIcons: '🏰🍭',
    capCue: "Moscow! A candy-coloured castle church with swirly domes like ice-cream cones!" },
  md: { icons: '🍇😋', capIcons: '🌳🍇',
    capCue: "Chisinau! A green green city full of parks and sweet sweet grapes!" },
  hu: { icons: '🍲😋', capIcons: '🌉🦁',
    capCue: "Budapest! A shiny bridge guarded by stone lions, over a big big river!" },
  ro: { icons: '🏰📖🌙', capIcons: '🏛️😲',
    capCue: "Bucharest! One of the biggest buildings in the whole world is there — so so big!" },
  bg: { icons: '🌹🌸💐', capIcons: '⛪⛰️',
    capCue: "Sofia! A golden-dome church sparkles under a big mountain!" },
  gr: { icons: '🏛️🌊🫒', capIcons: '🏛️🦉',
    capCue: "Athens! The Parthenon — very very old pillars on a hill, with wise little owls!" },
  hr: { icons: '🐕🏖️', capIcons: '❤️🍬',
    capCue: "Zagreb! Little red hearts made of sugar — sweet licitar hearts everywhere!" },
  rs: { icons: '🍓😋', capIcons: '🏰🌊',
    capCue: "Belgrade! A big old fort watches two rivers meet and say hello!" },
  sk: { icons: '🏰⛰️', capIcons: '🏰🛸',
    capCue: "Bratislava! A castle like an upside-down table, and a bridge with a UFO on top!" },
  si: { icons: '❤️🏞️🦢', capIcons: '🐉🌉',
    capCue: "Ljubljana! Friendly dragons guard the dragon bridge — rawr!" },
  ba: { icons: '🌉💦', capIcons: '⛲🕊️',
    capCue: "Sarajevo! An old wooden fountain where pigeons come to drink water!" },
  me: { icons: '🏔️⬛', capIcons: '🌉🏞️',
    capCue: "Podgorica! A shiny new bridge flies over a blue-green river!" },
  al: { icons: '🦅🪽', capIcons: '🎨🏠',
    capCue: "Tirana! Houses painted in happy colours — pink, yellow, green, orange!" },
  mk: { icons: '🗿🫸', capIcons: '🗿🌉',
    capCue: "Skopje! An old stone bridge, and statues, statues everywhere — freeze!" },
  xk: { icons: '👶🍼', capIcons: '👶🔤',
    capCue: "Pristina! A big giant sign that says NEWBORN — because it is a baby country!" },
};

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
  all_done_asia: "Wow! You finished the whole map of Asia! You are a champion!",
  flag_prompt: "Look at this flag! Which country does it belong to? Tap it!",
  // --- Guess role-play ---
  guess_who: "Guess guess! Kaun hoon main? Who am I?",
  guess_cap: "Ab bolo — what is my capital city? Guess guess!",
  guess_flag: "Now find my flag! Kaun sa jhanda mera hai? Tap it!",
  got_it_1: "Yes yes yes! You knew it! Shabash!",
  got_it_2: "Correct! What a smart baccha!",
  reveal: "Okay okay, I will tell you! Dekho...",
  one_more_hint: "Ek aur hint! Listen carefully...",
  flag_reveal: "Yeh raha! This one is my flag! Look at it nicely!",
  quiz_reveal: "Koi baat nahi! Here is the answer — dekho, it lights up!",
  // --- Start screen & phases ---
  welcome_back: "Welcome back! Wapas aa gaye! Let's continue our map!",
  fresh_start: "Naya game! A fresh new map — let's start from the beginning!",
  pick_phase: "Which set shall we play? Choose one!",
};
