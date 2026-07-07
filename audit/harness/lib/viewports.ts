export interface ViewportDef {
  name: string;
  width: number;
  height: number;
}

// Prioritised smallest-first per audit brief. 767/768/769 triplet targets the
// useIsMobile() breakpoint boundary specifically (hooks/useIsMobile.ts: `< 768`).
export const VIEWPORTS: ViewportDef[] = [
  { name: "320x568", width: 320, height: 568 },
  { name: "360x800", width: 360, height: 800 },
  { name: "375x667", width: 375, height: 667 },
  { name: "390x844", width: 390, height: 844 },
  { name: "414x896", width: 414, height: 896 },
  { name: "767x844", width: 767, height: 844 },
  { name: "768x1024", width: 768, height: 1024 },
  { name: "769x844", width: 769, height: 844 },
  { name: "1024x768", width: 1024, height: 768 },
  { name: "1440x900", width: 1440, height: 900 },
];

export const MOBILE_BOUNDARY_VIEWPORTS = VIEWPORTS.filter((v) =>
  ["767x844", "768x1024", "769x844", "375x667"].includes(v.name)
);
