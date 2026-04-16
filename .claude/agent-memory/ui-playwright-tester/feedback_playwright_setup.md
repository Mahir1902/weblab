---
name: Playwright setup in this project
description: playwright-cli global binary is not installed; use @playwright/test as a devDependency with node scripts run from the project directory
type: feedback
---

`playwright-cli` global binary is not available on this machine. The `playwright-cli` skill documents a global CLI, but it is not installed globally.

Working approach:
1. Install `@playwright/test` as a devDependency: `npm install --save-dev @playwright/test`
2. Install browser: `npx playwright install chromium`
3. Write test scripts as Node.js files inside the project directory (NOT `/tmp` — needs local `node_modules`)
4. Run with `node ./my-test-script.js` from the project root
5. Delete test scripts after use (they are not test fixtures, just one-off UI validation scripts)

**Why:** The `playwright-cli` skill assumes a globally installed CLI. This project has no test framework configured (per CLAUDE.md). Installing as devDependency is a clean workaround.

**How to apply:** Any time UI testing is needed, follow this pattern. Do not try `playwright-cli open` or `npx playwright-cli` — neither works on this machine.
