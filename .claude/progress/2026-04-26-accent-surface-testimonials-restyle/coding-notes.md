# Coding Notes — Accent Surface Token + Testimonials Restyle

## Files Changed

### `src/app/globals.css`
- Added `--rt-accent-surface: rgba(41, 85, 144, 0.07);` in the `:root` block after `--rt-accent-dim`
- Added `--color-accent-surface: rgba(41, 85, 144, 0.07);` in the `@theme inline` block after `--color-accent-dim`
- Both additions follow the existing pattern of pairing `:root` runtime vars with `@theme inline` design tokens

### `src/components/home/IndustryBar.tsx`
- Removed `border-y border-[var(--color-border-subtle)]` from the outermost `<section>`
- Changed background from `bg-[var(--color-surface)]` to `bg-[var(--color-accent-surface)]` (new blue tint token)
- Result: subtle blue-tinted strip with no border, visually connecting it to the hero/brand accent

### `src/components/home/TestimonialsSection.tsx`
- Outer `<section>` background changed from `bg-[var(--color-background)] border-y-2 border-[var(--color-foreground)]` to `bg-[var(--color-accent)]` — solid brand blue section
- Removed the pill badge `<span>` ("DON'T JUST TAKE OUR WORD FOR IT") entirely
- `<h2>` className: removed badge spacing (`mt-2`), changed text color from `text-[var(--color-text-primary)]` to `text-white`
- `<p>` subheading: changed from `text-[var(--color-text-muted)]` to `text-white/70`
- Each testimonial card: removed neo-brutalist `border-2 border-[var(--color-foreground)] shadow-brutal hover:shadow-brutal-lg`, replaced with softer `border border-white/20 shadow-lg hover:shadow-xl`

## Deviations from Plan
None. All changes applied exactly as specified.

## Build & Lint Status
- `npm run build`: PASSED — 0 errors, all 5 routes static
- `npm run lint` (src/ only): PASSED — 0 errors, 0 warnings
- Full `npm run lint`: 15 pre-existing errors in `.agents/skills/` and `.claude/progress/` test helper scripts — not caused by these changes and outside `src/`

## Follow-up Concerns
- None. The `--color-accent-surface` token is available globally and could be used in other components that need a subtle blue tint background.
