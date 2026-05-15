"use client";
import { useState, useEffect } from "react";
import { MetaLabel, Reveal, Lz } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

const PROJECT_TYPES = [
  "Activation", "Fan Zone", "F1 / Sport", "Cultural Program",
  "Government", "Public Space", "VIP / Hospitality", "Conference / Summit",
  "Product Launch", "Other",
];

const TIMELINES = ["< 30 days", "1 – 3 months", "3 – 6 months", "6+ months", "Multi-year"];
const AUDIENCES = ["< 500", "500 – 5,000", "5,000 – 50,000", "50,000 – 200,000", "200,000+"];

export default function ContactSection() {
  const [type, setType] = useState("Activation");
  const [timeline, setTimeline] = useState("3 – 6 months");
  const [audience, setAudience] = useState("5,000 – 50,000");
  const [whatsapp, setWhatsapp] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [location, setLocation] = useState("");
  const isMobile = useIsMobile();

  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("country");
    if (p) setLocation(p);
  }, []);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputStyle: React.CSSProperties = {
    background: "transparent",
    border: 0,
    borderBottom: "1px solid var(--rule-on-light)",
    color: "var(--pitch-black)",
    fontFamily: "var(--font-display)",
    fontSize: 15,
    padding: "10px 0",
    outline: "none",
    width: "100%",
    borderRadius: 0,
  };

  return (
    <section
      id="proposal"
      style={{
        background: "var(--dust-white)",
        color: "var(--pitch-black)",
        padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: "-15%",
          bottom: "-10%",
          width: "50%",
          height: "70%",
          background: "radial-gradient(closest-side, color-mix(in oklab, var(--burnt-horizon) 50%, transparent), transparent 70%)",
          filter: "blur(80px)",
          opacity: 0.5,
          pointerEvents: "none",
        }}
        aria-hidden="true"
      />

      <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1.2fr", gap: "clamp(40px, 5vw, 96px)", position: "relative", alignItems: "start" }}>
        <Reveal>
          <MetaLabel color="var(--burnt-horizon)">request a free proposal</MetaLabel>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(36px, 5.4vw, 88px)",
              fontWeight: 500,
              letterSpacing: "-0.035em",
              lineHeight: 1.0,
              margin: "16px 0 24px",
              maxWidth: "16ch",
            }}
          >
            Request a{" "}
            <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>free</em>{" "}
            proposal.
          </h2>
          <p style={{ fontSize: "clamp(16px, 1.2vw, 19px)", lineHeight: 1.5, color: "var(--fg-muted-on-light)", maxWidth: "48ch" }}>
            Tell us about your project and our team will come back with an initial creative direction
            tailored to your audience, goals, and experience strategy.
          </p>
          <p style={{ fontFamily: "var(--font-support)", fontSize: 12, letterSpacing: "0.04em", color: "var(--ember-dawn)", marginTop: 24, maxWidth: "42ch", lineHeight: 1.6, borderLeft: "1px solid var(--ember-dawn)", paddingLeft: 16 }}>
            Creative ideation and proposal development are part of the process —
            you&apos;ll receive considered direction, not a price list.
          </p>

          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", gap: 1, background: "var(--rule-on-light)" }}>
            {[
              { k: "response_", v: "within 48 hours" },
              { k: "whatsapp_", v: "+966 55 152 0499" },
              { k: "brief_", v: "brief@rannastudios.com" },
              { k: "nda_", v: "available on request" },
              { k: "offices_", v: "riyadh · beirut" },
            ].map((item) => (
              <div key={item.k} style={{ background: "var(--dust-white)", padding: "18px 0", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, fontFamily: "var(--font-support)", fontSize: 12, letterSpacing: "0.12em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
                  <Lz color="var(--ember-dawn)" />
                  {item.k}
                </span>
                <b style={{ color: "var(--pitch-black)", fontWeight: 500 }}>{item.v}</b>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          as="form"
          delay={120}
          onSubmit={onSubmit}
          style={{
            background: "color-mix(in oklab, var(--ember-dawn) 20%, transparent)",
            border: "1px solid var(--rule-on-light)",
            padding: "clamp(28px, 4vw, 48px)",
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "24px 20px",
            position: "relative",
          }}
        >
          {submitted ? (
            <div style={{ gridColumn: "1 / -1", padding: "32px 0", textAlign: "center" }}>
              <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.18em", color: "var(--ember-dawn)", textTransform: "lowercase", marginBottom: 16 }}>received_</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 32, fontWeight: 500, letterSpacing: "-0.02em", marginBottom: 12 }}>
                Thank you. Our team will be in touch within 48 hours.
              </div>
              <div style={{ fontFamily: "var(--font-support)", fontSize: 12, letterSpacing: "0.06em", color: "var(--fg-muted-on-light)" }}>
                a copy of this brief has been sent to brief@rannastudios.com
              </div>
            </div>
          ) : (
            <>
              {[
                { label: "your name", type: "text", placeholder: "Full name", required: true },
                { label: "company / entity", type: "text", placeholder: "Organization", required: true },
                { label: "email", type: "email", placeholder: "you@org.com", required: true },
                { label: "phone", type: "tel", placeholder: "+966", required: false },
              ].map((f) => (
                <div key={f.label} style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  <label style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>
                    {f.label}<span style={{ opacity: 0.4 }}>_</span>
                  </label>
                  <input type={f.type} placeholder={f.placeholder} required={f.required} style={inputStyle} />
                </div>
              ))}

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>project type<span style={{ opacity: 0.4 }}>_</span></label>
                <select value={type} onChange={(e) => setType(e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  {PROJECT_TYPES.map((t) => <option key={t} style={{ background: "var(--dust-white)", color: "var(--pitch-black)" }}>{t}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>location<span style={{ opacity: 0.4 }}>_</span></label>
                <input type="text" placeholder="Country · city" value={location} onChange={(e) => setLocation(e.target.value)} style={inputStyle} />
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>timeline<span style={{ opacity: 0.4 }}>_</span></label>
                <select value={timeline} onChange={(e) => setTimeline(e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  {TIMELINES.map((t) => <option key={t} style={{ background: "var(--dust-white)", color: "var(--pitch-black)" }}>{t}</option>)}
                </select>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>estimated audience<span style={{ opacity: 0.4 }}>_</span></label>
                <select value={audience} onChange={(e) => setAudience(e.target.value)} style={{ ...inputStyle, appearance: "none", cursor: "pointer" }}>
                  {AUDIENCES.map((t) => <option key={t} style={{ background: "var(--dust-white)", color: "var(--pitch-black)" }}>{t}</option>)}
                </select>
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", flexDirection: "column", gap: 8 }}>
                <label style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>tell us about the experience<span style={{ opacity: 0.4 }}>_</span></label>
                <textarea
                  placeholder="What's the moment, the audience, and the ambition? Anything you can share about scope, partners, or constraints helps us come back with the right team and direction."
                  style={{ ...inputStyle, minHeight: 120, resize: "vertical" }}
                />
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginTop: 8 }}>
                <span style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>preferred reply_</span>
                {[{ label: "whatsapp", value: true }, { label: "email", value: false }].map((opt) => (
                  <button
                    key={opt.label}
                    type="button"
                    onClick={() => setWhatsapp(opt.value)}
                    style={{
                      fontFamily: "var(--font-support)",
                      fontSize: 11,
                      letterSpacing: "0.12em",
                      textTransform: "lowercase",
                      padding: "8px 14px",
                      border: "1px solid",
                      borderColor: whatsapp === opt.value ? "var(--burnt-horizon)" : "var(--rule-on-light)",
                      background: whatsapp === opt.value ? "var(--burnt-horizon)" : "transparent",
                      color: whatsapp === opt.value ? "var(--pitch-black)" : "var(--pitch-black)",
                      cursor: "pointer",
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <Lz />
                    {opt.label}
                  </button>
                ))}
              </div>

              <div style={{ gridColumn: "1 / -1", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 16, marginTop: 12, paddingTop: 24, borderTop: "1px solid var(--rule-on-light)" }}>
                <span style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.04em", color: "var(--fg-muted-on-light)", maxWidth: "38ch" }}>
                  By submitting you agree to our review process. We treat all briefs as confidential — NDAs available on request.
                </span>
                <button type="submit" className="btn-rs solid">
                  <span>request proposal</span> <span style={{ opacity: 0.7 }}>→</span>
                </button>
              </div>
            </>
          )}
        </Reveal>
      </div>
    </section>
  );
}
