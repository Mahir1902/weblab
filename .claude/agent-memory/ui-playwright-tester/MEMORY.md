# UI Playwright Tester — Agent Memory

- [AnimatedHero is dark-only](project_animatedhero_darkonly.md) — Hero section hardcodes dark colors; does not respond to theme switching
- [Booking URL empty string bug](project_booking_url_empty.md) — CTAButton href="" even with NEXT_PUBLIC_BOOKING_URL=#book-a-call; Next.js Link + hash-only hrefs suspect
- [GHL form replaced with custom RHF form](project_ghl_form_embed.md) — Contact page now uses native form (firstName/lastName/phone/email/message); no GHL embeds remain (commit 3f46ac2)
- [--color-bg is an undefined token](project_color_bg_token.md) — services/about/contact/layout use bg-[var(--color-bg)] but token doesn't exist; correct is bg-background
- [Port 3000 conflict](feedback_port_conflict.md) — Another app occupies port 3000; always start WebLab on PORT=3005, verify with curl+title check
- [Playwright setup in project](feedback_playwright_setup.md) — Use node scripts + @playwright/test devDep; playwright-cli global binary not installed on this machine
- [Mobile ThemeToggle locator quirk](feedback_mobile_toggle_locator.md) — Two toggle instances cause locator false-negative on mobile
