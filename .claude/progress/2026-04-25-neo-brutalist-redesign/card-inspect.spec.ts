/**
 * Inspect what elements are in the page to find cards/panels,
 * log their computed border and shadow styles.
 */

import { test } from "@playwright/test";

const BASE_URL = "http://localhost:3001";

test.describe("Card Border Inspection", () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test("Homepage — find all bordered/shadowed elements", async ({ page }) => {
    await page.goto(`${BASE_URL}/`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // Dump ALL elements that have a visible border or box-shadow
    const borderedElements = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll("*"));
      const results: any[] = [];
      for (const el of all) {
        const style = getComputedStyle(el);
        const bw = parseFloat(style.borderWidth);
        const bs = style.boxShadow;
        const bg = style.backgroundColor;
        // Only elements with a visible border OR non-none shadow
        if ((bw > 0 || bs !== "none") && results.length < 20) {
          results.push({
            tag: el.tagName,
            id: el.id?.substring(0, 20) || "",
            class: el.className?.toString().substring(0, 60) || "",
            borderWidth: style.borderWidth,
            borderColor: style.borderColor,
            borderStyle: style.borderStyle,
            boxShadow: bs.substring(0, 100),
            background: bg,
          });
        }
      }
      return results;
    });

    console.log("=== BORDERED/SHADOWED ELEMENTS (first 20) ===");
    borderedElements.forEach((el, i) => {
      console.log(`[${i}] ${el.tag}${el.id ? '#' + el.id : ''}.${el.class.split(' ').slice(0,2).join('.')}`);
      console.log(`  border: ${el.borderWidth} ${el.borderStyle} ${el.borderColor}`);
      console.log(`  box-shadow: ${el.boxShadow}`);
      console.log(`  background: ${el.background}`);
    });
  });

  test("Services page — find cards/panels", async ({ page }) => {
    await page.goto(`${BASE_URL}/services`, { waitUntil: "networkidle" });
    await page.waitForTimeout(2000);

    // Scroll to load lazy elements
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight / 2));
    await page.waitForTimeout(500);

    const borderedElements = await page.evaluate(() => {
      const all = Array.from(document.querySelectorAll("main *"));
      const results: any[] = [];
      for (const el of all) {
        const style = getComputedStyle(el);
        const bw = parseFloat(style.borderWidth);
        const bs = style.boxShadow;
        if ((bw > 0 || (bs !== "none" && bs !== "")) && results.length < 15) {
          results.push({
            tag: el.tagName,
            class: el.className?.toString().substring(0, 60) || "",
            borderWidth: style.borderWidth,
            borderColor: style.borderColor,
            borderStyle: style.borderStyle,
            boxShadow: bs.substring(0, 100),
          });
        }
      }
      return results;
    });

    console.log("=== SERVICES PAGE BORDERED ELEMENTS ===");
    borderedElements.forEach((el, i) => {
      console.log(`[${i}] ${el.tag} .${el.class.split(' ').slice(0,2).join('.')}`);
      console.log(`  border: ${el.borderWidth} ${el.borderStyle} ${el.borderColor}`);
      console.log(`  box-shadow: ${el.boxShadow}`);
    });
  });
});
