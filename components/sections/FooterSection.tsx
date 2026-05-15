"use client";
import { Lz } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

export default function FooterSection() {
  const isMobile = useIsMobile();
  return (
    <footer
      id="contact"
      style={{
        background: "linear-gradient(170deg, var(--ember-dawn) 0%, var(--burnt-horizon) 22%, var(--crimson-bloom) 48%, var(--veil-becoming) 72%, var(--abyssal-black) 100%)",
        borderTop: "none",
        padding: "clamp(48px, 6vw, 80px) clamp(20px, 5vw, 88px) 32px",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr 1fr" : "1.4fr 1fr 1fr 1fr",
          gap: "clamp(24px, 3vw, 64px)",
          paddingBottom: 56,
          borderBottom: "1px solid rgba(255,255,255,0.2)",
        }}
      >
        {/* Brand column */}
        <div style={isMobile ? { gridColumn: "1 / -1" } : undefined}>
          <img
            src="/logo.png"
            alt="Ranna Studios"
            style={{ height: 56, width: "auto", filter: "brightness(0) invert(1)", marginBottom: 24, display: "block" }}
          />
          <p style={{ fontSize: 16, lineHeight: 1.5, color: "var(--dust-white)", margin: "0 0 24px", maxWidth: "36ch" }}>
            A multidisciplinary studio network — designing, building, and operating the region&apos;s
            most ambitious experiences.
          </p>
        </div>

        {/* Nav column */}
        <FooterCol title="navigate" links={[
          { label: "studios", href: "/services" },
          { label: "selected work", href: "/work" },
          { label: "about", href: "/about" },
          { label: "regional", href: "/#regional" },
          { label: "contact", href: "/contact" },
        ]} />

        {/* Regional column */}
        <FooterCol title="regional" links={[
          { label: "saudi arabia", href: "/#regional" },
          { label: "united arab emirates", href: "/#regional" },
          { label: "qatar", href: "/#regional" },
          { label: "lebanon", href: "/#regional" },
        ]} />

        {/* Contact column */}
        <FooterCol title="contact" links={[
          { label: "+966 55 152 0499", href: "https://wa.me/966551520499" },
          { label: "@rannastudios", href: "https://instagram.com/rannastudios" },
          { label: "linkedin →", href: "https://linkedin.com/company/ranna-studios" },
          { label: "request a proposal →", href: "/contact" },
        ]} />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr 1fr",
          gap: 16,
          paddingTop: 24,
          fontFamily: "var(--font-support)",
          fontSize: 11,
          letterSpacing: "0.1em",
          textTransform: "lowercase",
          color: "var(--dust-white)",
          alignItems: "center",
        }}
      >
        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
          <Lz color="var(--dust-white)" />
          &nbsp; © 2026 ranna studios — riyadh · dubai · beirut
        </span>
        <span style={{ textAlign: "center", display: "inline-flex", justifyContent: "center", alignItems: "center", gap: 10 }}>
          experiences people remember
        </span>
        <span style={{ textAlign: "right", display: "inline-flex", justifyContent: "flex-end", alignItems: "center", gap: 10 }}>
          <Lz color="var(--dust-white)" />
        </span>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h4
        style={{
          fontFamily: "var(--font-support)",
          fontSize: 11,
          letterSpacing: "0.18em",
          textTransform: "lowercase",
          color: "var(--dusk-matter)",
          margin: "0 0 18px",
        }}
      >
        {title}
      </h4>
      <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 14,
                lineHeight: 1.4,
                color: "var(--dust-white)",
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                transition: "color 140ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ember-dawn)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--dust-white)")}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
