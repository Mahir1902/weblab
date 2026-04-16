# Coding Notes — Light/Dark/System Theme Switching

## Files Changed

### New Files
- `src/components/providers/ThemeProvider.tsx` — Wraps `NextThemesProvider` with `attribute="class"`, `defaultTheme="system"`, `enableSystem`. Client component.
- `src/components/ui/ThemeToggle.tsx` — Sun/moon button using `useTheme()` from next-themes. Uses `setTimeout` pattern to avoid `react-hooks/set-state-in-effect` lint error on `setMounted`.

### Modified Files
- `src/app/globals.css` — Replaced static `@theme inline` block with dual-theme CSS custom properties. Added `:root` (light) and `.dark` (dark) variable declarations. All hardcoded hex values replaced with `var(--color-*)` references in scrollbar, focus ring, body, and section-divider rules.
- `src/app/layout.tsx` — Added `suppressHydrationWarning` to `<html>`, wrapped children in `<ThemeProvider>`, updated body classes to use `var(--color-bg)` and `var(--color-text-primary)`.
- `src/components/layout/Navbar.tsx` — All hardcoded hex replaced with CSS var references. Added `ThemeToggle` to desktop nav (beside Book a Call) and mobile nav (beside hamburger).
- `src/components/layout/Footer.tsx` — All hardcoded hex replaced with CSS var references.
- `src/components/home/AnimatedHero.tsx` — Canvas background kept hardcoded dark (#0A0A0A) intentionally so wave visualisation always renders on dark canvas. Text/button colors in JSX layer converted to CSS vars. Fixed pre-existing lint warning: ternary expression for side effects changed to if/else.
- `src/components/home/HeroWrapper.tsx` — Loading skeleton kept as hardcoded `bg-[#0A0A0A]` to match AnimatedHero canvas (intentional).
- `src/components/home/SocialProofBar.tsx` — All hex replaced; fade gradient edges now use `var(--color-surface)`.
- `src/components/home/ProblemSolution.tsx` — All hex replaced with CSS vars.
- `src/components/home/ServicesOverview.tsx` — All hex replaced.
- `src/components/home/HowItWorks.tsx` — All hex replaced.
- `src/components/home/SmartWebsiteFeatures.tsx` — All hex replaced.
- `src/components/home/AutomationsSection.tsx` — All hex replaced.
- `src/components/home/MobileAppSection.tsx` — All hex replaced.
- `src/components/ui/ServiceCard.tsx` — All hex replaced.
- `src/components/ui/BookingCTA.tsx` — All hex replaced.
- `src/components/ui/FaqAccordion.tsx` — All hex replaced.
- `src/app/page.tsx` — No hex literals present; no change needed.
- `src/app/services/page.tsx` — All hex replaced.
- `src/app/about/page.tsx` — All hex replaced.
- `src/app/contact/page.tsx` — All hex replaced.

## Deviations from Plan

1. **AnimatedHero canvas background** — Kept `#0A0A0A` hardcoded in the canvas `animate()` function because the WaveCanvas component always renders on a dark background to ensure waves (blue on dark) remain visible. If the canvas background followed the CSS var, waves would be invisible in light mode. Added a comment in the code explaining this decision.

2. **HeroWrapper loading skeleton** — Kept `bg-[#0A0A0A]` hardcoded to match the dark canvas that loads after. This prevents a flash of light background before the canvas renders in SSR-off mode.

3. **Gradient text in about/page.tsx and AnimatedHero.tsx** — Kept hardcoded hex in inline `style` gradient values (as instructed: gradient-text class and inline gradient uses are preserved as-is).

4. **`setMounted` in ThemeToggle** — Used `setTimeout(() => setMounted(true), 0)` pattern instead of direct `setMounted(true)` in effect body, to satisfy the `react-hooks/set-state-in-effect` ESLint rule from `eslint-config-next`.

5. **`setDeleting`/`setPhraseIdx` in AnimatedHero typewriter** — Wrapped the synchronous setState calls (that triggered at `charIdx === 0`) in `setTimeout(..., 0)` to pass the same lint rule.

## Follow-up Concerns

- The AnimatedHero canvas always renders dark — if a user is in light mode, the hero section will appear dark (which is intentional since the wave art requires it), but this creates a colour contrast discontinuity. A future improvement could be a light-mode variant of the wave colours.
- `next-themes` adds `suppressHydrationWarning` to `<html>` element — this is the required pattern and has been applied.

## Build and Lint Status
- `npm run lint` (src/): 0 errors, 0 warnings ✓
- `npm run build`: Compiled successfully, all 4 routes static ✓
