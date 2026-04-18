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
