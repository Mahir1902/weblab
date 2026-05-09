---
name: BOOKING_URL now hardcoded to /contact as fallback
description: All booking CTAs resolved to /contact after 2026-05-09 fix; BOOKING_URL fallback changed from #book-a-call to /contact
type: project
---

`src/lib/constants.tsx` (as of 2026-05-09): `export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '/contact';`

The fallback was changed from `'#book-a-call'` to `'/contact'`. All booking CTA links across the site (Navbar desktop, Navbar mobile, Hero, HowItWorks, BookingCTA component, Footer) now route to `/contact` when `NEXT_PUBLIC_BOOKING_URL` is not set.

Verified via Playwright on 2026-05-09: all 7 CTA link surfaces (navbar desktop, navbar mobile, hero, bottom homepage CTA, footer, service slug mid-page, feature slug mid-page) all have `href="/contact"` and clicking them navigates to `/contact`.

**Why:** GHL booking URL was never configured. `/contact` is now the permanent fallback destination to avoid broken anchor links.

**How to apply:** When testing booking CTAs, expect `href="/contact"` — not `href="#book-a-call"` and not an empty string. If NEXT_PUBLIC_BOOKING_URL is set to a real GHL URL in production, that will take precedence.
