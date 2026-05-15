"use client";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

const TICKER_ITEMS = [
  { word: "Immersive",    color: "var(--ember-dawn)" },
  { word: "Spectacular",  color: "var(--burnt-horizon)" },
  { word: "World-Class",  color: "var(--crimson-bloom)" },
  { word: "Ambitious",    color: "var(--veil-becoming)" },
  { word: "Precise",      color: "var(--dust-white)" },
];

export default function RotatingStatementSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const tickerRef  = useRef<HTMLDivElement>(null);
  const copyRef    = useRef<HTMLDivElement>(null);
  const tweenRef   = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const el = tickerRef.current;
      if (!el) return;

      // Measure single-set width after render
      const singleWidth = el.scrollWidth / 2;

      // Continuous seamless loop — always plays, never stops
      tweenRef.current = gsap.fromTo(
        el,
        { x: 0 },
        {
          x: -singleWidth,
          ease: "none",
          repeat: -1,
          duration: 22,
        }
      );

      // Boost playback rate while scrolling; settle back to 1× when still
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top bottom",
        end: "bottom top",
        onUpdate: (self) => {
          const vel = Math.abs(self.getVelocity());
          const target = 1 + vel / 600;
          gsap.to(tweenRef.current, {
            timeScale: target,
            duration: 0.4,
            ease: "power1.out",
            overwrite: "auto",
          });
        },
        onLeave: () => {
          gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: "power1.out", overwrite: "auto" });
        },
        onLeaveBack: () => {
          gsap.to(tweenRef.current, { timeScale: 1, duration: 1.2, ease: "power1.out", overwrite: "auto" });
        },
      });

      // Entrance fade for the copy below
      gsap.from(copyRef.current, {
        opacity: 0,
        y: 24,
        duration: 0.9,
        ease: "power3.out",
        scrollTrigger: { trigger: copyRef.current, start: "top 84%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "#080035",
        padding: "clamp(36px, 4.5vw, 64px) 0 clamp(72px, 9vw, 120px)",
        overflow: "hidden",
      }}
    >
      {/* Horizontal ticker — continuous GSAP loop */}
      <div style={{ overflow: "hidden" }} aria-hidden="true">
        <div
          ref={tickerRef}
          style={{
            display: "flex",
            alignItems: "center",
            width: "max-content",
          }}
        >
          {/* Duplicate the set so the loop is seamless */}
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span
              key={i}
              style={{ display: "inline-flex", alignItems: "center" }}
            >
              <span
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(72px, 12vw, 176px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.88,
                  color: item.color,
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                  padding: "0 0.25em",
                }}
              >
                {item.word}
              </span>
              <span
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0 0.18em 0 0",
                }}
              >
                <span
                  style={{
                    display: "inline-block",
                    width: "clamp(10px, 1.4vw, 20px)",
                    height: "clamp(10px, 1.4vw, 20px)",
                    background: "rgba(255,255,255,0.2)",
                    transform: "rotate(45deg)",
                    flexShrink: 0,
                  }}
                />
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Body copy */}
      <div
        ref={copyRef}
        style={{
          padding: "clamp(24px, 3vw, 40px) clamp(20px, 5vw, 88px) 0",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: "clamp(28px, 4vw, 52px)",
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(17px, 1.8vw, 26px)",
            fontWeight: 400,
            letterSpacing: "-0.02em",
            lineHeight: 1.35,
            color: "var(--dust-white)",
            margin: 0,
          }}
        >
          We don&apos;t manufacture events.{" "}
          <span style={{ color: "rgba(255,255,255,0.4)" }}>
            We engineer moments that define regions.
          </span>
        </p>
      </div>
    </section>
  );
}
