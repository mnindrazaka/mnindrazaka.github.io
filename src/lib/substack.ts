/**
 * Build-time Substack feed client.
 *
 * Substack has no official API, but every publication exposes a stable RSS
 * feed. Fetching that feed directly gets a 403: Substack's Cloudflare edge
 * blocks the datacenter IP ranges GitHub Actions runners use, regardless of
 * request headers. So instead we fetch through rss2json.com, a bridge
 * service that fetches the feed server-side (from its own, non-blocked IPs)
 * and returns it as JSON — still resolved once at build time in Node, no
 * client-side/runtime cost.
 *
 * This module never throws: on any failure (network, non-200, timeout,
 * malformed response) it logs a single warning and returns an empty list,
 * so a flaky feed (or bridge) can never take the build down.
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

/** rss2json bridge endpoint (env-overridable). */
const RSS2JSON_ENDPOINT =
  process.env.RSS2JSON_ENDPOINT ?? "https://api.rss2json.com/v1/api.json";

/** Time budget for the feed request before we give up and return `[]`. */
const FETCH_TIMEOUT_MS = 10_000;

type Rss2JsonItem = {
  title?: string;
  link?: string;
  pubDate?: string;
};

type Rss2JsonResponse = {
  status?: string;
  items?: Rss2JsonItem[];
};

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

  const bridgeUrl = new URL(RSS2JSON_ENDPOINT);
  bridgeUrl.searchParams.set("rss_url", SUBSTACK_FEED_URL);
  if (process.env.RSS2JSON_API_KEY) {
    bridgeUrl.searchParams.set("api_key", process.env.RSS2JSON_API_KEY);
  }

  try {
    const response = await fetch(bridgeUrl.toString(), {
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(`Feed bridge responded with status ${response.status}`);
    }

    const feed: Rss2JsonResponse = await response.json();

    if (feed.status !== "ok") {
      throw new Error(`Feed bridge returned status "${feed.status}"`);
    }

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
