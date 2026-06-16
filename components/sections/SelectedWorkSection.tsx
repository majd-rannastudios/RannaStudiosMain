"use client";
import { useState, useRef, useEffect } from "react";
import { MetaLabel, Reveal } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

interface Case {
  slug: string;
  super: string;
  name: string;
  desc: string;
  tint: string;
  media: string[]; // photos (.jpg/.png) and/or videos (.mp4/.webm/.mov) — detected by extension
  specs: { k: string; v: string }[];
  side?: string;
}

const isVideo = (src: string) => /\.(mp4|webm|mov|ogg)$/i.test(src);

const CASES: Case[] = [
  {
    slug: "f1",
    super: "case 01_ · activations × entertainment",
    name: "Formula 1 STC Saudi Arabian Grand Prix",
    desc: "Fan zone activations and entertainment programming across the Jeddah Corniche Circuit — interactive zones, live artist bookings, and four-day operational delivery for the Kingdom's marquee motorsport weekend.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.45) 0%, rgba(227,80,10,0.35) 100%)",
    media: ["/cases/f1/f1-1.jpg", "/cases/f1/f1-2.jpg", "/cases/f1/f1-3.jpg"],
    specs: [
      { k: "location", v: "Jeddah, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Entertainment" },
      { k: "duration", v: "4 days" },
      { k: "scope",    v: "fan zones · live entertainment · ops" },
      { k: "outcome",  v: "full activation delivered across event days" },
    ],
    side: "live",
  },
  {
    slug: "rolls-royce",
    super: "case 02_ · activations × creative × production",
    name: "Rolls Royce — Phantom 100",
    desc: "A curated anniversary evening celebrating 100 years of the Phantom — bespoke entertainment, spatial décor design, on-ground staffing, and full event build for an ultra-exclusive Riyadh gathering.",
    tint: "linear-gradient(160deg, rgba(15,15,15,0.55) 0%, rgba(63,24,77,0.45) 100%)",
    media: ["/cases/rolls-royce/rr-1.mp4", "/cases/rolls-royce/rr-2.mp4", "/cases/rolls-royce/rr-3.mp4", "/cases/rolls-royce/rr-1.jpg", "/cases/rolls-royce/rr-2.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Creative · Production" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "entertainment · décor · activations · staffing" },
      { k: "outcome",  v: "anniversary evening delivered to brief" },
    ],
  },
  {
    slug: "saudi-games",
    super: "case 03_ · activations × entertainment",
    name: "The Saudi Games '24",
    desc: "Fan activations and entertainment programming across multiple sport venues for the Saudi Games — engagement zones, crowd programming, and multi-venue operational support over 17 competition days.",
    tint: "linear-gradient(160deg, rgba(63,24,77,0.5) 0%, rgba(201,27,122,0.35) 100%)",
    media: ["/cases/saudi-games/sg-1.jpg", "/cases/saudi-games/sg-2.jpg", "/cases/saudi-games/sg-3.jpg", "/cases/saudi-games/sg-4.jpg", "/cases/saudi-games/sg-5.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2024" },
      { k: "studios",  v: "Activations · Entertainment" },
      { k: "duration", v: "17 days" },
      { k: "scope",    v: "fan zones · entertainment · multi-venue ops" },
      { k: "outcome",  v: "delivered across all competition days" },
    ],
  },
  {
    slug: "wta",
    super: "case 04_ · activations",
    name: "WTA Finals — Community Engagement",
    desc: "26-day community engagement programme surrounding the WTA Finals in Riyadh — fan touchpoints, public activations, and grassroots audience engagement extending the tournament's reach across the city.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.55) 0%, rgba(104,9,125,0.4) 100%)",
    media: ["/cases/wta/wta-1.jpg", "/cases/wta/wta-2.jpg", "/cases/wta/wta-3.jpg", "/cases/wta/wta-4.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations" },
      { k: "duration", v: "26 days" },
      { k: "scope",    v: "community engagement · fan activations" },
      { k: "outcome",  v: "extended tournament reach across the city" },
    ],
  },
  {
    slug: "isg",
    super: "case 05_ · activations × entertainment",
    name: "Islamic Solidarity Games — Athlete Village",
    desc: "Activations and entertainment programming within the Athlete Village for the 25th Islamic Solidarity Games — 25 days of programming designed to welcome and engage competing athletes from 57 nations.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.5) 0%, rgba(227,80,10,0.3) 100%)",
    media: ["/cases/isg/isg-1.jpg", "/cases/isg/isg-2.jpg", "/cases/isg/isg-3.jpg", "/cases/isg/isg-4.jpg", "/cases/isg/isg-5.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Entertainment" },
      { k: "duration", v: "25 days" },
      { k: "scope",    v: "athlete village · activations · entertainment" },
      { k: "outcome",  v: "full programme delivered across games duration" },
    ],
  },
  {
    slug: "range-rover",
    super: "case 06_ · creative × entertainment",
    name: "Range Rover — Gala Dinner",
    desc: "An exclusive brand gala dinner for Range Rover — curated entertainment, bespoke décor design, and custom product integration for an invite-only Riyadh audience.",
    tint: "linear-gradient(160deg, rgba(15,15,15,0.5) 0%, rgba(63,24,77,0.45) 100%)",
    media: ["/cases/range-rover/rv-1.mp4", "/cases/range-rover/rv-2.mp4", "/cases/range-rover/rv-1.jpg", "/cases/range-rover/rv-2.jpg", "/cases/range-rover/rv-3.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Creative · Entertainment" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "entertainment · décor · customized products" },
      { k: "outcome",  v: "gala dinner delivered on brief" },
    ],
  },
  {
    slug: "elie-saab",
    super: "case 07_ · consultancy × production",
    name: "The 1001 Seasons of Elie Saab",
    desc: "Project management and consultancy for a landmark Riyadh Season exhibition — a three-month cultural showcase of Elie Saab's creative legacy, delivered within one of the Kingdom's most prestigious seasonal programmes.",
    tint: "linear-gradient(160deg, rgba(30,15,50,0.6) 0%, rgba(90,45,100,0.4) 100%)",
    media: ["/cases/elie-saab/es-1.jpg", "/cases/elie-saab/es-2.jpg", "/cases/elie-saab/es-3.png", "/cases/elie-saab/es-5.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2024" },
      { k: "studios",  v: "Consultancy · Production" },
      { k: "duration", v: "3 months" },
      { k: "scope",    v: "project management · consultancy · operations" },
      { k: "outcome",  v: "exhibition delivered across full Riyadh Season run" },
    ],
  },
  {
    slug: "riyadh-tours",
    super: "case 08_ · activations × entertainment",
    name: "Riyadh Tours & Saudi Jump",
    desc: "Month-long activations and entertainment delivery for Riyadh Season's equestrian and motorsport programming — audience engagement across multiple event days and a city-wide entertainment footprint.",
    tint: "linear-gradient(160deg, rgba(20,8,60,0.55) 0%, rgba(227,80,10,0.4) 100%)",
    media: ["/cases/riyadh-tours/rt-1.jpg", "/cases/riyadh-tours/rt-2.jpg", "/cases/riyadh-tours/rt-3.jpg", "/cases/riyadh-tours/rt-4.jpg", "/cases/riyadh-tours/rt-5.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Entertainment" },
      { k: "duration", v: "31 days" },
      { k: "scope",    v: "activations · entertainment · season programming" },
      { k: "outcome",  v: "full season run delivered" },
    ],
  },
  {
    slug: "ims",
    super: "case 09_ · creative × entertainment × production",
    name: "International MICE Summit — Gala Dinner",
    desc: "Full-service gala dinner production for the International MICE Summit — entertainment curation, décor build, on-site staffing, and bespoke branded elements for an audience of global events industry leaders.",
    tint: "linear-gradient(160deg, rgba(60,10,20,0.55) 0%, rgba(120,30,60,0.4) 100%)",
    media: ["/cases/ims/ims-1.jpg", "/cases/ims/ims-2.jpg", "/cases/ims/ims-3.jpg", "/cases/ims/ims-4.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Creative · Entertainment · Production" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "entertainment · décor · staffing · custom products" },
      { k: "outcome",  v: "gala dinner delivered to international standard" },
    ],
  },
  {
    slug: "snooker",
    super: "case 10_ · activations × entertainment",
    name: "Saudi Arabia Snooker Masters",
    desc: "Nine days of fan activations and entertainment programming surrounding the Saudi Arabia Snooker Masters in Jeddah — audience engagement zones and on-ground operational support for a growing international sporting event.",
    tint: "linear-gradient(160deg, rgba(8,30,55,0.6) 0%, rgba(10,80,120,0.4) 100%)",
    media: ["/cases/snooker/snooker-1.jpg", "/cases/snooker/snooker-2.jpg", "/cases/snooker/snooker-3.jpg"],
    specs: [
      { k: "location", v: "Jeddah, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Activations · Entertainment" },
      { k: "duration", v: "9 days" },
      { k: "scope",    v: "fan activations · entertainment · ops" },
      { k: "outcome",  v: "full event activation delivered" },
    ],
  },
  {
    slug: "smf-2026",
    super: "case 11_ · consultancy",
    name: "Saudi Media Forum 2026",
    desc: "Consultancy and project management dashboard delivery for the Saudi Media Forum — operational planning support and a custom digital management tool built to coordinate a large-scale national media industry gathering.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.6) 0%, rgba(40,20,80,0.45) 100%)",
    media: ["/cases/smf-2026/smf-1.jpg", "/cases/smf-2026/smf-2.jpg", "/cases/smf-2026/smf-3.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025 – 2026" },
      { k: "studios",  v: "Consultancy" },
      { k: "duration", v: "3 months" },
      { k: "scope",    v: "consultancy · project management · PM dashboard" },
      { k: "outcome",  v: "dashboard delivered ahead of forum" },
    ],
  },
  {
    slug: "beesline-riyadh",
    super: "case 12_ · production × consultancy",
    name: "Beesline — Supercharged Serums (Riyadh)",
    desc: "Full-service pop-up event management for Beesline's Supercharged Serums product launch in Riyadh — project management consultancy, catering delivery, and photo and video production across three activation days.",
    tint: "linear-gradient(160deg, rgba(15,40,15,0.55) 0%, rgba(30,100,40,0.35) 100%)",
    media: ["/cases/beesline-riyadh/br-1.jpg", "/cases/beesline-riyadh/br-2.jpg", "/cases/beesline-riyadh/br-3.jpg", "/cases/beesline-riyadh/br-4.jpg", "/cases/beesline-riyadh/br-5.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Production · Consultancy" },
      { k: "duration", v: "3 days" },
      { k: "scope",    v: "PM consultancy · catering · photo & video" },
      { k: "outcome",  v: "pop-up launch delivered on all deliverables" },
    ],
  },
  {
    slug: "beesline-jeddah",
    super: "case 13_ · production × consultancy",
    name: "Beesline — Supercharged Serums (Jeddah)",
    desc: "Logistics management and project management consultancy for the Jeddah leg of Beesline's Supercharged Serums pop-up tour — replicating the Riyadh activation format with city-specific operational planning.",
    tint: "linear-gradient(160deg, rgba(15,40,15,0.5) 0%, rgba(40,110,50,0.35) 100%)",
    media: ["/cases/beesline-jeddah/bj-1.jpg", "/cases/beesline-jeddah/bj-2.jpg", "/cases/beesline-jeddah/bj-3.jpg", "/cases/beesline-jeddah/bj-4.jpg"],
    specs: [
      { k: "location", v: "Jeddah, Saudi Arabia" },
      { k: "year",     v: "2026" },
      { k: "studios",  v: "Production · Consultancy" },
      { k: "duration", v: "3 days" },
      { k: "scope",    v: "PM consultancy · logistics management" },
      { k: "outcome",  v: "Jeddah leg delivered on schedule" },
    ],
  },
  {
    slug: "azzal",
    super: "case 14_ · consultancy",
    name: "Azzal Street Food Market",
    desc: "Consultancy and advisory for the Azzal Street Food Market concept — strategic guidance on event format, vendor curation, and operational structure for a community-driven food and culture destination in Riyadh.",
    tint: "linear-gradient(160deg, rgba(50,25,10,0.6) 0%, rgba(120,60,20,0.4) 100%)",
    media: ["/cases/azzal/azzal-1.png", "/cases/azzal/azzal-2.png"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Consultancy" },
      { k: "duration", v: "1 month" },
      { k: "scope",    v: "consultancy · advisory · format development" },
      { k: "outcome",  v: "concept advisory completed" },
    ],
  },
  {
    slug: "motorshow",
    super: "case 15_ · production",
    name: "Riyadh Motorshow",
    desc: "Staffing management for the Riyadh Motorshow — end-to-end staff deployment across a three-day automotive showcase, covering floor staff, coordinators, and on-ground support for a major national consumer event.",
    tint: "linear-gradient(160deg, rgba(20,20,20,0.65) 0%, rgba(60,60,70,0.5) 100%)",
    media: ["/cases/motorshow/ms-1.jpg", "/cases/motorshow/ms-2.jpg", "/cases/motorshow/ms-3.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Production" },
      { k: "duration", v: "3 days" },
      { k: "scope",    v: "staffing · floor management · coordination" },
      { k: "outcome",  v: "full staffing brief delivered" },
    ],
  },
  {
    slug: "afc27",
    super: "case 16_ · guest experience × hospitality",
    name: "AFC Asian Cup 2027 — Draw Ceremony",
    desc: "Guest experience and VIP hospitality services for the AFC Asian Cup 2027 Draw Ceremony in Riyadh — curating arrival, welcome, and engagement moments for international stakeholders at a milestone event in Asian football.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.6) 0%, rgba(180,140,0,0.3) 100%)",
    media: ["/cases/afc27/afc-1.mp4", "/cases/afc27/afc-2.mp4", "/cases/afc27/afc-3.mp4", "/cases/afc27/afc-4.mp4", "/cases/afc27/afc-1.jpg", "/cases/afc27/afc-3.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2026" },
      { k: "studios",  v: "Guest Experience · VIP Hospitality" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "guest experience · VIP hospitality · arrival moments" },
      { k: "outcome",  v: "draw ceremony hospitality delivered" },
    ],
  },
  {
    slug: "oliver-wyman",
    super: "case 17_ · activations",
    name: "Oliver Wyman — Suhur",
    desc: "Ramadan suhur activation for Oliver Wyman — a curated corporate activation during the Holy Month, blending hospitality and branded programming for senior professionals in Riyadh.",
    tint: "linear-gradient(160deg, rgba(60,30,10,0.6) 0%, rgba(160,100,30,0.35) 100%)",
    media: [],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2026" },
      { k: "studios",  v: "Activations" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "activations · corporate hospitality" },
      { k: "outcome",  v: "suhur activation delivered" },
    ],
  },
  {
    slug: "sifi",
    super: "case 18_ · activations",
    name: "SIFI — Team Building",
    desc: "Team building activation delivered for SIFI — a private corporate event featuring interactive engagement activities, group challenges, and on-site event management designed to strengthen collaboration and employee engagement.",
    tint: "linear-gradient(160deg, rgba(10,10,30,0.65) 0%, rgba(40,10,60,0.5) 100%)",
    media: ["/cases/sifi/sifi-1.mp4", "/cases/sifi/sifi-2.mp4", "/cases/sifi/sifi-3.mp4", "/cases/sifi/sifi-4.mp4", "/cases/sifi/sifi-1.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2026" },
      { k: "studios",  v: "Activations" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "team building · group activities · event management" },
      { k: "outcome",  v: "corporate activation delivered" },
    ],
  },
  {
    slug: "red-sea-gala",
    super: "case 19_ · creative",
    name: "Red Sea Gala Dinner",
    desc: "Customized product design and sourcing for a prestige gala dinner — bespoke branded elements crafted to the ultra-premium standard expected at an international cultural event.",
    tint: "linear-gradient(160deg, rgba(5,25,55,0.6) 0%, rgba(20,80,120,0.4) 100%)",
    media: ["/cases/red-sea-gala/rsg-1.jpg", "/cases/red-sea-gala/rsg-2.jpg", "/cases/red-sea-gala/rsg-3.jpg"],
    specs: [
      { k: "location", v: "Dubai, UAE" },
      { k: "year",     v: "2026" },
      { k: "studios",  v: "Creative" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "customized products · branded elements" },
      { k: "outcome",  v: "custom products delivered" },
    ],
  },
  {
    slug: "isg-gala",
    super: "case 20_ · entertainment",
    name: "ISG Gala Dinner",
    desc: "Entertainment management for the Islamic Games Gala Dinner — greeting entertainment, live performance programming, and general entertainment delivery, creating a welcoming and engaging guest experience for athletes, delegates, and VIP attendees.",
    tint: "linear-gradient(160deg, rgba(8,0,53,0.55) 0%, rgba(227,80,10,0.35) 100%)",
    media: ["/cases/isg-gala/isg-gala-1.mp4", "/cases/isg-gala/isg-gala-4-compressed.mp4", "/cases/isg-gala/isg-gala-1.jpg", "/cases/isg-gala/isg-gala-2.jpg", "/cases/isg-gala/isg-gala-3.jpg"],
    specs: [
      { k: "location", v: "Riyadh, Saudi Arabia" },
      { k: "year",     v: "2025" },
      { k: "studios",  v: "Entertainment" },
      { k: "duration", v: "1 day" },
      { k: "scope",    v: "entertainment · live performance · guest experience" },
      { k: "outcome",  v: "gala dinner entertainment delivered" },
    ],
  },
];

function CaseCarousel({ c, i }: { c: Case; i: number }) {
  const [idx, setIdx] = useState(0);
  const [videoLoading, setVideoLoading] = useState(false);
  const total = c.media.length;
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const touchStartX = useRef<number | null>(null);

  useEffect(() => {
    c.media.forEach((src, j) => {
      if (!isVideo(src)) return;
      const v = videoRefs.current[j];
      if (!v) return;
      if (j === idx) {
        v.currentTime = 0;
        const ready = v.readyState >= 3;
        setVideoLoading(!ready);
        v.play().catch(() => {});
      } else {
        v.pause();
      }
    });
    if (!isVideo(c.media[idx])) setVideoLoading(false);
  }, [idx, c.media]);

  const prev = () => setIdx((idx - 1 + total) % total);
  const next = () => setIdx((idx + 1) % total);

  const onTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const onTouchEnd   = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(dx) > 40) dx < 0 ? next() : prev();
    touchStartX.current = null;
  };

  const diamondBtn: React.CSSProperties = {
    position: "absolute",
    top: "50%",
    zIndex: 4,
    width: 20,
    height: 20,
    background: "var(--burnt-horizon)",
    border: "none",
    cursor: "pointer",
    padding: 0,
    transition: "opacity 180ms",
  };

  return (
    <div
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      style={{ position: "relative", aspectRatio: "16 / 10", overflow: "hidden", background: "var(--abyssal-black)", order: 1 }}
    >
      {/* Media — 1 item at a time, fade transition */}
      {c.media.map((src, j) =>
        isVideo(src) ? (
          <video
            key={j}
            ref={(el) => { videoRefs.current[j] = el; }}
            src={src}
            muted loop playsInline preload="auto"
            onWaiting={() => { if (j === idx) setVideoLoading(true); }}
            onCanPlay={() => { if (j === idx) setVideoLoading(false); }}
            onPlaying={() => { if (j === idx) setVideoLoading(false); }}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "cover", objectPosition: "center",
              opacity: j === idx ? 1 : 0,
              transition: "opacity 420ms cubic-bezier(.6,0,.2,1)",
            }}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={j}
            src={src}
            alt={j === 0 ? c.name : ""}
            style={{
              position: "absolute", inset: 0, width: "100%", height: "100%",
              objectFit: "contain", objectPosition: "center",
              opacity: j === idx ? 1 : 0,
              transition: "opacity 420ms cubic-bezier(.6,0,.2,1)",
            }}
          />
        )
      )}

      {/* Brand tint */}
      <div style={{ position: "absolute", inset: 0, background: c.tint, pointerEvents: "none", zIndex: 1 }} />

      {/* Grid texture */}
      <div style={{ position: "absolute", inset: 0, backgroundImage: "linear-gradient(to right, rgba(255,255,255,0.04) 1px, transparent 1px) 0 0/ 60px 100%, linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px) 0 0/ 100% 60px", pointerEvents: "none", zIndex: 2 }} />

      {/* Video loading indicator */}
      {videoLoading && (
        <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 5, pointerEvents: "none" }}>
          <div style={{
            width: 18, height: 18,
            border: "2px solid rgba(255,255,255,0.2)",
            borderTop: "2px solid rgba(255,255,255,0.85)",
            borderRadius: "50%",
            animation: "spin 700ms linear infinite",
          }} />
        </div>
      )}

      {/* Year — bottom right */}
      {(() => { const yr = c.specs.find(s => s.k === "year")?.v; return yr ? (
        <div style={{ position: "absolute", bottom: 14, right: 14, zIndex: 4, fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.16em", color: "rgba(255,255,255,0.7)", pointerEvents: "none" }}>
          {yr}
        </div>
      ) : null; })()}

      {/* Prev / Next — orange diamonds */}
      {total > 1 && (
        <>
          <button onClick={prev} style={{ ...diamondBtn, left: 14, transform: "translateY(-50%) rotate(45deg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            aria-label="Previous" />
          <button onClick={next} style={{ ...diamondBtn, right: 14, transform: "translateY(-50%) rotate(45deg)" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "0.7"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
            aria-label="Next" />
        </>
      )}

      {/* Dot indicators — centered bottom, clear of year label */}
      {total > 1 && (
        <div style={{ position: "absolute", bottom: 14, left: 0, right: 60, display: "flex", alignItems: "center", justifyContent: "center", gap: 8, zIndex: 4 }}>
          {c.media.map((_: string, j: number) => (
            <button key={j} onClick={() => setIdx(j)} aria-label={`Item ${j + 1}`}
              style={{ width: 6, height: 6, background: j === idx ? "var(--dust-white)" : "rgba(255,255,255,0.35)", border: 0, padding: 0, cursor: "pointer", transform: "rotate(45deg)", transition: "background 200ms", flexShrink: 0 }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function SelectedWorkSection() {
  const isMobile = useIsMobile();
  return (
    <section id="work">
      {/* Header — white background */}
      <div
        style={{
          background: "var(--dust-white)",
          color: "var(--pitch-black)",
          padding: "clamp(64px, 8vw, 112px) clamp(20px, 5vw, 88px) clamp(40px, 5vw, 64px)",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "clamp(24px, 5vw, 80px)",
            alignItems: "end",
          }}
        >
          <Reveal>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(24px, 2.8vw, 44px)",
                fontWeight: 500,
                letterSpacing: "-0.025em",
                lineHeight: 1.1,
                color: "var(--pitch-black)",
                margin: "16px 0 0",
                maxWidth: "18ch",
              }}
            >
              Events we&apos;ve put on the{" "}
              <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>map</em>.
            </h2>
          </Reveal>
          <Reveal delay={120}>
            <p style={{ fontSize: "clamp(15px, 1.2vw, 18px)", color: "color-mix(in oklab, var(--pitch-black) 55%, transparent)", lineHeight: 1.55, maxWidth: "48ch", margin: 0 }}>
              A selection of events delivered across the GCC. Most engagements operate under
              non-disclosure — case studies released by partner approval.
            </p>
          </Reveal>
        </div>
      </div>

      {/* Cases — white background */}
      <div style={{ background: "var(--dust-white)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr", borderTop: "1px solid var(--rule-on-light)" }}>
        {CASES.map((c, i) => (
          <div
            key={i}
            id={`case-${c.slug}`}
            style={{
              display: "grid",
              gridTemplateColumns: isMobile ? "1fr" : "1.3fr 1fr",
              gap: "clamp(24px, 4vw, 56px)",
              padding: "clamp(24px, 3vw, 40px) clamp(20px, 5vw, 88px)",
              borderBottom: "1px solid var(--rule-on-light)",
              alignItems: "center",
            }}
          >
            <CaseCarousel c={c} i={i} />

            {/* Info */}
            <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", gap: 24, paddingTop: 8, order: 2 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <span style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.16em", textTransform: "lowercase", color: "var(--pitch-black)", opacity: 0.55 }}>
                  {c.super}
                </span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(28px, 3.6vw, 52px)", fontWeight: 500, letterSpacing: "-0.02em", lineHeight: 1.0, margin: 0, color: "var(--pitch-black)" }}>
                  {c.name}.
                </h3>
                <p style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.55, color: "var(--fg-muted-on-light)", maxWidth: "48ch" }}>
                  {c.desc}
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "16px 24px", borderTop: "1px solid var(--rule-on-light)", paddingTop: 20 }}>
                {c.specs.map((s, j) => (
                  <div key={j}>
                    <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)", marginBottom: 4 }}>{s.k}</div>
                    <div style={{ fontSize: 14, lineHeight: 1.4, color: "var(--pitch-black)" }}>{s.v}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      </div>
    </section>
  );
}
