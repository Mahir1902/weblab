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
