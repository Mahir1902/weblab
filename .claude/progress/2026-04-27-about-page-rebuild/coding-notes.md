# Coding Notes — About Page Rebuild (2026-04-27)

## Files Changed

- `src/app/about/page.tsx` — Full rewrite per design spec.

## Summary of Changes

### Section 1: Hero
- Pill badge, H1 with gradient span (inline style), subheading copy. Wrapped in `<AnimatedSection>`.

### Section 2: Our Story
- Two-column grid: story copy on left, `next/image` illustration on right.
- Image: `src="/images/tradie_illustration.png"` (underscore filename as specified).
- Wrapped entire grid in a single `<AnimatedSection>`.

### Section 3: How We Work
- 4-step cards in a `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4` grid.
- Each card in its own `<AnimatedSection delay={i * 0.07}>`.
- Number badge uses `--color-accent-dim` background and `--color-accent`/20 border.
- Card hover uses `.shadow-brutal-lg` (defined in `globals.css`).

### Section 4: FAQ
- `<FaqAccordion items={faqItems} />` with 6 items.
- Heading + accordion wrapped in a single `<AnimatedSection>`.

### Section 5: CTA
- `<BookingCTA>` wrapped in `<AnimatedSection>`.

### FAQPage JSON-LD
- `<script type="application/ld+json">` placed before first section using `dangerouslySetInnerHTML`.

## Apostrophe Handling

The spec required `&apos;` in JSX text content. However:
- In JS string literals (data arrays, prop values), `&apos;` is not interpreted as HTML — it renders literally.
- Solution: used Unicode curly apostrophe `\u2019` in all JS string data (`steps[]`, `faqItems[]`, BookingCTA prop strings).
- Used `&apos;` entity only in actual JSX text nodes where it is correctly interpreted by the JSX transformer.

## Removed Imports

- `lucide-react` (Zap, Target, MapPin, RefreshCw) — no longer needed as per spec.
- Old data arrays (`whoWeWorkWith`, `whyWebLab`) — replaced by `steps` and `faqItems`.

## Deviations from Plan

None. Followed spec exactly.

## Known Pre-existing Lint Issues

`npm run lint` reports 16 errors in `.agents/skills/` and `.claude/progress/` directories. These are pre-existing and unrelated to this task. Zero lint errors introduced in `src/`.

## Build Status

`npm run build` — PASSED (0 errors, 19 static pages generated, `/about` is static).

## Lint Status

`src/` files — 0 errors, 0 warnings introduced by this task.
Pre-existing errors in `.agents/` and `.claude/progress/` — 16 errors (not introduced here).
