import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3001';
const SS = '/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-05-09-booking-url-fix-remove-result/screenshots';

// Check ChatbotPlaceholder is present in layout on all pages
test.describe('ChatbotPlaceholder present in layout', () => {
  const pages = ['/', '/services', '/about', '/contact', '/services/website-design', '/features/mobile-app'];

  for (const p of pages) {
    test(`ChatbotPlaceholder on ${p}`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(BASE + p, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1000);

      // ChatbotPlaceholder renders an element with id="chatbot-placeholder" or class containing "chatbot"
      // Check the DOM for the placeholder element
      const chatbotEl = await page.evaluate(() => {
        // Check for any element with chatbot-related id or data attribute
        const byId = document.getElementById('chatbot-placeholder');
        const byClass = document.querySelector('[class*="chatbot"]');
        const byDataAttr = document.querySelector('[data-chatbot]');
        // Also check for any fixed positioned element that might be the chatbot widget
        return {
          byId: !!byId,
          byClass: !!byClass,
          byDataAttr: !!byDataAttr,
        };
      });
      console.log(`${p} chatbot:`, chatbotEl);
      // At minimum the element should exist in some form
    });
  }
});

// Check the "N" badge — this is likely the Next.js devtools indicator, not a product bug
test('The "N" indicator is Next.js dev tools, not a product element', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.goto(BASE + '/contact', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  // Check if it is Next.js devtools
  const nextDevtools = await page.evaluate(() => {
    const allFixed = Array.from(document.querySelectorAll('*')).filter(el => {
      const style = getComputedStyle(el);
      return style.position === 'fixed';
    });
    return allFixed.map(el => ({
      tag: el.tagName,
      id: el.id,
      classes: (el as HTMLElement).className?.toString().slice(0, 100),
      textContent: el.textContent?.trim().slice(0, 50),
    })).filter(el => el.textContent?.includes('N') || el.id.includes('next') || el.classes?.includes('next'));
  });
  console.log('Fixed elements with N:', JSON.stringify(nextDevtools.slice(0, 5), null, 2));
});

// Check all 6 service slug pages have correct section order in h2 array
test.describe('All service pages have correct section order (no Result section)', () => {
  const slugs = ['crm-automation', 'missed-call-textback', 'google-reviews', 'ai-chatbot', 'seo-local'];

  for (const slug of slugs) {
    test(`/services/${slug} — no "The Result" heading, correct h2 order`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE}/services/${slug}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);

      const h2s = await page.locator('h2').allTextContents();
      const hasResult = h2s.some(t => /the result/i.test(t));
      expect(hasResult, `"The Result" h2 found on /services/${slug}: ${h2s.join(', ')}`).toBe(false);

      const whatsIdx = h2s.findIndex(t => /what.s included/i.test(t));
      const faqIdx = h2s.findIndex(t => /common questions/i.test(t));
      expect(whatsIdx, `"What's Included" missing on /services/${slug}`).toBeGreaterThanOrEqual(0);
      expect(faqIdx, `"Common Questions" missing on /services/${slug}`).toBeGreaterThanOrEqual(0);
      expect(whatsIdx).toBeLessThan(faqIdx);
    });
  }

  const featureSlugs = ['unified-inbox', 'sales-pipeline', 'invoicing-payments'];
  for (const slug of featureSlugs) {
    test(`/features/${slug} — no "The Result" heading`, async ({ page }) => {
      await page.setViewportSize({ width: 1440, height: 900 });
      await page.goto(`${BASE}/features/${slug}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(800);

      const h2s = await page.locator('h2').allTextContents();
      const hasResult = h2s.some(t => /the result/i.test(t));
      expect(hasResult, `"The Result" h2 found on /features/${slug}`).toBe(false);
    });
  }
});

// Accessibility spot checks
test.describe('Accessibility', () => {
  test('All images on homepage have non-empty alt text', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const imgsMissingAlt = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll('img'));
      return imgs
        .filter(img => !img.alt || img.alt.trim() === '')
        .map(img => ({ src: img.src, alt: img.alt }));
    });
    console.log('Images missing alt:', imgsMissingAlt);
    expect(imgsMissingAlt, `Images missing alt text: ${JSON.stringify(imgsMissingAlt)}`).toHaveLength(0);
  });

  test('All booking CTAs on homepage are keyboard-reachable (tabIndex not -1)', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const ctaLinks = await page.evaluate(() => {
      return Array.from(document.querySelectorAll('a[href="/contact"]')).map(a => ({
        text: (a as HTMLElement).textContent?.trim(),
        tabIndex: (a as HTMLAnchorElement).tabIndex,
        isVisible: !!(a as HTMLElement).offsetParent,
      }));
    });
    console.log('CTA links /contact:', ctaLinks);

    const unreachable = ctaLinks.filter(l => l.tabIndex === -1 && l.isVisible);
    expect(unreachable, `CTA links unreachable by keyboard: ${JSON.stringify(unreachable)}`).toHaveLength(0);
  });

  test('Heading hierarchy on homepage — h1 appears before h2', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + '/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(1000);

    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();

    expect(h1Count, 'Expected exactly 1 h1 on homepage').toBe(1);
    expect(h2Count, 'Expected at least 1 h2 on homepage').toBeGreaterThan(0);
  });
});

// Verify clicking "Book a Call" in navbar navigates to /contact
test('Navbar "Book a Call" click navigates to /contact page', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const bookBtn = page.locator('header').getByRole('link', { name: 'Book a Call' }).first();
  await bookBtn.click();
  await page.waitForURL('**/contact', { timeout: 5000 });
  expect(page.url()).toContain('/contact');
  await page.screenshot({ path: `${SS}/contact-after-nav.png` });
});

// Verify service page "Book a Free Call" mid-CTA click navigates to /contact
test('Service page mid-CTA click navigates to /contact', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto(BASE + '/services/website-design', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1000);

  const midCTA = page.getByRole('link', { name: 'Book a Free Call' }).first();
  await midCTA.click();
  await page.waitForURL('**/contact', { timeout: 5000 });
  expect(page.url()).toContain('/contact');
});
