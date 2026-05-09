---
name: ESLint config ignores pattern
description: .agents and .claude directories must be in globalIgnores to prevent pre-existing tooling script errors from failing npm run lint
type: project
---

The `eslint.config.mjs` file uses `globalIgnores` from `eslint/config`. The `.agents/**` and `.claude/**` directories contain agent scripts and progress test files that use CommonJS `require()` and other patterns that fail the project's ESLint rules.

These directories are not application code and must be excluded. As of 2026-04-30 they have been added to globalIgnores.

**Why:** Without these ignores, `npm run lint` fails with 16+ errors from `.agents/skills/` and `.claude/progress/` test/script files, even though no application code has lint issues.

**How to apply:** If `npm run lint` fails on files outside `src/`, check whether `.agents/**` and `.claude/**` are in the globalIgnores block of `eslint.config.mjs`. If a new agent drops scripts elsewhere that pollute the lint run, add the path to globalIgnores.
