import { notFound } from "next/navigation";
import Link from "next/link";
import { getAllPosts, getPost, formatDate } from "@/lib/posts";
import { MetaLabel } from "@/components/Primitives";
import type { Metadata } from "next";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Ranna Studios`,
    description: post.excerpt,
    alternates: { canonical: `/news/${slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: `https://rannastudios.com/news/${slug}`,
      type: "article",
      publishedTime: post.date,
    },
  };
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === slug);
  const nextPost = allPosts[currentIndex + 1] ?? null;

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    author: { "@type": "Organization", name: "Ranna Studios" },
    publisher: {
      "@type": "Organization",
      name: "Ranna Studios",
      logo: { "@type": "ImageObject", url: "https://rannastudios.com/logo.png" },
    },
  };

  return (
    <main>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Hero */}
      <section
        style={{
          background: "var(--pitch-black)",
          padding:
            "clamp(140px, 18vw, 240px) clamp(20px, 5vw, 88px) clamp(48px, 6vw, 72px)",
          borderBottom: "1px solid var(--rule-on-dark)",
        }}
      >
        {/* Back link */}
        <Link
          href="/news"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-support)",
            fontSize: 11,
            letterSpacing: "0.14em",
            textTransform: "lowercase",
            color: "var(--fg-muted-on-dark)",
            textDecoration: "none",
            marginBottom: 36,
          }}
        >
          <span style={{ fontSize: 14 }}>←</span> all posts
        </Link>

        <MetaLabel color={post.accentColor}>{post.category}</MetaLabel>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(32px, 5vw, 80px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            lineHeight: 1.0,
            color: "var(--dust-white)",
            margin: "20px 0 0",
            maxWidth: "22ch",
          }}
        >
          {post.title}
        </h1>

        <div
          style={{
            marginTop: 32,
            display: "flex",
            gap: 20,
            alignItems: "center",
            fontFamily: "var(--font-support)",
            fontSize: 11,
            letterSpacing: "0.12em",
            color: "var(--fg-muted-on-dark)",
          }}
        >
          <span>{formatDate(post.date)}</span>
          <span style={{ opacity: 0.35 }}>·</span>
          <span>{post.readTime} min read</span>
        </div>
      </section>

      {/* Cover bar */}
      <div
        style={{
          height: "clamp(6px, 0.6vw, 10px)",
          background: `linear-gradient(90deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 70%, var(--veil-becoming) 100%)`,
        }}
      />

      {/* Body */}
      <section
        style={{
          background: "var(--dust-white)",
          color: "var(--pitch-black)",
          padding:
            "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 88px)",
          display: "grid",
          gridTemplateColumns: "1fr minmax(0, 720px) 1fr",
        }}
      >
        <div /> {/* left gutter */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-support)",
              fontSize: "clamp(15px, 1.1vw, 17px)",
              lineHeight: 1.7,
              color: "var(--fg-muted-on-light)",
              marginBottom: 40,
              fontWeight: 400,
            }}
          >
            {post.excerpt}
          </p>

          <div
            className="post-body"
            dangerouslySetInnerHTML={{ __html: post.body }}
          />
        </div>
        <div /> {/* right gutter */}
      </section>

      {/* Next post */}
      {nextPost && (
        <section
          style={{
            background: "var(--pitch-black)",
            padding:
              "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 88px)",
            borderTop: "1px solid var(--rule-on-dark)",
          }}
        >
          <div style={{ marginBottom: 24 }}>
            <MetaLabel color="var(--fg-muted-on-dark)">next post</MetaLabel>
          </div>
          <Link
            href={`/news/${nextPost.slug}`}
            style={{ textDecoration: "none", display: "block" }}
          >
            <h2
              style={{
                fontFamily: "var(--font-display)",
                fontSize: "clamp(22px, 3vw, 52px)",
                fontWeight: 700,
                letterSpacing: "-0.035em",
                lineHeight: 1.05,
                color: "var(--dust-white)",
                margin: "0 0 16px",
                maxWidth: "26ch",
              }}
            >
              {nextPost.title}{" "}
              <span style={{ color: "var(--burnt-horizon)" }}>↗</span>
            </h2>
            <p
              style={{
                fontFamily: "var(--font-support)",
                fontSize: "clamp(13px, 1vw, 15px)",
                lineHeight: 1.6,
                color: "var(--fg-muted-on-dark)",
                maxWidth: "60ch",
              }}
            >
              {nextPost.excerpt}
            </p>
          </Link>
        </section>
      )}

      {/* CTA */}
      <section
        style={{
          background: "var(--dust-white)",
          color: "var(--pitch-black)",
          padding:
            "clamp(56px, 7vw, 96px) clamp(20px, 5vw, 88px)",
          borderTop: "1px solid var(--rule-on-light)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          gap: 24,
        }}
      >
        <MetaLabel color="var(--burnt-horizon)">work with us</MetaLabel>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(28px, 4vw, 64px)",
            fontWeight: 700,
            letterSpacing: "-0.035em",
            lineHeight: 1.0,
            color: "var(--pitch-black)",
            margin: 0,
          }}
        >
          Ready to build something the{" "}
          <em
            style={{
              fontStyle: "normal",
              background:
                "linear-gradient(90deg, var(--ember-dawn) 0%, var(--burnt-horizon) 35%, var(--crimson-bloom) 70%, var(--veil-becoming) 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            world will remember?
          </em>
        </h2>
        <Link href="/contact" className="btn-rs solid" style={{ textDecoration: "none", marginTop: 8 }}>
          <span>request a free proposal</span>
          <span style={{ opacity: 0.7 }}>→</span>
        </Link>
      </section>
    </main>
  );
}
