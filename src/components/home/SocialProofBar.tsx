import { INDUSTRIES } from '@/lib/constants';

// Double the array so the CSS marquee loops seamlessly
const doubledIndustries = [...INDUSTRIES, ...INDUSTRIES];

export default function SocialProofBar() {
  return (
    <section
      className="border-y border-[var(--color-border)] bg-[var(--color-surface)] py-4 overflow-hidden"
      aria-label="Industries we serve"
    >
      <div className="relative">
        {/* Fade edges */}
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to right, var(--color-surface), transparent)' }}
          aria-hidden="true"
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: 'linear-gradient(to left, var(--color-surface), transparent)' }}
          aria-hidden="true"
        />

        <div className="flex marquee-track whitespace-nowrap" aria-hidden="true">
          {doubledIndustries.map((industry, index) => (
            <span
              key={index}
              className="inline-flex items-center gap-3 px-6 text-sm text-[var(--color-text-dim)] font-medium flex-shrink-0"
            >
              <span className="w-3 h-px bg-[var(--color-border)]" />
              {industry}
            </span>
          ))}
        </div>
      </div>
      <p className="sr-only">
        We work with: {INDUSTRIES.join(', ')}
      </p>
    </section>
  );
}
