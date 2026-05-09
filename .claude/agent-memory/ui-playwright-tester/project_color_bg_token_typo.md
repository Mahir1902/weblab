---
name: --color-bg typo — token does not exist
description: Multiple page files use var(--color-bg) which is not defined; the correct token is --color-background
type: project
---

`globals.css` defines `--color-background` (via `@theme inline`), but many page and layout files use `var(--color-bg)` — a typo that causes those backgrounds to silently fall through to the browser default. Affected as of 2026-04-25: `layout.tsx`, `contact/page.tsx`, `about/page.tsx`, `services/page.tsx`.

**Why:** Likely a naming inconsistency introduced during the neo-brutalist redesign migration.

**How to apply:** In any future coding task, grep for `color-bg\b` before considering the background token correct. The canonical token name is `--color-background`.
