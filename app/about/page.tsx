"use client";
import WhoWeAreSection from "@/components/sections/WhoWeAreSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import StudiosPortalSection from "@/components/sections/StudiosPortalSection";
import TeamSection from "@/components/sections/TeamSection";
import RegionalSection from "@/components/sections/RegionalSection";
import { MetaLabel } from "@/components/Primitives";
import Link from "next/link";

export default function AboutPage() {
  return (
    <main>
      {/* Page hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--dusk-matter) 0%, var(--abyssal-black) 55%)",
          padding: "clamp(140px, 18vw, 240px) clamp(20px, 5vw, 88px) clamp(64px, 8vw, 96px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grain */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.05'/%3E%3C/svg%3E\")",
            backgroundSize: "200px 200px",
            pointerEvents: "none",
          }}
        />
        <div style={{ position: "relative" }}>
          <MetaLabel>who we are</MetaLabel>
          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(48px, 8vw, 128px)",
              fontWeight: 500,
              letterSpacing: "-0.04em",
              lineHeight: 0.94,
              margin: "20px 0 0",
              maxWidth: "16ch",
            }}
          >
            Built for the region&apos;s most{" "}
            <em style={{ fontStyle: "normal", color: "rgba(255,255,255,0.65)", fontWeight: 300 }}>
              ambitious
            </em>{" "}
            experiences.
          </h1>

          <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <a
              href="/portfolio.pdf"
              download
              className="btn-rs"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 10 }}
            >
              <span>download portfolio</span>
              <span style={{ opacity: 0.7 }}>↓</span>
            </a>
          </div>
        </div>
      </section>

      <WhoWeAreSection />
      <ExperiencesSection />
      <StudiosPortalSection />
      <TeamSection />
      <RegionalSection />

      {/* CTA */}
      <section
        style={{
          background: "var(--dust-white)",
          padding: "clamp(80px, 12vw, 160px) clamp(20px, 5vw, 88px) clamp(80px, 10vw, 128px)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div style={{ position: "relative", textAlign: "center" }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 6vw, 96px)",
              fontWeight: 500,
              letterSpacing: "-0.045em",
              lineHeight: 0.92,
              margin: "0 0 0",
              color: "var(--pitch-black)",
              textAlign: "center",
            }}
          >
            {["Ready to build", "something the", "world will"].map((line, i) => (
              <span key={i} style={{ display: "block", overflow: "hidden", lineHeight: 1.0 }}>
                <span style={{ display: "block" }}>{line}</span>
              </span>
            ))}
            <span style={{ display: "block", overflow: "hidden", lineHeight: 1.0, paddingBottom: "0.18em" }}>
              <span
                style={{
                  display: "block",
                  fontWeight: 700,
                  background: "linear-gradient(90deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 70%, var(--veil-becoming) 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                remember?
              </span>
            </span>
          </h2>

          <div
            style={{
              marginTop: "clamp(36px, 5vw, 64px)",
              display: "flex",
              gap: "clamp(16px, 3vw, 48px)",
              alignItems: "center",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            <Link href="/contact" className="btn-rs solid" style={{ textDecoration: "none" }}>
              <span>request a free proposal</span>
              <span style={{ opacity: 0.7 }}>→</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
