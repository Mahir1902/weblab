import type { Metadata } from 'next';
import Link from 'next/link';
import Script from 'next/script';
import { SITE_CONFIG, BOOKING_URL } from '@/lib/constants';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'Contact WebLab Sydney — Book a Free Strategy Call',
  description:
    'Get in touch with WebLab Sydney. Book a free 30-minute strategy call or send us a message. We work with tradies and service businesses across Sydney and NSW.',
  keywords: [
    'contact WebLab Sydney',
    'book strategy call Sydney',
    'software agency contact Sydney',
    'digital agency Sydney quote',
  ],
  openGraph: {
    title: 'Contact WebLab | Book a Free Strategy Call',
    description:
      'Ready to automate your lead flow? Book a free call or drop us a message.',
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
                We&apos;d love to hear about your business. Book a call or send us a message below.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Split layout */}
      <section className="bg-[var(--color-bg)] pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
            {/* Left: Contact info + calendar */}
            <AnimatedSection>
              <div className="flex flex-col gap-8">
                {/* Contact details */}
                <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-6">Contact Details</h2>
                  <ul className="flex flex-col gap-5">
                    <li className="flex items-start gap-4">
                      <div className="w-9 h-9 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[var(--color-text-dim)] text-xs mb-0.5">Email</p>
                        <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors">
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
                        <a href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`} className="text-[var(--color-text-secondary)] text-sm hover:text-[var(--color-accent)] transition-colors">
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
                        <p className="text-[var(--color-text-secondary)] text-sm">{SITE_CONFIG.location}</p>
                      </div>
                    </li>
                  </ul>
                </div>

                {/* GHL Calendar Embed */}
                <div className="rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] p-6 sm:p-8">
                  <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Book a Free Strategy Call</h2>
                  <p className="text-[var(--color-text-muted)] text-sm mb-6">
                    Pick a time that works for you. 30 minutes, no pressure, just strategy.
                  </p>

                  {/*
                    ============================================================
                    GHL CALENDAR EMBED — INJECTION POINT
                    ============================================================
                    To add the GoHighLevel calendar booking widget:
                    1. In GHL → Calendars → your calendar → Embed Code
                    2. Copy the embed script / iframe code
                    3. Either:
                       a) Replace the placeholder div below with the embed HTML
                          (wrap in a client component if using <script> tags)
                       b) Or use next/script in a separate <GHLScripts /> component
                    4. The calendar should render inside #ghl-calendar-embed below
                    ============================================================
                  */}
                  <div
                    id="ghl-calendar-embed"
                    className="min-h-[200px] rounded-xl border border-dashed border-[var(--color-accent)]/30 flex items-center justify-center"
                    aria-label="Booking calendar, coming soon"
                  >
                    <div className="text-center">
                      <p className="text-[var(--color-text-dim)] text-sm mb-4">Calendar booking widget loads here</p>
                      <Link
                        href={BOOKING_URL}
                        className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-[var(--color-accent)] text-white text-sm font-semibold hover:bg-[var(--color-accent-hover)] hover:scale-105 transition-all duration-200"
                      >
                        Book a Free Call
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Right: GHL Contact Form */}
            <AnimatedSection delay={0.1}>
              <div className="rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 sm:p-8 h-full">
                <h2 className="text-xl font-semibold text-[var(--color-text-primary)] mb-2">Send Us a Message</h2>
                <p className="text-[var(--color-text-muted)] text-sm mb-6">
                  Prefer to write? Fill out the form and we&apos;ll get back to you within 24 hours.
                </p>

                <iframe
                  src="https://brand.webl4b.com/widget/form/TXCbBbnT8IHqUOPiJaHv"
                  id="inline-TXCbBbnT8IHqUOPiJaHv"
                  data-layout="{'id':'INLINE'}"
                  data-trigger-type="alwaysShow"
                  data-trigger-value=""
                  data-activation-type="alwaysActivated"
                  data-activation-value=""
                  data-deactivation-type="neverDeactivate"
                  data-deactivation-value=""
                  data-form-name="WebLab Contact Form"
                  data-height="815"
                  data-layout-iframe-id="inline-TXCbBbnT8IHqUOPiJaHv"
                  data-form-id="TXCbBbnT8IHqUOPiJaHv"
                  title="WebLab Contact Form"
                  style={{ width: '100%', height: '815px', border: 'none', borderRadius: '3px' }}
                />

                {/* Email fallback */}
                <p className="text-[var(--color-text-dim)] text-xs mt-4 text-center">
                  Or email us directly at{' '}
                  <a href={`mailto:${SITE_CONFIG.email}`} className="text-[var(--color-accent)] hover:underline">
                    {SITE_CONFIG.email}
                  </a>
                </p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      <Script
        src="https://brand.webl4b.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </>
  );
}
