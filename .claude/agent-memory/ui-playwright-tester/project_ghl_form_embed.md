---
name: Contact page now uses custom React form — no GHL iframe
description: As of 2026-05-09, contact page uses ContactForm component (React Hook Form + Zod) instead of GHL iframe; chatbot widget id is "chatbot-widget"
type: project
---

`src/app/contact/page.tsx` was fully rebuilt (commit 3f46ac2) to use a custom `ContactForm` component (React Hook Form + Zod validation) instead of the GHL iframe embed. The GHL calendar and form placeholders (`#ghl-calendar-embed`, `#ghl-form-embed`) are no longer present.

The contact form fields are: First Name, Last Name, Phone, Email, Message (optional). Submit button text is "SEND IT". Form submits to `NEXT_PUBLIC_GHL_WEBHOOK_URL` via fetch.

The `ChatbotPlaceholder` component renders `<div id="chatbot-widget" aria-hidden="true">` — NOT `id="chatbot-placeholder"`. When testing for chatbot presence, query `document.getElementById('chatbot-widget')`.

**Why:** GHL iframe embeds caused CSP violations and X-Frame-Options blocks in headless browsers. The custom form avoids iframe issues and gives full control over styling and validation.

**How to apply:** CLAUDE.md checklist items for `#ghl-calendar-embed` and `#ghl-form-embed` are now N/A. Instead verify: ContactForm renders, "SEND IT" button present, chatbot-widget div present. Do not expect any GHL iframes on /contact.
