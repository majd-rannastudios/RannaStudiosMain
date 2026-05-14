"use client";
import { MetaLabel, Reveal, Lz } from "@/components/Primitives";

export default function WhyRannaSection() {
  return (
    <section
      style={{
        background: "var(--dust-white)",
        padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ position: "relative", marginBottom: "clamp(40px, 6vw, 72px)" }}>
        <Reveal>
          <MetaLabel color="var(--burnt-horizon)">why ranna studios</MetaLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.4vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              color: "var(--pitch-black)",
              margin: "16px 0 0",
              maxWidth: "16ch",
            }}
          >
            What you get when ambition{" "}
            <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>meets</em> structure.
          </h2>
        </Reveal>
      </div>

      {/* Bento grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1.4fr 1fr 1fr",
          gridTemplateRows: "auto auto",
          gap: 10,
        }}
      >
        {/* Card 1 — tall left, gradient, creative + operational */}
        <Reveal
          as="div"
          style={{
            gridRow: "1 / 3",
            background: "linear-gradient(145deg, var(--burnt-horizon) 0%, var(--crimson-bloom) 55%, var(--veil-becoming) 100%)",
            padding: "clamp(32px, 4vw, 56px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            minHeight: 520,
          }}
        >
          <div
            style={{
              position: "absolute",
              bottom: -20,
              right: -12,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(120px, 14vw, 200px)",
              fontWeight: 700,
              lineHeight: 0.85,
              letterSpacing: "-0.05em",
              color: "rgba(255,255,255,0.07)",
              userSelect: "none",
            }}
          >
            01
          </div>

          <div>
            <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.18em", textTransform: "lowercase", color: "rgba(255,255,255,0.65)", marginBottom: 20 }}>
              creative ↔ operational
            </div>
            <h3
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(28px, 3vw, 52px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                margin: 0,
                color: "var(--dust-white)",
              }}
            >
              One brief.<br />Four studios.
            </h3>
          </div>

          <div>
            <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.6, color: "rgba(255,255,255,0.85)", maxWidth: "36ch", marginBottom: 32 }}>
              Creative ambition backed by operational discipline. Every concept is pressure-tested by the people who&apos;ll deliver it on opening night.
            </p>
            <div style={{ display: "flex", gap: 2 }}>
              {["concept", "design", "build", "operate"].map((step) => (
                <div
                  key={step}
                  style={{
                    flex: 1,
                    background: "rgba(255,255,255,0.15)",
                    padding: "10px 14px",
                    textAlign: "center",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.16em", textTransform: "lowercase", color: "rgba(255,255,255,0.9)" }}>
                    {step}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Card 2 — top center, trusted by */}
        <Reveal
          as="div"
          delay={80}
          style={{
            background: "#FAFAFA",
            border: "1px solid var(--rule-on-light)",
            padding: "clamp(28px, 3vw, 48px)",
            display: "flex",
            flexDirection: "column",
            gap: 20,
            position: "relative",
            overflow: "hidden",
          }}
        >
          <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--ember-dawn)", display: "inline-flex", alignItems: "center", gap: 8 }}>
            <Lz color="var(--ember-dawn)" />
            40+ major events delivered
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(20px, 2vw, 30px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.25,
              color: "var(--pitch-black)",
            }}
          >
            Trusted by the region&apos;s most{" "}
            <span style={{ color: "rgba(8,0,53,0.22)" }}>demanding programs.</span>
          </div>
          <div style={{ marginTop: "auto", display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["F1", "FIFA", "WEF", "NEOM", "Riyadh Season"].map((b) => (
              <span
                key={b}
                style={{
                  fontFamily: "var(--font-support)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "lowercase",
                  padding: "5px 10px",
                  border: "1px solid var(--rule-on-light)",
                  color: "var(--fg-muted-on-light)",
                }}
              >
                {b.toLowerCase()}_
              </span>
            ))}
          </div>
        </Reveal>

        {/* Card 3 — top right, big stat */}
        <Reveal
          as="div"
          delay={120}
          style={{
            background: "var(--pitch-black)",
            padding: "clamp(28px, 3vw, 48px)",
            position: "relative",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.18em", textTransform: "lowercase", color: "rgba(255,255,255,0.45)" }}>
            built for scale
          </div>
          <div>
            <div
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(56px, 6vw, 96px)",
                fontWeight: 700,
                letterSpacing: "-0.04em",
                lineHeight: 0.9,
                color: "var(--dust-white)",
              }}
            >
              200K<span style={{ color: "var(--ember-dawn)" }}>+</span>
            </div>
            <div style={{ fontFamily: "var(--font-support)", fontSize: 12, letterSpacing: "0.1em", textTransform: "lowercase", color: "rgba(255,255,255,0.5)", marginTop: 12 }}>
              peak audience capacity
            </div>
          </div>
          <div style={{ fontFamily: "var(--font-support)", fontSize: 13, letterSpacing: "0.04em", color: "rgba(255,255,255,0.6)", lineHeight: 1.5 }}>
            From 50-person VIP rooms to stadium-scale public events.
          </div>
          <div
            style={{
              position: "absolute",
              right: -16,
              bottom: -20,
              fontFamily: "var(--font-display)",
              fontSize: "clamp(72px, 9vw, 130px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              color: "rgba(255,255,255,0.04)",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            200K
          </div>
        </Reveal>

        {/* Card 4 — bottom center, systems-driven */}
        <Reveal
          as="div"
          delay={160}
          style={{
            background: "color-mix(in oklab, var(--ember-dawn) 9%, var(--dust-white))",
            border: "1px solid var(--rule-on-light)",
            padding: "clamp(28px, 3vw, 48px)",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
        >
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(22px, 2.2vw, 32px)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              lineHeight: 1.1,
              margin: 0,
              color: "var(--pitch-black)",
            }}
          >
            Systems-Driven
          </h3>
          <p style={{ fontSize: 14, lineHeight: 1.6, color: "var(--fg-muted-on-light)", maxWidth: "30ch", margin: 0 }}>
            Registration · AI engagement · live analytics · dashboards — embedded, not bolted on.
          </p>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginTop: "auto" }}>
            {["ai", "data", "hardware", "software"].map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-support)",
                  fontSize: 10,
                  letterSpacing: "0.14em",
                  textTransform: "lowercase",
                  padding: "5px 10px",
                  border: "1px solid var(--rule-on-light)",
                  color: "var(--fg-muted-on-light)",
                }}
              >
                {tag}_
              </span>
            ))}
          </div>
        </Reveal>

        {/* Card 5 — bottom right, regional */}
        <Reveal
          as="div"
          delay={200}
          style={{
            background: "color-mix(in oklab, var(--abyssal-black) 88%, var(--pitch-black))",
            border: "1px solid rgba(255,255,255,0.08)",
            padding: "clamp(28px, 3vw, 48px)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            gap: 20,
          }}
        >
          <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--ember-dawn)" }}>
            regional intelligence
          </div>
          <div
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(26px, 2.8vw, 40px)",
              fontWeight: 500,
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--dust-white)",
            }}
          >
            4 studios.<br />4 markets.
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 2 }}>
            {["KSA", "UAE", "Qatar", "Lebanon"].map((m) => (
              <div
                key={m}
                style={{
                  background: "rgba(255,255,255,0.05)",
                  padding: "12px 16px",
                  fontFamily: "var(--font-support)",
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "lowercase",
                  color: "rgba(255,255,255,0.6)",
                }}
              >
                {m.toLowerCase()}_
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
