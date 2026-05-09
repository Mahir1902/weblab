import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './.claude/progress/2026-05-09-booking-url-fix-remove-result',
  testMatch: '*.spec.ts',
  timeout: 30000,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://localhost:3001',
    headless: true,
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    {
      name: 'chromium',
      use: { browserName: 'chromium' },
    },
  ],
  // Ensure screenshots dir exists
  outputDir: './.claude/progress/2026-05-09-booking-url-fix-remove-result/test-results',
});
