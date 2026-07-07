import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { ROUTES } from "../lib/routes";
import { MOBILE_BOUNDARY_VIEWPORTS } from "../lib/viewports";

const RESULTS_DIR = path.resolve(__dirname, "../results");
const SCREENS_DIR = path.resolve(__dirname, "../../screens/nav-hydration");
fs.mkdirSync(RESULTS_DIR, { recursive: true });
fs.mkdirSync(SCREENS_DIR, { recursive: true });

// Targets hooks/useIsMobile.ts (`useState(false)` + useEffect) driving
// components/sections/NavSection.tsx's desktop-nav-vs-hamburger branch.
// Since NavSection is server-rendered before hydration, the raw SSR HTML
// should NOT be desktop-nav-only at mobile widths.
test.describe("SSR nav hydration (useIsMobile flash-of-desktop-nav)", () => {
  for (const route of ROUTES.slice(0, 3)) {
    test(`raw SSR HTML for ${route.slug} should include a mobile-safe nav path`, async ({ request }) => {
      const res = await request.get(route.path);
      const html = await res.text();

      const hasHamburger = /aria-label="(Open|Close) menu"/.test(html);
      const hasDesktopNavLink = />\s*studios\s*</.test(html);

      const result = {
        route: route.path,
        hasHamburgerInSSR: hasHamburger,
        hasDesktopNavLinkInSSR: hasDesktopNavLink,
      };
      fs.writeFileSync(path.join(RESULTS_DIR, `nav-hydration__${route.slug}.json`), JSON.stringify(result, null, 2));

      expect
        .soft(
          hasHamburger,
          `Expected mobile trigger present in raw SSR HTML for ${route.path} — currently useIsMobile() defaults to false server-side, so only the desktop <nav> ships in the initial payload.`
        )
        .toBe(true);
    });
  }

  for (const viewport of MOBILE_BOUNDARY_VIEWPORTS) {
    test(`visual snap check @ ${viewport.name} on home`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto("/", { waitUntil: "commit" });
      const immediate = await page
        .screenshot({ clip: { x: 0, y: 0, width: viewport.width, height: Math.min(140, viewport.height) } })
        .catch(() => null);
      await page.waitForLoadState("networkidle");
      await page.waitForTimeout(400);
      const settled = await page.screenshot({
        clip: { x: 0, y: 0, width: viewport.width, height: Math.min(140, viewport.height) },
      });
      if (immediate) fs.writeFileSync(path.join(SCREENS_DIR, `${viewport.name}__immediate.png`), immediate);
      fs.writeFileSync(path.join(SCREENS_DIR, `${viewport.name}__settled.png`), settled);
    });
  }
});
