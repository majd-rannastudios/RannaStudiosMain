"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { MetaLabel, Lz } from "@/components/Primitives";

const HEADLINE_LINES = ["Ready to build", "something the", "world will"];

export default function PreFooterCTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const linesRef = useRef<HTMLHeadingElement>(null);
  const accentRef = useRef<HTMLSpanElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (linesRef.current) {
        const lines = linesRef.current.querySelectorAll("[data-line]");
        gsap.from(lines, {
          y: "105%",
          duration: 1.1,
          stagger: 0.08,
          ease: "power4.out",
          scrollTrigger: { trigger: linesRef.current, start: "top 80%" },
        });
      }

      if (accentRef.current) {
        gsap.fromTo(
          accentRef.current,
          { x: "50vw" },
          {
            x: 0,
            ease: "none",
            scrollTrigger: {
              trigger: accentRef.current,
              start: "top 90%",
              end: "top 50%",
              scrub: 0.8,
            },
          }
        );
      }

      gsap.from(bodyRef.current, {
        opacity: 0, y: 20, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: bodyRef.current, start: "top 88%" },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        background: "var(--dust-white)",
        padding: "clamp(80px, 12vw, 160px) clamp(20px, 5vw, 88px) clamp(80px, 10vw, 128px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", textAlign: "center" }}>
        <h2
          ref={linesRef}
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(36px, 6vw, 96px)",
            fontWeight: 500,
            letterSpacing: "-0.045em",
            lineHeight: 0.92,
            margin: "20px 0 0",
            color: "var(--pitch-black)",
            textAlign: "center",
          }}
        >
          {HEADLINE_LINES.map((line, i) => (
            <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: 1.0 }}>
              <span data-line style={{ display: "block" }}>
                {line}
              </span>
            </span>
          ))}
          <span style={{ display: "block", overflow: "hidden", lineHeight: 1.0, paddingBottom: "0.18em" }}>
            <span
              ref={accentRef}
              style={{
                display: "block",
                fontWeight: 700,
                background: "linear-gradient(90deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 70%, var(--veil-becoming) 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              remember.
            </span>
          </span>
        </h2>

        <div
          ref={bodyRef}
          style={{
            marginTop: "clamp(36px, 5vw, 64px)",
            display: "flex",
            gap: "clamp(16px, 3vw, 48px)",
            alignItems: "center",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/contact"
            className="btn-rs solid"
            style={{ textDecoration: "none" }}
          >
            <span>request a free proposal</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>

          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              paddingLeft: "clamp(16px, 2vw, 32px)",
              borderLeft: "1px solid rgba(0,0,0,0.18)",
            }}
          >
            {[
              { k: "response", v: "within 48 hours" },
              { k: "whatsapp", v: "+966 55 152 0499" },
            ].map((item) => (
              <div
                key={item.k}
                style={{
                  fontFamily: "var(--font-support)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "lowercase",
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                }}
              >
                <Lz color="rgba(0,0,0,0.4)" />
                <span style={{ color: "rgba(0,0,0,0.45)" }}>{item.k}</span>
                <span style={{ color: "var(--pitch-black)" }}>{item.v}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
