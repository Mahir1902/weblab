# Task Log

Master index of all development tasks. Append-only — never overwrite existing entries.

---

## 2026-03-17 — Embed GHL contact form on contact page
**Status:** complete
**Folder:** .claude/progress/ (plan provided by user directly)
**Files changed:** `next.config.ts`, `src/app/contact/page.tsx`
**Build passed:** yes
**UI test result:** not run (no visual regression expected for CSP + iframe embed)
### Completed
- Added `https://brand.webl4b.com` to `script-src`, `frame-src`, `connect-src`, `form-action` CSP directives in `next.config.ts`
- Replaced `#ghl-form-embed` placeholder div + comment block with real GHL iframe (`TXCbBbnT8IHqUOPiJaHv`, 815px height)
- Added `next/script` import and `<Script src="https://brand.webl4b.com/js/form_embed.js" strategy="afterInteractive" />` to contact page
### Deferred / follow-up
- Calendar embed (`#ghl-calendar-embed`) still placeholder — needs GHL calendar embed code when ready
- Pre-existing raw hex color literals in contact page should eventually use CSS design tokens (flagged by quality review, out of scope here)
---

## 2026-04-11 — UI Test: Light/Dark Theme Switching
**Status:** complete
**Folder:** .claude/progress/2026-04-11-light-dark-theme/
**Files changed:** none (test-only run; `@playwright/test` installed as devDependency)
**Build passed:** yes (pre-existing)
**UI test result:** 4 failures (2 Critical, 1 Major, 1 Minor)
### Completed
- Tested all 4 pages (`/`, `/services`, `/about`, `/contact`) at 375px, 768px, 1440px in both dark and light themes
- Captured 30 screenshots across all page/breakpoint/theme combinations
- Verified ThemeToggle presence (desktop + mobile), default OS preference detection, toggle interaction, localStorage persistence, hydration (0 errors), focus ring, AnimatedSection reveals, no horizontal scroll
### Failures Found
- **Critical:** `AnimatedHero` is architecturally dark-only — `bg-[#0A0A0A]` on section + hardcoded canvas gradient `#0A0A0A → #0D0D16` + `text-[#F9FAFB]` h1 — hero section ignores light theme entirely
- **Critical:** 14 hardcoded hex values in `AnimatedHero.tsx` bypass design tokens and do not respond to theme switching
- **Major:** `#ghl-form-embed` placeholder ID absent — contact page right-hand form uses `id="inline-TXCbBbnT8IHqUOPiJaHv"` (live GHL iframe), not `#ghl-form-embed`
- **Minor:** `BOOKING_URL` resolves to empty string `""` rather than `#book-a-call` fallback — likely `NEXT_PUBLIC_BOOKING_URL=""` set in env
- **Pre-existing:** GHL iframe on `/contact` 403s + X-Frame-Options violation (2 console errors, not a theme regression)
### Deferred / follow-up
- Decide: keep hero always-dark-by-design (add explicit opt-out comment + force `.dark` scoping) OR build light-mode hero variant
- Fix `BOOKING_URL` empty string — check `.env.local` for `NEXT_PUBLIC_BOOKING_URL=""`
- Consider updating `#ghl-form-embed` documentation to reflect that live GHL iframe replaced the placeholder

---

## 2026-03-17 — Replace hero background: canvas glowy waves
**Status:** complete
**Files changed:** `src/components/home/AnimatedHero.tsx`, `src/app/globals.css`
**Build passed:** yes
**UI test result:** not run
### Completed
- Removed orb CSS keyframes and utility classes from `globals.css`
- Replaced static + orb background in `AnimatedHero.tsx` with `WaveCanvas` component: interactive canvas wave animation (5 waves, electric-blue/indigo palette, mouse-reactive, `prefers-reduced-motion` safe)
- Kept all WebLab content (headline, typewriter, CTAs, social proof) unchanged
- Fixed Framer Motion ease strings → cubic-bezier arrays throughout
### Deferred / follow-up
- ESLint binary broken (`Cannot find module '../package.json'`) — pre-existing, `npm install` should fix it
---
