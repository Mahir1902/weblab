import { Bot, Target, Zap, Search, Smartphone, Mail } from 'lucide-react';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';

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
    <section className="bg-[var(--color-surface)] border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            label="WHAT IS A SMART WEBSITE?"
            heading="More Than Just a Pretty Page"
            description="A Smart Website works around the clock, capturing leads, answering questions, and booking jobs while you focus on what you do best."
            centered
            className="max-w-2xl mx-auto"
          />
        </div>

        {/* Feature grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <FeatureCard
                key={feature.title}
                icon={<Icon className="w-6 h-6 text-[var(--color-accent)]" />}
                title={feature.title}
                description={feature.description}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}
