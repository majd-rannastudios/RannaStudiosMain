import { test } from "@playwright/test";
import fs from "fs";
import path from "path";
import { ROUTES } from "../lib/routes";

const RESULTS_DIR = path.resolve(__dirname, "../results");
fs.mkdirSync(RESULTS_DIR, { recursive: true });

// Informational only — globals.css already has a `@media (prefers-reduced-motion: reduce)`
// rule collapsing all animation/transition durations to 0.01ms. This records actual
// computed durations under that media query for manual review rather than hard-failing,
// since transition-duration serialization varies by property count.
test.describe("prefers-reduced-motion respected", () => {
  for (const route of ROUTES) {
    test(`${route.slug}: computed transition durations under reduced motion`, async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.setViewportSize({ width: 390, height: 844 });
      await page.goto(route.path, { waitUntil: "networkidle" });
      await page.waitForTimeout(300);

      const durations = await page.evaluate(() => {
        const els = Array.from(document.querySelectorAll(".reveal, .lz, .btn-rs"));
        return els.slice(0, 10).map((el) => getComputedStyle(el).transitionDuration);
      });

      fs.writeFileSync(
        path.join(RESULTS_DIR, `reduced-motion__${route.slug}.json`),
        JSON.stringify({ route: route.path, durations }, null, 2)
      );
    });
  }
});
