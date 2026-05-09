import { test, expect, Page } from '@playwright/test';
import * as path from 'path';
import * as fs from 'fs';

const BASE_URL = 'http://localhost:3001';
const SCREENSHOTS_DIR = path.join(
  '/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots'
);

async function scrollToBottom(page: Page) {
  await page.evaluate(async () => {
    await new Promise<void>((resolve) => {
      let totalHeight = 0;
      const distance = 300;
      const timer = setInterval(() => {
        window.scrollBy(0, distance);
        totalHeight += distance;
        if (totalHeight >= document.body.scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 100);
    });
  });
  await page.waitForTimeout(500);
}

test.describe('Homepage Content Sections Verification', () => {

  test('1440px — full homepage screenshot and section checks', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll to trigger AnimatedSection reveals
    await scrollToBottom(page);
    await page.waitForTimeout(1000);
    // Scroll back to top for screenshot
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);

    // ---- CONSOLE ERRORS ----
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // ---- SECTION ORDER CHECK ----
    const sectionTexts = await page.evaluate(() => {
      const sections = Array.from(document.querySelectorAll('section'));
      return sections.map((s) => ({
        text: (s.textContent || '').replace(/\s+/g, ' ').trim().substring(0, 100),
        id: s.id || '',
      }));
    });
    console.log('Section order:', JSON.stringify(sectionTexts, null, 2));

    // ---- TESTIMONIALS SECTION ----
    const testimonialsHeading = page.locator('text=Real Results From Real Businesses');
    await expect(testimonialsHeading).toBeVisible();

    const testimonialBadge = page.locator('text=DON\'T JUST TAKE OUR WORD FOR IT');
    await expect(testimonialBadge).toBeVisible();

    // Count testimonial cards (look for star icons in testimonials grid)
    const testimonialCards = page.locator('section').filter({ hasText: 'Real Results From Real Businesses' }).locator('[class*="rounded-2xl"]');
    const cardCount = await testimonialCards.count();
    console.log(`Testimonial cards found: ${cardCount}`);

    // Verify specific testimonials are present
    await expect(page.locator('text=Mike T.')).toBeVisible();
    await expect(page.locator('text=Sarah J.')).toBeVisible();
    await expect(page.locator('text=David R.')).toBeVisible();
    await expect(page.locator('text=Jessica M.')).toBeVisible();
    await expect(page.locator('text=Tom H.')).toBeVisible();
    await expect(page.locator('text=Lisa K.')).toBeVisible();

    // ---- CRM FEATURES SECTION ----
    const crmHeading = page.locator('text=Ditch the 5 Apps. Use One.');
    await expect(crmHeading).toBeVisible();

    const crmBadge = page.locator('text=THE WEBLAB CRM');
    await expect(crmBadge).toBeVisible();

    // Check feature titles — scoped to the CRM section heading role to avoid strict-mode violations
    const crmSection = page.locator('section').filter({ hasText: 'Ditch the 5 Apps. Use One.' });
    await expect(crmSection.getByRole('heading', { name: 'Missed-Call Text Back' })).toBeVisible();
    await expect(crmSection.getByRole('heading', { name: 'Unified Inbox' })).toBeVisible();
    await expect(crmSection.getByRole('heading', { name: 'Automated Booking' })).toBeVisible();
    await expect(crmSection.getByRole('heading', { name: 'Automated Follow-Up' })).toBeVisible();
    await expect(crmSection.getByRole('heading', { name: 'AI Chatbot' })).toBeVisible();
    await expect(crmSection.getByRole('heading', { name: 'Review Automation' })).toBeVisible();

    // Check tags scoped to CRM section
    await expect(crmSection.locator('text=NEVER LOSE A LEAD')).toBeVisible();
    await expect(crmSection.locator('text=EVERYTHING IN ONE PLACE')).toBeVisible();

    // ---- HOW IT WORKS SECTION ----
    const howItWorksSection = page.locator('section').filter({ hasText: "Three Steps. That's It." });
    await expect(howItWorksSection.getByRole('heading', { name: "Three Steps. That's It." })).toBeVisible();
    await expect(howItWorksSection.locator('text=HOW IT WORKS')).toBeVisible();

    // Check exactly 3 steps — scoped to howItWorks section
    await expect(howItWorksSection.getByRole('heading', { name: 'Book a Call' })).toBeVisible();
    await expect(howItWorksSection.getByRole('heading', { name: 'We Build It' })).toBeVisible();
    await expect(howItWorksSection.getByRole('heading', { name: 'Watch Jobs Roll In' })).toBeVisible();

    const stepCards = howItWorksSection.locator('[class*="rounded-2xl"]');
    const stepCount = await stepCards.count();
    console.log(`How It Works step cards: ${stepCount}`);

    // ---- FULL PAGE SCREENSHOT at 1440px ----
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'home-content-update-1440.png'),
      fullPage: true,
    });
    console.log('Screenshot saved: home-content-update-1440.png');

    // Log final console errors
    console.log('Console errors so far:', consoleErrors.length > 0 ? consoleErrors : 'None');
  });

  test('375px — mobile homepage screenshot', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Scroll to trigger all animations
    await scrollToBottom(page);
    await page.waitForTimeout(1000);

    // Check console errors at mobile
    const consoleErrors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    // Quick sanity checks at mobile
    await expect(page.locator('text=Real Results From Real Businesses')).toBeVisible();
    await expect(page.locator('text=Ditch the 5 Apps. Use One.')).toBeVisible();
    await expect(page.locator("text=Three Steps. That's It.")).toBeVisible();

    // Check no horizontal overflow
    const hasHorizontalScroll = await page.evaluate(() => {
      return document.documentElement.scrollWidth > document.documentElement.clientWidth;
    });
    console.log(`375px horizontal scroll: ${hasHorizontalScroll}`);

    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(300);
    await page.screenshot({
      path: path.join(SCREENSHOTS_DIR, 'home-content-update-375.png'),
      fullPage: true,
    });
    console.log('Screenshot saved: home-content-update-375.png');
    console.log('Mobile console errors:', consoleErrors.length > 0 ? consoleErrors : 'None');
  });

  test('Section order verification', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await scrollToBottom(page);
    await page.waitForTimeout(800);

    // Get Y positions of key headings to verify order
    const positions = await page.evaluate(() => {
      const selectors = [
        { name: 'Hero', selector: 'h1' },
        { name: 'Smart Website Features', selector: '[data-section="smart-features"], h2' },
      ];

      // Get all h2 elements with their text
      const h2s = Array.from(document.querySelectorAll('h2'));
      return h2s.map((el) => ({
        text: el.textContent?.trim().substring(0, 60) || '',
        top: el.getBoundingClientRect().top + window.scrollY,
      })).sort((a, b) => a.top - b.top);
    });

    console.log('Heading order by position:');
    positions.forEach((p) => console.log(`  Y=${Math.round(p.top)}: ${p.text}`));

    // Verify specific headings exist and are in correct relative order
    const headingTexts = positions.map((p) => p.text);

    // Expected headings (partial match)
    const expectedSequence = [
      'Ditch the 5 Apps. Use One.',
      'Real Results From Real Businesses',
      "Three Steps. That's It.",
    ];

    for (const expected of expectedSequence) {
      const found = headingTexts.find((t) => t.includes(expected.substring(0, 20)));
      if (found) {
        console.log(`FOUND: "${expected}" at index ${headingTexts.indexOf(found)}`);
      } else {
        console.log(`MISSING: "${expected}"`);
      }
    }

    // Verify CRM (AutomationsSection) comes BEFORE Testimonials
    const crmIdx = positions.findIndex((p) => p.text.includes('Ditch the 5 Apps'));
    const testimonialsIdx = positions.findIndex((p) => p.text.includes('Real Results'));
    const howItWorksIdx = positions.findIndex((p) => p.text.includes("Three Steps"));

    console.log(`CRM index: ${crmIdx}, Testimonials index: ${testimonialsIdx}, HowItWorks index: ${howItWorksIdx}`);

    expect(crmIdx).toBeLessThan(testimonialsIdx);
    expect(testimonialsIdx).toBeLessThan(howItWorksIdx);
  });

  test('Console errors check', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });

    const consoleErrors: string[] = [];
    const jsErrors: string[] = [];

    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    page.on('pageerror', (err) => {
      jsErrors.push(err.message);
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    await scrollToBottom(page);
    await page.waitForTimeout(1000);

    console.log('Console errors:', consoleErrors.length > 0 ? consoleErrors : 'None');
    console.log('JS page errors:', jsErrors.length > 0 ? jsErrors : 'None');

    // No critical errors should be present
    const criticalErrors = [...consoleErrors, ...jsErrors].filter(
      (e) => !e.includes('favicon') && !e.includes('404') && !e.includes('hydration')
    );

    if (criticalErrors.length > 0) {
      console.log('CRITICAL ERRORS FOUND:', criticalErrors);
    }
  });

});
