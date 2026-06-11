"use client";
import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useIsMobile } from "@/hooks/useIsMobile";
import { MetaLabel, Lz } from "@/components/Primitives";

const PREVIEW = [
  {
    slug: "f1",
    name: "Formula 1 STC Saudi Arabian Grand Prix",
    tag: "activations × entertainment",
    photo: "/cases/f1/sagp-1.jpg",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.45) 0%, rgba(227,80,10,0.35) 100%)",
    year: "2025",
  },
  {
    slug: "isg",
    name: "Islamic Solidarity Games — Athlete Village",
    tag: "activations × entertainment",
    photo: "/cases/isg/isg-1.jpg",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.5) 0%, rgba(227,80,10,0.4) 100%)",
    year: "2025",
  },
  {
    slug: "saudi-games",
    name: "The Saudi Games '24",
    tag: "activations × entertainment",
    photo: "/cases/saudi-games/sg-1.jpg",
    tint: "linear-gradient(160deg, rgba(63,24,77,0.5) 0%, rgba(201,27,122,0.35) 100%)",
    year: "2024",
  },
  {
    slug: "wta",
    name: "WTA Finals — Community Engagement",
    tag: "activations",
    photo: "/cases/wta/wta-1.jpg",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.55) 0%, rgba(104,9,125,0.4) 100%)",
    year: "2025",
  },
  {
    slug: "range-rover",
    name: "Range Rover — Gala Dinner",
    tag: "creative × entertainment",
    photo: "/cases/range-rover/rr-1.jpg",
    tint: "linear-gradient(160deg, rgba(15,15,15,0.5) 0%, rgba(63,24,77,0.45) 100%)",
    year: "2025",
  },
  {
    slug: "rolls-royce",
    name: "Rolls Royce — Phantom 100",
    tag: "activations × creative × production",
    photo: "/cases/rolls-royce/rollsroyce-1.jpg",
    tint: "linear-gradient(160deg, rgba(15,15,15,0.55) 0%, rgba(63,24,77,0.45) 100%)",
    year: "2025",
  },
];

function WorkCard({ c, index }: { c: typeof PREVIEW[number]; index: number }) {
  const imgRef = useRef<HTMLDivElement>(null);

  return (
    <Link
      href={`/work#case-${c.slug}`}
      style={{ textDecoration: "none", color: "var(--dust-white)", display: "block" }}
      onMouseEnter={() => { if (imgRef.current) gsap.to(imgRef.current, { scale: 1.06, duration: 0.7, ease: "power2.out" }); }}
      onMouseLeave={() => { if (imgRef.current) gsap.to(imgRef.current, { scale: 1, duration: 0.7, ease: "power2.out" }); }}
    >
      <div
        data-work-card
        style={{ position: "relative", overflow: "hidden", aspectRatio: "4 / 5" }}
      >
        <div ref={imgRef} style={{ position: "absolute", inset: 0 }}>
          <Image
            src={c.photo}
            alt={c.name}
            fill
            style={{ objectFit: "cover", transformOrigin: "center" }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>

        {/* Brand tint */}
        <div style={{ position: "absolute", inset: 0, background: c.tint, pointerEvents: "none", zIndex: 1 }} />

        {/* Top label */}
        <div
          style={{
            position: "absolute",
            top: 16,
            left: 16,
            right: 16,
            display: "flex",
            justifyContent: "space-between",
            fontFamily: "var(--font-support)",
            fontSize: 10,
            letterSpacing: "0.16em",
            textTransform: "lowercase",
            color: "rgba(255,255,255,0.65)",
            zIndex: 3,
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.85)", display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Lz color="rgba(255,255,255,0.85)" />
            {String(index + 1).padStart(2, "0")}
          </span>
          <span>{c.year}</span>
        </div>

        {/* Bottom info */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "clamp(16px, 2.5vw, 28px)",
            background: "linear-gradient(to top, rgba(8,0,53,0.88) 0%, transparent 100%)",
            zIndex: 3,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-support)",
              fontSize: 10,
              letterSpacing: "0.16em",
              textTransform: "lowercase",
              color: "rgba(255,255,255,0.75)",
              marginBottom: 8,
            }}
          >
            {c.tag}
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(16px, 1.8vw, 22px)",
              fontWeight: 500,
              letterSpacing: "-0.015em",
              lineHeight: 1.2,
            }}
          >
            {c.name}
          </div>
        </div>

        {/* 3 diagonal brand diamonds */}
        <div
          style={{
            position: "absolute",
            top: 52,
            right: 16,
            width: 28,
            height: 28,
            zIndex: 3,
          }}
        >
          {([[18, 0], [9, 9], [0, 18]] as const).map(([top, left], i) => (
            <div key={i} style={{
              position: "absolute",
              top,
              left,
              width: 7,
              height: 7,
              background: "rgba(255,255,255,0.85)",
              transform: "rotate(45deg)",
            }} />
          ))}
        </div>
      </div>
    </Link>
  );
}

const HEADING_LINES = [["Projects", "That"], ["Define", "The"], ["Region"]];

export default function WorkPortalSection() {
  const isMobile   = useIsMobile();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const whoWeAreContainerRef = useRef<HTMLDivElement>(null);
  const whoWeAreLineRef = useRef<HTMLSpanElement>(null);
  const viewAllLineRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headingRef.current) {
        const words = headingRef.current.querySelectorAll("[data-word]");
        gsap.from(words, {
          y: "108%",
          duration: 1.0,
          stagger: 0.055,
          ease: "power4.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
          },
        });
      }

      if (gridRef.current) {
        const cards = gridRef.current.querySelectorAll("[data-work-card]");
        gsap.from(cards, {
          opacity: 0,
          y: 48,
          stagger: 0.1,
          duration: 1.0,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 82%",
          },
        });
      }

      gsap.from(ctaRef.current, {
        opacity: 0, y: 20, duration: 0.7, ease: "power2.out",
        scrollTrigger: { trigger: ctaRef.current, start: "top 90%" },
      });

      if (whoWeAreLineRef.current && whoWeAreContainerRef.current) {
        gsap.fromTo(whoWeAreLineRef.current,
          { width: "0%" },
          { width: "100%", duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: whoWeAreContainerRef.current, start: "top 85%", once: true } }
        );
      }
      if (viewAllLineRef.current && ctaRef.current) {
        gsap.fromTo(viewAllLineRef.current,
          { width: "0%" },
          { width: "100%", duration: 0.85, ease: "power3.out",
            scrollTrigger: { trigger: ctaRef.current, start: "top 90%", once: true } }
        );
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      style={{
        background: "var(--dust-white)",
        padding: "clamp(40px, 5vw, 64px) clamp(20px, 5vw, 88px) clamp(80px, 10vw, 144px)",
      }}
    >
      {/* WHO WE ARE — transitioned here from the dark section above */}
      <div ref={whoWeAreContainerRef} style={{ marginBottom: "clamp(48px, 6vw, 88px)", display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-block" }}>
          <Link
            href="/about"
            className="cta-link-dark"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(28px, 3.8vw, 60px)",
              fontWeight: 700,
              letterSpacing: "-0.03em",
              color: "var(--burnt-horizon)",
              textDecoration: "none",
            }}
          >
            WHO WE ARE
          </Link>
          <span ref={whoWeAreLineRef} className="cta-underline" />
        </div>
      </div>

      {/* Portal heading */}
      <div>
        <h2
          ref={headingRef}
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 96px)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
            margin: "20px 0 clamp(40px, 6vw, 72px)",
            textAlign: "center",
            textTransform: "uppercase",
            color: "var(--pitch-black)",
          }}
        >
          {HEADING_LINES.map((lineWords, li) => (
            <span key={li} style={{ display: "flex", gap: "0.28em", justifyContent: "center", lineHeight: 1.0, overflow: "hidden" }}>
              {lineWords.map((word, wi) => (
                <span key={wi} style={{ display: "inline-block", overflow: "hidden", lineHeight: 1.05 }}>
                  <span data-word style={{ display: "inline-block" }}>{word}</span>
                </span>
              ))}
            </span>
          ))}
        </h2>
      </div>

      {/* Preview grid — 2 rows of 3 */}
      <div
        ref={gridRef}
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(3, 1fr)",
          gap: "clamp(10px, 1.4vw, 18px)",
          marginBottom: "clamp(32px, 4vw, 52px)",
        }}
      >
        {PREVIEW.map((c, i) => (
          <WorkCard key={i} c={c} index={i} />
        ))}
      </div>

      {/* Footer — centered CTA */}
      <div
        ref={ctaRef}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 20,
          paddingTop: 28,
        }}
      >
        <div style={{ display: "inline-block" }}>
          <Link
            href="/work"
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
            VIEW ALL PROJECTS
          </Link>
          <span ref={viewAllLineRef} className="cta-underline" />
        </div>
      </div>
    </section>
  );
}
