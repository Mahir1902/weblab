'use client';

/**
 * GHL Chatbot Widget Injection Point
 *
 * To enable the GoHighLevel chatbot:
 * 1. In GHL → Sites → Chat Widget, copy the embed script.
 * 2. Create a new file: src/components/GHLScripts.tsx
 * 3. Use next/script to inject the GHL script tag.
 * 4. Add <GHLScripts /> to src/app/layout.tsx.
 *
 * The chatbot widget will attach itself to the #chatbot-widget div below.
 */
export default function ChatbotPlaceholder() {
  return <div id="chatbot-widget" aria-hidden="true" />;
}
