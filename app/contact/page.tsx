"use client";
import ContactSection from "@/components/sections/ContactSection";
import { MetaLabel } from "@/components/Primitives";

export default function ContactPage() {
  return (
    <main>
      {/* Page hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #1A0870 0%, #080035 55%)",
          padding: "clamp(140px, 18vw, 240px) clamp(20px, 5vw, 88px) clamp(64px, 8vw, 96px)",
          borderBottom: "1px solid var(--rule-on-dark)",
        }}
      >
        <MetaLabel color="var(--burnt-horizon)">get in touch</MetaLabel>
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
          Let&apos;s build something{" "}
          <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>together</em>.
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
          Tell us about your next event, activation, or experience. We&apos;ll come back with a
          tailored direction — not a price list.
        </p>

        {/* Direct contacts */}
        <div
          style={{
            marginTop: 48,
            display: "flex",
            gap: 48,
            borderTop: "1px solid var(--rule-on-dark)",
            paddingTop: 32,
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "var(--font-support)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "lowercase",
                color: "var(--ember-dawn)",
                marginBottom: 8,
              }}
            >
              whatsapp_
            </div>
            <a
              href="https://wa.me/966551520499"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px, 1.4vw, 20px)",
                fontWeight: 500,
                color: "var(--dust-white)",
                textDecoration: "none",
                transition: "color 140ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ember-dawn)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--dust-white)")}
            >
              +966 55 152 0499
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-support)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "lowercase",
                color: "var(--ember-dawn)",
                marginBottom: 8,
              }}
            >
              instagram_
            </div>
            <a
              href="https://instagram.com/rannastudios"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px, 1.4vw, 20px)",
                fontWeight: 500,
                color: "var(--dust-white)",
                textDecoration: "none",
                transition: "color 140ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ember-dawn)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--dust-white)")}
            >
              @rannastudios
            </a>
          </div>

          <div>
            <div
              style={{
                fontFamily: "var(--font-support)",
                fontSize: 10,
                letterSpacing: "0.18em",
                textTransform: "lowercase",
                color: "var(--ember-dawn)",
                marginBottom: 8,
              }}
            >
              linkedin_
            </div>
            <a
              href="https://linkedin.com/company/ranna-studios"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(16px, 1.4vw, 20px)",
                fontWeight: 500,
                color: "var(--dust-white)",
                textDecoration: "none",
                transition: "color 140ms",
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--ember-dawn)")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.color = "var(--dust-white)")}
            >
              ranna-studios
            </a>
          </div>
        </div>
      </section>

      <ContactSection />
    </main>
  );
}
