import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/ui/ServiceCard';
import SectionHeader from '@/components/ui/SectionHeader';

export default function ServicesOverview() {
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <section className="bg-[var(--color-surface)] py-20 sm:py-28 border-y border-[var(--color-border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <SectionHeader
            label="OUR SERVICES"
            heading="What We Build"
            description="Purpose-built systems for local service businesses, designed to bring in more work."
            className="max-w-lg"
          />
          <Link
            href="/services"
            className="flex-shrink-0 text-[var(--color-accent)] font-medium text-sm hover:text-[var(--color-accent-hover)] transition-colors inline-flex items-center gap-1"
          >
            See all 6 services
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredServices.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </div>
    </section>
  );
}
