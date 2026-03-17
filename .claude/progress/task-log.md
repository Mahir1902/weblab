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
