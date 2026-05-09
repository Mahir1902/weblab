import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
  basePath?: string;
}

export default function ServiceCard({ service, basePath = '/services' }: ServiceCardProps) {
  return (
    <Link href={`${basePath}/${service.id}`} className="block">
      <div className="group relative flex flex-col gap-4 p-6 rounded-2xl bg-white border-2 border-[var(--color-foreground)] shadow-brutal hover:-translate-y-0.5 hover:shadow-brutal-lg transition-all duration-300">
        {/* Icon */}
        <div className="w-14 h-14 rounded-xl border-2 border-[var(--color-accent)]/20 bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] flex-shrink-0">
          {service.icon}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-2 flex-1">
          <h3 className="text-[var(--color-text-primary)] font-black text-lg leading-snug group-hover:text-[var(--color-accent)] transition-colors">
            {service.headline}
          </h3>
          <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Outcome badge */}
        <div className="mt-auto pt-3 border-t-2 border-[var(--color-foreground)]/10">
          <span className="font-mono text-[10px] font-black text-[var(--color-accent)] tracking-widest uppercase">
            {service.outcome}
          </span>
        </div>

        {/* Learn more indicator */}
        <span className="text-[var(--color-accent)] text-xs font-bold flex items-center gap-1 mt-2">
          Learn more <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </Link>
  );
}
