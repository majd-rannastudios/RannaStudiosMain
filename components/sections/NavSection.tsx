"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const STUDIOS = [
  {
    code: "01",
    name: "Activations",
    desc: "Fan zones, brand experiences, live entertainment, and crowd activations at scale.",
    href: "/services#activations",
    accent: "#E3500A",
  },
  {
    code: "02",
    name: "Creative",
    desc: "Concept development, art direction, spatial design, and motion graphics.",
    href: "/services#creative",
    accent: "#C91B7A",
  },
  {
    code: "03",
    name: "Tech",
    desc: "Interactive hardware, AI engagement, live streaming, and digital platforms.",
    href: "/services#tech",
    accent: "#68097D",
  },
  {
    code: "04",
    name: "Production",
    desc: "Logistics, site management, run-of-show, and full event operations.",
    href: "/services#production",
    accent: "#FB9203",
  },
];

const ABOUT_LINKS = [
  { label: "field of expertise", href: "/services" },
  { label: "team",               href: "/about#team" },
];

const NAV_LINKS = [
  { label: "work",    href: "/work",    color: "var(--burnt-horizon)" },
  { label: "news",    href: "/news",    color: "var(--crimson-bloom)" },
  { label: "about",   href: "/about",  sub: ABOUT_LINKS, color: "var(--veil-becoming)" },
  { label: "contact", href: "/contact", color: "var(--ember-dawn)" },
];

export default function NavSection() {
  const [scrolled, setScrolled]     = useState(false);
  const [megaOpen, setMegaOpen]     = useState(false);
  const [aboutOpen, setAboutOpen]   = useState(false);
  const megaRef        = useRef<HTMLDivElement>(null);
  const studiosTrigger = useRef<HTMLDivElement>(null);
  const aboutTrigger   = useRef<HTMLDivElement>(null);
  const closeMegaTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const closeAboutTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname   = usePathname();
  const isHomePage = pathname === "/";
  const isScrolledOrInner = scrolled || !isHomePage;
  // On non-home pages the hero is always dark — use white text even when unscrolled
  const navColor = isScrolledOrInner ? "var(--dust-white)" : "var(--pitch-black)";
  const logoFilter = isScrolledOrInner ? "brightness(0) invert(1)" : "none";

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "#");
  }
  const studiosActive = pathname === "/services" || pathname.startsWith("/services");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function openMega()  { if (closeMegaTimer.current) clearTimeout(closeMegaTimer.current); setMegaOpen(true); }
  function closeMega() { closeMegaTimer.current = setTimeout(() => setMegaOpen(false), 160); }
  function openAbout()  { if (closeAboutTimer.current) clearTimeout(closeAboutTimer.current); setAboutOpen(true); }
  function closeAbout() { closeAboutTimer.current = setTimeout(() => setAboutOpen(false), 160); }

  const navTop = scrolled ? 95 : 132;

  return (
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled ? "12px clamp(20px, 5vw, 88px)" : "22px clamp(20px, 5vw, 88px)",
        zIndex: 100,
        transition: "background 320ms cubic-bezier(.6,0,.2,1), border-color 320ms, padding 320ms cubic-bezier(.6,0,.2,1)",
        borderBottom: "1px solid",
        borderBottomColor: scrolled ? "rgba(255,255,255,0.15)" : "transparent",
        background: scrolled
          ? "linear-gradient(90deg, rgba(251,146,3,0.92) 0%, rgba(227,80,10,0.9) 30%, rgba(201,27,122,0.88) 65%, rgba(8,0,53,0.94) 100%)"
          : "transparent",
        backdropFilter:       scrolled ? "blur(16px)" : undefined,
        WebkitBackdropFilter: scrolled ? "blur(16px)" : undefined,
      }}
    >
      {/* Logo */}
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Ranna Studios"
          style={{
            height: scrolled ? 70 : 108,
            width: "auto",
            filter: logoFilter,
            transition: "height 320ms cubic-bezier(.6,0,.2,1), filter 320ms cubic-bezier(.6,0,.2,1)",
          }}
        />
      </Link>

      {/* Nav */}
      <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>

        {/* Studios mega-menu trigger */}
        <div
          ref={studiosTrigger}
          style={{ position: "relative" }}
          onMouseEnter={openMega}
          onMouseLeave={closeMega}
        >
          <button
            style={{
              fontFamily: "var(--font-support)",
              fontSize: 15,
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "lowercase",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: "none",
              border: "none",
              borderBottom: studiosActive ? "2px solid currentColor" : "2px solid transparent",
              cursor: "pointer",
              color: isScrolledOrInner ? "var(--dust-white)" : "var(--ember-dawn)",
              transition: "color 320ms cubic-bezier(.6,0,.2,1)",
              padding: 0,
              paddingBottom: 2,
            }}
          >
            studios
            <span
              style={{
                display: "inline-block",
                width: 8, height: 8,
                borderRight: "1px solid currentColor",
                borderBottom: "1px solid currentColor",
                transform: megaOpen ? "rotate(-135deg) translateY(2px)" : "rotate(45deg) translateY(-2px)",
                transition: "transform 220ms cubic-bezier(.6,0,.2,1)",
                marginLeft: 2,
              }}
            />
          </button>

          {/* Studios mega-menu panel */}
          <div
            ref={megaRef}
            onMouseEnter={openMega}
            onMouseLeave={closeMega}
            style={{
              position: "fixed",
              top: navTop,
              left: 0, right: 0,
              background: "var(--abyssal-black)",
              borderTop: "1px solid var(--rule-on-dark)",
              borderBottom: "1px solid var(--rule-on-dark)",
              padding: "clamp(28px, 3vw, 48px) clamp(20px, 5vw, 88px)",
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
              transition: "opacity 220ms cubic-bezier(.6,0,.2,1), transform 220ms cubic-bezier(.6,0,.2,1)",
              opacity: megaOpen ? 1 : 0,
              transform: megaOpen ? "translateY(0)" : "translateY(-8px)",
              pointerEvents: megaOpen ? "all" : "none",
              zIndex: 99,
            }}
          >
            {STUDIOS.map((s, i) => (
              <Link
                key={s.code}
                href={s.href}
                onClick={() => setMegaOpen(false)}
                style={{
                  padding: "20px 24px 20px 20px",
                  borderRight: i < 3 ? "1px solid var(--rule-on-dark)" : "none",
                  textDecoration: "none",
                  color: "var(--dust-white)",
                  display: "block",
                  transition: "background 180ms",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background =
                    `color-mix(in oklab, ${s.accent} 14%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                }}
              >
                <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", color: s.accent, marginBottom: 8 }}>
                  {s.code}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>
                  {s.name}
                </div>
                <div style={{ fontFamily: "var(--font-support)", fontSize: 15, lineHeight: 1.5, color: "var(--fg-muted-on-dark)" }}>
                  {s.desc}
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Plain nav links + "about" with dropdown */}
        {NAV_LINKS.map((item) =>
          item.sub ? (
            // About — with small dropdown
            <div
              key={item.label}
              ref={aboutTrigger}
              style={{ position: "relative" }}
              onMouseEnter={openAbout}
              onMouseLeave={closeAbout}
            >
              <Link
                href={item.href}
                style={{
                  fontFamily: "var(--font-support)",
                  fontSize: 15,
                  fontWeight: 700,
                  letterSpacing: "0.12em",
                  textTransform: "lowercase",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color 320ms cubic-bezier(.6,0,.2,1)",
                  color: isScrolledOrInner ? "var(--dust-white)" : item.color,
                  textDecoration: "none",
                  borderBottom: isActive(item.href) ? "2px solid currentColor" : "2px solid transparent",
                  paddingBottom: 2,
                }}
              >
                {item.label}
                <span
                  style={{
                    display: "inline-block",
                    width: 7, height: 7,
                    borderRight: "1px solid currentColor",
                    borderBottom: "1px solid currentColor",
                    transform: aboutOpen ? "rotate(-135deg) translateY(2px)" : "rotate(45deg) translateY(-2px)",
                    transition: "transform 220ms cubic-bezier(.6,0,.2,1)",
                    marginLeft: 2,
                  }}
                />
              </Link>

              {/* About dropdown */}
              <div
                onMouseEnter={openAbout}
                onMouseLeave={closeAbout}
                style={{
                  position: "absolute",
                  top: "calc(100% + 16px)",
                  left: "50%",
                  transform: `translateX(-50%) translateY(${aboutOpen ? 0 : -6}px)`,
                  minWidth: 200,
                  background: "var(--abyssal-black)",
                  border: "1px solid var(--rule-on-dark)",
                  padding: "8px 0",
                  opacity: aboutOpen ? 1 : 0,
                  pointerEvents: aboutOpen ? "all" : "none",
                  transition: "opacity 200ms cubic-bezier(.6,0,.2,1), transform 200ms cubic-bezier(.6,0,.2,1)",
                  zIndex: 99,
                }}
              >
                {item.sub.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    onClick={() => setAboutOpen(false)}
                    style={{
                      display: "block",
                      padding: "10px 20px",
                      fontFamily: "var(--font-support)",
                      fontSize: 11,
                      letterSpacing: "0.14em",
                      textTransform: "lowercase",
                      color: "var(--dust-white)",
                      textDecoration: "none",
                      transition: "color 140ms, background 140ms",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--ember-dawn)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "color-mix(in oklab, var(--ember-dawn) 8%, transparent)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--dust-white)";
                      (e.currentTarget as HTMLAnchorElement).style.background = "transparent";
                    }}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <Link
              key={item.label}
              href={item.href}
              style={{
                fontFamily: "var(--font-support)",
                fontSize: 15,
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "lowercase",
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                transition: "color 320ms cubic-bezier(.6,0,.2,1)",
                color: isScrolledOrInner ? "var(--dust-white)" : item.color,
                textDecoration: "none",
                borderBottom: isActive(item.href) ? "2px solid currentColor" : "2px solid transparent",
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  isScrolledOrInner ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.4)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.color =
                  isScrolledOrInner ? "var(--dust-white)" : (item.color ?? navColor);
              }}
            >
              {item.label}
            </Link>
          )
        )}
      </nav>

      {/* CTA */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <Link
          href="/contact"
          className="btn-rs"
          style={{
            fontSize: 11,
            fontWeight: 700,
            padding: "10px 18px",
            background: isScrolledOrInner ? "rgba(0,0,0,0.4)" : "transparent",
            borderColor: isScrolledOrInner ? "rgba(255,255,255,0.5)" : "var(--burnt-horizon)",
            color: isScrolledOrInner ? "var(--dust-white)" : "var(--burnt-horizon)",
            textDecoration: "none",
            transition: "background 320ms cubic-bezier(.6,0,.2,1), border-color 320ms, color 320ms",
          }}
        >
          <span>request a free proposal</span>{" "}
          <span style={{ opacity: 0.7 }}>→</span>
        </Link>
      </div>
    </header>
  );
}
