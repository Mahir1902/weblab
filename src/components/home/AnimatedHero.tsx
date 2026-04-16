'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useTheme } from 'next-themes';
import { BOOKING_URL, SITE_CONFIG } from '@/lib/constants';

// ─── Types ────────────────────────────────────────────────────────────────────

type Point = { x: number; y: number };

interface WaveConfig {
  offset: number;
  amplitude: number;
  frequency: number;
  color: string;
  opacity: number;
}

// ─── Wave palettes ────────────────────────────────────────────────────────────

const DARK_WAVES: WaveConfig[] = [
  { offset: 0,              amplitude: 70, frequency: 0.003,  color: 'rgba(59,130,246,0.9)',  opacity: 0.40 },
  { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, color: 'rgba(99,102,241,0.85)', opacity: 0.32 },
  { offset: Math.PI,        amplitude: 60, frequency: 0.0034, color: 'rgba(96,165,250,0.8)',  opacity: 0.28 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: 'rgba(147,197,253,0.6)', opacity: 0.22 },
  { offset: Math.PI * 2,   amplitude: 55, frequency: 0.004,  color: 'rgba(37,99,235,0.7)',   opacity: 0.18 },
];

const LIGHT_WAVES: WaveConfig[] = [
  { offset: 0,              amplitude: 70, frequency: 0.003,  color: 'rgba(37,99,235,0.7)',   opacity: 0.50 },
  { offset: Math.PI / 2,   amplitude: 90, frequency: 0.0026, color: 'rgba(67,56,202,0.65)',  opacity: 0.42 },
  { offset: Math.PI,        amplitude: 60, frequency: 0.0034, color: 'rgba(29,78,216,0.6)',   opacity: 0.38 },
  { offset: Math.PI * 1.5, amplitude: 80, frequency: 0.0022, color: 'rgba(79,70,229,0.55)',  opacity: 0.30 },
  { offset: Math.PI * 2,   amplitude: 55, frequency: 0.004,  color: 'rgba(37,99,235,0.5)',   opacity: 0.24 },
];

// ─── Framer Motion variants ───────────────────────────────────────────────────

const EASE_OUT = [0.25, 0.46, 0.45, 0.94] as [number, number, number, number];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.6, ease: EASE_OUT } },
};

// ─── Typewriter ───────────────────────────────────────────────────────────────

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
      const t = setTimeout(() => {
        setDeleting(false);
        setPhraseIdx(i => (i + 1) % PHRASES.length);
      }, 0);
      return () => clearTimeout(t);
    }
  }, [charIdx, deleting, phraseIdx]);

  return (
    <span className="font-mono text-sm text-text-dim">
      for{' '}
      <span className="text-text-muted">{PHRASES[phraseIdx].slice(0, charIdx)}</span>
      <span className="text-accent animate-pulse">|</span>
    </span>
  );
}

// ─── Canvas wave background ───────────────────────────────────────────────────

function WaveCanvas({ isDarkRef }: { isDarkRef: React.RefObject<boolean> }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef  = useRef<Point>({ x: 0, y: 0 });
  const targetRef = useRef<Point>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId: number;
    let time = 0;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const mouseInfluence  = prefersReducedMotion ? 0   : 70;
    const influenceRadius = prefersReducedMotion ? 1   : 320;
    const smoothing       = prefersReducedMotion ? 1   : 0.1;

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      const c = { x: canvas.width / 2, y: canvas.height / 2 };
      mouseRef.current  = { ...c };
      targetRef.current = { ...c };
    };

    const onMouseMove  = (e: MouseEvent) => { targetRef.current = { x: e.clientX, y: e.clientY }; };
    const onMouseLeave = () => { targetRef.current = { x: canvas.width / 2, y: canvas.height / 2 }; };

    resize();
    window.addEventListener('resize',     resize);
    window.addEventListener('mousemove',  onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);

    const drawWave = (wave: WaveConfig) => {
      ctx.save();
      ctx.beginPath();

      for (let x = 0; x <= canvas.width; x += 4) {
        const dx      = x - mouseRef.current.x;
        const dy      = canvas.height / 2 - mouseRef.current.y;
        const dist    = Math.sqrt(dx * dx + dy * dy);
        const infl    = Math.max(0, 1 - dist / influenceRadius);
        const mEffect = infl * mouseInfluence * Math.sin(time * 0.001 + x * 0.01 + wave.offset);

        const y =
          canvas.height / 2 +
          Math.sin(x * wave.frequency + time * 0.002 + wave.offset) * wave.amplitude +
          Math.sin(x * wave.frequency * 0.4 + time * 0.003)         * (wave.amplitude * 0.45) +
          mEffect;

        if (x === 0) { ctx.moveTo(x, y); } else { ctx.lineTo(x, y); }
      }

      ctx.lineWidth   = 2.5;
      ctx.strokeStyle = wave.color;
      ctx.globalAlpha = wave.opacity;
      ctx.shadowBlur  = 40;
      ctx.shadowColor = wave.color;
      ctx.stroke();
      ctx.restore();
    };

    const animate = () => {
      if (!prefersReducedMotion) time += 1;

      mouseRef.current.x += (targetRef.current.x - mouseRef.current.x) * smoothing;
      mouseRef.current.y += (targetRef.current.y - mouseRef.current.y) * smoothing;

      const isDark = isDarkRef.current;
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      if (isDark) {
        grad.addColorStop(0, '#0A0A0A');
        grad.addColorStop(1, '#0D0D16');
      } else {
        grad.addColorStop(0, '#FFFFFF');
        grad.addColorStop(1, '#EFF6FF');
      }
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.globalAlpha = 1;
      ctx.shadowBlur  = 0;

      const palette = isDark ? DARK_WAVES : LIGHT_WAVES;
      palette.forEach(drawWave);

      rafId = window.requestAnimationFrame(animate);
    };

    rafId = window.requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize',     resize);
      window.removeEventListener('mousemove',  onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isDarkRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function AnimatedHero() {
  const { resolvedTheme } = useTheme();
  const isDarkRef = useRef(true);
  isDarkRef.current = resolvedTheme !== 'light';

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      <WaveCanvas isDarkRef={isDarkRef} />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 text-center">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={item}>
            <span className="font-mono text-xs text-accent tracking-widest uppercase">
              [SYDNEY-BASED SOFTWARE AGENCY]
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={item}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-tight tracking-tight max-w-4xl"
          >
            {SITE_CONFIG.tagline.split('While You Sleep').map((part, i) =>
              i === 0 ? (
                <span key={i}>
                  {part}
                  <span className="gradient-text">While You Sleep</span>
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
            className="text-lg sm:text-xl text-text-muted max-w-2xl leading-relaxed font-normal"
          >
            We build smart websites, CRM automation, and lead capture systems
            for Sydney&apos;s local service businesses, so you book more jobs without working more hours.
          </motion.p>

          {/* CTAs */}
          <motion.div variants={item} className="flex flex-col sm:flex-row items-center gap-4 mt-2">
            <Link
              href={BOOKING_URL}
              className="px-8 py-4 rounded-xl bg-accent text-white text-base font-semibold hover:bg-accent-hover hover:scale-105 transition-all duration-200 glow-blue-sm"
            >
              Book a Free Strategy Call
            </Link>
            <Link
              href="/services"
              className="px-8 py-4 rounded-xl border border-border text-text-secondary text-base font-medium hover:border-accent/50 hover:text-text-primary transition-all duration-200"
            >
              See What We Build
            </Link>
          </motion.div>

          {/* Social proof micro */}
          <motion.div
            variants={item}
            className="flex items-center gap-6 mt-4 text-sm text-text-muted"
          >
            {['No lock-in contracts', 'Fully done-for-you', 'Sydney local'].map((label) => (
              <span key={label} className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-accent" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                {label}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
