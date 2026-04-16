import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 p-6 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] hover:border-[var(--color-accent)] transition-all duration-300">
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-[var(--color-accent-dim)] flex items-center justify-center text-[var(--color-accent)] flex-shrink-0 group-hover:bg-[var(--color-accent-dim)] transition-colors">
        {service.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-[var(--color-text-primary)] font-semibold text-lg leading-snug group-hover:text-[var(--color-accent)] transition-colors">
          {service.headline}
        </h3>
        <p className="text-[var(--color-text-muted)] text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Outcome badge */}
      <div className="mt-auto pt-3 border-t border-[var(--color-border)]">
        <span className="font-mono text-[10px] text-[var(--color-accent)] tracking-widest uppercase">
          [{service.outcome}]
        </span>
      </div>
    </div>
  );
}
