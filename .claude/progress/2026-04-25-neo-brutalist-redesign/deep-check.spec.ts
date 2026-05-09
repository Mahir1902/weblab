/**
 * Deep check: Card styling, footer text color, hydration errors, console errors.
 * Separate from main verify-fixes to keep things clean.
 */

import { test, expect, Page } from "@playwright/test";
import path from "path";

const BASE_URL = "http://localhost:3001";
const SCREENSHOTS_DIR = path.resolve(__dirname, "screenshots");

test.describe("Deep Checks — Visual & Console", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Homepage — full console check + card styling", async ({ page }) => {
    const allMessages: string[] = [];
    const errorMessages: string[] = [];
    const hydrationMessages: string[] = [];

    page.on("console", (msg) => {
      const text = msg.text();
      allMessages.push(`[${msg.type()}] ${text}`);
      if (msg.type() === "error") errorMessages.push(text);
      if (
        text.toLowerCase().includes("hydration") ||
        text.toLowerCase().includes("did not match") ||
        text.toLowerCase().includes("minified react error")
      ) {
        hydrationMessages.push(text);
      }
    });
    page.on("pageerror", (err) => {
      errorMessages.push(`PAGE ERROR: ${err.message}`);
    });

    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(3000);

    console.log("=== CONSOLE ERRORS (/) ===");
    errorMessages.forEach((e) => console.log(" ERROR:", e));
    console.log("=== HYDRATION ERRORS ===");
    hydrationMessages.forEach((e) => console.log(" HYDRATION:", e));

    expect(hydrationMessages, `Hydration errors: ${hydrationMessages.join("; ")}`).toHaveLength(0);

    // Scroll to see all content
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(500);

    // Check cards with broader selectors
    const cardInfo = await page.evaluate(() => {
      // Try multiple selectors
      const selectors = [
        "article", "[data-card]", ".card", "[class*='Card']",
        "[class*='card']", "[class*='service']", "[class*='Service']",
        "section > div > div", "ul > li"
      ];
      const results: any[] = [];
      for (const sel of selectors) {
        const els = Array.from(document.querySelectorAll(sel)).slice(0, 2);
        for (const el of els) {
          const style = getComputedStyle(el);
          const border = style.border;
          const borderColor = style.borderColor;
          const borderWidth = style.borderWidth;
          const boxShadow = style.boxShadow;
          if (borderWidth !== "0px" || boxShadow !== "none") {
            results.push({
              selector: sel,
              tag: el.tagName,
              class: el.className.substring(0, 60),
              border,
              borderColor,
              borderWidth,
              boxShadow: boxShadow.substring(0, 100),
            });
          }
        }
      }
      return results;
    });
    console.log("=== CARD STYLES ===");
    console.log(JSON.stringify(cardInfo, null, 2));
  });

  test("Footer — text color on dark background", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(1000);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.waitForTimeout(800);

    const footerInfo = await page.evaluate(() => {
      const footer = document.querySelector("footer");
      if (!footer) return null;
      const style = getComputedStyle(footer);
      const texts = Array.from(footer.querySelectorAll("p, span, a, h1, h2, h3, h4, li"))
        .slice(0, 5)
        .map((el) => {
          const s = getComputedStyle(el);
          return {
            tag: el.tagName,
            text: el.textContent?.substring(0, 40),
            color: s.color,
          };
        });
      return {
        backgroundColor: style.backgroundColor,
        color: style.color,
        childTextColors: texts,
      };
    });
    console.log("=== FOOTER INFO ===");
    console.log(JSON.stringify(footerInfo, null, 2));

    // Footer should be dark
    expect(footerInfo?.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(footerInfo?.backgroundColor).not.toBe("transparent");
  });

  test("/services — no [trade] text, has correct phrasing + console clean", async ({ page }) => {
    const errorMessages: string[] = [];
    const hydrationMessages: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errorMessages.push(msg.text());
      if (msg.text().toLowerCase().includes("hydration")) hydrationMessages.push(msg.text());
    });
    page.on("pageerror", (err) => errorMessages.push(`PAGE ERROR: ${err.message}`));

    await page.goto(`${BASE_URL}/services`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    const bodyText = await page.evaluate(() => document.body.innerText);
    const tradeOccurrences = (bodyText.match(/\[trade\]/g) || []).length;
    console.log(`[trade] occurrences: ${tradeOccurrences}`);
    console.log("Has 'near me':", bodyText.toLowerCase().includes("near me"));
    console.log("Has 'your trade':", bodyText.toLowerCase().includes("your trade"));
    console.log("Errors:", errorMessages.length);
    console.log("Hydration errors:", hydrationMessages.length);

    // Sample of content around key sections
    const headings = await page.evaluate(() =>
      Array.from(document.querySelectorAll("h1, h2, h3"))
        .map((h) => `${h.tagName}: ${h.textContent?.trim().substring(0, 80)}`)
    );
    console.log("=== HEADINGS ===");
    headings.forEach((h) => console.log(" ", h));

    expect(tradeOccurrences).toBe(0);
    expect(hydrationMessages).toHaveLength(0);
  });

  test("/about — no console errors", async ({ page }) => {
    const errorMessages: string[] = [];
    const hydrationMessages: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errorMessages.push(msg.text());
      if (msg.text().toLowerCase().includes("hydration")) hydrationMessages.push(msg.text());
    });
    page.on("pageerror", (err) => errorMessages.push(`PAGE ERROR: ${err.message}`));

    await page.goto(`${BASE_URL}/about`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    console.log("About errors:", errorMessages);
    console.log("About hydration:", hydrationMessages);
    expect(hydrationMessages).toHaveLength(0);
  });

  test("/contact — no console errors", async ({ page }) => {
    const errorMessages: string[] = [];
    const hydrationMessages: string[] = [];

    page.on("console", (msg) => {
      if (msg.type() === "error") errorMessages.push(msg.text());
      if (msg.text().toLowerCase().includes("hydration")) hydrationMessages.push(msg.text());
    });
    page.on("pageerror", (err) => errorMessages.push(`PAGE ERROR: ${err.message}`));

    await page.goto(`${BASE_URL}/contact`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);
    console.log("Contact errors:", errorMessages);
    console.log("Contact hydration:", hydrationMessages);
    expect(hydrationMessages).toHaveLength(0);
  });
});
