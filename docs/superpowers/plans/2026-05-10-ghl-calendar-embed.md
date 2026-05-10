# GHL Calendar Embed Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Embed the GoHighLevel calendar widget on the `/contact` page above the existing contact form, so customers can book a strategy call with availability synced from GHL.

**Architecture:** Create a `CalendarEmbed` client component (mirrors the existing `ChatbotPlaceholder` pattern: `'use client'` + `next/script`). Restructure the `/contact` page into two clear sections: "Book a Free Strategy Call" (calendar) on top, "Or Send Us a Message" (existing form) below. Update the site-wide `BOOKING_URL` fallback to anchor-link directly to the calendar section.

**Tech Stack:** Next.js 16 App Router, `next/script`, Tailwind CSS v4 design tokens, existing neo-brutalist component patterns.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `src/components/contact/CalendarEmbed.tsx` | **Create** | Client component that renders the GHL iframe + loads `form_embed.js` via `next/script`. Includes pulse skeleton loading state. |
| `src/app/contact/page.tsx` | **Modify** | Restructure into two sections: calendar (with `id="book-a-call"`) above, contact form below. Update hero copy. |
| `src/lib/constants.tsx` | **Modify (line 634)** | Change `BOOKING_URL` fallback from `'/contact'` to `'/contact#book-a-call'`. |
| `next.config.ts` | **Modify (line 21)** | Add `https://brand.webl4b.com` to `style-src` directive. |

---

### Task 1: Add `brand.webl4b.com` to CSP `style-src`

**Files:**
- Modify: `next.config.ts:21`

The CSP already allowlists `brand.webl4b.com` in `script-src`, `frame-src`, `connect-src`, and `form-action`. But `style-src` is missing it. The GHL embed may inject inline styles from this domain.

- [ ] **Step 1: Add domain to style-src**

In `next.config.ts` line 21, change:

```typescript
"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.leadconnectorhq.com",
```

to:

```typescript
"style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.leadconnectorhq.com https://brand.webl4b.com",
```

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds, all 4 routes static.

- [ ] **Step 3: Commit**

```bash
git add next.config.ts
git commit -m "chore: add brand.webl4b.com to CSP style-src for calendar embed"
```

---

### Task 2: Create `CalendarEmbed` client component

**Files:**
- Create: `src/components/contact/CalendarEmbed.tsx`

This follows the exact same pattern as `ChatbotPlaceholder.tsx`: a `'use client'` component that uses `next/script` to load a third-party script alongside the embed markup.

- [ ] **Step 1: Create the component**

Create `src/components/contact/CalendarEmbed.tsx` with the following content:

```tsx
'use client';

import { useState } from 'react';
import Script from 'next/script';

/**
 * GHL Calendar Embed
 *
 * Renders the GoHighLevel booking calendar inside an iframe.
 * Uses next/script to load form_embed.js which auto-resizes the iframe.
 * Shows a pulse skeleton while the iframe loads.
 */
export default function CalendarEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-[600px]">
      {/* Skeleton loader — visible until iframe fires onLoad */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-foreground)]">
          <div className="w-10 h-10 rounded-full border-3 border-[var(--color-accent)]/30 border-t-[var(--color-accent)] animate-spin" />
          <p className="text-sm text-[var(--color-text-dim)]">Loading calendar...</p>
        </div>
      )}

      {/* GHL Calendar iframe */}
      <iframe
        src="https://brand.webl4b.com/widget/booking/6cH0A9KcSjjIOvzbgYQE"
        title="Book a free strategy call with WebLab"
        className={`w-full border-none overflow-hidden transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '600px' }}
        scrolling="no"
        onLoad={() => setIsLoaded(true)}
      />

      {/* GHL auto-resize script */}
      <Script
        src="https://brand.webl4b.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
```

Key decisions:
- `useState` tracks load state for skeleton → iframe transition.
- `min-height: 600px` prevents layout collapse while `form_embed.js` handles dynamic resizing.
- `title` attribute on iframe for accessibility (screen readers).
- `opacity` transition for smooth fade-in when loaded.
- `strategy="afterInteractive"` matches the `ChatbotPlaceholder` pattern.

- [ ] **Step 2: Verify build passes**

Run: `npm run build`
Expected: Build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/CalendarEmbed.tsx
git commit -m "feat: add CalendarEmbed component for GHL booking widget"
```

---

### Task 3: Restructure the `/contact` page

**Files:**
- Modify: `src/app/contact/page.tsx`

The current page has:
1. Hero section (badge + heading + subtext)
2. Split layout (contact info cards left, contact form right)

The new page will have:
1. Hero section (updated copy)
2. **Calendar section** — heading "Book a Free Strategy Call", subtext, `CalendarEmbed` component, with `id="book-a-call"`
3. **Divider/separator** — subtle "or" separator
4. **Form section** — heading "Or Send Us a Message", subtext, existing split layout (info cards + form)

- [ ] **Step 1: Replace the full page content**

Replace the entire content of `src/app/contact/page.tsx` with:

```tsx
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/contact/ContactForm';
import CalendarEmbed from '@/components/contact/CalendarEmbed';

export const metadata: Metadata = {
  title: 'Contact WebLab Sydney — Book a Call or Get in Touch',
  description:
    'Book a free strategy call or send us a message. WebLab Sydney works with service businesses across Sydney and NSW.',
  keywords: [
    'contact WebLab Sydney',
    'book a call Sydney',
    'software agency contact Sydney',
    'digital agency Sydney quote',
  ],
  openGraph: {
    title: 'Contact WebLab | Book a Call or Get in Touch',
    description:
      'Book a free strategy call or send us a message. We work with service businesses across Sydney and NSW.',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
                SAY G&apos;DAY
              </span>
              <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
                Let&apos;s Chat
              </h1>
              <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
                Book a free strategy call or drop us a message. No sales pitch, promise.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Calendar Booking Section */}
      <section
        id="book-a-call"
        className="bg-[var(--color-background)] pb-16 sm:pb-20 scroll-mt-24"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mb-3">
                Book a Free Strategy Call
              </h2>
              <p className="text-[var(--color-text-muted)] text-base max-w-lg mx-auto">
                Pick a time that works for you. We&apos;ll discuss your business goals and how we can help.
              </p>
            </div>
            <CalendarEmbed />
          </AnimatedSection>
        </div>
      </section>

      {/* Divider */}
      <div className="bg-[var(--color-background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px bg-[var(--color-foreground)]" />
            <span className="text-sm font-bold text-[var(--color-text-dim)] uppercase tracking-widest">
              or
            </span>
            <div className="flex-1 h-px bg-[var(--color-foreground)]" />
          </div>
        </div>
      </div>

      {/* Contact Form Section */}
      <section className="bg-[var(--color-background)] pt-16 sm:pt-20 pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-10">
              <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mb-3">
                Or Send Us a Message
              </h2>
              <p className="text-[var(--color-text-muted)] text-base max-w-lg mx-auto">
                Not ready for a call? Drop us a message and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact info + extra cards */}
            <AnimatedSection>
              <div className="flex flex-col gap-6">
                {/* Contact Details */}
                <div className="rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-brutal">
                  <h2 className="text-xl font-black text-[var(--color-text-primary)] mb-6">
                    Contact Details
                  </h2>
                  <ul className="flex flex-col gap-5">
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-dim)] text-xs mb-0.5">Email</p>
                        <a
                          href={`mailto:${SITE_CONFIG.email}`}
                          className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors"
                        >
                          {SITE_CONFIG.email}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-dim)] text-xs mb-0.5">Phone</p>
                        <a
                          href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                          className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors"
                        >
                          {SITE_CONFIG.phone}
                        </a>
                      </div>
                    </li>
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-dim)] text-xs mb-0.5">Location</p>
                        <p className="text-[var(--color-text-secondary)] text-sm">
                          {SITE_CONFIG.location}
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* Response Time */}
                <div className="rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-brutal">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[var(--color-text-primary)] mb-1">
                        Quick Response
                      </h3>
                      <p className="text-[var(--color-text-muted)] text-sm">
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-brutal">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-black text-[var(--color-text-primary)] mb-1">
                        Business Hours
                      </h3>
                      <p className="text-[var(--color-text-muted)] text-sm">
                        Mon to Fri: 8am to 6pm AEST
                      </p>
                      <p className="text-[var(--color-text-muted)] text-sm">
                        Sat to Sun: By appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connect With Us */}
                <div className="rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-surface)] p-6 sm:p-8 shadow-brutal">
                  <h3 className="text-sm font-black text-[var(--color-text-primary)] mb-3">
                    Connect With Us
                  </h3>
                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a
                      href={SITE_CONFIG.socials.instagram ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                      </svg>
                    </a>
                    {/* LinkedIn */}
                    <a
                      href={SITE_CONFIG.socials.linkedin ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="LinkedIn"
                      className="w-9 h-9 rounded-xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    {/* Facebook */}
                    <a
                      href={SITE_CONFIG.socials.facebook ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Facebook"
                      className="w-9 h-9 rounded-xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
                    >
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: Contact Form */}
            <AnimatedSection delay={0.1}>
              <ContactForm />
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}
```

Key changes from original:
- Updated metadata title/description to mention booking.
- Hero subtext updated: "Book a free strategy call or drop us a message."
- New calendar section with `id="book-a-call"` and `scroll-mt-24` (clears fixed navbar on anchor scroll).
- Calendar uses `max-w-4xl` container (agreed in grilling).
- "Or" divider between calendar and form sections.
- Form section gets its own heading "Or Send Us a Message" with subtext.
- Business hours copy uses "to" instead of dashes (per project memory: no dashes in copy).
- Existing split layout (info cards + form) preserved exactly below the divider.

- [ ] **Step 2: Verify build and lint pass**

Run: `npm run build && npm run lint`
Expected: Build succeeds with all routes static, no lint errors.

- [ ] **Step 3: Commit**

```bash
git add src/app/contact/page.tsx
git commit -m "feat: add GHL calendar booking section to contact page"
```

---

### Task 4: Update `BOOKING_URL` fallback to anchor link

**Files:**
- Modify: `src/lib/constants.tsx:634`

- [ ] **Step 1: Update the fallback value**

In `src/lib/constants.tsx` line 634, change:

```typescript
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '/contact';
```

to:

```typescript
export const BOOKING_URL = process.env.NEXT_PUBLIC_BOOKING_URL ?? '/contact#book-a-call';
```

- [ ] **Step 2: Update `.env.local` to match**

In `.env.local`, change:

```
NEXT_PUBLIC_BOOKING_URL=/contact
```

to:

```
NEXT_PUBLIC_BOOKING_URL=/contact#book-a-call
```

- [ ] **Step 3: Verify build passes**

Run: `npm run build`
Expected: Build succeeds. All `BookingCTA` buttons, hero CTA, navbar CTA, and footer CTA now resolve to `/contact#book-a-call`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/constants.tsx
git commit -m "feat: update BOOKING_URL fallback to anchor-link to calendar section"
```

Note: `.env.local` is gitignored and not committed.

---

### Task 5: Final verification

- [ ] **Step 1: Full build + lint**

Run: `npm run build && npm run lint`
Expected: 0 errors, all 4 routes static.

- [ ] **Step 2: Manual smoke test**

Run: `npm run dev`

Check:
1. `/contact` loads — calendar embed visible at top, form below.
2. `/contact#book-a-call` scrolls directly to the calendar section.
3. Calendar skeleton shows while iframe loads, then fades in.
4. GHL calendar renders inside the iframe (time slots visible if availability is set in GHL).
5. Contact form still works below the calendar.
6. Click any "Book a Free Strategy Call" button on `/`, `/services`, `/about` — all navigate to `/contact#book-a-call`.
7. No CSP errors in browser console.
8. Mobile (375px): calendar and form stack correctly, no horizontal overflow.

---

## Summary of all changes

| # | File | Change |
|---|---|---|
| 1 | `next.config.ts` | Add `brand.webl4b.com` to `style-src` |
| 2 | `src/components/contact/CalendarEmbed.tsx` | New client component (iframe + script + skeleton) |
| 3 | `src/app/contact/page.tsx` | Restructure: calendar section (top) + divider + form section (bottom) |
| 4 | `src/lib/constants.tsx` | Update `BOOKING_URL` fallback to `/contact#book-a-call` |
| 5 | `.env.local` | Update `NEXT_PUBLIC_BOOKING_URL` to `/contact#book-a-call` |
