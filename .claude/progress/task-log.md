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
