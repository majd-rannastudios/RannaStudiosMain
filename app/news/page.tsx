import Link from "next/link";
import { getAllPosts, formatDate } from "@/lib/posts";
import { MetaLabel } from "@/components/Primitives";
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

      {/* Featured post */}
      {featured && (
        <section
          style={{
            background: "var(--dust-white)",
            color: "var(--pitch-black)",
            padding:
              "clamp(64px, 8vw, 96px) clamp(20px, 5vw, 88px)",
            borderBottom: "1px solid var(--rule-on-light)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <MetaLabel color="var(--fg-muted-on-light)">latest post</MetaLabel>
          </div>
          <Link
            href={`/news/${featured.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <article
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "clamp(32px, 5vw, 72px)",
                alignItems: "center",
              }}
            >
              {/* Cover */}
              <div
                style={{
                  aspectRatio: "16 / 9",
                  background: `linear-gradient(135deg, ${featured.accentColor} 0%, color-mix(in oklab, ${featured.accentColor} 40%, #080035) 100%)`,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    top: 20,
                    left: 20,
                    fontFamily: "var(--font-support)",
                    fontSize: 10,
                    letterSpacing: "0.18em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.6)",
                    background: "rgba(0,0,0,0.3)",
                    padding: "4px 10px",
                    backdropFilter: "blur(8px)",
                    WebkitBackdropFilter: "blur(8px)",
                  }}
                >
                  {featured.category}
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 20,
                    right: 20,
                    width: 40,
                    height: 40,
                    background: "rgba(255,255,255,0.15)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    color: "var(--dust-white)",
                  }}
                >
                  ↗
                </div>
              </div>

              {/* Copy */}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-support)",
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    color: "var(--fg-muted-on-light)",
                    marginBottom: 16,
                    display: "flex",
                    gap: 16,
                    alignItems: "center",
                  }}
                >
                  <span>{formatDate(featured.date)}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <h2
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(22px, 2.8vw, 40px)",
                    fontWeight: 700,
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                    color: "var(--pitch-black)",
                    margin: "0 0 20px",
                  }}
                >
                  {featured.title}
                </h2>
                <p
                  style={{
                    fontFamily: "var(--font-support)",
                    fontSize: "clamp(13px, 1vw, 15px)",
                    lineHeight: 1.65,
                    color: "var(--fg-muted-on-light)",
                    margin: 0,
                  }}
                >
                  {featured.excerpt}
                </p>
                <div
                  style={{
                    marginTop: 28,
                    fontFamily: "var(--font-support)",
                    fontSize: 11,
                    letterSpacing: "0.16em",
                    textTransform: "lowercase",
                    color: featured.accentColor,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  read article <span style={{ fontSize: 14 }}>→</span>
                </div>
              </div>
            </article>
          </Link>
        </section>
      )}

      {/* Posts grid */}
      <section
        style={{
          background: "var(--dust-white)",
          color: "var(--pitch-black)",
          padding: "clamp(56px, 7vw, 88px) clamp(20px, 5vw, 88px) clamp(80px, 10vw, 128px)",
        }}
      >
        {rest.length > 0 && (
          <>
            <MetaLabel color="var(--burnt-horizon)">all posts</MetaLabel>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "clamp(20px, 2.5vw, 36px)",
                marginTop: "clamp(28px, 3.5vw, 48px)",
              }}
            >
              {rest.map((post) => (
                <Link
                  key={post.slug}
                  href={`/news/${post.slug}`}
                  style={{ textDecoration: "none", display: "block" }}
                >
                  <article>
                    {/* Cover tile */}
                    <div
                      style={{
                        aspectRatio: "3 / 2",
                        background: `linear-gradient(135deg, ${post.accentColor} 0%, color-mix(in oklab, ${post.accentColor} 35%, #080035) 100%)`,
                        marginBottom: 20,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 14,
                          left: 14,
                          fontFamily: "var(--font-support)",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.65)",
                          background: "rgba(0,0,0,0.28)",
                          padding: "3px 8px",
                        }}
                      >
                        {post.category}
                      </div>
                    </div>

                    {/* Meta */}
                    <div
                      style={{
                        fontFamily: "var(--font-support)",
                        fontSize: 10,
                        letterSpacing: "0.14em",
                        color: "var(--fg-muted-on-light)",
                        marginBottom: 10,
                        display: "flex",
                        gap: 12,
                        alignItems: "center",
                      }}
                    >
                      <span>{formatDate(post.date)}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{post.readTime} min</span>
                    </div>

                    {/* Title */}
                    <h3
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "clamp(16px, 1.6vw, 22px)",
                        fontWeight: 600,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.2,
                        color: "var(--pitch-black)",
                        margin: "0 0 10px",
                      }}
                    >
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p
                      style={{
                        fontFamily: "var(--font-support)",
                        fontSize: "clamp(12px, 0.9vw, 13px)",
                        lineHeight: 1.6,
                        color: "var(--fg-muted-on-light)",
                        margin: 0,
                        display: "-webkit-box",
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      } as React.CSSProperties}
                    >
                      {post.excerpt}
                    </p>

                    {/* Read link */}
                    <div
                      style={{
                        marginTop: 16,
                        fontFamily: "var(--font-support)",
                        fontSize: 10,
                        letterSpacing: "0.16em",
                        textTransform: "lowercase",
                        color: post.accentColor,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                      }}
                    >
                      read <span style={{ fontSize: 12 }}>→</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </main>
  );
}
