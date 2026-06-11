"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

function CountUp({ value, plus = false }: { value: number; plus?: boolean }) {
  const numRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = numRef.current;
    if (!el) return;

    const obj = { val: 0 };
    ScrollTrigger.create({
      trigger: el,
      start: "top 88%",
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          val: value,
          duration: 1.8,
          ease: "power2.out",
          onUpdate: () => {
            el.textContent = String(Math.round(obj.val));
          },
        });
      },
    });
  }, [value]);

  return (
    <>
      <span ref={numRef}>0</span>
      {plus && (
        <sup
          style={{
            fontSize: "0.42em",
            verticalAlign: "super",
            lineHeight: 0,
            fontWeight: 700,
          }}
        >
          +
        </sup>
      )}
    </>
  );
}

const LOGOS = [
  { file: "f1.png",           label: "Formula 1 STC Saudi Arabian Grand Prix" },
  { file: "wta.png",          label: "WTA Finals Riyadh" },
  { file: "saudi_games.png",  label: "Saudi Games" },
  { file: "joulat_riyadh.png",label: "Joulat Al-Riyadh" },
  { file: "extreme_e.png",    label: "Extreme E" },
  { file: "rolls_royce.png",  label: "Rolls Royce" },
  { file: "fifa_cwc.png",     label: "FIFA Club World Cup" },
  { file: "dakar.png",        label: "Dakar Rally" },
  { file: "neom.png",         label: "NEOM" },
  { file: "range_rover.webp", label: "Range Rover" },
  { file: "formula_e.png",    label: "ABB Formula E" },
  { file: "beesline.png",     label: "Beesline" },
  { file: "ims.png",          label: "International MICE Summit" },
  { file: "riyadh_combat.png",label: "Riyadh 2023 World Combat Games" },
  { file: "wef.png",          label: "World Economic Forum" },
  { file: "smf.png",          label: "Saudi Media Forum" },
  { file: "pfl.png",          label: "Professional Fighters League" },
  { file: "tantora.png",      label: "Winter at Tantora" },
  { file: "riyadh25.png",     label: "Riyadh 2025 — Islamic Solidarity Games" },
  { file: "diriyah.png",      label: "Diriyah Season" },
  { file: "alula.png",        label: "AlUla Camel Cup" },
  { file: "jeddah_season.png",label: "Jeddah Season" },
  { file: "byblos.png",       label: "Byblos International Festival" },
];

const STATS: { v: number | string; plus?: boolean; k: string }[] = [
  { v: 55,     plus: true,  k: "Events Delivered" },
  { v: "10+",  plus: false, k: "Years of Combined Team Experience" },
  { v: 4,      plus: false, k: "Studios" },
  { v: "500K+",plus: false, k: "Event Attendees" },
];

export default function CredibilitySection() {
  const isMobile  = useIsMobile();
  const statsRef  = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const seeWorkLineRef = useRef<HTMLSpanElement>(null);
  const logoHeadingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (statsRef.current) {
        const cells = statsRef.current.querySelectorAll("[data-stat]");
        gsap.from(cells, {
          opacity: 0,
          y: 60,
          scale: 0.95,
          stagger: 0.1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: { trigger: statsRef.current, start: "top 82%" },
        });
      }

      gsap.from(ctaRef.current, {
        opacity: 0,
        y: 20,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 88%" },
      });

      if (seeWorkLineRef.current && ctaRef.current) {
        gsap.fromTo(seeWorkLineRef.current,
          { width: "0%" },
          { width: "100%", duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 88%", once: true } }
        );
      }

      if (logoHeadingRef.current) {
        const words = logoHeadingRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: "105%",
          duration: 0.9,
          stagger: 0.05,
          ease: "power4.out",
          scrollTrigger: { trigger: logoHeadingRef.current, start: "top 82%" },
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: "var(--dust-white)" }}>
      {/* Stats band — D+D style */}
      <div
        style={{
          padding: "clamp(72px, 10vw, 140px) clamp(20px, 5vw, 88px) clamp(24px, 3vw, 40px)",
          color: "var(--pitch-black)",
        }}
      >
        <div
          ref={statsRef}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(4, 1fr)",
            gap: isMobile ? "clamp(20px, 4vw, 36px)" : "clamp(24px, 4vw, 64px)",
            justifyItems: "center",
            textAlign: "center",
          }}
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              data-stat
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "clamp(8px, 1.2vw, 16px)",
                width: "100%",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: isMobile ? "clamp(36px, 12vw, 64px)" : "clamp(64px, 10vw, 160px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  fontVariantNumeric: "tabular-nums",
                  lineHeight: 0.88,
                  color: "var(--pitch-black)",
                }}
              >
                {typeof stat.v === "string"
                  ? stat.v
                  : <CountUp value={stat.v} plus={stat.plus} />
                }
              </span>
              <span
                style={{
                  fontFamily: "var(--font-support)",
                  fontSize: "clamp(10px, 1vw, 13px)",
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: "var(--pitch-black)",
                  opacity: 0.55,
                  paddingTop: "clamp(4px, 0.6vw, 8px)",
                  borderTop: "1px solid rgba(8,0,53,0.15)",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                {stat.k}
              </span>
            </div>
          ))}
        </div>

        {/* SEE OUR WORK link */}
        <div
          ref={ctaRef}
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "clamp(48px, 7vw, 96px)",
          }}
        >
          <div style={{ display: "inline-block" }}>
            <Link
              href="/#work"
              className="cta-link-dark"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3.5vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.02em",
                color: "var(--pitch-black)",
                textDecoration: "none",
              }}
            >
              SEE OUR WORK
            </Link>
            <span ref={seeWorkLineRef} className="cta-underline" />
          </div>
        </div>
      </div>

      {/* Logo grid — D+D crosshair style */}
      <div
        style={{
          background: "var(--dust-white)",
          padding: "clamp(56px, 8vw, 112px) clamp(20px, 5vw, 88px) clamp(24px, 3vw, 40px)",
        }}
      >
        {/* Big centered heading — word-by-word reveal */}
        <h3
          ref={logoHeadingRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 6vw, 96px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            color: "var(--pitch-black)",
            margin: "0 0 clamp(40px, 6vw, 80px)",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          {[["Trusted", "by"], ["the", "region's"], ["biggest", "events"]].map((lineWords, li) => (
            <span key={li} style={{ display: "flex", gap: "0.28em", justifyContent: "center", lineHeight: 1.0, overflow: "hidden" }}>
              {lineWords.map((w, wi) => (
                <span key={wi} style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.05 }}>
                  <span data-word style={{ display: "inline-block" }}>{w}</span>
                </span>
              ))}
            </span>
          ))}
        </h3>

        {/* Logo carousel */}
        <div
          style={{
            overflow: "hidden",
            maskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)",
          }}
          aria-hidden="true"
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              width: "max-content",
              animation: "marquee 40s linear infinite",
              willChange: "transform",
            }}
          >
            {[0, 1].map((track) => (
              <div
                key={track}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "clamp(40px, 6vw, 96px)",
                  paddingRight: "clamp(40px, 6vw, 96px)",
                  flexShrink: 0,
                }}
              >
                {LOGOS.map((logo, i) => (
                  <Image
                    key={i}
                    src={`/logos/${logo.file}`}
                    alt={logo.label}
                    width={240}
                    height={128}
                    style={{ height: "clamp(80px, 9vw, 128px)", width: "auto", maxWidth: 240, objectFit: "contain", opacity: 0.55, filter: "grayscale(1)", mixBlendMode: "multiply" }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
