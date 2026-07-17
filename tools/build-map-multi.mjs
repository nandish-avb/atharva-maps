// Build puzzle map data for the Americas + Oceania.
// Usage: node build-map-multi.mjs <namerica|samerica|oceania>
import { readFileSync, writeFileSync } from 'node:fs';
import * as topojson from 'topojson-client';
import { geoConicConformal, geoMercator, geoPath } from 'd3-geo';

const topo = JSON.parse(readFileSync('./countries-50m.json', 'utf8'));
const countries = topojson.feature(topo, topo.objects.countries).features;

const which = process.argv[2];

const CONFIGS = {
  namerica: {
    out: 'map-namerica.js',
    proj: () => geoConicConformal().rotate([95, 0]).parallels([15, 50]),
    win: { lonMin: -128, lonMax: -58, latMin: 5, latMax: 75 },
    names: {
      'Canada': 'ca', 'United States of America': 'us', 'Mexico': 'mx',
      'Guatemala': 'gt', 'Belize': 'bz', 'Honduras': 'hn', 'El Salvador': 'sv',
      'Nicaragua': 'ni', 'Costa Rica': 'cr', 'Panama': 'pa', 'Cuba': 'cu',
      'Jamaica': 'jm', 'Haiti': 'ht', 'Dominican Rep.': 'do', 'Bahamas': 'bs',
      'Trinidad and Tobago': 'tt',
    },
  },
  samerica: {
    out: 'map-samerica.js',
    proj: () => geoMercator(),
    win: { lonMin: -82, lonMax: -34, latMin: -56, latMax: 14 },
    names: {
      'Brazil': 'br', 'Colombia': 'co', 'Venezuela': 've', 'Guyana': 'gy',
      'Suriname': 'sr', 'Ecuador': 'ec', 'Peru': 'pe', 'Bolivia': 'bo',
      'Chile': 'cl', 'Argentina': 'ar', 'Paraguay': 'py', 'Uruguay': 'uy',
    },
  },
  oceania: {
    out: 'map-oceania.js',
    proj: () => geoMercator(),
    win: { lonMin: 110, lonMax: 180, latMin: -48, latMax: 2 },
    names: {
      'Australia': 'au', 'New Zealand': 'nz', 'Papua New Guinea': 'pg',
      'Fiji': 'fj', 'Solomon Is.': 'sb', 'Vanuatu': 'vu',
    },
  },
};

const cfg = CONFIGS[which];
if (!cfg) { console.error('Unknown:', which); process.exit(1); }

const NAMES = new Map(Object.entries(cfg.names));
const found = countries.filter(f => NAMES.has(f.properties.name));
const missing = [...NAMES.keys()].filter(n => !found.some(f => f.properties.name === n));
if (missing.length) console.error('MISSING:', missing);

function windowOnly(feature) {
  const { lonMin, lonMax, latMin, latMax } = cfg.win;
  const geom = feature.geometry;
  const polys = geom.type === 'MultiPolygon' ? geom.coordinates : [geom.coordinates];
  const kept = polys.filter(poly => {
    const ring = poly[0];
    let lon = 0, lat = 0;
    for (const p of ring) { lon += p[0]; lat += p[1]; }
    lon /= ring.length; lat /= ring.length;
    return lon > lonMin && lon < lonMax && lat > latMin && lat < latMax;
  });
  return { ...feature, geometry: { type: 'MultiPolygon', coordinates: kept } };
}

const clipped = found.map(windowOnly).filter(f => f.geometry.coordinates.length);

const W = 820, H = 940;
const projection = cfg.proj()
  .fitExtent([[8, 8], [W - 8, H - 8]], { type: 'FeatureCollection', features: clipped });
projection.clipExtent([[0, 0], [W, H]]);
const path = geoPath(projection);

const out = {};
for (const feat of clipped) {
  const cc = NAMES.get(feat.properties.name);
  const d = path(feat);
  if (!d) { console.error('NO PATH for', feat.properties.name); continue; }
  const c = path.centroid(feat);
  const b = path.bounds(feat);
  const dr = d.replace(/(\d+\.\d+)/g, m => (+m).toFixed(1));
  out[cc] = {
    name: feat.properties.name, d: dr,
    cx: +c[0].toFixed(1), cy: +c[1].toFixed(1),
    x0: +b[0][0].toFixed(1), y0: +b[0][1].toFixed(1),
    x1: +b[1][0].toFixed(1), y1: +b[1][1].toFixed(1),
  };
}

const js = 'export const MAP_W = ' + W + ';\nexport const MAP_H = ' + H + ';\n' +
  'export const SHAPES = ' + JSON.stringify(out) + ';\n';
writeFileSync('./' + cfg.out, js);
console.log(which, 'OK wrote', Object.keys(out).length, 'countries,', js.length, 'bytes');
