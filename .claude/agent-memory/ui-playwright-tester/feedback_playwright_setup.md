---
name: Playwright setup in this project
description: playwright-cli global binary is not installed; use @playwright/test as a devDependency with node scripts run from the project directory
type: feedback
---

`playwright-cli` global binary is not available on this machine. The `playwright-cli` skill documents a global CLI, but it is not installed globally.

Working approach:
1. `@playwright/test` is already installed as devDependency — no need to reinstall
2. `playwright-cli` package (npm) is deprecated/stub — do not install it
3. Browser (Chromium) is already installed via `./node_modules/.bin/playwright install chromium`
4. Write `.spec.ts` test files in the progress folder, e.g. `.claude/progress/<slug>/mytest.spec.ts`
5. Create a `playwright.config.ts` at project root pointing `testDir` to the progress folder
6. Run with `./node_modules/.bin/playwright test --config=playwright.config.ts` from project root
7. Use `waitUntil: "networkidle"` + `waitForTimeout(2000)` for hydrated Next.js pages
8. Use `page.evaluate(() => getComputedStyle(document.documentElement).getPropertyValue('--token'))` to read CSS custom properties

Port caution: Port 3000 is frequently occupied by an unrelated "School Information System" app on this machine. Always check `cat /tmp/devserver.log` after starting `npm run dev` to get the actual port (often 3001). Test screenshots against the wrong port will silently show the wrong app.

When the dev server fails to start due to `.next/dev/lock`, an existing `next dev` instance is already running — find its port via `lsof -nP -iTCP -sTCP:LISTEN | grep node` rather than starting a new one.

**Why:** The `playwright-cli` skill assumes a globally installed CLI. This project has no test framework configured (per CLAUDE.md). Installing as devDependency is a clean workaround.

**How to apply:** Any time UI testing is needed, follow this pattern. Do not try `playwright-cli open` or `npx playwright-cli` — neither works on this machine. Always confirm the port before running any tests.
