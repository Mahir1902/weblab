---
name: IndustryBar component — heading text, industries, layout behaviour
description: IndustryBar sits directly below hero on homepage; heading copy, industry list, token usage, and breakpoint layout characteristics updated 2026-04-26
type: project
---

IndustryBar (`src/components/home/IndustryBar.tsx`) is a static server component placed immediately after `<HeroWrapper />` in `page.tsx`. Last verified 2026-04-26 on branch `update/website-look`.

**Heading:** "Trusted by Service Professionals" (changed from previous "The Natural Habitat for Home Service Businesses")

**Industries (7 total):** Plumbers, Electricians, HVAC, Landscapers, Construction, Pet Grooming, Carpentry
- Previous industries (now removed): Roofing, Cleaning, Painters

**Hover micro-animations (added 2026-04-26):**
- `hover:-translate-y-0.5` on the outer span (2px lift)
- `hover:text-[var(--color-text-primary)]` on the outer span (text darkens)
- `group-hover:scale-110` on the icon wrapper span (icon scales up)
- `transition-all duration-300` handles the animation

**Tokens used:**
- `--color-border-subtle` (#D4CFC9) for top/bottom border
- `--color-surface` (#F5F0EB) for section background (tan)
- `--color-accent` (#295590) for heading text and SVG icon color
- `--color-text-muted` (#555555) for industry name labels (unhovered)
- `--color-text-primary` (#1A1A1A) for industry name labels (hovered)

**Layout at breakpoints:**
- 375px: wraps to multiple rows (flex-wrap)
- 768px: wraps to 2 rows
- 1440px: single row — all 7 industries on one line

**Why:** Knowing the exact copy, industry list, and hover class names avoids false failures or missed regressions in future automated tests.

**How to apply:** Assert heading as "Trusted by Service Professionals". Expect 7 industries. Check for hover class presence using `.evaluate(el => el.className.includes(...))` pattern since hover state cannot be triggered in headless Playwright without `hover()`.
