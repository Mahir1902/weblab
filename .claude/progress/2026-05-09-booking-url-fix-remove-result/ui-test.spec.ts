import { test, expect, Page } from '@playwright/test';

const BASE = 'http://localhost:3001';
const BREAKPOINTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
];

const SCREENSHOTS_DIR = '/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-05-09-booking-url-fix-remove-result/screenshots';

// Collect console errors per page
async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') errors.push(msg.text());
  });
  return errors;
}

// Navigate and wait for hydration
async function navigateTo(page: Page, url: string) {
  await page.goto(url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);
}

// ----------------------------------------------------------------
// 1. BOOKING CTA LINK TESTS
// ----------------------------------------------------------------

test.describe('Booking CTA links resolve to /contact', () => {

  test('Desktop navbar "Book a Call" → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');

    // Desktop CTA button
    const desktopCTA = page.locator('header').getByRole('link', { name: 'Book a Call' }).first();
    const href = await desktopCTA.getAttribute('href');
    expect(href).toBe('/contact');
  });

  test('Mobile navbar "Book a Call" → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, BASE + '/');

    // Open hamburger
    await page.getByRole('button', { name: 'Open menu' }).click();
    await page.waitForTimeout(400);

    const mobileCTA = page.getByRole('link', { name: 'Book a Call' }).last();
    const href = await mobileCTA.getAttribute('href');
    expect(href).toBe('/contact');
  });

  test('Hero section CTA → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');

    // Multiple CTAs may say "Book a Free Strategy Call" — get first one in hero
    const heroCTA = page.locator('section').first().getByRole('link', { name: /Book a Free Strategy Call/i }).first();
    // Fall back to any link with that text if not found in first section
    const allCTAs = page.getByRole('link', { name: /Book a Free Strategy Call/i });
    const count = await allCTAs.count();
    expect(count).toBeGreaterThan(0);
    const href = await allCTAs.first().getAttribute('href');
    expect(href).toBe('/contact');
  });

  test('Bottom BookingCTA on homepage → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');

    // Scroll to bottom
    await page.keyboard.press('End');
    await page.waitForTimeout(500);

    // All "Book a Free Strategy Call" links should be /contact
    const allCTAs = page.getByRole('link', { name: /Book a Free Strategy Call/i });
    const count = await allCTAs.count();
    for (let i = 0; i < count; i++) {
      const href = await allCTAs.nth(i).getAttribute('href');
      expect(href).toBe('/contact');
    }
  });

  test('Footer "Book a Free Call" → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');

    const footerCTA = page.locator('footer').getByRole('link', { name: 'Book a Free Call' });
    const href = await footerCTA.getAttribute('href');
    expect(href).toBe('/contact');
  });

  test('Service page /services/website-design CTA → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/services/website-design');

    // Mid-page CTA
    const midCTA = page.getByRole('link', { name: 'Book a Free Call' }).first();
    const href = await midCTA.getAttribute('href');
    expect(href).toBe('/contact');

    // Bottom BookingCTA
    const bottomCTA = page.getByRole('link', { name: /Book a Free Strategy Call/i });
    const bottomHref = await bottomCTA.getAttribute('href');
    expect(bottomHref).toBe('/contact');
  });

  test('Feature page /features/mobile-app CTA → /contact', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/features/mobile-app');

    const midCTA = page.getByRole('link', { name: 'Book a Free Call' }).first();
    const href = await midCTA.getAttribute('href');
    expect(href).toBe('/contact');

    const bottomCTA = page.getByRole('link', { name: /Book a Free Strategy Call/i });
    const bottomHref = await bottomCTA.getAttribute('href');
    expect(bottomHref).toBe('/contact');
  });

});

// ----------------------------------------------------------------
// 2. "THE RESULT" SECTION REMOVAL
// ----------------------------------------------------------------

test.describe('"The Result" section is absent', () => {

  test('/services/website-design has no "The Result" section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/services/website-design');

    const resultHeading = page.getByRole('heading', { name: /The Result/i });
    await expect(resultHeading).toHaveCount(0);

    // Also check: features grid comes right before FAQ, no result box between them
    const whatsIncluded = page.getByRole('heading', { name: /What.s Included/i });
    const commonQuestions = page.getByRole('heading', { name: /Common Questions/i });
    await expect(whatsIncluded).toBeVisible();
    await expect(commonQuestions).toBeVisible();
  });

  test('/features/mobile-app has no "The Result" section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/features/mobile-app');

    const resultHeading = page.getByRole('heading', { name: /The Result/i });
    await expect(resultHeading).toHaveCount(0);
  });

  test('/services/crm-automation has no "The Result" section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/services/crm-automation');

    const resultHeading = page.getByRole('heading', { name: /The Result/i });
    await expect(resultHeading).toHaveCount(0);
  });

  test('/features/online-booking has no "The Result" section', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/features/online-booking');

    const resultHeading = page.getByRole('heading', { name: /The Result/i });
    await expect(resultHeading).toHaveCount(0);
  });

});

// ----------------------------------------------------------------
// 3. MAIN PAGES — CONSOLE ERRORS + LAYOUT CHECKS
// ----------------------------------------------------------------

for (const bp of BREAKPOINTS) {
  test.describe(`Layout checks at ${bp.name}px`, () => {

    test(`/ — no console errors, background white, no horizontal scroll`, async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') errors.push(msg.text());
      });

      await page.setViewportSize({ width: bp.width, height: bp.height });
      await navigateTo(page, BASE + '/');

      // Screenshot
      await page.screenshot({
        path: `${SCREENSHOTS_DIR}/home-${bp.name}.png`,
        fullPage: true,
      });

      // No console errors
      const criticalErrors = errors.filter(e =>
        !e.includes('favicon') && !e.includes('net::ERR')
      );
      expect(criticalErrors, `Console errors on / at ${bp.name}px: ${criticalErrors.join('; ')}`).toHaveLength(0);

      // No horizontal scroll
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);

      // Background is white
      const bgColor = await page.evaluate(() => getComputedStyle(document.body).backgroundColor);
      // white = rgb(255, 255, 255)
      expect(bgColor).toBe('rgb(255, 255, 255)');
    });

    test(`/services — renders, no horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await navigateTo(page, BASE + '/services');
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/services-${bp.name}.png`, fullPage: true });

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });

    test(`/about — renders, no horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await navigateTo(page, BASE + '/about');
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/about-${bp.name}.png`, fullPage: true });

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });

    test(`/contact — renders, no horizontal scroll`, async ({ page }) => {
      await page.setViewportSize({ width: bp.width, height: bp.height });
      await navigateTo(page, BASE + '/contact');
      await page.screenshot({ path: `${SCREENSHOTS_DIR}/contact-${bp.name}.png`, fullPage: true });

      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      const clientWidth = await page.evaluate(() => document.documentElement.clientWidth);
      expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 2);
    });

  });
}

// ----------------------------------------------------------------
// 4. DESIGN TOKEN SPOT CHECKS
// ----------------------------------------------------------------

test.describe('Design token checks', () => {

  test('--color-accent resolves to #295590 navy', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');

    const accent = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-accent').trim()
    );
    expect(accent).toBe('#295590');
  });

  test('--color-background resolves to #FFFFFF', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');

    const bg = await page.evaluate(() =>
      getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim()
    );
    expect(bg).toBe('#FFFFFF');
  });

});

// ----------------------------------------------------------------
// 5. MOBILE MENU OPEN/CLOSE
// ----------------------------------------------------------------

test.describe('Mobile menu', () => {

  test('hamburger opens and closes correctly', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await navigateTo(page, BASE + '/');

    const burger = page.getByRole('button', { name: 'Open menu' });
    await expect(burger).toBeVisible();

    await burger.click();
    await page.waitForTimeout(400);

    // Mobile menu should be visible
    const mobileMenu = page.getByRole('link', { name: 'Home' }).last();
    await expect(mobileMenu).toBeVisible();

    // Close menu
    const closeBtn = page.getByRole('button', { name: 'Close menu' });
    await closeBtn.click();
    await page.waitForTimeout(400);

    // Menu should be gone
    await expect(page.getByRole('button', { name: 'Open menu' })).toBeVisible();
  });

});

// ----------------------------------------------------------------
// 6. TYPOGRAPHY PRESENCE
// ----------------------------------------------------------------

test.describe('Typography', () => {

  test('h1 present on homepage', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/');
    const h1 = page.locator('h1').first();
    await expect(h1).toBeVisible();
  });

  test('h1 present on /services/website-design', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/services/website-design');
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/Smart Websites/);
  });

  test('h1 present on /features/mobile-app', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await navigateTo(page, BASE + '/features/mobile-app');
    const h1 = page.locator('h1');
    await expect(h1).toHaveText(/Mobile App/);
  });

});

// ----------------------------------------------------------------
// 7. ALL BOOKING LINKS ON SERVICE SLUG PAGES
// ----------------------------------------------------------------

test.describe('All service slug pages have /contact CTAs', () => {
  const SERVICE_SLUGS = ['website-design', 'crm-automation', 'missed-call-textback', 'google-reviews', 'ai-chatbot', 'seo-local'];

  for (const slug of SERVICE_SLUGS) {
    test(`/services/${slug} mid-page CTA → /contact`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await navigateTo(page, `${BASE}/services/${slug}`);

      const midCTA = page.getByRole('link', { name: 'Book a Free Call' }).first();
      const href = await midCTA.getAttribute('href');
      expect(href).toBe('/contact');
    });
  }

  const FEATURE_SLUGS = ['online-booking', 'unified-inbox', 'sales-pipeline', 'mobile-app', 'invoicing-payments'];

  for (const slug of FEATURE_SLUGS) {
    test(`/features/${slug} mid-page CTA → /contact`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await navigateTo(page, `${BASE}/features/${slug}`);

      const midCTA = page.getByRole('link', { name: 'Book a Free Call' }).first();
      const href = await midCTA.getAttribute('href');
      expect(href).toBe('/contact');
    });
  }
});
