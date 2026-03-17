import type { Metadata } from 'next';
import HeroWrapper from '@/components/home/HeroWrapper';
import SmartWebsiteFeatures from '@/components/home/SmartWebsiteFeatures';
import ProblemSolution from '@/components/home/ProblemSolution';
import ServicesOverview from '@/components/home/ServicesOverview';
import AutomationsSection from '@/components/home/AutomationsSection';
import HowItWorks from '@/components/home/HowItWorks';
import MobileAppSection from '@/components/home/MobileAppSection';
import BookingCTA from '@/components/ui/BookingCTA';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'WebLab — Automation Software for Tradies & Service Businesses Sydney',
  description:
    'WebLab builds smart websites, CRM automation, missed call text-back, and lead capture systems for Sydney tradies and local service businesses. Book a free strategy call.',
  keywords: [
    'automation software for tradies Sydney',
    'missed call text back Sydney',
    'smart website for tradies Sydney',
    'CRM for service businesses',
    'lead automation Sydney',
    'software agency Sydney',
  ],
  openGraph: {
    title: 'WebLab — We Build Systems That Bring In Business While You Sleep',
    description:
      'Smart websites, CRM automation, and lead capture for Sydney tradies.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroWrapper />

      <AnimatedSection>
        <SmartWebsiteFeatures />
      </AnimatedSection>

      <AnimatedSection>
        <ProblemSolution />
      </AnimatedSection>

      <AnimatedSection>
        <ServicesOverview />
      </AnimatedSection>

      <AnimatedSection>
        <AutomationsSection />
      </AnimatedSection>

      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection>
        <MobileAppSection />
      </AnimatedSection>

      <AnimatedSection>
        <BookingCTA
          headline="Ready to Stop Losing Leads?"
          subtext="Join Sydney service businesses that have automated their lead flow with WebLab. Book a free 30-minute strategy call today."
        />
      </AnimatedSection>
    </>
  );
}
