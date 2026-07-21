import Parser from "rss-parser";

/**
 * Build-time Substack feed client.
 *
 * Substack has no official API, but every publication exposes a stable RSS
 * feed. We fetch and parse it in Node during `next build` (no CORS, no runtime
 * cost) and surface the latest posts as a typed, sorted, length-capped list.
 *
 * This module never throws: on any failure (network, non-200, timeout,
 * malformed XML) it logs a single warning and returns an empty list, so a
 * flaky feed can never take the build down.
 */

/** A single Substack post, shaped to feed the landing page's `posts` prop. */
export type SubstackPost = {
  /** Post title. */
  title: string;
  /** Canonical Substack post URL (opened in a new tab). */
  href: string;
  /** Human-readable date for display, e.g. "Jul 21, 2026". */
  date: string;
  /** Original `pubDate`, kept only for sorting. */
  rawDate: string;
};

/** Substack publication feed URL (env-overridable). */
export const SUBSTACK_FEED_URL =
  process.env.SUBSTACK_FEED_URL ?? "https://mnindrazaka.substack.com/feed";

/** Substack publication archive URL, used by the "Show all" link. */
export const SUBSTACK_ARCHIVE_URL =
  process.env.SUBSTACK_ARCHIVE_URL ??
  "https://mnindrazaka.substack.com/archive";

/** Maximum number of posts surfaced in the Writing section. */
export const SUBSTACK_POST_LIMIT = 5;

/** Time budget for the feed request before we give up and return `[]`. */
const FETCH_TIMEOUT_MS = 10_000;

function formatDate(rawDate: string): string {
  return new Date(rawDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Fetch the Substack feed, parse it, sort newest-first and cap to the latest
 * {@link SUBSTACK_POST_LIMIT} posts. Never throws — returns `[]` on any error.
 */
export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

  try {
    const response = await fetch(SUBSTACK_FEED_URL, {
      signal: controller.signal,
      headers: {
        // Substack's edge (Cloudflare) 403s requests without a browser-like
        // User-Agent, which Node's default fetch doesn't send.
        "User-Agent":
          "Mozilla/5.0 (compatible; mnindrazaka.github.io build; +https://mnindrazaka.github.io)",
        Accept: "application/rss+xml, application/xml, text/xml, */*",
      },
    });

    if (!response.ok) {
      throw new Error(`Feed responded with status ${response.status}`);
    }

    const xml = await response.text();
    const feed = await new Parser().parseString(xml);

    return (feed.items ?? [])
      .filter((item) => item.title && item.link && item.pubDate)
      .map((item) => ({
        title: item.title as string,
        href: item.link as string,
        date: formatDate(item.pubDate as string),
        rawDate: item.pubDate as string,
      }))
      .sort(
        (prev, next) =>
          new Date(next.rawDate).getTime() - new Date(prev.rawDate).getTime()
      )
      .slice(0, SUBSTACK_POST_LIMIT);
  } catch (error) {
    console.warn(
      `[substack] Could not load feed from ${SUBSTACK_FEED_URL}; rendering an empty Writing section.`,
      error
    );
    return [];
  } finally {
    clearTimeout(timeout);
  }
}
