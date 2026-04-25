# Code Review — 2026-04-16 impeccable-improvements

## Skills Invoked
- `web-design-guidelines`: Applied Web Interface Guidelines rules for accessibility, animation, typography, focus states, and interactive states across all modified files.

## Files Reviewed
- `src/components/ui/CTAButton.tsx` — New reusable CTA link-button (primary/secondary variants, sm/default sizes)
- `src/components/ui/SectionHeader.tsx` — New reusable section header (label + h2 + description)
- `src/components/ui/FeatureCard.tsx` — New reusable feature card (icon + title + description + optional step watermark)
- `src/app/globals.css` — Removed `.gradient-text`, added `.section-label`, `.section-heading`, `.section-body` utilities
- `src/lib/constants.tsx` — Added `WAVE_COLORS` and `ANIMATION` exported constants
- `src/components/home/AnimatedHero.tsx` — Removed gradient text, uses `WAVE_COLORS` + `CTAButton`
- `src/components/home/AutomationsSection.tsx` — Uses `SectionHeader` + `FeatureCard`
- `src/components/home/HowItWorks.tsx` — Uses `SectionHeader` + `FeatureCard` + `CTAButton`
- `src/components/home/ProblemSolution.tsx` — Uses `SectionHeader`
- `src/components/home/ServicesOverview.tsx` — Uses `SectionHeader`
- `src/components/home/SmartWebsiteFeatures.tsx` — Uses `SectionHeader` + `FeatureCard`
- `src/components/layout/Navbar.tsx` — Uses `CTAButton`
- `src/components/ui/BookingCTA.tsx` — Uses `CTAButton`

---

## Issues Found

### P0 — Blockers (runtime breakage)

- `src/components/home/AutomationsSection.tsx:40` — [P0] `bg-[var(--color-bg)]` references a CSS variable that does not exist. `globals.css` defines `--color-background` (mapping to `--rt-bg`), not `--color-bg`. At runtime the background resolves to transparent. Fix: change to `bg-[var(--color-background)]` or use the Tailwind token `bg-background`.

- `src/components/home/HowItWorks.tsx:40` — [P0] Same broken `--color-bg` reference as above.

- `src/components/home/ProblemSolution.tsx:29` — [P0] Same broken `--color-bg` reference as above.

- `src/components/layout/Navbar.tsx:41-42` — [P0] `bg-(--color-bg)/90` and `bg-(--color-bg)/70` reference the non-existent `--color-bg` token via Tailwind v4 arbitrary opacity syntax. Navbar background will be fully transparent (no blur, no tint) at all scroll positions. Fix: `bg-(--color-background)/90` etc., or use `bg-background/90`.

- `src/components/layout/Navbar.tsx:120` — [P0] Same broken `bg-(--color-bg)/95` reference in the mobile menu panel. Mobile menu will be transparent, colliding with page content underneath.

### P1 — Important (convention violations, quality issues)

- `src/app/globals.css:71` — [P1] `transition: background-color 0.3s ease, color 0.2s ease, border-color 0.3s ease` on `html` uses the string keyword `ease`. CLAUDE.md requires all eases to be `cubic-bezier(...)` arrays. Note: this also conflicts with `next-themes` `disableTransitionOnChange` — if that option is used, this transition will fight it. Fix: `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for each property, or remove and rely on `next-themes`.

- `src/app/globals.css:77` — [P1] Same string `ease` issue on `body`. Same fix.

- `src/components/home/AnimatedHero.tsx:24-25` — [P1] Double cast `WAVE_COLORS.dark as unknown as WaveConfig[]` is a TypeScript escape hatch. `WAVE_COLORS` and `WaveConfig` are structurally identical — the `as const` in `constants.tsx` narrows the types to literal tuples which are incompatible with `WaveConfig[]`. The correct fix is to type `WAVE_COLORS.dark` as `WaveConfig[]` in `constants.tsx` (add the type annotation on the array), removing the need for the double cast entirely. Using `as unknown as` to suppress structural incompatibility is a convention violation.

### P2 — Medium (convention deviations, maintainability)

- `src/components/ui/SectionHeader.tsx:34` — [P2] The `span` at line 34 manually replicates the exact styling of the `.section-label` utility class added to `globals.css` in this same session. The utility was added precisely to avoid this duplication. Use `className="section-label mb-6 block"` instead of the current arbitrary property chain. Same applies to the `h2` at line 37 (`section-heading`) and the `p` at line 41 (`section-body`).

- `src/components/ui/FeatureCard.tsx:41` — [P2] Inline `style={{ fontFamily: 'var(--font-syne)' }}` should use the Tailwind utility `font-syne` instead (since `--font-syne` is mapped in `@theme inline`). Inline styles for things achievable with Tailwind are a project convention violation per CLAUDE.md.

- `src/components/home/AutomationsSection.tsx` — [P2] No `AnimatedSection` scroll-reveal wrapper. All new sections should use `AnimatedSection` for scroll-triggered entrance animations per CLAUDE.md pattern. The cards render immediately with no motion. Same issue exists in `HowItWorks.tsx`, `ProblemSolution.tsx`, and `SmartWebsiteFeatures.tsx`.

- `src/components/home/HowItWorks.tsx` — [P2] See above — no `AnimatedSection` wrapper.

- `src/components/home/ProblemSolution.tsx` — [P2] See above — no `AnimatedSection` wrapper.

- `src/components/home/SmartWebsiteFeatures.tsx` — [P2] See above — no `AnimatedSection` wrapper.

- `src/lib/constants.tsx:89-106` — [P2] `WAVE_COLORS` contains hardcoded `rgba(...)` color strings for wave colors. While intentional (canvas 2D API cannot consume CSS variables), this is undocumented. Add a comment explaining that these are canvas-only colors and intentionally bypass the token system to avoid future reviewers flagging them. Contrast with `gradients.dark.from` at line 103 (`'#0A0A0A'`) which should ideally be `--rt-bg` but cannot be for the same canvas reason.

### P3 — Nitpick / Low priority

- `src/components/home/ServicesOverview.tsx:14-15` — [P3] Label prop is `"WHAT WE BUILD"` and heading prop is `"What We Build"` — identical content in different cases. The label exists to give topical context distinct from the heading. Consider differentiating: e.g., label `"OUR SERVICES"` and heading `"What We Build"`.

- `src/components/ui/SectionHeader.tsx:37` — [P3] `h2` headings should have `text-wrap: balance` applied (Web Interface Guidelines). None of the headings in this component or the sites' section headers have it. Adding `text-balance` (Tailwind utility) or a `balance` class in `globals.css` to `h1, h2, h3` would cover all headings globally.

- `src/components/ui/CTAButton.tsx:30` — [P3] `focus-visible:outline-2 focus-visible:outline-offset-2` is specified but `focus-visible:outline-color` is not. The color falls back to the global `:focus-visible` rule in `globals.css`. This is correct but brittle — if the global rule changes, the button's focus ring may not have sufficient contrast against the button's own background. Consider adding `focus-visible:outline-white` for the primary variant.

- `src/components/ui/CTAButton.tsx` — [P3] No `React` import at the top of the file, though `React.ReactNode` is used as a type in the interface. In React 19 with the new JSX transform this is fine, but the other new components (`SectionHeader.tsx:1`, `FeatureCard.tsx:1`) both explicitly import React. Be consistent.

---

## Summary

**Total issues:** 15 (5 P0, 3 P1, 6 P2, 4 P3 — some P2s cover multiple files)

**Recommendation:** BLOCKED — do not ship. The five P0 issues mean background colors are broken across three major home sections and both Navbar states (scrolled and mobile menu). Users will see transparent backgrounds and text colliding with the underlying hero canvas.

---

## What To Fix First

1. Fix `--color-bg` → `--color-background` (or Tailwind `bg-background`) in `AutomationsSection.tsx`, `HowItWorks.tsx`, `ProblemSolution.tsx`, and both Navbar className strings (lines 41, 42, 120).
2. Fix `globals.css` string `ease` → `cubic-bezier(0.25, 0.46, 0.45, 0.94)` on lines 71 and 77.
3. Fix `AnimatedHero.tsx` double cast by adding `WaveConfig[]` type annotation on the constant arrays in `constants.tsx`.

After fixing P0s and P1s, the P2s (missing `AnimatedSection`, unused utility classes in `SectionHeader`, inline `fontFamily` style) should be addressed in a follow-up pass before the P3s.

---

## Positive Observations

- `CTAButton.tsx` is a clean, minimal abstraction — prop interface is well-typed, defaults are sensible, and the component is pure (no client directive needed).
- `FeatureCard.tsx` correctly marks the decorative step watermark `aria-hidden="true"` — good accessibility hygiene.
- `ANIMATION` constant in `constants.tsx` uses correctly typed cubic-bezier arrays (`as [number, number, number, number]`) — this is the right pattern and should prevent future string-ease violations.
- `AnimatedHero.tsx` correctly checks `prefers-reduced-motion` at the canvas level and stops time advancement when reduced motion is requested — good animation accessibility.
- `Navbar.tsx` hamburger button has correct `aria-label` and `aria-expanded` attributes.
- The `WaveConfig` type is defined locally in `AnimatedHero.tsx` and matches the shape of `WAVE_COLORS` entries exactly — a good pattern, just undermined by the `as unknown as` cast instead of a proper type annotation at the source.
