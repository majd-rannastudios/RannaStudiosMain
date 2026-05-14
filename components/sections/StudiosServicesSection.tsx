"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const STUDIOS = [
  {
    num: "01",
    name: "Activations",
    color: "var(--burnt-horizon)",
    bg: "#E3500A",
    textDark: false,
    capabilities: [
      { name: "Fan Zone Design",         desc: "Purpose-built zones designed around the audience. Every entry point, sight-line, and activation space optimised for immersion and dwell time." },
      { name: "Brand Experiences",       desc: "Physical brand worlds that turn marketing into memory. We translate brand strategy into walk-through experiences audiences carry home." },
      { name: "Live Entertainment",      desc: "Headlining performances, athlete appearances, and live content moments engineered to become the defining highlight of any event." },
      { name: "Gamification",            desc: "Competition mechanics, leaderboards, and interactive challenges that transform passive spectators into active participants." },
      { name: "Crowd Activation",        desc: "Synchronized moments — light shows, sound design, audience prompts — that turn individuals into a unified, electric experience." },
      { name: "Spatial Theming",         desc: "End-to-end environmental design that takes a raw venue and builds it into a fully immersive, branded world." },
      { name: "Sponsorship Integration", desc: "Creative placement of partner assets that feels native to the experience — not an interruption, but part of the story." },
      { name: "Audience Journey",        desc: "Every touchpoint from arrival to exit mapped and optimised to eliminate friction and maximise engagement at every step." },
    ],
  },
  {
    num: "02",
    name: "Creative",
    color: "var(--crimson-bloom)",
    bg: "#C91B7A",
    textDark: false,
    capabilities: [
      { name: "Concept Development", desc: "The brief turned into a world. We develop concepts from first principles — defining the big idea, emotional ambition, and visual language." },
      { name: "Art Direction",       desc: "Visual leadership across every deliverable, ensuring every element reads as one cohesive and deliberate statement." },
      { name: "Spatial Design",      desc: "Three-dimensional thinking applied to event environments — guiding attention, amplifying atmosphere, and creating moments worth photographing." },
      { name: "3D Visualization",    desc: "Photo-realistic renders and real-time fly-throughs that sell the vision to clients and contractors before a single structure is built." },
      { name: "Brand Identity",      desc: "Event-specific identity systems: wordmarks, colour palettes, typographic hierarchies, and motion principles — built to scale." },
      { name: "Set Design",          desc: "Stage architecture, scenography, and set builds designed for visual impact from every angle in the room." },
      { name: "Motion Graphics",     desc: "Broadcast-grade motion content for LED walls, screens, and social — designed to loop seamlessly and adapt in real time." },
      { name: "Visual Strategy",     desc: "The visual roadmap that ensures every creative decision serves the event's core narrative and commercial objectives." },
    ],
  },
  {
    num: "03",
    name: "Tech",
    color: "var(--veil-becoming)",
    bg: "#68097D",
    textDark: false,
    capabilities: [
      { name: "Registration Platforms", desc: "Custom-built attendee registration with real-time capacity management, smart QR access, and full CRM integration." },
      { name: "AI Engagement",          desc: "Machine learning tools: recommendation engines, audience chatbots, personalised content delivery, and live sentiment analysis." },
      { name: "Interactive Hardware",   desc: "Touch screens, motion sensors, gesture walls, and custom interactive installations that make technology feel tangible and playful." },
      { name: "Live Dashboards",        desc: "Real-time operational and audience dashboards giving event teams full visibility across every metric — from attendance to dwell time." },
      { name: "Mobile Applications",    desc: "Event apps with schedules, wayfinding, notifications, and interactive features — engineered for reliability under peak load." },
      { name: "Digital Signage",        desc: "Centrally managed, networked display systems updated in real time across the entire venue footprint." },
      { name: "Data Analytics",         desc: "Post-event intelligence covering attendance patterns, engagement scores, dwell times, and audience behaviour — delivered as actionable insight." },
      { name: "Live Streaming",         desc: "Multi-camera production pipelines built for broadcast-quality streaming to global audiences with minimal latency." },
    ],
  },
  {
    num: "04",
    name: "Production",
    color: "var(--ember-dawn)",
    bg: "#FB9203",
    textDark: true,
    capabilities: [
      { name: "Guest Flow Planning", desc: "Ingress and egress mapped to eliminate bottlenecks, reduce wait times, and ensure every guest arrives calm and oriented." },
      { name: "Crowd Management",    desc: "Trained teams and dynamic flow systems deployed at scale — from intimate VIP rooms to 200,000-capacity public venues." },
      { name: "Logistics",           desc: "End-to-end logistics management: freight, customs clearance, warehousing, and last-mile delivery to site — on time." },
      { name: "Event Operations",    desc: "Operational command structures that give every stakeholder real-time visibility and clear escalation paths when it matters most." },
      { name: "Vendor Management",   desc: "A trusted regional supplier network managed to one standard: on time, on spec, on budget — every single time." },
      { name: "Run-of-Show",         desc: "Minute-by-minute production schedules engineered to eliminate ambiguity and keep every department in precise, coordinated sync." },
      { name: "Safety Planning",     desc: "Venue risk assessments, medical planning, and emergency response protocols built to the highest international standards." },
      { name: "Site Management",     desc: "Full site supervision from load-in to load-out, keeping delivery teams, contractors, and clients aligned at every stage." },
    ],
  },
];

export default function StudiosServicesSection() {
  const [active, setActive] = useState(0);
  const activeRef = useRef(0);

  const studio = STUDIOS[active];
  const tc   = studio.textDark ? "var(--pitch-black)"   : "var(--dust-white)";
  const tm   = studio.textDark ? "rgba(0,0,0,0.55)"     : "rgba(255,255,255,0.55)";
  const tb   = studio.textDark ? "rgba(0,0,0,0.18)"     : "rgba(255,255,255,0.18)";
  const tmut = studio.textDark ? "rgba(0,0,0,0.28)"     : "rgba(255,255,255,0.25)";

  function scrollToStudio(idx: number) {
    const el = document.querySelector<HTMLElement>(`[data-svc-studio="${idx}"]`);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>("[data-svc-studio]");
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = parseInt((e.target as HTMLElement).dataset.svcStudio ?? "0", 10);
            if (idx !== activeRef.current) {
              activeRef.current = idx;
              setActive(idx);
            }
          }
        });
      },
      { threshold: 0, rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div style={{ display: "grid", gridTemplateColumns: "5fr 8fr", minHeight: "100vh", position: "relative" }}>

      {/* ── Left — sticky, matches homepage layout exactly ─── */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          backgroundColor: studio.bg,
          transition: "background-color 480ms ease",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(96px, 12vh, 140px) clamp(20px, 3vw, 48px) clamp(36px, 4vh, 56px)",
          gap: "clamp(12px, 1.5vw, 20px)",
        }}
      >
        {/* Studios list */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            borderTop: `1px solid ${tb}`,
            paddingTop: "clamp(10px, 1.4vw, 20px)",
          }}
        >
          {STUDIOS.map((s, i) => (
            <button
              key={i}
              onClick={() => scrollToStudio(i)}
              style={{
                background: "transparent",
                border: "none",
                borderBottom: i < STUDIOS.length - 1 ? `1px solid ${tb}` : "none",
                cursor: "pointer",
                textAlign: "left",
                padding: "clamp(6px, 1vw, 14px) 0",
              }}
            >
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-support)",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: i === active ? tc : tmut,
                  marginBottom: 4,
                  transition: "color 400ms ease",
                }}
              >
                {s.num}
              </span>
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(24px, 3.2vw, 56px)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 0.88,
                  textTransform: "uppercase",
                  color: i === active ? tc : tmut,
                  transition: "color 400ms ease",
                }}
              >
                {s.name}
              </span>
            </button>
          ))}
        </div>

        {/* Footer CTA */}
        <div
          style={{
            paddingTop: "clamp(12px, 1.5vw, 22px)",
            borderTop: `1px solid ${tb}`,
          }}
        >
          <Link
            href="/contact"
            className="btn-rs"
            style={{
              fontSize: 11,
              padding: "10px 18px",
              borderColor: tc,
              color: tc,
              textDecoration: "none",
              display: "inline-flex",
            }}
          >
            <span>request a proposal</span>
            <span style={{ opacity: 0.6, marginLeft: 10 }}>→</span>
          </Link>
        </div>
      </div>

      {/* ── Right — scrollable capabilities ──────────────────── */}
      <div style={{ background: "var(--dust-white)" }}>
        {STUDIOS.map((s, si) => (
          <div key={si} id={`studio-${si}`} data-svc-studio={si}>

            {/* Studio group header — sticky within right column */}
            <div
              style={{
                padding: "clamp(48px, 6vw, 80px) clamp(28px, 3.5vw, 56px) clamp(20px, 2vw, 32px)",
                borderBottom: "1px solid var(--rule-on-light)",
                background: `color-mix(in oklab, ${s.bg} 6%, var(--dust-white))`,
                position: "sticky",
                top: 0,
                zIndex: 5,
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-support)",
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: s.bg,
                  marginBottom: 8,
                  opacity: 0.7,
                }}
              >
                studio · {s.num}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(18px, 1.8vw, 28px)",
                  fontWeight: 700,
                  letterSpacing: "-0.025em",
                  color: s.bg,
                  textTransform: "uppercase",
                  margin: 0,
                }}
              >
                {s.name}
              </h3>
            </div>

            {/* Capability rows */}
            {s.capabilities.map((cap, ci) => (
              <div
                key={ci}
                style={{
                  display: "grid",
                  gridTemplateColumns: "48px 1fr",
                  gap: "clamp(16px, 2vw, 28px)",
                  padding: "clamp(20px, 2.5vw, 36px) clamp(28px, 3.5vw, 56px)",
                  borderBottom: "1px solid var(--rule-on-light)",
                  alignItems: "start",
                  transition: "background 200ms",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background =
                    `color-mix(in oklab, ${s.bg} 7%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.background = "transparent";
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-support)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    color: s.bg,
                    paddingTop: 4,
                    opacity: 0.55,
                  }}
                >
                  {String(ci + 1).padStart(2, "0")}
                </span>
                <div>
                  <div
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "clamp(15px, 1.4vw, 20px)",
                      fontWeight: 600,
                      letterSpacing: "-0.015em",
                      color: "var(--pitch-black)",
                      marginBottom: 8,
                    }}
                  >
                    {cap.name}
                  </div>
                  <div
                    style={{
                      fontFamily: "var(--font-support)",
                      fontSize: "clamp(12px, 0.95vw, 14px)",
                      lineHeight: 1.65,
                      color: "var(--fg-muted-on-light)",
                    }}
                  >
                    {cap.desc}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
