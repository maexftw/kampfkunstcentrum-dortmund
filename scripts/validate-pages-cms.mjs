import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const jsonFiles = [
  'content/site.json',
  'content/home.json',
  'content/programs.json',
  'content/training-times.json'
];
const allowedSchemes = /^(#|\/|\.\/|\.\.\/|https?:\/\/|mailto:|tel:)/i;
const dangerousSchemes = /^(javascript|data|vbscript):/i;
const hrefLikeKeys = /(?:href|url|anchor)$/i;

const load = (rel) => JSON.parse(fs.readFileSync(path.join(root, rel), 'utf8'));
const failures = [];

for (const file of jsonFiles) load(file);

const site = load('content/site.json');
const home = load('content/home.json');
const programs = load('content/programs.json');
const training = load('content/training-times.json');

function walk(value, trail = []) {
  if (Array.isArray(value)) return value.forEach((item, i) => walk(item, [...trail, i]));
  if (!value || typeof value !== 'object') return;
  for (const [key, val] of Object.entries(value)) {
    const next = [...trail, key];
    if (typeof val === 'string' && hrefLikeKeys.test(key)) {
      const trimmed = val.trim();
      if (dangerousSchemes.test(trimmed) || (trimmed && !allowedSchemes.test(trimmed) && /^[A-Za-z][A-Za-z0-9+.-]*:/.test(trimmed))) {
        failures.push(`Unsafe CMS link at ${next.join('.')}: ${trimmed}`);
      }
    }
    walk(val, next);
  }
}

walk({ site, home, programs, training });

if (!Array.isArray(programs.items) || programs.items.length < 2) failures.push('programs.items must contain Wing Chun and Krav Maga entries');
if (!Array.isArray(training.days) || training.days.length < 4) failures.push('training.days should contain the visible training days');
for (const [dayIndex, day] of (training.days || []).entries()) {
  if (!Array.isArray(day.sessions) || day.sessions.length === 0) failures.push(`training.days[${dayIndex}] has no sessions`);
  for (const [sessionIndex, session] of (day.sessions || []).entries()) {
    for (const field of ['timeStart', 'timeEnd', 'sessionLabel', 'spotsStatus', 'spotsText']) {
      if (!session[field]) failures.push(`training.days[${dayIndex}].sessions[${sessionIndex}] missing ${field}`);
    }
  }
}

for (const asset of ['favicon.ico', 'apple-touch-icon.png', 'images/og-image.jpg', '.pages.yml', 'js/pages-cms.js']) {
  if (!fs.existsSync(path.join(root, asset))) failures.push(`Missing ${asset}`);
}

if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}
console.log('Pages CMS validation passed');
