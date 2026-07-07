"use client";
import { useEffect } from "react";
import SelectedWorkSection from "@/components/sections/SelectedWorkSection";
import { MetaLabel } from "@/components/Primitives";
import Link from "next/link";

export default function WorkPage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const t = setTimeout(() => {
      const el = document.querySelector(hash);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 350);
    return () => clearTimeout(t);
  }, []);
  return (
    <main>
      {/* Page hero */}
      <section
        style={{
          background: "linear-gradient(160deg, var(--dusk-matter) 0%, var(--abyssal-black) 55%)",
          padding: "clamp(140px, 18vw, 240px) clamp(20px, 5vw, 88px) clamp(64px, 8vw, 96px)",
          borderBottom: "1px solid var(--rule-on-dark)",
        }}
      >
        <MetaLabel color="var(--burnt-horizon)">selected work</MetaLabel>
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
          Projects that{" "}
          <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>define</em> the
          region.
        </h1>

        <p
          style={{
            marginTop: 32,
            fontSize: "clamp(16px, 1.3vw, 20px)",
            lineHeight: 1.5,
            maxWidth: "52ch",
            color: "var(--fg-muted-on-dark)",
          }}
        >
          From Formula 1 fan zones to government mega-events — a selection of the work we&apos;ve
          been trusted to design, build, and operate.
        </p>

        <div style={{ marginTop: 40, display: "flex", gap: 12 }}>
          <Link href="/contact" className="btn-rs solid" style={{ textDecoration: "none" }}>
            <span>start a project</span>
            <span style={{ opacity: 0.7 }}>→</span>
          </Link>
        </div>
      </section>

      <SelectedWorkSection />

      {/* CTA block */}
      <section
        style={{
          background: "var(--abyssal-black)",
          padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
          textAlign: "center",
          borderTop: "1px solid var(--rule-on-dark)",
        }}
      >
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 72px)",
            fontWeight: 500,
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            margin: "20px auto 32px",
            maxWidth: "20ch",
          }}
        >
          Ready to build your next{" "}
          <em style={{ fontStyle: "normal", color: "var(--ember-dawn)" }}>experience</em>?
        </h2>
        <Link href="/contact" className="btn-rs" style={{ textDecoration: "none" }}>
          <span>request a free proposal</span>
          <span style={{ opacity: 0.7 }}>→</span>
        </Link>
      </section>
    </main>
  );
}
