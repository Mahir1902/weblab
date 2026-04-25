---
name: Coding agent recurring mistakes
description: Patterns the coding agent repeatedly gets wrong that the code review agent should always check
type: feedback
---

1. **Hardcoded hex in AnimatedHero** — The coding agent consistently leaves raw hex values (`#3B82F6`, `#F9FAFB`, `#9CA3AF`, `#0A0A0A`) in `AnimatedHero.tsx` because it treats the "always dark hero" as exempt from the token system. Always flag these. The canvas wave palette WAVE_PALETTE also uses raw rgba() values. The intentional darkness of the hero does not excuse bypassing design tokens.

2. **Forgetting `.gradient-text` utility class** — The coding agent writes inline `style={{ background: 'linear-gradient(135deg, #3B82F6 ...)' }}` on gradient headings (e.g. About page h1) instead of using the `.gradient-text` CSS utility class that already encodes this exact gradient in `globals.css`. Always check every gradient heading.

3. **AnimatedSection uses `animate` not `whileInView`** — The component intended for scroll-reveal uses `animate={{ opacity: 1, y: 0 }}` which fires immediately on mount, not on scroll. The correct pattern is `whileInView` with `viewport={{ once: true }}`. This has been a persistent issue.

4. **Footer `#book-a-call` hardcode** — `Footer.tsx` "Book a Free Call" link frequently reverts to a hardcoded `href="#book-a-call"` instead of using the `BOOKING_URL` constant. Always verify all booking CTAs across all components use the constant.

5. **Missing `color-scheme` CSS property** — When adding dark mode, the coding agent forgets to add `color-scheme: light` to `:root` and `color-scheme: dark` to `.dark`. This causes native form elements and scrollbars to stay in the wrong theme.

6. **Body `transition` string ease** — When adding theme transitions to `body`, the coding agent uses `transition: background-color 0.2s ease` with a string ease. The project requires cubic-bezier arrays for all eases, AND this conflicts with `next-themes` `disableTransitionOnChange`.

7. **@theme inline self-reference** — In Tailwind v4 `@theme inline` block, the coding agent maps `--color-surface: var(--color-surface)` (self-referential). Runtime CSS vars and Tailwind design token names must be distinct to avoid circular references.

8. **`--color-bg` vs `--color-background` token name confusion** — The Tailwind design token for the background color is `--color-background` (maps to `--rt-bg` in `:root`/`.dark`). The raw runtime var is `--rt-bg`. There is NO token named `--color-bg`. The coding agent consistently uses `bg-[var(--color-bg)]` and `bg-(--color-bg)/90` which resolves to transparent at runtime, breaking section and Navbar backgrounds. Always grep for `--color-bg` as a canary for this mistake.

9. **Defining CSS utilities but not using them in the same session** — When the coding agent adds semantic utility classes to `globals.css` (e.g. `.section-label`, `.section-heading`, `.section-body`) in the same session as it creates new components, it then fails to actually apply those utilities in the new components. `SectionHeader.tsx` was the clearest example: it re-inlined the exact same properties the utilities encode. Always cross-check that new utility classes defined in `globals.css` are actually referenced in the components that motivated their creation.

10. **Missing `AnimatedSection` on new sections** — New section components are consistently added without any `AnimatedSection` scroll-reveal wrapper. The CLAUDE.md pattern says `AnimatedSection` is the standard scroll-reveal wrapper. Always verify new `<section>` elements use `AnimatedSection` unless there is an explicit reason to skip (e.g. the hero which animates itself with Framer Motion).

11. **`--color-bg` fix sessions are always incomplete** — When the coding agent is tasked with fixing `bg-[var(--color-bg)]` → `bg-background`, it fixes only the components explicitly named in the task. It consistently misses out-of-scope files with the same broken pattern: `MobileAppSection.tsx`, `layout.tsx`, `Footer.tsx`, `services/page.tsx`, `about/page.tsx`, `contact/page.tsx`. Always grep the entire `src/` tree for `--color-bg` after a targeted fix, not just the listed files.

12. **`transition-all` in new UI components** — New card and interactive components consistently use `transition-all duration-300` instead of listing specific properties. Per Web Interface Guidelines, `transition: all` should name specific properties. `FeatureCard.tsx` and `CTAButton.tsx` both had this. The correct fix for cards is `transition-[border-color]`; for buttons `transition-[background-color,transform,box-shadow]`.

13. **Decorative inline SVGs missing `aria-hidden`** — When inline SVGs are used as visual indicators inside list items (e.g., the checkmark/X in `ProblemSolution.tsx`), the coding agent omits `aria-hidden="true"`. Because the surrounding list item text already communicates the meaning, the SVG is purely decorative and should be hidden from AT.

14. **Secondary CTAButton variant missing focus-visible ring color** — When `focus-visible:outline-color` is added to the primary variant of `CTAButton`, the secondary variant is always left without a ring color, relying on the global `:focus-visible` rule as accidental fallback. Always verify both variants have explicit focus ring colors.

15. **Cubic-bezier value substitution uses browser-default not project standard** — When replacing string `ease` in CSS, the coding agent substitutes `cubic-bezier(0.25, 0.1, 0.25, 1)` (the browser default `ease`) instead of the project standard `cubic-bezier(0.25, 0.46, 0.45, 0.94)`. These are different curves. Always use `[0.25, 0.46, 0.45, 0.94]` for Framer Motion and `cubic-bezier(0.25, 0.46, 0.45, 0.94)` for CSS transitions.

**Why:** These patterns repeat across sessions because the coding agent treats the "always dark hero" as a special case, forgets which utility classes exist, confuses runtime CSS var names with Tailwind token names, and doesn't fully understand the Tailwind v4 @theme inline resolution model. Fix sessions are also consistently under-scoped — the agent fixes only the named files, not all instances of the same bug.

**How to apply:** On every review: (1) grep for `--color-bg` across ALL of `src/` (P0 if found, not just in listed files), (2) grep for `#[0-9A-Fa-f]` in tsx files, (3) check Footer booking link, (4) check AnimatedSection for `animate` vs `whileInView`, (5) verify `color-scheme` is in globals.css, (6) cross-check any new globals.css utilities are actually used in the components added in the same session, (7) grep for `transition-all` in new UI components, (8) check all inline SVGs in list items for `aria-hidden="true"`, (9) check both CTAButton variants have explicit focus ring colors, (10) verify cubic-bezier values match `[0.25, 0.46, 0.45, 0.94]` not `[0.25, 0.1, 0.25, 1]`.
