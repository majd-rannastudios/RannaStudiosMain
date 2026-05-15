"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useIsMobile } from "@/hooks/useIsMobile";

const STUDIOS = [
  { code: "01", name: "Activations", desc: "Fan zones, brand experiences, live entertainment, and crowd activations at scale.", href: "/services#activations", accent: "#E3500A" },
  { code: "02", name: "Creative",    desc: "Concept development, art direction, spatial design, and motion graphics.",          href: "/services#creative",     accent: "#C91B7A" },
  { code: "03", name: "Tech",        desc: "Interactive hardware, AI engagement, live streaming, and digital platforms.",        href: "/services#tech",         accent: "#68097D" },
  { code: "04", name: "Production",  desc: "Logistics, site management, run-of-show, and full event operations.",               href: "/services#production",   accent: "#FB9203" },
];

const NAV_LINKS = [
  { label: "work",    href: "/work",    color: "var(--burnt-horizon)" },
  { label: "news",    href: "/news",    color: "var(--crimson-bloom)" },
  { label: "about",   href: "/about",   color: "var(--veil-becoming)" },
  { label: "contact", href: "/contact", color: "var(--ember-dawn)" },
];

export default function NavSection() {
  const [scrolled, setScrolled]           = useState(false);
  const [megaOpen, setMegaOpen]           = useState(false);
  const [menuOpen, setMenuOpen]           = useState(false);
  const [studiosExpanded, setStudiosExpanded] = useState(false);

  const isMobile       = useIsMobile();
  const megaRef        = useRef<HTMLDivElement>(null);
  const studiosTrigger = useRef<HTMLDivElement>(null);
  const closeMegaTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const pathname        = usePathname();
  const isHomePage      = pathname === "/";
  const isScrolledOrInner = scrolled || !isHomePage;
  const logoFilter      = isScrolledOrInner ? "brightness(0) invert(1)" : "none";

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

  // Close mobile menu on navigation
  useEffect(() => {
    setMenuOpen(false);
    setStudiosExpanded(false);
  }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isMobile]);

  function openMega()  { if (closeMegaTimer.current)  clearTimeout(closeMegaTimer.current);  setMegaOpen(true); }
  function closeMega() { closeMegaTimer.current  = setTimeout(() => setMegaOpen(false), 160); }

  const navTop     = scrolled ? 95 : 132;
  const mobileTop  = scrolled ? 62 : 94;

  const chevron = (open: boolean, size = 8) => ({
    display: "inline-block" as const,
    width: size, height: size,
    borderRight: "1.5px solid currentColor",
    borderBottom: "1.5px solid currentColor",
    transform: open ? `rotate(-135deg) translateY(${size / 4}px)` : `rotate(45deg) translateY(-${size / 4}px)`,
    transition: "transform 220ms cubic-bezier(.6,0,.2,1)",
    flexShrink: 0 as const,
  });

  return (
    <>
    <header
      style={{
        position: "fixed",
        top: 0, left: 0, right: 0,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: scrolled
          ? `12px clamp(20px, 5vw, 88px)`
          : `22px clamp(20px, 5vw, 88px)`,
        zIndex: 100,
        transition: "background 320ms cubic-bezier(.6,0,.2,1), border-color 320ms, padding 320ms cubic-bezier(.6,0,.2,1)",
        borderBottom: "1px solid",
        borderBottomColor: (scrolled || menuOpen) ? "rgba(255,255,255,0.15)" : "transparent",
        background: (scrolled || menuOpen)
          ? "linear-gradient(90deg, rgba(251,146,3,0.92) 0%, rgba(227,80,10,0.9) 30%, rgba(201,27,122,0.88) 65%, rgba(8,0,53,0.94) 100%)"
          : "transparent",
        backdropFilter:       (scrolled || menuOpen) ? "blur(16px)" : undefined,
        WebkitBackdropFilter: (scrolled || menuOpen) ? "blur(16px)" : undefined,
      }}
    >
      {/* ── Logo ─────────────────────────────────────────────── */}
      <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 12, zIndex: 101, position: "relative" }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logo.png"
          alt="Ranna Studios"
          style={{
            height: isMobile ? (scrolled ? 36 : 48) : (scrolled ? 70 : 108),
            width: "auto",
            filter: menuOpen ? "brightness(0) invert(1)" : logoFilter,
            transition: "height 320ms cubic-bezier(.6,0,.2,1), filter 320ms cubic-bezier(.6,0,.2,1)",
          }}
        />
      </Link>

      {/* ── Desktop nav ───────────────────────────────────────── */}
      {!isMobile && (
        <nav style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {/* Studios mega-menu trigger */}
          <div ref={studiosTrigger} style={{ position: "relative" }} onMouseEnter={openMega} onMouseLeave={closeMega}>
            <button
              style={{
                fontFamily: "var(--font-support)", fontSize: 15, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "lowercase",
                display: "inline-flex", alignItems: "center", gap: 6,
                background: "none", border: "none",
                borderBottom: studiosActive ? "2px solid currentColor" : "2px solid transparent",
                cursor: "pointer",
                color: isScrolledOrInner ? "var(--dust-white)" : "var(--ember-dawn)",
                transition: "color 320ms cubic-bezier(.6,0,.2,1)",
                padding: 0, paddingBottom: 2,
              }}
            >
              studios
              <span style={chevron(megaOpen)} />
            </button>

            <div
              ref={megaRef}
              onMouseEnter={openMega}
              onMouseLeave={closeMega}
              style={{
                position: "fixed", top: navTop, left: 0, right: 0,
                background: "var(--abyssal-black)",
                borderTop: "1px solid var(--rule-on-dark)",
                borderBottom: "1px solid var(--rule-on-dark)",
                padding: "clamp(28px, 3vw, 48px) clamp(20px, 5vw, 88px)",
                display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0,
                transition: "opacity 220ms cubic-bezier(.6,0,.2,1), transform 220ms cubic-bezier(.6,0,.2,1)",
                opacity: megaOpen ? 1 : 0,
                transform: megaOpen ? "translateY(0)" : "translateY(-8px)",
                pointerEvents: megaOpen ? "all" : "none",
                zIndex: 99,
              }}
            >
              {STUDIOS.map((s, i) => (
                <Link
                  key={s.code} href={s.href}
                  onClick={() => setMegaOpen(false)}
                  style={{
                    padding: "20px 24px 20px 20px",
                    borderRight: i < 3 ? "1px solid var(--rule-on-dark)" : "none",
                    textDecoration: "none", color: "var(--dust-white)", display: "block",
                    transition: "background 180ms",
                  }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = `color-mix(in oklab, ${s.accent} 14%, transparent)`; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
                >
                  <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", color: s.accent, marginBottom: 8 }}>{s.code}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.015em", marginBottom: 8 }}>{s.name}</div>
                  <div style={{ fontFamily: "var(--font-support)", fontSize: 15, lineHeight: 1.5, color: "var(--fg-muted-on-dark)" }}>{s.desc}</div>
                </Link>
              ))}
            </div>
          </div>

          {/* Plain nav links */}
          {NAV_LINKS.map((item) => (
            <Link
              key={item.label} href={item.href}
              style={{
                fontFamily: "var(--font-support)", fontSize: 15, fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "lowercase",
                display: "inline-flex", alignItems: "center", gap: 6,
                transition: "color 320ms cubic-bezier(.6,0,.2,1)",
                color: isScrolledOrInner ? "var(--dust-white)" : item.color,
                textDecoration: "none",
                borderBottom: isActive(item.href) ? "2px solid currentColor" : "2px solid transparent",
                paddingBottom: 2,
              }}
              onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isScrolledOrInner ? "rgba(255,255,255,0.6)" : "rgba(8,0,53,0.4)"; }}
              onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isScrolledOrInner ? "var(--dust-white)" : (item.color ?? "var(--pitch-black)"); }}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      )}

      {/* ── Desktop CTA ───────────────────────────────────────── */}
      {!isMobile && (
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <Link
            href="/contact"
            className="btn-rs"
            style={{
              fontSize: 11, fontWeight: 700, padding: "10px 18px",
              background: isScrolledOrInner ? "rgba(8,0,53,0.4)" : "transparent",
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
      )}

      {/* ── Mobile hamburger — 3 brand diamonds ─────────────── */}
      {isMobile && (
        <button
          onClick={() => setMenuOpen((o) => !o)}
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          style={{
            background: "transparent", border: "none", cursor: "pointer",
            padding: "8px 4px", zIndex: 101, position: "relative",
            display: "flex", alignItems: "center", justifyContent: "center",
            minWidth: 44, minHeight: 44,
          }}
        >
          {menuOpen ? (
            <span style={{
              fontFamily: "var(--font-display)", fontSize: 20, lineHeight: 1,
              color: "var(--dust-white)", fontWeight: 300,
            }}>✕</span>
          ) : (
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {(["var(--ember-dawn)", "var(--burnt-horizon)", "var(--crimson-bloom)"] as const).map((color, i) => (
                <span key={i} style={{
                  display: "inline-block", width: 9, height: 9,
                  background: color, transform: "rotate(45deg)", flexShrink: 0,
                  transition: "opacity 200ms",
                }} />
              ))}
            </div>
          )}
        </button>
      )}
    </header>

    {/* ── Mobile full-screen dropdown — outside <header> to prevent backdrop-filter containment ── */}
    {isMobile && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0, right: 0, bottom: 0,
            background: "var(--abyssal-black)",
            zIndex: 99,
            overflowY: "auto",
            opacity: menuOpen ? 1 : 0,
            transform: menuOpen ? "translateY(0)" : "translateY(-12px)",
            pointerEvents: menuOpen ? "all" : "none",
            transition: "opacity 300ms cubic-bezier(.6,0,.2,1), transform 300ms cubic-bezier(.6,0,.2,1)",
            display: "flex",
            flexDirection: "column",
            paddingTop: mobileTop + 8,
            paddingLeft: "clamp(20px, 6vw, 48px)",
            paddingRight: "clamp(20px, 6vw, 48px)",
            paddingBottom: 48,
          }}
        >
          {/* Home */}
          <Link
            href="/" onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "20px 0",
              borderBottom: "1px solid var(--rule-on-dark)",
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
              fontWeight: 500, letterSpacing: "-0.025em",
              color: pathname === "/" ? "var(--ember-dawn)" : "var(--dust-white)",
              textDecoration: "none",
            }}
          >
            Home
          </Link>

          {/* Studios accordion */}
          <div style={{ borderBottom: "1px solid var(--rule-on-dark)" }}>
            <button
              onClick={() => setStudiosExpanded((e) => !e)}
              style={{
                display: "flex", width: "100%", justifyContent: "space-between", alignItems: "center",
                background: "transparent", border: "none", padding: "20px 0",
                cursor: "pointer", color: "var(--dust-white)",
                fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
                fontWeight: 500, letterSpacing: "-0.025em",
              }}
            >
              Studios
              <span style={chevron(studiosExpanded, 10)} />
            </button>
            <div style={{
              maxHeight: studiosExpanded ? 400 : 0,
              overflow: "hidden",
              transition: "max-height 320ms cubic-bezier(.6,0,.2,1)",
            }}>
              {STUDIOS.map((s) => (
                <Link
                  key={s.code} href={s.href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    display: "flex", alignItems: "center", gap: 16,
                    padding: "14px 0 14px 12px",
                    borderTop: "1px solid var(--rule-on-dark)",
                    textDecoration: "none", color: "var(--dust-white)",
                  }}
                >
                  <span style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.2em", color: s.accent, flexShrink: 0 }}>{s.code}</span>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 18, fontWeight: 500, letterSpacing: "-0.01em" }}>{s.name}</span>
                  <span style={{ marginLeft: "auto", color: s.accent, fontSize: 16 }}>→</span>
                </Link>
              ))}
              <div style={{ height: 12 }} />
            </div>
          </div>

          {/* Work */}
          <Link
            href="/work" onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "20px 0",
              borderBottom: "1px solid var(--rule-on-dark)",
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
              fontWeight: 500, letterSpacing: "-0.025em",
              color: isActive("/work") ? "var(--ember-dawn)" : "var(--dust-white)",
              textDecoration: "none",
            }}
          >
            Work
          </Link>

          {/* About */}
          <Link
            href="/about" onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "20px 0",
              borderBottom: "1px solid var(--rule-on-dark)",
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
              fontWeight: 500, letterSpacing: "-0.025em",
              color: isActive("/about") ? "var(--ember-dawn)" : "var(--dust-white)",
              textDecoration: "none",
            }}
          >
            About
          </Link>

          {/* News */}
          <Link
            href="/news" onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "20px 0",
              borderBottom: "1px solid var(--rule-on-dark)",
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
              fontWeight: 500, letterSpacing: "-0.025em",
              color: isActive("/news") ? "var(--ember-dawn)" : "var(--dust-white)",
              textDecoration: "none",
            }}
          >
            News
          </Link>

          {/* Contact */}
          <Link
            href="/contact" onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "20px 0",
              borderBottom: "1px solid var(--rule-on-dark)",
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
              fontWeight: 500, letterSpacing: "-0.025em",
              color: isActive("/contact") ? "var(--ember-dawn)" : "var(--dust-white)",
              textDecoration: "none",
            }}
          >
            Contact
          </Link>

          {/* CTA */}
          <div style={{ paddingTop: 36 }}>
            <Link
              href="/contact"
              onClick={() => setMenuOpen(false)}
              className="btn-rs"
              style={{
                display: "flex", justifyContent: "center", textDecoration: "none",
                fontSize: 12, padding: "16px 24px",
              }}
            >
              <span>request a free proposal</span>
              <span style={{ opacity: 0.7, marginLeft: 12 }}>→</span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
