# Contact Page Form Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the GHL iframe form and calendar placeholder on `/contact` with a custom React Hook Form + Zod contact form that submits to a GHL webhook and respects light/dark theme.

**Architecture:** New `ContactForm` client component handles form state, Zod validation, and webhook POST. The contact page (Server Component) restructures its two-column layout — left side gets 4 info cards, right side renders `ContactForm`. The GHL iframe, embed script, and calendar placeholder are all removed.

**Tech Stack:** React Hook Form, Zod, @hookform/resolvers, Framer Motion (AnimatePresence for success transition), Lucide React (icons), Tailwind CSS v4 design tokens.

**Spec:** `docs/superpowers/specs/2026-04-18-contact-page-form-redesign-design.md`

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `.env.local` | Modify | Add `NEXT_PUBLIC_GHL_WEBHOOK_URL` |
| `src/lib/constants.tsx` | Modify (line 85) | Add `GHL_WEBHOOK_URL` export |
| `next.config.ts` | Modify (line 20) | Add `services.leadconnectorhq.com` to `connect-src` CSP |
| `src/components/contact/ContactForm.tsx` | Create | Client component — form UI, Zod schema, validation, webhook submission, success/error states |
| `src/app/contact/page.tsx` | Rewrite | Remove calendar + iframe + GHL script, update metadata/hero copy, add 3 new info cards, import ContactForm |

---

### Task 1: Install Dependencies

**Files:**
- Modify: `package.json`

- [ ] **Step 1: Install react-hook-form, zod, and resolver**

```bash
npm install react-hook-form zod @hookform/resolvers
```

- [ ] **Step 2: Verify installation**

```bash
node -e "require('react-hook-form'); require('zod'); require('@hookform/resolvers/zod'); console.log('OK')"
```

Expected: `OK`

---

### Task 2: Add Environment Variable and Constant

**Files:**
- Modify: `.env.local`
- Modify: `src/lib/constants.tsx:85`

- [ ] **Step 1: Add webhook URL to `.env.local`**

Append this line to `.env.local` (after the existing `NEXT_PUBLIC_BOOKING_URL` line):

```
NEXT_PUBLIC_GHL_WEBHOOK_URL=https://services.leadconnectorhq.com/hooks/kNppaQsBHBgJcdZhPu6H/webhook-trigger/34d1ba1d-7fab-4dab-a9f8-fd223e10fe71
```

- [ ] **Step 2: Export `GHL_WEBHOOK_URL` from constants**

In `src/lib/constants.tsx`, add this line directly after line 85 (`export const BOOKING_URL = ...`):

```tsx
export const GHL_WEBHOOK_URL = process.env.NEXT_PUBLIC_GHL_WEBHOOK_URL ?? '';
```

- [ ] **Step 3: Verify build still passes**

```bash
npm run build
```

Expected: Build succeeds, all 4 routes static.

---

### Task 3: Update CSP for Webhook Domain

**Files:**
- Modify: `next.config.ts:20`

The form will POST to `https://services.leadconnectorhq.com/...` from the client. This domain is not in the current `connect-src` CSP directive and the request will be blocked without it.

- [ ] **Step 1: Add `services.leadconnectorhq.com` to `connect-src`**

In `next.config.ts`, change line 20 from:

```ts
"connect-src 'self' https://*.gohighlevel.com https://*.msgsndr.com https://brand.webl4b.com",
```

to:

```ts
"connect-src 'self' https://*.gohighlevel.com https://*.msgsndr.com https://brand.webl4b.com https://services.leadconnectorhq.com",
```

- [ ] **Step 2: Verify build still passes**

```bash
npm run build
```

Expected: Build succeeds.

---

### Task 4: Create ContactForm Component

**Files:**
- Create: `src/components/contact/ContactForm.tsx`

This is the core new component. It handles the Zod validation schema, React Hook Form integration, webhook POST, and all 4 UI states (idle, submitting, success, error).

- [ ] **Step 1: Create the `src/components/contact/` directory**

```bash
mkdir -p src/components/contact
```

- [ ] **Step 2: Write `ContactForm.tsx`**

Create `src/components/contact/ContactForm.tsx` with this content:

```tsx
'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion, AnimatePresence } from 'framer-motion';
import { GHL_WEBHOOK_URL, SITE_CONFIG } from '@/lib/constants';

// --- Zod Schema ---

const auPhoneRegex = /^(?:\+?61|0)[2-478](?:[\s\-]?\d){7,9}$/;

const contactSchema = z.object({
  firstName: z
    .string()
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name must be under 50 characters'),
  lastName: z
    .string()
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name must be under 50 characters'),
  phone: z
    .string()
    .min(1, 'Phone number is required')
    .regex(auPhoneRegex, 'Please enter a valid Australian phone number'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  message: z
    .string()
    .max(1000, 'Message must be under 1000 characters')
    .optional()
    .or(z.literal('')),
});

type ContactFormData = z.infer<typeof contactSchema>;

// --- Component ---

export default function ContactForm() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [submitError, setSubmitError] = useState('');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
  });

  const onSubmit = async (data: ContactFormData) => {
    setFormState('submitting');
    setSubmitError('');

    try {
      const res = await fetch(GHL_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error(`Server responded with ${res.status}`);
      }

      setFormState('success');
    } catch {
      setSubmitError(
        `Something went wrong. Please try again or email us directly at ${SITE_CONFIG.email}`
      );
      setFormState('error');
    }
  };

  // Shared input classes — design tokens for light/dark support
  const inputClasses =
    'w-full rounded-lg border border-[var(--color-border)] bg-[var(--color-surface-2)] px-4 py-3 text-sm text-[var(--color-text-primary)] placeholder:text-[var(--color-text-dim)] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-colors';

  const labelClasses = 'block text-sm font-medium text-[var(--color-text-secondary)] mb-1.5';

  const errorClasses = 'text-xs text-[var(--color-danger)] mt-1';

  return (
    <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 h-full">
      <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">
        Send Us a Message
      </h2>
      <p className="text-[var(--color-text-muted)] text-sm mb-6">
        Fill out the form and we&apos;ll get back to you within 24 hours.
      </p>

      <AnimatePresence mode="wait">
        {formState === 'success' ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="flex flex-col items-center justify-center text-center py-12"
            aria-live="polite"
          >
            {/* Green checkmark */}
            <div className="w-14 h-14 rounded-full bg-[var(--color-success)]/15 flex items-center justify-center mb-4">
              <svg
                className="w-7 h-7 text-[var(--color-success)]"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2.5}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-[var(--color-text-primary)] mb-2">
              Message Sent!
            </h3>
            <p className="text-[var(--color-text-muted)] text-sm mb-4">
              Thanks! We&apos;ll be in touch within 24 hours.
            </p>
            <p className="text-[var(--color-text-dim)] text-xs">
              Or email us directly at{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-[var(--color-accent)] hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="flex flex-col gap-5"
          >
            {/* First name + Last name row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className={labelClasses}>
                  First Name
                </label>
                <input
                  id="firstName"
                  type="text"
                  placeholder="John"
                  aria-describedby={errors.firstName ? 'firstName-error' : undefined}
                  className={inputClasses}
                  disabled={formState === 'submitting'}
                  {...register('firstName')}
                />
                {errors.firstName && (
                  <p id="firstName-error" className={errorClasses} role="alert">
                    {errors.firstName.message}
                  </p>
                )}
              </div>
              <div>
                <label htmlFor="lastName" className={labelClasses}>
                  Last Name
                </label>
                <input
                  id="lastName"
                  type="text"
                  placeholder="Smith"
                  aria-describedby={errors.lastName ? 'lastName-error' : undefined}
                  className={inputClasses}
                  disabled={formState === 'submitting'}
                  {...register('lastName')}
                />
                {errors.lastName && (
                  <p id="lastName-error" className={errorClasses} role="alert">
                    {errors.lastName.message}
                  </p>
                )}
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className={labelClasses}>
                Phone
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="0412 345 678"
                aria-describedby={errors.phone ? 'phone-error' : 'phone-hint'}
                className={inputClasses}
                disabled={formState === 'submitting'}
                {...register('phone')}
              />
              {errors.phone ? (
                <p id="phone-error" className={errorClasses} role="alert">
                  {errors.phone.message}
                </p>
              ) : (
                <p id="phone-hint" className="text-xs text-[var(--color-text-dim)] mt-1">
                  e.g. 0412 345 678 or +61 412 345 678
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="email" className={labelClasses}>
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="john@example.com"
                aria-describedby={errors.email ? 'email-error' : undefined}
                className={inputClasses}
                disabled={formState === 'submitting'}
                {...register('email')}
              />
              {errors.email && (
                <p id="email-error" className={errorClasses} role="alert">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="message" className={labelClasses}>
                Message{' '}
                <span className="text-[var(--color-text-dim)] font-normal">(optional)</span>
              </label>
              <textarea
                id="message"
                rows={4}
                placeholder="Tell us about your project or what you need help with..."
                aria-describedby={errors.message ? 'message-error' : undefined}
                className={`${inputClasses} resize-none`}
                disabled={formState === 'submitting'}
                {...register('message')}
              />
              {errors.message && (
                <p id="message-error" className={errorClasses} role="alert">
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* Submission error */}
            {formState === 'error' && submitError && (
              <div
                className="rounded-lg bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/30 p-3 text-sm text-[var(--color-danger)]"
                role="alert"
                aria-live="polite"
              >
                {submitError}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              disabled={formState === 'submitting'}
              aria-disabled={formState === 'submitting'}
              className="w-full rounded-lg bg-[var(--color-accent)] px-6 py-3 text-sm font-semibold text-white hover:bg-[var(--color-accent-hover)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {formState === 'submitting' ? (
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-4 h-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-25"
                    />
                    <path
                      d="M4 12a8 8 0 018-8"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                      className="opacity-75"
                    />
                  </svg>
                  Sending...
                </span>
              ) : (
                'Send Message'
              )}
            </button>

            {/* Email fallback */}
            <p className="text-[var(--color-text-dim)] text-xs text-center">
              Or email us directly at{' '}
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="text-[var(--color-accent)] hover:underline"
              >
                {SITE_CONFIG.email}
              </a>
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
```

- [ ] **Step 3: Verify build passes with new component**

```bash
npm run build
```

Expected: Build succeeds. The component isn't imported anywhere yet so it's tree-shaken, but TypeScript and import resolution are validated.

---

### Task 5: Rewrite Contact Page

**Files:**
- Rewrite: `src/app/contact/page.tsx`

This replaces the entire contact page. Removes the calendar section, GHL iframe, and embed script. Adds 3 new info cards on the left column. Imports `ContactForm` on the right. Updates metadata and hero copy.

- [ ] **Step 1: Rewrite `src/app/contact/page.tsx`**

Replace the entire file with:

```tsx
import type { Metadata } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import AnimatedSection from '@/components/ui/AnimatedSection';
import ContactForm from '@/components/contact/ContactForm';

export const metadata: Metadata = {
  title: 'Contact WebLab Sydney — Get in Touch',
  description:
    'Get in touch with WebLab Sydney. Send us a message and we\u2019ll get back to you within 24 hours. We work with tradies and service businesses across Sydney and NSW.',
  keywords: [
    'contact WebLab Sydney',
    'get in touch Sydney',
    'software agency contact Sydney',
    'digital agency Sydney quote',
  ],
  openGraph: {
    title: 'Contact WebLab | Get in Touch',
    description:
      'Ready to automate your lead flow? Send us a message and we\u2019ll be in touch within 24 hours.',
  },
};

export default function ContactPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-12 bg-[var(--color-bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-6 block">
                [LET&apos;S TALK]
              </span>
              <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-4 mt-2">
                Get in Touch
              </h1>
              <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
                Fill out the form below and we&apos;ll get back to you within 24 hours.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Split layout */}
      <section className="bg-[var(--color-bg)] pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact info + extra cards */}
            <AnimatedSection>
              <div className="flex flex-col gap-6">
                {/* Contact Details */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">
                    Contact Details
                  </h2>
                  <ul className="flex flex-col gap-5">
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0">
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
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0">
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
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0">
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
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                        Quick Response
                      </h3>
                      <p className="text-[var(--color-text-muted)] text-sm">
                        We typically respond within 24 hours.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Business Hours */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-1">
                        Business Hours
                      </h3>
                      <p className="text-[var(--color-text-muted)] text-sm">
                        Mon–Fri: 8am–6pm AEST
                      </p>
                      <p className="text-[var(--color-text-muted)] text-sm">
                        Sat–Sun: By appointment
                      </p>
                    </div>
                  </div>
                </div>

                {/* Connect With Us */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                  <h3 className="text-sm font-semibold text-[var(--color-text-primary)] mb-3">
                    Connect With Us
                  </h3>
                  <div className="flex items-center gap-3">
                    {/* Instagram */}
                    <a
                      href={SITE_CONFIG.socials.instagram ?? '#'}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
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
                      className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
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
                      className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-white transition-colors"
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

- [ ] **Step 2: Verify build passes**

```bash
npm run build
```

Expected: Build succeeds, all 4 routes static. No TypeScript errors.

- [ ] **Step 3: Verify lint passes**

```bash
npm run lint
```

Expected: No lint errors.

---

### Task 6: Manual Smoke Test

Start the dev server and visually verify the contact page.

- [ ] **Step 1: Start dev server**

```bash
npm run dev
```

- [ ] **Step 2: Check `/contact` in browser**

Open `http://localhost:3000/contact` and verify:

1. Hero shows updated copy ("Fill out the form below...")
2. Left column shows 4 cards: Contact Details, Quick Response, Business Hours, Connect With Us
3. Right column shows the custom form with 5 fields
4. No GHL iframe visible
5. No calendar booking section visible
6. Toggle light/dark theme — form inputs should adapt (background, border, text colors change)
7. Fill out the form with test data — verify validation errors appear on blur
8. Submit the form — verify spinner shows during submission
9. Check browser console — no CSP violations

- [ ] **Step 3: Check responsive layout**

Resize browser or use DevTools:
- **Mobile (375px):** Cards stack vertically, then form below. Form name fields stack to single column.
- **Tablet (768px):** Same stacking, but more breathing room.
- **Desktop (1440px):** Two-column layout, left cards + right form side by side.

---

### Task 7: Commit

- [ ] **Step 1: Stage and commit all changes**

```bash
git add src/components/contact/ContactForm.tsx src/app/contact/page.tsx src/lib/constants.tsx next.config.ts .env.local package.json package-lock.json
git commit -m "feat(contact): replace GHL iframe with custom React Hook Form + Zod contact form

Remove calendar booking section and GHL iframe form from contact page.
Add custom ContactForm component with Zod validation (AU phone, email,
name, message) that POSTs to GHL webhook. Add 3 new info cards (response
time, business hours, socials) to balance two-column layout. Form uses
design tokens for full light/dark theme support.

Co-Authored-By: Claude Opus 4.6 (1M context) <noreply@anthropic.com>"
```
