---
name: constants file consolidation
description: constants.ts was deleted — only constants.tsx remains; bare @/lib/constants import resolves correctly to .tsx
type: project
---

`src/lib/constants.ts` has been deleted. Only `src/lib/constants.tsx` exists. All imports using bare specifier `@/lib/constants` now resolve to `constants.tsx` which contains:
- Lucide-react icon-based SERVICES array (icons are ReactNode JSX elements)
- SERVICE_PAGE_DATA (all 6 service slug page data)
- WAVE_COLORS and ANIMATION constants
- Updated SITE_CONFIG (webl4b.com domain)

**Why:** Originally two files existed (.ts and .tsx). TypeScript `moduleResolution: "bundler"` preferred .ts over .tsx causing SERVICE_PAGE_DATA to be unreachable via the bare import path. The .ts file was removed (likely by a previous agent pass).

**How to apply:** Always import from `@/lib/constants` (no extension). Do not attempt to import from `@/lib/constants.tsx` explicitly — TypeScript will reject it without `allowImportingTsExtensions`. Do not recreate `constants.ts` as it would shadow `constants.tsx` again.
