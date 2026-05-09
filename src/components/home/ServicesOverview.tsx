import Link from 'next/link';
import { SERVICES } from '@/lib/constants';
import ServiceCard from '@/components/ui/ServiceCard';

export default function ServicesOverview() {
  const featuredServices = SERVICES.slice(0, 3);

  return (
    <section className="bg-[var(--color-background)] py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--color-accent-dim)] border-2 border-[var(--color-accent)]/20 font-mono text-xs font-black text-[var(--color-accent)] uppercase tracking-widest mb-4">
              THE STUFF WE BUILD
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--color-text-primary)] mb-3">
              What We Build
            </h2>
            <p className="text-[var(--color-text-muted)] text-lg max-w-lg">
              No fluff. No cookie-cutter templates. Just systems that actually bring in work.
            </p>
          </div>
          <Link
            href="/services"
            className="flex-shrink-0 inline-flex items-center gap-1 px-4 py-1.5 rounded-full border-2 border-[var(--color-accent)]/30 bg-[var(--color-accent-dim)] text-[var(--color-accent)] font-black text-sm hover:text-[var(--color-accent-hover)] transition-colors"
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
