---
name: Playwright strict mode — scope locators to section
description: Text locators fail strict mode when the same string appears in nav links, headings, and body text simultaneously. Always scope to the containing section element.
type: feedback
---

When writing Playwright assertions for homepage sections, simple `page.locator('text=...')` calls frequently trigger strict mode violations because text like "Book a Call", "Automated Follow-Up", "AI Chatbot" etc. appears in multiple contexts (nav bar CTAs, section headings, body paragraphs, blockquotes).

**Pattern that works:** Scope to the `section` element first, then use role-based selectors inside it.

```ts
const crmSection = page.locator('section').filter({ hasText: 'Ditch the 5 Apps. Use One.' });
await expect(crmSection.getByRole('heading', { name: 'Missed-Call Text Back' })).toBeVisible();

const howItWorksSection = page.locator('section').filter({ hasText: "Three Steps. That's It." });
await expect(howItWorksSection.getByRole('heading', { name: 'Book a Call' })).toBeVisible();
```

**Why:** The homepage has multiple sections each with overlapping vocabulary (booking CTAs in both nav and step cards, "follow-up" appears in SmartWebsiteFeatures AND AutomationsSection descriptions AND testimonial blockquotes). Strict mode is the right Playwright default — fix the locator rather than disabling strict mode.

**How to apply:** Any time a text locator is written for this project's homepage components, wrap it in a `section.filter()` + `getByRole('heading')` pattern.
