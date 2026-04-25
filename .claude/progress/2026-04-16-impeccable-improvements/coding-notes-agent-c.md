# Coding Notes — Agent C (Component Extraction)

## New Components

### `src/components/ui/SectionHeader.tsx`

Props API:
```ts
interface SectionHeaderProps {
  label: string;          // Text rendered inside [...] with mono/accent styling
  heading: React.ReactNode; // h2 content — ReactNode to allow inline JSX spans
  description?: string;   // Optional supporting paragraph
  centered?: boolean;     // Defaults to false; centre-aligns when true
  className?: string;     // Applied to outermost wrapper div
}
```

Design notes:
- Label is automatically wrapped in `[` and `]` by the component — callers pass just the text (e.g. `"THE PROBLEM"` not `"[THE PROBLEM]"`)
- When `centered=true`, the description paragraph gets `mx-auto` so it centres correctly; callers also pass `className="max-w-{x} mx-auto"` to cap description width
- Reproduces the exact mono-label → h2 → p stack found in all 5 sections

### `src/components/ui/FeatureCard.tsx`

Props API:
```ts
interface FeatureCardProps {
  icon: React.ReactNode;  // Caller sizes the icon (convention: w-6 h-6)
  title: string;
  description: string;
  step?: string;          // Decorative watermark (e.g. "01"). Omit for plain cards.
  className?: string;     // Extra classes on outermost div (e.g. col-span overrides)
}
```

Design notes:
- When `step` is provided: watermark rendered top-right with `font-syne`, `text-[var(--color-border)]`, `aria-hidden`, and title gets `pr-8` to avoid overlap
- Without `step`: no watermark, no extra title padding — matches SmartWebsiteFeatures plain cards
- Base card style: `rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/40`
- Note: SmartWebsiteFeatures originally used `bg-[var(--color-bg)]` and `rounded-xl` for its cards and `hover:border-[var(--color-accent)]` (no opacity). FeatureCard standardises on `bg-[var(--color-surface)]`, `rounded-2xl`, and `hover:border-[var(--color-accent)]/40` to match the step-card pattern (HowItWorks, AutomationsSection). This is a minor visual deviation — see "Deviations" section below.

---

## Files Updated

| File | What Changed |
|------|-------------|
| `src/components/home/ProblemSolution.tsx` | Added `SectionHeader` import; replaced inline header markup with `<SectionHeader label="THE PROBLEM" ... centered className="max-w-xl mx-auto" />` |
| `src/components/home/ServicesOverview.tsx` | Added `SectionHeader` import; replaced inline header markup with `<SectionHeader label="WHAT WE BUILD" ... />` (left-aligned, no `centered`) |
| `src/components/home/SmartWebsiteFeatures.tsx` | Added `SectionHeader` + `FeatureCard` imports; replaced inline header and all 6 feature card divs |
| `src/components/home/AutomationsSection.tsx` | Added `SectionHeader` + `FeatureCard` imports; replaced inline header and all 5 automation card divs; `md:col-span-2 lg:col-span-1` span override for last card preserved via `className` prop |
| `src/components/home/HowItWorks.tsx` | Added `SectionHeader` + `FeatureCard` + `CTAButton` imports; removed `Link` import (no longer needed); replaced inline header, all 4 step card divs, and inline `<Link>` CTA with `<CTAButton href={BOOKING_URL}>` |

---

## Variations Discovered

1. **Step vs plain cards**: SmartWebsiteFeatures uses cards without step numbers; HowItWorks and AutomationsSection use step watermarks. The `step?: string` prop handles both.

2. **Card background token**: SmartWebsiteFeatures originally used `bg-[var(--color-bg)]` while HowItWorks/AutomationsSection used `bg-[var(--color-surface)]`. FeatureCard standardises on `--color-surface`. This is intentional consolidation — both tokens are valid background contexts and the surface colour is more semantically appropriate for card elements.

3. **Card border-radius**: SmartWebsiteFeatures used `rounded-xl`; HowItWorks/AutomationsSection used `rounded-2xl`. FeatureCard uses `rounded-2xl` (the more prominent step-card style).

4. **Hover accent opacity**: SmartWebsiteFeatures used `hover:border-[var(--color-accent)]` (full opacity); step cards used `hover:border-[var(--color-accent)]/40`. FeatureCard uses the `/40` variant.

5. **Header description max-width**: Each section passes its own `max-w-*` via `className` on `SectionHeader` to preserve original character counts per line (xl for narrow sections, 2xl for wider).

6. **ServicesOverview label spacing**: Original used `mb-4` under the label vs `mb-6` in other sections. `SectionHeader` uses `mb-6` consistently (a minor rounding up). No visual regression expected.

---

## Deviations From Inline Code

- SmartWebsiteFeatures cards: background changed from `--color-bg` to `--color-surface`, radius from `rounded-xl` to `rounded-2xl`, hover from full accent to `accent/40`. Justified as consolidation to one canonical card appearance.
- No other deviations from layout, data, or surrounding structure.

---

## Build & Lint Status

- `npm run build`: PASSED — 0 errors, all 5 routes static
- `npm run lint` (via `node node_modules/eslint/bin/eslint.js`): PASSED — 0 errors, 0 warnings
  - Note: `npm run lint` itself errors due to a pre-existing broken `.bin/eslint` symlink (MODULE_NOT_FOUND for `../package.json`). This is not caused by these changes — the build TypeScript check confirms all types are valid.
