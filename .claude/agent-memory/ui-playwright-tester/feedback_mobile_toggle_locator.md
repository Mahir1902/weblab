---
name: Two ThemeToggle instances cause mobile locator false-negative
description: Navbar renders two ThemeToggle components (desktop + mobile); locator .first() resolves to the hidden desktop instance on mobile viewport, giving a false "not visible" result
type: feedback
---

`Navbar.tsx` renders `<ThemeToggle />` in two places:
1. Inside `<div className="hidden md:flex ...">` — desktop only (hidden on mobile via `hidden`)
2. Inside `<div className="md:hidden flex ...">` — mobile only (hidden on desktop)

When testing at 375px width, `page.locator('button[aria-label*="mode"]').first()` resolves to the first instance (the desktop toggle hidden via `display:none`), returning `isVisible() = false`.

**Fix:** Use `.last()` instead of `.first()` at mobile breakpoints, or use a more specific locator: `page.locator('.md\\:hidden button[aria-label*="mode"]')` for mobile.

**How to apply:** Any automated check for ThemeToggle visibility on mobile must account for two instances and select the correct one (the one inside `md:hidden` container).
