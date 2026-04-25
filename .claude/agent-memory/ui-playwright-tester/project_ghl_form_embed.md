---
name: GHL form and calendar embeds replaced with custom React Hook Form
description: As of commit 3f46ac2 (2026-04-18), contact page uses a custom form — no GHL iframe or placeholder IDs exist
type: project
---

Commit `3f46ac2`: `feat(contact): replace GHL iframe with custom React Hook Form + Zod contact form`

The contact page (`src/app/contact/page.tsx`) now has a native `<form>` with fields: `firstName`, `lastName`, `phone`, `email`, `message` + submit button. The form submits to `GHL_WEBHOOK_URL` (env var `NEXT_PUBLIC_GHL_WEBHOOK_URL`).

There is no longer a `#ghl-form-embed`, `#ghl-calendar-embed`, or any GHL iframe on the contact page.

**Why:** Custom React Hook Form + Zod was built to avoid GHL iframe CSP/X-Frame-Options issues and give more control over styling and validation. Prior to this commit, a live GHL iframe with `id="inline-TXCbBbnT8IHqUOPiJaHv"` was used.

**How to apply:** When testing the contact page, do NOT look for `#ghl-form-embed`, `#ghl-calendar-embed`, or any GHL iframe — they are gone. Look for a native `<form>` with fields: firstName, lastName, phone, email, message. The CLAUDE.md checklist items for GHL placeholders are now stale and should be treated as N/A.
