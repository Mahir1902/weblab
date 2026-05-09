# Coding Notes — Booking URL Fix + Remove "The Result" Section

**Date:** 2026-05-09
**Task slug:** booking-url-fix-remove-result

---

## Files Changed

### `.env.local`
Updated `NEXT_PUBLIC_BOOKING_URL` from `#book-a-call` to `/contact`.

### `src/lib/constants.tsx`
Updated fallback in `BOOKING_URL` constant from `'#book-a-call'` to `'/contact'`.

### `src/lib/constants.ts` — DELETED
This file was a partial duplicate/stub of `constants.tsx`. Deleting it was required to fix a pre-existing build failure: TypeScript's bundler module resolution prioritizes `.ts` over `.tsx`, so `@/lib/constants` was resolving to the stub, which lacked `FEATURES`, `FEATURE_PAGE_DATA`, `ANIMATION`, `SERVICE_PAGE_DATA`, `GHL_WEBHOOK_URL`, and `WAVE_COLORS` that many components need. With the stub deleted, all imports now resolve correctly to `constants.tsx`.

### `src/components/layout/Footer.tsx`
- Added `BOOKING_URL` to the import from `@/lib/constants`.
- Replaced hardcoded `href="#book-a-call"` with `href={BOOKING_URL}` on the "Book a Free Call" nav link.

### `src/app/services/[slug]/page.tsx`
Deleted the entire "Outcome callout" / "The Result" section (lines 160–174 in the pre-edit file).

### `src/app/features/[slug]/page.tsx`
Deleted the identical "Outcome callout" / "The Result" section (lines 160–174 in the pre-edit file, referencing `feature.outcome`).

---

## Deviations from Plan

The plan did not anticipate that deleting `constants.ts` would be necessary. However, `constants.ts` was the root cause of pre-existing build failures (`FEATURES`, `ANIMATION`, etc. not found). Deleting it unblocked the build without any functional regression — all data now comes from `constants.tsx`, which is the canonical, complete source.

Attempted re-exporting from within `constants.ts` first, but TypeScript's `allowImportingTsExtensions` is not enabled, so cross-file re-exports with `.tsx` extension in the path are disallowed.

---

## Follow-up Concerns

- The memory note `project_constants_file.md` states "constants.ts deleted; only constants.tsx remains — always use bare @/lib/constants import." This is now definitively true. The memory should be verified to match this state.
- The `.bin/eslint` symlink in `node_modules` is broken (pre-existing). `npm run lint` fails with "Cannot find module '../package.json'". Lint was verified clean by running `node_modules/eslint/bin/eslint.js src/` directly. A `npm install` or `npm ci` would likely repair the symlink.

---

## Build and Lint Status

- `npm run build`: PASS (0 errors, 19 static pages generated)
- `npm run lint` (via direct eslint binary): PASS (0 errors, 0 warnings)
- `npm run lint` (via `.bin/eslint` symlink): BROKEN pre-existing — unrelated to this task
