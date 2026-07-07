// Ground-truth design tokens for the Ranna Studios Rebrand 2.0 spec.
// Source of truth: app/globals.css :root (NOT tailwind.config.ts, which is stale — see RECON.md).

export const LOCKED_PALETTE: Record<string, string> = {
  "ember-dawn": "#FB9203",
  "burnt-horizon": "#E3500A",
  "crimson-bloom": "#C91B7A",
  "veil-becoming": "#68097D",
  "dusk-matter": "#3F184D",
  "abyssal-black": "#080035",
};

// Pure black/white + structural neutral greys are explicitly allowed by the brief.
export const ALLOWED_NEUTRAL_HEXES = new Set([
  "#FFFFFF",
  "#000000",
  "#FBF9F9", // --dust-white
  "#FAFAFA",
]);

export const EXPECTED_FONT_DISPLAY = "Poppins"; // headings + body
export const EXPECTED_FONT_SUPPORT = "Prompt"; // UI / meta / kicker text
export const EXPECTED_BORDER_RADIUS = "0px";
export const MIN_INPUT_FONT_SIZE_PX = 16; // iOS Safari auto-zoom threshold
export const MIN_TAP_TARGET_PX = 44;

export function hexDistance(a: string, b: string): number {
  const pa = hexToRgb(a);
  const pb = hexToRgb(b);
  if (!pa || !pb) return Infinity;
  return Math.sqrt((pa.r - pb.r) ** 2 + (pa.g - pb.g) ** 2 + (pa.b - pb.b) ** 2);
}

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.trim());
  if (!m) return null;
  return { r: parseInt(m[1], 16), g: parseInt(m[2], 16), b: parseInt(m[3], 16) };
}

export function rgbStringToHex(rgb: string): string | null {
  const m = /rgba?\((\d+),\s*(\d+),\s*(\d+)/.exec(rgb);
  if (!m) return null;
  const [, r, g, b] = m;
  return (
    "#" +
    [r, g, b]
      .map((v) => parseInt(v, 10).toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Is a color "off-palette"? Returns null if compliant/neutral, else the nearest locked color for reference.
export function checkPaletteCompliance(hex: string): { compliant: boolean; nearest?: string; distance?: number } {
  const upper = hex.toUpperCase();
  if (ALLOWED_NEUTRAL_HEXES.has(upper)) return { compliant: true };
  for (const value of Object.values(LOCKED_PALETTE)) {
    if (value.toUpperCase() === upper) return { compliant: true };
  }
  // Neutral greyscale check: R≈G≈B → treat as structural neutral, allowed.
  const rgb = hexToRgb(upper);
  if (rgb) {
    const { r, g, b } = rgb;
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    if (max - min <= 8) return { compliant: true }; // near-greyscale
  }
  let nearest = "";
  let best = Infinity;
  for (const [name, value] of Object.entries(LOCKED_PALETTE)) {
    const d = hexDistance(upper, value);
    if (d < best) {
      best = d;
      nearest = name;
    }
  }
  return { compliant: false, nearest, distance: best };
}
