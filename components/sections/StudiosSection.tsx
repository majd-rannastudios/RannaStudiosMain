"use client";
import { MetaLabel, Reveal } from "@/components/Primitives";

const STUDIOS = [
  {
    num: "01",
    name: "Activations",
    color: "var(--burnt-horizon)",
    tag: "We turn brands into experiences people talk about for years.",
    caps: [
      "brand & event activations",
      "tech activations",
      "physical challenges & gamification",
      "workshops & participatory",
      "stage shows & ceremonies",
      "live entertainment",
      "roaming acts & street entertainment",
      "circus & acrobatic shows",
      "mascot & character experiences",
      "kids areas & family zones",
    ],
  },
  {
    num: "02",
    name: "Creative",
    color: "var(--crimson-bloom)",
    tag: "The creative force behind every Ranna project — and yours.",
    caps: [
      "creative development & concept",
      "event design & art direction",
      "brand identity for events",
      "3D renders & visual storytelling",
      "creative production for campaigns",
      "design direction for agencies & brands",
    ],
  },
  {
    num: "03",
    name: "Tech",
    color: "var(--veil-becoming)",
    tag: "Technology that doesn't just support your event — it becomes the experience.",
    caps: [
      "custom registration platforms",
      "AI agents for guest interaction",
      "project management dashboards",
      "systems development & custom software",
      "interactive game development",
      "connected hardware activations",
      "data & analytics for live events",
    ],
  },
  {
    num: "04",
    name: "Production",
    color: "var(--ember-dawn)",
    tag: "The infrastructure of flawless execution.",
    caps: [
      "guest flow design & management",
      "crowd management & safety",
      "full event operations management",
      "project management (PMI)",
      "mega event logistics & coordination",
      "vendor & supplier management",
      "on-ground event management",
      "post-event reporting & debrief",
    ],
  },
];

export default function StudiosSection() {
  return (
    <section
      id="studios"
      style={{
        background: "var(--pitch-black)",
        padding: "clamp(80px, 10vw, 144px) 0",
        position: "relative",
      }}
    >
      <div
        style={{
          padding: "0 clamp(20px, 5vw, 88px)",
          marginBottom: "clamp(40px, 6vw, 96px)",
        }}
      >
        <Reveal>
          <MetaLabel color="var(--burnt-horizon)">our studios</MetaLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.5vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              margin: "12px 0 0",
              maxWidth: "14ch",
            }}
          >
            Four studios. One integrated experience{" "}
            <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>ecosystem</em>.
          </h2>
        </Reveal>
      </div>

      <div>
        {STUDIOS.map((s) => (
          <StudioRow key={s.num} studio={s} />
        ))}
      </div>
    </section>
  );
}

function StudioRow({ studio }: { studio: typeof STUDIOS[number] }) {
  return (
    <a
      href="#proposal"
      style={{
        display: "grid",
        gridTemplateColumns: "64px 1fr 1.2fr 100px",
        alignItems: "stretch",
        borderTop: "1px solid var(--rule-on-dark)",
        padding: "36px clamp(20px, 5vw, 88px)",
        position: "relative",
        cursor: "pointer",
        gap: "clamp(16px, 3vw, 48px)",
        overflow: "hidden",
        textDecoration: "none",
        color: "var(--dust-white)",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget;
        el.style.color = "var(--dust-white)";
        const before = el.querySelector("[data-hover-bg]") as HTMLElement | null;
        if (before) before.style.transform = "scaleY(1)";
        el.querySelectorAll<HTMLElement>("[data-muted]").forEach(c => c.style.color = "var(--dust-white)");
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget;
        const before = el.querySelector("[data-hover-bg]") as HTMLElement | null;
        if (before) before.style.transform = "scaleY(0)";
        el.querySelectorAll<HTMLElement>("[data-muted]").forEach(c => c.style.color = "var(--fg-muted-on-dark)");
      }}
    >
      {/* Hover fill */}
      <span
        data-hover-bg
        style={{
          position: "absolute",
          inset: 0,
          background: studio.color,
          transform: "scaleY(0)",
          transformOrigin: "bottom",
          transition: "transform 280ms cubic-bezier(.6,0,.2,1)",
          zIndex: 0,
        }}
      />
      <span data-muted style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-support)", fontSize: 12, letterSpacing: "0.16em", color: "var(--fg-muted-on-dark)", alignSelf: "start", paddingTop: 6, fontVariantNumeric: "tabular-nums" }}>
        studio_ / {studio.num}
      </span>
      <span style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <span style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 4vw, 56px)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1.0 }}>
          {studio.name}
          <span style={{ color: studio.color }}>_</span>
        </span>
        <span data-muted style={{ fontFamily: "var(--font-display)", fontSize: "clamp(15px, 1.2vw, 18px)", lineHeight: 1.4, color: "var(--fg-muted-on-dark)", maxWidth: "32ch", fontStyle: "italic", fontWeight: 300 }}>
          &quot;{studio.tag}&quot;
        </span>
      </span>
      <span data-muted style={{ position: "relative", zIndex: 1, fontFamily: "var(--font-support)", fontSize: 13, lineHeight: 1.7, color: "var(--fg-muted-on-dark)", display: "flex", flexWrap: "wrap", gap: "6px 0", alignSelf: "center" }}>
        {studio.caps.map((c, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            {c}
            {i < studio.caps.length - 1 && <span style={{ margin: "0 10px", opacity: 0.4 }}>·</span>}
          </span>
        ))}
      </span>
      <span data-muted style={{ position: "relative", zIndex: 1, alignSelf: "center", fontFamily: "var(--font-support)", fontSize: 28, textAlign: "right", color: "var(--fg-muted-on-dark)", transition: "transform 280ms cubic-bezier(.6,0,.2,1), color 280ms" }}>
        →
      </span>
    </a>
  );
}
