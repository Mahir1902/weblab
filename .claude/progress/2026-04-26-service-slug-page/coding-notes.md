# Coding Notes — Service Slug Dynamic Page

## Files Changed

### Created
- `src/app/services/[slug]/page.tsx` — New dynamic route for individual service pages.
  - Server Component (no 'use client')
  - `generateStaticParams` pre-renders all 6 service IDs
  - `generateMetadata` with `await params` (Next.js 16 Promise params pattern)
  - Page body with `await params` guard, `notFound()` for invalid slugs
  - 7 sections: back link, hero (badge + icon + h1 + long description), mid-page CTA, features grid, outcome callout, FAQ accordion, bottom BookingCTA

## Key Decisions & Deviations

### constants.ts vs constants.tsx collision
Both `src/lib/constants.ts` and `src/lib/constants.tsx` existed at task start. TypeScript with `moduleResolution: "bundler"` resolves bare `@/lib/constants` to the `.ts` extension first, which lacked `SERVICE_PAGE_DATA`. Two failed approaches:
1. Importing `@/lib/constants.tsx` explicitly — blocked by TypeScript (requires `allowImportingTsExtensions`)
2. ESLint auto-fixed my explicit extension import back to bare specifier

Resolution: By the time I ran the final build, `constants.ts` had been deleted by a previous linter/agent pass (git status shows it was already deleted in the working tree). With only `constants.tsx` present, `@/lib/constants` resolves correctly to `constants.tsx`. No action needed on my part.

### Icon rendering (ReactNode)
The `icon` field on `Service` is a ReactNode JSX element (e.g. `<Globe className="w-6 h-6" />`). To render it at a larger size (w-8 h-8) without re-instantiating the component (icons don't accept ref forwarding reliably), used a CSS override wrapper: `<span className="[&>svg]:w-8 [&>svg]:h-8">{service.icon}</span>`. This resizes the SVG via Tailwind arbitrary variant without modifying the original element.

### FaqAccordion prop shape
`FaqAccordion` accepts `items: FaqItem[]` where `FaqItem = { q: string; a: string }`. The `SERVICE_PAGE_DATA` faqs are already typed as `{ q: string; a: string }[]`, so they map directly.

### Pre-existing lint errors
`npm run lint` reports 33 problems (17 errors, 16 warnings) — all pre-existing in `.agents/`, `.claude/progress/` scripts, and `Navbar.tsx`. My file produces zero lint errors (verified with `npx eslint "src/app/services/[slug]/page.tsx"`).

## Self-Review Checklist
- [x] All design tokens from `globals.css @theme` only (no hardcoded hex)
- [x] No Framer Motion eases used (pure Server Component with AnimatedSection wrapper)
- [x] No `ssr: false` — Server Component, no dynamic imports
- [x] Booking URLs use `BOOKING_URL` from constants (env var backed)
- [x] All components fully TypeScript typed
- [x] No hardcoded colors, fonts, or spacing
- [x] `AnimatedSection` wraps every section for scroll reveals
- [x] Syne for h1/h2/h3 (applied via globals.css), Geist for body text
- [x] Semantic HTML: `<main>`, `<section>`, `<article>` used correctly
- [x] All interactive elements have focus-visible styles
- [x] `notFound()` called for invalid slugs

## Build & Lint Status
- `npm run build`: PASS — 0 errors, all 6 `/services/[slug]` routes pre-rendered as SSG
- `npm run lint` (file-specific): PASS — 0 errors in new file
- `npm run lint` (project-wide): 17 pre-existing errors, 16 warnings — none introduced by this task
