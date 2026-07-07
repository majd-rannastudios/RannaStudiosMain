"use client";

export default function WhatsAppCTA() {
  return (
    <a
      href="https://wa.me/966551520499"
      target="_blank"
      rel="noopener noreferrer"
      role="complementary"
      aria-label="Request a proposal via WhatsApp"
      style={{
        position: "fixed",
        right: 24,
        bottom: 24,
        zIndex: 60,
        width: 48,
        height: 48,
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
        overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.25)",
        transition: "transform 280ms cubic-bezier(.6,0,.2,1), box-shadow 280ms",
        cursor: "pointer",
        textDecoration: "none",
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "translateY(-4px) scale(1.08)";
        el.style.boxShadow = "0 16px 48px rgba(227,80,10,0.45)";
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget as HTMLAnchorElement;
        el.style.transform = "none";
        el.style.boxShadow = "0 8px 32px rgba(0,0,0,0.25)";
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/whatsapp-icon.png"
        alt="WhatsApp"
        style={{ width: "100%", height: "100%", objectFit: "cover" }}
      />
    </a>
  );
}
