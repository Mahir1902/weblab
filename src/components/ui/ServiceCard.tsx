import type { Service } from '@/types';

interface ServiceCardProps {
  service: Service;
}

export default function ServiceCard({ service }: ServiceCardProps) {
  return (
    <div className="group relative flex flex-col gap-4 p-6 rounded-xl bg-[#111111] border border-[#1F2937] hover:border-[#3B82F6] transition-all duration-300">
      {/* Icon */}
      <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center text-[#3B82F6] flex-shrink-0 group-hover:bg-[#3B82F6]/20 transition-colors">
        {service.icon}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-[#F9FAFB] font-semibold text-lg leading-snug group-hover:text-[#3B82F6] transition-colors">
          {service.headline}
        </h3>
        <p className="text-[#9CA3AF] text-sm leading-relaxed">
          {service.description}
        </p>
      </div>

      {/* Outcome badge */}
      <div className="mt-auto pt-3 border-t border-[#1F2937]">
        <span className="font-mono text-[10px] text-[#3B82F6] tracking-widest uppercase">
          [{service.outcome}]
        </span>
      </div>
    </div>
  );
}
