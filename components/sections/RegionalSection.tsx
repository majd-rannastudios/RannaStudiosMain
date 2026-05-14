"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { MetaLabel } from "@/components/Primitives";

const MARKETS = [
  { code: "ksa", name: "Saudi Arabia", capital: "Riyadh · Jeddah · NEOM", x: 50, y: 56 },
  { code: "uae", name: "United Arab Emirates", capital: "Dubai · Abu Dhabi", x: 67, y: 60 },
  { code: "qa", name: "Qatar", capital: "Doha", x: 60, y: 52 },
  { code: "lb", name: "Lebanon", capital: "Beirut", x: 24, y: 30 },
];

export default function RegionalSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const marketsRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const lines = headingRef.current.querySelectorAll("[data-line]");
        gsap.from(lines, {
          y: "105%",
          duration: 1.0,
          stagger: 0.06,
          ease: "power4.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 82%" },
        });
        gsap.from(headingRef.current.querySelector("[data-meta]"), {
          opacity: 0, y: 12, duration: 0.6, ease: "power2.out",
          scrollTrigger: { trigger: headingRef.current, start: "top 84%" },
        });
      }

      if (marketsRef.current) {
        const rows = marketsRef.current.querySelectorAll("[data-market]");
        gsap.from(rows, {
          opacity: 0,
          x: -32,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: { trigger: marketsRef.current, start: "top 80%" },
        });
      }

      if (mapRef.current) {
        gsap.from(mapRef.current, {
          opacity: 0,
          scale: 0.96,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: { trigger: mapRef.current, start: "top 82%" },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="regional"
      style={{
        background: "var(--dusk-matter)",
        color: "var(--dust-white)",
        padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Background glow — purple only */}
      <div
        style={{
          position: "absolute",
          left: "-10%",
          bottom: "-20%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--veil-becoming) 50%, transparent), transparent 70%)",
          filter: "blur(60px)",
          opacity: 0.45,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      {/* Centered heading */}
      <div
        ref={headingRef}
        style={{
          textAlign: "center",
          marginBottom: "clamp(40px, 6vw, 88px)",
          position: "relative",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 6vw, 96px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            margin: "16px 0 0",
            textAlign: "center",
            textTransform: "uppercase",
            color: "var(--dust-white)",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "0 0.25em",
          }}
        >
          {["Built", "Where", "It"].map((w, i) => (
            <span key={i} style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.05 }}>
              <span data-line style={{ display: "inline-block", fontWeight: 700 }}>{w}</span>
            </span>
          ))}
          <span style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.05 }}>
            <span data-line style={{ display: "inline-block", color: "rgba(255,255,255,0.35)", fontWeight: 300 }}>
              Happens.
            </span>
          </span>
        </h2>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "clamp(40px, 5vw, 96px)", position: "relative" }}>
        {/* Markets list */}
        <div ref={marketsRef} style={{ display: "flex", flexDirection: "column" }}>
          {MARKETS.map((m, i) => (
            <Link
              key={m.code}
              data-market
              href={`/contact?country=${encodeURIComponent(m.name)}#proposal`}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "start",
                padding: "clamp(16px, 2vw, 28px) 0",
                gap: "clamp(16px, 2vw, 32px)",
                borderTop: "1px solid var(--rule-on-dark)",
                cursor: "pointer",
                transition: "padding 280ms cubic-bezier(.6,0,.2,1), color 280ms",
                textDecoration: "none",
                color: "var(--dust-white)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "12px";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--crimson-bloom)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.paddingLeft = "0";
                (e.currentTarget as HTMLAnchorElement).style.color = "var(--dust-white)";
              }}
            >
              {/* Code — capability-name style */}
              <span style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(13px, 1.2vw, 17px)",
                fontWeight: 600,
                letterSpacing: "-0.01em",
                color: "rgba(255,255,255,0.4)",
                paddingTop: "clamp(6px, 0.6vw, 10px)",
                whiteSpace: "nowrap",
              }}>
                {m.code.toUpperCase()} · 0{i + 1}
              </span>

              {/* Name + city */}
              <span>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 3.2vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.88,
                  textTransform: "uppercase",
                }}>
                  {m.name}
                </span>
                <span style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(13px, 1.2vw, 17px)",
                  fontWeight: 600,
                  letterSpacing: "-0.01em",
                  color: "rgba(255,255,255,0.5)",
                  marginTop: "clamp(4px, 0.5vw, 8px)",
                }}>
                  {m.capital}
                </span>
              </span>
            </Link>
          ))}
          <div style={{ borderTop: "1px solid var(--rule-on-dark)" }} />
        </div>

        {/* Map */}
        <div
          ref={mapRef}
          style={{ position: "relative", aspectRatio: "1", border: "1px solid var(--rule-on-dark)", background: "var(--abyssal-black)", padding: 24 }}
        >
          {/* Grid background */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0/ 8.333% 100%, linear-gradient(to bottom, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0/ 100% 8.333%",
            }}
          />
          <div style={{ position: "relative", fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.16em", textTransform: "lowercase", color: "var(--fg-muted-on-dark)", display: "flex", justifyContent: "space-between" }}>
            <span>map / gcc + lev</span>
            <span>04 markets</span>
          </div>

          {/* Abstract land outlines */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.16 }}>
            <path d="M18,28 Q22,25 26,29 Q30,32 32,30 Q34,28 36,30 L34,36 Q32,40 30,42 L24,46 L20,40 L18,32 Z" fill="none" stroke="#FBF9F9" strokeWidth="0.4" />
            <path d="M40,40 L62,42 Q72,42 76,46 L84,50 Q88,54 84,60 Q80,68 72,72 L60,72 L52,68 L46,60 L42,52 Q40,46 40,40 Z" fill="none" stroke="#FBF9F9" strokeWidth="0.4" />
          </svg>

          {/* Connecting arcs — purple */}
          <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
            <path d="M24,30 Q40,18 50,56" fill="none" stroke="var(--veil-becoming)" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.8" />
            <path d="M50,56 Q56,50 60,52" fill="none" stroke="var(--veil-becoming)" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.8" />
            <path d="M50,56 Q60,58 67,60" fill="none" stroke="var(--veil-becoming)" strokeWidth="0.4" strokeDasharray="1 1" opacity="0.8" />
          </svg>

          {/* Market pins — purple */}
          {MARKETS.map((m) => (
            <span
              key={m.code}
              data-name={m.name.toLowerCase()}
              style={{
                position: "absolute",
                width: 14,
                height: 14,
                background: "var(--veil-becoming)",
                borderRadius: "50%",
                boxShadow: "0 0 0 6px color-mix(in oklab, var(--veil-becoming) 30%, transparent)",
                transform: "translate(-50%, -50%)",
                left: `${m.x}%`,
                top: `${m.y}%`,
              }}
            >
              <span
                style={{
                  position: "absolute",
                  left: 22,
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontFamily: "var(--font-support)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "lowercase",
                  color: "var(--dust-white)",
                  whiteSpace: "nowrap",
                }}
              >
                {m.name.toLowerCase()}
              </span>
              <span
                style={{
                  position: "absolute",
                  inset: -6,
                  border: "1px solid var(--veil-becoming)",
                  borderRadius: "50%",
                  opacity: 0.5,
                  animation: "ring 2.4s ease-out infinite",
                }}
              />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
