# Contact Page Form Redesign

**Date:** 2026-04-18
**Status:** Approved

## Summary

Replace the GoHighLevel (GHL) iframe form and calendar booking placeholder on the contact page with a custom-coded React Hook Form + Zod contact form that submits to a GHL webhook. The form respects light/dark theme via design tokens, solving the problem of the GHL iframe's fixed background color.

## What's Changing

### Removals
- **Calendar booking section** — the entire "Book a Free Strategy Call" card with `#ghl-calendar-embed` placeholder, dashed border box, and "Book a Free Call" CTA link
- **GHL iframe form** — `<iframe src="https://brand.webl4b.com/widget/form/TXCbBbnT8IHqUOPiJaHv" />` and associated data attributes
- **GHL form embed script** — `<Script src="https://brand.webl4b.com/js/form_embed.js" />` and the `next/script` import
- **Unused imports** — `BOOKING_URL` and `Script` from the contact page (both no longer needed)

### Additions
- **Custom `ContactForm` client component** at `src/components/contact/ContactForm.tsx`
- **3 new info cards** on the left column (Response Time, Business Hours, Connect With Us)
- **New env var** `NEXT_PUBLIC_GHL_WEBHOOK_URL` in `.env.local`
- **New constant** `GHL_WEBHOOK_URL` exported from `src/lib/constants.tsx`
- **New dependencies** — `react-hook-form`, `zod`, `@hookform/resolvers`

### Not Changing
- CSP allowlist in `next.config.ts` — `brand.webl4b.com` stays because the chatbot widget in the layout still uses GHL
- Contact Details card — stays identical
- Hero section — minor copy tweak only
- All other pages — untouched

## Page Structure

### Hero
Same as current. Only copy change:
- Subtitle becomes: "Fill out the form below and we'll get back to you within 24 hours."
- Remove "Book a call or" language

### Metadata
- Title: `"Contact WebLab Sydney — Get in Touch"` (was "Book a Free Strategy Call")
- Description: updated to remove calendar/booking language
- OpenGraph title: `"Contact WebLab | Get in Touch"`

### Two-Column Layout

**Left column** — 4 stacked cards inside `AnimatedSection`:

1. **Contact Details** (existing) — email, phone, location from `SITE_CONFIG`
2. **Response Time** (new) — clock icon, "We typically respond within 24 hours"
3. **Business Hours** (new) — "Mon–Fri: 8am–6pm AEST" / "Sat–Sun: By appointment"
4. **Connect With Us** (new) — social icon links (Instagram, LinkedIn, Facebook) pulling from `SITE_CONFIG.socials`, currently `#` placeholders

**Right column** — `ContactForm` client component inside `AnimatedSection` with `delay={0.1}`

All cards use identical styling: `rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8`

On mobile (`< lg`), columns stack vertically: info cards first, form below.

## ContactForm Component

**File:** `src/components/contact/ContactForm.tsx`
**Directive:** `'use client'`
**Dependencies:** `react-hook-form`, `zod`, `@hookform/resolvers/zod`

### Fields

| Field | HTML type | Zod validation | Required |
|---|---|---|---|
| First name | `<input type="text">` | `z.string().min(2).max(50)` | Yes |
| Last name | `<input type="text">` | `z.string().min(2).max(50)` | Yes |
| Phone | `<input type="tel">` | Custom regex: starts with `04`, `02`, `03`, `07`, `08`, or `+61`; 8-10 digits after stripping spaces/dashes/parens | Yes |
| Email | `<input type="email">` | `z.string().email()` | Yes |
| Message | `<textarea rows={4}>` | `z.string().max(1000).optional()` | No |

### Field Layout
- First name + Last name: same row, two equal columns
- Phone: full width
- Email: full width
- Message: full width, 4 rows
- Submit button: full width

### Styling
All inputs use design tokens so they adapt to light/dark theme:
- Input background: `var(--color-surface-2)`
- Input border: `var(--color-border)`
- Input text: `var(--color-text-primary)`
- Placeholder text: `var(--color-text-dim)`
- Focus ring: `var(--color-accent)` (2px outline, matches global `:focus-visible`)
- Error text: `var(--color-danger)`
- Labels: `var(--color-text-secondary)`, small, above each input

### Validation UX
- Errors appear below each field on blur or on submit attempt
- Error text uses `--color-danger` token
- Phone field shows helper text below: "e.g. 0412 345 678 or +61 412 345 678"

### Form States

**Idle** — normal interactive form

**Submitting** — submit button shows a spinner + "Sending..." text; all inputs disabled

**Success** — form container fades out and is replaced with a success card:
- Green checkmark icon (using `--color-success` token)
- Heading: "Message Sent!"
- Body: "Thanks! We'll be in touch within 24 hours."
- Email fallback: "Or email us directly at solutions.webl4b@gmail.com"

**Error** — inline error message above the submit button:
- "Something went wrong. Please try again or email us directly at solutions.webl4b@gmail.com"
- Form remains interactive so user can retry

### Webhook Submission
- Method: `POST`
- URL: `process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL` (from `GHL_WEBHOOK_URL` constant)
- Content-Type: `application/json`
- Body: `{ firstName, lastName, phone, email, message }`
- On 2xx response: show success state
- On non-2xx or network error: show error state

## Environment Variable

**`.env.local`:**
```
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/kNppaQsBHBgJcdZhPu6H/webhook-trigger/34d1ba1d-7fab-4dab-a9f8-fd223e10fe71
```

**`src/lib/constants.tsx`:**
```ts
export const GHL_WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL ?? '';
```

## Accessibility
- All inputs have associated `<label>` elements (not just placeholder text)
- Error messages linked to inputs via `aria-describedby`
- Submit button disabled state uses `aria-disabled`
- Focus ring via global `:focus-visible` styles
- Form uses `<form>` element with `noValidate` (validation handled by Zod, not browser)
- Success/error announcements use `aria-live="polite"` region

## Animation
- Form container uses `AnimatedSection` for scroll-reveal (consistent with rest of site)
- Success state transition: simple fade using Framer Motion `AnimatePresence` + `motion.div`
- All eases use cubic-bezier arrays per project convention: `[0.25, 0.46, 0.45, 0.94]`

## Files Modified
- `src/app/contact/page.tsx` — restructured layout, removed calendar + iframe, added new info cards, imports ContactForm
- `src/components/contact/ContactForm.tsx` — new client component
- `src/lib/constants.tsx` — add `GHL_WEBHOOK_URL` export
- `.env.local` — add `NEXT_PUBLIC_GHL_WEBHOOK_URL`
- `package.json` — add `react-hook-form`, `zod`, `@hookform/resolvers`
~