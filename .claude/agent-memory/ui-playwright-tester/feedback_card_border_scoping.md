---
name: Scope card border tests to their parent section
description: document.querySelectorAll('.rounded-2xl') matches ALL cards sitewide — must scope to parent section to test only target cards
type: feedback
---

When testing card borders in a specific section (e.g. testimonial cards), always scope the selector to the parent section element first, then query descendants. Using `document.querySelectorAll('.rounded-2xl')` will match feature cards, service cards, and other neo-brutalist cards across the whole page — all of which legitimately have `border-2 border-[var(--color-border)]`.

Correct pattern:
```js
const section = document.querySelector('section.bg-[var(--color-accent)]'); // or aria-label, etc.
const cards = section.querySelectorAll('[class*="rounded-2xl"]');
```

**Why:** On the 2026-04-26 test, the broad selector caused false positives — SmartWebsiteFeatures and AutomationsSection cards (correct neo-brutalist styling) were being flagged as failures for the testimonials card check.

**How to apply:** Any time a test checks "cards within section X", always scope locators to that section's parent element before querying card children.
