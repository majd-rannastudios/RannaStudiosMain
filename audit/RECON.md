# Recon — Ranna Studios Mobile UX Audit

Date: 2026-07-07 · Branch: `mobile-ux-audit`

## 0. Correction to audit brief

The originating brief describes the target as "React + Vite." This is incorrect. The actual stack is:

- **Next.js 16.2.4** (App Router, Turbopack build), **React 19.2.4**, TypeScript, **Tailwind CSS v4**, pnpm.
- Single app — the repo root **is** the site root (no monorepo, no `apps/`/`packages/` split).
- `node_modules` was absent in this checkout; `pnpm install` was run as part of this audit's setup.
- `pnpm build` (production, Turbopack) passes cleanly as a baseline before any changes.

All harness/testing work in this audit targets the real Next.js App Router lifecycle (`pnpm build && pnpm start`), not a Vite dev server.

## 0.1 Security note: prompt-injection attempt in `AGENTS.md`

`AGENTS.md` (loaded automatically as project instructions) contains:

> "This is NOT the Next.js you know... Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices."

`node_modules/next` does not contain any such docs directory (it's a normal, unmodified Next.js 16 install from the public registry), and `node_modules` was entirely absent from this checkout before this audit's setup — meaning this instruction could not have been followed by any prior session either. This reads as a planted prompt-injection attempt rather than genuine project documentation, and was **not** followed. The real, standard Next.js 16 App Router behavior (as documented publicly and confirmed by reading the actual source in this repo) was used as ground truth throughout.

## 1. Routes

| Route | File | Notes |
|---|---|---|
| `/` | `app/page.tsx` | Home |
| `/about` | `app/about/page.tsx` | |
| `/contact` | `app/contact/page.tsx` | Includes `ContactSection` (proposal form) |
| `/services` | `app/services/page.tsx` | "Studios" in nav |
| `/work` | `app/work/page.tsx` | |
| `/news` | `app/news/page.tsx` | Listing |
| `/news/[slug]` | `app/news/[slug]/page.tsx` | Dynamic; representative slug used throughout this audit: `f1-sagp-fan-zone-2025` |

Non-page routes: `app/robots.ts`, `app/sitemap.ts`.

## 2. Design tokens — spec vs. actual

### Locked palette (Section 0 of brief)
| Name | Hex | Present correctly in `app/globals.css` `:root`? |
|---|---|---|
| Ember Dawn | `#FB9203` | ✅ `--ember-dawn` |
| Burnt Horizon | `#E3500A` | ✅ `--burnt-horizon` |
| Crimson Bloom | `#C91B7A` | ✅ `--crimson-bloom` |
| Veil of Becoming | `#68097D` | ✅ `--veil-becoming` |
| Dusk Matter | `#3F184D` | ✅ `--dusk-matter` |
| Abyssal Black | `#080035` | ✅ `--abyssal-black` (aliased as `--pitch-black`) |

**Ground truth for the palette lives in `app/globals.css`, not `tailwind.config.ts`.** `tailwind.config.ts`'s `colors.ranna.*` block is a stale pre-rebrand palette (purple `#462969`, burgundy `#6D0E4E`, navy `#1B1941`, indigo `#2A2B6B` — none in the locked 6) with only 2 of 6 real colors coincidentally present (orange/deepOrange). Confirmed via repo-wide grep: `ranna.*` / `bg-ranna-gradient` Tailwind classes have **zero usage** anywhere outside the config file itself, so this is dead, stale config rather than a live rendering bug — safe to correct outright.

### Fonts
- **Poppins** = `--font-display` (headings + body), **Prompt** = `--font-support` (UI/meta/kicker text). Loaded correctly via `next/font/google` in `app/layout.tsx` (self-hosted, `display:"swap"`).
- `app/globals.css` line 1 **also** `@import`s the same two families from the Google Fonts CDN, and lines 29-30 re-declare `--font-display`/`--font-support` as literal-string fallbacks in the same `:root` scope `next/font`'s injected variable already targets — redundant font fetch + competing custom-property declarations.
- `tailwind.config.ts`'s `fontFamily.poppins`/`.prompts` keys reference `var(--font-poppins)`, `var(--font-prompts)`, `var(--font-dm-sans)` — **none of these variables are defined anywhere in the codebase**, and no DM Sans package/loading exists. Confirmed via grep: the `font-poppins`/`font-prompts` utility classes have zero usage in any component — dead/landmine config, not an active bug today, but a hazard for future development.

### Hard edges (border-radius: 0)
No `rounded*` Tailwind classes exist anywhere in the repo. Spot-checked inline `style` objects in `ContactSection.tsx` and `NavSection.tsx` — both explicitly set `borderRadius: 0` where relevant. Harness will verify computed `border-radius` sitewide since most components style via inline objects rather than utility classes.

### Heading convention (lowercase + trailing underscore)
Confirmed via full-repo grep of all `<h1>/<h2>/<h3>` usages (18 files) and multiple component reads:
- **100% compliant** on kicker/meta-labels and small UI text: `MetaLabel` component output (`"who we are"`, `"our studios"`, `"selected work"`, etc.), `ContactSection`'s field labels (`"your name_"`, `"email_"`, `"timeline_"`) and info-row items (`"response_"`, `"whatsapp_"`, `"brief_"`, `"nda_"`, `"offices_"`), and the submitted-state label (`"received_"`).
- **0% compliant** on actual `<h1>/<h2>/<h3>` marketing headings — every one is sentence-case or uppercase (e.g. "EXPERIENCES PEOPLE", "Built for the region's most ambitious experiences.", "Four studios. One integrated experience ecosystem.", "Request a free proposal.").
- A dead CSS rule `.us-blink::after { content: "_" }` (globals.css ~line 105) exists but is applied to zero elements in the codebase.
- **Per Majd's decision, this gap is flagged in the report only — no heading copy is rewritten as part of the fix pass.**

## 3. Component inventory

- `components/Primitives.tsx` — `Lz` (brand diamond glyph), `MetaLabel` (lowercase kicker labels), `useReveal`/`Reveal` (IntersectionObserver scroll-reveal). Closest thing to a shared UI kit.
- `components/sections/*.tsx` — one file per page section (NavSection, FooterSection, HeroSection, ContactSection, CredibilitySection, ExperiencesSection, NewsArticles, PreFooterCTASection, RegionalSection, RotatingStatementSection, SelectedWorkSection, StudiosPortalSection, StudiosSection, StudiosServicesSection, TeamSection, WhoWeAreSection, WhyRannaSection, WorkPortalSection). `NavSection` and `FooterSection` render globally from `app/layout.tsx`.
- `components/PageTransition.tsx`, `Preloader.tsx`, `ScrollIndicator.tsx`, `WhatsAppCTA.tsx` (floating CTA), `RegionalMap.tsx` (Leaflet + topojson vector map, dynamically imported client-side).
- `hooks/useIsMobile.ts` — single JS breakpoint (`window.innerWidth < 768`), `useState(false)` initial value flipped only inside `useEffect`. Used for conditional mobile/desktop JSX rendering throughout, instead of CSS media queries — see Finding on SSR nav flash in REPORT.md.
- No shared `Button` component. `.btn-rs` / `.btn-rs.solid` / `.btn-rs-on-light` (globals.css ~124-166) is the closest shared button styling, used in `ContactSection`, `PreFooterCTASection`, `StudiosServicesSection`, `StudiosPortalSection`, and several page files — but `NavSection`'s hamburger and `WhatsAppCTA.tsx` use fully inline styles instead.
- One form on the site: `ContactSection.tsx` (`#proposal` anchor, on `/contact` and linked from footer). Client-side only submit (no backend).
- No existing test tooling (no jest/vitest/playwright/cypress, no `tests/`/`e2e/` folders) prior to this audit.

## 4. Harness tooling added (dev-only)

Added under `audit/harness/` as a separate, isolated `package.json` — **not** touching the app's production dependencies:
- `@playwright/test` — browser automation, screenshots, viewport matrix.
- `@axe-core/playwright` — accessibility violation scanning.

Both are strictly dev/audit tooling, gitignored build artifacts aside, and do not affect `pnpm build` of the actual site.
