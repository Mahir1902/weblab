---
name: BOOKING_URL resolves to empty string in rendered CTAButton href
description: All booking CTAs have href="" in the DOM even when NEXT_PUBLIC_BOOKING_URL=#book-a-call in .env.local
type: project
---

`src/lib/constants.tsx` line 85: `export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '#book-a-call';`

As of 2026-04-18: `.env.local` contains `NEXT_PUBLIC_BOOKING_URL=#book-a-call`. Despite this, all CTA buttons rendered by `CTAButton` component have `href=""` in the DOM. The footer `<a href="#book-a-call">` resolves correctly.

Root cause hypothesis: Next.js `<Link href="#book-a-call">` may treat a hash-only href as same-page navigation and strip the hash in some rendering contexts, or `NEXT_PUBLIC_BOOKING_URL` is not being read at build/dev time due to how the dev server started (the var may have been set after the server was launched).

**Why:** `CTAButton` wraps `<Link href={href}>` from Next.js. Hash-only hrefs (`#book-a-call`) may need to use a plain `<a>` tag instead of `<Link>` to work reliably, OR the `NEXT_PUBLIC_BOOKING_URL` env var is not being picked up.

**How to apply:** When testing CTAs, check the actual resolved href attribute (not just the `href` prop). Use `a.getAttribute('href')` not `a.href` (which resolves relative to page). If `getAttribute('href')` returns `""`, it is a rendering issue, not a detection issue. Suggest plain `<a>` tag for hash-only booking links.
