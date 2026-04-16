---
name: GHL form embed uses different ID than documented placeholder
description: The contact page live GHL iframe uses id="inline-TXCbBbnT8IHqUOPiJaHv" not the documented #ghl-form-embed placeholder ID
type: project
---

`src/app/contact/page.tsx` replaced the `#ghl-form-embed` placeholder div (documented in CLAUDE.md checklist) with a live GHL `<iframe>` using `id="inline-TXCbBbnT8IHqUOPiJaHv"`. This happened in the 2026-03-17 GHL embed task.

The CLAUDE.md checklist states: "GHL form embed placeholder (#ghl-form-embed) present on /contact" — this check will always fail because the live iframe has a different ID.

**Why:** GHL's embed script generates a specific `id` matching the form ID. The original placeholder div has been fully replaced.

**How to apply:** When running the standard CLAUDE.md checklist, mark `#ghl-form-embed` check as N/A (replaced by live embed) and instead verify `#inline-TXCbBbnT8IHqUOPiJaHv` iframe exists. Also note: the GHL iframe 403s in headless test browsers due to `X-Frame-Options: sameorigin` on `brand.webl4b.com` — this is expected in CI/test environments and not a bug.
