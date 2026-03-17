import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesOverview() {
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <section className="bg-[#111111] py-20 sm:py-28 border-y border-[#1F2937]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="font-mono text-xs text-[#3B82F6] tracking-widest uppercase mb-4 block">
              [WHAT WE BUILD]
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#F9FAFB] mb-3">
              What We Build
            </h2>
            <p className="text-[#9CA3AF] text-lg max-w-lg">
              Purpose-built systems for local service businesses, designed to bring in more work.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 text-[#3B82F6] font-medium text-sm hover:text-[#60A5FA] transition-colors inline-flex items-center gap-1"
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
