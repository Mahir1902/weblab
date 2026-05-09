# Coding Notes — Neo-Brutalist Homepage Restyling

## Files Changed

### `src/components/home/SmartWebsiteFeatures.tsx`
- Section: `border-t border-[var(--color-border)]` → `border-y-2 border-[var(--color-foreground)]`
- Label span: replaced flat mono text with pill badge pattern; removed brackets; copy changed to `YOUR WEBSITE, BUT SMARTER`
- Heading: `font-bold` → `font-black`; copy changed to `Not Just a Website. A Lead Machine.`
- Description: updated to hardest-working employee copy; escaped apostrophe with `&apos;`
- Feature cards: `rounded-xl border border-[var(--color-border)] bg-[var(--color-bg)]` → `rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-background)] shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg`
- Icon boxes: `w-12 h-12` → `w-14 h-14`, added `border-2 border-[var(--color-accent)]/20`
- Card titles: `font-semibold` → `font-black`

### `src/components/home/ProblemSolution.tsx`
- Section: `bg-[var(--color-bg)] border-t border-[var(--color-border)]` → `bg-[var(--color-background)] border-y-2 border-[var(--color-foreground)]`
- Label: pill badge; removed brackets; copy changed to `THE PROBLEM`
- Heading: `font-bold` → `font-black`; copy changed to `Bet This Sounds Familiar`
- Pain column: `border border-[var(--color-danger)]/20` → `border-2 border-[var(--color-danger)] shadow-brutal`
- Solution column: `border border-[var(--color-accent)]/30` → `border-2 border-[var(--color-accent)] shadow-brutal-accent`
- Column headings: `font-semibold` → `font-black`
- Stat cards: `rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)]` → `rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-background)] shadow-brutal`
- Stat values: `font-bold` → `font-black`

### `src/components/home/ServicesOverview.tsx`
- Section: `border-y border-[var(--color-border)]` → `border-y-2 border-[var(--color-foreground)]`
- Label: pill badge; removed brackets; copy changed to `THE STUFF WE BUILD`
- Heading: `font-bold` → `font-black`
- Description: updated to no-fluff copy
- "See all" link: added pill style with `border-2 border-[var(--color-accent)]/30 rounded-full px-4 py-1.5 bg-[var(--color-accent-dim)]` and `font-black`

### `src/components/home/AutomationsSection.tsx`
- Section: `bg-[var(--color-bg)] border-t border-[var(--color-border)]` → `bg-[var(--color-background)] border-y-2 border-[var(--color-foreground)]`
- Label: pill badge; removed brackets; copy changed to `AI AUTOMATIONS`
- Heading: `font-bold` → `font-black`; copy changed to `Like Hiring a Sales Team (But Way Cheaper)`
- Description: updated; escaped apostrophe with `&apos;`
- Cards: `border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40` → `border-2 border-[var(--color-foreground)] bg-[var(--color-background)] shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg`
- Step numbers: `text-[var(--color-border)] font-bold text-3xl` → `text-[var(--color-foreground)]/10 font-black text-4xl`
- Icon boxes: `w-12 h-12` → `w-14 h-14`, added `border-2 border-[var(--color-accent)]/20`
- Card titles: `font-semibold` → `font-black`

### `src/components/home/HowItWorks.tsx`
- Section: `bg-[var(--color-bg)] border-t border-[var(--color-border)]` → `bg-[var(--color-background)] border-y-2 border-[var(--color-foreground)]`
- Label: pill badge; removed brackets; copy changed to `HOW IT ACTUALLY WORKS`
- Heading: `font-bold` → `font-black`; copy changed to `From Google Search to Booked Job`
- Cards: `border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/40` → `border-2 border-[var(--color-foreground)] bg-[var(--color-background)] shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg`
- Step numbers: same treatment as AutomationsSection
- Icon boxes: `w-12 h-12` → `w-14 h-14`, added `border-2 border-[var(--color-accent)]/20`
- Card titles: `font-semibold` → `font-black`
- Bottom CTA button: `font-semibold hover:bg-[var(--color-accent-hover)] hover:scale-105` → `font-black border-2 border-[var(--color-foreground)] shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none`

### `src/app/page.tsx`
- BookingCTA `headline` prop: `"Ready to Stop Losing Leads?"` → `"Ready to Stop Leaving Money on the Table?"`
- BookingCTA `subtext` prop: updated to Sydney service businesses copy

## Deviations from Plan
- Used `bg-[var(--color-background)]` instead of `bg-white` for card backgrounds — `--color-background` maps to `#FFFFFF` per the `@theme` block, so this is semantically correct and respects the design token constraint (never hardcode hex values).
- `border-y-2` is used on sections that previously only had `border-t` — this applies the border to both top and bottom as instructed. For ServicesOverview which already had `border-y`, this was upgraded to `border-y-2`.

## Build & Lint Status
- `npm run build`: PASSED (0 errors, all 4 routes static)
- `npm run lint` on modified files: PASSED (0 errors, 0 warnings)
- Pre-existing lint errors in `.agents/skills/brainstorming/scripts/server.cjs` and `.agents/skills/impeccable/scripts/cleanup-deprecated.mjs` are unrelated to this task and were present before these changes

---

# Coding Notes — AnimatedHero Marquee Removal + IndustryBar Component

## Files Changed

### `src/components/home/AnimatedHero.tsx`
- Removed `INDUSTRIES` from the `@/lib/constants` import (no longer used here).
- Deleted the `{/* Industry marquee */}` block (~28 lines) that was absolutely positioned at the bottom of the section. This included the scrolling `marquee-track` div, the two fade-gradient overlays, and the `sr-only` accessibility paragraph.

### `src/components/home/IndustryBar.tsx` (NEW)
- Created a new Server Component (no `'use client'` directive needed — purely presentational).
- Defines 7 inline stroke-based SVG icon components (WrenchIcon, ZapIcon, WindIcon, LeafIcon, HomeIcon, SparklesIcon, BrushIcon) — 24×24, `currentColor`, `aria-hidden="true"`.
- `FEATURED_INDUSTRIES` array pairs each industry name with its icon.
- Renders a `<section>` with `border-y border-[var(--color-border-subtle)]` and `bg-[var(--color-surface)]`, matching the project's design token conventions.
- Heading: `text-[var(--color-accent)]`, `uppercase`, `tracking-[0.2em]`, `font-black`.
- Industry list: `flex flex-wrap` with `gap-x-8 sm:gap-x-12`, each item an `inline-flex` with the icon in accent color and the label in `text-[var(--color-text-muted)]`.

### `src/app/page.tsx`
- Added `import IndustryBar from '@/components/home/IndustryBar'`.
- Added `<IndustryBar />` directly after `<HeroWrapper />` (before the first `<AnimatedSection>`). No `AnimatedSection` wrapper needed — the bar is a static, instantly-visible element that shouldn't be hidden then revealed on scroll.

## Deviations from Plan
- Used `border-[var(--color-border-subtle)]` instead of the generic `border-[var(--color-border)]` specified in the task prompt. `--color-border` is `#1A1A1A` (the hard black neo-brutalist border used for interactive card outlines), while `--color-border-subtle` is `#D4CFC9` (a soft warm grey). The subtle token is far more appropriate for a passive divider line — using the hard border would create a visually jarring double-thick black rule between the hero and the industry bar.

## Build & Lint Status
- `npm run build`: PASSED (0 errors, all 5 routes static)
- `npm run lint` (src/ files only): PASSED (0 errors, 0 warnings)
- Pre-existing global lint errors remain in `.agents/` skill scripts and `.claude/progress/` test spec files — unrelated to this task.

---

# Coding Notes — AnimatedHero Typewriter Removal + Industry Marquee

## Files Changed

### `src/components/home/AnimatedHero.tsx`
- Removed `useState` from the React import (was only used by `TypewriterText`). Kept `useEffect` (still used by `WaveCanvas`) and `useRef`.
- Added `INDUSTRIES` to the import from `@/lib/constants`.
- Deleted the `PHRASES` constant array (8 trade industry strings).
- Deleted the `TypewriterText` function component (36 lines of typewriter state + interval logic).
- Removed the `<motion.div variants={item}><TypewriterText /></motion.div>` JSX block from the hero content.
- Added an absolutely-positioned industry marquee at the bottom of the `<section>`, using the existing `.marquee-track` CSS class from `globals.css`. Includes left/right fade gradients for polish and an `sr-only` paragraph for screen reader accessibility.

## Deviations from Plan
- The plan stated "remove `useState` and `useEffect`" since only TypewriterText used them. However, `WaveCanvas` at line 51 also uses `useEffect` for the canvas animation loop — this would have broken the build. `useEffect` was retained; only `useState` was removed.

## Build & Lint Status
- `npm run build`: PASSED (0 errors, all 4 routes static)
- `npm run lint` (src/components/home/AnimatedHero.tsx): PASSED (0 errors, 0 warnings)
- Global lint run shows 7 pre-existing errors in `.agents/skills/` and `.claude/progress/` test spec files — none in `src/`.
