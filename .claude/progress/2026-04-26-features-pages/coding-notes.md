# Coding Notes — Features Pages

## Files Changed

### 1. `src/components/ui/ServiceCard.tsx`
Added optional `basePath` prop (defaults to `'/services'`). Changed `href` from hardcoded `/services/${service.id}` to `${basePath}/${service.id}`. All existing callers are unaffected since the default preserves the original behaviour.

### 2. `src/app/features/page.tsx` (new)
Created features overview page mirroring the services page structure exactly:
- Static metadata with title, description, keywords, openGraph
- Hero with badge "PLATFORM TOOLS", h1, subtext
- 3-column responsive grid using `FEATURES` from `@/lib/constants` with `basePath="/features"` passed to `ServiceCard`
- FAQ accordion with 3 feature-specific questions
- `BookingCTA` at bottom

### 3. `src/app/features/[slug]/page.tsx` (new)
Created individual feature detail page mirroring `src/app/services/[slug]/page.tsx` exactly:
- `generateStaticParams` maps `FEATURES` array — produces 5 static routes
- `generateMetadata` awaits `params` Promise (Next.js 16 pattern) and calls `createMetadata`
- `notFound()` called if slug or pageData not found
- Back link points to `/features` (not `/services`)
- Badge reads "WebLab Feature" (not "WebLab Service")
- Identical section layout: hero, mid-page CTA, features grid with numbered badges, outcome callout, FAQ, bottom BookingCTA
- Uses `FEATURE_PAGE_DATA` (same `ServicePageData` shape as `SERVICE_PAGE_DATA`)
- `BOOKING_URL` constant used for all booking links

## Deviations from Plan
None. All instructions followed exactly.

## Build & Lint Status
- `npm run build`: PASS — 19 static pages generated, including 5 new `/features/[slug]` routes
- `npm run lint` on `src/`: PASS — 0 errors, 0 warnings
- Pre-existing lint errors in `.agents/` and `.claude/progress/` directories are unrelated to this task and were present before these changes
