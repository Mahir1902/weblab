import { Users, TrendingUp, Send, Bot, Heart } from 'lucide-react';

const automations = [
  {
    icon: Users,
    title: 'Follow Up With Every Lead',
    description: 'Nobody falls through the cracks. Every new enquiry triggers an instant, personalised follow-up sequence automatically.',
    step: '01',
  },
  {
    icon: TrendingUp,
    title: 'Lead Scoring & Prioritisation',
    description: 'AI ranks your hottest prospects so you know exactly who to call first, no more guessing.',
    step: '02',
  },
  {
    icon: Send,
    title: 'Sales Follow-Up Sequences',
    description: 'Multi-step email and SMS cadences that run on autopilot, moving leads through your pipeline without you.',
    step: '03',
  },
  {
    icon: Bot,
    title: 'Instant Customer Support',
    description: 'AI chatbot answers FAQs, qualifies leads, and books appointments 24/7, even while you sleep.',
    step: '04',
  },
  {
    icon: Heart,
    title: 'Personalised Nurturing',
    description: 'Each lead gets relevant messages based on their behaviour and interests, building trust automatically.',
    step: '05',
  },
];

export default function AutomationsSection() {
  return (
    <section className="bg-[var(--color-bg)] border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <span className="font-mono text-xs text-[var(--color-accent)] tracking-widest uppercase mb-6 block">
            [AI AUTOMATIONS]
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--color-text-primary)] mb-4 mt-2">
            Your Sales Team, Running 24/7
          </h2>
          <p className="text-[var(--color-text-muted)] text-lg max-w-2xl mx-auto">
            Set it once and watch it work. Our AI automations handle follow-up, lead nurturing, and customer support, so you focus on delivering the work.
          </p>
        </div>

        {/* Staggered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((auto, index) => {
            const Icon = auto.icon;
            return (
              <div
                key={auto.step}
                className={`relative rounded-2xl border border-[var(--color-border)] bg-[var(--color-surface)] p-6 hover:border-[var(--color-accent)]/40 transition-all duration-300 ${
                  index === 4 ? 'md:col-span-2 lg:col-span-1' : ''
                }`}
              >
                {/* Step number */}
                <div className="absolute top-4 right-4 text-[var(--color-border)] font-bold text-3xl select-none tabular-nums" style={{ fontFamily: 'var(--font-syne)' }} aria-hidden="true">
                  {auto.step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-[var(--color-accent-dim)] flex items-center justify-center mb-4">
                  <Icon className="w-6 h-6 text-[var(--color-accent)]" />
                </div>
                <h3 className="text-[var(--color-text-primary)] font-semibold text-lg mb-2 pr-8">{auto.title}</h3>
                <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">{auto.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
