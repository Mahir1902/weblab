# Code Review — 2026-04-11 light-dark-theme

## Skills Invoked
- `web-design-guidelines`: Applied Vercel Web Interface Guidelines — checked dark mode strategy, accessibility, animation, focus states, hydration safety, and semantic HTML patterns.
- `vercel-react-best-practices`: Applied Vercel React/Next.js best practices — checked bundle patterns, re-render safety, hydration, Server vs Client component boundaries, and Framer Motion conventions.

## Files Reviewed
- `src/app/globals.css` — CSS custom property strategy for light/dark themes, @theme inline block, utility classes
- `src/app/layout.tsx` — ThemeProvider placement, suppressHydrationWarning, font loading
- `src/components/providers/ThemeProvider.tsx` — next-themes wrapper
- `src/components/ui/ThemeToggle.tsx` — Sun/Moon toggle, mounted guard
- `src/components/layout/Navbar.tsx` — ThemeToggle integration, mobile menu animations
- `src/components/layout/Footer.tsx` — CSS var usage, external links
- `src/components/home/AnimatedHero.tsx` — Canvas wave, hardcoded hex, Framer Motion
- `src/components/home/HeroWrapper.tsx` — ssr:false pattern, hardcoded hex
- `src/components/home/SocialProofBar.tsx` — Marquee, accessibility
- `src/components/home/ProblemSolution.tsx` — CSS vars, list rendering
- `src/components/home/ServicesOverview.tsx` — CSS vars, service grid
- `src/components/home/HowItWorks.tsx` — CSS vars, step cards
- `src/components/home/SmartWebsiteFeatures.tsx` — CSS vars, feature grid
- `src/components/home/AutomationsSection.tsx` — CSS vars, automation cards
- `src/components/home/MobileAppSection.tsx` — CSS vars, phone mockup
- `src/components/ui/ServiceCard.tsx` — CSS vars, card pattern
- `src/components/ui/BookingCTA.tsx` — CSS vars, CTA section
- `src/components/ui/FaqAccordion.tsx` — Framer Motion, semantic HTML, animation eases
- `src/components/ui/AnimatedSection.tsx` — Scroll-reveal implementation
- `src/app/page.tsx` — Home page composition
- `src/app/services/page.tsx` — Services page, nested AnimatedSection
- `src/app/about/page.tsx` — About page, inline gradient hex
- `src/app/contact/page.tsx` — GHL iframe embed, external script
- `src/lib/constants.ts` — BOOKING_URL env var, SERVICES, site config
- `next.config.ts` — CSP headers, security config

---

## Issues Found

### CRITICAL

- `src/app/globals.css:42` — [CRITICAL] **@theme inline variable name collision on `--color-surface` and `--color-surface-2`.** The `@theme inline` block declares `--color-surface: var(--color-surface)` — a self-referential loop. In Tailwind v4, `@theme inline` maps Tailwind design tokens. Mapping a token name to itself (`--color-surface: var(--color-surface)`) will resolve to an empty/invalid value at build time because the Tailwind token `--color-surface` doesn't exist in the cascade at that point — only the runtime CSS custom property does. The workaround is to use distinct names: the runtime vars are already `--color-surface` and `--color-surface-2`, but the `@theme` block must reference them without creating circular references. **The correct pattern is to name runtime vars with a different prefix (e.g. `--runtime-color-surface`) and map them in `@theme inline`, or alias through an intermediate layer.** Tailwind utilities like `bg-surface` and `bg-surface-2` may silently generate no-op or incorrect values in light mode.

- `src/components/ui/AnimatedSection.tsx:18-22` — [CRITICAL] **`AnimatedSection` uses `animate` (eager) instead of `whileInView` (scroll-triggered).** All sections use `initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}`, which triggers immediately on mount — not on scroll. This means every below-the-fold section animates instantly when the page loads, making the "scroll-reveal" effect non-functional. The intent was clearly scroll-reveal (CLAUDE.md calls it "reusable scroll-reveal wrapper"). Use `whileInView={{ opacity: 1, y: 0 }}` with `viewport={{ once: true }}` instead of `animate`.

- `src/app/globals.css:78` — [CRITICAL] **`body` has `transition: background-color 0.2s ease, color 0.2s ease` using a string ease, which violates the project's cubic-bezier-only rule.** More critically, `next-themes` sets `disableTransitionOnChange` on the `ThemeProvider`, meaning it intentionally suppresses CSS transitions during theme switches to prevent FOUC. However, the CSS `transition` on body **bypasses** this because `disableTransitionOnChange` works by briefly adding an inline style — but a permanent CSS `transition` on the body itself will always fire. This causes a flash/transition conflict. Either remove the `body` transition entirely (consistent with `disableTransitionOnChange`) or remove `disableTransitionOnChange` and rely solely on the CSS transition.

### HIGH

- `src/components/home/AnimatedHero.tsx:201` — [HIGH] **Hardcoded `bg-[#0A0A0A]` on the hero section.** The hero is intentionally always dark (due to canvas wave background needing contrast), but this value is hardcoded rather than using `var(--color-bg)` with a dark-mode override. In light mode, the hero background is dark (#0A0A0A) but the page text colors switch to light-mode values — creating a section that is visually isolated from the theme system. This is a design decision, not necessarily a bug, but the hardcoded hex bypasses the design token system, and the canvas gradient also hardcodes `#0A0A0A` and `#0D0D16` (lines 163–164). If the dark-mode background color is intentionally overridden here, it should be documented as an explicit exception and ideally use a named token.

- `src/components/home/AnimatedHero.tsx:216,224,253,263,269,278,282` — [HIGH] **Extensive hardcoded hex values throughout `AnimatedHero`.** Lines 216 (`#3B82F6`), 224 (`#F9FAFB`), 253 (`#9CA3AF`), 263 (`#3B82F6`, `#2563EB`), 269 (`#1F2937`, `#D1D5DB`, `#3B82F6`, `#F9FAFB`), 278 (`#9CA3AF`), 282 (`#3B82F6`) all bypass the CSS custom property system. Since the hero is intentionally always dark, these specific light-mode-immune values may be defensible, but they violate the project convention requiring design tokens. The "See What We Build" secondary button (line 269) in particular uses `#1F2937` border and `#D1D5DB` text which are dark-mode-specific raw values — these would look broken if the hero were ever made theme-aware.

- `src/components/home/HeroWrapper.tsx:9` — [HIGH] **Hardcoded `bg-[#0A0A0A]` on the loading skeleton.** Mirrors the issue in AnimatedHero — this loading placeholder also bypasses the theme system.

- `src/app/about/page.tsx:71` — [HIGH] **Hardcoded inline gradient `linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)` on the About page heading.** Unlike AnimatedHero (which has a canvas-darkness justification), the About page is fully theme-aware. This gradient should use the `.gradient-text` utility class defined in `globals.css`, which already encodes this exact gradient — the class exists precisely for this purpose. The inline style duplicates the gradient definition and will not benefit from any future token updates.

- `src/app/globals.css` — [HIGH] **Missing `color-scheme` declaration.** The Web Interface Guidelines and dark mode best practices require `color-scheme: dark` on `.dark` (and `color-scheme: light` on `:root`) so that browser-native UI elements (`<select>`, `<input>`, `<scrollbar>`, system color keywords) render correctly in the active theme. Without this, native form elements and the scrollbar will remain in light mode even when `.dark` is active, causing visual inconsistency.

- `src/components/layout/Footer.tsx:49` — [HIGH] **Hardcoded `href="#book-a-call"` instead of using `BOOKING_URL`.** The project convention requires all booking CTAs to use `NEXT_PUBLIC_BOOKING_URL` via the `BOOKING_URL` constant. The Footer's "Book a Free Call" link directly hardcodes the fragment fallback, bypassing the env var. When a real GHL booking URL is set in production, this footer link will remain broken.

- `src/components/home/AnimatedHero.tsx:22-28` — [HIGH] **Wave palette uses raw `rgba()` hardcoded values that will not respond to theme changes.** The canvas always renders the same blue wave palette regardless of light/dark mode, which is intentional for the always-dark hero — but these values are not referenced from any token, making future palette adjustments fragile and violating the design token convention.

### MEDIUM

- `src/components/ui/ThemeToggle.tsx:11-13` — [MEDIUM] **Unnecessary `setTimeout(..., 0)` around `setMounted(true)`.** The mounted guard (`useEffect` + `useState`) is the correct pattern for preventing SSR/hydration mismatches with `next-themes`. However, wrapping `setMounted(true)` in a `setTimeout(..., 0)` adds an extra async tick without any benefit — the state update will be batched by React either way. The timeout also adds a small additional delay before the toggle renders, making the layout-shift placeholder visible for slightly longer. Remove the `setTimeout` and call `setMounted(true)` directly.

- `src/components/ui/AnimatedSection.tsx` — [MEDIUM] **No `viewport` prop means Framer Motion will fire scroll-reveal on page load, not on scroll.** (See CRITICAL note above — this is already flagged. The medium-severity corollary is that even when fixed, the component has no `viewport={{ once: true }}` which would cause the animation to re-trigger every time the element re-enters the viewport.)

- `src/app/services/page.tsx:73-78` — [MEDIUM] **Double-nested `AnimatedSection` on service cards.** The service cards are wrapped in both an outer `<AnimatedSection>` (line 71) and individual per-card `<AnimatedSection key={service.id} delay={index * 0.08}>` (line 74). This means each card has two independent animation wrappers firing simultaneously, which produces no visual benefit and adds unnecessary DOM nodes and Framer Motion instances.

- `src/app/globals.css:127` — [MEDIUM] **`.gradient-text` hardcodes raw hex `#3B82F6`, `#60A5FA`, `#93C5FD`** instead of using CSS custom properties. When the accent color changes (e.g. for a rebrand), these three hardcoded values would need manual updates, while `var(--color-accent)` would be automatic. This is especially relevant since the light and dark themes use different accent blue shades.

- `src/app/globals.css:135` — [MEDIUM] **`.glow-blue-sm` hardcodes `rgba(59, 130, 246, 0.2)`** — same issue as above. Should reference `var(--color-accent)` with appropriate opacity.

- `src/components/layout/Navbar.tsx:17-20` — [MEDIUM] **Side-effect during render** (`setPrevPathname` and `setMenuOpen` called outside a `useEffect`). While this pattern (using derived state comparison during render to clear state) avoids an extra render cycle compared to `useEffect`, it is not idiomatic React 19 and may produce unexpected double-invocations in StrictMode. The recommended approach in React 19 is to derive this from `useEffect`.

- `src/components/home/AnimatedHero.tsx:23-27` — [MEDIUM] **Canvas WAVE_PALETTE does not respect theme.** In light mode the page background is white (`#FFFFFF`) but the hero is always rendered on a dark canvas. This is intentional, but the wave palette and canvas background are entirely disconnected from the CSS variable system, making the hero permanently dark-only. There is no light-mode variant of the hero (even a comment-level note about this design decision is absent in the component).

- `src/components/ui/FaqAccordion.tsx:35` — [MEDIUM] **Framer Motion `transition` on the `+` rotate uses a plain duration without ease specification.** Line 35: `transition={{ duration: 0.2 }}` — no `ease` provided. Framer Motion defaults to its internal easing, not the project's cubic-bezier convention. Should be `transition={{ duration: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}`.

- `src/components/layout/Navbar.tsx:44` — [MEDIUM] **Logo `Image` has `className="h-32 w-auto"` (128px rendered height) but `height={56}` intrinsic.** This large mismatch between intrinsic and rendered dimensions means the browser downloads and decodes a 56px tall image then CSS-scales it to 128px, which may look blurry on high-DPI displays. The `width` and `height` props should match the intended rendered size so Next.js can generate appropriate srcsets. Footer logo has same issue: `height={48}` intrinsic but `className="h-28"` (112px) rendered.

### LOW

- `src/components/ui/ThemeToggle.tsx:18` — [LOW] **The pre-mount placeholder `<div className="w-9 h-9" aria-hidden="true" />` is correct for preventing layout shift**, but `aria-hidden="true"` on a `<div>` is redundant (divs are already presentation-neutral). No issue in practice, but the attribute is unnecessary noise.

- `src/components/home/SocialProofBar.tsx:26` — [LOW] **`key={index}` used for a static array.** The doubled array `doubledIndustries` is static and never reordered, so index keys are acceptable here, but using `key={`${industry}-${index}`}` would be more defensive and avoids ESLint `react/no-array-index-key` warnings.

- `src/app/about/page.tsx:155,184` — [LOW] **`key={i}` (array index) used on animated grid items.** Same pattern. Since these arrays are static and never reordered, this is low risk, but industry standard favors stable keys.

- `src/components/providers/ThemeProvider.tsx:6` — [LOW] **No explicit return type on `ThemeProvider` export.** Minor TypeScript incompleteness; the return type `JSX.Element` or `React.ReactElement` should be declared on exported components per project convention.

- `src/app/globals.css:78` — [LOW] **String ease `ease` in `transition: background-color 0.2s ease, color 0.2s ease`.** Beyond the CRITICAL conflict with `disableTransitionOnChange` already flagged, note this also violates the project's strict cubic-bezier-only rule for all eases. If this transition is retained, it must use `cubic-bezier(...)` syntax.

- `src/components/home/AnimatedHero.tsx:122,124` — [LOW] **`window.addEventListener('resize', resize)` and `window.addEventListener('mousemove', onMouseMove)` without `{ passive: true }`.** The scroll/resize handlers in the Navbar already correctly use `{ passive: true }`. The canvas `mousemove` and `resize` listeners should also be passive for scroll performance compliance, even though they don't involve scroll events directly.

- `src/components/layout/Navbar.tsx:82-102` — [LOW] **Hamburger menu button has no `aria-controls` attribute** pointing to the mobile menu's `id`. This is required for screen reader users to understand the relationship between the toggle button and the revealed panel. Add `id="mobile-menu"` to the `motion.div` and `aria-controls="mobile-menu"` to the button.

- `src/components/ui/FaqAccordion.tsx:30` — [LOW] **`<button>` inside `<dl>/<dt>/<dd>` structure is semantically incorrect.** The question is in a `<dt>` inside a `<button>`, which is invalid HTML (`<dt>` is a block-level element and cannot be a descendant of `<button>`). The `<button>` should be the immediate child of the `<div>` with the `<dt>` content as a `<span>`, or the entire component should use `<div>`-based structure rather than `<dl>` if the semantic mapping of `<dt>`/`<dd>` cannot be maintained correctly.

- `next.config.ts:18` — [LOW] **CSP includes `'unsafe-eval'`** in `script-src`. This is a significant security weakening that allows any JavaScript `eval()` call. If this is required by GHL scripts, it should be documented. If not required, it should be removed. Consider auditing whether GHL actually needs `unsafe-eval` or if nonce-based CSP is achievable.

---

## Summary

**Total issues:** 24 (3 critical, 8 high, 8 medium, 5 low)

**Recommendation:** NEEDS FIXES

The theme implementation is structurally sound — `next-themes` with `attribute="class"`, `suppressHydrationWarning` on `<html>`, and the mounted guard in `ThemeToggle` are all correctly placed. The CSS custom property cascade (`:root` light, `.dark` dark) is the right strategy. However, several issues require resolution before this can be considered production-ready:

**Blockers to fix before shipping:**
1. The `@theme inline` `--color-surface` self-reference (CRITICAL) — verify Tailwind v4 utilities are actually generating correctly with a build-time check (`npx tailwindcss --input src/app/globals.css --output /dev/null` and inspect the output).
2. `AnimatedSection` uses `animate` not `whileInView` — scroll-reveal is completely non-functional (CRITICAL).
3. The `body` transition conflicts with `disableTransitionOnChange` — pick one or the other (CRITICAL).
4. Footer's booking CTA must use `BOOKING_URL` constant, not hardcoded `#book-a-call` (HIGH).
5. Missing `color-scheme` property in `:root` and `.dark` blocks (HIGH).
6. About page heading gradient must use `.gradient-text` class, not inline hex (HIGH).

---

## Positive Observations

- **Hydration guard is correctly structured.** `suppressHydrationWarning` on `<html>` (not `<body>`) is exactly right for `next-themes`. The mounted check in `ThemeToggle` prevents the SSR/client mismatch on the sun/moon icon.
- **`ThemeProvider` placement** wrapping children inside `<body>` (not wrapping `<html>`) is the correct pattern for App Router.
- **The vast majority of components** have been successfully migrated from hardcoded hex to `var(--color-*)` custom properties — `Footer`, `Navbar`, `ServiceCard`, `BookingCTA`, `ProblemSolution`, `ServicesOverview`, `HowItWorks`, `SmartWebsiteFeatures`, `AutomationsSection`, `MobileAppSection`, and `SocialProofBar` all use the token system correctly.
- **Framer Motion cubic-bezier usage** is correct everywhere it appears in updated components (`AnimatedSection`, `FaqAccordion`, `Navbar` mobile menu, `AnimatedHero`).
- **`HeroWrapper` ssr:false pattern** is correctly implemented — the pattern exactly matches the documented convention in CLAUDE.md.
- **Passive scroll listeners** in Navbar and canvas `handleScroll` are correct.
- **GHL iframe** has a `title` attribute and the external script uses `strategy="afterInteractive"`, both correct.
- **CSP in `next.config.ts`** correctly allowlists `brand.webl4b.com` for the actual GHL embed domain in use.
- **`BOOKING_URL` env var** is correctly used in the majority of CTA components via `BOOKING_URL` constant from `constants.ts`.
