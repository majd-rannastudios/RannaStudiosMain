# Mobile UX Audit — Findings Report

Ranna Studios marketing site · branch `mobile-ux-audit` · 2026-07-07
Evidence: `audit/harness` (Playwright + axe-core), full route × viewport matrix (7 routes × 10 viewports = 70 combinations), screenshots in `audit/screens/`, raw per-combination results in `audit/harness/results/*.json`.

See `audit/RECON.md` for the framework correction (Next.js 16 App Router, not Vite) and the `AGENTS.md` prompt-injection note.

## Summary dashboard

| Severity | Count | Theme |
|---|---|---|
| P0 | 1 | SSR flash of desktop nav on every mobile pageview |
| P1 | 7 | Dead CTAs, missing landmark, form defects, mobile-menu a11y, nav casing |
| P2 | 12 | Contrast (opacity-based muted text, locked-brand-color-as-text, tinted card treatment, muted-on-dark), heading order, off-palette hex, stale/dead Tailwind tokens, redundant font loading, tap targets |
| P3 | 2 | Heading-convention scope gap, hard-edges exception needed for functional circular UI |

**Zero horizontal-overflow defects found** across all 70 route×viewport combinations, including the 767/768/769px `useIsMobile` boundary triplet — the harness's overflow check (`scrollWidth > clientWidth`) returned `false` everywhere. This is a genuine, verified negative result, not an oversight.

**Recurring theme**: several of the highest-value findings (SSR nav flash, missing `<main>` landmark, redundant font loading, dead token references) trace back to a small number of shared files (`hooks/useIsMobile.ts`, `app/layout.tsx`, `app/globals.css`, `tailwind.config.ts`) — fixing them there resolves the issue on every one of the 7 routes at once.

---

## P0

### F01 — Every mobile pageview initially renders the desktop nav, then snaps to the hamburger
**Area**: Navigation / Responsiveness · **Routes**: all 7 (global component) · **Viewports**: all ≤ 767px, confirmed at the 767/768/769 boundary
**File**: `hooks/useIsMobile.ts:4-13`, `components/sections/NavSection.tsx:116,162`
**Evidence**: `audit/harness/tests/nav-hydration.spec.ts` — raw SSR HTML fetched via `request.get()` for `/`, `/about`, `/contact` contains the desktop `<nav>` markup and **no** hamburger trigger (`aria-label="Open menu"`/`"Close menu"` absent) in all 3 cases. Visual snap screenshots: `audit/screens/nav-hydration/{767x844,768x1024,769x844}__immediate.png` vs `__settled.png`.

**What's wrong**: `useIsMobile()` initializes with `useState(false)` and only computes the real value inside `useEffect`. Since `NavSection` is a `"use client"` component that Next.js still server-renders for the initial HTML, every single page load — on every route, regardless of actual device — ships the desktop nav markup first. On a real phone this means the full multi-link text nav renders for a frame (or longer on a slow connection/device) before JS hydrates and swaps in the hamburger.

**Why it matters**: this is the single highest-frequency defect in the audit — it affects literally every mobile pageview on the site. It also risks a visible layout snap/flash and, on very narrow viewports, could visually crowd before the swap.

**Recommended fix**: stop gating nav markup purely on JS state for the initial paint. Render both the desktop `<nav>` and the mobile trigger unconditionally, and control which is visible via a CSS media query at the 768px breakpoint (the codebase already has this exact pattern for `.nav-cta` at `app/globals.css:272`, `@media (max-width:1000px)`). Keep `isMobile`/JS state only for behavior that genuinely needs it (menu open/close, body-scroll lock).

---

## P1

### F02 — 24 CTA cards on `/about` and `/services` link to a dead `#proposal` anchor
**Area**: Functionality · **Routes**: `/about`, `/services` · **File**: `components/sections/ExperiencesSection.tsx:76`
**Evidence**: `audit/harness/tests/links.spec.ts` → `audit/harness/results/links-crawl.json` — 24 dead-anchor hits (12 per page, one per `EVENT_TYPES` card).
**What's wrong**: every one of the 12 "event format" cards on `ExperiencesSection` (rendered on both `/about` and `/services`) links to `href="#proposal"`. The `id="proposal"` target only exists on `/contact` (`components/sections/ContactSection.tsx:46`). Clicking any of these 24 cards on `/about`/`/services` does nothing.
**Fix**: change `href="#proposal"` → `href="/contact#proposal"` in `ExperiencesSection.tsx:76`.

### F03 — "Download portfolio" button links to a missing file (404)
**Area**: Functionality · **Route**: `/about` · **File**: `app/about/page.tsx:56`
**Evidence**: `audit/harness/results/links-crawl.json` — `{"from":"/about","href":"/portfolio.pdf","status":404}`. Confirmed `public/portfolio.pdf` does not exist anywhere in the repo.
**What's wrong**: the hero CTA `<a href="/portfolio.pdf" download>` has no corresponding file.
**Not auto-fixed**: this needs an actual asset from Majd (or a decision to remove the button) — flagged only, see CHANGELOG.md.

### F04 — Page content is not contained in a `<main>` landmark
**Area**: Accessibility · **Routes**: all 7 (global) · **File**: `app/layout.tsx:106-115`
**Evidence**: axe-core `region` violation ("All page content should be contained by landmarks") fired on **70/70** route×viewport combinations — the only rule with a 100% hit rate.
**What's wrong**: `RootLayout` renders `<NavSection />{children}<FooterSection /><WhatsAppCTA /><ScrollIndicator />` directly inside `<body>` with no `<main>` wrapper around the page content.
**Fix**: wrap `{children}` in `<main>` in `app/layout.tsx`.

### F05 — Mobile menu has no focus trap, ARIA dialog semantics, or Escape handling
**Area**: Accessibility / Navigation · **Routes**: all 7 (global) · **File**: `components/sections/NavSection.tsx:162-306`
**Evidence**: code inspection (no `role="dialog"`, no `aria-modal`, no `aria-expanded` on the trigger, no keydown handler); axe `scrollable-region-focusable` (6 hits) corroborates missing keyboard-accessibility patterns in the same component family.
**What's wrong**: the hamburger button only toggles `aria-label` between "Open menu"/"Close menu"; the full-screen panel has no dialog semantics, doesn't trap Tab focus, and Escape does not close it.
**Fix**: add `role="dialog"` + `aria-modal="true"` to the panel, `aria-expanded={menuOpen}` on the trigger, a `keydown` handler for Escape, and a minimal focus trap (focus first link on open, restore focus to the trigger on close, trap Tab within the panel while open).

### F06 — Contact form inputs render at 15px, below the iOS Safari zoom threshold
**Area**: Forms / Mobile · **Route**: `/contact` · **File**: `components/sections/ContactSection.tsx:37`
**Evidence**: harness computed-style extraction confirms `input`, `select`, `textarea` all resolve to `font-size: 15px` (shared `inputStyle` object, `MIN_INPUT_FONT_SIZE_PX` check).
**What's wrong**: every field on the site's only form — name, company, email, phone, project type, location, timeline, and the message textarea — triggers iOS Safari's auto-zoom on focus.
**Fix**: bump `inputStyle.fontSize` from `15` to `16`.

### F07 — Contact form labels are not programmatically associated with their inputs
**Area**: Accessibility / Forms · **Route**: `/contact` · **File**: `components/sections/ContactSection.tsx:144-171`
**Evidence**: axe `select-name` violation (10 hits) on the project-type and timeline `<select>` elements; code inspection confirms the same gap on every text/email/tel input — `<label>` is a visual sibling, never linked via `htmlFor`/`id`.
**Fix**: add matching `id`/`htmlFor` pairs to each label+field pair (8 fields total).

### F08 — Mobile nav dropdown labels are capitalized; desktop nav (same links) is lowercase
**Area**: Brand consistency (cross-page/cross-state inconsistency) · **Routes**: all 7 (global) · **File**: `components/sections/NavSection.tsx:227,242,257,272,287,302` vs `:14-19`
**What's wrong**: the desktop `NAV_LINKS` array renders lowercase labels ("work", "news", "about", "contact"), matching the meta-label convention used everywhere else on the site. The mobile full-screen dropdown hardcodes the same five destinations as capitalized literals ("Home", "Studios", "Work", "About", "News", "Contact") — the identical set of links is styled two different ways depending on viewport.
**Fix**: lowercase the mobile dropdown's literal strings to match the desktop pattern.

---

## P2

### F09 — Muted secondary text fails WCAG AA by a hair (4.49:1, needs 4.5:1)
**Area**: Accessibility / Contrast · **Routes**: `/` (stat labels), `/work` (all 19 case captions) · **Files**: `components/sections/CredibilitySection.tsx:250`, `components/sections/SelectedWorkSection.tsx:552`
**Evidence**: targeted axe contrast scan — `fg:#75708d bg:#fbf9f9 ratio:4.49 expected:4.5:1`, recurring on the home page's 4 stat labels and all 19 work-page case captions.
**What's wrong**: both components render solid `var(--pitch-black)` text at `opacity: 0.55` as an ad-hoc "muted text" idiom, rather than using the site's actual `--fg-muted-on-light` semantic token (which is used correctly elsewhere, e.g. blog body copy). The composited result sits just under the AA threshold for normal text.
**Fix**: bumped `opacity: 0.55` → `0.6` in both files (also nudged `--fg-muted-on-light`'s own color-mix ratio from 55%→60% black for consistency, since it's used elsewhere and was at identical risk). Re-verified via harness: the `#75708d`/4.49 violation is gone from both routes with no other regressions.
**Note**: `StudiosPortalSection.tsx`/`StudiosServicesSection.tsx` use the same `opacity: 0.55` idiom but with each studio's own accent color (not pitch-black) as the text color — see F22, left flagged rather than fixed, since a big opacity change there would visibly alter the card's color intensity (a design call, not a mechanical fix).

### F21 — Locked brand colors used as small text directly on light backgrounds fail AA (flag only)
**Area**: Accessibility / Contrast (brand-rule tension) · **Routes**: `/news`, `/news/[slug]` · **Files**: `components/sections/NewsArticles.tsx`, `.meta-label` usages on article pages
**Evidence**: targeted axe contrast scan — `--burnt-horizon` (`#E3500A`) on `--dust-white`: `3.69:1` (needs 4.5:1); `--ember-dawn` (`#FB9203`) on `--dust-white`: `2.17:1`. Both recur across the news listing and article pages at 10-11px text sizes.
**What's wrong**: two of the six locked brand colors, used directly as small text color on light backgrounds, fail WCAG AA for normal text.
**Not auto-fixed**: the guardrails preclude changing the 6 locked hex values. Flagged for Majd's decision — options include increasing size/weight enough to qualify for the "large text" 3:1 threshold where applicable, pairing the color with a non-color affordance (underline, icon), or accepting it as intentional low-emphasis decorative text. See CHANGELOG.md.

### F22 — Tinted studio cards (StudiosPortalSection/StudiosServicesSection) fail contrast across the board (flag only)
**Area**: Accessibility / Contrast · **Route**: `/` (home studios grid) · **Files**: `components/sections/StudiosPortalSection.tsx`, `components/sections/StudiosServicesSection.tsx`
**Evidence**: targeted axe contrast scan on all 4 studio cards — ratios ranging from `1.37:1` to `4.21:1` (all below the 4.5:1 AA requirement for normal text), driven by each card's own accent color rendered at `opacity: 0.55` over a same-hue pastel-tinted background.
**What's wrong**: this is a deliberate "soft branded card" treatment (light tint background + matching-hue muted text) applied consistently across all 4 studios, not an isolated bug — every card fails, to varying degrees depending on how light its accent color is.
**Not auto-fixed**: fixing this means picking new opacity/tint values for 4 card variants, a real design-density decision, not a mechanical token nudge. Flagged for Majd's sign-off. See CHANGELOG.md.

### F23 — Muted-on-dark text under-contrasts against Dusk Matter (flag only)
**Area**: Accessibility / Contrast · **Route**: `/` (regional market chips) · **File**: `components/sections/RegionalSection.tsx`
**Evidence**: targeted axe contrast scan — `fg:#8c7494 bg:#3f184d ratio:3.47 expected:4.5:1` on `div[data-market="true"][role="button"]` chip labels.
**What's wrong**: `--fg-muted-on-dark` is tuned to sit comfortably on very dark/near-black backgrounds (its formula mixes toward `#0F0F0F`); on the lighter `--dusk-matter` background used by these chips, the same muted text has noticeably less contrast.
**Not auto-fixed**: widening the shared token risks changing its appearance everywhere else it's already compliant (true near-black backgrounds). Flagged for a component-specific treatment rather than a blind global change. See CHANGELOG.md.

### F10 — Footer heading breaks the page's heading hierarchy on every route
**Area**: Accessibility · **Routes**: all 7 (global) · **File**: `components/sections/FooterSection.tsx:97`
**Evidence**: axe `heading-order` violation, 50 hits total, concentrated on `div:nth-child(2) > h4` (the footer column title).
**What's wrong**: `FooterCol` renders its title as `<h4>`; since it's the last heading in DOM order on every page and no page has an `<h3>` immediately before it, this skips a level.
**Fix**: change `<h4>` → `<h3>` in `FooterCol`. Purely inline-styled (no bare `h4`/`h3` CSS selectors target it), so this is a zero-visual-impact semantic fix.

### F11 — Team section's horizontally-scrollable region isn't keyboard-focusable
**Area**: Accessibility · **Route**: `/about` · **File**: `components/sections/TeamSection.tsx` (`#team` scroll container)
**Evidence**: axe `scrollable-region-focusable`, 6 hits, all targeting `#team > div:nth-child(2)`.
**Fix**: add `tabIndex={0}` (and ideally a `role`/`aria-label` describing the scrollable content) to the scroll container.

### F12 — Dead/broken Tailwind font-family tokens
**Area**: Brand tokens · **File**: `tailwind.config.ts:22-25`
**What's wrong**: `fontFamily.poppins`/`.prompts` reference `var(--font-poppins)`, `var(--font-prompts)`, `var(--font-dm-sans)` — none defined anywhere in the codebase (the real, working variables are `--font-display`/`--font-support`, wired via `next/font/google` in `app/layout.tsx`). Confirmed zero usage of the `font-poppins`/`font-prompts` utility classes anywhere, so this is a landmine for future development rather than a live rendering bug today.
**Fix**: repoint both entries to `var(--font-display)` / `var(--font-support)`; drop the phantom `--font-dm-sans` fallback and the DM Sans reference entirely.

### F13 — Stale pre-rebrand palette still live in Tailwind config
**Area**: Brand tokens · **File**: `tailwind.config.ts:11-20,26-31`
**What's wrong**: `colors.ranna.*` and `backgroundImage.ranna-gradient*` hardcode the pre-Rebrand-2.0 palette (`#462969`, `#6D0E4E`, `#1B1941`, `#2A2B6B` — none of which are in the locked 6-color spec). Confirmed zero usage of `ranna.*`/`bg-ranna-gradient` classes anywhere outside the config file.
**Fix**: replace with the 6 locked-palette values (referenced via the real CSS vars) — safe, no live className depends on the old values.

### F14 — Off-palette hardcoded hex colors in custom UI chrome
**Area**: Brand tokens · **Files**: `components/Preloader.tsx:50`, `app/about/page.tsx:16`, `app/contact/page.tsx:11`, `app/news/page.tsx:35`, `app/work/page.tsx:22` (identical `#1A0870` gradient stop, 5 occurrences); `components/RegionalMap.tsx:27,62,126,160` (`#D400AA` marker glow, `#080A1C`/`#16103A`/`#09091E` map chrome)
**Evidence**: repo-wide grep + harness computed-style hex scan (flagged `#080A1C` and `#D400AA` directly on rendered DOM elements; the gradient-stop and SVG/canvas colors were confirmed via source grep since `getComputedStyle` can't see gradient-image or Leaflet-canvas colors).
**Fix**: `#1A0870`→`var(--dusk-matter)` (nearest locked color, preserves the intended dark-purple-to-black hero gradient). RegionalMap: `#D400AA`→`var(--crimson-bloom)`; container/non-MENA fill (`#080A1C`/`#09091E`)→`var(--abyssal-black)`; MENA highlight fill (`#16103A`) → `var(--dusk-matter)` rather than the strict nearest-neighbor `abyssal-black`, to preserve the map's functional highlight contrast between MENA and non-MENA countries (collapsing both to the identical locked hex would erase the distinction the map exists to show).

### F15 — Redundant double font-loading
**Area**: Performance · **File**: `app/globals.css:1,29-30`
**Evidence**: harness network capture confirms the CDN request actually fires: `https://fonts.googleapis.com/css2?family=Poppins...&family=Prompt...` alongside the self-hosted `next/font/google` load already wired in `app/layout.tsx`.
**What's wrong**: Poppins + Prompt are fetched twice — once self-hosted via `next/font` (with proper `display:"swap"` and preloading), once again via a Google Fonts CDN `@import`. `globals.css` also re-declares `--font-display`/`--font-support` as literal-string fallbacks in the same `:root` scope `next/font`'s injected class already targets.
**Fix**: remove the CDN `@import` (line 1) and the literal-string redeclarations (lines 29-30); rely solely on the `next/font`-injected variables. Verify via harness that headings/body still resolve to Poppins/Prompt afterward.

### F16 — Hard-edges violation: four functional UI elements use `border-radius: 50%`
**Area**: Brand tokens (flag, not auto-fixed — see below) · **Files**: `components/WhatsAppCTA.tsx:20` (floating action button), `components/sections/SelectedWorkSection.tsx:444` (loading spinner), `components/sections/TeamSection.tsx:113` (decorative glow), `components/RegionalMap.tsx:26` (`.ranna-dot` city marker)
**What's wrong**: Section 0's hard-edges rule has no stated exception, but all four instances have a functional reason for being circular — a CSS-rotation loading spinner depends on being a ring to read as "loading," a map marker depends on being a dot to read as a location pin, and a floating action button follows a near-universal circular convention.
**Not auto-fixed**: flagged for Majd's decision — see CHANGELOG.md for a suggested on-brand alternative (the existing `Lz` diamond-glyph motif already used in the logo and hamburger icon could replace the circular treatments without introducing a new shape language).

### F17 — Tap targets below 44×44px are pervasive across nav and footer links
**Area**: Accessibility · **Routes**: all 7 (global, nav+footer) · **Viewports**: all 10 (70/70 combinations flagged at least one violation)
**Evidence**: harness tap-target check — primary nav links (20-42px tall), and the full footer link set (studio links, region links, contact links, social links) all measure well under 44px in height.
**Not auto-fixed**: flagged with a recommended pattern (add vertical `padding` + equal negative `margin` to grow the invisible hit area without shifting visual layout/spacing) rather than applied — the fix touches link styling across two global components and every page, and deserves a dedicated pass with its own before/after visual check rather than being bundled into this cycle. See CHANGELOG.md.

---

## P3

### F18 — Heading convention: 100% compliant on kickers/labels, 0% compliant on real headings
**Area**: Brand consistency · **Routes**: all 7
**Evidence**: full-repo grep of every `<h1>/<h2>/<h3>` (18 files) plus the `MetaLabel`/`ContactSection` label patterns.
**What's wrong**: the lowercase + trailing-underscore convention (`our work_`) is applied consistently and correctly to every kicker/meta-label and small UI text element sitewide (`MetaLabel` output, `ContactSection` field labels, info-row items like `"response_"`) — **100% compliant**. It is never applied to actual `<h1>/<h2>/<h3>` marketing headings, which are uniformly sentence-case or uppercase (e.g. "Built for the region's most ambitious experiences.") — **0% compliant**.
**Per Majd's explicit decision this cycle**: flagged only, no heading copy rewritten. This is a clean, consistent scope split (not a broken/partial implementation), so it's presented here as a spec-clarification item rather than a defect.

### F19 — Reviewed, no action: `#FAFAFA` in `WhyRannaSection.tsx`
Near-white neutral background color; falls under Section 0's own "pure black/white/neutral greys used for structure" exception. Not a violation.

### F20 — Not actionable: third-party YouTube embed accessibility issues
axe flagged `aria-prohibited-attr` (7 hits) and `button-name` (1 hit) exclusively inside `#movie_player`/`#yt-hero-player` — YouTube's own embedded iframe DOM, which the site does not control or render. Included here only so the counts in the summary dashboard are traceable; not a defect in Ranna Studios' code.
