/**
 * Homepage UI Test — 2026-04-26
 * Verifies: no black borders between sections, IndustryBar blue tint,
 * Testimonials section colors/copy, overall page flow, console errors.
 */

import { test, expect, Page } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const BASE_URL = 'http://localhost:3001';
const SCREENSHOT_DIR = path.join(
  '/Users/mahirhaque/Documents/Coding/WebLab website',
  '.claude/progress/2026-04-26-homepage-ui-test/screenshots'
);

// Ensure screenshot dir exists
fs.mkdirSync(SCREENSHOT_DIR, { recursive: true });

const BREAKPOINTS = [
  { name: '375', width: 375, height: 812 },
  { name: '768', width: 768, height: 1024 },
  { name: '1440', width: 1440, height: 900 },
];

// Helper: collect console errors from page
async function collectConsoleErrors(page: Page): Promise<string[]> {
  const errors: string[] = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') {
      errors.push(msg.text());
    }
  });
  page.on('pageerror', (err) => {
    errors.push(`PAGE ERROR: ${err.message}`);
  });
  return errors;
}

// Helper: get computed bg color of an element
async function getBgColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return 'NOT FOUND';
    return getComputedStyle(el).backgroundColor;
  }, selector);
}

// Helper: get computed color of an element
async function getColor(page: Page, selector: string): Promise<string> {
  return page.evaluate((sel) => {
    const el = document.querySelector(sel);
    if (!el) return 'NOT FOUND';
    return getComputedStyle(el).color;
  }, selector);
}

// Helper: check for thick black borders (border-y-2 pattern)
async function checkForBlackBorders(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    const issues: string[] = [];
    sections.forEach((section) => {
      const style = getComputedStyle(section);
      const borderTopWidth = parseFloat(style.borderTopWidth);
      const borderBottomWidth = parseFloat(style.borderBottomWidth);
      const borderTopColor = style.borderTopColor;
      const borderBottomColor = style.borderBottomColor;
      // "Thick black border" = width >= 2px AND dark color
      if (borderTopWidth >= 2) {
        issues.push(`Section [${section.className.slice(0, 60)}] has border-top: ${borderTopWidth}px ${borderTopColor}`);
      }
      if (borderBottomWidth >= 2) {
        issues.push(`Section [${section.className.slice(0, 60)}] has border-bottom: ${borderBottomWidth}px ${borderBottomColor}`);
      }
    });
    return issues;
  });
}

// Helper: check all section border styles for neo-brutalist thick borders
async function checkAllSectionBorders(page: Page): Promise<{section: string, borderTop: string, borderBottom: string}[]> {
  return page.evaluate(() => {
    const sections = document.querySelectorAll('section');
    const results: {section: string, borderTop: string, borderBottom: string}[] = [];
    sections.forEach((section) => {
      const style = getComputedStyle(section);
      const label = (section.getAttribute('aria-label') || section.className.slice(0, 80)).trim();
      results.push({
        section: label,
        borderTop: `${style.borderTopWidth} ${style.borderTopStyle} ${style.borderTopColor}`,
        borderBottom: `${style.borderBottomWidth} ${style.borderBottomStyle} ${style.borderBottomColor}`,
      });
    });
    return results;
  });
}

test.describe('Homepage UI Tests — 2026-04-26', () => {
  for (const bp of BREAKPOINTS) {
    test.describe(`Breakpoint ${bp.name}px`, () => {
      test.use({ viewport: { width: bp.width, height: bp.height } });

      test(`Full page screenshot at ${bp.name}px`, async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => {
          consoleErrors.push(`PAGE ERROR: ${err.message}`);
        });

        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Take full-page screenshot
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `home-${bp.name}.png`),
          fullPage: true,
        });

        // Report console errors
        if (consoleErrors.length > 0) {
          console.log(`[${bp.name}px] Console errors: ${JSON.stringify(consoleErrors)}`);
        }

        // Store for assertions below
        (page as any).__consoleErrors = consoleErrors;
      });

      test(`[${bp.name}px] No black borders between sections`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        const borderIssues = await checkForBlackBorders(page);
        const allBorders = await checkAllSectionBorders(page);

        console.log(`[${bp.name}px] Section borders:`);
        allBorders.forEach(b => {
          console.log(`  ${b.section} — top: ${b.borderTop} | bottom: ${b.borderBottom}`);
        });

        if (borderIssues.length > 0) {
          console.log(`[${bp.name}px] BLACK BORDER ISSUES:`);
          borderIssues.forEach(i => console.log(`  - ${i}`));
        }

        // Check for sections with thick borders (>= 2px)
        expect(borderIssues, `Thick black borders found at ${bp.name}px`).toHaveLength(0);
      });

      test(`[${bp.name}px] IndustryBar has blue tint background`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        // IndustryBar should have blue-tinted background (not tan/beige)
        const industrySection = page.locator('section[aria-label="Industries we serve"]');
        await expect(industrySection).toBeVisible();

        const bgColor = await industrySection.evaluate((el) => getComputedStyle(el).backgroundColor);
        console.log(`[${bp.name}px] IndustryBar background color: ${bgColor}`);

        // Expected: rgba(41, 85, 144, 0.07) which is the --color-accent-surface token
        // In computed style this might be rgba(41, 85, 144, 0.07) or similar blue tint
        // Verify it is NOT the tan/beige surface color (#F5F0EB → rgb(245, 240, 235))
        const isTan = bgColor.includes('245, 240, 235') || bgColor.includes('237, 232, 227');
        expect(isTan, `IndustryBar should NOT be tan/beige at ${bp.name}px. Got: ${bgColor}`).toBe(false);

        // Verify it has some blue component (accent-surface is rgba(41,85,144,0.07))
        // The computed color could appear as white-ish due to alpha blending, so we check
        // the CSS custom property directly instead
        const accentSurface = await page.evaluate(() => {
          return getComputedStyle(document.documentElement).getPropertyValue('--color-accent-surface').trim();
        });
        console.log(`[${bp.name}px] --color-accent-surface token: ${accentSurface}`);

        // Verify the section uses bg-[var(--color-accent-surface)] class
        const sectionClass = await industrySection.getAttribute('class');
        console.log(`[${bp.name}px] IndustryBar classes: ${sectionClass}`);
        const hasAccentSurfaceBg = sectionClass?.includes('color-accent-surface') || sectionClass?.includes('accent-surface');
        expect(hasAccentSurfaceBg, `IndustryBar should use accent-surface bg at ${bp.name}px`).toBe(true);
      });

      test(`[${bp.name}px] TestimonialsSection — blue background`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        // Scroll to trigger animated section reveal
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
        await page.waitForTimeout(1000);
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Find testimonials section — it should have blue (#295590) background
        const testimonialSection = page.locator('section.bg-\\[var\\(--color-accent\\)\\]');
        const count = await testimonialSection.count();
        console.log(`[${bp.name}px] Testimonials section count: ${count}`);

        if (count > 0) {
          const bgColor = await testimonialSection.first().evaluate((el) => getComputedStyle(el).backgroundColor);
          console.log(`[${bp.name}px] Testimonials background: ${bgColor}`);

          // Should be accent color #295590 = rgb(41, 85, 144)
          const isBlue = bgColor.includes('41, 85, 144') || bgColor.includes('41,85,144');
          expect(isBlue, `Testimonials should have blue bg at ${bp.name}px. Got: ${bgColor}`).toBe(true);
        } else {
          // Try alternate selector
          const allSections = await page.evaluate(() => {
            return Array.from(document.querySelectorAll('section')).map(s => ({
              class: s.className,
              bg: getComputedStyle(s).backgroundColor,
              ariaLabel: s.getAttribute('aria-label') || '',
            }));
          });
          console.log(`[${bp.name}px] All sections:`, JSON.stringify(allSections, null, 2));
          throw new Error(`Testimonials section not found at ${bp.name}px`);
        }
      });

      test(`[${bp.name}px] TestimonialsSection — NO pill badge`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        // Scroll to load animations
        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Check pill badge is absent
        const pillText = await page.locator('text=DON\'T JUST TAKE OUR WORD FOR IT').count();
        console.log(`[${bp.name}px] Pill badge count: ${pillText}`);
        expect(pillText, `Pill badge should be gone at ${bp.name}px`).toBe(0);
      });

      test(`[${bp.name}px] TestimonialsSection — heading is white`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        // Find h2 with "Real Results From Real Businesses"
        const heading = page.locator('h2:has-text("Real Results From Real Businesses")');
        await expect(heading).toBeVisible({ timeout: 5000 });

        const headingColor = await heading.evaluate((el) => getComputedStyle(el).color);
        console.log(`[${bp.name}px] Testimonials h2 color: ${headingColor}`);

        // Should be white = rgb(255, 255, 255)
        expect(headingColor, `Testimonials heading should be white at ${bp.name}px`).toBe('rgb(255, 255, 255)');
      });

      test(`[${bp.name}px] TestimonialsSection — cards have soft borders (not thick black)`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
        await page.waitForTimeout(1000);

        // Check testimonial card borders
        const cardBorders = await page.evaluate(() => {
          const cards = document.querySelectorAll('.rounded-2xl');
          const results: {bg: string, border: string, borderStyle: string, borderWidth: string}[] = [];
          cards.forEach(card => {
            const style = getComputedStyle(card);
            results.push({
              bg: style.backgroundColor,
              border: style.borderColor,
              borderStyle: style.borderStyle,
              borderWidth: style.borderWidth,
            });
          });
          return results;
        });

        console.log(`[${bp.name}px] Testimonial cards (rounded-2xl):`, JSON.stringify(cardBorders, null, 2));

        // Cards should be white (rgb(255,255,255)) and NOT have thick black borders (>= 2px solid black)
        for (const card of cardBorders) {
          const hasThickBlackBorder = parseFloat(card.borderWidth) >= 2 &&
            (card.border.includes('0, 0, 0') || card.border.includes('26, 26, 26'));
          expect(hasThickBlackBorder, `Card should NOT have thick black border. Got: ${card.borderWidth} ${card.border}`).toBe(false);
        }
      });

      test(`[${bp.name}px] No horizontal scroll`, async ({ page }) => {
        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(1500);

        const hasHorizontalScroll = await page.evaluate(() => {
          return document.documentElement.scrollWidth > document.documentElement.clientWidth;
        });
        console.log(`[${bp.name}px] Has horizontal scroll: ${hasHorizontalScroll}`);
        expect(hasHorizontalScroll, `Page should not have horizontal scroll at ${bp.name}px`).toBe(false);
      });

      test(`[${bp.name}px] Console errors check`, async ({ page }) => {
        const consoleErrors: string[] = [];
        page.on('console', (msg) => {
          if (msg.type() === 'error') consoleErrors.push(msg.text());
        });
        page.on('pageerror', (err) => {
          consoleErrors.push(`PAGE ERROR: ${err.message}`);
        });

        await page.goto(BASE_URL, { waitUntil: 'networkidle' });
        await page.waitForTimeout(2000);

        // Scroll to trigger all animations
        for (let i = 0; i <= 10; i++) {
          await page.evaluate((pct) => window.scrollTo(0, document.body.scrollHeight * pct / 10), i);
          await page.waitForTimeout(200);
        }
        await page.waitForTimeout(500);

        // Filter out known non-critical warnings (e.g. favicon 404 or analytics)
        const criticalErrors = consoleErrors.filter(e =>
          !e.includes('favicon') &&
          !e.includes('analytics') &&
          !e.includes('GTM') &&
          !e.includes('hotjar')
        );

        console.log(`[${bp.name}px] Console errors (${criticalErrors.length}):`, criticalErrors);

        if (criticalErrors.length > 0) {
          // Check for hydration errors specifically
          const hydrationErrors = criticalErrors.filter(e =>
            e.toLowerCase().includes('hydrat') ||
            e.toLowerCase().includes('mismatch') ||
            e.toLowerCase().includes('did not expect')
          );
          if (hydrationErrors.length > 0) {
            throw new Error(`HYDRATION ERRORS at ${bp.name}px: ${hydrationErrors.join(', ')}`);
          }
        }

        // Log all errors but don't fail on non-hydration errors (they may be 3rd party)
        expect(criticalErrors.filter(e => e.toLowerCase().includes('hydrat') || e.toLowerCase().includes('text content did not match')),
          `No hydration errors at ${bp.name}px`
        ).toHaveLength(0);
      });
    });
  }
});
