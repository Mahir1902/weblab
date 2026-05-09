// IndustryBar UI test — homepage at 3 breakpoints
// Run: node .claude/progress/2026-04-25-industry-bar-test/run-tests.js

const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const SCREENSHOTS_DIR = path.join(
  __dirname,
  'screenshots'
);

const BREAKPOINTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

const BASE_URL = 'http://localhost:3001';

async function runTests() {
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });
  const results = [];

  for (const bp of BREAKPOINTS) {
    console.log(`\n=== Testing at ${bp.width}px ===`);

    const page = await browser.newPage();
    await page.setViewportSize({ width: bp.width, height: bp.height });

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    // Collect page errors (JS exceptions)
    const pageErrors = [];
    page.on('pageerror', err => pageErrors.push(err.message));

    await page.goto(`${BASE_URL}/`, { waitUntil: 'networkidle' });

    // ── Screenshot full page ──────────────────────────────────────────────
    const screenshotPath = path.join(SCREENSHOTS_DIR, `home-${bp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    console.log(`  Screenshot saved: ${screenshotPath}`);

    // ── 1. IndustryBar is visible below hero ──────────────────────────────
    const industryBar = await page.$('section[aria-label="Industries we serve"]');
    const industryBarVisible = industryBar
      ? await industryBar.isVisible()
      : false;
    console.log(`  [1] IndustryBar visible: ${industryBarVisible}`);

    // ── 2. Heading renders in accent color ────────────────────────────────
    const heading = await page.$('section[aria-label="Industries we serve"] p');
    let headingText = '';
    let headingColor = '';
    let headingUppercase = false;
    if (heading) {
      headingText = (await heading.textContent()) || '';
      headingColor = await page.evaluate(el => {
        return window.getComputedStyle(el).color;
      }, heading);
      headingUppercase = headingText.toUpperCase() === headingText;
    }
    console.log(`  [2] Heading text: "${headingText}"`);
    console.log(`  [2] Heading color (computed): ${headingColor}`);
    // accent is #295590 → rgb(41, 85, 144)
    const accentRgb = 'rgb(41, 85, 144)';
    const headingIsAccent = headingColor === accentRgb;
    console.log(`  [2] Heading is accent color (${accentRgb}): ${headingIsAccent}`);

    // ── 3. All 7 industries are displayed ─────────────────────────────────
    const industryItems = await page.$$('section[aria-label="Industries we serve"] span[class*="inline-flex"]');
    const industryCount = industryItems.length;
    console.log(`  [3] Industry items found: ${industryCount} (expected: 7)`);

    // Collect industry names
    const industryNames = [];
    for (const item of industryItems) {
      const text = await item.textContent();
      industryNames.push(text?.trim() || '');
    }
    console.log(`  [3] Industries: ${industryNames.join(', ')}`);

    // ── 4. Check layout — single row on desktop, wraps on mobile ──────────
    let layoutInfo = {};
    if (bp.width >= 1024) {
      // Desktop: all items should be on same Y position (flex no-wrap)
      const yPositions = [];
      for (const item of industryItems) {
        const box = await item.boundingBox();
        if (box) yPositions.push(Math.round(box.y));
      }
      const uniqueYPositions = [...new Set(yPositions)];
      layoutInfo.singleRow = uniqueYPositions.length === 1;
      layoutInfo.yPositions = uniqueYPositions;
      console.log(`  [4] Desktop single-row: ${layoutInfo.singleRow} (Y positions: ${uniqueYPositions.join(', ')})`);
    } else {
      // Mobile/tablet: items should wrap (multiple rows acceptable)
      const yPositions = [];
      for (const item of industryItems) {
        const box = await item.boundingBox();
        if (box) yPositions.push(Math.round(box.y));
      }
      const uniqueYPositions = [...new Set(yPositions)];
      layoutInfo.wrapsOnSmall = uniqueYPositions.length > 1;
      layoutInfo.yPositions = uniqueYPositions;
      console.log(`  [4] Mobile/tablet wraps: ${layoutInfo.wrapsOnSmall} (Y positions: ${uniqueYPositions.join(', ')})`);
    }

    // ── 5. Hero section still renders ─────────────────────────────────────
    // HeroWrapper renders AnimatedHero — look for h1 inside the page
    const h1 = await page.$('h1');
    const h1Text = h1 ? (await h1.textContent())?.trim() : null;
    const heroVisible = h1 ? await h1.isVisible() : false;
    console.log(`  [5] Hero h1 visible: ${heroVisible}, text: "${h1Text}"`);

    // Check for CTA buttons
    const ctaButtons = await page.$$('a[href*="book"], a[href*="#book-a-call"], button');
    console.log(`  [5] CTA/button elements: ${ctaButtons.length}`);

    // ── 6. Console errors / hydration issues ──────────────────────────────
    console.log(`  [6] Console errors: ${consoleErrors.length}`);
    if (consoleErrors.length) {
      consoleErrors.forEach(e => console.log(`      ERROR: ${e}`));
    }
    console.log(`  [6] Page (JS) errors: ${pageErrors.length}`);
    if (pageErrors.length) {
      pageErrors.forEach(e => console.log(`      PAGE_ERROR: ${e}`));
    }

    // ── 7. Icon accent color ──────────────────────────────────────────────
    // Icons are inside <span class="text-[var(--color-accent)]">
    const iconSpans = await page.$$('section[aria-label="Industries we serve"] span.text-\\[var\\(--color-accent\\)\\]');
    let iconColorOk = false;
    if (iconSpans.length > 0) {
      const iconColor = await page.evaluate(el => window.getComputedStyle(el).color, iconSpans[0]);
      iconColorOk = iconColor === accentRgb;
      console.log(`  [7] Icon accent color (first icon): ${iconColor} — matches accent: ${iconColorOk}`);
    } else {
      // Try alternate selector
      const altIconSpans = await page.$$('section[aria-label="Industries we serve"] span span');
      if (altIconSpans.length > 0) {
        const iconColor = await page.evaluate(el => window.getComputedStyle(el).color, altIconSpans[0]);
        iconColorOk = iconColor === accentRgb;
        console.log(`  [7] Icon color (alt selector): ${iconColor} — matches accent: ${iconColorOk}`);
      } else {
        console.log(`  [7] Icon spans not found with either selector`);
      }
    }

    // ── 8. Border lines visible ───────────────────────────────────────────
    const sectionEl = await page.$('section[aria-label="Industries we serve"]');
    let bordersVisible = false;
    if (sectionEl) {
      const borderInfo = await page.evaluate(el => {
        const styles = window.getComputedStyle(el);
        return {
          borderTopWidth: styles.borderTopWidth,
          borderBottomWidth: styles.borderBottomWidth,
          borderTopStyle: styles.borderTopStyle,
          borderBottomStyle: styles.borderBottomStyle,
          borderTopColor: styles.borderTopColor,
          borderBottomColor: styles.borderBottomColor,
        };
      }, sectionEl);
      bordersVisible =
        borderInfo.borderTopWidth !== '0px' &&
        borderInfo.borderBottomWidth !== '0px' &&
        borderInfo.borderTopStyle !== 'none' &&
        borderInfo.borderBottomStyle !== 'none';
      console.log(`  [8] Border top: ${borderInfo.borderTopWidth} ${borderInfo.borderTopStyle} ${borderInfo.borderTopColor}`);
      console.log(`  [8] Border bottom: ${borderInfo.borderBottomWidth} ${borderInfo.borderBottomStyle} ${borderInfo.borderBottomColor}`);
      console.log(`  [8] Borders visible: ${bordersVisible}`);
    }

    // ── Horizontal scroll check ───────────────────────────────────────────
    const hasHorizScroll = await page.evaluate(() => {
      return document.body.scrollWidth > window.innerWidth;
    });
    console.log(`  [layout] Horizontal scroll: ${hasHorizScroll}`);

    // ── IndustryBar position relative to hero ─────────────────────────────
    if (industryBar && h1) {
      const heroBox = await h1.boundingBox();
      const barBox = await industryBar.boundingBox();
      const isBelow = barBox && heroBox && barBox.y > heroBox.y;
      console.log(`  [position] IndustryBar (y=${barBox?.y}) is below hero h1 (y=${heroBox?.y}): ${isBelow}`);
    }

    // ── Background color ──────────────────────────────────────────────────
    const bgColor = await page.evaluate(() => window.getComputedStyle(document.body).backgroundColor);
    console.log(`  [design] Body background: ${bgColor}`);

    const surfaceBgColor = sectionEl
      ? await page.evaluate(el => window.getComputedStyle(el).backgroundColor, sectionEl)
      : 'N/A';
    console.log(`  [design] IndustryBar background: ${surfaceBgColor}`);

    // Store results for report
    results.push({
      breakpoint: bp.name,
      width: bp.width,
      industryBarVisible,
      headingText,
      headingIsAccent,
      headingColor,
      industryCount,
      industryNames,
      layoutInfo,
      heroVisible,
      consoleErrors: [...consoleErrors],
      pageErrors: [...pageErrors],
      iconColorOk,
      bordersVisible,
      hasHorizScroll,
      bgColor,
      surfaceBgColor,
      screenshotPath,
    });

    await page.close();
  }

  await browser.close();

  // Write JSON results for the report writer
  fs.writeFileSync(
    path.join(__dirname, 'test-results.json'),
    JSON.stringify(results, null, 2)
  );

  console.log('\n=== Tests complete. Results written to test-results.json ===');
  return results;
}

runTests().catch(err => {
  console.error('Test runner error:', err);
  process.exit(1);
});
