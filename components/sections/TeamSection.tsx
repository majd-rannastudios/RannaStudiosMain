"use client";
import { MetaLabel, Reveal, Lz } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

const TEAM = [
  { role: "Founder · Executive Director", name: "T. Ranna", expertise: "Strategy, partnerships, regional networks." },
  { role: "Creative · Experience Director", name: "S. Saade", expertise: "Concept development, art direction, brand systems." },
  { role: "Technical · Systems Director", name: "K. Hayek", expertise: "Connected systems, registration platforms, dashboards." },
  { role: "Senior Producer", name: "L. Othman", expertise: "Multi-day delivery, vendor coordination, mega-events." },
  { role: "Experience Designer", name: "M. Said", expertise: "Spatial sequencing, audience flow, narrative arcs." },
  { role: "3D · Spatial Designer", name: "R. Bekdache", expertise: "Built environments, wayfinding, visualization." },
  { role: "Operations Manager", name: "N. Faris", expertise: "Ground crew, safety coordination, venue ops." },
  { role: "Entertainment · Talent", name: "Y. Maalouf", expertise: "Talent booking, show direction, performance ops." },
  { role: "Solutions Architect", name: "A. Dahdah", expertise: "Custom software, AI engagement, hardware activation." },
  { role: "Project Manager", name: "H. Khoury", expertise: "PMI delivery, budgets, multi-site coordination." },
];

const PORTRAIT_BGS = [
  "linear-gradient(135deg, var(--burnt-horizon), var(--abyssal-black))",
  "linear-gradient(135deg, var(--veil-becoming), var(--pitch-black))",
  "linear-gradient(135deg, var(--crimson-bloom), var(--abyssal-black))",
  "linear-gradient(135deg, var(--dusk-matter), var(--pitch-black))",
];

export default function TeamSection() {
  const isMobile = useIsMobile();
  return (
    <section
      id="team"
      style={{
        background: "var(--dust-white)",
        color: "var(--pitch-black)",
        padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
          gap: "clamp(24px, 4vw, 80px)",
          alignItems: "end",
          marginBottom: "clamp(40px, 5vw, 80px)",
        }}
      >
        <Reveal>
          <MetaLabel color="var(--burnt-horizon)">the team</MetaLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.4vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              margin: "16px 0 0",
              maxWidth: "14ch",
            }}
          >
            The people behind the{" "}
            <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>experiences</em>.
          </h2>
        </Reveal>
        <Reveal as="p" delay={120} style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, maxWidth: "42ch", color: "var(--fg-muted-on-light)" }}>
          A senior, hands-on team. Studio leads are involved on the ground —
          decisions made in the room are decisions made on the floor.
        </Reveal>
      </div>

      <div
        tabIndex={isMobile ? 0 : undefined}
        role={isMobile ? "region" : undefined}
        aria-label={isMobile ? "Team members (scrollable)" : undefined}
        style={isMobile ? {
          display: "flex",
          overflowX: "auto",
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
          gap: 2,
          paddingBottom: 4,
          borderTop: "1px solid var(--rule-on-light)",
          borderBottom: "1px solid var(--rule-on-light)",
        } : {
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 1,
          background: "var(--rule-on-light)",
          borderTop: "1px solid var(--rule-on-light)",
          borderBottom: "1px solid var(--rule-on-light)",
        }}
      >
        {TEAM.map((m, i) => (
          <div
            key={i}
            style={{
              background: "var(--dust-white)",
              display: "flex",
              flexDirection: "column",
              cursor: "pointer",
              ...(isMobile ? {
                flex: "0 0 72vw",
                scrollSnapAlign: "start",
                minWidth: 0,
              } : {}),
            }}
          >
            <div
              style={{
                aspectRatio: "4 / 5",
                background: PORTRAIT_BGS[i % 4],
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Light overlay */}
              <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.18), transparent 50%), linear-gradient(180deg, transparent, rgba(0,0,0,0.45))" }} />
              {/* Silhouette glow */}
              <div style={{ position: "absolute", left: "50%", top: "55%", transform: "translate(-50%, -10%)", width: "60%", aspectRatio: "1", borderRadius: "50%", background: "radial-gradient(closest-side, color-mix(in oklab, var(--dust-white) 25%, transparent), transparent 70%)", filter: "blur(10px)" }} />
              <div style={{ position: "absolute", left: 14, top: 14, fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.16em", color: "rgba(255,255,255,0.55)", textTransform: "lowercase", display: "flex", alignItems: "center", gap: 6 }}>
                <Lz color="var(--ember-dawn)" /> portrait_ tk
              </div>
            </div>
            <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 6 }}>
              <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--burnt-horizon)" }}>
                {m.role}_
              </div>
              <div style={{ fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{m.name}</div>
              <div style={{ fontSize: 13, lineHeight: 1.5, color: "var(--fg-muted-on-light)" }}>{m.expertise}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
