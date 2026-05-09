/**
 * Comprehensive UI validation script for WebLab neo-brutalist redesign
 * Tests all 4 pages at 3 breakpoints, captures screenshots, checks console errors
 */
import { chromium } from '@playwright/test';
import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const SCREENSHOTS_DIR = join(__dirname, 'screenshots');
const BASE_URL = 'http://localhost:3001';

const PAGES = [
  { name: 'home', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'about', path: '/about' },
  { name: 'contact', path: '/contact' },
];

const BREAKPOINTS = [
  { name: '375', width: 375, height: 812, label: 'mobile' },
  { name: '768', width: 768, height: 1024, label: 'tablet' },
  { name: '1440', width: 1440, height: 900, label: 'desktop' },
];

const findings = {
  failures: [],
  warnings: [],
  passes: [],
  screenshots: [],
};

function addFailure(page, breakpoint, category, issue, severity) {
  findings.failures.push({ page, breakpoint, category, issue, severity });
  console.log(`[FAIL][${severity}] ${page} @ ${breakpoint}px — ${category}: ${issue}`);
}

function addWarning(page, breakpoint, category, issue) {
  findings.warnings.push({ page, breakpoint, category, issue });
  console.log(`[WARN] ${page} @ ${breakpoint}px — ${category}: ${issue}`);
}

function addPass(check) {
  findings.passes.push(check);
  console.log(`[PASS] ${check}`);
}

async function testPage(page, pageConfig, viewport) {
  const pageName = pageConfig.name;
  const bpName = viewport.name;
  const url = `${BASE_URL}${pageConfig.path}`;

  console.log(`\n--- Testing ${pageName} @ ${bpName}px ---`);

  // Collect console messages
  const consoleErrors = [];
  const consoleWarnings = [];
  page.on('console', (msg) => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
    if (msg.type() === 'warning') consoleWarnings.push(msg.text());
  });

  // Collect page errors
  const pageErrors = [];
  page.on('pageerror', (err) => pageErrors.push(err.message));

  await page.setViewportSize({ width: viewport.width, height: viewport.height });
  await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

  // Wait for animations to settle
  await page.waitForTimeout(2000);

  // --- Take screenshot ---
  const screenshotPath = join(SCREENSHOTS_DIR, `${pageName}-${bpName}.png`);
  await page.screenshot({ path: screenshotPath, fullPage: true });
  findings.screenshots.push(screenshotPath);
  console.log(`  Screenshot saved: ${pageName}-${bpName}.png`);

  // --- Console errors check ---
  if (pageErrors.length > 0) {
    for (const err of pageErrors) {
      if (err.includes('Hydration') || err.includes('hydration')) {
        addFailure(pageConfig.path, bpName, 'Hydration', err.slice(0, 150), 'Critical');
      } else {
        addFailure(pageConfig.path, bpName, 'JS Error', err.slice(0, 150), 'Major');
      }
    }
  } else {
    addPass(`No page errors on ${pageName} @ ${bpName}px`);
  }

  const relevantConsoleErrors = consoleErrors.filter(e =>
    !e.includes('favicon') && !e.includes('net::ERR_BLOCKED')
  );
  if (relevantConsoleErrors.length > 0) {
    for (const err of relevantConsoleErrors) {
      if (err.includes('Content Security Policy') || err.includes('CSP')) {
        addFailure(pageConfig.path, bpName, 'CSP Violation', err.slice(0, 150), 'Critical');
      } else if (err.includes('hydrat')) {
        addFailure(pageConfig.path, bpName, 'Hydration', err.slice(0, 150), 'Critical');
      } else {
        addWarning(pageConfig.path, bpName, 'Console Error', err.slice(0, 150));
      }
    }
  }

  // --- Check background color (design token: near-black #0A0A0A or white for new design) ---
  const bodyBg = await page.evaluate(() => {
    return window.getComputedStyle(document.body).backgroundColor;
  });
  console.log(`  Body background: ${bodyBg}`);

  // --- Check for old accent color (bright blue) vs new dark blue ---
  const oldAccentUsed = await page.evaluate(() => {
    const allElements = document.querySelectorAll('*');
    const problematic = [];
    for (const el of allElements) {
      const style = window.getComputedStyle(el);
      const bg = style.backgroundColor;
      const color = style.color;
      const borderColor = style.borderColor;
      // Check for old bright blue: rgb(59, 130, 246) = #3B82F6 or rgb(37, 99, 235) = #2563EB
      for (const val of [bg, color, borderColor]) {
        if (val === 'rgb(59, 130, 246)' || val === 'rgb(37, 99, 235)') {
          const tagName = el.tagName.toLowerCase();
          const classes = el.className ? el.className.toString().slice(0, 60) : '';
          problematic.push(`${tagName}.${classes}: ${val}`);
        }
      }
    }
    return problematic.slice(0, 10);
  });
  if (oldAccentUsed.length > 0) {
    addWarning(pageConfig.path, bpName, 'Color Token', `Old bright blue (#3B82F6/#2563EB) still in use on: ${oldAccentUsed[0]}`);
  } else {
    addPass(`No old bright blue accent on ${pageName} @ ${bpName}px`);
  }

  // --- Check for [BRACKETED] text ---
  const bracketedText = await page.evaluate(() => {
    const bodyText = document.body.innerText;
    const matches = bodyText.match(/\[[A-Z\s]+\]/g);
    return matches ? matches.slice(0, 5) : [];
  });
  if (bracketedText.length > 0) {
    addFailure(pageConfig.path, bpName, 'Content', `Bracketed mono text visible: ${bracketedText.join(', ')}`, 'Major');
  } else {
    addPass(`No [BRACKETED] text on ${pageName} @ ${bpName}px`);
  }

  // --- Check horizontal scroll ---
  const hasHorizontalScroll = await page.evaluate(() => {
    return document.documentElement.scrollWidth > document.documentElement.clientWidth;
  });
  if (hasHorizontalScroll) {
    addFailure(pageConfig.path, bpName, 'Layout', 'Horizontal scroll detected', 'Critical');
  } else {
    addPass(`No horizontal scroll on ${pageName} @ ${bpName}px`);
  }

  // --- Check for theme toggle (should be removed) ---
  const themeToggle = await page.evaluate(() => {
    // Look for theme toggle by common patterns
    const buttons = document.querySelectorAll('button');
    for (const btn of buttons) {
      const text = btn.textContent || '';
      const ariaLabel = btn.getAttribute('aria-label') || '';
      if (text.toLowerCase().includes('theme') ||
          ariaLabel.toLowerCase().includes('theme') ||
          ariaLabel.toLowerCase().includes('dark') ||
          ariaLabel.toLowerCase().includes('light')) {
        return { found: true, text: text.trim().slice(0, 50), label: ariaLabel };
      }
    }
    return { found: false };
  });
  if (themeToggle.found) {
    addFailure(pageConfig.path, bpName, 'Component', `Theme toggle still present: "${themeToggle.text || themeToggle.label}"`, 'Major');
  } else {
    addPass(`No theme toggle on ${pageName} @ ${bpName}px`);
  }

  // --- Check footer is dark ---
  const footerCheck = await page.evaluate(() => {
    const footer = document.querySelector('footer');
    if (!footer) return { found: false };
    const style = window.getComputedStyle(footer);
    const bg = style.backgroundColor;
    return { found: true, bg };
  });
  if (footerCheck.found) {
    console.log(`  Footer background: ${footerCheck.bg}`);
    // Check if it's dark (r,g,b values all low)
    const match = footerCheck.bg.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
    if (match) {
      const [, r, g, b] = match.map(Number);
      const brightness = (r + g + b) / 3;
      if (brightness > 100) {
        addWarning(pageConfig.path, bpName, 'Footer', `Footer background appears light: ${footerCheck.bg} (brightness avg: ${brightness.toFixed(0)})`);
      } else {
        addPass(`Footer is dark on ${pageName} @ ${bpName}px (${footerCheck.bg})`);
      }
    }
  } else {
    addWarning(pageConfig.path, bpName, 'Footer', 'No <footer> element found');
  }

  // --- Check navbar is present and sticky ---
  const navCheck = await page.evaluate(() => {
    const nav = document.querySelector('nav, header');
    if (!nav) return { found: false };
    const style = window.getComputedStyle(nav);
    return {
      found: true,
      position: style.position,
      display: style.display,
    };
  });
  if (!navCheck.found) {
    addFailure(pageConfig.path, bpName, 'Navigation', 'No nav/header element found', 'Critical');
  } else {
    const isSticky = navCheck.position === 'sticky' || navCheck.position === 'fixed';
    if (!isSticky) {
      addWarning(pageConfig.path, bpName, 'Navigation', `Navbar is not sticky/fixed (position: ${navCheck.position})`);
    } else {
      addPass(`Navbar is sticky on ${pageName} @ ${bpName}px`);
    }
  }

  // --- Check mobile hamburger menu (only at mobile) ---
  if (viewport.width <= 375) {
    const hamburger = await page.evaluate(() => {
      // Look for hamburger button by common patterns
      const buttons = document.querySelectorAll('button');
      for (const btn of buttons) {
        const ariaLabel = btn.getAttribute('aria-label') || '';
        const text = btn.textContent || '';
        if (ariaLabel.toLowerCase().includes('menu') ||
            ariaLabel.toLowerCase().includes('hamburger') ||
            ariaLabel.toLowerCase().includes('open') ||
            btn.querySelector('svg') !== null) {
          // Only count if nav links are hidden at this breakpoint
          return { found: true, label: ariaLabel, text: text.trim().slice(0, 30) };
        }
      }
      return { found: false };
    });
    if (!hamburger.found) {
      addWarning(pageConfig.path, bpName, 'Navigation', 'No hamburger menu button found at mobile breakpoint');
    } else {
      addPass(`Hamburger menu found on ${pageName} @ mobile`);
    }
  }

  // --- Check cards have borders (neo-brutalist style) ---
  const cardBorderCheck = await page.evaluate(() => {
    // Look for cards/service cards
    const cards = document.querySelectorAll('[class*="card"], [class*="Card"], article, .border');
    const results = [];
    for (const card of Array.from(cards).slice(0, 5)) {
      const style = window.getComputedStyle(card);
      const border = style.border;
      const borderWidth = parseInt(style.borderWidth);
      const shadow = style.boxShadow;
      results.push({
        tag: card.tagName.toLowerCase(),
        classes: (card.className || '').toString().slice(0, 60),
        borderWidth,
        hasShadow: shadow !== 'none',
      });
    }
    return results;
  });
  console.log(`  Card border check: ${JSON.stringify(cardBorderCheck.slice(0, 2))}`);

  // --- Check heading fonts ---
  const headingFontCheck = await page.evaluate(() => {
    const h1 = document.querySelector('h1');
    if (!h1) return null;
    const style = window.getComputedStyle(h1);
    return {
      fontFamily: style.fontFamily,
      fontWeight: style.fontWeight,
    };
  });
  if (headingFontCheck) {
    console.log(`  H1 font: ${headingFontCheck.fontFamily} weight: ${headingFontCheck.fontWeight}`);
    if (!headingFontCheck.fontFamily.toLowerCase().includes('syne')) {
      addWarning(pageConfig.path, bpName, 'Typography', `H1 may not use Syne font: ${headingFontCheck.fontFamily.slice(0, 60)}`);
    } else {
      addPass(`H1 uses Syne font on ${pageName} @ ${bpName}px`);
    }
    const weight = parseInt(headingFontCheck.fontWeight);
    if (weight < 700) {
      addWarning(pageConfig.path, bpName, 'Typography', `H1 font weight is light: ${headingFontCheck.fontWeight}`);
    }
  } else {
    addWarning(pageConfig.path, bpName, 'Typography', 'No H1 found on page');
  }

  // --- Check text overflow ---
  const overflowCheck = await page.evaluate(() => {
    const elements = document.querySelectorAll('h1, h2, h3, p');
    const overflowing = [];
    for (const el of elements) {
      if (el.scrollWidth > el.clientWidth + 5) { // 5px tolerance
        overflowing.push({
          tag: el.tagName,
          text: el.textContent.trim().slice(0, 60),
          scrollW: el.scrollWidth,
          clientW: el.clientWidth,
        });
      }
    }
    return overflowing.slice(0, 5);
  });
  if (overflowCheck.length > 0) {
    for (const item of overflowCheck) {
      addFailure(pageConfig.path, bpName, 'Typography', `Text overflow: <${item.tag}> "${item.text}" (scroll:${item.scrollW} > client:${item.clientW})`, 'Major');
    }
  } else {
    addPass(`No text overflow on ${pageName} @ ${bpName}px`);
  }

  // --- Check images have alt text ---
  const imgAltCheck = await page.evaluate(() => {
    const images = document.querySelectorAll('img');
    const missing = [];
    for (const img of images) {
      if (!img.alt || img.alt.trim() === '') {
        missing.push({ src: (img.src || img.getAttribute('src') || '').slice(0, 80) });
      }
    }
    return missing;
  });
  if (imgAltCheck.length > 0) {
    for (const img of imgAltCheck) {
      addFailure(pageConfig.path, bpName, 'Accessibility', `Image missing alt text: ${img.src}`, 'Major');
    }
  } else {
    addPass(`All images have alt text on ${pageName} @ ${bpName}px`);
  }

  // --- Check heading hierarchy ---
  const headingHierarchy = await page.evaluate(() => {
    const headings = Array.from(document.querySelectorAll('h1, h2, h3, h4, h5, h6'));
    return headings.map(h => ({
      level: h.tagName,
      text: h.textContent.trim().slice(0, 60),
    }));
  });
  const h1Count = headingHierarchy.filter(h => h.level === 'H1').length;
  if (h1Count === 0) {
    addFailure(pageConfig.path, bpName, 'Accessibility', 'No H1 found on page', 'Major');
  } else if (h1Count > 1) {
    addWarning(pageConfig.path, bpName, 'Accessibility', `Multiple H1 tags found (${h1Count})`);
  } else {
    addPass(`Single H1 present on ${pageName} @ ${bpName}px`);
  }
  console.log(`  Headings: ${headingHierarchy.map(h => `${h.level}: "${h.text}"`).slice(0, 4).join(' | ')}`);

  // --- Check booking CTAs ---
  const ctaCheck = await page.evaluate(() => {
    const links = Array.from(document.querySelectorAll('a'));
    const ctaLinks = links.filter(a => {
      const href = a.href || '';
      const text = a.textContent.toLowerCase();
      return href.includes('book') || text.includes('book') || text.includes('get started') ||
             text.includes('schedule') || text.includes('contact us');
    });
    return ctaLinks.map(a => ({ href: a.href, text: a.textContent.trim().slice(0, 40) })).slice(0, 5);
  });
  console.log(`  CTAs found: ${ctaCheck.length}`);

  // --- Page-specific checks ---
  if (pageConfig.name === 'home' && viewport.width === 1440) {
    // Check for canvas/hero animation
    const canvasCheck = await page.evaluate(() => {
      const canvas = document.querySelector('canvas');
      return canvas ? { found: true, width: canvas.width, height: canvas.height } : { found: false };
    });
    if (!canvasCheck.found) {
      addWarning(pageConfig.path, bpName, 'Animation', 'No canvas element found in hero (hero canvas animation may be missing)');
    } else {
      addPass(`Canvas animation element present on homepage`);
    }
  }

  if (pageConfig.name === 'contact') {
    // Check for form
    const formCheck = await page.evaluate(() => {
      const form = document.querySelector('form');
      const calendarEmbed = document.querySelector('#ghl-calendar-embed');
      const formEmbed = document.querySelector('#ghl-form-embed');
      return {
        hasForm: !!form,
        hasCalendarEmbed: !!calendarEmbed,
        hasFormEmbed: !!formEmbed,
      };
    });
    console.log(`  Contact page: form=${formCheck.hasForm}, calendarEmbed=${formCheck.hasCalendarEmbed}, formEmbed=${formCheck.hasFormEmbed}`);
    if (!formCheck.hasForm && !formCheck.hasCalendarEmbed && !formCheck.hasFormEmbed) {
      addWarning(pageConfig.path, bpName, 'Component', 'No form or GHL embed found on contact page');
    }
  }

  if (pageConfig.name === 'services') {
    // Check for service cards
    const serviceCards = await page.evaluate(() => {
      // Look for service card components
      const cards = document.querySelectorAll('[class*="service"], [class*="Service"], article, .card');
      return cards.length;
    });
    console.log(`  Service cards found: ${serviceCards}`);
  }

  // --- Check ChatbotPlaceholder ---
  const chatbotCheck = await page.evaluate(() => {
    // ChatbotPlaceholder typically has a specific id or class
    const chatbot = document.querySelector('#chatbot-placeholder, [data-chatbot], [class*="chatbot"], [class*="Chatbot"]');
    // Also check for any element with chatbot-related text
    const allDivs = document.querySelectorAll('div[id], div[class]');
    for (const div of allDivs) {
      const id = div.id || '';
      const cls = (div.className || '').toString();
      if (id.toLowerCase().includes('chat') || cls.toLowerCase().includes('chatbot')) {
        return { found: true, id, cls: cls.slice(0, 60) };
      }
    }
    return { found: !!chatbot };
  });
  console.log(`  Chatbot placeholder: ${JSON.stringify(chatbotCheck)}`);

  // --- Check pill badges (no bracketed text labels) ---
  const pillCheck = await page.evaluate(() => {
    // Look for elements that might be section labels
    const labels = document.querySelectorAll('.rounded-full, [class*="badge"], [class*="pill"], [class*="label"]');
    return labels.length;
  });
  console.log(`  Pill badge elements: ${pillCheck}`);

  // Reset console listeners for next test
  page.removeAllListeners('console');
  page.removeAllListeners('pageerror');
}

async function main() {
  console.log('=== WebLab Neo-Brutalist Redesign — UI Validation ===\n');

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  for (const pageConfig of PAGES) {
    for (const viewport of BREAKPOINTS) {
      try {
        await testPage(page, pageConfig, viewport);
      } catch (err) {
        addFailure(pageConfig.path, viewport.name, 'Test Error', `Test threw: ${err.message}`, 'Critical');
        console.error(`  ERROR testing ${pageConfig.name} @ ${viewport.name}px:`, err.message);
      }
    }
  }

  await browser.close();

  // Generate summary
  const criticalCount = findings.failures.filter(f => f.severity === 'Critical').length;
  const majorCount = findings.failures.filter(f => f.severity === 'Major').length;
  const totalFailures = findings.failures.length;

  console.log('\n=== SUMMARY ===');
  console.log(`Failures: ${totalFailures} (${criticalCount} critical, ${majorCount} major)`);
  console.log(`Warnings: ${findings.warnings.length}`);
  console.log(`Passes: ${findings.passes.length}`);

  // Write findings to JSON for report generation
  writeFileSync(
    join(__dirname, 'test-results.json'),
    JSON.stringify(findings, null, 2)
  );
  console.log('\nResults written to test-results.json');
}

main().catch(console.error);
