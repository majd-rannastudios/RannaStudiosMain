import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import fs from "fs";
import path from "path";
import { ROUTES } from "../lib/routes";
import { VIEWPORTS } from "../lib/viewports";
import {
  checkHorizontalOverflow,
  checkTapTargets,
  sampleComputedStyles,
  collectHexColorsInUse,
  waitForMapReady,
  sanitizeViewportName,
} from "../lib/collect";
import { checkPaletteCompliance, MIN_INPUT_FONT_SIZE_PX, EXPECTED_BORDER_RADIUS } from "../lib/tokens";

const RESULTS_DIR = path.resolve(__dirname, "../results");
const SCREENS_DIR = path.resolve(__dirname, "../../screens");

fs.mkdirSync(RESULTS_DIR, { recursive: true });
fs.mkdirSync(SCREENS_DIR, { recursive: true });

for (const route of ROUTES) {
  for (const viewport of VIEWPORTS) {
    test(`${route.slug} @ ${viewport.name}`, async ({ page }) => {
      const consoleErrors: string[] = [];
      const networkFailures: { url: string; status?: number; reason?: string }[] = [];

      page.on("console", (msg) => {
        if (msg.type() === "error") consoleErrors.push(msg.text());
      });
      page.on("requestfailed", (req) => {
        networkFailures.push({ url: req.url(), reason: req.failure()?.errorText });
      });
      page.on("response", (res) => {
        if (res.status() >= 400) networkFailures.push({ url: res.url(), status: res.status() });
      });

      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto(route.path, { waitUntil: "networkidle" });

      if (route.hasMap) {
        await waitForMapReady(page);
      }
      // let scroll-reveal / GSAP entrance animations settle before measuring
      await page.waitForTimeout(500);

      const overflow = await checkHorizontalOverflow(page);
      const tapTargets = await checkTapTargets(page);
      const styles = await sampleComputedStyles(page);
      const hexColors = await collectHexColorsInUse(page);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      let axeViolations: any[] = [];
      try {
        const results = await new AxeBuilder({ page }).analyze();
        axeViolations = results.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          help: v.help,
          nodes: v.nodes.flatMap((n) => n.target).slice(0, 10),
        }));
      } catch (e) {
        axeViolations = [{ id: "axe-error", help: String(e) }];
      }

      const paletteViolations = hexColors
        .map((hex) => ({ hex, ...checkPaletteCompliance(hex) }))
        .filter((r) => !r.compliant);

      const inputFontSizeViolations = styles.filter(
        (s) =>
          ["input", "select", "textarea"].some((t) => s.selector.startsWith(t)) &&
          parseFloat(s.fontSize) < MIN_INPUT_FONT_SIZE_PX
      );

      const borderRadiusViolations = styles.filter(
        (s) => s.borderRadius !== EXPECTED_BORDER_RADIUS && !/^0px(\s+0px){0,3}$/.test(s.borderRadius)
      );

      const fontFamilyOutliers = styles.filter((s) => {
        const isHeadingOrBody = /^(h1|h2|h3|body)/.test(s.selector);
        if (!isHeadingOrBody) return false;
        return !s.fontFamily.toLowerCase().includes("poppins");
      });

      const screenshotPath = path.join(SCREENS_DIR, `${route.slug}__${sanitizeViewportName(viewport.name)}.png`);
      await page.screenshot({ path: screenshotPath, fullPage: true }).catch(() => null);

      const result = {
        route: route.path,
        viewport: viewport.name,
        overflow,
        tapTargets,
        paletteViolations,
        inputFontSizeViolations: inputFontSizeViolations.map((s) => ({ selector: s.selector, fontSize: s.fontSize })),
        borderRadiusViolations: borderRadiusViolations.map((s) => ({
          selector: s.selector,
          borderRadius: s.borderRadius,
        })),
        fontFamilyOutliers: fontFamilyOutliers.map((s) => ({
          selector: s.selector,
          fontFamily: s.fontFamily,
          text: s.text,
        })),
        axeViolations,
        consoleErrors,
        networkFailures,
        screenshot: path.relative(path.resolve(__dirname, "../.."), screenshotPath),
      };

      fs.writeFileSync(
        path.join(RESULTS_DIR, `${route.slug}__${sanitizeViewportName(viewport.name)}.json`),
        JSON.stringify(result, null, 2)
      );

      expect
        .soft(
          overflow.overflowing,
          `Horizontal overflow on ${route.path} @ ${viewport.name}: ${JSON.stringify(overflow.culprits)}`
        )
        .toBe(false);
    });
  }
}
