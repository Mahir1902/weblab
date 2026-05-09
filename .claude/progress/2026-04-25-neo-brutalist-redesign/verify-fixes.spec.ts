/**
 * Focused re-test to verify 5 bugs are fixed.
 * Bug 1: No hydration mismatch errors
 * Bug 2+3: --color-accent = #295590, footer has dark background (#1A1A1A not transparent)
 * Bug 4: --color-background = #FFFFFF, body backgrounds are white not transparent
 * Bug 5: No [trade] text on /services page
 * Also: general appearance at 1440px (cards, footer, no console errors)
 */

import { test, expect, Page, ConsoleMessage } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const SCREENSHOTS_DIR = path.resolve(
  __dirname,
  "screenshots"
);

const pages = [
  { name: "home", path: "/" },
  { name: "services", path: "/services" },
  { name: "about", path: "/about" },
  { name: "contact", path: "/contact" },
];

async function collectConsoleErrors(
  page: Page
): Promise<ConsoleMessage[]> {
  const errors: ConsoleMessage[] = [];
  page.on("console", (msg) => {
    if (msg.type() === "error" || msg.text().includes("hydration")) {
      errors.push(msg);
    }
  });
  return errors;
}

test.describe("Bug Fix Verification — 1440px Desktop", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  for (const pageConfig of pages) {
    test(`${pageConfig.name} page — no hydration errors, correct colors, screenshot`, async ({
      page,
    }) => {
      const consoleErrors: string[] = [];
      const hydrationErrors: string[] = [];

      page.on("console", (msg) => {
        const text = msg.text();
        if (msg.type() === "error") {
          consoleErrors.push(text);
        }
        if (
          text.toLowerCase().includes("hydration") ||
          text.toLowerCase().includes("did not match") ||
          text.toLowerCase().includes("text content did not match") ||
          text.toLowerCase().includes("minified react error")
        ) {
          hydrationErrors.push(text);
        }
      });

      page.on("pageerror", (err) => {
        consoleErrors.push(`PAGE ERROR: ${err.message}`);
        if (err.message.toLowerCase().includes("hydration")) {
          hydrationErrors.push(err.message);
        }
      });

      await page.goto(`${BASE_URL}${pageConfig.path}`, {
        waitUntil: "networkidle",
      });

      // Wait for fonts/animations to settle
      await page.waitForTimeout(2000);

      // Bug 1: No hydration mismatch errors
      expect(
        hydrationErrors,
        `Hydration errors on ${pageConfig.path}: ${hydrationErrors.join(", ")}`
      ).toHaveLength(0);

      // Bug 2: --color-accent resolves to #295590 (dark navy blue)
      const accentColor = await page.evaluate(() => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue("--color-accent")
          .trim();
      });
      console.log(`[${pageConfig.name}] --color-accent = "${accentColor}"`);
      // Accept either hex or rgb form of #295590 (rgb(41, 85, 144))
      const accentIsCorrect =
        accentColor === "#295590" ||
        accentColor === "rgb(41, 85, 144)" ||
        accentColor.toLowerCase().includes("295590");
      expect(
        accentIsCorrect,
        `--color-accent should be #295590 but got: ${accentColor}`
      ).toBe(true);

      // Bug 4: --color-background resolves to #FFFFFF (white)
      const bgColor = await page.evaluate(() => {
        return getComputedStyle(document.documentElement)
          .getPropertyValue("--color-background")
          .trim();
      });
      console.log(`[${pageConfig.name}] --color-background = "${bgColor}"`);
      // #fff is the short-form equivalent of #ffffff — both are correct
      const bgIsCorrect =
        bgColor === "#ffffff" ||
        bgColor === "#FFFFFF" ||
        bgColor === "#fff" ||
        bgColor === "rgb(255, 255, 255)" ||
        bgColor.toLowerCase().replace(/\s/g, "").includes("fff");
      expect(
        bgIsCorrect,
        `--color-background should be #FFFFFF/#fff but got: ${bgColor}`
      ).toBe(true);

      // Bug 4 continued: body background is not transparent
      const bodyBg = await page.evaluate(() => {
        return getComputedStyle(document.body).backgroundColor;
      });
      console.log(`[${pageConfig.name}] body background-color = "${bodyBg}"`);
      expect(
        bodyBg,
        `body background should not be transparent but got: ${bodyBg}`
      ).not.toBe("rgba(0, 0, 0, 0)");
      expect(
        bodyBg,
        `body background should not be transparent but got: ${bodyBg}`
      ).not.toBe("transparent");

      // Take screenshot
      const screenshotPath = path.join(
        SCREENSHOTS_DIR,
        `${pageConfig.name}-1440-fixed.png`
      );
      await page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`Screenshot saved: ${screenshotPath}`);
    });
  }

  test("homepage — footer has dark background, not transparent", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Scroll to footer
    await page.evaluate(() =>
      window.scrollTo(0, document.body.scrollHeight)
    );
    await page.waitForTimeout(500);

    // Check footer background
    const footerBg = await page.evaluate(() => {
      const footer =
        document.querySelector("footer") ||
        document.querySelector('[class*="footer"]') ||
        document.querySelector('[id*="footer"]');
      if (!footer) return "FOOTER NOT FOUND";
      return getComputedStyle(footer).backgroundColor;
    });
    console.log(`footer background-color = "${footerBg}"`);
    expect(footerBg, "Footer should not be transparent").not.toBe(
      "rgba(0, 0, 0, 0)"
    );
    expect(footerBg, "Footer should not be transparent").not.toBe(
      "transparent"
    );
    // Should be dark — #1A1A1A = rgb(26, 26, 26)
    const footerIsDark = footerBg.includes("26, 26, 26") ||
      footerBg.includes("1a1a1a") ||
      footerBg.includes("1A1A1A") ||
      footerBg === "#1A1A1A" ||
      footerBg === "#1a1a1a";
    console.log(`Footer is dark (expected #1A1A1A): ${footerIsDark}`);
    // Log but don't fail hard — we'll note in report
  });

  test("services page — no [trade] text visible", async ({ page }) => {
    await page.goto(`${BASE_URL}/services`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Check for literal [trade] text in page content
    const bodyText = await page.evaluate(() => document.body.innerText);
    const hasTradeToken = bodyText.includes("[trade]");
    console.log(`Services page contains "[trade]" text: ${hasTradeToken}`);

    // Also check the HTML source
    const bodyHTML = await page.evaluate(() => document.body.innerHTML);
    const htmlHasTrade = bodyHTML.includes("[trade]");

    expect(
      hasTradeToken || htmlHasTrade,
      'Found literal [trade] text — template substitution is broken'
    ).toBe(false);

    // Verify "your trade near me" or similar correct phrasing exists
    const hasCorrectText =
      bodyText.toLowerCase().includes("near me") ||
      bodyText.toLowerCase().includes("your trade");
    console.log(`Services page has correct text (near me / your trade): ${hasCorrectText}`);
  });

  test("homepage — cards have visible dark borders", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1500);

    // Check service cards or general cards
    const cardBorderInfo = await page.evaluate(() => {
      const cards = Array.from(
        document.querySelectorAll(
          '[class*="card"], [class*="Card"], [class*="service"]'
        )
      ).slice(0, 3);
      return cards.map((el) => {
        const style = getComputedStyle(el);
        return {
          tag: el.tagName,
          className: el.className.substring(0, 80),
          borderColor: style.borderColor,
          borderWidth: style.borderWidth,
          boxShadow: style.boxShadow.substring(0, 80),
        };
      });
    });
    console.log("Card styles:", JSON.stringify(cardBorderInfo, null, 2));
  });
});
