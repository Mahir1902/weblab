import { test, expect } from '@playwright/test';

const BASE = 'http://localhost:3001';
const PAGES_TO_CHECK = [
  '/services/website-design',
  '/services/crm-automation',
  '/services/missed-call-textback',
  '/features/mobile-app',
  '/features/online-booking',
  '/contact',
  '/about',
  '/services',
];

for (const p of PAGES_TO_CHECK) {
  test(`No console errors on ${p}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('console', (msg) => {
      if (msg.type() === 'error') errors.push(msg.text());
    });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(BASE + p, { waitUntil: 'networkidle' });
    await page.waitForTimeout(1500);

    const criticalErrors = errors.filter(e =>
      !e.includes('favicon') && !e.includes('net::ERR')
    );
    expect(criticalErrors, `Errors on ${p}: ${criticalErrors.join(' | ')}`).toHaveLength(0);
  });
}
