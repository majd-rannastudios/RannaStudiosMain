"use client";
import { useState } from "react";
import { MetaLabel, Reveal, Lz } from "@/components/Primitives";

interface Case {
  super: string;
  name: string;
  desc: string;
  tint: string;
  photos: string[];
  specs: { k: string; v: string }[];
  side?: string;
}

const CASES: Case[] = [
  {
    super: "case 01_ · activation × production",
    name: "Formula 1 Saudi Arabian Grand Prix",
    desc: "Fan zone experience and VIP activation across the Jeddah Corniche Circuit — immersive themed zones, premium hospitality, and cross-day operational coordination for 100k+ daily attendees.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.45) 0%, rgba(227,80,10,0.35) 100%)",
    photos: ["/cases/sagp-1.jpg", "/cases/sagp-2.jpg", "/cases/sagp-3.jpg", "/cases/sagp-4.jpg"],
    specs: [
      { k: "location", v: "Jeddah, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Production" },
      { k: "audience", v: "300,000+ across event days" },
      { k: "scope",    v: "fan zones · vip hospitality · staffing" },
      { k: "outcome",  v: "highest fan-zone dwell time on record" },
    ],
    side: "live",
  },
  {
    super: "case 02_ · activation × creative",
    name: "Rolls Royce",
    desc: "Curated brand evening for Rolls Royce — full spatial design, bespoke guest journey, and live operations at a private Riyadh venue. An intimate format built to match the brand's standard.",
    tint: "linear-gradient(160deg, rgba(15,15,15,0.55) 0%, rgba(63,24,77,0.45) 100%)",
    photos: ["/cases/rollsroyce-1.jpg", "/cases/rollsroyce-2.jpg", "/cases/rollsroyce-3.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Creative" },
      { k: "audience", v: "Invite-only · ultra-high-net-worth" },
      { k: "scope",    v: "spatial design · guest experience · ops" },
      { k: "outcome",  v: "full brand night delivered on brief" },
    ],
  },
  {
    super: "case 03_ · activation × production",
    name: "The Saudi Games",
    desc: "National multi-sport activations across venues — fan engagement zones, cultural programming, and event operations for one of the Kingdom's flagship sporting competitions.",
    tint: "linear-gradient(160deg, rgba(63,24,77,0.5) 0%, rgba(201,27,122,0.35) 100%)",
    photos: ["/cases/sg-1.jpg", "/cases/sg-2.jpg", "/cases/sg-3.jpg", "/cases/sg-4.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2024" },
      { k: "studios",  v: "Activations · Creative · Production" },
      { k: "audience", v: "Multi-venue · national scale" },
      { k: "scope",    v: "fan activations · cultural zones · ops" },
      { k: "outcome",  v: "delivered across all competition days" },
    ],
  },
  {
    super: "case 04_ · production × activations",
    name: "WTA Finals Riyadh",
    desc: "End-to-end event production and guest experience for the WTA Finals — arrival flow, premium hospitality, on-court activations, and multi-day operational management.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.55) 0%, rgba(104,9,125,0.4) 100%)",
    photos: ["/cases/wta-1.jpg", "/cases/wta-2.jpg", "/cases/wta-3.jpg", "/cases/wta-4.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Production · Activations" },
      { k: "audience", v: "International · VIP · public" },
      { k: "scope",    v: "guest flow · hospitality · activations" },
      { k: "outcome",  v: "full tournament operations delivered" },
    ],
  },
  {
    super: "case 05_ · production × creative",
    name: "Islamic Solidarity Games",
    desc: "Operational and creative production across the ISG — venue activations, gala dinner design and production, and multi-day event management for an international audience.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.5) 0%, rgba(227,80,10,0.3) 100%)",
    photos: ["/cases/isg-1.jpg", "/cases/isg-2.jpg", "/cases/isg-3.jpg", "/cases/isg-4.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Production · Creative · Activations" },
      { k: "audience", v: "International athletes · officials" },
      { k: "scope",    v: "venue ops · gala dinner · activations" },
      { k: "outcome",  v: "gala dinner rated best-in-show" },
    ],
  },
  {
    super: "case 06_ · activation × creative",
    name: "Range Rover Activation",
    desc: "Immersive brand activation and experiential launch for Range Rover — concept through build, on-ground guest journey design, and live operations at a curated Riyadh venue.",
    tint: "linear-gradient(160deg, rgba(15,15,15,0.5) 0%, rgba(63,24,77,0.45) 100%)",
    photos: ["/cases/rr-1.jpg", "/cases/rr-2.jpg", "/cases/rr-3.jpg", "/cases/rr-4.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Creative" },
      { k: "audience", v: "Invite-only · brand guests" },
      { k: "scope",    v: "spatial design · guest experience · ops" },
      { k: "outcome",  v: "full brand night delivered on brief" },
    ],
  },
];

function CaseCarousel({ c, i }: { c: Case; i: number }) {
  const [idx, setIdx] = useState(0);
  const total = c.photos.length;
  const prev = () => setIdx((idx - 1 + total) % total);
  const next = () => setIdx((idx + 1) % total);

  const btnStyle: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 4,
    width: 36,
    height: 36,
    background: "rgba(0,0,0,0.45)",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "var(--dust-white)",
    fontFamily: "var(--font-display)",
    fontSize: 14,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    backdropFilter: "blur(4px)",
    WebkitBackdropFilter: "blur(4px)",
    transition: "background 180ms",
    lineHeight: 1,
    padding: 0,
  };

  return (
    <div
      style={{
        position: "relative",
        aspectRatio: "16 / 10",
        overflow: "hidden",
        background: "var(--abyssal-black)",
        order: 1,
      }}
    >
      {/* Photos — stacked, fade between them */}
      {c.photos.map((src, j) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={j}
          src={src}
          alt={j === 0 ? c.name : ""}
          aria-hidden={j !== 0}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: j === idx ? 1 : 0,
            transition: "opacity 420ms cubic-bezier(.6,0,.2,1)",
          }}
        />
      ))}

      {/* Brand tint */}
      <div style={{ position: "absolute", inset: 0, background: c.tint, pointerEvents: "none", zIndex: 1 }} />

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0/ 60px 100%, linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0/ 100% 60px", pointerEvents: "none", zIndex: 2 }} />

      {/* Top label bar */}
      <div style={{ position: "absolute", left: 16, right: 16, top: 16, display: "flex", justifyContent: "space-between", fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "rgba(255,255,255,0.75)", zIndex: 4 }}>
        <span style={{ color: "var(--burnt-horizon)", display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Lz color="var(--burnt-horizon)" />
          {c.side || "case"}
        </span>
        <span>ranna · {String(i + 1).padStart(3, "0")} / {String(CASES.length).padStart(3, "0")}</span>
      </div>

      {/* Corner brackets */}
      <div style={{ position: "absolute", inset: 16, pointerEvents: "none", zIndex: 3 }}>
        <div style={{ position: "absolute", top: 0, left: 0, width: 16, height: 16, border: "1px solid rgba(255,255,255,0.4)", borderRight: 0, borderBottom: 0 }} />
        <div style={{ position: "absolute", top: 0, right: 0, width: 16, height: 16, border: "1px solid rgba(255,255,255,0.4)", borderLeft: 0, borderBottom: 0 }} />
        <div style={{ position: "absolute", bottom: 0, left: 0, width: 16, height: 16, border: "1px solid rgba(255,255,255,0.4)", borderRight: 0, borderTop: 0 }} />
        <div style={{ position: "absolute", bottom: 0, right: 0, width: 16, height: 16, border: "1px solid rgba(255,255,255,0.4)", borderLeft: 0, borderTop: 0 }} />
      </div>

      {/* Prev / Next arrows */}
      {total > 1 && (
        <>
          <button
            onClick={prev}
            style={{ ...btnStyle, left: 16 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.45)"; }}
            aria-label="Previous photo"
          >
            ←
          </button>
          <button
            onClick={next}
            style={{ ...btnStyle, right: 16 }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.7)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(0,0,0,0.45)"; }}
            aria-label="Next photo"
          >
            →
          </button>
        </>
      )}

      {/* Counter + dot indicators */}
      <div
        style={{
          position: "absolute",
          bottom: 16,
          left: 0,
          right: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: 8,
          zIndex: 4,
        }}
      >
        {c.photos.map((_, j) => (
          <button
            key={j}
            onClick={() => setIdx(j)}
            aria-label={`Photo ${j + 1}`}
            style={{
              width: 6,
              height: 6,
              background: j === idx ? "var(--dust-white)" : "rgba(255,255,255,0.3)",
              border: 0,
              padding: 0,
              cursor: "pointer",
              transform: "rotate(45deg)",
              transition: "background 200ms, transform 200ms",
              flexShrink: 0,
            }}
          />
        ))}
      </div>

      {/* Photo counter */}
      <div
        style={{
          position: "absolute",
          bottom: 14,
          right: 20,
          zIndex: 4,
          fontFamily: "var(--font-support)",
          fontSize: 10,
          letterSpacing: "0.14em",
          color: "rgba(255,255,255,0.5)",
        }}
      >
        {String(idx + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
      </div>
    </div>
  );
}

export default function SelectedWorkSection() {
  return (
    <section id="work">
      {/* Header — white background */}
      <div
        style={{
          background: "var(--dust-white)",
          color: "var(--pitch-black)",
          padding: "clamp(64px, 8vw, 112px) clamp(20px, 5vw, 88px) clamp(40px, 5vw, 64px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "clamp(24px, 5vw, 80px)",
            alignItems: "end",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 2.8vw, 44px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--pitch-black)",
                margin: "16px 0 0",
                maxWidth: "18ch",
              }}
            >
              Events we&apos;ve put on the{" "}
              <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>map</em>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "color-mix(in oklab, var(--pitch-black) 55%, transparent)", lineHeight: 1.55, maxWidth: "48ch", margin: 0 }}>
              A selection of events delivered across the GCC. Most engagements operate under
              non-disclosure — case studies released by partner approval.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Cases — white background */}
      <div style={{ background: "var(--dust-white)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", borderTop: "1px solid var(--rule-on-light)" }}>
        {CASES.map((c, i) => (
          <Reveal
            key={i}
            as="div"
            delay={60}
            style={{
              display: "grid",
              gridTemplateColumns: "1.3fr 1fr",
              gap: "clamp(24px, 4vw, 56px)",
              padding: "clamp(24px, 3vw, 40px) clamp(20px, 5vw, 88px)",
              borderBottom: "1px solid var(--rule-on-light)",
              alignItems: "center",
            }}
          >
            <CaseCarousel c={c} i={i} />

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, paddingTop: 8, order: 2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.16em", textTransform: "lowercase", color: "var(--burnt-horizon)", display: "inline-flex", gap: 14, alignItems: "center" }}>
                  <span style={{ width: 28, height: 1, background: "var(--burnt-horizon)", display: "inline-block" }} />
                  {c.super}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 52px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.0, margin: 0, color: "var(--pitch-black)" }}>
                  {c.name}.
                </h3>
                <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--fg-muted-on-light)", maxWidth: "48ch" }}>
                  {c.desc}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 24px", borderTop: "1px solid var(--rule-on-light)", paddingTop: 20 }}>
                {c.specs.map((s, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)", marginBottom: 4 }}>{s.k}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.4, color: "var(--pitch-black)" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
      </div>
    </section>
  );
}
