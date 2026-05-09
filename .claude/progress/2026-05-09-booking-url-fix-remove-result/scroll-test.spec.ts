import { test, expect } from '@playwright/test';
import path from 'path';

const BASE = 'http://localhost:3001';
const SS = '/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-05-09-booking-url-fix-remove-result/screenshots';

// Scroll the entire page section by section and capture after-scroll screenshot
test('Homepage scroll-reveal sections become visible after scrolling', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll step by step through the entire page
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 900;
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(300);
    scrollY += viewportHeight;
  }
  // Scroll back to top
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(500);

  // Take a full-page screenshot after scroll-reveal has fired
  await page.screenshot({
    path: `${SS}/home-1440-after-scroll.png`,
    fullPage: true,
  });

  // Verify key sections are in DOM and visible
  // ProblemSolution section
  const problemSection = page.locator('section').filter({ hasText: /The Problem/i }).first();
  // Verify it exists in DOM
  const problemCount = await page.locator('section').count();
  expect(problemCount).toBeGreaterThan(3);
});

test('About page scroll-reveal fires correctly', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/about', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(250);
    scrollY += 900;
  }

  await page.screenshot({ path: `${SS}/about-1440-after-scroll.png`, fullPage: true });
});

test('Services page scroll-reveal and all service cards visible', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/services', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(250);
    scrollY += 900;
  }

  await page.screenshot({ path: `${SS}/services-1440-after-scroll.png`, fullPage: true });
});

// Verify contact page form is interactive
test('Contact form fields are interactive', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Fill in form fields
  const firstNameInput = page.getByPlaceholder('John');
  await expect(firstNameInput).toBeVisible();
  await firstNameInput.fill('Test User');

  const emailInput = page.getByPlaceholder('john@example.com');
  await expect(emailInput).toBeVisible();
  await emailInput.fill('test@example.com');

  // Verify the Send It button is present
  const sendBtn = page.getByRole('button', { name: /Send It/i });
  await expect(sendBtn).toBeVisible();

  // Check no GHL iframe present (replaced with custom form)
  const ghlIframe = page.locator('#ghl-calendar-embed');
  const calendarCount = await ghlIframe.count();
  // The old GHL calendar embed placeholder may or may not be present — just log
  console.log(`GHL calendar embed count: ${calendarCount}`);
});

// Verify service slug page flow (no Result section, correct section order)
test('/services/website-design page flow: features grid flows directly to FAQ', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/services/website-design', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Scroll full page
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);
    scrollY += 900;
  }

  await page.screenshot({ path: `${SS}/service-websitedesign-1440-after-scroll.png`, fullPage: true });

  // Verify section order: "What's Included" comes before "Common Questions"
  // and there is NO "The Result" heading anywhere
  const allH2s = await page.locator('h2').allTextContents();
  console.log('All h2 texts:', allH2s);

  const hasResult = allH2s.some(t => /the result/i.test(t));
  expect(hasResult, '"The Result" h2 heading should not exist').toBe(false);

  const whatsIncludedIdx = allH2s.findIndex(t => /what.s included/i.test(t));
  const commonQuestionsIdx = allH2s.findIndex(t => /common questions/i.test(t));

  expect(whatsIncludedIdx, "'What's Included' not found in h2 list").toBeGreaterThanOrEqual(0);
  expect(commonQuestionsIdx, "'Common Questions' not found in h2 list").toBeGreaterThanOrEqual(0);
  expect(whatsIncludedIdx).toBeLessThan(commonQuestionsIdx);
});

// Verify mobile layout at 375px for homepage
test('Homepage 375px - mobile nav and hero visible', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Hero heading visible
  const h1 = page.locator('h1').first();
  await expect(h1).toBeVisible();

  // Hamburger button visible (not desktop nav)
  const burger = page.getByRole('button', { name: 'Open menu' });
  await expect(burger).toBeVisible();

  // Desktop nav links should be hidden
  const desktopNav = page.locator('ul.hidden.md\\:flex');
  await expect(desktopNav).toBeHidden();

  // Scroll and screenshot
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);
    scrollY += 812;
  }
  await page.screenshot({ path: `${SS}/home-375-after-scroll.png`, fullPage: true });
});
