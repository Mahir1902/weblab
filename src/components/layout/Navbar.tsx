'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { NAV_LINKS, BOOKING_URL, SERVICES, FEATURES, ANIMATION } from '@/lib/constants';
import type { Service } from '@/types';

// Lookup map: nav link href → dropdown items array
// Both Service and Feature share the same shape (Feature = Service in types/index.ts)
const DROPDOWN_ITEMS: Record<string, Service[]> = {
  '/services': SERVICES,
  '/features': FEATURES,
};

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  // openDropdown holds the href of whichever desktop dropdown is open, or null
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  // mobileAccordionOpen holds the href of whichever mobile accordion is open, or null
  const [mobileAccordionOpen, setMobileAccordionOpen] = useState<string | null>(null);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu and sub-accordion on route change
  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setMenuOpen(false);
    setMobileAccordionOpen(null);
  }

  // Scroll detection
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Cleanup pending dropdown timeout on unmount
  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  const handleDropdownEnter = (href: string) => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
    }
    setOpenDropdown(href);
  };

  const handleDropdownLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b-2 border-[var(--color-foreground)] ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md'
          : 'bg-white'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo-light.png"
            alt="WebLab"
            width={220}
            height={56}
            className="h-[3.4rem] w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.children != null && pathname.startsWith(link.href + '/'));

            if (link.children != null) {
              const isOpen = openDropdown === link.href;
              const dropdownItems = DROPDOWN_ITEMS[link.href] ?? [];

              return (
                <li key={link.href} className="relative">
                  {/* Hover zone wraps both the trigger and the panel */}
                  <div
                    onMouseEnter={() => handleDropdownEnter(link.href)}
                    onMouseLeave={handleDropdownLeave}
                  >
                    {/* Trigger */}
                    <Link
                      href={link.href}
                      className={`flex items-center gap-1 text-sm font-bold transition-colors duration-200 ${
                        isActive
                          ? 'text-[var(--color-accent)] font-black'
                          : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'
                      }`}
                      aria-haspopup="true"
                      aria-expanded={isOpen}
                    >
                      {link.label}
                      <motion.span
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{
                          duration: ANIMATION.duration.fast,
                          ease: ANIMATION.ease.easeOut,
                        }}
                        className="flex items-center"
                      >
                        <ChevronDown className="w-3.5 h-3.5" />
                      </motion.span>
                    </Link>

                    {/* Dropdown panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{
                            duration: ANIMATION.duration.fast,
                            ease: ANIMATION.ease.easeOut,
                          }}
                          className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-[280px] p-2 bg-white border-2 border-[var(--color-foreground)] rounded-2xl shadow-brutal z-50"
                          role="menu"
                          aria-label={`${link.label} submenu`}
                        >
                          {/* Map over the correct items for this nav link */}
                          {dropdownItems.map((item) => (
                            <Link
                              key={item.id}
                              href={`${link.href}/${item.id}`}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className="group flex items-center gap-3 px-3 py-2.5 rounded-xl transition-colors hover:bg-[var(--color-accent-dim)]"
                            >
                              <span className="w-8 h-8 flex items-center justify-center rounded-lg bg-[var(--color-accent-dim)] text-[var(--color-accent)] shrink-0">
                                {item.icon}
                              </span>
                              <span className="text-sm font-bold text-[var(--color-text-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-150">
                                {item.headline}
                              </span>
                            </Link>
                          ))}

                          {/* View All {label} link */}
                          <div className="mt-1 pt-1 border-t-2 border-[var(--color-border-subtle)]">
                            <Link
                              href={link.href}
                              role="menuitem"
                              onClick={() => setOpenDropdown(null)}
                              className="flex items-center justify-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-black text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors"
                            >
                              View All {link.label}
                              <ChevronDown className="w-3.5 h-3.5 -rotate-90" />
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </li>
              );
            }

            // Regular nav link (no children)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`text-sm font-bold transition-colors duration-200 ${
                    isActive
                      ? 'text-[var(--color-accent)] font-black'
                      : 'text-[var(--color-text-muted)] hover:text-[var(--color-accent)]'
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center">
          <Link
            href={BOOKING_URL}
            className="px-6 py-2.5 rounded-xl bg-[var(--color-accent)] text-white text-sm font-black border-2 border-[var(--color-foreground)] shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200"
          >
            Book a Call
          </Link>
        </div>

        {/* Mobile hamburger */}
        <div className="md:hidden flex items-center">
          <button
            className="flex flex-col gap-1.5 p-2 rounded-md hover:bg-[var(--color-surface)] transition-colors"
            onClick={() => {
              const nextOpen = !menuOpen;
              setMenuOpen(nextOpen);
              // Reset accordion when closing the menu
              if (!nextOpen) setMobileAccordionOpen(null);
            }}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={menuOpen}
          >
            <span
              className={`block w-5 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-300 ${
                menuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--color-text-primary)] transition-opacity duration-300 ${
                menuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-[var(--color-text-primary)] transition-transform duration-300 ${
                menuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: ANIMATION.ease.easeInOut }}
            className="md:hidden overflow-hidden bg-white border-b-2 border-[var(--color-foreground)]"
          >
            <motion.ul
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.07 } },
                closed: {},
              }}
              className="px-4 py-4 flex flex-col gap-1"
            >
              {NAV_LINKS.map((link) => {
                const isActive =
                  pathname === link.href ||
                  (link.children != null &&
                    pathname.startsWith(link.href + '/'));

                if (link.children != null) {
                  const isExpanded = mobileAccordionOpen === link.href;
                  const dropdownItems = DROPDOWN_ITEMS[link.href] ?? [];

                  return (
                    <motion.li
                      key={link.href}
                      variants={{
                        open: { opacity: 1, x: 0 },
                        closed: { opacity: 0, x: -16 },
                      }}
                    >
                      {/* Toggle button for the accordion */}
                      <button
                        onClick={() =>
                          setMobileAccordionOpen(
                            (prev) => (prev === link.href ? null : link.href)
                          )
                        }
                        className={`w-full flex items-center justify-between px-3 py-3 rounded-xl text-base font-bold transition-colors ${
                          isActive
                            ? 'text-[var(--color-accent)] bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20'
                            : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                        }`}
                      >
                        {link.label}
                        <motion.span
                          animate={{ rotate: isExpanded ? 180 : 0 }}
                          transition={{
                            duration: ANIMATION.duration.fast,
                            ease: ANIMATION.ease.easeOut,
                          }}
                          className="flex items-center"
                        >
                          <ChevronDown className="w-4 h-4" />
                        </motion.span>
                      </button>

                      {/* Mobile accordion panel */}
                      <AnimatePresence>
                        {isExpanded && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: ANIMATION.duration.fast,
                              ease: ANIMATION.ease.easeInOut,
                            }}
                            className="overflow-hidden"
                          >
                            <motion.ul
                              initial="closed"
                              animate="open"
                              exit="closed"
                              variants={{
                                open: {
                                  transition: { staggerChildren: 0.05 },
                                },
                                closed: {},
                              }}
                              className="pl-4 pt-1 pb-1 flex flex-col gap-0.5"
                            >
                              {/* View All {label} at top */}
                              <motion.li
                                variants={{
                                  open: { opacity: 1, x: 0 },
                                  closed: { opacity: 0, x: -12 },
                                }}
                              >
                                <Link
                                  href={link.href}
                                  onClick={() => {
                                    setMenuOpen(false);
                                    setMobileAccordionOpen(null);
                                  }}
                                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-black text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors"
                                >
                                  View All {link.label}
                                </Link>
                              </motion.li>

                              {/* Individual item links */}
                              {dropdownItems.map((item) => (
                                <motion.li
                                  key={item.id}
                                  variants={{
                                    open: { opacity: 1, x: 0 },
                                    closed: { opacity: 0, x: -12 },
                                  }}
                                >
                                  <Link
                                    href={`${link.href}/${item.id}`}
                                    onClick={() => {
                                      setMenuOpen(false);
                                      setMobileAccordionOpen(null);
                                    }}
                                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-dim)] transition-colors"
                                  >
                                    <span className="w-6 h-6 flex items-center justify-center rounded-md bg-[var(--color-accent-dim)] text-[var(--color-accent)] shrink-0 text-xs">
                                      {item.icon}
                                    </span>
                                    {item.headline}
                                  </Link>
                                </motion.li>
                              ))}
                            </motion.ul>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.li>
                  );
                }

                // Regular mobile link (no children)
                return (
                  <motion.li
                    key={link.href}
                    variants={{
                      open: { opacity: 1, x: 0 },
                      closed: { opacity: 0, x: -16 },
                    }}
                  >
                    <Link
                      href={link.href}
                      className={`block px-3 py-3 rounded-xl text-base font-bold transition-colors ${
                        isActive
                          ? 'text-[var(--color-accent)] bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20'
                          : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface)]'
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.li>
                );
              })}

              {/* Book a Call CTA */}
              <motion.li
                variants={{
                  open: { opacity: 1, x: 0 },
                  closed: { opacity: 0, x: -16 },
                }}
                className="mt-2"
              >
                <Link
                  href={BOOKING_URL}
                  className="block w-full text-center px-5 py-3 rounded-xl bg-[var(--color-accent)] text-white font-black border-2 border-[var(--color-foreground)] shadow-brutal hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all duration-200"
                >
                  Book a Call
                </Link>
              </motion.li>
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
