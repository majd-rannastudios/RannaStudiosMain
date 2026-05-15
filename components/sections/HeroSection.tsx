"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const line1Ref   = useRef<HTMLSpanElement>(null);
  const line2Ref   = useRef<HTMLSpanElement>(null);
  const videoRef   = useRef<HTMLDivElement>(null);
  const isMobile   = useIsMobile();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ paused: true });

      tl.from([line1Ref.current, line2Ref.current], {
          y: "108%", duration: 1.1, stagger: 0.07, ease: "power4.out",
        })
        .from(videoRef.current, {
          opacity: 0, y: 40, duration: 1.0, ease: "power3.out",
        }, "-=0.7");

      let started = false;
      const start = () => { if (started) return; started = true; tl.play(); };
      window.addEventListener("ranna:heroReady", start, { once: true });
      const fallback = setTimeout(() => {
        if (!document.querySelector("[data-preloader]")) start();
      }, 250);

      return () => {
        window.removeEventListener("ranna:heroReady", start);
        clearTimeout(fallback);
      };
    });
    return () => ctx.revert();
  }, []);

  const headline = (
    <h1
      style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(36px, 6vw, 104px)",
        fontWeight: 500,
        letterSpacing: "-0.045em",
        lineHeight: 0.92,
        color: isMobile ? "var(--pitch-black)" : "var(--dust-white)",
        margin: 0,
      }}
    >
      <span style={{ display: "block", overflow: "hidden", lineHeight: 1.0 }}>
        <span ref={line1Ref} style={{ display: "block" }}>EXPERIENCES</span>
      </span>
      <span style={{ display: "block", overflow: "hidden", lineHeight: 1.0 }}>
        <span ref={line2Ref} style={{ display: "block" }}>
          PEOPLE{" "}
          <em style={{
            fontStyle: "normal",
            fontWeight: 700,
            background: "linear-gradient(90deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 70%, var(--veil-becoming) 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>
            REMEMBER.
          </em>
        </span>
      </span>
    </h1>
  );

  return (
    <section
      ref={sectionRef}
      id="top"
      style={{
        background: "var(--dust-white)",
        paddingTop: isMobile ? "clamp(88px, 12vh, 110px)" : "clamp(160px, 20vh, 220px)",
        paddingBottom: "clamp(24px, 3vh, 48px)",
        overflow: "hidden",
      }}
    >
      {/* Mobile: headline above video */}
      {isMobile && (
        <div style={{ padding: "0 clamp(20px, 5vw, 40px)", marginBottom: 28, textAlign: "center" }}>
          {headline}
        </div>
      )}

      <div
        ref={videoRef}
        style={{
          padding: isMobile ? "0 clamp(16px, 4vw, 32px)" : "0 clamp(40px, 10vw, 180px)",
          position: "relative",
        }}
      >
        {/* Gradient frame + video */}
        <div
          style={{
            width: "100%",
            aspectRatio: "16 / 9",
            padding: isMobile ? 0 : "clamp(6px, 0.7vw, 12px)",
            backgroundImage: isMobile ? undefined : "url('/gradient-frame.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            position: "relative",
          }}
        >
          {/* Video */}
          <div style={{ height: "100%", position: "relative", overflow: "hidden" }}>
            <iframe
              src="https://www.youtube.com/embed/WiMQ5cDpKNE?autoplay=1&mute=1&loop=1&playlist=WiMQ5cDpKNE&controls=0&showinfo=0&rel=0&iv_load_policy=3&modestbranding=1&playsinline=1&enablejsapi=1&start=4&disablekb=1&fs=0"
              allow="autoplay; encrypted-media"
              style={{
                position: "absolute",
                top: "-5%",
                left: "-5%",
                width: "110%",
                height: "110%",
                border: "none",
                display: "block",
                pointerEvents: "none",
              }}
            />
          </div>

          {/* Desktop only: dark overlay + headline centered over video */}
          {!isMobile && (
            <>
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(to bottom, rgba(8,0,53,0.30) 0%, rgba(8,0,53,0.65) 100%)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {headline}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
