# Mobile UX Audit — Changelog

Branch `mobile-ux-audit` · 11 commits over `master` · full findings in `audit/REPORT.md`, recon in `audit/RECON.md`.

## Resolved (10 fix commits, all verified via harness re-run + `pnpm build`)

| Commit | Findings | What changed | Verification |
|---|---|---|---|
| `783814e` | F01, F05, F08 | Both nav variants now always render; a CSS media query (not JS state) decides visibility, so SSR HTML is correct before hydration on every route. Added `role="dialog"`/`aria-modal`/`aria-expanded`/Escape-key/focus-trap to the mobile menu. Lowercased mobile dropdown labels to match desktop. | `nav-hydration.spec.ts`: hamburger markup now present in raw SSR HTML for `/`, `/about`, `/contact`; visual snap screenshots at 767/768/769px show no flash. |
| `96f5ed8` | F02 | 12 event-format cards on `/about` + `/services` (24 links) now point to `/contact#proposal` instead of a bare `#proposal` that only exists on `/contact`. | `links.spec.ts`: dead-anchor count dropped from 24 to 0. |
| `956d77a` → corrected in `d27f92d` | F04, F06, F07 | Landmark fix corrected mid-pass (see below). Contact form `inputStyle.fontSize` 15→16 (iOS zoom). Added `id`/`htmlFor` to all 8 form fields. | Computed-style check: all inputs/selects/textarea now report 16px. Axe `select-name` violations (10) resolved. |
| `d27f92d` | F04 | **Self-correction**: the first attempt wrapped `layout.tsx` children in `<main>`, but every `page.tsx` already has its own `<main>` — that produced invalid nested `<main>` elements on every route. Reverted, and fixed the actual source instead: `WhatsAppCTA`'s floating link (rendered directly under `<body>`, outside any landmark) got `role="complementary"`. | Targeted axe `region`-only scan: 0 violations across all 7 routes (was 70/70 combinations failing before either change). |
| `baaba50` | F10, F11 | Footer column heading `<h4>` → `<h3>` (was skipping a level after the last `<h2>` on every page). Added `tabIndex`/`role="region"`/`aria-label` to the mobile team-scroll container. | Axe `heading-order` (50 hits) and `scrollable-region-focusable` (6 hits) both resolved. |
| `ae7f5be` | F12, F13 | Repointed `tailwind.config.ts` font tokens to the real `--font-display`/`--font-support` vars (dropping phantom `--font-dm-sans`); replaced the stale pre-rebrand `colors.ranna.*`/`ranna-gradient*` with the 6 locked-palette colors. | Confirmed zero live usage of the old classes before changing (grep), so no rendering risk. |
| `42a320b` | F14 | Replaced 5 identical `#1A0870` gradient-stop hexes (Preloader + 4 page heroes) with `var(--dusk-matter)`. Replaced RegionalMap's `#D400AA`/`#080A1C`/`#16103A`/`#09091E` with locked-palette vars, choosing `--dusk-matter` (not the strict nearest-neighbor) for the MENA highlight fill to preserve the map's functional contrast against non-MENA countries. | Grep confirms zero remaining off-palette hex literals in the touched files. |
| `aff782a` | F15 | Removed the redundant Google Fonts CDN `@import`; removed the literal-string `--font-display`/`--font-support` fallback redeclarations that competed with `next/font`'s injected variables. | Harness confirms `body` still resolves to the Poppins stack, `--font-support` to the Prompt stack, and the CDN request no longer fires. |
| `7abb413` | F09 | Home stat labels + all 19 work-page case captions used `--pitch-black` at `opacity:0.55` (an ad-hoc muted-text idiom, not the real `--fg-muted-on-light` token) — composited to 4.49:1, just under AA. Bumped to `0.6` in both, and nudged the actual token's mix ratio for consistency. | Targeted contrast re-scan: the `#75708d`/4.49 violation is gone from both routes. |

## Deferred — needs your input (not auto-fixed)

These are real, evidenced findings that the guardrails or the nature of the fix reserve for you:

1. **F03 — missing `/portfolio.pdf`** (`/about` "download portfolio" button, 404). Needs either the real file or a decision to remove the CTA. This is the one remaining harness test failure — everything else is clean.
2. **F16 — four functional UI elements use `border-radius:50%`** (WhatsApp floating button, a loading spinner, a decorative glow, the map's city-marker dot). The hard-edges rule has no stated exception, but each has a functional reason to stay circular (a square "spinner" doesn't read as loading; a square map marker doesn't read as a location pin). One option worth considering: the existing `Lz` diamond-glyph motif (already used in the logo and hamburger icon) as an on-brand, non-circular alternative for at least the spinner and marker.
3. **F17 — tap targets below 44×44px across nav + footer links, sitewide.** Recommended pattern (padding + equal negative margin, so the invisible hit area grows without shifting visible spacing) is in the report, not applied — it touches link styling on every page and deserves its own visual-regression pass rather than being bundled here.
4. **F18 — heading convention**: 100% correctly applied to kickers/meta-labels, 0% applied to real `<h1>–<h3>` headings, per your explicit call this cycle. No copy touched.
5. **F21 — locked brand colors (`--burnt-horizon`, `--ember-dawn`) used as small text directly on light backgrounds fail AA** (3.69:1 and 2.17:1). Can't fix by changing the colors themselves (locked); options are sizing/weight changes to qualify for the large-text 3:1 threshold, a non-color affordance, or accepting it as intentional.
6. **F22 — all 4 tinted studio cards fail contrast** (1.37:1–4.21:1), driven by each card's accent-colored text at reduced opacity over a same-hue tinted background. Fixing this means picking new tint/opacity values per card — a design-density call, not a mechanical nudge.
7. **F23 — muted-on-dark text under-contrasts on `--dusk-matter`** (3.47:1) in the regional market chips. The shared `--fg-muted-on-dark` token is tuned for true near-black backgrounds; widening it risks changing its (currently fine) appearance everywhere else it's used.

## Not touched, reviewed and found compliant
- `#FAFAFA` (`WhyRannaSection.tsx`) — falls under the spec's own neutral-greys exception.
- Third-party YouTube embed a11y issues (`aria-prohibited-attr`, `button-name`) — inside the embedded iframe's own DOM, outside our control.

## Housekeeping flagged for your decision (not committed)
- **`pnpm-lock.yaml`** — this checkout had no `node_modules` and apparently no committed lockfile; `pnpm install` generated one as part of getting the harness running. Left untracked rather than committing unilaterally — worth committing on general principle (reproducible installs) but that's your call.
- **`audit/screens/`** (~80MB, 70+ full-page PNG screenshots from the pre-fix matrix run) — left untracked to avoid bloating the branch without checking first. They're on disk locally if you want a subset committed, or want them moved somewhere else entirely.

## Residual risks / follow-ups
- No visual regression baseline exists yet — this audit's screenshots (pre- and could-be post-fix) are a reasonable starting point for one.
- A full Lighthouse pass (referenced in the original brief) wasn't run — this audit's harness focuses on the checklist items Playwright/axe can verify directly (overflow, a11y, tap targets, tokens, hydration); Lighthouse would add Core Web Vitals / performance-budget signal on top.
- The `AGENTS.md` prompt-injection note in `audit/RECON.md` is worth a look independent of this audit — someone should figure out how/why that text got into the repo.
