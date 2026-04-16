import Link from 'next/link';
import { TrendingUp, UserCheck, Cpu, Shield } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

const steps = [
  {
    number: '01',
    title: 'Drive Organic Traffic',
    description:
      'Strategic keywords and SEO enhancements get your business ranking higher on Google, bringing in locals actively searching for your services.',
    Icon: TrendingUp,
  },
  {
    number: '02',
    title: 'Convert Visitors Into Leads',
    description:
      'Once they arrive, smart lead capture tools, chatbots, forms, and pop-ups, turn anonymous visitors into real prospects with their contact details.',
    Icon: UserCheck,
  },
  {
    number: '03',
    title: 'Automate Your Sales',
    description:
      'AI-driven chatbots and personalised automations follow up instantly, nurture prospects, and book jobs, all without you doing a thing.',
    Icon: Cpu,
  },
  {
    number: '04',
    title: 'Grow With Confidence',
    description:
      'A fast, mobile-responsive, well-designed website that builds trust and keeps working for you 24/7, your best salesperson that never sleeps.',
    Icon: Shield,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-6 block">
            [THE WEBLAB FUNNEL]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4 mt-2">
            From Search to Booked Job
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
            A proven four-step system that turns strangers into paying customers, automatically.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/40 transition-all duration-300"
              >
                {/* Step number watermark */}
                <div className="absolute top-4 right-4 text-[var(--color-border)] font-bold text-3xl select-none tabular-nums" style={{ fontFamily: 'var(--font-syne)' }} aria-hidden="true">
                  {step.number}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-dim)] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2 pr-6">{step.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href={BOOKING_URL}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white text-base font-semibold hover:bg-[var(--color-accent-hover)] hover:scale-105 transition-all duration-200"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
