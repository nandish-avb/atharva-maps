// Build Asia puzzle map data from world-atlas TopoJSON (same pattern as Europe).
import { readFileSync, writeFileSync } from 'node:fs';
import * as topojson from 'topojson-client';
import { geoConicConformal, geoPath } from 'd3-geo';

const topo = JSON.parse(readFileSync('./countries-50m.json', 'utf8'));
const countries = topojson.feature(topo, topo.objects.countries).features;

const ASIA = new Map(Object.entries({
  'India': 'in', 'Pakistan': 'pk', 'Nepal': 'np', 'Bhutan': 'bt',
  'Bangladesh': 'bd', 'Sri Lanka': 'lk', 'China': 'cn', 'Japan': 'jp',
  'South Korea': 'kr', 'North Korea': 'kp', 'Mongolia': 'mn', 'Taiwan': 'tw',
  'Myanmar': 'mm', 'Thailand': 'th', 'Laos': 'la', 'Cambodia': 'kh',
  'Vietnam': 'vn', 'Malaysia': 'my', 'Singapore': 'sg', 'Indonesia': 'id',
  'Philippines': 'ph', 'Brunei': 'bn', 'Kazakhstan': 'kz', 'Uzbekistan': 'uz',
  'Turkmenistan': 'tm', 'Kyrgyzstan': 'kg', 'Tajikistan': 'tj',
  'Afghanistan': 'af', 'Saudi Arabia': 'sa', 'United Arab Emirates': 'ae',
  'Qatar': 'qa', 'Oman': 'om', 'Yemen': 'ye', 'Kuwait': 'kw', 'Iran': 'ir',
  'Iraq': 'iq', 'Turkey': 'tr', 'Syria': 'sy', 'Jordan': 'jo', 'Israel': 'il',
  'Lebanon': 'lb', 'Georgia': 'ge', 'Armenia': 'am', 'Azerbaijan': 'az',
}));

const found = countries.filter(f => ASIA.has(f.properties.name));
const missing = [...ASIA.keys()].filter(n => !found.some(f => f.properties.name === n));
if (missing.length) console.error('MISSING:', missing);

// Keep polygons inside an Asia window (drops far-flung islands and oddities).
function asiaOnly(feature) {
  const geom = feature.geometry;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const kept = polys.filter(poly => {
    const ring = poly[0];
    let lon = 0, lat = 0;
    for (const p of ring) { lon += p[0]; lat += p[1]; }
    lon /= ring.length; lat /= ring.length;
    return lon > 23 && lon < 150 && lat > -12 && lat < 57;
  });
  return { ...feature, geometry: { type: 'MultiPolygon', coordinates: kept } };
}

const clipped = found.map(asiaOnly);

const W = 820, H = 940;
const projection = geoConicConformal()
  .rotate([-87, 0])
  .parallels([10, 45])
  .fitExtent([[8, 8], [W - 8, H - 8]], {
    type: 'FeatureCollection',
    features: clipped,
  });

projection.clipExtent([[0, 0], [W, H]]);
const path = geoPath(projection);

const out = {};
for (const feat of clipped) {
  const name = feat.properties.name;
  const cc = ASIA.get(name);
  const d = path(feat);
  if (!d) { console.error('NO PATH for', name); continue; }
  const c = path.centroid(feat);
  const b = path.bounds(feat);
  const dr = d.replace(/(\d+\.\d+)/g, m => (+m).toFixed(1));
  out[cc] = {
    name,
    d: dr,
    cx: +c[0].toFixed(1), cy: +c[1].toFixed(1),
    x0: +b[0][0].toFixed(1), y0: +b[0][1].toFixed(1),
    x1: +b[1][0].toFixed(1), y1: +b[1][1].toFixed(1),
  };
}

for (const [cc, v] of Object.entries(out)) {
  const w = v.x1 - v.x0, h = v.y1 - v.y0;
  if (w > 500 || h > 500) console.error('BIG BBOX', cc, v.name, Math.round(w), Math.round(h));
}

const js = 'export const MAP_W = ' + W + ';\nexport const MAP_H = ' + H + ';\n' +
  'export const SHAPES = ' + JSON.stringify(out) + ';\n';
writeFileSync('./map-asia.js', js);
console.log('OK wrote', Object.keys(out).length, 'countries,', js.length, 'bytes');
