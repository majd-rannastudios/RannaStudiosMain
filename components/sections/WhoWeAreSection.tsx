"use client";
import { MetaLabel, Reveal } from "@/components/Primitives";

export default function WhoWeAreSection() {
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
          gridTemplateColumns: "1fr 1.2fr",
          gap: "clamp(40px, 6vw, 96px)",
          alignItems: "start",
        }}
      >
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

        <Reveal as="div" delay={120}>
          <p
            style={{
              fontSize: "clamp(20px, 1.7vw, 26px)",
              lineHeight: 1.4,
              color: "var(--pitch-black)",
              fontWeight: 400,
              marginBottom: 28,
              borderLeft: "2px solid var(--burnt-horizon)",
              paddingLeft: 20,
            }}
          >
            Ranna Studios is a <strong>multidisciplinary studio network</strong> — not a full-service
            agency. We design, build, and operate high-impact experiences for the people, programs,
            and platforms that define the region.
          </p>
          <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.55, margin: "0 0 20px", maxWidth: "56ch", color: "color-mix(in oklab, var(--pitch-black) 80%, var(--dust-white))" }}>
            Activations, creative direction, entertainment technology, and production execution operate
            as four specialized studios under one roof. Together they deliver experiences that engage
            audiences and operate seamlessly at scale — from a single VIP moment to a multi-month
            destination program.
          </p>
          <p style={{ fontSize: "clamp(16px, 1.3vw, 19px)", lineHeight: 1.55, margin: "0 0 20px", maxWidth: "56ch", color: "color-mix(in oklab, var(--pitch-black) 80%, var(--dust-white))" }}>
            Our work begins with creative ambition and is held to operational discipline. Concepts that
            could only happen here. Operations that hold under stadium-grade scrutiny. Systems that
            outlive the activation.
          </p>

          <div
            style={{
              marginTop: 48,
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 0,
              borderTop: "1px solid var(--rule-on-light)",
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
                  borderRight: "1px solid var(--rule-on-light)",
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
