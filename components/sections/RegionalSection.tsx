"use client";
import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { MetaLabel } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

const RegionalMap = dynamic(() => import("@/components/RegionalMap"), { ssr: false });

const MARKETS = [
  { code: "ksa", name: "Saudi Arabia",         capital: "Riyadh · Jeddah · Dammam · NEOM", lat: 24.0,  lng: 45.0,  zoom: 5 },
  { code: "uae", name: "United Arab Emirates", capital: "Dubai · Abu Dhabi",       lat: 24.4,  lng: 54.6,  zoom: 7 },
  { code: "qa",  name: "Qatar",                capital: "Doha",                    lat: 25.28, lng: 51.53, zoom: 9 },
  { code: "lb",  name: "Lebanon",              capital: "Beirut",                  lat: 33.88, lng: 35.85, zoom: 9 },
];

export default function RegionalSection() {
  const isMobile    = useIsMobile();
  const sectionRef  = useRef<HTMLElement>(null);
  const headingRef  = useRef<HTMLDivElement>(null);
  const marketsRef  = useRef<HTMLDivElement>(null);
  const mapRef      = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const leafletMap  = useRef<any>(null);

  const flyToMarket = (lat: number, lng: number, zoom: number) => {
    leafletMap.current?.flyTo([lat, lng], zoom, { animate: true, duration: 1.4 });
  };

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
        if (isMobile) {
          // Skip opacity/x animation on mobile — rows stay visible immediately
          gsap.set(rows, { opacity: 1, x: 0 });
        } else {
          gsap.from(rows, {
            opacity: 0,
            x: -32,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: marketsRef.current, start: "top 80%" },
          });
        }
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
  }, [isMobile]);

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

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1.2fr 1fr", gap: "clamp(40px, 5vw, 96px)", position: "relative" }}>
        {/* Markets list */}
        <div ref={marketsRef} style={{ display: "flex", flexDirection: "column" }}>
          {MARKETS.map((m, i) => (
            <div
              key={m.code}
              data-market
              role="button"
              tabIndex={0}
              onClick={() => flyToMarket(m.lat, m.lng, m.zoom)}
              onKeyDown={(e) => e.key === "Enter" && flyToMarket(m.lat, m.lng, m.zoom)}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                alignItems: "start",
                padding: "clamp(16px, 2vw, 28px) 0",
                gap: "clamp(16px, 2vw, 32px)",
                borderTop: "1px solid var(--rule-on-dark)",
                cursor: "pointer",
                transition: "padding-left 280ms cubic-bezier(.6,0,.2,1), color 280ms",
                color: "var(--dust-white)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.paddingLeft = "12px";
                (e.currentTarget as HTMLDivElement).style.color = "var(--crimson-bloom)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.paddingLeft = "0";
                (e.currentTarget as HTMLDivElement).style.color = "var(--dust-white)";
              }}
            >
              {/* Code */}
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

              {/* Name + city + contact link */}
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
            </div>
          ))}
          <div style={{ borderTop: "1px solid var(--rule-on-dark)" }} />
        </div>

        {/* Map — hidden on mobile */}
        {!isMobile && (
          <div
            ref={mapRef}
            style={{
              position: "relative",
              aspectRatio: "1",
              border: "1px solid var(--rule-on-dark)",
              overflow: "hidden",
            }}
          >
            <RegionalMap onReady={(m) => { leafletMap.current = m; }} />
          </div>
        )}
      </div>
    </section>
  );
}
