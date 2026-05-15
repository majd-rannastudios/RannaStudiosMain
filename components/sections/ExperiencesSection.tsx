"use client";
import { useState } from "react";
import { MetaLabel, Reveal } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

const BRAND_COLORS = [
  { bg: "var(--ember-dawn)",    dark: true  },
  { bg: "var(--burnt-horizon)", dark: true  },
  { bg: "var(--crimson-bloom)", dark: false },
  { bg: "var(--veil-becoming)", dark: false },
  { bg: "var(--dusk-matter)",   dark: false },
  { bg: "var(--abyssal-black)", dark: false },
];

const EVENT_TYPES = [
  { name: "Mega Cultural & Sporting Events",    desc: "Stadium-scale operations for tournaments, seasons, and national events.",   best: "F1 · FIFA · Saudi Games · National Day" },
  { name: "Fan Zones & Public Activations",     desc: "Immersive outdoor spaces that turn passers-by into participants.",           best: "Circuit · Stadium-Adjacent · City Centers" },
  { name: "VIP & Hospitality Experiences",      desc: "Curated moments for elite audiences — intimate, flawless, memorable.",       best: "Paddock Clubs · Gala Lounges · Private Suites" },
  { name: "Brand Pop-Ups & Product Launches",   desc: "Concept-to-delivery activations that bring brands to life.",                 best: "Retail · Malls · Exhibition Stands" },
  { name: "Corporate Retreats & Outings",       desc: "Purposeful experiences that build culture and loyalty.",                     best: "Resorts · Outdoor Venues · Bespoke Locations" },
  { name: "Gala Dinners & Awards Ceremonies",   desc: "Ceremonial events designed for prestige and lasting impression.",            best: "Ballrooms · Rooftops · Heritage Sites" },
  { name: "Kids Areas & Family Zones",          desc: "Safe, engaging environments for all ages within larger events.",             best: "Season Zones · Public Spaces · Theme Parks" },
  { name: "Weddings & Social Celebrations",     desc: "Luxury social events crafted with creative precision.",                      best: "Bespoke Venues · Destination Weddings" },
  { name: "Fashion Shows & Luxury Brand Events",desc: "High-production runway and brand experiences for discerning audiences.",     best: "Runways · Brand Houses · Cultural Venues" },
  { name: "Museum Openings & Public Spaces",    desc: "Interpretive spatial experiences that educate and inspire.",                 best: "NEOM · Heritage Sites · Cultural Districts" },
  { name: "Government Inaugurations",           desc: "National-scale events handled with operational and protocol discipline.",    best: "Ministries · Vision 2030 · Summits" },
  { name: "Conferences & Summits",              desc: "Multi-stage delegate experiences from concept through to post-event.",       best: "WEF · Investor Forums · Regional Summits" },
];

export default function ExperiencesSection() {
  const isMobile = useIsMobile();
  const [openItem, setOpenItem] = useState<number | null>(null);
  return (
    <section
      id="experiences"
      style={{
        background: "var(--dust-white)",
        color: "var(--pitch-black)",
        padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
      }}
    >
      <div
        style={{
          marginBottom: "clamp(48px, 6vw, 96px)",
        }}
      >
        <Reveal>
          <MetaLabel color="var(--burnt-horizon)">event formats</MetaLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.4vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              color: "var(--pitch-black)",
              margin: "16px 0 0",
              maxWidth: "16ch",
            }}
          >
            Every format,{" "}
            <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>every scale</em>.
          </h2>
        </Reveal>
      </div>

      {/* Desktop: 3-column cards */}
      {!isMobile && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 3 }}>
          {EVENT_TYPES.map((e, i) => {
            const palette = BRAND_COLORS[i % BRAND_COLORS.length];
            const textOnHover = palette.dark ? "var(--pitch-black)" : "var(--dust-white)";
            return (
              <a
                key={i}
                href="#proposal"
                style={{
                  position: "relative",
                  background: `color-mix(in oklab, ${palette.bg} 20%, var(--dust-white))`,
                  color: "var(--pitch-black)",
                  padding: "clamp(24px, 3vw, 40px)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 12,
                  textDecoration: "none",
                  overflow: "hidden",
                  minHeight: 220,
                  transition: "color 280ms cubic-bezier(.6,0,.2,1)",
                }}
                onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  const bg = el.querySelector("[data-card-bg]") as HTMLElement | null;
                  if (bg) bg.style.opacity = "1";
                  el.style.color = textOnHover;
                  const sub = el.querySelector("[data-sub]") as HTMLElement | null;
                  if (sub) sub.style.color = palette.dark ? "rgba(0,0,0,0.65)" : "rgba(255,255,255,0.7)";
                  const meta = el.querySelector("[data-meta]") as HTMLElement | null;
                  if (meta) meta.style.color = palette.dark ? "rgba(0,0,0,0.45)" : "rgba(255,255,255,0.5)";
                }}
                onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                  const el = e.currentTarget;
                  const bg = el.querySelector("[data-card-bg]") as HTMLElement | null;
                  if (bg) bg.style.opacity = "0";
                  el.style.color = "var(--pitch-black)";
                  const sub = el.querySelector("[data-sub]") as HTMLElement | null;
                  if (sub) sub.style.color = "rgba(8,0,53,0.6)";
                  const meta = el.querySelector("[data-meta]") as HTMLElement | null;
                  if (meta) meta.style.color = "rgba(8,0,53,0.35)";
                }}
              >
                <span data-card-bg style={{ position: "absolute", inset: 0, background: palette.bg, opacity: 0, transition: "opacity 280ms cubic-bezier(.6,0,.2,1)" }} />
                <span style={{ position: "absolute", right: 20, top: 16, fontFamily: "var(--font-display)", fontSize: "clamp(64px, 6vw, 96px)", fontWeight: 700, letterSpacing: "-0.04em", color: "rgba(8,0,53,0.06)", lineHeight: 1, userSelect: "none", pointerEvents: "none" }}>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 1.5vw, 22px)", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.2 }}>{e.name}</span>
                  <span data-sub style={{ fontSize: 14, lineHeight: 1.5, color: "rgba(8,0,53,0.6)", maxWidth: "32ch", transition: "color 280ms" }}>{e.desc}</span>
                </div>
                <div data-meta style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.14em", textTransform: "lowercase", color: "rgba(8,0,53,0.35)", marginTop: "auto", transition: "color 280ms" }}>{e.best}</div>
              </a>
            );
          })}
        </div>
      )}

      {/* Mobile: 1-column accordion list */}
      {isMobile && (
        <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
          {EVENT_TYPES.map((e, i) => {
            const palette = BRAND_COLORS[i % BRAND_COLORS.length];
            const isOpen = openItem === i;
            return (
              <div
                key={i}
                style={{
                  background: isOpen ? palette.bg : `color-mix(in oklab, ${palette.bg} 12%, var(--dust-white))`,
                  transition: "background 280ms ease",
                  overflow: "hidden",
                }}
              >
                <button
                  onClick={() => setOpenItem(isOpen ? null : i)}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    padding: "18px 20px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 12,
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.16em", color: isOpen ? (palette.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)") : "rgba(8,0,53,0.35)", minWidth: 22 }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontFamily: "var(--font-display)", fontSize: 15, fontWeight: 600, letterSpacing: "-0.01em", lineHeight: 1.2, color: isOpen ? (palette.dark ? "var(--pitch-black)" : "var(--dust-white)") : "var(--pitch-black)" }}>
                      {e.name}
                    </span>
                  </div>
                  <span style={{ fontSize: 18, color: isOpen ? (palette.dark ? "rgba(0,0,0,0.5)" : "rgba(255,255,255,0.6)") : "rgba(8,0,53,0.35)", flexShrink: 0, lineHeight: 1 }}>
                    {isOpen ? "−" : "+"}
                  </span>
                </button>
                <div style={{ maxHeight: isOpen ? 200 : 0, overflow: "hidden", transition: "max-height 320ms cubic-bezier(.4,0,.2,1)" }}>
                  <div style={{ padding: "0 20px 18px 46px" }}>
                    <p style={{ fontSize: 13, lineHeight: 1.55, color: isOpen ? (palette.dark ? "rgba(0,0,0,0.72)" : "rgba(255,255,255,0.8)") : "rgba(8,0,53,0.6)", margin: "0 0 10px" }}>{e.desc}</p>
                    <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.14em", textTransform: "lowercase", color: isOpen ? (palette.dark ? "rgba(0,0,0,0.4)" : "rgba(255,255,255,0.45)") : "rgba(8,0,53,0.35)" }}>{e.best}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
