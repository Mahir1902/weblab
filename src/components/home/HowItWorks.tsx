import { TrendingUp, UserCheck, Cpu, Shield } from 'lucide-react';
import { BOOKING_URL } from '@/lib/constants';
import SectionHeader from '@/components/ui/SectionHeader';
import FeatureCard from '@/components/ui/FeatureCard';
import CTAButton from '@/components/ui/CTAButton';

const steps = [
  {
    number: '01',
    title: 'Drive Organic Traffic',
    description:
      'Strategic keywords and SEO enhancements get your business ranking higher on Google, bringing in locals actively searching for your services.',
    Icon: TrendingUp,
  },
  {
    number: '02',
    title: 'Convert Visitors Into Leads',
    description:
      'Once they arrive, smart lead capture tools, chatbots, forms, and pop-ups, turn anonymous visitors into real prospects with their contact details.',
    Icon: UserCheck,
  },
  {
    number: '03',
    title: 'Automate Your Sales',
    description:
      'AI-driven chatbots and personalised automations follow up instantly, nurture prospects, and book jobs, all without you doing a thing.',
    Icon: Cpu,
  },
  {
    number: '04',
    title: 'Grow With Confidence',
    description:
      'A fast, mobile-responsive, well-designed website that builds trust and keeps working for you 24/7, your best salesperson that never sleeps.',
    Icon: Shield,
  },
];

export default function HowItWorks() {
  return (
    <section className="bg-background border-t border-[var(--color-border)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-14">
          <SectionHeader
            label="THE WEBLAB FUNNEL"
            heading="From Search to Booked Job"
            description="A proven four-step system that turns strangers into paying customers, automatically."
            centered
            className="max-w-xl mx-auto"
          />
        </div>

        {/* Steps grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-14">
          {steps.map((step) => {
            const Icon = step.Icon;
            return (
              <FeatureCard
                key={step.number}
                icon={<Icon className="w-6 h-6 text-[var(--color-accent)]" />}
                title={step.title}
                description={step.description}
                step={step.number}
              />
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center">
          <CTAButton href={BOOKING_URL}>
            Book a Free Strategy Call
          </CTAButton>
        </div>
      </div>
    </section>
  );
}
