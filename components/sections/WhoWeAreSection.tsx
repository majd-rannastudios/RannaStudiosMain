"use client";
import { MetaLabel, Reveal } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function WhoWeAreSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="about"
      style={{
        background: "var(--dust-white)",
        color: "var(--pitch-black)",
        padding: "clamp(120px, 16vw, 240px) clamp(20px, 5vw, 88px) clamp(80px, 10vw, 168px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
        {!isMobile && (
        <Reveal>
          <MetaLabel color="var(--burnt-horizon)">who we are</MetaLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.4vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 0.98,
              margin: "24px 0 0",
            }}
          >
            Built for the region&apos;s most{" "}
            <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>ambitious</em>{" "}
            experiences.
          </h2>
        </Reveal>
        )}

        <Reveal as="div" delay={120}>
          <p
            style={{
              fontSize: "clamp(18px, 1.6vw, 24px)",
              lineHeight: 1.5,
              color: "var(--pitch-black)",
              fontWeight: 400,
              marginBottom: 32,
              borderLeft: "2px solid var(--burnt-horizon)",
              paddingLeft: 20,
              maxWidth: "56ch",
            }}
          >
            Ranna Studios is a multidisciplinary studio network built to design, produce, and operate
            the region&apos;s most ambitious experiences — from sports mega-events to brand activations,
            delivered by a team with deep creative and operational expertise across the GCC.
          </p>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
              gap: 0,
            }}
          >
            {[
              { num: "01_", label: "creative + operational", small: "Two halves of the same brain." },
              { num: "02_", label: "scalable execution", small: "From 200 to 200,000 audiences." },
              { num: "03_", label: "regional intelligence", small: "Local networks across four GCC markets." },
            ].map((p) => (
              <div
                key={p.num}
                style={{
                  padding: "32px 24px 24px 16px",
                }}
              >
                <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.16em", color: "var(--burnt-horizon)", marginBottom: 8 }}>
                  {p.num}
                </div>
                <div style={{ fontSize: 16, fontWeight: 500, lineHeight: 1.3 }}>
                  {p.label}
                  <small style={{ display: "block", fontWeight: 400, color: "var(--fg-muted-on-light)", fontSize: 14, marginTop: 4 }}>
                    {p.small}
                  </small>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
