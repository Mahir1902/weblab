/**
 * UI test: IndustryBar + Alternating Backgrounds
 * Saves screenshots to ./screenshots/
 */
import { chromium } from 'playwright';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = path.join(__dirname, 'screenshots');
const BASE_URL = 'http://localhost:3001';

const BREAKPOINTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

const results = { failures: [], warnings: [], passes: [] };

function pass(msg)  { results.passes.push(msg);   console.log('  PASS:', msg); }
function fail(msg, severity = 'Major') { results.failures.push({ msg, severity }); console.error('  FAIL [' + severity + ']:', msg); }
function warn(msg)  { results.warnings.push(msg); console.warn('  WARN:', msg); }

async function testHomepage() {
  const browser = await chromium.launch({ headless: true });

  for (const bp of BREAKPOINTS) {
    console.log(`\n=== Testing homepage @ ${bp.name}px ===`);
    const context = await browser.newContext({
      viewport: { width: bp.width, height: bp.height },
    });
    const page = await context.newPage();

    // Collect console errors
    const consoleErrors = [];
    page.on('console', msg => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });
    page.on('pageerror', err => consoleErrors.push(err.message));

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // ── 1. IndustryBar heading ──────────────────────────────────────────────
    const industrySection = page.locator('section[aria-label="Industries we serve"]');
    const headingText = await industrySection.locator('p').first().textContent();
    if (headingText && headingText.trim() === 'Trusted by Service Professionals') {
      pass(`[${bp.name}px] IndustryBar heading: "${headingText.trim()}"`);
    } else {
      fail(`[${bp.name}px] IndustryBar heading wrong: "${headingText?.trim()}"`, 'Critical');
    }

    // ── 2. 7 industries rendered ────────────────────────────────────────────
    const industries = await industrySection.locator('span.group').all();
    const industryNames = await Promise.all(industries.map(el => el.textContent()));
    const expected = ['Plumbers', 'Electricians', 'HVAC', 'Landscapers', 'Construction', 'Pet Grooming', 'Carpentry'];
    const actualNames = industryNames.map(n => n.trim()).filter(Boolean);

    if (industries.length === 7) {
      pass(`[${bp.name}px] IndustryBar: 7 industries rendered`);
    } else {
      fail(`[${bp.name}px] IndustryBar: expected 7 industries, got ${industries.length}`, 'Critical');
    }

    for (const name of expected) {
      const found = actualNames.some(n => n.includes(name));
      if (found) {
        pass(`[${bp.name}px] Industry "${name}" present`);
      } else {
        fail(`[${bp.name}px] Industry "${name}" missing. Got: ${actualNames.join(', ')}`, 'Critical');
      }
    }

    // ── 3. SVG icons inside each industry span ──────────────────────────────
    for (let i = 0; i < industries.length; i++) {
      const svgCount = await industries[i].locator('svg').count();
      if (svgCount > 0) {
        pass(`[${bp.name}px] Industry[${i}] has SVG icon`);
      } else {
        fail(`[${bp.name}px] Industry[${i}] missing SVG icon`, 'Major');
      }
    }

    // ── 4. Alternating background colors ────────────────────────────────────
    // Hero: bg-white (#FFFFFF), IndustryBar: bg-[var(--color-surface)] (#F5F0EB)
    // SmartWebsiteFeatures: bg-background (#FFFFFF), ProblemSolution: bg-surface (#F5F0EB)
    // ServicesOverview: bg-background, AutomationsSection: bg-surface
    // TestimonialsSection: bg-background, HowItWorks: bg-surface
    // MobileAppSection: bg-background, BookingCTA: bg-surface

    // Hero
    const heroBg = await page.evaluate(() => {
      const el = document.querySelector('[class*="min-h-screen"]');
      return el ? window.getComputedStyle(el).backgroundColor : null;
    });
    if (heroBg === 'rgb(255, 255, 255)') {
      pass(`[${bp.name}px] Hero bg: white #FFFFFF`);
    } else {
      warn(`[${bp.name}px] Hero bg unexpected: ${heroBg}`);
    }

    // IndustryBar
    const industryBg = await page.evaluate(() => {
      const el = document.querySelector('section[aria-label="Industries we serve"]');
      return el ? window.getComputedStyle(el).backgroundColor : null;
    });
    // #F5F0EB = rgb(245, 240, 235)
    if (industryBg === 'rgb(245, 240, 235)') {
      pass(`[${bp.name}px] IndustryBar bg: tan #F5F0EB`);
    } else {
      fail(`[${bp.name}px] IndustryBar bg wrong: ${industryBg} (expected rgb(245,240,235))`, 'Major');
    }

    // Check section backgrounds by reading computed bg for each section element
    const sectionData = await page.evaluate(() => {
      // Collect all top-level sections in order
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.map(s => ({
        ariaLabel: s.getAttribute('aria-label') || '',
        bg: window.getComputedStyle(s).backgroundColor,
        className: s.className.substring(0, 120),
      }));
    });

    console.log(`  [${bp.name}px] Sections found: ${sectionData.length}`);
    for (const s of sectionData) {
      console.log(`    section[${s.ariaLabel || 'unlabeled'}] bg=${s.bg}`);
    }

    // Verify alternating pattern: white then tan then white...
    // Expected sequence by section label / position
    const expectedBgs = [
      // IndustryBar is the first named section in the list
      { hint: 'Industries we serve', expected: 'rgb(245, 240, 235)' },
    ];

    // SmartWebsiteFeatures = 3rd section (after hero divs), bg-background=white
    // ProblemSolution = bg-surface=tan
    // ServicesOverview = bg-background=white
    // AutomationsSection = bg-surface=tan
    // TestimonialsSection = bg-background=white
    // HowItWorks = bg-surface=tan
    // MobileAppSection = bg-background=white
    // BookingCTA = bg-surface=tan

    const bgPattern = sectionData.map(s => s.bg === 'rgb(255, 255, 255)' ? 'white' : s.bg === 'rgb(245, 240, 235)' ? 'tan' : 'other');
    console.log(`  [${bp.name}px] BG pattern: ${bgPattern.join(' → ')}`);

    // Check no two consecutive sections share the same background
    let consecutiveFail = false;
    for (let i = 1; i < bgPattern.length; i++) {
      if (bgPattern[i] !== 'other' && bgPattern[i - 1] !== 'other' && bgPattern[i] === bgPattern[i - 1]) {
        fail(`[${bp.name}px] Consecutive same-bg: sections[${i-1}] and [${i}] both "${bgPattern[i]}"`, 'Major');
        consecutiveFail = true;
      }
    }
    if (!consecutiveFail && bgPattern.length > 1) {
      pass(`[${bp.name}px] Alternating background pattern intact (no consecutive duplicates)`);
    }

    // ── 5. No horizontal scroll ─────────────────────────────────────────────
    const hasHorizScroll = await page.evaluate(() => document.documentElement.scrollWidth > document.documentElement.clientWidth);
    if (hasHorizScroll) {
      fail(`[${bp.name}px] Horizontal scroll detected`, 'Major');
    } else {
      pass(`[${bp.name}px] No horizontal scroll`);
    }

    // ── 6. Console errors ───────────────────────────────────────────────────
    // Scroll through the page to trigger lazy-reveal animations
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    if (consoleErrors.length === 0) {
      pass(`[${bp.name}px] Zero console errors`);
    } else {
      for (const err of consoleErrors) {
        fail(`[${bp.name}px] Console error: ${err}`, 'Critical');
      }
    }

    // ── 7. Hover micro-animation (CSS check — can't simulate hover in headless
    //       without inject, but we can verify the classes are present) ────────
    if (bp.name === '1440') {
      const firstIndustry = industries[0];
      const hasHoverTranslate = await firstIndustry.evaluate(el => el.className.includes('hover:-translate-y'));
      const iconSpan = firstIndustry.locator('span').first();
      const hasIconScale = await iconSpan.evaluate(el => el.className.includes('group-hover:scale-110'));
      const hasDarkenText = await firstIndustry.evaluate(el => el.className.includes('hover:text-[var(--color-text-primary)]'));

      if (hasHoverTranslate) pass(`[${bp.name}px] Industry hover: -translate-y class present`);
      else fail(`[${bp.name}px] Industry hover: missing -translate-y class`, 'Major');

      if (hasIconScale) pass(`[${bp.name}px] Industry hover: group-hover:scale-110 on icon`);
      else fail(`[${bp.name}px] Industry hover: missing group-hover:scale-110 on icon`, 'Major');

      if (hasDarkenText) pass(`[${bp.name}px] Industry hover: text darken class present`);
      else fail(`[${bp.name}px] Industry hover: missing text darken class`, 'Major');
    }

    // ── 8. Full-page screenshot ─────────────────────────────────────────────
    // First scroll to top
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);

    const screenshotPath = path.join(SCREENSHOTS_DIR, `home-${bp.name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: true });
    pass(`[${bp.name}px] Screenshot saved: ${screenshotPath}`);

    await context.close();
  }

  await browser.close();
}

async function main() {
  console.log('Starting UI tests for homepage IndustryBar + Alternating BG...\n');
  try {
    await testHomepage();
  } catch (err) {
    fail(`Unexpected error: ${err.message}`, 'Critical');
    console.error(err);
  }

  console.log('\n=== RESULTS ===');
  console.log(`Passes:   ${results.passes.length}`);
  console.log(`Warnings: ${results.warnings.length}`);
  console.log(`Failures: ${results.failures.length}`);

  if (results.failures.length) {
    console.log('\nFailures:');
    for (const f of results.failures) {
      console.log(`  [${f.severity}] ${f.msg}`);
    }
  }

  // Write JSON summary for report generation
  const fs = await import('fs');
  fs.writeFileSync(
    path.join(__dirname, 'test-results.json'),
    JSON.stringify(results, null, 2)
  );

  process.exit(results.failures.some(f => f.severity === 'Critical') ? 1 : 0);
}

main();
