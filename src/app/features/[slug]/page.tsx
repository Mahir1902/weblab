import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import { FEATURES, FEATURE_PAGE_DATA, BOOKING_URL } from '@/lib/constants';
import { createMetadata } from '@/lib/metadata';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FaqAccordion from '@/components/ui/FaqAccordion';
import BookingCTA from '@/components/ui/BookingCTA';

/* ------------------------------------------------------------------ */
/* Static params — pre-render all 5 feature slugs at build time         */
/* ------------------------------------------------------------------ */
export function generateStaticParams() {
  return FEATURES.map((feature) => ({ slug: feature.id }));
}

/* ------------------------------------------------------------------ */
/* Metadata                                                             */
/* ------------------------------------------------------------------ */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = FEATURES.find((f) => f.id === slug);
  if (!feature) return {};
  return createMetadata({
    title: feature.headline,
    description: feature.description,
    keywords: feature.keywords,
    path: `/features/${slug}`,
  });
}

/* ------------------------------------------------------------------ */
/* Page                                                                 */
/* ------------------------------------------------------------------ */
export default async function FeatureSlugPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const feature = FEATURES.find((f) => f.id === slug);
  if (!feature) notFound();

  const pageData = FEATURE_PAGE_DATA[slug];
  if (!pageData) notFound();

  /* Split long description on double-newline into separate paragraphs */
  const descParagraphs = pageData.longDescription.split('\n\n');

  return (
    <main>
      {/* ── Hero ──────────────────────────────────────────────────── */}
      <section className="pt-32 pb-16 bg-[var(--color-background)]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Back link */}
          <AnimatedSection>
            <Link
              href="/features"
              className="inline-flex items-center gap-2 text-sm font-black text-[var(--color-text-muted)] hover:text-[var(--color-accent)] transition-colors duration-200 mb-8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)]"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              All Features
            </Link>
          </AnimatedSection>

          <AnimatedSection delay={0.05}>
            {/* Badge pill */}
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
              WebLab Feature
            </span>

            {/* Icon */}
            <div
              className="w-16 h-16 rounded-2xl bg-[var(--color-accent-dim)] border-2 border-[var(--color-foreground)] flex items-center justify-center mb-6 text-[var(--color-accent)] shadow-brutal"
              aria-hidden="true"
            >
              {/* Render the ReactNode icon at a larger scale via wrapper */}
              <span className="[&>svg]:w-8 [&>svg]:h-8">
                {feature.icon}
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-text-primary)] mb-6 leading-tight">
              {feature.headline}
            </h1>

            {/* Long description paragraphs */}
            <div className="space-y-4">
              {descParagraphs.map((para, i) => (
                <p
                  key={i}
                  className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-3xl"
                >
                  {para}
                </p>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Mid-page CTA ──────────────────────────────────────────── */}
      <section className="bg-[var(--color-surface)] border-y-2 border-[var(--color-foreground)] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <AnimatedSection>
            <p className="text-[var(--color-text-primary)] font-black text-xl sm:text-2xl leading-tight max-w-lg">
              Ready to see this in action for your business?
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.08}>
            <Link
              href={BOOKING_URL}
              className="flex-shrink-0 inline-flex items-center px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white text-base font-black border-2 border-[var(--color-foreground)] shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-accent)] focus-visible:ring-offset-2"
            >
              Book a Free Call
            </Link>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Features grid ─────────────────────────────────────────── */}
      <section className="bg-[var(--color-background)] py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <h2 className="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mb-10">
              What&rsquo;s Included
            </h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {pageData.features.map((item, i) => (
              <AnimatedSection key={item.title} delay={i * 0.07}>
                <article className="rounded-2xl bg-white border-2 border-[var(--color-foreground)] shadow-brutal p-6 h-full">
                  {/* Numbered badge */}
                  <span
                    className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] mb-4"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <h3 className="text-base font-black text-[var(--color-text-primary)] mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[var(--color-text-muted)] leading-relaxed">
                    {item.description}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ section ───────────────────────────────────────────── */}
      <section className="bg-[var(--color-background)] py-20 sm:py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-3">
                Common Questions
              </h2>
              <div
                className="mx-auto w-12 h-1 bg-[var(--color-accent)] rounded-full"
                aria-hidden="true"
              />
            </div>
            <FaqAccordion
              items={pageData.faqs.map((faq) => ({ q: faq.q, a: faq.a }))}
            />
          </AnimatedSection>
        </div>
      </section>

      {/* ── Bottom CTA ────────────────────────────────────────────── */}
      <AnimatedSection>
        <BookingCTA
          headline={pageData.ctaHeadline}
          subtext={pageData.ctaSubtext}
        />
      </AnimatedSection>
    </main>
  );
}
