"use client";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { MetaLabel, Reveal } from "@/components/Primitives";
import { useIsMobile } from "@/hooks/useIsMobile";

type Member = {
  slug: string;
  role: string;
  name: string;
  note?: string;
};

/* Each column carries the next brand accent, matching the order the cut-outs
   were art-directed in — the coloured shape is already baked into the PNG, so
   the label colour here has to stay in step with the artwork behind it. */
const ACCENTS = [
  "var(--ember-dawn)",
  "var(--burnt-horizon)",
  "var(--crimson-bloom)",
  "var(--veil-becoming)",
  "var(--ranna-indigo)",
];

const LEADERSHIP: Member[] = [
  { slug: "majd-farah",        role: "CEO",                 name: "Majd Farah",        note: "Co-Founder" },
  { slug: "rana-moussallem",   role: "Head of Creative",    name: "Rana Moussallem",   note: "Co-Founder" },
  { slug: "valerie-al-bouery", role: "Head of Activations", name: "Valerie Al Bouery" },
  { slug: "theo-rahme",        role: "Head of Tech",        name: "Theo Rahme" },
  { slug: "naja-al-rechmani",  role: "Head of Production",  name: "Naja Al Rechmani" },
];

const CREW: Member[] = [
  { slug: "saad-assiri",        role: "Logistics Manager",  name: "Saad Assiri" },
  { slug: "walid-khoury",       role: "Producer",           name: "Walid Khoury" },
  { slug: "yara-el-joubeili",   role: "Designer",           name: "Yara El Joubeili" },
  { slug: "savannah-al-khoury", role: "Project Supervisor", name: "Savannah Al Khoury" },
  { slug: "sultan-haladu",      role: "Project Supervisor", name: "Sultan Haladu" },
];

/* Intrinsic size of every cut-out in /public/team — all ten share one crop, so
   the figures land on a single baseline at identical scale across a row. */
const FIG_W = 800;
const FIG_H = 1852;

function MemberCard({
  m,
  accent,
  isMobile,
}: {
  m: Member;
  accent: string;
  isMobile: boolean;
}) {
  return (
    <div
      className="team-card"
      style={{
        display: "flex",
        flexDirection: "column",
        minWidth: 0,
        /* Longhands, not the `flex` shorthand: React's style diffing applied
           only flex-basis from the shorthand, leaving shrink at 1 — which let
           all five cards squeeze into view instead of overflowing to scroll. */
        ...(isMobile
          ? {
              flexGrow: 0,
              flexShrink: 0,
              flexBasis: "62vw",
              scrollSnapAlign: "center",
            }
          : {}),
      }}
    >
      <div style={{ padding: "0 clamp(4px, 0.9vw, 16px)" }}>
        <Image
          className="team-fig"
          src={`/team/${m.slug}.png`}
          alt={`${m.name}, ${m.role} at Ranna Studios`}
          width={FIG_W}
          height={FIG_H}
          /* Static on purpose: the browser resolves `sizes` at paint time, so
             it must not wait on useIsMobile() to settle after hydration. */
          sizes="(max-width: 767px) 62vw, 20vw"
          style={{ width: "100%", height: "auto", display: "block" }}
        />
      </div>

      {/* Floor: zero column gap means these strips join into one continuous
          rule + band under the whole row, the way the figures stand on a
          shared floor line in the portfolio deck. */}
      <div
        style={{
          flex: 1,
          borderTop: "1px solid var(--rule-on-light)",
          background: "linear-gradient(180deg, rgba(8,0,53,0.035), rgba(8,0,53,0))",
          padding:
            "clamp(14px, 1.6vw, 22px) clamp(6px, 1vw, 16px) clamp(18px, 2.2vw, 30px)",
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-display)",
            fontWeight: 700,
            fontSize: "clamp(16px, 1.7vw, 26px)",
            letterSpacing: "-0.025em",
            lineHeight: 1.04,
            color: accent,
          }}
        >
          {m.role}
        </div>
        <div
          style={{
            fontFamily: "var(--font-support)",
            fontSize: "clamp(12px, 0.95vw, 15px)",
            lineHeight: 1.4,
            color: accent,
            opacity: 0.85,
          }}
        >
          {m.note && <span style={{ display: "block" }}>{m.note}</span>}
          {m.name}
        </div>
      </div>
    </div>
  );
}

function MemberRow({
  members,
  label,
  isMobile,
}: {
  members: Member[];
  label: string;
  isMobile: boolean;
}) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el || !isMobile) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const cards = Array.from(el.children) as HTMLElement[];
        const centre = el.scrollLeft + el.clientWidth / 2;
        let best = 0;
        let bestD = Infinity;
        cards.forEach((c, i) => {
          const d = Math.abs(c.offsetLeft + c.offsetWidth / 2 - centre);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        setIdx(best);
      });
    };

    el.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      el.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [isMobile]);

  const goTo = useCallback((i: number) => {
    const el = scrollerRef.current;
    const card = el?.children[i] as HTMLElement | undefined;
    if (!el || !card) return;
    el.scrollTo({
      left: card.offsetLeft - (el.clientWidth - card.offsetWidth) / 2,
      behavior: "smooth",
    });
  }, []);

  return (
    <div style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
      <Reveal>
        <MetaLabel color="var(--fg-muted-on-light)">{label}</MetaLabel>
      </Reveal>

      <div
        ref={scrollerRef}
        className={isMobile ? "team-scroller" : undefined}
        tabIndex={isMobile ? 0 : undefined}
        role={isMobile ? "region" : undefined}
        aria-label={isMobile ? `${label} (scrollable)` : undefined}
        style={{
          marginTop: "clamp(12px, 1.6vw, 20px)",
          ...(isMobile
            ? {
                display: "flex",
                overflowX: "auto",
                scrollSnapType: "x mandatory",
                WebkitOverflowScrolling: "touch",
                scrollbarWidth: "none",
                gap: 0,
              }
            : {
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: 0,
              }),
        }}
      >
        {members.map((m, i) => (
          <MemberCard
            key={m.slug}
            m={m}
            accent={ACCENTS[i % ACCENTS.length]}
            isMobile={isMobile}
          />
        ))}
      </div>

      {isMobile && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginTop: 18,
          }}
        >
          {members.map((m, i) => (
            <button
              key={m.slug}
              onClick={() => goTo(i)}
              aria-label={`Show ${m.name}`}
              aria-current={i === idx || undefined}
              style={{
                width: 6,
                height: 6,
                padding: 0,
                border: 0,
                cursor: "pointer",
                flexShrink: 0,
                transform: "rotate(45deg)",
                transition: "background 200ms",
                background:
                  i === idx ? ACCENTS[i % ACCENTS.length] : "rgba(8,0,53,0.2)",
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default function TeamSection() {
  const isMobile = useIsMobile();

  return (
    <section
      id="team"
      style={{
        background: "var(--dust-white)",
        color: "var(--pitch-black)",
        padding: "clamp(80px, 10vw, 144px) clamp(20px, 5vw, 88px)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Graph-paper backdrop, fading out before the floor line — the grid the
          team slides in the portfolio deck are set on. */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(to right, rgba(8,0,53,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(8,0,53,0.05) 1px, transparent 1px), radial-gradient(circle, rgba(8,0,53,0.14) 1.1px, transparent 1.1px)",
          backgroundSize: "56px 100%, 100% 56px, 56px 56px",
          maskImage: "linear-gradient(180deg, #000 55%, transparent 92%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 55%, transparent 92%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative" }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
            gap: "clamp(24px, 4vw, 80px)",
            alignItems: "end",
          }}
        >
          <Reveal>
            <MetaLabel color="var(--burnt-horizon)">the team</MetaLabel>
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(36px, 5.4vw, 88px)",
                fontWeight: 500,
                letterSpacing: "-0.035em",
                lineHeight: 1.0,
                margin: "16px 0 0",
                maxWidth: "14ch",
              }}
            >
              The people behind the{" "}
              <em style={{ fontStyle: "normal", color: "var(--burnt-horizon)" }}>work</em>.
            </h2>
          </Reveal>
          <Reveal
            as="p"
            delay={120}
            style={{
              fontSize: "clamp(15px, 1.1vw, 17px)",
              lineHeight: 1.55,
              maxWidth: "42ch",
              color: "var(--fg-muted-on-light)",
            }}
          >
            A senior, hands-on team. Studio leads are involved on the ground —
            decisions made in the room are decisions made on the floor.
          </Reveal>
        </div>

        <MemberRow members={LEADERSHIP} label="leadership" isMobile={isMobile} />
        <MemberRow members={CREW} label="the crew" isMobile={isMobile} />
      </div>
    </section>
  );
}
