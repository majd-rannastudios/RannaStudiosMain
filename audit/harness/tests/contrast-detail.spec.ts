import { test } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const PAGES: { path: string; viewport: { width: number; height: number } }[] = [
  { path: "/", viewport: { width: 375, height: 667 } },
  { path: "/work", viewport: { width: 375, height: 667 } },
  { path: "/news", viewport: { width: 375, height: 667 } },
  { path: "/news/f1-sagp-fan-zone-2025", viewport: { width: 375, height: 667 } },
];

for (const p of PAGES) {
  test(`contrast detail: ${p.path}`, async ({ page }) => {
    await page.setViewportSize(p.viewport);
    await page.goto(p.path, { waitUntil: "networkidle" });
    await page.waitForTimeout(500);
    const results = await new AxeBuilder({ page }).withRules(["color-contrast"]).analyze();
    for (const v of results.violations) {
      for (const node of v.nodes) {
        for (const check of node.any) {
          console.log(
            JSON.stringify({
              route: p.path,
              target: node.target,
              fg: check.data?.fgColor,
              bg: check.data?.bgColor,
              ratio: check.data?.contrastRatio,
              expected: check.data?.expectedContrastRatio,
              fontSize: check.data?.fontSize,
              fontWeight: check.data?.fontWeight,
            })
          );
        }
      }
    }
  });
}
