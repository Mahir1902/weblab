import Link from 'next/link';
import { BOOKING_URL } from '@/lib/constants';

interface BookingCTAProps {
  headline?: string;
  subtext?: string;
}

export default function BookingCTA({
  headline = 'Ready to Stop Losing Leads?',
  subtext = 'Book a free 30-minute strategy call. No pitch, no pressure. Just a clear plan for your business.',
}: BookingCTAProps) {
  return (
    <section className="bg-[#111111] border-t border-[#1F2937]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-[#F9FAFB] mb-4 leading-tight">
          {headline}
        </h2>
        <p className="text-[#9CA3AF] text-lg mb-8 max-w-xl mx-auto">
          {subtext}
        </p>
        <Link
          href={BOOKING_URL}
          className="inline-flex items-center px-8 py-4 rounded-xl bg-[#3B82F6] text-white text-base font-semibold hover:bg-[#2563EB] hover:scale-105 transition-all duration-200 glow-blue-sm"
        >
          Book a Free Strategy Call
        </Link>
        <p className="mt-4 text-xs text-[#6B7280]">No contracts. No pressure. Just results.</p>
      </div>
    </section>
  );
}
