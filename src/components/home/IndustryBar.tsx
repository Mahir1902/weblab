// Static industry bar — sits directly below the hero section.
// Lists the service business verticals WebLab serves, with simple
// stroke-based SVG icons and centered layout.

import type { JSX } from 'react';

// ─── Inline SVG icons (24 × 24, stroke only, currentColor) ───────────────────

const WrenchIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
  </svg>
);

const ZapIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
  </svg>
);

const PaletteIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <circle cx="13.5" cy="6.5" r="1" />
    <circle cx="17.5" cy="10.5" r="1" />
    <circle cx="8.5" cy="7.5" r="1" />
    <circle cx="6.5" cy="12.5" r="1" />
    <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.926 0 1.648-.746 1.648-1.688 0-.437-.18-.835-.437-1.125-.29-.289-.438-.652-.438-1.125a1.64 1.64 0 0 1 1.668-1.668h1.996c3.051 0 5.555-2.503 5.555-5.554C21.965 6.012 17.461 2 12 2z" />
  </svg>
);

const LeafIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
  </svg>
);

const SparklesIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 3l1.5 4.5L18 9l-4.5 1.5L12 15l-1.5-4.5L6 9l4.5-1.5z" />
    <path d="M5 3l.75 2.25L8 6l-2.25.75L5 9l-.75-2.25L2 6l2.25-.75z" />
    <path d="M19 15l.75 2.25L22 18l-2.25.75L19 21l-.75-2.25L16 18l2.25-.75z" />
  </svg>
);

const PawIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="4" r="2" />
    <circle cx="4.5" cy="9" r="2" />
    <circle cx="17.5" cy="9" r="2" />
    <path d="M8 14.5c0-2.5 2-4.5 4-4.5s4 2 4 4.5c0 2.5-2 4.5-4 4.5s-4-2-4-4.5z" />
  </svg>
);

const SprayCanIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M3 3h2l1 5H3z" />
    <path d="M6 8h6v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2z" />
    <path d="M9 8V6" />
    <path d="M13 4h4" />
    <path d="M13 6h4" />
    <path d="M17 4v4" />
  </svg>
);

// ─── Featured industries data ─────────────────────────────────────────────────

interface Industry {
  name: string;
  icon: JSX.Element;
}

const FEATURED_INDUSTRIES: Industry[] = [
  { name: 'Plumbers',          icon: <WrenchIcon /> },
  { name: 'Electricians',      icon: <ZapIcon /> },
  { name: 'Interior Design',   icon: <PaletteIcon /> },
  { name: 'Landscapers',       icon: <LeafIcon /> },
  { name: 'Beauty & Wellness', icon: <SparklesIcon /> },
  { name: 'Pet Grooming',      icon: <PawIcon /> },
  { name: 'Cleaning Services', icon: <SprayCanIcon /> },
];

// ─── Component ────────────────────────────────────────────────────────────────

export default function IndustryBar() {
  return (
    <section
      aria-label="Industries we serve"
      className="bg-[var(--color-accent-surface)] py-8 sm:py-10"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <p className="text-center text-xs sm:text-sm font-black uppercase tracking-[0.2em] text-[var(--color-accent)] mb-6">
          Trusted by Service Professionals
        </p>

        {/* Industry list */}
        <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-4 sm:gap-x-12">
          {FEATURED_INDUSTRIES.map(({ name, icon }) => (
            <span
              key={name}
              className="group inline-flex items-center gap-2 text-sm sm:text-base font-bold text-[var(--color-text-muted)] transition-all duration-300 hover:-translate-y-0.5 hover:text-[var(--color-text-primary)] cursor-default"
            >
              <span className="text-[var(--color-accent)] transition-transform duration-300 group-hover:scale-110">{icon}</span>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
