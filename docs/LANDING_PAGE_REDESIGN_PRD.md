# Landing Page Redesign — PRD

> Redesign the home page (`/`) into a **minimalistic, professional, Linktree-inspired** landing: a single centered mobile-first column containing a hero, a simple portfolio list, a simple blog list, and social media links. Nothing else.

Status: **Draft**
Owner: M. Nindra Zaka
Date: 2026-07-15

---

## 1. Background

The current home page (`src/screens/HomeScreen/HomeScreen.tsx`) is a full marketing site: navbar, hero with portrait, "What I've Built" project cards with stats, "Latest Writing" card grid, "Why founders hire me" 5-up icon stats, CTA banner, and a multi-column footer. It is dense, desktop-first, and tries to sell everything at once.

We are moving in the opposite direction: a calm, minimal, personal page in the style of Linktree — one narrow column, generous whitespace, plain typographic lists, obvious tap targets. The page should feel like a well-kept profile, not a sales page.

### What stays untouched

- The blog detail experience at `/blog/[slug]` (markdown rendering, syntax highlighting). The landing page's blog list links into it.
- The 10 markdown posts under `src/contents/` and their frontmatter format.
- The case-study pages `/business` and `/pos-system` (the portfolio list links to them).
- The stack: Next.js (pages router, `output: "export"`), Tamagui, React Native Web.

---

## 2. Goals

1. **Minimal & professional.** One column, no cards-with-stats, no category chips, no filters, no CTA banners. Text-first.
2. **Mobile-first.** Designed at 360 px and scaled up by doing almost nothing: the column simply centers with a max width (~600 px) on larger screens.
3. **Everything reachable in one scroll.** Hero → Portfolio → Blogs → Social. All posts are listed (only 10 exist), no pagination, no "view all" page needed.
4. **Fast.** Almost no images, no heavy sections. Lighthouse Performance ≥ 95 on mobile.

### Non-goals

- Redesigning the blog detail page, `/business`, or `/pos-system` (they keep their current design; a light chrome alignment can come later as follow-up work outside this PRD).
- Adding a CMS, analytics, contact form, or newsletter.
- Categorization, tags, search, or filtering of posts/projects.
- Dark/light theme toggle UI on the page (respecting the system theme via the existing Tamagui theme setup is enough).

---

## 3. Page specification

Single route: `/`. One vertical column, centered, `max-width: 600px`, horizontal padding `16–24px`, comfortable vertical rhythm between sections (`~48px`).

Top-to-bottom:

### 3.1 Hero — "who am I"

- Circular avatar photo (~96 px), centered.
- Name: **M. Nindra Zaka** (display size, strongest element on the page).
- One-line role: e.g. *Software Engineer & Founder*.
- Short bio, 1–2 sentences max: who I am and what I do (e.g. building products end-to-end, founded Gatherloop, open to remote opportunities). Plain text, centered.
- No buttons, no portrait banner, no stats.

### 3.2 Portfolio — simple list

- Section label: `Portfolio` (small, quiet heading).
- A plain vertical list of projects. Each item is one full-width tappable row:
  - **Title** (e.g. "Gatherloop Cafe & Board Game")
  - One-line description underneath (muted color).
- No categories, no images, no stat blocks, no chips.
- Initial content (data lives in a simple array in code):
  | Title | One-liner | Links to |
  |---|---|---|
  | Gatherloop Cafe & Board Game | A board game cafe serving 100+ customers daily | `/business` |
  | Point of Sale | POS system built in-house to run Gatherloop's daily operations | `/pos-system` |
- Rows must have a clear pressed/hover state and a minimum tap height of 44 px.

### 3.3 Blogs — simple list, all posts

- Section label: `Blogs`.
- All posts listed (currently 10), sorted by date descending — reuse the existing `getStaticProps` loading in `src/pages/index.tsx` (gray-matter over `src/contents/`).
- Each item is one tappable row:
  - **Post title**
  - Publish date underneath (muted, e.g. "Jan 17, 2021").
- No thumbnails, no descriptions, no categories, no "highlighted" treatment.
- Clicking navigates to `/blog/[slug]` to read the post. That's the whole flow.

### 3.4 Social Media

- Section at the bottom: a horizontal row of icon links (Tamagui Lucide icons already available):
  - GitHub — https://github.com/mnindrazaka
  - LinkedIn — https://linkedin.com/in/mnindrazaka
  - Twitter/X — https://x.com/mnindrazaka
  - Email — mailto:mnindrazaka@gmail.com
- Icon-only, ~24 px, muted color, accent on hover. Open in new tab (except mailto).
- Below it, a one-line copyright: `© {year} M. Nindra Zaka`.

### What is removed from the landing page

Navbar, hero portrait/banner, "Why founders hire me", project cards with stats/images, post card grid, CTA banner, and the multi-column footer. (Component files are deleted only in the cleanup phase, and only if no other page uses them.)

---

## 4. Design principles

- **Typography does the work.** Two text sizes per list item (title + muted meta). One display size for the name. No decorative elements.
- **One accent color** (keep the existing blue accent from the theme) used sparingly: link hover, focus rings.
- **Whitespace over dividers.** Prefer spacing to borders; if separation is needed, a single hairline divider between list items is the maximum.
- **System theme aware.** Works in light and dark via existing Tamagui tokens (`useThemeTokens`).
- **Accessible.** Semantic list markup, visible focus states, contrast ≥ 4.5:1, all interactive rows are real links (`<a>`), not click handlers on divs.

Reference feel: Linktree profile pages — single column, avatar on top, stacked tappable rows — but with typographic list rows instead of pill buttons, to keep it professional rather than playful.

---

## 5. Technical notes

- New screen: `src/screens/LandingScreen/` replacing `HomeScreen` as the component rendered by `src/pages/index.tsx`. Keep `HomeScreen` in the tree until cleanup phase to keep diffs small.
- New small components live under `src/screens/LandingScreen/` (they are not reused elsewhere): `HeroSection`, `LinkListItem` (shared by portfolio + blog rows), `SocialLinks`.
- Post loading: keep the existing `getStaticProps` in `src/pages/index.tsx`; only stop slicing to 4 and drop fields the new list doesn't need (image, category).
- Static export (`output: "export"`) is unaffected; no new data sources.
- SEO: keep `<Head>` meta from the current home page, updating description to match the simpler positioning; keep OG tags.
- Avatar image: add `public/images/avatar.jpg` (small, ≤ 50 KB).

---

## 6. Success criteria

- The page renders correctly and comfortably at 360 px, 768 px, and 1440 px (column simply centers; no layout shifts between breakpoints).
- All 10 posts appear and each navigates to its detail page.
- Portfolio rows navigate to `/business` and `/pos-system`.
- Lighthouse (mobile, throttled): Performance ≥ 95, Accessibility ≥ 95.
- `yarn build` (static export) passes; `/blog/[slug]`, `/business`, `/pos-system` behave exactly as before.

---

## 7. Implementation phases

Each phase is a **single, small, reviewable PR**. Every PR leaves `main` shippable: the landing page is complete-looking at each step and grows section by section.

### Phase 1 — Landing shell + Hero
**PR: `feat: minimal landing shell with hero section`**

- Create `src/screens/LandingScreen/` with the centered single-column layout (max-width 600 px, mobile-first padding/rhythm).
- Implement the Hero section (avatar, name, role, short bio) and add `public/images/avatar.jpg`.
- Point `src/pages/index.tsx` at `LandingScreen` (still passing `posts`, unused for now). Update `<Head>` title/description.
- Old `HomeScreen` and its components remain in the repo, unused.

*Acceptance:* home page shows only the hero, centered, correct in light/dark, correct at 360/768/1440 px; build passes.

### Phase 2 — Portfolio list
**PR: `feat: add portfolio list to landing page`**

- Add the reusable `LinkListItem` row component (title + muted one-liner, full-row link, hover/pressed/focus states, ≥ 44 px tap height).
- Add the `Portfolio` section with the two project entries linking to `/business` and `/pos-system`. Data as a plain array in the screen.

*Acceptance:* both rows render and navigate; keyboard focus visible; no categories/images/stats anywhere.

### Phase 3 — Blog list
**PR: `feat: add blog list to landing page`**

- Add the `Blogs` section listing **all** posts (title + formatted date), newest first, reusing `LinkListItem`.
- Trim `getStaticProps` to the fields the list needs (title, date, href) and remove the 4-post slice.
- Each row navigates to `/blog/[slug]`.

*Acceptance:* all 10 posts listed in date-descending order; every row opens the correct post detail; build passes.

### Phase 4 — Social media + footer line
**PR: `feat: add social links to landing page`**

- Add the icon row (GitHub, LinkedIn, Twitter/X, Email) with hover states and `aria-label`s; external links open in a new tab.
- Add the one-line copyright.

*Acceptance:* all four links resolve to the right destinations; icons legible in both themes.

### Phase 5 — Cleanup & de-scope old home
**PR: `chore: remove unused home page components`**

- Delete `HomeScreen` and components now unused anywhere: `Hero` (site), `Navbar`, `Footer`, `CTABanner`, `IconStat`, `ProjectCard`, `PostCard`, `SectionHeader`, `Chip`, etc. — *verify each with a usage search first*; anything still imported by `/business`, `/pos-system`, `/writing`, `/about`, or `/contact` stays.
- Decide fate of now-orphaned nav-dependent pages (`/writing`, `/about`, `/contact`): keep them reachable by URL for now (they still build), just no longer linked from the landing page. Removing them is out of scope.
- Update `docs/` to mark the old `REDESIGN_PRD.md` as superseded by this document.

*Acceptance:* `yarn build` and `yarn lint` pass; no dead imports; site pages that remain still render.

### Phase ordering rationale

Phases 1–4 each add one visible section, are independent to review, and keep the page presentable after every merge (a hero-only page is already a valid minimal profile). Phase 5 is deliberately last so no deletion happens until the new page is fully in place.

---

## 8. Open questions

1. **Bio copy** — final 1–2 sentence bio text for the hero (current suggestion in §3.1 is a placeholder).
2. **Avatar photo** — which photo to use for `public/images/avatar.jpg`.
3. **Twitter/X handle** — `@mnindrazaka` is assumed from existing meta tags; confirm the profile URL.
4. **Orphaned pages** — should `/writing`, `/about`, `/contact` eventually be deleted or redirected? (Out of scope here; tracked for a follow-up.)
