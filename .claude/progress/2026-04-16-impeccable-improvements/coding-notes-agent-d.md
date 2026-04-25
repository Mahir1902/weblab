---
agent: coding-agent-d
task: Replace inline primary CTA Link with CTAButton in AnimatedHero
date: 2026-04-16
---

## Files Changed

### `src/components/home/AnimatedHero.tsx`
- Added import: `import CTAButton from '@/components/ui/CTAButton'`
- Replaced the inline primary CTA `<Link href={BOOKING_URL} className="px-8 py-4 ...">Book a Free Strategy Call</Link>` with `<CTAButton href={BOOKING_URL}>Book a Free Strategy Call</CTAButton>`
- The `import Link from 'next/link'` was **kept** — `Link` is still used for the secondary "See What We Build" navigation link (href="/services"). Removing it would have caused a compile error.

## Decisions / Deviations

None. The task was straightforward. The secondary CTA was intentionally left as a raw `<Link>` because:
1. It is a navigation link, not a booking CTA.
2. The task spec only asked to replace the booking CTA with `<CTAButton>`.

## Build Status

- `npm run build` — PASSED. All 4 routes compiled as static. 0 TypeScript errors.
- `npm run lint` (via `node node_modules/eslint/bin/eslint.js src/`) — 0 errors, 2 pre-existing warnings in `SmartWebsiteFeatures.tsx` (unused imports, unrelated to this task). The `npm run lint` script itself fails with a broken `.bin/eslint` symlink — this is a pre-existing environment issue, confirmed by the fact that `node_modules/.bin/eslint` is a regular file rather than a proper symlink, and was already broken before this change.

## Follow-up Concerns

- The broken `npm run lint` script (node_modules/.bin/eslint returning MODULE_NOT_FOUND for package.json) should be fixed by running `npm install` or `node_modules/.bin/` cleanup. Not in scope for this task.
- The 2 pre-existing warnings in `SmartWebsiteFeatures.tsx` (`SectionHeader` and `FeatureCard` defined but never used) are lint debt that should be addressed in a follow-up.
