export interface RouteDef {
  path: string;
  slug: string; // filesystem-safe name for screenshots/results
  hasMap: boolean; // renders RegionalMap (Leaflet, async network-dependent)
}

export const ROUTES: RouteDef[] = [
  { path: "/", slug: "home", hasMap: true },
  { path: "/about", slug: "about", hasMap: true },
  { path: "/contact", slug: "contact", hasMap: false },
  { path: "/work", slug: "work", hasMap: false },
  { path: "/news", slug: "news", hasMap: false },
  { path: "/news/f1-sagp-fan-zone-2025", slug: "news-slug", hasMap: false },
];
