"use client";
import StudiosServicesSection from "@/components/sections/StudiosServicesSection";
import ExperiencesSection from "@/components/sections/ExperiencesSection";
import TeamSection from "@/components/sections/TeamSection";
import { MetaLabel } from "@/components/Primitives";
import Link from "next/link";

export default function ServicesPage() {
  return (
    <main>
      {/* Page hero */}
      <section
        style={{
          background: "var(--pitch-black)",
          padding: "clamp(140px, 18vw, 240px) clamp(20px, 5vw, 88px) clamp(64px, 8vw, 96px)",
          borderBottom: "1px solid var(--rule-on-dark)",
        }}
      >
        <MetaLabel color="var(--burnt-horizon)">our studios</MetaLabel>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 8vw, 128px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.94,
            color: "var(--dust-white)",
            margin: "20px 0 0",
            maxWidth: "16ch",
          }}
        >
          Four studios.{" "}
          <em
            style={{
              fontStyle: "normal",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            One ecosystem.
          </em>
        </h1>

        <p
          style={{
            marginTop: 32,
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.55,
            maxWidth: "52ch",
            color: "var(--fg-muted-on-dark)",
          }}
        >
          Activations, Creative, Tech, and Production — four specialized studios that
          operate together to deliver seamless, ambitious experiences across the region.
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
          <Link href="/contact" className="btn-rs solid" style={{ textDecoration: "none" }}>
            <span>request a free proposal</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
          <Link href="/work" className="btn-rs" style={{ textDecoration: "none" }}>
            <span>see our work</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
        </div>
      </section>

      <ExperiencesSection />
      <StudiosServicesSection />
      <TeamSection />
    </main>
  );
}
