import { test, expect } from "@playwright/test";
import fs from "fs";
import path from "path";
import { ROUTES } from "../lib/routes";

const RESULTS_DIR = path.resolve(__dirname, "../results");
fs.mkdirSync(RESULTS_DIR, { recursive: true });

test("crawl internal links and anchors for dead links / external link hygiene", async ({ page, request }) => {
  const seen = new Set<string>();
  const brokenLinks: { from: string; href: string; status?: number; error?: string }[] = [];
  const externalLinkIssues: { from: string; href: string; issue: string }[] = [];
  const deadAnchors: { from: string; href: string }[] = [];

  for (const route of ROUTES) {
    await page.goto(route.path, { waitUntil: "networkidle" });
    const links = await page.evaluate(() =>
      Array.from(document.querySelectorAll("a[href]")).map((a) => ({
        href: (a as HTMLAnchorElement).getAttribute("href") || "",
        target: (a as HTMLAnchorElement).getAttribute("target"),
        rel: (a as HTMLAnchorElement).getAttribute("rel"),
      }))
    );

    for (const link of links) {
      const { href, target, rel } = link;
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("javascript:")) continue;

      if (href.startsWith("http") && !href.includes("rannastudios.com")) {
        if (target === "_blank" && (!rel || !rel.includes("noopener"))) {
          externalLinkIssues.push({ from: route.path, href, issue: "target=_blank without rel=noopener" });
        }
        continue; // don't fetch third-party URLs
      }

      if (href.includes("#")) {
        const [pathPart, hash] = href.split("#");
        if (hash && (pathPart === "" || pathPart === route.path)) {
          const exists = await page.evaluate((id) => !!document.getElementById(id), hash);
          if (!exists) deadAnchors.push({ from: route.path, href });
          continue;
        }
      }

      const key = `${route.path}=>${href}`;
      if (seen.has(key)) continue;
      seen.add(key);

      try {
        const res = await request.get(href, { failOnStatusCode: false });
        if (res.status() >= 400) brokenLinks.push({ from: route.path, href, status: res.status() });
      } catch (e) {
        brokenLinks.push({ from: route.path, href, error: String(e) });
      }
    }
  }

  fs.writeFileSync(
    path.join(RESULTS_DIR, "links-crawl.json"),
    JSON.stringify({ brokenLinks, externalLinkIssues, deadAnchors }, null, 2)
  );

  expect.soft(brokenLinks, `Broken internal links found: ${JSON.stringify(brokenLinks)}`).toEqual([]);
  expect.soft(deadAnchors, `Dead anchors found: ${JSON.stringify(deadAnchors)}`).toEqual([]);
});
