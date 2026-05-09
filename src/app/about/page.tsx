import type { Metadata } from 'next';
import Image from 'next/image';
import BookingCTA from '@/components/ui/BookingCTA';
import AnimatedSection from '@/components/ui/AnimatedSection';
import FaqAccordion from '@/components/ui/FaqAccordion';

export const metadata: Metadata = {
  title: 'About WebLab — Sydney Agency for Local Service Businesses',
  description:
    'WebLab builds websites, CRM systems, and automation for local service businesses across Sydney. Learn our story and how we work.',
  keywords: [
    'Sydney web agency for service businesses',
    'about WebLab',
    'local business automation Sydney',
    'CRM for service businesses Sydney',
    'website for local businesses Sydney',
    'lead generation local service business',
  ],
  openGraph: {
    title: 'About WebLab | Websites and Automation for Local Service Businesses',
    description:
      'We build the systems that help local service businesses get found, win more work, and grow. Based in Sydney.',
  },
};

const steps = [
  {
    title: 'Book a Free Call',
    description:
      '30 minutes, no obligation. We learn about your business, where you\'re losing leads, and what you\'ve already tried.',
  },
  {
    title: 'We Audit and Plan',
    description:
      'We review your current setup. Your website, Google presence, and follow up process. Then we map out exactly what needs fixing and in what order.',
  },
  {
    title: 'We Build It',
    description:
      'Website, CRM, automations, review funnels. We set it all up. You don\'t need to understand the tech. We handle everything.',
  },
  {
    title: 'Launch and Grow',
    description:
      'Go live, start capturing leads, and we stay with you. Ongoing support, monthly check ins, and optimisation as your business grows.',
  },
];

const faqItems = [
  {
    q: 'How much does it cost to work with WebLab?',
    a: 'It depends on what you need. We offer flexible monthly plans starting from a few hundred dollars. Every project starts with a free call so we can understand your business and give you a clear, honest quote with no surprises.',
  },
  {
    q: 'Do I need to be tech savvy to use your systems?',
    a: 'Not at all. We build everything for you and walk you through how it works. Most of our clients are busy business owners who just want things to run in the background. That\'s exactly what we set up.',
  },
  {
    q: 'What if I already have a website?',
    a: 'That\'s fine. We\'ll review what you have and let you know honestly whether it needs replacing or just improving. We never push a rebuild unless it\'s actually going to make a difference.',
  },
  {
    q: 'Are there lock-in contracts?',
    a: 'No. We earn your business every month. If things aren\'t working for you, you\'re free to walk away. We\'d rather keep you because the results speak for themselves.',
  },
  {
    q: 'How long does it take to get set up?',
    a: 'Most clients are fully live within two to three weeks. That includes the website, CRM, automations, and review systems. We move fast because we know leads don\'t wait.',
  },
  {
    q: 'Do you only work with businesses in Sydney?',
    a: 'We\'re based in Sydney and most of our clients are local service businesses here. But we work with service businesses across Australia. If you take bookings, quote work, or manage appointments, we can help.',
  },
];

export default function AboutPage() {
  return (
    <>
      {/* FAQPage JSON-LD structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: faqItems.map((item) => ({
              '@type': 'Question',
              name: item.q,
              acceptedAnswer: {
                '@type': 'Answer',
                text: item.a,
              },
            })),
          }),
        }}
      />

      {/* Section 1: Hero + Our Story (combined) */}
      <section className="pt-32 pb-20 sm:pb-28 bg-[var(--color-background)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left: Hero text + story */}
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent-dim)] font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
                  OUR STORY
                </span>
                <h1 className="text-4xl sm:text-5xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
                  Good Work Deserves{' '}
                  <span className="gradient-text">
                    to Be Found.
                  </span>
                </h1>
                <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
                  WebLab is a Sydney based agency that gives local service businesses the websites,
                  automation, and lead systems they need to grow. Without the complexity or the big
                  agency price tag.
                </p>

                <h2 className="text-2xl font-black text-[var(--color-text-primary)] mb-4">
                  Why We Started
                </h2>
                <div className="flex flex-col gap-4 text-[var(--color-text-muted)] text-base leading-relaxed">
                  <p>
                    We kept seeing the same thing across Sydney. Interior designers, dog groomers, personal trainers, cleaners
                    doing exceptional work, but struggling to get found online. Meanwhile,
                    competitors with half the skill were winning customers because they had a better
                    website or showed up first on Google.
                  </p>
                  <p>
                    A missed call on a Saturday morning turns into a lost customer. Five star reviews
                    mean nothing if nobody can find them. And the business owners who try to fix it
                    themselves? They end up juggling three different apps, paying for tools they
                    barely use, and still losing enquiries to businesses with better systems.
                  </p>
                  <p>
                    That&apos;s the gap we exist to close. Not with flashy marketing promises, but
                    with the actual systems, websites, automation, and follow up, that turn good
                    work into a growing business.
                  </p>
                </div>
              </div>

              {/* Right: illustration */}
              <Image
                src="/images/tradie_illustration.png"
                alt="Illustration of a service business owner surrounded by digital business tools including reviews, calendar, and growth analytics"
                width={1024}
                height={1024}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="rounded-2xl w-full h-auto"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Section 2: How We Work */}
      <section className="bg-[var(--color-surface)] py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-4">
                Simple, Honest, End to End
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto">
                Here&apos;s what working with us actually looks like.
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <AnimatedSection key={i} delay={i * 0.07}>
                <div className="rounded-xl border-2 border-[var(--color-foreground)] bg-[var(--color-background)] p-6 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-[transform,box-shadow] duration-300">
                  {/* Step number badge */}
                  <div className="w-10 h-10 rounded-xl bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent-dim)] flex items-center justify-center font-bold text-[var(--color-accent)] text-base mb-4">
                    {i + 1}
                  </div>
                  <h3 className="text-[var(--color-text-primary)] font-black mb-2">{step.title}</h3>
                  <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
                    {step.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: FAQ */}
      <section className="bg-[var(--color-background)] py-20 sm:py-28">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-4">
                Questions We Get Asked a Lot
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto">
                Honest answers. No jargon.
              </p>
            </div>
            <FaqAccordion items={faqItems} />
          </AnimatedSection>
        </div>
      </section>

      {/* Section 4: CTA */}
      <AnimatedSection>
        <BookingCTA
          headline="Let's Talk About Your Business"
          subtext="Book a free 30 minute call. We'll have an honest conversation about where you are, where you want to be, and whether we can help you get there."
        />
      </AnimatedSection>
    </>
  );
}
