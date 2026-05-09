import type { Metadata } from 'next';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/ui/ServiceCard';
import BookingCTA from '@/components/ui/BookingCTA';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FaqAccordion from '@/components/ui/FaqAccordion';

const faqs = [
  {
    q: 'How long does it take to set everything up?',
    a: "Most clients are live within 2–4 weeks. We handle everything, you don't need to touch a line of code.",
  },
  {
    q: 'Do I need to sign a long-term contract?',
    a: "No lock-in contracts. Our systems are built to deliver ROI, so clients stay because they want to, not because they have to.",
  },
  {
    q: 'What if I already have a website?',
    a: "We can work with your existing site or rebuild it. We'll recommend what makes the most sense after the strategy call.",
  },
  {
    q: 'Do you work with businesses outside of Sydney?',
    a: 'Primarily Sydney and NSW, but we work remotely with Australian businesses across the country.',
  },
];

export const metadata: Metadata = {
  title: 'Services — Websites, CRM & Automation for Service Businesses',
  description:
    'WebLab offers smart websites, CRM automation, missed call text-back, Google review automation, AI chatbots, and local SEO for Sydney service businesses.',
  keywords: [
    'CRM for service businesses Sydney',
    'automated follow-up system Sydney',
    'smart website for service businesses Sydney',
    'missed call text back',
    'Google review automation Sydney',
    'local SEO service businesses Sydney',
    'AI chatbot for small business',
  ],
  openGraph: {
    title: 'Services | WebLab — Built for Service Businesses',
    description:
      'Six purpose-built systems designed to capture more leads, automate follow-up, and grow your service business.',
  },
};

export default function ServicesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
              WHAT WE BUILD
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
              Tools That Actually Bring In Work
            </h1>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
              Everything we build is designed for one thing: getting you more jobs with less effort. No generic templates. No bloated software.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* All 6 service cards */}
      <section className="bg-[var(--color-background)] pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {SERVICES.map((service, index) => (
                <AnimatedSection key={service.id} delay={index * 0.08}>
                  <ServiceCard service={service} />
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* FAQ accordion */}
      <section className="bg-[var(--color-surface)] py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-3">
                Common Questions
              </h2>
              <div className="mx-auto w-12 h-1 bg-[var(--color-accent)] rounded-full" aria-hidden="true" />
            </div>
            <FaqAccordion items={faqs} />
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection>
        <BookingCTA
          headline="Not Sure Where to Start?"
          subtext="Book a free strategy call and we'll tell you exactly what would make the biggest difference for your business."
        />
      </AnimatedSection>
    </>
  );
}
