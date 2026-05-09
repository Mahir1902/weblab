import { Bot, Target, Zap, Search, Smartphone, Mail } from 'lucide-react';

const features = [
  {
    icon: Bot,
    title: 'AI Chatbot',
    description: 'Instant customer support 24/7, captures leads and books appointments even at 2am.',
  },
  {
    icon: Target,
    title: 'Lead Capture Tools',
    description: 'Smart forms, pop-ups, and lead magnets convert anonymous visitors into real prospects.',
  },
  {
    icon: Mail,
    title: 'AI-Powered Follow-Up',
    description: 'Automated email and SMS sequences nurture leads without you lifting a finger.',
  },
  {
    icon: Search,
    title: 'SEO Optimised',
    description: 'Strategic keywords and on-page enhancements help you rank higher on Google.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Core Web Vitals optimised for speed, reducing bounce and improving rankings.',
  },
  {
    icon: Smartphone,
    title: 'Mobile Responsive',
    description: 'Looks and works perfectly on every screen size, from phone to desktop.',
  },
];

export default function SmartWebsiteFeatures() {
  return (
    <section className="bg-[var(--color-background)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-6">
            YOUR WEBSITE, BUT SMARTER
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-4 mt-2">
            Not Just a Website. A Lead Machine.
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Your site should be your hardest-working employee. Ours capture leads, answer questions, and book appointments while you&apos;re busy with clients.
          </p>
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="group rounded-2xl border-2 border-[var(--color-foreground)] bg-[var(--color-background)] p-6 shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-xl bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-[var(--color-text-primary)] font-black text-lg mb-2">{feature.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
