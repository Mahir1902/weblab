'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { BOOKING_URL, SITE_CONFIG } from '@/lib/constants';

const PHRASES = [
  'plumbers', 'electricians', 'builders', 'landscapers',
  'HVAC techs', 'painters', 'pool services', 'locksmiths',
];

function TypewriterText() {
  const [phraseIdx, setPhraseIdx] = useState(0);
  const [charIdx, setCharIdx]     = useState(0);
  const [deleting, setDeleting]   = useState(false);

  useEffect(() => {
    const current = PHRASES[phraseIdx];

    if (!deleting && charIdx < current.length) {
      const t = setTimeout(() => setCharIdx(c => c + 1), 65);
      return () => clearTimeout(t);
    }
    if (!deleting && charIdx === current.length) {
      const t = setTimeout(() => setDeleting(true), 1800);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx > 0) {
      const t = setTimeout(() => setCharIdx(c => c - 1), 30);
      return () => clearTimeout(t);
    }
    if (deleting && charIdx === 0) {
      setDeleting(false);
      setPhraseIdx(i => (i + 1) % PHRASES.length);
    }
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="font-mono text-sm text-[#6B7280]">
      for{' '}
      <span className="text-[#9CA3AF]">{PHRASES[phraseIdx].slice(0, charIdx)}</span>
      <span className="text-[#3B82F6] animate-pulse">|</span>
    </span>
  );
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
};

export default function AnimatedHero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A0A0A]"
    >

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase">
              [SYDNEY-BASED SOFTWARE AGENCY]
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-[#F9FAFB] leading-tight tracking-tight max-w-4xl"
          >
            {SITE_CONFIG.tagline.split('While You Sleep').map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span
                    style={{
                      background: 'linear-gradient(135deg, #3B82F6 0%, #60A5FA 50%, #93C5FD 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text',
                    }}
                  >
                    While You Sleep
                  </span>
                </span>
              ) : null
            )}
          </motion.h1>

          {/* Typewriter */}
          <motion.div variants={item}>
            <TypewriterText />
          </motion.div>

          {/* Subheadline */}
          <motion.p
            variants={item}
            className="text-lg sm:text-xl text-[#6B7280] max-w-2xl leading-relaxed font-normal"
          >
            We build smart websites, CRM automation, and lead capture systems
            for Sydney&apos;s local service businesses, so you book more jobs without working more hours.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href={BOOKING_URL}
              className="px-8 py-4 rounded-xl bg-[#3B82F6] text-white text-base font-semibold hover:bg-[#2563EB] hover:scale-105 transition-all duration-200 glow-blue-sm"
            >
              Book a Free Strategy Call
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 rounded-xl border border-[#1F2937] text-[#D1D5DB] text-base font-medium hover:border-[#3B82F6]/50 hover:text-[#F9FAFB] transition-all duration-200"
            >
              See What We Build
            </Link>
          </motion.div>

          {/* Social proof micro */}
          <motion.div
            variants={item}
            className="flex items-center gap-6 mt-4 text-sm text-[#6B7280]"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              No lock-in contracts
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Fully done-for-you
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-4 h-4 text-[#3B82F6]" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Sydney local
            </span>
          </motion.div>
        </motion.div>
      </div>

    </section>
  );
}
