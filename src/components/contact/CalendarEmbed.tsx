'use client';

import { useState } from 'react';
import Script from 'next/script';

/**
 * GHL Calendar Embed
 *
 * Renders the GoHighLevel booking calendar inside an iframe.
 * Uses next/script to load form_embed.js which auto-resizes the iframe.
 * Shows a pulse skeleton while the iframe loads.
 */
export default function CalendarEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative min-h-[600px]">
      {/* Skeleton loader — visible until iframe fires onLoad */}
      {!isLoaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 rounded-2xl bg-[var(--color-surface)] border-2 border-[var(--color-foreground)]">
          <div className="w-10 h-10 rounded-full border-3 border-[var(--color-accent)]/30 border-t-[var(--color-accent)] animate-spin" />
          <p className="text-sm text-[var(--color-text-dim)]">Loading calendar...</p>
        </div>
      )}

      {/* GHL Calendar iframe */}
      <iframe
        src="https://brand.webl4b.com/widget/booking/6cH0A9KcSjjIOvzbgYQE"
        title="Book a free strategy call with WebLab"
        className={`w-full border-none overflow-hidden transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '600px' }}
        scrolling="no"
        onLoad={() => setIsLoaded(true)}
      />

      {/* GHL auto-resize script */}
      <Script
        src="https://brand.webl4b.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
