'use client';

import dynamic from 'next/dynamic';

const AnimatedHero = dynamic(() => import('./AnimatedHero'), {
  ssr: false,
  loading: () => (
    <div
      className="min-h-screen bg-white flex items-center justify-center"
      aria-hidden="true"
    />
  ),
});

export default function HeroWrapper() {
  return <AnimatedHero />;
}
