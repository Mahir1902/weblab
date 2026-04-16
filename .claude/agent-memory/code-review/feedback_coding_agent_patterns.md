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

**Why:** These patterns repeat across sessions because the coding agent treats the "always dark hero" as a special case, forgets which utility classes exist, and doesn't fully understand the Tailwind v4 @theme inline resolution model.

**How to apply:** On every review, grep for `#[0-9A-Fa-f]` in tsx files, check Footer booking link, check AnimatedSection for `animate` vs `whileInView`, and verify `color-scheme` is in globals.css.
