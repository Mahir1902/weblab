import type { Metadata } from 'next';
import { Zap, Target, MapPin, RefreshCw } from 'lucide-react';
import BookingCTA from '@/components/ui/BookingCTA';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'About WebLab — Sydney Software Agency for Tradies',
  description:
    'WebLab is a Sydney-based software agency that builds lead generation and automation systems for local service businesses. Learn our story and mission.',
  keywords: [
    'Sydney software agency for tradies',
    'about WebLab Sydney',
    'digital agency local business',
    'CRM automation agency Sydney',
  ],
  openGraph: {
    title: 'About WebLab | Sydney Software Agency for Service Businesses',
    description:
      'We exist to level the playing field for local service businesses, giving tradies the same lead systems that big companies use.',
  },
};

const whoWeWorkWith = [
  { icon: '🔧', label: 'Plumbers & Electricians' },
  { icon: '🏗️', label: 'Builders & Concreters' },
  { icon: '🌿', label: 'Landscapers & Gardeners' },
  { icon: '❄️', label: 'HVAC & Refrigeration' },
  { icon: '🎨', label: 'Painters & Tilers' },
  { icon: '📋', label: 'Consultants & Coaches' },
  { icon: '🔑', label: 'Locksmiths & Security' },
  { icon: '🌊', label: 'Pool & Cleaning Services' },
];

const whyWebLab = [
  {
    Icon: Zap,
    title: 'Built for Service Businesses',
    body: 'Not a generic agency, every tool and workflow we offer is purpose-designed for tradies and local operators.',
  },
  {
    Icon: Target,
    title: 'Done-For-You, End-to-End',
    body: "We handle setup, configuration, and ongoing support. You don't need to understand the tech.",
  },
  {
    Icon: MapPin,
    title: 'Sydney-Based, Locally Focused',
    body: 'We understand the Australian market, local SEO, and how Sydney customers behave.',
  },
  {
    Icon: RefreshCw,
    title: 'No Lock-In Contracts',
    body: "We earn your business every month. If it's not working for you, you can walk away.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-32 pb-20 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection>
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-6 block">
              [OUR STORY]
            </span>
            <h1 className="text-4xl sm:text-5xl font-bold text-[var(--color-text-primary)] mb-6 mt-2">
              Built by Builders,{' '}
              <span
                style={{
                  background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                For Builders
              </span>
            </h1>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed max-w-2xl mx-auto">
              WebLab was founded in Sydney with one goal: give local service businesses the same
              lead generation and automation systems that big companies use, without the big-company
              price tag or complexity.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Founding story */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-[var(--color-text-primary)] mb-6">
                  Why We Started
                </h2>
                <div className="flex flex-col gap-4 text-[var(--color-text-muted)] text-base leading-relaxed">
                  <p>
                    We kept seeing the same story: brilliant tradespeople and service providers
                    losing work to competitors who were worse at their craft, simply because they
                    had better marketing and automation.
                  </p>
                  <p>
                    A tradie misses a call while they&apos;re on-site and loses the job to a
                    competitor who replied in 60 seconds. An electrician with 50 five-star reviews
                    can&apos;t be found on Google because a rival paid an SEO agency. A builder gets
                    enquiries but loses half of them because there&apos;s no system to follow up.
                  </p>
                  <p>
                    That&apos;s the problem we exist to solve. We build the systems that let the
                    best tradespeople win.
                  </p>
                </div>
              </div>

              {/* Mission pull-quote */}
              <div className="relative rounded-2xl border border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] p-8">
                <div className="text-6xl text-[var(--color-accent)]/30 font-serif leading-none mb-4" aria-hidden="true">
                  &ldquo;
                </div>
                <blockquote className="text-xl sm:text-2xl font-semibold text-[var(--color-text-primary)] leading-snug mb-6">
                  The best tradie shouldn&apos;t lose to the best marketer. We&apos;re here to make sure they don&apos;t.
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-background border border-[var(--color-accent)] flex items-center justify-center text-xs font-bold text-[var(--color-accent)]">
                    WL
                  </div>
                  <div>
                    <p className="text-[var(--color-text-primary)] font-medium text-sm">WebLab Team</p>
                    <p className="text-[var(--color-text-dim)] text-xs">Sydney, NSW</p>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Who we work with */}
      <section className="bg-background py-20 sm:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">
                Who We Work With
              </h2>
              <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto">
                We specialise in local service businesses. If you quote jobs, take bookings,
                or dispatch crews, we can help.
              </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {whoWeWorkWith.map((item, i) => (
                <AnimatedSection key={i} delay={i * 0.06}>
                  <div className="flex flex-col items-center gap-3 p-5 rounded-xl border border-[var(--color-border)] bg-[var(--color-surface)] hover:border-[var(--color-accent)]/30 hover:bg-[var(--color-accent-dim)] transition-all text-center">
                    <span className="text-3xl" role="img" aria-hidden="true">
                      {item.icon}
                    </span>
                    <span className="text-[var(--color-text-secondary)] text-sm font-medium">{item.label}</span>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Why WebLab */}
      <section className="bg-[var(--color-surface)] border-y border-[var(--color-border)] py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4">Why WebLab?</h2>
              <p className="text-[var(--color-text-muted)] text-lg max-w-lg mx-auto">
                We&apos;re not a generic agency. Here&apos;s what makes us different.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {whyWebLab.map((item, i) => {
                const Icon = item.Icon;
                return (
                  <AnimatedSection key={i} delay={i * 0.07}>
                    <div className="rounded-xl border border-[var(--color-border)] bg-background p-6 flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center">
                        <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                      </div>
                      <div>
                        <h3 className="text-[var(--color-text-primary)] font-semibold mb-1">{item.title}</h3>
                        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{item.body}</p>
                      </div>
                    </div>
                  </AnimatedSection>
                );
              })}
            </div>
          </AnimatedSection>
        </div>
      </section>

      <AnimatedSection>
        <BookingCTA
          headline="Want to Work With Us?"
          subtext="Book a free 30-minute call and let's talk about your business. No obligation. Just honest advice."
        />
      </AnimatedSection>
    </>
  );
}
