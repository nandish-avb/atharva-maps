// Build Africa puzzle map data from world-atlas TopoJSON.
import { readFileSync, writeFileSync } from 'node:fs';
import * as topojson from 'topojson-client';
import { geoMercator, geoPath } from 'd3-geo';

const topo = JSON.parse(readFileSync('./countries-50m.json', 'utf8'));
const countries = topojson.feature(topo, topo.objects.countries).features;

const AFRICA = new Map(Object.entries({
  'Egypt': 'eg', 'Libya': 'ly', 'Tunisia': 'tn', 'Algeria': 'dz', 'Morocco': 'ma',
  'Mauritania': 'mr', 'Mali': 'ml', 'Niger': 'ne', 'Chad': 'td', 'Sudan': 'sd',
  'Senegal': 'sn', 'Gambia': 'gm', 'Guinea-Bissau': 'gw', 'Guinea': 'gn',
  'Sierra Leone': 'sl', 'Liberia': 'lr', "Côte d'Ivoire": 'ci', 'Ghana': 'gh',
  'Togo': 'tg', 'Benin': 'bj', 'Burkina Faso': 'bf', 'Nigeria': 'ng',
  'Cameroon': 'cm', 'Central African Rep.': 'cf', 'S. Sudan': 'ss',
  'Gabon': 'ga', 'Congo': 'cg', 'Dem. Rep. Congo': 'cd', 'Eq. Guinea': 'gq',
  'Ethiopia': 'et', 'Eritrea': 'er', 'Djibouti': 'dj', 'Somalia': 'so',
  'Kenya': 'ke', 'Uganda': 'ug', 'Rwanda': 'rw', 'Burundi': 'bi',
  'Tanzania': 'tz', 'Malawi': 'mw', 'Zambia': 'zm', 'Mozambique': 'mz',
  'Zimbabwe': 'zw', 'Angola': 'ao', 'Namibia': 'na', 'Botswana': 'bw',
  'South Africa': 'za', 'Lesotho': 'ls', 'eSwatini': 'sz', 'Madagascar': 'mg',
}));

// Non-playable background land so the continent has no holes.
const BACKGROUND = new Map(Object.entries({
  'W. Sahara': 'eh', 'Somaliland': 'xso',
}));

const ALL = new Map([...AFRICA, ...BACKGROUND]);

const found = countries.filter(f => ALL.has(f.properties.name));
const missing = [...ALL.keys()].filter(n => !found.some(f => f.properties.name === n));
if (missing.length) console.error('MISSING:', missing);

// Keep polygons inside an Africa window (drops far-flung islands).
function africaOnly(feature) {
  const geom = feature.geometry;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const kept = polys.filter(poly => {
    const ring = poly[0];
    let lon = 0, lat = 0;
    for (const p of ring) { lon += p[0]; lat += p[1]; }
    lon /= ring.length; lat /= ring.length;
    return lon > -20 && lon < 52 && lat > -36 && lat < 38;
  });
  return { ...feature, geometry: { type: 'MultiPolygon', coordinates: kept } };
}

const clipped = found.map(africaOnly);

const W = 820, H = 940;
const projection = geoMercator()
  .fitExtent([[8, 8], [W - 8, H - 8]], {
    type: 'FeatureCollection',
    features: clipped,
  });

projection.clipExtent([[0, 0], [W, H]]);
const path = geoPath(projection);

const out = {};
for (const feat of clipped) {
  const name = feat.properties.name;
  const cc = ALL.get(name);
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
writeFileSync('./map-africa.js', js);
console.log('OK wrote', Object.keys(out).length, 'countries,', js.length, 'bytes');
