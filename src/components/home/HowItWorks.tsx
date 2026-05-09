import Link from 'next/link';
import { Phone, Wrench, Rocket } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';

const steps = [
  {
    number: '01',
    title: 'Book a Call',
    description:
      'Tell us about your business and where you want to grow. We\'ll put together a clear plan — no jargon, no pressure.',
    Icon: Phone,
  },
  {
    number: '02',
    title: 'We Build It',
    description:
      'We set up your website, CRM, automations, and lead capture tools. You don\'t touch a thing — it\'s fully done-for-you.',
    Icon: Wrench,
  },
  {
    number: '03',
    title: 'Watch Jobs Roll In',
    description:
      'Leads come in, follow-up happens automatically, reviews get collected, and you focus on what you\'re actually good at.',
    Icon: Rocket,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-[var(--color-surface)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
            HOW IT WORKS
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
            Three Steps. That&apos;s It.
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-xl mx-auto">
            No complicated tech. No hunting for leads. Just a simple system to get more jobs.
          </p>
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-14">
          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <div
                key={step.number}
                className="relative rounded-2xl border-2 border-[var(--color-foreground)] bg-white p-8 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all duration-300"
              >
                {/* Step number watermark */}
                <div
                  className="absolute top-6 right-6 text-[var(--color-foreground)]/10 font-black text-5xl select-none tabular-nums"
                  style={{ fontFamily: 'var(--font-heading)' }}
                  aria-hidden="true"
                >
                  {step.number}
                </div>
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center mb-5">
                  <Icon className="w-7 h-7 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-[var(--color-text-primary)] font-black text-xl mb-3 pr-8">{step.title}</h3>
                <p className="text-[var(--color-text-muted)] text-base leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <Link
            href={BOOKING_URL}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-[var(--color-accent)] text-white text-base font-black border-2 border-[var(--color-foreground)] shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200"
          >
            Book a Free Strategy Call
          </Link>
        </div>
      </div>
    </section>
  );
}
