# UI Test Report — 2026-04-18

## Summary
**Result:** 4 failures (2 Major, 2 Warning-class)
**Pages tested:** `/`, `/services`, `/about`, `/contact`
**Breakpoints:** 375px, 768px, 1440px
**Dev server:** `http://localhost:3005` (port 3000 was occupied by a different app — "School Information System". Tests were run against port 3005 after clean restart.)
**Theme tested:** Dark mode (via `localStorage.setItem('theme', 'dark')` — next-themes pattern)

---

## Failures

| Page | Breakpoint | Category | Issue | Severity |
|------|-----------|----------|-------|----------|
| `/services`, `/about`, `/contact` | All | Colors/Token | Hero sections and certain body sections use `bg-[var(--color-bg)]` but `--color-bg` is not defined in the `@theme inline` block in `globals.css`. The computed background resolves to `rgba(0,0,0,0)` (transparent). Sections are visually dark in dark mode only because they inherit the body `#0A0A0A` background — but they have no explicit background themselves. In light mode this means they inherit white. | Major |
| `/contact` | All | Typography | No `[BRACKET]` section label present on the contact page. All other pages have at least one `[LABEL]` using the `.section-label` monospace style. Contact page has no `SectionHeader` component. | Warning |
| All pages | All | CTAs | All "Book a Call" / "Book a Free Strategy Call" CTA buttons have `href=""` (empty string), resolving to the current page root instead of `#book-a-call` or a real booking URL. The `NEXT_PUBLIC_BOOKING_URL` env var is set to `#book-a-call` in `.env.local`, and `BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call'` is correct in `constants.tsx`. However, the `CTAButton` receives `href={BOOKING_URL}` but the resolved href in the DOM is `""`. Root cause: Next.js does not expose `NEXT_PUBLIC_*` env vars at runtime in dev when the page is a Server Component and the var is set to a fragment — this may be a build-time vs runtime issue, or the `.env.local` was not read at dev server startup. **Only the Footer's "Book a Free Call" (`href="#book-a-call"`) resolves correctly.** | Major |
| `/services` | All | Components | Service cards (`ServiceCard`) on the services page have no step watermark numbers (`step` prop not passed). The test expected step watermarks (01–06) but `ServiceCard` does not receive `step` — this is intentional per the component but worth noting for consistency with `FeatureCard` usage on home page. | Warning/Info |

---

## Detailed Issue Analysis

### Issue 1: `--color-bg` is an undefined design token (Major)

**Affected files:**
- `src/app/services/page.tsx` lines 51, 69 — `bg-[var(--color-bg)]`
- `src/app/about/page.tsx` lines 61, 126, 141, 185 — `bg-[var(--color-bg)]`
- `src/app/contact/page.tsx` lines 27, 46 — `bg-[var(--color-bg)]`
- `src/components/home/MobileAppSection.tsx` line 80 — `bg-[var(--color-bg)]`
- `src/components/layout/Footer.tsx` line 9 — `bg-[var(--color-bg)]`
- `src/app/layout.tsx` line 61 — `bg-[var(--color-bg)]`

**What's in globals.css:** The `@theme inline` block defines `--color-background: var(--rt-bg)`. Tailwind maps this to the class `bg-background`. There is no `--color-bg` token defined anywhere in `globals.css`.

**Visual impact:** In dark mode, sections using `bg-[var(--color-bg)]` compute as `rgba(0, 0, 0, 0)` (transparent). Because the `<html>` element has `background-color: var(--rt-bg)` (#0A0A0A), these sections *appear* to have the correct dark background — but only by coincidence of inheritance. In light mode (default on first visit), these sections resolve to white by the same inheritance. Sections that use `bg-[var(--color-surface)]` correctly compute `rgb(17,17,17)` in dark and `rgb(249,250,251)` in light mode.

**Fix:** Replace all instances of `bg-[var(--color-bg)]` with `bg-background` (Tailwind token) or `bg-[var(--color-background)]`.

---

### Issue 2: Booking CTA `href` resolves to empty string (Major)

**Observed:** All four primary CTAButton instances on home, services, and about pages have `href=""`. Only the footer anchor resolves to `href="#book-a-call"`.

**Root cause analysis:** `NEXT_PUBLIC_BOOKING_URL` in `.env.local` is `#book-a-call`. `BOOKING_URL` constant is `process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call'`. The `??` fallback would only trigger if the env var is `undefined` — but since the var is set to the string `#book-a-call`, it should pass through correctly.

The likely root cause: Next.js `<Link href="">` treats an empty string or hash-only href as current page. When `NEXT_PUBLIC_BOOKING_URL` evaluates to `#book-a-call` (a hash), Next.js `<Link>` may be stripping the fragment in some versions. The footer link works because it uses a plain `<a>` tag or the href was hardcoded there. This needs investigation of which components render the CTAButton and whether `BOOKING_URL` is actually resolving to the hash string at runtime.

**Additional observation:** The light-mode audit at fresh load showed `themeInLS: null` — meaning the default theme on first visit is system light, not dark. This is expected behavior for `next-themes` with no `defaultTheme` forced to `'dark'`.

---

## Warnings

| Page | Category | Issue |
|------|----------|-------|
| `/contact` | Typography | No `[BRACKET]` section label. All other pages use `SectionHeader` with a label. The contact page hero has a plain `<h1>` without the bracketed label pattern. |
| Home | Animations | `.marquee-track` CSS class not found. The `SocialProofBar` component (if it renders a marquee) is either not rendered on this version of the home page, or the class name has changed. The globals.css defines the `marquee` keyframe and `.marquee-track` class. |
| All pages | Light mode default | The site defaults to light mode on first visit (no `defaultTheme: 'dark'` set in ThemeProvider). The current globals.css applies light tokens by default (`:root` defines white backgrounds). This is consistent behavior but the site appears to be designed primarily as a dark site. |
| `/services` | Components | `ServiceCard` components on the services page do not use step watermark numbers. This is intentional (no `step` prop passed) but means the visual pattern differs from FeatureCard usage on home. |
| All pages (desktop) | Navbar | `backdrop-filter: blur(12px)` confirmed active after scroll. However, before scroll the initial state is `backdrop-filter: blur(4px)` (backdrop-blur-sm class on the unscrolled header). |

---

## Passing Checks

### Colors & Design Tokens
- Body background resolves correctly to `rgb(10, 10, 10)` in dark mode on all 4 pages at all 3 breakpoints
- `--color-surface` (`rgb(17,17,17)`) renders correctly on alternating sections (bg-[var(--color-surface)])
- No transparent sections found on home page — all 8 sections have explicit computed backgrounds
- Accent color `#3B82F6` used correctly via `var(--color-accent)` on icon containers and nav active links

### Typography
- H1 uses Syne font on all 4 pages: `"Syne, \"Syne Fallback\", system-ui, sans-serif"`
- H2 uses Syne font: `"Syne, \"Syne Fallback\""`
- Body uses Geist: `"Geist, \"Geist Fallback\", system-ui, sans-serif"`
- Bracket labels `[LABEL]` use Geist Mono: `"Geist Mono", "Geist Mono Fallback"`
- Step watermark numbers (01–05) on home page use Syne font — verified at all 3 breakpoints
- No text overflow or truncation observed at any breakpoint

### Responsive Layout
- Zero horizontal scroll on all 4 pages at all 3 breakpoints
- No layout overflow detected
- Grid/flex layouts reflow correctly

### Navbar
- Navbar (`<header>`) present and fixed on all pages
- `backdrop-blur-md` (12px) active after scrolling 200px — confirmed via computed style
- Mobile hamburger button present (aria-label="Open menu" / "Close menu")
- Mobile menu opens to 9 items including nav links + CTA button
- Mobile menu uses `bg-background/95 backdrop-blur-md` — near-opaque as required
- Nav link active state applies `text-accent` correctly

### Accessibility
- All images have alt text on all 4 pages at all 3 breakpoints
- Heading hierarchy is logical on all pages
- Focus ring visible on interactive elements: `rgb(76, 136, 233) solid 2px` (accent color outline)
- Primary CTAButton has `focus-visible:outline-white` class applied
- Focus ring on CTAButton resolves to `rgb(145, 185, 250) solid 2px` when focused in dark mode — this is the accent color lightened slightly, not white. The Tailwind `focus-visible:outline-white` class needs verification that it takes precedence over the global `:focus-visible` rule.

### Contact Page Form
- Custom React Hook Form is present with 5 fields: `firstName`, `lastName`, `phone`, `email`, `message` + submit button
- This replaces the prior GHL iframe (confirmed by recent commit: `feat(contact): replace GHL iframe with custom React Hook Form + Zod contact form`)
- GHL calendar embed placeholder (`#ghl-calendar-embed`) no longer present — this is a known change from the git log

### Interactive Elements
- All nav links route to correct pages (`/`, `/services`, `/about`, `/contact`)
- Keyboard Tab navigation works through focusable elements
- ChatbotPlaceholder found in layout (`id="chatbot-widget"`)

### Console / Hydration
- Zero hydration errors on all 4 pages at all 3 breakpoints
- Zero CSP violations observed
- Zero JavaScript errors on page load

### Animations
- Scroll-reveal AnimatedSection components verified structurally present
- Navbar scroll behavior verified via JS scroll test
- Framer Motion `ease` in constants.tsx uses correct cubic-bezier arrays: `[0.25, 0.46, 0.45, 0.94]`

---

## Screenshots

All screenshots captured in dark mode (localStorage `theme: dark`):

```
.claude/progress/2026-04-18-code-review-fixes/screenshots/
├── home-375.png
├── home-768.png
├── home-1440.png
├── home-375-menu-open.png    (bonus: mobile menu expanded)
├── home-1440-scrolled.png    (bonus: scrolled state)
├── services-375.png
├── services-768.png
├── services-1440.png
├── about-375.png
├── about-768.png
├── about-1440.png
├── contact-375.png
├── contact-768.png
└── contact-1440.png
```

---

## Action Items (Priority Order)

### Critical / Must Fix Before Release
1. **Replace all `bg-[var(--color-bg)]` with `bg-background`** across `services/page.tsx`, `about/page.tsx`, `contact/page.tsx`, `MobileAppSection.tsx`, `Footer.tsx`, and `layout.tsx`. The token `--color-bg` is undefined; the correct Tailwind token is `bg-background` (maps to `--color-background: var(--rt-bg)`).

2. **Investigate empty `href` on CTAButtons.** Verify at runtime that `process.env.NEXT_PUBLIC_BOOKING_URL` resolves to `#book-a-call` and that Next.js `<Link>` handles hash-only hrefs correctly. Consider using a plain `<a>` tag for hash links, or switching to a full URL for the booking destination.

### Should Fix Before Release
3. **Verify `focus-visible:outline-white` on CTAButton primary.** The computed outline color when focused is `rgb(145, 185, 250)` (accent-tinted blue), not white. The global `:focus-visible { outline: 2px solid var(--rt-accent) }` may be overriding the component's `focus-visible:outline-white`. Tailwind v4 specificity needs checking.

4. **Add a `[BRACKET]` section label to the contact page hero.** All other pages have at least one bracket label using the `.section-label` monospace pattern. Consistency requires contact page to follow suit.

### Nice to Have
5. **Re-add `SocialProofBar` / `.marquee-track` to home page** if it was removed. The `.marquee-track` keyframe animation is defined in globals.css but no element with that class exists on the current home page.

6. **Consider setting `defaultTheme="dark"` in ThemeProvider** if the site is intended to default to dark mode for all visitors. Currently, first-visit users with a light system preference see the light theme.
