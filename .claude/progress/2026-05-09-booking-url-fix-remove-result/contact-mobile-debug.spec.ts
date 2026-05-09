import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3001';
const SS = '/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-05-09-booking-url-fix-remove-result/screenshots';

test('Contact page 375px - scroll full page and check form visibility', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Check if form exists in DOM
  const form = page.locator('form');
  const formCount = await form.count();
  console.log('Form count:', formCount);

  // Check if form is visible
  if (formCount > 0) {
    const formBB = await form.first().boundingBox();
    console.log('Form bounding box:', JSON.stringify(formBB));
  }

  // Check the "Shoot Us a Message" heading
  const shootHeading = page.getByRole('heading', { name: /Shoot Us a Message/i });
  const shootCount = await shootHeading.count();
  console.log('"Shoot Us a Message" heading count:', shootCount);

  if (shootCount > 0) {
    const headingBB = await shootHeading.boundingBox();
    console.log('Heading bounding box:', JSON.stringify(headingBB));
    const isVisible = await shootHeading.isVisible();
    console.log('Heading visible:', isVisible);
  }

  // Get the grid/layout container
  const mainContent = page.locator('main');
  const mainBB = await mainContent.boundingBox();
  console.log('Main bounding box:', JSON.stringify(mainBB));

  // Get total scroll height
  const scrollHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  console.log('Total scroll height:', scrollHeight);

  // Scroll to the form area
  await page.evaluate(() => window.scrollTo(0, 500));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SS}/contact-375-scrolled-500.png` });

  await page.evaluate(() => window.scrollTo(0, 1000));
  await page.waitForTimeout(300);
  await page.screenshot({ path: `${SS}/contact-375-scrolled-1000.png` });

  // Full scroll
  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);
    scrollY += 812;
  }
  await page.screenshot({ path: `${SS}/contact-375-after-scroll.png`, fullPage: true });
});

test('Contact page 768px - full page after scroll', async ({ page }) => {
  await page.setViewportSize({ width: 768, height: 1024 });
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  const totalHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  let scrollY = 0;
  while (scrollY < totalHeight) {
    await page.evaluate((y) => window.scrollTo(0, y), scrollY);
    await page.waitForTimeout(200);
    scrollY += 1024;
  }
  await page.screenshot({ path: `${SS}/contact-768-after-scroll.png`, fullPage: true });
});

test('Contact page - check layout classes on the two-column grid', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Inspect the grid container's computed styles
  const gridInfo = await page.evaluate(() => {
    // Find the grid/flex container holding both columns
    const allDivs = Array.from(document.querySelectorAll('div'));
    const gridDivs = allDivs.filter(d => {
      const style = getComputedStyle(d);
      return style.display === 'grid' || style.display === 'flex';
    });
    return gridDivs.slice(0, 20).map(d => ({
      classes: d.className,
      display: getComputedStyle(d).display,
      width: d.offsetWidth,
      height: d.offsetHeight,
      children: d.children.length,
    }));
  });
  
  // Look for the specific contact layout grid
  const contactGrids = gridInfo.filter(d => 
    d.classes.includes('grid') || d.classes.includes('lg:grid')
  );
  console.log('Contact grid containers:', JSON.stringify(contactGrids.slice(0, 5), null, 2));

  // Check if form section has visibility issues
  const formSection = page.locator('section').filter({ hasText: /Shoot Us a Message/i });
  const count = await formSection.count();
  console.log('Form section count:', count);
  if (count > 0) {
    const bb = await formSection.first().boundingBox();
    console.log('Form section BB:', JSON.stringify(bb));
  }
});
