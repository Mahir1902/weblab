// Crop screenshots around the IndustryBar section at each breakpoint
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const BASE_URL = 'http://localhost:3001';

const BREAKPOINTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

async function run() {
  const browser = await chromium.launch({ headless: true });

  for (const bp of BREAKPOINTS) {
    const page = await browser.newPage();
    await page.setViewportSize({ width: bp.width, height: bp.height });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll IndustryBar into view and screenshot just that section
    const section = await page.$('section[aria-label="Industries we serve"]');
    if (section) {
      await section.scrollIntoViewIfNeeded();
      await page.waitForTimeout(300);
      const savePath = path.join(SCREENSHOTS_DIR, `industrybar-${bp.name}.png`);
      await section.screenshot({ path: savePath });
      console.log(`Saved: ${savePath}`);
    } else {
      console.log(`IndustryBar not found at ${bp.name}px`);
    }

    // Also screenshot the hero area (first ~600px of the page)
    const heroPath = path.join(SCREENSHOTS_DIR, `hero-${bp.name}.png`);
    await page.screenshot({
      path: heroPath,
      clip: { x: 0, y: 0, width: bp.width, height: Math.min(700, bp.height) }
    });
    console.log(`Hero screenshot saved: ${heroPath}`);

    await page.close();
  }

  await browser.close();
  console.log('Done.');
}

run().catch(err => { console.error(err); process.exit(1); });
