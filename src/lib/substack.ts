/**
 * Build-time Substack feed client.
 *
 * Substack has no official API, but every publication exposes a stable RSS
 * feed. Fetching that feed directly gets a 403: Substack's Cloudflare edge
 * blocks datacenter IP ranges (GitHub Actions runners among them), regardless
 * of request headers. We previously routed around this through a single
 * bridge service (rss2json.com) that fetched the feed server-side from its
 * own IPs — but Substack has since started blocking that bridge's IPs too.
 * Since this is IP/ASN-reputation blocking rather than anything specific to
 * one bridge, any single third-party fetcher can go the same way at any
 * time. So instead of depending on one bridge, we try a short list of
 * independent strategies in order (a direct fetch, then a couple of
 * unrelated proxy services) and use the first one that succeeds. Losing any
 * one of them degrades resilience rather than breaking the build outright.
 *
 * This module never throws: if every strategy fails (network, non-200,
 * timeout, malformed response) it logs a single warning and returns an
 * empty list, so a flaky feed (or every bridge at once) can never take the
 * build down.
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

/** A raw feed entry, before formatting/filtering. */
type FeedItem = {
  title?: string;
  link?: string;
  pubDate?: string;
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

/** Time budget per strategy attempt before moving on to the next one. */
const FETCH_TIMEOUT_MS = 10_000;

async function fetchWithTimeout(
  url: string,
  init?: RequestInit
): Promise<Response> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Pull `<title>`, `<link>` and `<pubDate>` out of every `<item>` in an RSS
 * 2.0 document. Substack's feed shape is simple and predictable enough that
 * a small regex-based extractor avoids pulling in a full XML parser
 * dependency for three fields.
 */
function parseRssItems(xml: string): FeedItem[] {
  const itemBlocks = xml.match(/<item\b[\s\S]*?<\/item>/g) ?? [];
  return itemBlocks.map((block) => ({
    title: extractTag(block, "title"),
    link: extractTag(block, "link"),
    pubDate: extractTag(block, "pubDate"),
  }));
}

function extractTag(xml: string, tag: string): string | undefined {
  const match = xml.match(new RegExp(`<${tag}[^>]*>([\\s\\S]*?)<\\/${tag}>`));
  if (!match) return undefined;

  const raw = match[1].trim();
  const cdataMatch = raw.match(/^<!\[CDATA\[([\s\S]*)\]\]>$/);
  const text = cdataMatch ? cdataMatch[1] : raw;

  return decodeXmlEntities(text.trim());
}

function decodeXmlEntities(text: string): string {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#0?39;/g, "'")
    .replace(/&amp;/g, "&");
}

type Rss2JsonResponse = {
  status?: string;
  items?: FeedItem[];
};

/** Fetch the feed directly. Works whenever the caller's IP isn't blocked. */
async function fetchDirect(): Promise<FeedItem[]> {
  const response = await fetchWithTimeout(SUBSTACK_FEED_URL);
  if (!response.ok) {
    throw new Error(`Direct fetch responded with status ${response.status}`);
  }
  return parseRssItems(await response.text());
}

/** Fetch through the rss2json bridge, which resolves the feed server-side. */
async function fetchViaRss2Json(): Promise<FeedItem[]> {
  const bridgeUrl = new URL(RSS2JSON_ENDPOINT);
  bridgeUrl.searchParams.set("rss_url", SUBSTACK_FEED_URL);
  if (process.env.RSS2JSON_API_KEY) {
    bridgeUrl.searchParams.set("api_key", process.env.RSS2JSON_API_KEY);
  }

  const response = await fetchWithTimeout(bridgeUrl.toString());
  if (!response.ok) {
    throw new Error(`rss2json responded with status ${response.status}`);
  }

  const feed: Rss2JsonResponse = await response.json();
  if (feed.status !== "ok") {
    throw new Error(`rss2json returned status "${feed.status}"`);
  }

  return feed.items ?? [];
}

/** Fetch through AllOrigins, a generic open-source CORS/fetch proxy. */
async function fetchViaAllOrigins(): Promise<FeedItem[]> {
  const bridgeUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
    SUBSTACK_FEED_URL
  )}`;
  const response = await fetchWithTimeout(bridgeUrl);
  if (!response.ok) {
    throw new Error(`AllOrigins responded with status ${response.status}`);
  }
  return parseRssItems(await response.text());
}

/** Fetch through corsproxy.io, another generic, independently-run proxy. */
async function fetchViaCorsProxy(): Promise<FeedItem[]> {
  const bridgeUrl = `https://corsproxy.io/?url=${encodeURIComponent(
    SUBSTACK_FEED_URL
  )}`;
  const response = await fetchWithTimeout(bridgeUrl);
  if (!response.ok) {
    throw new Error(`corsproxy.io responded with status ${response.status}`);
  }
  return parseRssItems(await response.text());
}

/**
 * Strategies are tried in order; the first to return a non-empty item list
 * wins. Ordered roughly cheapest/most-direct first.
 */
const FEED_STRATEGIES: { name: string; run: () => Promise<FeedItem[]> }[] = [
  { name: "direct", run: fetchDirect },
  { name: "rss2json", run: fetchViaRss2Json },
  { name: "allorigins", run: fetchViaAllOrigins },
  { name: "corsproxy.io", run: fetchViaCorsProxy },
];

function formatDate(rawDate: string): string {
  return new Date(rawDate).toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toSubstackPosts(items: FeedItem[]): SubstackPost[] {
  return items
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
}

/**
 * Fetch the Substack feed, parse it, sort newest-first and cap to the latest
 * {@link SUBSTACK_POST_LIMIT} posts. Tries each strategy in
 * {@link FEED_STRATEGIES} until one succeeds. Never throws — returns `[]`
 * if every strategy fails.
 */
export async function fetchSubstackPosts(): Promise<SubstackPost[]> {
  const errors: string[] = [];

  for (const strategy of FEED_STRATEGIES) {
    try {
      const items = await strategy.run();
      const posts = toSubstackPosts(items);
      if (posts.length > 0) {
        return posts;
      }
      errors.push(`${strategy.name}: returned no usable items`);
    } catch (error) {
      errors.push(
        `${strategy.name}: ${error instanceof Error ? error.message : error}`
      );
    }
  }

  console.warn(
    `[substack] Could not load feed from ${SUBSTACK_FEED_URL} via any strategy; rendering an empty Writing section.`,
    errors
  );
  return [];
}
