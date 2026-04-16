---
name: BOOKING_URL resolves to empty string instead of #book-a-call fallback
description: All booking CTAs link to empty string href because NEXT_PUBLIC_BOOKING_URL is set to "" in env rather than being undefined
type: project
---

`src/lib/constants.ts` line 84: `export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call';`

The `??` operator only falls back on `null` or `undefined`. If `.env.local` contains `NEXT_PUBLIC_BOOKING_URL=""`, the fallback is bypassed and an empty string is used as the href.

Observed: all "Book a Call" / "Book a Free Strategy Call" links have `href=""`, navigating to the current page. Only the contact page calendar-embed fallback (which uses `BOOKING_URL` inside the placeholder div) shows `href="#book-a-call"` — but this is only because it also went through the same `BOOKING_URL` constant.

**Why:** Likely `NEXT_PUBLIC_BOOKING_URL` was temporarily set to empty string while GHL booking link is being configured.

**How to apply:** Before any UI test involving booking CTAs, check `process.env.NEXT_PUBLIC_BOOKING_URL` value. If empty string, the issue is env config, not code. Fix: either set a real booking URL or delete the var from `.env.local` to let the `??` fallback kick in.
