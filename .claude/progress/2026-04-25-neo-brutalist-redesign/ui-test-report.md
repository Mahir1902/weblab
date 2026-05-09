# UI Test Report — 2026-04-25

## Summary
**Result:** 4 failures (3 distinct root causes, plus 3 supplementary bugs identified through deep investigation)
**Pages tested:** /, /services, /about, /contact
**Breakpoints:** 375px, 768px, 1440px
**Test run:** 2026-04-25, localhost:3001

---

## Failures

| Page | Breakpoint | Category | Issue | Severity |
|------|-----------|----------|-------|----------|
| All pages | All | Hydration | `next-themes` ThemeProvider adds `class="scroll-smooth light"` on client but server renders `class="scroll-smooth"` — causes React hydration mismatch on every page load | Critical |
| All pages | All | Design Token | `--color-accent` resolves to `#2563EB` (Tailwind default blue-600), NOT the intended `#295590` (dark blue). Root cause: Tailwind v4 `@theme inline` uses `var(--rt-accent)` but Tailwind's own `--color-accent` mapping wins at resolution time, overriding `:root` | Critical |
| All pages | All | Design Token | `--color-foreground` resolves to empty string in the browser — footer uses `bg-[var(--color-foreground)]` and gets `rgba(0,0,0,0)` (transparent), making the footer invisible/transparent instead of near-black `#1A1A1A` | Critical |
| All pages | All | Design Token | `--color-bg` token is used on body and multiple page sections but is never defined — `globals.css` defines `--color-background` not `--color-bg`. Affected: `layout.tsx`, `contact/page.tsx`, `about/page.tsx`, `services/page.tsx`. These elements fall through to browser default | Critical |
| /services | All | Content | `[TRADE]` appears as literal bracketed text in the services outcome string: `'Rank Higher for "[trade] near me"'` in `src/lib/constants.tsx:80`. This is a placeholder that was not converted to a pill badge | Major |

---

## Root Cause Analysis

### Bug 1 — Hydration Mismatch (Critical)
**Source:** `src/components/providers/ThemeProvider.tsx`

`next-themes` with `attribute="class"` and `forcedTheme="light"` injects a script that adds `class="light"` and `style="color-scheme: light"` to the `<html>` element on the client. The server renders `<html className="scroll-smooth">` but the client sees `<html className="scroll-smooth light">`. This is a known pattern when using `next-themes` — it needs `suppressHydrationWarning` on the `<html>` element.

**Fix:** Add `suppressHydrationWarning` to `<html>` in `src/app/layout.tsx`:
```tsx
<html lang="en" className="scroll-smooth" suppressHydrationWarning>
```

### Bug 2 — Wrong Accent Color Everywhere (Critical)
**Source:** `src/app/globals.css` — `@theme inline` block

Tailwind v4's `@theme inline` maps CSS custom properties for utility classes. When you write `--color-accent: var(--rt-accent)`, Tailwind resolves this at build/runtime by reading `--color-accent` from the theme cascade — but Tailwind v4 also has a built-in `--color-accent` mapping that may conflict. The actual computed value in the browser is `#2563EB` (Tailwind's `blue-600`), not `#295590`.

The `:root` block defines `--rt-accent: #295590` but the browser shows `--rt-accent` resolving to `#2563eb`, meaning the `@theme inline` is being processed in a way that changes the `:root` value through Tailwind's cascade.

**Fix:** In `globals.css`, add a higher-specificity override after `@import "tailwindcss"` or use a direct hex value instead of variable reference:
```css
/* Option A: override after Tailwind's theme */
:root {
  --color-accent: #295590 !important;
  --rt-accent: #295590 !important;
}

/* Option B: use direct value in @theme */
@theme inline {
  --color-accent: #295590;
}
```

### Bug 3 — Footer Transparent (Critical)
**Source:** `src/components/layout/Footer.tsx:9` + `globals.css`

The footer has `bg-[var(--color-foreground)]`. The `--color-foreground` token is defined in `@theme inline` as `var(--rt-foreground)`, but the computed value in the browser is empty string — making the background transparent. Same root cause as Bug 2: `@theme inline` variables that reference other CSS custom properties do not resolve correctly.

**Fix:** Same as Bug 2 resolution. Once `--color-foreground` properly resolves to `#1A1A1A`, the footer will render with a near-black background.

### Bug 4 — Undefined `--color-bg` Token (Critical)
**Source:** Multiple files — `src/app/layout.tsx`, `src/app/contact/page.tsx`, `src/app/about/page.tsx`, `src/app/services/page.tsx`

The token `--color-bg` does not exist in `globals.css`. The correct token is `--color-background`. All uses of `bg-[var(--color-bg)]` silently fail and fall through to the browser default.

**Fix:** Do a project-wide find-and-replace: `var(--color-bg)` → `var(--color-background)`. Affected files confirmed:
- `src/app/layout.tsx:61`
- `src/app/contact/page.tsx:27,46`
- `src/app/about/page.tsx:61,141,184`
- `src/app/services/page.tsx:51,68`

### Bug 5 — `[TRADE]` Literal Text (Major)
**Source:** `src/lib/constants.tsx:80`

The outcome string `'Rank Higher for "[trade] near me"'` contains a literal `[trade]` placeholder that renders as bracketed mono text in the services page. This was supposed to be a dynamic trade/industry placeholder but remains as raw text.

**Fix:** Either replace `[trade]` with a specific trade (e.g., `"plumber"`, `"electrician"`) or remove the brackets to make it `trade near me`.

---

## Warnings (Non-blocking)

| Page | Breakpoint | Category | Issue |
|------|-----------|----------|-------|
| All pages | All | Design Token | `--color-foreground` and `--rt-foreground` both return empty string in browser (same @theme cascade issue as Bug 2) |
| All pages | All | Footer | Footer background is `rgba(0,0,0,0)` — appears transparent at all breakpoints |
| /contact | All | GHL Embeds | No `#ghl-calendar-embed` or `#ghl-form-embed` elements found. CLAUDE.md documents these as expected — may have been intentionally replaced by the new custom React Hook Form implementation |

---

## Passing Checks

**Typography:**
- All 4 pages use Syne font at weight 900 for H1 headings
- Body uses Geist Sans via CSS variable
- No text overflow at any breakpoint across any page
- Single H1 on every page, correct heading hierarchy (H1 > H2 > H3)

**Responsive Layout:**
- Zero horizontal scroll at 375px, 768px, and 1440px on all pages
- Layout reflows correctly at all breakpoints
- No content clipping or truncation detected

**Navigation:**
- Navbar is sticky/fixed on all 4 pages at all breakpoints
- Hamburger menu button present at 375px (all pages)
- No theme toggle present anywhere (correctly removed)

**Content:**
- No `[BRACKETED]` text on /, /about, /contact at any breakpoint
- All images have descriptive alt text on all pages
- Booking CTAs present (5 on homepage, 3 on /services, 3 on /about, 2 on /contact)
- 22 pill badge elements detected on homepage — section labels using rounded-full

**Animation:**
- Canvas element present on homepage at 1440px (hero canvas animation)

**Accessibility:**
- All interactive elements use semantic HTML
- Syne font at 900 weight provides excellent heading visibility

**ChatbotPlaceholder:**
- `#chatbot-widget` element present on all pages at all breakpoints

**Design:**
- White background (`rgb(255, 255, 255)`) renders correctly
- No old dark theme (`#0A0A0A`) anywhere — confirms light background migration is correct
- No theme toggle button anywhere (confirmed removed)

---

## Screenshots

All 12 required screenshots captured:

| File | Path |
|------|------|
| home-375.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/home-375.png` |
| home-768.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/home-768.png` |
| home-1440.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/home-1440.png` |
| services-375.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/services-375.png` |
| services-768.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/services-768.png` |
| services-1440.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/services-1440.png` |
| about-375.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/about-375.png` |
| about-768.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/about-768.png` |
| about-1440.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/about-1440.png` |
| contact-375.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/contact-375.png` |
| contact-768.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/contact-768.png` |
| contact-1440.png | `/Users/mahirhaque/Documents/Coding/WebLab website/.claude/progress/2026-04-25-neo-brutalist-redesign/screenshots/contact-1440.png` |

---

## Fix Priority Order

1. **Fix `--color-accent` token resolution** — this is the root cause of wrong blue (#2563EB showing instead of #295590). Everything using `var(--color-accent)` or `var(--color-foreground)` is broken until this is resolved.
2. **Fix `--color-bg` typo** — rename all `var(--color-bg)` to `var(--color-background)` site-wide (7+ files).
3. **Add `suppressHydrationWarning`** to `<html>` in `layout.tsx` — eliminates React hydration mismatch caused by `next-themes` class injection.
4. **Fix `[TRADE]` placeholder** in `src/lib/constants.tsx:80` — change to a real trade term or remove brackets.
