'use client';

import Script from 'next/script';

/**
 * GHL Chatbot Widget
 *
 * Loads the GoHighLevel chat widget script and provides its mount point.
 * The widget attaches itself to the DOM automatically once the script loads.
 */
export default function ChatbotPlaceholder() {
  return (
    <>
      <div id="chatbot-widget" aria-hidden="true" />
      <Script
        src="https://beta.leadconnectorhq.com/loader.js"
        data-resources-url="https://beta.leadconnectorhq.com/chat-widget/loader.js"
        data-widget-id="69fedb07ba1fce7577ed104f"
        strategy="afterInteractive"
      />
    </>
  );
}
