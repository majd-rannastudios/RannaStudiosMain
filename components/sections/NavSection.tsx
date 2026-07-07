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
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const isMobile = useIsMobile();

  const pathname        = usePathname();
  const isHomePage      = pathname === "/";
  const isScrolledOrInner = scrolled || !isHomePage;

  function isActive(href: string) {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(href + "/") || pathname.startsWith(href + "#");
  }
  const studiosActive = pathname === "/services" || pathname.startsWith("/services");

  useEffect(() => {
    const updateHeader = () => {
      setScrolled(window.scrollY > 40);
      const h = document.querySelector("header")?.getBoundingClientRect().height ?? 0;
      if (h > 0) document.documentElement.style.setProperty("--header-h", `${h}px`);
    };
    window.addEventListener("scroll", updateHeader, { passive: true });
    updateHeader();
    return () => window.removeEventListener("scroll", updateHeader);
  }, []);

  // Close mobile menu on navigation
  useEffect(() => { setMenuOpen(false); }, [pathname]);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = (isMobile && menuOpen) ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen, isMobile]);

  // Focus trap + Escape-to-close for the mobile dropdown
  useEffect(() => {
    if (!menuOpen) return;

    const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button, [tabindex]:not([tabindex="-1"])'
    );
    focusables?.[0]?.focus();

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMenuOpen(false);
        triggerRef.current?.focus();
        return;
      }
      if (e.key === "Tab" && focusables && focusables.length > 0) {
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const mobileTop = scrolled ? 62 : 94;

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
        <div
          role="img"
          aria-label="Ranna Studios"
          style={{
            height: isMobile ? (scrolled ? 32 : 42) : (scrolled ? 56 : 80),
            aspectRatio: "3934 / 1084",
            flexShrink: 0,
            WebkitMaskImage: "url('/logo-nav.png')",
            WebkitMaskRepeat: "no-repeat",
            WebkitMaskSize: "contain",
            WebkitMaskPosition: "center left",
            maskImage: "url('/logo-nav.png')",
            maskRepeat: "no-repeat",
            maskSize: "contain",
            maskPosition: "center left",
            background: (menuOpen || isScrolledOrInner) ? "var(--dust-white)" : "var(--pitch-black)",
            transition: "height 320ms cubic-bezier(.6,0,.2,1), background 320ms cubic-bezier(.6,0,.2,1)",
          }}
        />
      </Link>

      {/* ── Desktop nav — always rendered; CSS (not isMobile) controls visibility
           so the SSR payload is correct before hydration. See .nav-desktop-links
           / .nav-mobile-trigger rules in globals.css. ── */}
      <nav className="nav-desktop-links" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {/* Studios — plain link */}
          <Link
            href="/services"
            style={{
              fontFamily: "var(--font-support)", fontSize: 15, fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "lowercase",
              display: "inline-flex", alignItems: "center",
              transition: "color 320ms cubic-bezier(.6,0,.2,1)",
              color: isScrolledOrInner ? "var(--dust-white)" : "var(--ember-dawn)",
              textDecoration: "none",
              borderBottom: studiosActive ? "2px solid currentColor" : "2px solid transparent",
              paddingBottom: 2,
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isScrolledOrInner ? "rgba(255,255,255,0.6)" : "rgba(8,0,53,0.4)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLAnchorElement).style.color = isScrolledOrInner ? "var(--dust-white)" : "var(--ember-dawn)"; }}
          >
            studios
          </Link>

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


      {/* ── Mobile hamburger — 3 brand diamonds — always rendered; CSS hides it
           at >=768px so the SSR payload always includes a mobile-safe trigger. ── */}
      <button
        ref={triggerRef}
        className="nav-mobile-trigger"
        onClick={() => setMenuOpen((o) => !o)}
        aria-label={menuOpen ? "Close menu" : "Open menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-nav-panel"
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
    </header>

    {/* ── Mobile full-screen dropdown — outside <header> to prevent backdrop-filter containment ── */}
    {isMobile && (
        <div
          ref={panelRef}
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
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
            home
          </Link>

          {/* Studios — plain link */}
          <Link
            href="/services" onClick={() => setMenuOpen(false)}
            style={{
              display: "block", padding: "20px 0",
              borderBottom: "1px solid var(--rule-on-dark)",
              fontFamily: "var(--font-display)", fontSize: "clamp(26px, 7vw, 36px)",
              fontWeight: 500, letterSpacing: "-0.025em",
              color: studiosActive ? "var(--ember-dawn)" : "var(--dust-white)",
              textDecoration: "none",
            }}
          >
            studios
          </Link>

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
            work
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
            about
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
            news
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
            contact
          </Link>

        </div>
      )}
    </>
  );
}
