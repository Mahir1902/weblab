import type { Metadata } from 'next';
import { FEATURES } from '@/lib/constants';
import ServiceCard from '@/components/ui/ServiceCard';
import BookingCTA from '@/components/ui/BookingCTA';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FaqAccordion from '@/components/ui/FaqAccordion';

const faqs = [
  {
    q: 'Are these features included with every plan?',
    a: 'Yes. Every WebLab system comes with access to all platform tools — online booking, unified inbox, sales pipeline, mobile app, and invoicing. We configure the ones that will have the most immediate impact for your business first.',
  },
  {
    q: 'Do I need to be tech-savvy to use these?',
    a: 'Not at all. We set everything up and train you on how to use each feature. Most clients are fully comfortable within a day or two. And if you ever get stuck, our support team is a message away.',
  },
  {
    q: 'Can I start with just a few features and add more later?',
    a: 'Absolutely. We typically start with the features that will have the biggest immediate impact for your specific business — whether that is online booking, the unified inbox, or the sales pipeline. You can always expand from there.',
  },
];

export const metadata: Metadata = {
  title: 'Features — Platform Tools for Your Business',
  description:
    'Online booking, unified inbox, sales pipeline, mobile app, and invoicing — all the tools you need to run your service business from one platform.',
  keywords: [
    'CRM features',
    'business management tools Sydney',
    'online booking service businesses',
    'sales pipeline',
    'unified inbox',
    'invoicing',
  ],
  openGraph: {
    title: 'Features | WebLab — Built-In Tools That Run Your Business',
    description:
      'Five platform tools designed to automate scheduling, communication, lead tracking, payments, and more.',
  },
};

export default function FeaturesPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-16 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
              PLATFORM TOOLS
            </span>
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
              Your Business, On Autopilot
            </h1>
            <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
              Every WebLab system comes with powerful built-in tools that handle your scheduling,
              communication, lead tracking, and payments — so you can stay focused on the work.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Feature cards grid */}
      <section className="bg-[var(--color-background)] pb-20 sm:pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {FEATURES.map((feature, index) => (
                <AnimatedSection key={feature.id} delay={index * 0.08}>
                  <ServiceCard service={feature} basePath="/features" />
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
          headline="Not Sure Which Features You Need?"
          subtext="Book a free strategy call and we'll walk you through the tools that will have the biggest impact for your specific business."
        />
      </AnimatedSection>
    </>
  );
}
