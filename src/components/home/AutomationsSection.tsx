import { Users, TrendingUp, Send, Bot, Heart } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';

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
    <section className="bg-background border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            label="AI AUTOMATIONS"
            heading="Your Sales Team, Running 24/7"
            description="Set it once and watch it work. Our AI automations handle follow-up, lead nurturing, and customer support, so you focus on delivering the work."
            centered
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Staggered cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {automations.map((auto, index) => {
            const Icon = auto.icon;
            return (
              <FeatureCard
                key={auto.step}
                icon={<Icon className="w-6 h-6 text-[var(--color-accent)]" />}
                title={auto.title}
                description={auto.description}
                step={auto.step}
                className={index === 4 ? 'md:col-span-2 lg:col-span-1' : ''}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
