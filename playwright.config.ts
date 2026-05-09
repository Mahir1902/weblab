import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: ".claude/progress/2026-04-27-about-page-rebuild",
  testMatch: "**/*.spec.ts",
  use: {
    baseURL: "http://localhost:3001",
    headless: true,
    screenshot: "only-on-failure",
  },
  reporter: [["list"], ["json", { outputFile: ".claude/progress/2026-04-27-about-page-rebuild/playwright-results.json" }]],
  workers: 1,
  timeout: 60000,
});
