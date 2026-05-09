// Screenshot the very top of the hero (navbar + headline) at mobile
const { chromium } = require('playwright');
const path = require('path');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const BASE_URL = 'http://localhost:3001';

async function run() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE_URL, { waitUntil: 'networkidle' });

  // Screenshot top 900px to capture full hero headline + CTAs
  await page.screenshot({
    path: path.join(SCREENSHOTS_DIR, 'hero-top-375.png'),
    clip: { x: 0, y: 0, width: 375, height: 900 }
  });
  console.log('Saved hero-top-375.png');

  // Also check console for hydration errors
  const errors = [];
  page.on('console', msg => { if (msg.type() === 'error') errors.push(msg.text()); });

  // Reload and collect errors
  await page.reload({ waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);
  console.log('Console errors after reload:', errors.length);
  errors.forEach(e => console.log(' ERROR:', e));

  await browser.close();
}

run().catch(err => { console.error(err); process.exit(1); });
