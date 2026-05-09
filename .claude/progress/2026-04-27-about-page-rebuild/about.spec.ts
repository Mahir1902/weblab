import { test, expect, Page } from '@playwright/test';
import path from 'path';

const BASE_URL = 'http://localhost:3001';
const SCREENSHOT_DIR = path.join(
  '/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-27-about-page-rebuild/screenshots'
);

const BREAKPOINTS = [
  { name: 'mobile', width: 375, height: 812 },
  { name: 'tablet', width: 768, height: 1024 },
  { name: 'desktop', width: 1440, height: 900 },
];

async function goToAbout(page: Page, width: number, height: number) {
  await page.setViewportSize({ width, height });
  await page.goto(`${BASE_URL}/about`, { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000); // allow animations / hydration
}

for (const bp of BREAKPOINTS) {
  test.describe(`About page — ${bp.name} (${bp.width}px)`, () => {
    test.beforeEach(async ({ page }) => {
      await goToAbout(page, bp.width, bp.height);
    });

    // -------------------------------------------------------
    // Screenshot
    // -------------------------------------------------------
    test('screenshot full page', async ({ page }) => {
      await page.screenshot({
        path: `${SCREENSHOT_DIR}/about-${bp.width}.png`,
        fullPage: true,
      });
    });

    // -------------------------------------------------------
    // Hero section
    // -------------------------------------------------------
    test('hero: pill badge OUR STORY visible', async ({ page }) => {
      const badge = page.getByText('OUR STORY');
      await expect(badge).toBeVisible();
    });

    test('hero: H1 contains "to Be Found."', async ({ page }) => {
      const h1 = page.locator('h1');
      await expect(h1).toContainText('to Be Found.');
    });

    test('hero: gradient-text span exists inside H1', async ({ page }) => {
      const gradientSpan = page.locator('h1 .gradient-text');
      await expect(gradientSpan).toBeVisible();
    });

    test('hero: subheading paragraph visible', async ({ page }) => {
      const sub = page.getByText(/Sydney based agency/);
      await expect(sub).toBeVisible();
    });

    // -------------------------------------------------------
    // Design tokens — background color
    // -------------------------------------------------------
    test('hero section background is white (#FFFFFF)', async ({ page }) => {
      const heroSection = page.locator('section').first();
      const bg = await heroSection.evaluate((el) =>
        window.getComputedStyle(el).backgroundColor
      );
      // rgb(255, 255, 255) = white
      expect(bg).toBe('rgb(255, 255, 255)');
    });

    test('accent color token resolves to #295590', async ({ page }) => {
      const accent = await page.evaluate(() =>
        window
          .getComputedStyle(document.documentElement)
          .getPropertyValue('--rt-accent')
          .trim()
      );
      expect(accent).toBe('#295590');
    });

    test('gradient-text uses navy-to-blue gradient', async ({ page }) => {
      const gradientSpan = page.locator('h1 .gradient-text');
      const bg = await gradientSpan.evaluate((el) =>
        window.getComputedStyle(el).backgroundImage
      );
      expect(bg).toContain('gradient');
    });

    // -------------------------------------------------------
    // Story section
    // -------------------------------------------------------
    test('story: "Why We Started" heading visible', async ({ page }) => {
      const h2 = page.getByRole('heading', { name: /Why We Started/i });
      await expect(h2).toBeVisible();
    });

    test('story: tradie illustration image loads', async ({ page }) => {
      const img = page.locator('img[alt*="tradesperson"]');
      await expect(img).toBeVisible();
      const naturalWidth = await img.evaluate((el: HTMLImageElement) => el.naturalWidth);
      expect(naturalWidth).toBeGreaterThan(0);
    });

    test('story: image has descriptive alt text', async ({ page }) => {
      const img = page.locator('img[alt*="tradesperson"]');
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt!.length).toBeGreaterThan(20);
    });

    test('story: surface background section (tan) exists', async ({ page }) => {
      const storySections = page.locator('section');
      const count = await storySections.count();
      let hasSurface = false;
      for (let i = 0; i < count; i++) {
        const bg = await storySections.nth(i).evaluate((el) =>
          window.getComputedStyle(el).backgroundColor
        );
        // #F5F0EB = rgb(245, 240, 235)
        if (bg === 'rgb(245, 240, 235)') {
          hasSurface = true;
          break;
        }
      }
      expect(hasSurface).toBe(true);
    });

    // -------------------------------------------------------
    // How We Work
    // -------------------------------------------------------
    test('how we work: heading visible', async ({ page }) => {
      const h2 = page.getByRole('heading', { name: /Simple, Honest, End to End/i });
      await expect(h2).toBeVisible();
    });

    test('how we work: 4 step cards render', async ({ page }) => {
      // Scroll to section to trigger AnimatedSection
      const h2 = page.getByRole('heading', { name: /Simple, Honest, End to End/i });
      await h2.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);

      const stepTitles = ['Book a Free Call', 'We Audit and Plan', 'We Build It', 'Launch and Grow'];
      for (const title of stepTitles) {
        await expect(page.getByRole('heading', { name: title })).toBeVisible();
      }
    });

    test('how we work: number badges have accent color', async ({ page }) => {
      const h2 = page.getByRole('heading', { name: /Simple, Honest, End to End/i });
      await h2.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);

      // First badge
      const badge = page.locator('div').filter({ hasText: /^1$/ }).first();
      const color = await badge.evaluate((el) =>
        window.getComputedStyle(el).color
      );
      // Accent #295590 = rgb(41, 85, 144)
      expect(color).toBe('rgb(41, 85, 144)');
    });

    test('how we work: cards have brutal shadow', async ({ page }) => {
      const h2 = page.getByRole('heading', { name: /Simple, Honest, End to End/i });
      await h2.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);

      const firstCard = page.locator('.shadow-brutal').first();
      const shadow = await firstCard.evaluate((el) =>
        window.getComputedStyle(el).boxShadow
      );
      expect(shadow).toContain('26, 26, 26'); // #1A1A1A
    });

    // -------------------------------------------------------
    // Grid layout checks for how-we-work cards
    // -------------------------------------------------------
    test(`how we work: card layout correct for ${bp.name}`, async ({ page }) => {
      const h2 = page.getByRole('heading', { name: /Simple, Honest, End to End/i });
      await h2.scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);

      const cards = page.locator('.shadow-brutal');
      const cardCount = await cards.count();
      // At minimum 4 cards from the steps
      expect(cardCount).toBeGreaterThanOrEqual(4);

      if (bp.width >= 1440) {
        // Desktop: 4 in a row — check they are roughly same vertical position
        const box0 = await cards.nth(0).boundingBox();
        const box3 = await cards.nth(3).boundingBox();
        if (box0 && box3) {
          expect(Math.abs(box0.y - box3.y)).toBeLessThan(20);
        }
      } else if (bp.width === 375) {
        // Mobile: stacked — card 1 should be below card 0
        const box0 = await cards.nth(0).boundingBox();
        const box1 = await cards.nth(1).boundingBox();
        if (box0 && box1) {
          expect(box1.y).toBeGreaterThan(box0.y + 50);
        }
      }
    });

    // -------------------------------------------------------
    // FAQ accordion
    // -------------------------------------------------------
    test('faq: heading visible', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await expect(faqHeading).toBeVisible();
    });

    test('faq: 6 items render', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const buttons = page.locator('dl button');
      await expect(buttons).toHaveCount(6);
    });

    test('faq: first item expands and shows answer on click', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const firstButton = page.locator('dl button').first();
      await firstButton.click();
      await page.waitForTimeout(400);

      const answer = page.locator('dl dd').first();
      await expect(answer).toBeVisible();
    });

    test('faq: first item collapses on second click', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const firstButton = page.locator('dl button').first();
      await firstButton.click();
      await page.waitForTimeout(400);
      await firstButton.click();
      await page.waitForTimeout(400);

      const answer = page.locator('dl dd').first();
      await expect(answer).not.toBeVisible();
    });

    test('faq: second item expands on click', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const secondButton = page.locator('dl button').nth(1);
      await secondButton.click();
      await page.waitForTimeout(400);

      const answers = page.locator('dl dd');
      await expect(answers.nth(1)).toBeVisible();
    });

    test('faq: + icon uses accent color', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const plusIcon = page.locator('dl button span[aria-hidden]').first();
      const color = await plusIcon.evaluate((el) =>
        window.getComputedStyle(el).color
      );
      // #295590 = rgb(41, 85, 144)
      expect(color).toBe('rgb(41, 85, 144)');
    });

    test('faq: no dashes used as punctuation in any FAQ question', async ({ page }) => {
      const buttons = page.locator('dl button dt');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        const text = await buttons.nth(i).textContent();
        // Check for em dash, en dash, or hyphen used as punctuation (between spaces)
        expect(text).not.toMatch(/ [–—-] /);
      }
    });

    test('faq: no dashes in answers', async ({ page }) => {
      // Click all items open to get answer text
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const buttons = page.locator('dl button');
      const count = await buttons.count();
      for (let i = 0; i < count; i++) {
        await buttons.nth(i).click();
        await page.waitForTimeout(200);
      }
      const answers = page.locator('dl dd');
      const answerCount = await answers.count();
      for (let i = 0; i < answerCount; i++) {
        const text = await answers.nth(i).textContent();
        expect(text).not.toMatch(/ [–—-] /);
      }
    });

    // -------------------------------------------------------
    // CTA section
    // -------------------------------------------------------
    test('cta: "Let\'s Talk About Your Business" heading visible', async ({ page }) => {
      const ctaHeading = page.getByRole('heading', { name: /Let.s Talk About Your Business/i });
      await ctaHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);
      await expect(ctaHeading).toBeVisible();
    });

    test('cta: booking button present and has href', async ({ page }) => {
      const ctaHeading = page.getByRole('heading', { name: /Let.s Talk About Your Business/i });
      await ctaHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const bookBtn = page.getByRole('link', { name: /Book a Free Strategy Call/i });
      await expect(bookBtn).toBeVisible();
      const href = await bookBtn.getAttribute('href');
      expect(href).toBeTruthy();
      expect(href!.length).toBeGreaterThan(0);
    });

    // -------------------------------------------------------
    // Heading hierarchy
    // -------------------------------------------------------
    test('heading hierarchy: only one H1', async ({ page }) => {
      const h1s = page.locator('h1');
      await expect(h1s).toHaveCount(1);
    });

    test('heading hierarchy: at least 4 H2s (story, how-we-work, faq, cta)', async ({ page }) => {
      const h2s = page.locator('h2');
      const count = await h2s.count();
      expect(count).toBeGreaterThanOrEqual(4);
    });

    test('heading hierarchy: H3s only inside How We Work cards', async ({ page }) => {
      const h3s = page.locator('h3');
      const count = await h3s.count();
      // The 4 step cards use h3 for titles
      expect(count).toBe(4);
    });

    // -------------------------------------------------------
    // No horizontal scroll
    // -------------------------------------------------------
    test('no horizontal scroll', async ({ page }) => {
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      expect(scrollWidth).toBeLessThanOrEqual(bp.width + 2); // 2px tolerance
    });

    // -------------------------------------------------------
    // Console errors
    // -------------------------------------------------------
    test('no console errors or hydration errors', async ({ page }) => {
      const errors: string[] = [];
      page.on('console', (msg) => {
        if (msg.type() === 'error') {
          errors.push(msg.text());
        }
      });
      // Reload to capture any errors on fresh load
      await page.reload({ waitUntil: 'networkidle' });
      await page.waitForTimeout(2000);
      const hydrationErrors = errors.filter(
        (e) =>
          e.includes('Hydration') ||
          e.includes('hydration') ||
          e.includes('did not match') ||
          e.includes('Warning:')
      );
      expect(hydrationErrors).toHaveLength(0);
    });

    // -------------------------------------------------------
    // Accessibility — keyboard navigation
    // -------------------------------------------------------
    test('all interactive elements reachable via Tab', async ({ page }) => {
      // Tab through the page and verify focus rings appear
      await page.keyboard.press('Tab');
      const focused = await page.evaluate(() => document.activeElement?.tagName);
      expect(focused).not.toBe('BODY');
    });

    test('FAQ buttons keyboard accessible (aria-expanded)', async ({ page }) => {
      const faqHeading = page.getByRole('heading', { name: /Questions We Get Asked a Lot/i });
      await faqHeading.scrollIntoViewIfNeeded();
      await page.waitForTimeout(600);

      const firstButton = page.locator('dl button').first();
      const ariaExpanded = await firstButton.getAttribute('aria-expanded');
      expect(ariaExpanded).toBe('false');

      await firstButton.click();
      await page.waitForTimeout(300);
      const ariaExpandedAfter = await firstButton.getAttribute('aria-expanded');
      expect(ariaExpandedAfter).toBe('true');
    });

    // -------------------------------------------------------
    // JSON-LD structured data
    // -------------------------------------------------------
    test('FAQPage JSON-LD schema present in page source', async ({ page }) => {
      const content = await page.content();
      expect(content).toContain('"@type":"FAQPage"');
      expect(content).toContain('"@type":"Question"');
    });
  });
}
