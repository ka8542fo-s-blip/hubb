// Ritar omslagen, korten och fokustimerns bakgrund med verktyg/neon.html.
// Kör från repots rot:
//   node verktyg/render.js              ritar om alla bilder
//   node verktyg/render.js omslag/hem   ritar bara en bild
// Kräver paketen playwright (med Chromium) och sharp.
const path = require('path');
const { chromium } = require('playwright');
const sharp = require('sharp');

const root = path.resolve(__dirname, '..');
const page = 'file://' + path.join(__dirname, 'neon.html');
const only = process.argv.slice(2);

const OMSLAG = { dir: 'omslag', w: 1500, h: 600, brick: 112 };
const KORT = { dir: 'kort', w: 600, h: 380, brick: 74, sw: 4.6 };

// text: skylten, size: textens storlek, icon och iconsize: ikonen (se ICONS i neon.html),
// seed: tegelmönstret, gap: avståndet mellan ikon och text.
const jobs = [
  { name: 'hubb', ...OMSLAG, text: 'Hubb', size: 150, icon: 'compass', iconsize: 150, seed: 11, gap: 40 },
  { name: 'pinteg', ...OMSLAG, text: 'Pinteg', size: 140, icon: 'shield', iconsize: 150, seed: 12, gap: 40 },
  { name: 'studier', ...OMSLAG, text: 'Studier', size: 140, icon: 'cap', iconsize: 160, seed: 13, gap: 36 },
  { name: 'brf', ...OMSLAG, text: 'Södra parken', size: 120, icon: 'building', iconsize: 150, seed: 14, gap: 40 },
  { name: 'sidoprojekt', ...OMSLAG, text: 'Sidoprojekt', size: 120, icon: 'rocket', iconsize: 150, seed: 15, gap: 36 },
  { name: 'ekonomi', ...OMSLAG, text: 'Ekonomi', size: 135, icon: 'chart', iconsize: 150, seed: 16, gap: 40 },
  { name: 'hem', ...OMSLAG, text: 'Hem', size: 150, icon: 'home', iconsize: 150, seed: 17, gap: 36 },
  { name: 'pinteg', ...KORT, icon: 'shield', iconsize: 170, seed: 21 },
  { name: 'studier', ...KORT, icon: 'cap', iconsize: 180, seed: 22 },
  { name: 'brf', ...KORT, icon: 'building', iconsize: 170, seed: 23 },
  { name: 'sidoprojekt', ...KORT, icon: 'rocket', iconsize: 170, seed: 24 },
  { name: 'ekonomi', ...KORT, icon: 'chart', iconsize: 170, seed: 25 },
  { name: 'hem', ...KORT, icon: 'home', iconsize: 170, seed: 26 },
  { name: 'fokus-bakgrund', dir: 'widgets', w: 640, h: 640, brick: 64, seed: 31, glow: 0.75, gy: 0.42 },
];

(async () => {
  const browser = await chromium.launch();
  const p = await browser.newPage({ deviceScaleFactor: 1 });
  for (const j of jobs) {
    const id = j.dir + '/' + j.name;
    if (only.length && !only.includes(id)) continue;
    const qs = new URLSearchParams();
    for (const [k, v] of Object.entries(j)) if (!['name', 'dir', 'gap'].includes(k)) qs.set(k, v);
    await p.setViewportSize({ width: j.w, height: j.h });
    await p.goto(page + '?' + qs.toString());
    if (j.gap) await p.evaluate((gap) => document.getElementById('sign').style.setProperty('--gap', gap + 'px'), j.gap);
    await p.waitForSelector('body[data-ready="1"]');
    await p.waitForTimeout(150);
    const png = await p.locator('#stage').screenshot();
    await sharp(png).jpeg({ quality: 84, mozjpeg: true, chromaSubsampling: '4:4:4' }).toFile(path.join(root, id + '.jpg'));
    console.log(id + '.jpg');
  }
  await browser.close();
})();
