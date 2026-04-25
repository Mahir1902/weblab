import React from 'react';
import Link from 'next/link';

interface CTAButtonProps {
  /** Destination URL — passed directly to Next.js <Link> */
  href: string;
  children: React.ReactNode;
  /** Additional Tailwind classes merged after the variant classes */
  className?: string;
  /** Visual style. Defaults to 'primary'. */
  variant?: 'primary' | 'secondary';
  /** Size preset. 'default' matches BookingCTA; 'sm' matches Navbar. */
  size?: 'default' | 'sm';
}

/**
 * Reusable CTA link-button.
 *
 * Wraps Next.js <Link> with consistent styling drawn entirely from design
 * tokens in globals.css @theme. Use `variant` for primary/secondary style and
 * `size` for default (BookingCTA-scale) vs sm (Navbar-scale).
 */
export default function CTAButton({
  href,
  children,
  className = '',
  variant = 'primary',
  size = 'default',
}: CTAButtonProps) {
  const base =
    'inline-flex items-center justify-center font-semibold transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2';

  const sizes = {
    default: 'px-8 py-4 rounded-xl text-base',
    sm: 'px-5 py-2.5 rounded-lg text-sm',
  };

  const variants = {
    primary:
      'bg-[var(--color-accent)] text-white hover:bg-[var(--color-accent-hover)] hover:scale-105 glow-blue-sm focus-visible:outline-white',
    secondary:
      'border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)]',
  };

  return (
    <Link
      href={href}
      className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}
