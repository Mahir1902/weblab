import React from 'react';

interface FeatureCardProps {
  /** The icon element, already sized by the caller (w-6 h-6 is the convention) */
  icon: React.ReactNode;
  title: string;
  description: string;
  /**
   * Optional step number displayed as a decorative watermark in the top-right
   * corner (e.g. "01", "02"). When omitted the watermark is not rendered.
   */
  step?: string;
  /** Extra classes applied to the outermost card div */
  className?: string;
}

/**
 * Reusable feature/step card.
 *
 * Matches the card pattern used in SmartWebsiteFeatures, AutomationsSection,
 * and HowItWorks. The optional `step` prop reproduces the large watermark
 * number rendered in those two step-based sections.
 *
 * All colours and spacing come from globals.css design tokens.
 */
export default function FeatureCard({
  icon,
  title,
  description,
  step,
  className = '',
}: FeatureCardProps) {
  return (
    <div
      className={`relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/40 transition-all duration-300 group ${className}`.trim()}
    >
      {/* Decorative step-number watermark */}
      {step !== undefined && (
        <div
          className="absolute top-4 right-4 text-[var(--color-border)] font-bold text-3xl select-none tabular-nums font-syne"
          aria-hidden="true"
        >
          {step}
        </div>
      )}

      {/* Icon container */}
      <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-dim)] flex items-center justify-center mb-4">
        {icon}
      </div>

      {/* Text — extra right padding when step watermark is present to prevent overlap */}
      <h3 className={`text-[var(--color-text-primary)] font-semibold text-lg mb-2 ${step !== undefined ? 'pr-8' : ''}`}>
        {title}
      </h3>
      <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
}
