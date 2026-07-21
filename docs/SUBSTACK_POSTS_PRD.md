# Substack Posts as the Blog Section — PRD

> Replace the landing page's blog list with my latest **Substack** posts, and remove the old local-markdown blog entirely. The "Blogs" section on the home page (`/`) becomes a simple, tappable list of Substack posts; each row opens the original Substack post in a new tab.

Status: **Draft**
Owner: M. Nindra Zaka
Date: 2026-07-21

---

## 1. Background

The landing page (`src/screens/LandingScreen/LandingScreen.tsx`) renders several plain link lists — Portfolio, Previously Work at, and **Blogs** — all built from the same `LinkListItem` row component. Today the Blogs list is sourced from local markdown files in `src/contents/` (10 posts), loaded at build time via `getStaticProps` in `src/pages/index.tsx`, with a detail page at `/blog/[slug]` that renders the markdown.

I now publish my writing on **Substack** instead. I no longer want to maintain writing as local markdown in this repo. So:

- The **Blogs section should list my Substack posts** (not local markdown), each linking out to Substack.
- The **old local-markdown blog is removed** entirely — content files, the detail route, and the markdown-rendering code.

### Key constraints (from the current stack)

- **Static export.** `next.config.js` sets `output: "export"`. There is no server runtime and no API routes at request time. All data must be resolved at **build time** (`getStaticProps`) or fetched **client-side** in the browser.
- **Substack has no official API**, but every publication exposes a stable **RSS feed** at `https://<publication>.substack.com/feed` (XML: `title`, `link`, `pubDate`, `description`, `content:encoded`, …).
- **CORS.** A browser-side `fetch()` of the Substack feed is blocked by CORS and would need a proxy. Fetching the feed from **Node at build time** has no such restriction — this is the deciding reason to fetch at build time, and it also matches how the Blogs list is loaded today.
- **Deploys are build-triggered.** `.github/workflows/deploy.yml` builds and deploys only on `push` to `main`. So a build-time list only refreshes when the site is rebuilt — freshness is addressed in §5 and Phase 4.

### What stays untouched

- The Portfolio, Previously Work at, and Social sections.
- The `LinkListItem` row component and the single-column landing layout (the Blogs rows already use `LinkListItem`; they just change from internal links to external Substack links).
- The stack: Next.js (pages router, `output: "export"`), Tamagui, React Native Web.

---

## 2. Goals

1. **Blogs section = Substack posts.** The existing "Blogs" list is populated from my Substack feed instead of local markdown.
2. **Click → original post.** Each row opens the canonical Substack URL in a new tab (`target="_blank"`, `rel="noopener noreferrer"`), like the Portfolio / Previously-Work-at rows.
3. **Remove the old markdown blog.** Delete the local content, the `/blog/[slug]` detail route, the `BlogDetailScreen` / markdown-rendering code, and the now-unused dependencies and build config.
4. **Zero runtime cost.** Resolved fully at build time; no client-side data fetching, no proxy. Static export keeps working.
5. **Never break the build.** If the Substack feed is unreachable or malformed during a build, the build still succeeds and the section degrades gracefully.
6. **Consistent, minimal design.** Same `LinkListItem` rows (title + muted date), same rhythm and theming as the rest of the page.

### Non-goals

- **Re-hosting or rendering Substack content on this site.** We link out to Substack; we do not build post detail pages here. After this work there is **no** post detail route on the site.
- Redirecting old `/blog/<slug>` URLs to their Substack equivalents. **Decided:** old URLs simply stop existing and 404 — this is accepted (there is no reliable slug mapping).
- Newsletter signup form, comments, or paywalled-content handling.
- Search, tags, categories, or filtering of posts.
- Any client-side/runtime fetching or a serverless proxy.
- Backfilling or migrating the old markdown posts into Substack (assumed already published there; see §9).

---

## 3. Feature specification

### 3.1 Data source

- Publication: **`mnindrazaka`**. Feed URL: **`https://mnindrazaka.substack.com/feed`**. Stored as a single constant/env var (`SUBSTACK_FEED_URL`), not hard-coded in multiple places. The publication home/archive `https://mnindrazaka.substack.com/archive` is stored alongside it as `SUBSTACK_ARCHIVE_URL` (used by the "Show all" link, §3.2).
- Fetched **once at build time** in Node.
- Parsed into a typed list. Each entry:

  | Field | Source (RSS) | Notes |
  |---|---|---|
  | `title` | `item.title` | Post title. |
  | `href` | `item.link` | Canonical Substack post URL (the redirect target). |
  | `date` | `item.pubDate` | Formatted for display (e.g. "Jul 21, 2026"). |
  | `rawDate` | `item.pubDate` | Kept only for sorting. |

- **Sort** newest-first by `rawDate`.
- **Limit** to the latest **N = 5** posts (a single constant) so the section stays short. A "Show all" link (§3.2) leads to the full archive on Substack.

### 3.2 UI — the "Blogs" section

- Keep the section in place and in position; its **label, data source, and link target** change:
  - Section label: **`Writing`** (replacing `Blogs`), same small quiet uppercase style as the other section labels.
  - Rows built with the existing `LinkListItem` (the latest 5 posts):
    - **Title** (bold).
    - **Date** underneath, muted.
  - Each row is now a full-width **external** link opening the Substack post in a new tab (`external` → `target="_blank"` + `rel="noopener noreferrer"`), keeping the current min tap height and hover / pressed / focus states.
  - **"Show all" link** below the rows: a quiet, muted text link (e.g. "Show all →") pointing to `SUBSTACK_ARCHIVE_URL`, opening the full Substack archive in a new tab (external). Styled as a subtle affordance, not a full `LinkListItem` row, so it reads as a section footer rather than another post.
- **Empty state:** if there are zero posts (e.g. feed failed at build, see §4), the entire section — label and "Show all" included — is **not rendered**. No error message, no empty box.

The landing page order is unchanged, with the renamed section: Hero → Portfolio → Previously Work at → **Writing** → Social.

---

## 4. Resilience (build-time)

The feed is an external dependency fetched during CI builds; it must never take the deploy down.

- The feed-fetch function **catches all errors** (network failure, non-200, timeout, malformed XML) and returns an **empty list** rather than throwing.
- A short **timeout** (e.g. 10 s) prevents a hung feed from stalling the build.
- On empty list, `getStaticProps` still returns valid props and the Blogs section is simply hidden (§3.2 empty state).
- A single warning is logged to the build output when the feed can't be loaded, so a silent failure is still visible in CI logs.

---

## 5. Freshness

Because deploys are build-triggered (`push` to `main`), the list only updates when the site rebuilds. Two mechanisms keep it reasonably fresh without a content code-change:

- **`workflow_dispatch`** on the deploy workflow → a manual "rebuild now" button after publishing on Substack.
- **Scheduled rebuild** (`schedule:` cron, e.g. once daily) so new Substack posts appear within a day automatically.

Both are additive changes to `.github/workflows/deploy.yml` and are delivered in Phase 4. (Real-time freshness is a non-goal — a build-time list is intentionally eventually-consistent.)

---

## 6. Technical notes

- **Parser dependency.** Add a small, well-maintained RSS parser (recommended: `rss-parser`, which runs in Node and handles Substack's feed shape). One dependency in; several go out (see cleanup below), so net dependency count drops.
- **New module:** `src/lib/substack.ts` exporting a `SubstackPost` type and an async `fetchSubstackPosts()` that fetches → parses → sorts → limits, with the §4 error handling built in. Keeping it in `src/lib/` isolates the data plumbing from UI and from the page.
- **Wiring:** `src/pages/index.tsx` `getStaticProps` calls `fetchSubstackPosts()` and passes the result as the existing `posts` prop into `LandingScreen`. The current `BlogListItem` shape (`{ title, href, date }`) already fits — `href` becomes the Substack URL, and the Blogs rows render as `external`.
- **Reuse, don't rebuild:** the row UI is the existing `LinkListItem` with `external`; no new row component and no layout change.
- **Config:** `SUBSTACK_FEED_URL` (`https://mnindrazaka.substack.com/feed`), `SUBSTACK_ARCHIVE_URL` (`https://mnindrazaka.substack.com/archive`), and the post limit `N = 5` live as named constants (env-overridable for the URLs) so they're changed in one place.

### Cleanup — what the old markdown blog removal deletes

Verified against the current tree (usage-checked before removal in the cleanup phase):

- Content: all files under `src/contents/` (10 markdown posts).
- Route: `src/pages/blog/[slug].tsx`.
- Screen: `src/screens/BlogDetailScreen/` (`BlogDetailScreen.tsx`, `MarkdownView.tsx`, `index.tsx`) and its re-export line in `src/screens/index.tsx`.
- Loader: the local-post reading logic in `src/pages/index.tsx` `getStaticProps` (`fs`/`path`/`matter`/`import("../contents/…")`).
- Build config: the `.md` `raw-loader` webpack rule in `next.config.js`.
- Dependencies, once confirmed unreferenced elsewhere: `gray-matter`, `react-markdown`, `react-syntax-highlighter`, `@types/react-syntax-highlighter`, `remark-gfm` (already unused today), `raw-loader`.

Static export (`output: "export"`) is unaffected throughout — the feed fetch happens in Node during `next build`, and the output stays fully static HTML.

---

## 7. Success criteria

- The landing page's `Writing` section lists the latest 5 Substack posts, newest-first, each opening the correct Substack URL in a new tab, with a "Show all" link to the Substack archive.
- Row styling, spacing, focus/hover states, and theming are unchanged from today's Blogs rows, in both light and dark.
- The old markdown blog is gone: `src/contents/`, `/blog/[slug]`, and `BlogDetailScreen` no longer exist; `yarn build` and `yarn lint` pass with no dead imports and no removed-dependency references.
- With the feed forced to fail (bad URL / offline), `yarn build` **still succeeds** and the Blogs section is simply absent — no crash, no empty box.
- No client-side network request to Substack is made when viewing the page (verify in the browser network tab).
- Lighthouse (mobile) is unchanged or better versus today's landing page (no runtime data cost added; markdown/highlighter code removed).

---

## 8. Implementation phases

Each phase is a **single, small, reviewable PR**. Every PR leaves `main` shippable.

### Phase 1 — Substack feed client (data layer, no UI)
**PR: `feat: add build-time Substack feed client`**

- Add the RSS parser dependency (`rss-parser`).
- Create `src/lib/substack.ts`: the `SubstackPost` type, the `SUBSTACK_FEED_URL` + limit constants, and `fetchSubstackPosts()` (fetch → parse → sort newest-first → limit to N), with the §4 error handling (try/catch → `[]`, timeout, single warning log) built in from the start.
- No page or UI change; the function is not called by any page yet. The old markdown blog is fully intact.

*Acceptance:* the module compiles and type-checks; run against the real feed (throwaway script or a temporary `console.log`, reverted before merge) returns the expected posts; forcing a bad URL returns `[]` without throwing; `yarn build` and `yarn lint` pass. Nothing is rendered differently.

*Why first:* isolates the one risky, external-dependency piece into a self-contained, easily-reviewed unit with no UI noise in the diff.

### Phase 2 — Point the Blogs section at Substack
**PR: `feat: source landing blog list from Substack`**

- Change `getStaticProps` in `src/pages/index.tsx` to build `posts` from `fetchSubstackPosts()` instead of local markdown, and render the rows as `external`.
- Rename the section label to `Writing` and add the "Show all" link to `SUBSTACK_ARCHIVE_URL` below the rows.
- Implement the empty-state rule: render nothing (label and "Show all" included) when the list is empty.
- Leave the old markdown blog files, `/blog/[slug]` route, and `BlogDetailScreen` **in place but now unlinked from the landing page** (they still build). Removal is the next phase.

*Acceptance:* the `Writing` section lists the latest 5 Substack posts newest-first; each row opens the correct Substack URL in a new tab; the "Show all" link opens the archive; styling matches today; with the feed forced to fail the build still passes and the section is absent; no client-side Substack request; `yarn build` passes.

*Why second:* the feature goes live in one small, safe diff. Because Phase 1's client never throws, shipping this cannot break a deploy. Keeping the deletion separate makes both PRs easy to review and easy to revert independently.

### Phase 3 — Remove the old markdown blog
**PR: `chore: remove local markdown blog`**

- Delete the content, route, screen, loader, build rule, and now-unused dependencies listed in §6 "Cleanup". Verify each dependency and module is unreferenced with a usage search before deleting.
- Confirm no other page imports `BlogDetailScreen` or reads `src/contents/`.

*Acceptance:* `yarn build` and `yarn lint` pass; no dead imports; `/blog/*` no longer exists in the export; the landing page still shows the Substack-sourced Blogs section; the site's other pages/sections are unchanged.

*Why third:* deletion happens only after the replacement is live and verified, so `main` is always shippable and the risky external-feed change and the destructive cleanup are never entangled in one diff.

### Phase 4 — Freshness (scheduled + manual rebuild)
**PR: `ci: add scheduled and manual rebuild for Substack freshness`**

- Add `workflow_dispatch` and a `schedule:` cron (e.g. daily) to `.github/workflows/deploy.yml` so new Substack posts appear without a content code-change.
- No app-code change.

*Acceptance:* the workflow can be triggered manually from the Actions tab; the scheduled trigger is present and valid; a scheduled/dispatched run rebuilds and redeploys, picking up any new Substack posts.

*Why last:* purely an operational improvement; the feature is already correct and shippable after Phase 3. Kept separate so the CI change is reviewed on its own.

### Phase ordering rationale

Phase 1 isolates the external-dependency risk with zero UI. Phase 2 switches the section over in one small, safe diff while the old blog still exists as a fallback. Phase 3 does the destructive cleanup only once the replacement is proven. Phase 4 is an independent CI-only change. Each merges cleanly on its own and leaves the site working.

---

## 9. Open questions

1. ~~**Publication slug / feed URL**~~ **Resolved:** publication `mnindrazaka` → `https://mnindrazaka.substack.com/feed`.
2. ~~**Section label**~~ **Resolved:** `Writing`.
3. ~~**Number of posts (N)**~~ **Resolved:** 5, plus a "Show all" link to the Substack archive.
4. ~~**Old `/blog/<slug>` URLs** — after removal these 404.~~ **Resolved:** 404 is accepted; no holding page or redirect.
5. **Content parity** — are all 10 existing markdown posts already published on Substack (so nothing is lost by deleting them), or should any be preserved/migrated first?
6. **Scheduled rebuild cadence** — daily (proposed) vs. more/less frequent, for Phase 4.
