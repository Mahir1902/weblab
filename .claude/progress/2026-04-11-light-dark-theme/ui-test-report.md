# UI Test Report — 2026-04-11 Light/Dark Theme Switching

## Summary
**Result:** 4 failures (2 Critical, 1 Major, 1 Minor)
**Pages tested:** /, /services, /about, /contact
**Breakpoints:** 375px, 768px, 1440px
**Themes tested:** dark (system default), light (system default + manually toggled)
**Build:** passing (no errors)
**Hydration errors:** 0
**CSP violations:** 1 (pre-existing, not introduced by theme switching)

---

## Failures

| Page | Breakpoint | Theme | Category | Issue | Severity |
|------|-----------|-------|----------|-------|----------|
| `/` | All | Light | Colors — Hardcoded | `AnimatedHero` hero section (`section#home`) uses `bg-[#0A0A0A]` hardcoded dark background. In light mode the hero renders with a near-black background, breaking the light theme entirely. `WaveCanvas` reinforces this with a hardcoded `#0A0A0A → #0D0D16` gradient drawn on the canvas at every frame. The hero section **intentionally ignores** the `--color-bg` token. | Critical |
| `/` | All | Light | Colors — Hardcoded | `AnimatedHero` `h1` uses `text-[#F9FAFB]` (near-white). The canvas behind it fills `#0A0A0A` so text is readable only on that dark background — correct in dark mode, but a design-system violation since it bypasses `var(--color-text-primary)`. Additional hardcoded hex colors: badge `text-[#3B82F6]`, subheadline `text-[#9CA3AF]`, secondary CTA `border-[#1F2937] text-[#D1D5DB]`, social proof `text-[#9CA3AF]`, checkmark `text-[#3B82F6]`, primary CTA `bg-[#3B82F6]`. None of these respond to theme switching. | Critical |
| `/contact` | All | Both | Missing embed ID | `#ghl-form-embed` ID is **not present** in the DOM. The right-hand panel uses an `<iframe>` with `id="inline-TXCbBbnT8IHqUOPiJaHv"` — not the expected `#ghl-form-embed` placeholder ID. The CLAUDE.md checklist requirement (`#ghl-form-embed` present on `/contact`) is not satisfied. The iframe is a live GHL embed, not a placeholder, but the ID convention mismatch means any automation relying on `#ghl-form-embed` will fail. | Major |
| All | All | Both | Booking CTA href | All "Book a Call" / "Book a Free Strategy Call" `Link` components resolve to an **empty string href** (`href=""`), causing them to navigate to the current page root. Only the calendar-embed fallback button on `/contact` correctly uses `href="#book-a-call"`. Root cause: `BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call'` — but `NEXT_PUBLIC_BOOKING_URL` is not set in `.env.local`, and the fallback `#book-a-call` should be produced. This appears to be a runtime empty-string rather than the `#book-a-call` fallback. | Minor |

---

## Warnings

| Page | Category | Issue |
|------|----------|-------|
| `/contact` | CSP / iframe | `https://brand.webl4b.com/widget/form/TXCbBbnT8IHqUOPiJaHv` iframe returns a 403 and the outer GHL domain sets `X-Frame-Options: sameorigin`, blocking the iframe in the test browser. This is a pre-existing GHL configuration issue — not a theme regression. However it produces 2 console errors on every load of `/contact` in both themes. |
| `/` | Design token consistency | `AnimatedHero` uses 14 hardcoded hex values (`#0A0A0A`, `#F9FAFB`, `#3B82F6`, `#9CA3AF`, `#D1D5DB`, `#1F2937`, `#2563EB`, `#60A5FA`, `#93C5FD`, `#0D0D16`). These hardcoded values are intentional for the canvas-wave dark background, but they mean the hero section is architecturally a dark-only component. If light mode is a first-class requirement, the hero needs a design decision: either (a) keep it always-dark as a design choice (and explicitly opt-out of theme switching for this section), or (b) replace all hardcoded hexes with CSS custom properties that respond to `.dark`/`.light`. |
| All | Mobile toggle selector | The automated locator `button[aria-label*="mode"]` returned `false` for mobile visibility in initial test because there are **two** ThemeToggle instances rendered (desktop + mobile), and the `first()` match resolved to the hidden desktop one. On manual inspection, the mobile toggle button at `[x:283, y:14, w:36, h:36]` is correctly visible. The mobile ThemeToggle is functioning correctly. |

---

## Passing Checks

### Theme Toggle Presence
- ThemeToggle button is visible in the desktop navbar (between nav links and "Book a Call") at 1440px.
- ThemeToggle button is visible on mobile (left of hamburger) at 375px — confirmed by DOM inspection showing the button at `x:283, y:14, 36x36px`.
- Both instances use correct `aria-label` values: "Switch to light mode" (in dark) / "Switch to dark mode" (in light).

### Default Theme Follows OS Preference
- Dark OS preference: `<html class="scroll-smooth dark">`, `body` background = `rgb(10, 10, 10)` — correct.
- Light OS preference: `<html class="scroll-smooth light">`, `body` background = `rgb(255, 255, 255)` — correct.
- `ThemeProvider` uses `attribute="class" defaultTheme="system" enableSystem` — works correctly.

### Toggle Switches Theme
- Clicking ThemeToggle from dark → light: `<html>` class changes from `scroll-smooth dark` to `scroll-smooth light`, body background changes from `rgb(10, 10, 10)` to `rgb(255, 255, 255)`.
- No console errors during toggle interaction.
- Theme transition is smooth (CSS `transition: background-color 0.2s ease, color 0.2s ease` on `body`).

### Theme Persistence
- After toggle to light, `localStorage.theme = "light"` is set.
- After page reload, `<html>` class is still `scroll-smooth light`.
- Persistence is working correctly via `next-themes`.

### Hydration
- Zero hydration errors on all 4 pages in both themes.
- `suppressHydrationWarning` on `<html>` is correctly applied.
- `ThemeToggle` correctly defers render with `useState(false)` + `useEffect` + `setTimeout(0)` to avoid hydration mismatch — placeholder `<div className="w-9 h-9" aria-hidden="true" />` is rendered on server.

### Color Tokens (non-hero sections)
- Dark mode: `--color-bg = #0a0a0a`, `--color-accent = #3b82f6`, `--color-text-primary = #f9fafb` — matches `globals.css .dark` block exactly.
- Light mode (body and all non-hero sections): `--color-bg = #fff`, `--color-accent = #2563eb`, `--color-text-primary = #111827` — matches `globals.css :root` block exactly.
- All h2/h3 headings use `text-[var(--color-text-primary)]` and render correctly in both modes: `rgb(17, 24, 39)` in light, `rgb(249, 250, 251)` in dark.
- Navbar uses `var(--color-bg)` with opacity — adapts correctly to both themes.
- Footer uses `var(--color-bg)` / `var(--color-surface)` — adapts correctly.
- All ServiceCard, contact cards, and section backgrounds use CSS custom properties.

### Responsive Layout
- Zero horizontal scrollbar at 375px, 768px, or 1440px on any page in either theme.
- Navbar collapses correctly on mobile (hamburger + ThemeToggle side by side).
- Mobile menu opens/closes with correct Framer Motion animation (`ease: [0.42, 0, 0.58, 1]` — cubic-bezier array, correct).
- No layout shift between dark and light mode switches.

### AnimatedSection Scroll Reveal
- All `AnimatedSection` components trigger scroll reveal correctly in both dark and light themes.
- Zero elements stuck at `opacity: 0` after scrolling to reveal position.
- Animations work correctly in both themes (they use Framer Motion opacity/translate, independent of color theme).

### Console Errors
- `/`: 0 errors in both themes.
- `/services`: 0 errors in both themes.
- `/about`: 0 errors in both themes.
- `/contact`: 2 errors (both pre-existing GHL iframe 403 + X-Frame-Options restriction, not related to theme switching).

### Focus Ring
- `:focus-visible` rule in `globals.css` applies `outline: 2px solid var(--color-accent)` with `outline-offset: 2px`.
- ThemeToggle button is keyboard-focusable and receives the focus ring — visible in light mode as `#2563eb` outline, dark mode as `#3b82f6` outline.

### Component Checks
- `ChatbotPlaceholder` is present in the DOM on all pages (confirmed via HTML inspection — `chatbot` string found in body).
- `#ghl-calendar-embed` placeholder div is present on `/contact` in both themes.
- ServiceCard components: 6 card-like elements detected on `/services` — consistent with 6 services in `constants.ts`.
- `.step-connector` (HowItWorks dashed lines) — renders correctly in both modes using `var(--color-border)` which adapts to theme.
- `.marquee-track` (SocialProofBar) — scrolls smoothly in both themes (CSS animation, theme-independent).
- `.gradient-text` — renders correctly in both themes (hardcoded blue gradient, intentional).

### Typography
- All h1/h2/h3 use Syne font (loaded via `next/font/google`, variable `--font-syne`).
- Body text uses Geist Sans (`--font-geist-sans`).
- No text overflow at any breakpoint.
- Font sizes scale correctly across 375/768/1440px.

---

## Screenshots

All screenshots saved to: `.claude/progress/2026-04-11-light-dark-theme/screenshots/`

### 1440px Desktop (dark theme)
- `home-dark-1440.png`
- `services-dark-1440.png`
- `about-dark-1440.png`
- `contact-dark-1440.png`
- `contact-dark-full-1440.png`

### 1440px Desktop (light theme)
- `home-light-1440.png`
- `services-light-1440.png`
- `about-light-1440.png`
- `contact-light-1440.png`

### 768px Tablet (dark + light)
- `home-dark-768.png`, `home-light-768.png`
- `services-dark-768.png`, `services-light-768.png`
- `about-dark-768.png`, `about-light-768.png`
- `contact-dark-768.png`, `contact-light-768.png`

### 375px Mobile (dark + light)
- `home-dark-375.png`, `home-light-375.png`
- `services-dark-375.png`, `services-light-375.png`
- `about-dark-375.png`, `about-light-375.png`
- `contact-dark-375.png`, `contact-light-375.png`

### Special
- `home-after-dark-to-light-toggle-1440.png` — homepage after toggling from dark to light
- `home-dark-scrolled-1440.png` — homepage scrolled mid-page in dark mode (AnimatedSection reveal)
- `home-light-scrolled-1440.png` — homepage scrolled mid-page in light mode (AnimatedSection reveal)
- `theme-toggle-focus-ring-1440.png` — focus ring state on ThemeToggle
- `home-mobile-dark-375.png` — mobile 375px dark mode

---

## Root Cause Analysis

### Critical: AnimatedHero is architecturally dark-only

`src/components/home/AnimatedHero.tsx` was written as a dark-mode-only component and has not been updated for theme switching. Specifically:

1. `section#home` has `className="... bg-[#0A0A0A]"` — hardcoded dark background, ignores `var(--color-bg)`.
2. `WaveCanvas` draws a `#0A0A0A → #0D0D16` gradient on every animation frame — this canvas sits `absolute inset-0` and will always render dark regardless of theme class on `<html>`.
3. `h1` uses `text-[#F9FAFB]` — intentionally light text for dark background, bypasses token.
4. All other text elements use hardcoded hex values that are dark-mode-appropriate colors.

**Design decision required:** The wave-canvas hero is visually designed for a dark background. Options:
- **Option A (Recommended):** Keep the hero always-dark by design. Add an explicit `dark` override to the section so it renders in dark colors regardless of `<html>` class. Add a comment documenting the intentional opt-out from light mode. This is the least-invasive fix.
- **Option B:** Create a light-mode variant of the canvas (lighter wave colors, white/gray canvas background). Replace all hardcoded hex values with CSS custom properties. Higher effort, full light mode support for the hero.

### Minor: BOOKING_URL evaluates to empty string

`BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call'` — the `??` nullish coalescing operator only falls back when the value is `null` or `undefined`. If `.env.local` or the Next.js config defines `NEXT_PUBLIC_BOOKING_URL=""` (empty string), the fallback is bypassed and an empty href is used. Check the env setup — if the variable is intentionally absent, ensure no `.env.local` file sets it to empty string.

---

## Self-Verification Checklist

1. All 4 pages tested at all 3 breakpoints: YES (375px, 768px, 1440px)
2. Browser console checked for errors on every page: YES (0 errors on 3/4 pages; 2 pre-existing GHL errors on /contact)
3. All required screenshots captured: YES (30 screenshots)
4. All interactive elements tested (nav, CTAs, mobile menu, ThemeToggle): YES
5. Animations verified by scrolling: YES (AnimatedSection scroll-reveal confirmed working in both themes)
