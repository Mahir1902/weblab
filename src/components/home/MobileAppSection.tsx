import { Bell, MessageSquare, LayoutDashboard, Calendar, Star, Smartphone } from 'lucide-react';
import Image from 'next/image';

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
  return (
    <section className="bg-[var(--color-background)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Content */}
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
              YOUR BUSINESS, IN YOUR POCKET
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
              Run Everything From Your Phone
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg leading-relaxed mb-8">
              Check leads, reply to enquiries, and manage your pipeline from anywhere. The CRM app that actually fits in your pocket.
            </p>
            <ul className="flex flex-col gap-4">
              {appFeatures.map((feature) => {
                const Icon = feature.icon;
                return (
                  <li key={feature.text} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center mt-0.5">
                      <Icon className="w-5 h-5 text-[var(--color-accent)]" />
                    </div>
                    <span className="text-[var(--color-text-secondary)] text-sm leading-relaxed font-bold mt-2">{feature.text}</span>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Right: Phone mockup */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="absolute inset-0 bg-[var(--color-accent)]/20 rounded-[2.5rem] -rotate-6 scale-105 -z-10 border-2 border-[var(--color-foreground)]"></div>
              <div className="relative w-64 h-[520px] rounded-[2rem] border-4 border-[var(--color-foreground)] bg-white shadow-brutal-lg overflow-hidden flex flex-col">
                <Image src="/mobile-light.PNG" alt="WebLab CRM mobile app" fill className="object-cover object-top" sizes="256px" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
