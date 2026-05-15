"use client";
import Link from "next/link";
import { useIsMobile } from "@/hooks/useIsMobile";
import type { Post } from "@/lib/posts";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
}

export default function NewsArticles({ featured, rest }: { featured: Post | undefined; rest: Post[] }) {
  const isMobile = useIsMobile();

  return (
    <>
      {/* Featured post */}
      {featured && (
        <section
          style={{
            background: "var(--dust-white)",
            color: "var(--pitch-black)",
            padding: "clamp(64px, 8vw, 96px) clamp(20px, 5vw, 88px)",
            borderBottom: "1px solid var(--rule-on-light)",
          }}
        >
          <div style={{ marginBottom: 24, fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--fg-muted-on-light)" }}>
            latest post_
          </div>
          <Link href={`/news/${featured.slug}`} style={{ textDecoration: "none", display: "block" }}>
            <article
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr",
                gap: "clamp(28px, 5vw, 72px)",
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
                <div style={{ position: "absolute", top: 20, left: 20, fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.6)", background: "rgba(0,0,0,0.3)", padding: "4px 10px", backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)" }}>
                  {featured.category}
                </div>
                <div style={{ position: "absolute", bottom: 20, right: 20, width: 40, height: 40, background: "rgba(255,255,255,0.15)", border: "1px solid rgba(255,255,255,0.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, color: "var(--dust-white)" }}>
                  ↗
                </div>
              </div>

              {/* Copy */}
              <div>
                <div style={{ fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.14em", color: "var(--fg-muted-on-light)", marginBottom: 16, display: "flex", gap: 16, alignItems: "center" }}>
                  <span>{formatDate(featured.date)}</span>
                  <span style={{ opacity: 0.4 }}>·</span>
                  <span>{featured.readTime} min read</span>
                </div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(22px, 2.8vw, 40px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--pitch-black)", margin: "0 0 20px" }}>
                  {featured.title}
                </h2>
                <p style={{ fontFamily: "var(--font-support)", fontSize: "clamp(13px, 1vw, 15px)", lineHeight: 1.65, color: "var(--fg-muted-on-light)", margin: 0 }}>
                  {featured.excerpt}
                </p>
                <div style={{ marginTop: 28, fontFamily: "var(--font-support)", fontSize: 11, letterSpacing: "0.16em", textTransform: "lowercase", color: featured.accentColor, display: "flex", alignItems: "center", gap: 8 }}>
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
            <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.18em", textTransform: "lowercase", color: "var(--burnt-horizon)", marginBottom: "clamp(28px, 3.5vw, 48px)" }}>
              all posts_
            </div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: isMobile ? "1fr" : "repeat(3, 1fr)",
                gap: isMobile ? "clamp(40px, 8vw, 56px)" : "clamp(20px, 2.5vw, 36px)",
              }}
            >
              {rest.map((post) => (
                <Link key={post.slug} href={`/news/${post.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <article>
                    {/* Cover tile — always on top */}
                    <div
                      style={{
                        aspectRatio: isMobile ? "16 / 9" : "3 / 2",
                        background: `linear-gradient(135deg, ${post.accentColor} 0%, color-mix(in oklab, ${post.accentColor} 35%, #080035) 100%)`,
                        marginBottom: 20,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <div style={{ position: "absolute", top: 14, left: 14, fontFamily: "var(--font-support)", fontSize: 9, letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.65)", background: "rgba(0,0,0,0.28)", padding: "3px 8px" }}>
                        {post.category}
                      </div>
                    </div>

                    {/* Meta */}
                    <div style={{ fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.14em", color: "var(--fg-muted-on-light)", marginBottom: 10, display: "flex", gap: 12, alignItems: "center" }}>
                      <span>{formatDate(post.date)}</span>
                      <span style={{ opacity: 0.4 }}>·</span>
                      <span>{post.readTime} min</span>
                    </div>

                    {/* Title */}
                    <h3 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(16px, 1.6vw, 22px)", fontWeight: 600, letterSpacing: "-0.02em", lineHeight: 1.2, color: "var(--pitch-black)", margin: "0 0 10px" }}>
                      {post.title}
                    </h3>

                    {/* Excerpt */}
                    <p style={{ fontFamily: "var(--font-support)", fontSize: "clamp(12px, 0.9vw, 13px)", lineHeight: 1.6, color: "var(--fg-muted-on-light)", margin: 0, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" } as React.CSSProperties}>
                      {post.excerpt}
                    </p>

                    {/* Read link */}
                    <div style={{ marginTop: 16, fontFamily: "var(--font-support)", fontSize: 10, letterSpacing: "0.16em", textTransform: "lowercase", color: post.accentColor, display: "flex", alignItems: "center", gap: 6 }}>
                      read <span style={{ fontSize: 12 }}>→</span>
                    </div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </section>
    </>
  );
}
