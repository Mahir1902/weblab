'use client';

import { Bell, MessageSquare, LayoutDashboard, Calendar, Star, Smartphone } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const appFeatures = [
  {
    icon: Bell,
    text: 'Instant push notifications the moment a new lead comes in',
  },
  {
    icon: MessageSquare,
    text: 'Respond via SMS, email, or call directly from your phone',
  },
  {
    icon: LayoutDashboard,
    text: 'View and manage your full CRM pipeline on the go',
  },
  {
    icon: Calendar,
    text: 'Drag leads between stages, assign tasks, book appointments',
  },
  {
    icon: Star,
    text: 'Monitor Google reviews and respond instantly',
  },
  {
    icon: Smartphone,
    text: 'Available on iOS and Android, included at no extra cost',
  },
];

export default function MobileAppSection() {

  const [mounted, setMounted] = useState(false);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 0);
    return () => clearTimeout(t);
  }, []);

  
  return (
    <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-6 block">
              [MANAGE EVERYTHING FROM YOUR PHONE]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4 mt-2">
              Your Business in Your Pocket
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
              The LeadConnector mobile app puts your entire CRM, inbox, and lead pipeline right in your hand, so you never miss an opportunity, even on the job.
            </p>
            <ul className="flex flex-col gap-4">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.text} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center mt-0.5">
                      <Icon className="w-4 h-4 text-[var(--color-accent)]" />
                    </div>
                    <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Phone frame */}
              <div className="relative w-64 h-[540px] rounded-[2rem] border-2 border-[var(--color-border)] bg-background shadow-2xl overflow-hidden flex flex-col">
                <Image src={mounted && resolvedTheme === 'light' ? '/mobile-light.PNG' : '/mobile-dark.png'} alt="WebLab CRM mobile app" fill className="object-cover object-top" sizes="256px" />
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
