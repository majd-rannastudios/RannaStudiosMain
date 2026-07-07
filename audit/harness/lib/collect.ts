import type { Page } from "@playwright/test";

export interface OverflowCulprit {
  selector: string;
  width: number;
  viewportWidth: number;
}

export interface OverflowResult {
  overflowing: boolean;
  scrollWidth: number;
  clientWidth: number;
  culprits: OverflowCulprit[];
}

export async function checkHorizontalOverflow(page: Page): Promise<OverflowResult> {
  return page.evaluate(() => {
    const scrollWidth = document.documentElement.scrollWidth;
    const clientWidth = document.documentElement.clientWidth;
    const overflowing = scrollWidth > clientWidth;
    const culprits: { selector: string; width: number; viewportWidth: number }[] = [];

    if (overflowing) {
      const describe = (el: Element): string => {
        if (el.id) return `#${el.id}`;
        const cls =
          typeof el.className === "string" && el.className.trim()
            ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
            : "";
        const tag = el.tagName.toLowerCase();
        return `${tag}${cls}`;
      };
      const all = document.querySelectorAll("body *");
      all.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.width > clientWidth + 1 || rect.right > clientWidth + 1) {
          culprits.push({ selector: describe(el), width: Math.round(rect.width), viewportWidth: clientWidth });
        }
      });
    }
    // Cap and dedupe by selector to keep results readable
    const seen = new Set<string>();
    const deduped = culprits.filter((c) => {
      if (seen.has(c.selector)) return false;
      seen.add(c.selector);
      return true;
    });
    return { overflowing, scrollWidth, clientWidth, culprits: deduped.slice(0, 15) };
  });
}

export interface TapTargetViolation {
  selector: string;
  width: number;
  height: number;
}

export async function checkTapTargets(page: Page): Promise<TapTargetViolation[]> {
  return page.evaluate((MIN) => {
    const describe = (el: Element): string => {
      if (el.id) return `#${el.id}`;
      const text = (el.textContent || "").trim().slice(0, 24);
      const tag = el.tagName.toLowerCase();
      return text ? `${tag}("${text}")` : tag;
    };
    const interactive = document.querySelectorAll(
      'a[href], button, input, select, textarea, [role="button"], [onclick]'
    );
    const violations: { selector: string; width: number; height: number }[] = [];
    interactive.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) return; // hidden/off-screen, not a real tap target
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      if (rect.width < MIN || rect.height < MIN) {
        violations.push({ selector: describe(el), width: Math.round(rect.width), height: Math.round(rect.height) });
      }
    });
    return violations.slice(0, 30);
  }, 44);
}

export interface StyleSample {
  selector: string;
  text: string;
  fontFamily: string;
  fontSize: string;
  color: string;
  backgroundColor: string;
  borderRadius: string;
  lineHeight: string;
}

export async function sampleComputedStyles(page: Page): Promise<StyleSample[]> {
  return page.evaluate(() => {
    const describe = (el: Element): string => {
      const tag = el.tagName.toLowerCase();
      const cls =
        typeof (el as HTMLElement).className === "string" && (el as HTMLElement).className.trim()
          ? "." + (el as HTMLElement).className.trim().split(/\s+/).slice(0, 2).join(".")
          : "";
      return `${tag}${cls}`;
    };
    const selectors = ["h1", "h2", "h3", "body", "button", ".btn-rs", "a", "input", "select", "textarea"];
    const samples: StyleSample[] = [];
    const seen = new Set<Element>();
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        const style = getComputedStyle(el);
        samples.push({
          selector: describe(el),
          text: (el.textContent || "").trim().slice(0, 40),
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          color: style.color,
          backgroundColor: style.backgroundColor,
          borderRadius: style.borderRadius,
          lineHeight: style.lineHeight,
        });
      });
    });
    return samples;
  });
}

export async function collectHexColorsInUse(page: Page): Promise<string[]> {
  return page.evaluate(() => {
    const hexes = new Set<string>();
    const toHex = (rgb: string): string | null => {
      const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/.exec(rgb);
      if (!m) return null;
      if (m[4] !== undefined && parseFloat(m[4]) === 0) return null; // fully transparent
      const [, r, g, b] = m;
      return (
        "#" +
        [r, g, b]
          .map((v) => parseInt(v, 10).toString(16).padStart(2, "0"))
          .join("")
          .toUpperCase()
      );
    };
    document.querySelectorAll("body *").forEach((el) => {
      const style = getComputedStyle(el);
      [style.color, style.backgroundColor].forEach((v) => {
        const hex = toHex(v);
        if (hex) hexes.add(hex);
      });
    });
    return Array.from(hexes);
  });
}

// RegionalMap (Leaflet) is dynamically imported and depends on two external
// network fetches (leaflet CSS/JS chunk + world-atlas topojson from jsdelivr).
// Wait for its container class to materialise before screenshotting so we
// don't capture a blank map mid-load. Non-fatal if it never appears.
export async function waitForMapReady(page: Page, timeoutMs = 12000): Promise<boolean> {
  try {
    await page.waitForSelector(".leaflet-container", { timeout: timeoutMs, state: "attached" });
    await page.waitForSelector(".ranna-dot", { timeout: timeoutMs, state: "attached" });
    return true;
  } catch {
    return false;
  }
}

export function sanitizeViewportName(name: string): string {
  return name.replace(/[^a-z0-9x]/gi, "-");
}
