import type { Metadata } from 'next';
import HeroWrapper from '@/components/home/HeroWrapper';
import IndustryBar from '@/components/home/IndustryBar';
import SmartWebsiteFeatures from '@/components/home/SmartWebsiteFeatures';
import ProblemSolution from '@/components/home/ProblemSolution';
import ServicesOverview from '@/components/home/ServicesOverview';
import AutomationsSection from '@/components/home/AutomationsSection';
import TestimonialsSection from '@/components/home/TestimonialsSection';
import HowItWorks from '@/components/home/HowItWorks';
import MobileAppSection from '@/components/home/MobileAppSection';
import BookingCTA from '@/components/ui/BookingCTA';
import AnimatedSection from '@/components/ui/AnimatedSection';

export const metadata: Metadata = {
  title: 'WebLab — Automation Software for Service Businesses Sydney',
  description:
    'WebLab builds smart websites, CRM automation, missed call text-back, and lead capture systems for local service businesses across Sydney. Book a free strategy call.',
  keywords: [
    'automation software for service businesses Sydney',
    'missed call text back Sydney',
    'smart website for service businesses Sydney',
    'CRM for service businesses',
    'lead automation Sydney',
    'software agency Sydney',
  ],
  openGraph: {
    title: 'WebLab — We Build Systems That Bring In Business While You Sleep',
    description:
      'Smart websites, CRM automation, and lead capture for Sydney service businesses.',
  },
};

export default function HomePage() {
  return (
    <>
      <HeroWrapper />
      <IndustryBar />

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
        <TestimonialsSection />
      </AnimatedSection>

      <AnimatedSection>
        <HowItWorks />
      </AnimatedSection>

      <AnimatedSection>
        <MobileAppSection />
      </AnimatedSection>

      <AnimatedSection>
        <BookingCTA
          headline="Ready to Stop Leaving Money on the Table?"
          subtext="Sydney service businesses are booking more jobs and working fewer hours with WebLab. Grab a free 30-minute strategy call."
        />
      </AnimatedSection>
    </>
  );
}
