'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqAccordionProps {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: FaqAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <dl>
      {items.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`border-b border-[#1F2937] transition-all duration-200 ${i === 0 ? 'border-t' : ''} ${isOpen ? 'border-l-2 border-l-[#3B82F6] pl-4' : ''}`}
          >
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="flex items-center justify-between gap-4 w-full py-5 cursor-pointer text-left"
              aria-expanded={isOpen}
            >
              <dt className="text-base font-semibold text-[#F9FAFB]">{item.q}</dt>
              <motion.span
                animate={{ rotate: isOpen ? 45 : 0 }}
                transition={{ duration: 0.2 }}
                className="text-[#3B82F6] text-xl font-light flex-shrink-0"
                aria-hidden="true"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  key="answer"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.42, 0, 0.58, 1] }}
                  className="overflow-hidden"
                >
                  <dd className="pb-5 text-[#9CA3AF] text-sm leading-relaxed">{item.a}</dd>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </dl>
  );
}
