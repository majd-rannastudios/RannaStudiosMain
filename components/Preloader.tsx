"use client";
import { useEffect, useState } from "react";

// Resets on hard reload, survives client-side navigation
let hasPreloaded = false;

export default function Preloader() {
  const [pct, setPct] = useState(100);
  const [phase, setPhase] = useState<"loading" | "fading" | "done">("loading");

  useEffect(() => {
    if (hasPreloaded) {
      setPhase("done");
      window.dispatchEvent(new CustomEvent("ranna:heroReady"));
      return;
    }
    hasPreloaded = true;

    let rafId: number;
    const start = performance.now();
    const dur = 1100;

    function tick(now: number) {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 2.4);
      setPct(100 - Math.round(eased * 100));
      if (p < 1) {
        rafId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => setPhase("fading"), 180);
        setTimeout(() => {
          setPhase("done");
          window.dispatchEvent(new CustomEvent("ranna:heroReady"));
        }, 780);
      }
    }
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  if (phase === "done") return null;

  return (
    <div
      data-preloader
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "radial-gradient(ellipse at 50% 30%, #1A0870 0%, #080035 65%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 600ms cubic-bezier(.6,0,.2,1)",
        opacity: phase === "fading" ? 0 : 1,
        pointerEvents: phase === "fading" ? "none" : "all",
      }}
    >
      {/* Grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          pointerEvents: "none",
          opacity: 0.6,
        }}
      />

      {/* Massive counter — fills the screen */}
      <div
        style={{
          width: "90vw",
          textAlign: "center",
          fontFamily: "var(--font-display)",
          fontSize: "clamp(80px, 22vw, 320px)",
          fontWeight: 900,
          letterSpacing: "-0.06em",
          lineHeight: 0.85,
          fontVariantNumeric: "tabular-nums",
          background: "linear-gradient(120deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 65%, var(--veil-becoming) 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
          userSelect: "none",
        }}
      >
        {String(pct)}
      </div>

      {/* Wordmark — centered under the counter */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/logo-nav.png"
        alt="Ranna Studios"
        style={{
          marginTop: "clamp(16px, 2.5vw, 32px)",
          width: "clamp(160px, 30vw, 340px)",
          height: "auto",
          opacity: 0.9,
        }}
      />

      {/* Progress bar */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          background: "var(--rule-on-dark)",
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${pct}%`,
            background:
              "linear-gradient(90deg, var(--ember-dawn), var(--burnt-horizon), var(--crimson-bloom), var(--veil-becoming))",
            transition: "width 60ms linear",
          }}
        />
      </div>

      {/* Label — bottom left */}
      <div
        style={{
          position: "absolute",
          bottom: 26,
          left: "clamp(20px, 5vw, 88px)",
          fontFamily: "var(--font-support)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "lowercase",
          color: "var(--fg-muted-on-dark)",
        }}
      >
        loading
      </div>
    </div>
  );
}
