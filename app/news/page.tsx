import { getAllPosts } from "@/lib/posts";
import { MetaLabel } from "@/components/Primitives";
import NewsArticles from "@/components/sections/NewsArticles";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "News & Insights — Ranna Studios",
  description:
    "Case studies, opinions, and craft notes from the studios behind the GCC's most ambitious live experiences.",
  alternates: { canonical: "/news" },
  openGraph: {
    title: "News & Insights — Ranna Studios",
    description:
      "Case studies, opinions, and craft notes from the studios behind the GCC's most ambitious live experiences.",
    url: "https://rannastudios.com/news",
  },
};

const CATEGORY_COLORS: Record<string, string> = {
  "Case Study": "var(--burnt-horizon)",
  "Insight": "var(--crimson-bloom)",
  "Opinion": "var(--veil-becoming)",
  "Craft": "var(--ember-dawn)",
};

export default function NewsPage() {
  const posts = getAllPosts();
  const [featured, ...rest] = posts;

  return (
    <main>
      {/* Page hero */}
      <section
        style={{
          background: "linear-gradient(160deg, #1A0870 0%, #080035 55%)",
          padding:
            "clamp(140px, 18vw, 240px) clamp(20px, 5vw, 88px) clamp(64px, 8vw, 96px)",
          borderBottom: "1px solid var(--rule-on-dark)",
        }}
      >
        <MetaLabel color="var(--burnt-horizon)">news & insights</MetaLabel>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(48px, 8vw, 128px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 0.94,
            color: "var(--dust-white)",
            margin: "20px 0 0",
            maxWidth: "18ch",
          }}
        >
          Ideas from{" "}
          <em
            style={{
              fontStyle: "normal",
              fontWeight: 300,
              color: "rgba(255,255,255,0.4)",
            }}
          >
            the studios.
          </em>
        </h1>
        <p
          style={{
            marginTop: 32,
            fontSize: "clamp(15px, 1.2vw, 18px)",
            lineHeight: 1.55,
            maxWidth: "52ch",
            color: "var(--fg-muted-on-dark)",
          }}
        >
          Case studies, industry insights, and craft notes from the teams
          behind the GCC&apos;s most ambitious live experiences.
        </p>
      </section>

      <NewsArticles featured={featured} rest={rest} />
    </main>
  );
}
