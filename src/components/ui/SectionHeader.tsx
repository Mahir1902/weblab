import React from 'react';

interface SectionHeaderProps {
  /** The bracketed mono label above the heading (e.g. "WHAT WE BUILD") */
  label: string;
  /** The h2 content — accepts ReactNode to allow inline JSX like <span> */
  heading: React.ReactNode;
  /** Optional supporting paragraph beneath the heading */
  description?: string;
  /** When true, centre-aligns all text. Defaults to false. */
  centered?: boolean;
  /** Extra classes applied to the wrapper div */
  className?: string;
}

/**
 * Reusable section header pattern.
 *
 * Reproduces the mono label → h2 → optional description stack used across
 * every section on the site. All tokens come from globals.css @theme so the
 * component respects light/dark mode automatically.
 */
export default function SectionHeader({
  label,
  heading,
  description,
  centered = false,
  className = '',
}: SectionHeaderProps) {
  const alignment = centered ? 'text-center' : '';

  return (
    <div className={`${alignment} ${className}`.trim()}>
      <span className="section-label mb-6 block">
        [{label}]
      </span>
      <h2 className="section-heading text-text-primary mb-4 mt-2">
        {heading}
      </h2>
      {description && (
        <p className={`section-body ${centered ? 'mx-auto' : ''}`}>
          {description}
        </p>
      )}
    </div>
  );
}
