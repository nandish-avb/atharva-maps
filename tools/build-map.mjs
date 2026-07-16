// Build Europe puzzle map data from world-atlas TopoJSON.
// Outputs a JS module with per-country SVG paths, centroids and bboxes
// in a portrait-phone-friendly viewBox.
import { readFileSync, writeFileSync } from 'node:fs';
import * as topojson from 'topojson-client';
import { geoConicConformal, geoPath, geoCentroid } from 'd3-geo';

const topo = JSON.parse(readFileSync('./countries-50m.json', 'utf8'));
const countries = topojson.feature(topo, topo.objects.countries).features;

// List every country name in the dataset once (for verification)
const EUROPE = new Map(Object.entries({
  'Iceland': 'is', 'Ireland': 'ie', 'United Kingdom': 'gb', 'Portugal': 'pt',
  'Spain': 'es', 'France': 'fr', 'Belgium': 'be', 'Netherlands': 'nl',
  'Germany': 'de', 'Switzerland': 'ch', 'Austria': 'at', 'Italy': 'it',
  'Czechia': 'cz', 'Poland': 'pl', 'Denmark': 'dk', 'Norway': 'no',
  'Sweden': 'se', 'Finland': 'fi', 'Hungary': 'hu', 'Greece': 'gr',
  'Romania': 'ro', 'Ukraine': 'ua', 'Croatia': 'hr', 'Estonia': 'ee',
  'Latvia': 'lv', 'Lithuania': 'lt', 'Belarus': 'by', 'Moldova': 'md',
  'Bulgaria': 'bg', 'Serbia': 'rs', 'Slovakia': 'sk', 'Slovenia': 'si',
  'Bosnia and Herz.': 'ba', 'Albania': 'al', 'Macedonia': 'mk',
  'Montenegro': 'me', 'Kosovo': 'xk', 'Luxembourg': 'lu', 'Russia': 'ru',
}));

const found = countries.filter(f => EUROPE.has(f.properties.name));
const missing = [...EUROPE.keys()].filter(n => !found.some(f => f.properties.name === n));
if (missing.length) console.error('MISSING:', missing);

// Keep only polygons inside a European window: drops Svalbard, Canaries,
// Azores/Madeira, French overseas, Caribbean municipalities, far-east Russia.
function europeOnly(feature) {
  const geom = feature.geometry;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const kept = polys.filter(poly => {
    const ring = poly[0];
    let lon = 0, lat = 0;
    for (const p of ring) { lon += p[0]; lat += p[1]; }
    lon /= ring.length; lat /= ring.length;
    return lon > -25 && lon < 60 && lat > 34 && lat < 72;
  });
  return { ...feature, geometry: { type: 'MultiPolygon', coordinates: kept } };
}

const clipped = found.map(europeOnly);

// Conic conformal projection centred on Europe, portrait-ish output.
const W = 820, H = 940;
const projection = geoConicConformal()
  .rotate([-15, 0])
  .parallels([40, 62])
  .fitExtent([[8, 8], [W - 8, H - 8]], {
    type: 'FeatureCollection',
    features: clipped.filter(f => f.properties.name !== 'Russia'),
  });

projection.clipExtent([[0, 0], [W, H]]);
const path = geoPath(projection);

const out = {};
for (const feat of clipped) {
  const name = feat.properties.name;
  const cc = EUROPE.get(name);
  const d = path(feat);
  if (!d) { console.error('NO PATH for', name); continue; }
  const c = path.centroid(feat);
  const b = path.bounds(feat);
  // Round coordinates in path string to 1 decimal to shrink file
  const dr = d.replace(/(\d+\.\d+)/g, m => (+m).toFixed(1));
  out[cc] = {
    name,
    d: dr,
    cx: +c[0].toFixed(1), cy: +c[1].toFixed(1),
    x0: +b[0][0].toFixed(1), y0: +b[0][1].toFixed(1),
    x1: +b[1][0].toFixed(1), y1: +b[1][1].toFixed(1),
  };
}

// For countries with far-flung islands (Norway/Svalbard, Spain/Canaries, France/overseas,
// Portugal/Azores), the bbox gets huge. Report suspicious bboxes.
for (const [cc, v] of Object.entries(out)) {
  const w = v.x1 - v.x0, h = v.y1 - v.y0;
  if (w > 400 || h > 500) console.error('BIG BBOX', cc, v.name, Math.round(w), Math.round(h));
}

const js = 'export const MAP_W = ' + W + ';\nexport const MAP_H = ' + H + ';\n' +
  'export const SHAPES = ' + JSON.stringify(out) + ';\n';
writeFileSync('./map-europe.js', js);
console.log('OK wrote', Object.keys(out).length, 'countries,', js.length, 'bytes');
