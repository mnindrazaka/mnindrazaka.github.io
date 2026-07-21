# Substack Posts on Landing Page — PRD

> Add a section to the home page (`/`) that lists my latest **Substack** posts as a simple, tappable list. Each row opens the original Substack post in a new tab. Same minimal, typographic style as the existing "Blogs" section.

Status: **Draft**
Owner: M. Nindra Zaka
Date: 2026-07-21

---

## 1. Background

The landing page (`src/screens/LandingScreen/LandingScreen.tsx`) already renders several plain link lists — Portfolio, Previously Work at, and **Blogs** — all built from the same `LinkListItem` row component. The Blogs list is sourced from local markdown files in `src/contents/`, loaded at build time via `getStaticProps` in `src/pages/index.tsx`.

I also publish writing on **Substack**, which lives entirely outside this repo. Today none of it is surfaced on my site. I want a section on the landing page that lists my recent Substack posts and links out to them, so the two bodies of writing (local blog + Substack) are both discoverable from one place.

### Key constraints (from the current stack)

- **Static export.** `next.config.js` sets `output: "export"`. There is no server runtime and no API routes at request time. All data must be resolved at **build time** (`getStaticProps`) or fetched **client-side** in the browser.
- **Substack has no official API**, but every publication exposes a stable **RSS feed** at `https://<publication>.substack.com/feed` (XML: `title`, `link`, `pubDate`, `description`, `content:encoded`, …).
- **CORS.** A browser-side `fetch()` of the Substack feed is blocked by CORS and would need a proxy. Fetching the feed from **Node at build time** has no such restriction — this is the deciding reason to fetch at build time, and it also matches how the Blogs list already works.
- **Deploys are build-triggered.** `.github/workflows/deploy.yml` builds and deploys only on `push` to `main`. So a build-time list only refreshes when the site is rebuilt — freshness is addressed in §5 and Phase 3.

### What stays untouched

- The Blogs section and the local markdown posts under `src/contents/`.
- The blog detail experience at `/blog/[slug]`.
- The stack: Next.js (pages router, `output: "export"`), Tamagui, React Native Web.
- The `LinkListItem` row component and the overall single-column landing layout.

---

## 2. Goals

1. **Surface Substack posts on the landing page** as a plain, tappable list matching the existing sections.
2. **Click → original post.** Each row opens the canonical Substack URL in a new tab (`target="_blank"`, `rel="noopener noreferrer"`), consistent with the Portfolio / Previously-Work-at rows.
3. **Zero runtime cost.** Resolved fully at build time; no client-side data fetching, no proxy, no extra network work in the browser. Static export (`output: "export"`) keeps working.
4. **Never break the build.** If the Substack feed is unreachable or malformed during a build, the build still succeeds and the page degrades gracefully.
5. **Consistent, minimal design.** Same `LinkListItem` rows (title + muted date), same rhythm and theming as the rest of the page.

### Non-goals

- **Re-hosting or rendering post content on this site.** We link out to Substack; we do not build Substack post detail pages here. (`/blog/[slug]` remains only for local markdown.)
- Newsletter signup / subscribe form, comments, or paywalled-content handling.
- Search, tags, categories, or filtering of Substack posts.
- Merging Substack posts and local blog posts into one combined list (they stay as two separate sections; a future merge is out of scope).
- Any client-side/runtime fetching or a serverless proxy.
- Backfilling old posts as local markdown.

---

## 3. Feature specification

### 3.1 Data source

- Feed URL: `https://<publication>.substack.com/feed` (exact publication slug is an open question — see §8). Stored as a single constant/env var (`SUBSTACK_FEED_URL`), not hard-coded in multiple places.
- Fetched **once at build time** in Node.
- Parsed into a typed list. Each entry:

  | Field | Source (RSS) | Notes |
  |---|---|---|
  | `title` | `item.title` | Post title. |
  | `url` | `item.link` | Canonical Substack post URL (the redirect target). |
  | `date` | `item.pubDate` | Formatted for display (e.g. "Jul 21, 2026"). |
  | `rawDate` | `item.pubDate` | Kept only for sorting. |

- **Sort** newest-first by `rawDate`.
- **Limit** to the latest **N** posts (default **N = 5**, a single constant) so the section stays short. Configurable in one place.

### 3.2 UI — "Writing on Substack" section

- A new section on the landing page, placed **directly after the existing "Blogs" section** (see §3.3 for ordering), styled identically to the other lists:
  - Small quiet uppercase section label (working title: `Newsletter` or `Writing on Substack` — final label is an open question, §8).
  - A vertical list of rows built with the existing `LinkListItem`:
    - **Title** (bold).
    - **Date** underneath, muted.
  - Each row is a full-width external link opening the Substack post in a new tab (`external` → `target="_blank"` + `rel="noopener noreferrer"`), min tap height 44 px, with the existing hover / pressed / focus states.
- **Empty state:** if there are zero posts (e.g. feed failed at build, see §4), the entire section — label included — is **not rendered**. No error message, no empty box.

### 3.3 Placement & ordering

Landing page top-to-bottom becomes: Hero → Portfolio → Previously Work at → **Blogs** → **Writing on Substack** → Social. Substack sits right after Blogs so the two writing lists are adjacent. (Final placement is minor and can be adjusted during Phase 2 review.)

---

## 4. Resilience (build-time)

The feed is an external dependency fetched during CI builds; it must never take the deploy down.

- The feed-fetch function **catches all errors** (network failure, non-200, timeout, malformed XML) and returns an **empty list** rather than throwing.
- A short **timeout** (e.g. 10 s) prevents a hung feed from stalling the build.
- On empty list, `getStaticProps` still returns valid props and the Substack section is simply hidden (§3.2 empty state).
- A single warning is logged to the build output when the feed can't be loaded, so a silent failure is still visible in CI logs.

---

## 5. Freshness

Because deploys are build-triggered (`push` to `main`), the list only updates when the site rebuilds. Two mechanisms keep it reasonably fresh without a content code-change:

- **`workflow_dispatch`** on the deploy workflow → a manual "rebuild now" button after publishing on Substack.
- **Scheduled rebuild** (`schedule:` cron, e.g. once daily) so new Substack posts appear within a day automatically.

Both are additive changes to `.github/workflows/deploy.yml` and are delivered in Phase 3. (Real-time freshness is a non-goal — a build-time list is intentionally eventually-consistent.)

---

## 6. Technical notes

- **Parser dependency.** Add a small, well-maintained RSS parser (recommended: `rss-parser`, which runs in Node and handles Substack's feed shape, including `content:encoded`). Alternative: `fast-xml-parser` if we want zero RSS-specific abstraction. One dependency only.
- **New module:** `src/lib/substack.ts` exporting a `SubstackPost` type and an async `fetchSubstackPosts()` that fetches → parses → sorts → limits, with the error handling from §4 built in. Keeping it in `src/lib/` (new folder) isolates the data plumbing from UI and from the page.
- **Wiring:** `src/pages/index.tsx` `getStaticProps` calls `fetchSubstackPosts()` alongside the existing local-post logic and passes a `substackPosts` prop into `LandingScreen`. `LandingScreenProps` gains `substackPosts: BlogListItem[]` (the existing `{ title, href, date }` shape fits — `href` = the Substack URL, rendered as an `external` row).
- **Reuse, don't rebuild:** the row UI is the existing `LinkListItem` with `external`; no new row component.
- **Config:** `SUBSTACK_FEED_URL` and the post limit `N` live as named constants (env-overridable for the URL) so they're changed in one place.
- Static export (`output: "export"`) is unaffected — the fetch happens in Node during `next build`, and the output stays fully static HTML.

---

## 7. Success criteria

- The landing page shows a Substack section listing the latest N posts, newest-first, each opening the correct Substack URL in a new tab.
- Row styling, spacing, focus/hover states, and theming are indistinguishable from the Blogs / Portfolio rows in both light and dark.
- `yarn build` (static export) passes; the Blogs section and `/blog/[slug]` behave exactly as before.
- With the feed forced to fail (bad URL / offline), `yarn build` **still succeeds** and the Substack section is simply absent — no crash, no empty box.
- No client-side network request to Substack is made when viewing the page (verify in the browser network tab).
- Lighthouse (mobile) is unchanged from the current landing page (no runtime data cost added).

---

## 8. Implementation phases

Each phase is a **single, small, reviewable PR**. Every PR leaves `main` shippable: after Phase 1 nothing is visible but the build is unchanged; after Phase 2 the feature is live; Phase 3 only tunes freshness.

### Phase 1 — Substack feed client (data layer, no UI)
**PR: `feat: add build-time Substack feed client`**

- Add the RSS parser dependency (`rss-parser`).
- Create `src/lib/substack.ts`: the `SubstackPost` type, the `SUBSTACK_FEED_URL` + limit constants, and `fetchSubstackPosts()` (fetch → parse → sort newest-first → limit to N), with the §4 error handling (try/catch → `[]`, timeout, single warning log) built in from the start.
- No page or UI change; the function is not called by any page yet.

*Acceptance:* the module compiles and type-checks; run against the real feed (throwaway script or a temporary `console.log` in `getStaticProps`, reverted before merge) returns the expected posts; forcing a bad URL returns `[]` without throwing; `yarn build` and `yarn lint` pass. Nothing is rendered.

*Why first:* isolates the one risky, external-dependency piece into a self-contained, easily-reviewed unit with no UI noise in the diff.

### Phase 2 — Render the Substack section
**PR: `feat: show Substack posts on landing page`**

- Extend `getStaticProps` in `src/pages/index.tsx` to call `fetchSubstackPosts()` and pass `substackPosts` to `LandingScreen`.
- Add `substackPosts` to `LandingScreenProps` and render the new "Writing on Substack" section using the existing `LinkListItem` (external rows), placed right after Blogs.
- Implement the empty-state rule: render nothing (label included) when the list is empty.

*Acceptance:* the section lists the latest N posts newest-first; each row opens the correct Substack URL in a new tab; styling matches the other sections in light and dark; with the feed forced to fail the build still passes and the section is absent; no client-side Substack request; `yarn build` passes.

*Why second:* the feature goes fully live here, and because Phase 1's client never throws, shipping this cannot break a deploy.

### Phase 3 — Freshness (scheduled + manual rebuild)
**PR: `ci: add scheduled and manual rebuild for Substack freshness`**

- Add `workflow_dispatch` and a `schedule:` cron (e.g. daily) to `.github/workflows/deploy.yml` so new Substack posts appear without a content code-change.
- No app-code change.

*Acceptance:* the workflow can be triggered manually from the Actions tab; the scheduled trigger is present and valid; a scheduled/dispatched run rebuilds and redeploys, picking up any new Substack posts.

*Why last:* purely an operational improvement; the feature is already correct and shippable after Phase 2. Kept separate so the CI change is reviewed on its own.

### Phase ordering rationale

Phase 1 isolates the external-dependency risk with zero UI. Phase 2 turns it on in one small, safe diff. Phase 3 is an independent CI-only change. Each merges cleanly on its own and leaves the site working.

---

## 9. Open questions

1. **Publication slug / feed URL** — the exact `https://<publication>.substack.com/feed` for `SUBSTACK_FEED_URL`.
2. **Section label** — final wording: `Newsletter`, `Writing on Substack`, `Substack`, or something else.
3. **Number of posts (N)** — default proposed is 5; confirm or set the desired count (or "show all").
4. **Placement** — after Blogs (proposed) vs. before it vs. elsewhere in the column.
5. **Scheduled rebuild cadence** — daily (proposed) vs. more/less frequent, for Phase 3.
6. **Local vs. Substack overlap** — if a post exists both as local markdown and on Substack, do we care about de-duplication? (Assumed no for now; the two lists stay independent.)
