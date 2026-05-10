'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Script from 'next/script';

/**
 * GHL Calendar Embed
 *
 * Renders the GoHighLevel booking calendar inside an iframe.
 * Loads form_embed.js for auto-resize, PLUS a manual postMessage listener
 * as a fallback — because next/script deduplicates scripts and won't
 * re-execute form_embed.js on client-side navigations (Next.js <Link>).
 */

const GHL_ORIGIN = 'https://brand.webl4b.com';

export default function CalendarEmbed() {
  const [isLoaded, setIsLoaded] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  /**
   * Manual postMessage listener for iframe resize.
   *
   * GHL's form_embed.js sends postMessage events with height data.
   * On client-side navigation, form_embed.js may not re-initialize,
   * so this listener ensures resize always works.
   */
  const handleMessage = useCallback((event: MessageEvent) => {
    if (event.origin !== GHL_ORIGIN) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    // GHL sends various message formats for resize
    try {
      const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

      if (data.height || data.scrollHeight) {
        const height = data.height || data.scrollHeight;
        iframe.style.height = `${height}px`;
      }
    } catch {
      // Non-JSON message or unrelated — ignore
    }
  }, []);

  useEffect(() => {
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleMessage]);

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
        ref={iframeRef}
        src="https://brand.webl4b.com/widget/booking/6cH0A9KcSjjIOvzbgYQE"
        title="Book a free strategy call with WebLab"
        className={`w-full border-none transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ minHeight: '600px' }}
        onLoad={() => setIsLoaded(true)}
      />

      {/* GHL auto-resize script — primary handler on full page loads */}
      <Script
        src="https://brand.webl4b.com/js/form_embed.js"
        strategy="afterInteractive"
      />
    </div>
  );
}
