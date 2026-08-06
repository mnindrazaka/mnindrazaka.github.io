/**
 * Build-time Substack feed client.
 *
 * Substack has no *documented* API, but the publication frontend itself
 * calls an internal JSON endpoint (`/api/v1/posts`) to render the archive
 * page, and every publication also exposes a stable RSS feed at `/feed`.
 * Fetching either directly gets a 403 from Substack's Cloudflare edge: it
 * blocks datacenter IP ranges (GitHub Actions runners among them),
 * regardless of request headers or which path is requested. We previously
 * routed around this through a single bridge service (rss2json.com) that
 * fetched the RSS feed server-side from its own IPs — but Substack has
 * since started blocking that bridge's IPs too.
 *
 * Since this is IP/ASN-reputation blocking rather than anything specific to
 * one path or one bridge, no single source is safe to depend on alone. So
 * instead we try a short list of independent strategies, in order, and use
 * whichever succeeds first:
 *
 *   1. The JSON API, fetched directly.
 *   2. The JSON API, fetched through a couple of unrelated proxy services.
 *   3. The RSS feed, fetched directly.
 *   4. The RSS feed, through rss2json, then through the same proxies.
 *
 * Losing any one source or bridge degrades resilience rather than breaking
 * the build outright, and this module never throws: if every strategy
 * fails (network, non-200, timeout, malformed response) it logs a single
 * warning and returns an empty list.
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

/** A raw feed/API entry, before formatting/filtering. */
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

/** Substack's internal posts API, same one the publication frontend calls. */
const SUBSTACK_API_URL =
  process.env.SUBSTACK_API_URL ??
  `${new URL(SUBSTACK_FEED_URL).origin}/api/v1/posts?limit=${SUBSTACK_POST_LIMIT}`;

/** rss2json bridge endpoint (env-overridable). */
const RSS2JSON_ENDPOINT =
  process.env.RSS2JSON_ENDPOINT ?? "https://api.rss2json.com/v1/api.json";

/** Time budget per strategy attempt before moving on to the next one. */
const FETCH_TIMEOUT_MS = 10_000;

async function fetchText(url: string): Promise<string> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
  try {
    const response = await fetch(url, { signal: controller.signal });
    if (!response.ok) {
      throw new Error(`responded with status ${response.status}`);
    }
    return await response.text();
  } finally {
    clearTimeout(timeout);
  }
}

type Parser = (raw: string) => FeedItem[];

/** Fetch a URL directly. Works whenever the caller's IP isn't blocked. */
function fetchDirect(url: string, parse: Parser): () => Promise<FeedItem[]> {
  return async () => parse(await fetchText(url));
}

/** Fetch a URL through AllOrigins, a generic open-source CORS/fetch proxy. */
function fetchViaAllOrigins(
  url: string,
  parse: Parser
): () => Promise<FeedItem[]> {
  return async () =>
    parse(
      await fetchText(`https://api.allorigins.win/raw?url=${encodeURIComponent(url)}`)
    );
}

/** Fetch a URL through corsproxy.io, another independently-run proxy. */
function fetchViaCorsProxy(
  url: string,
  parse: Parser
): () => Promise<FeedItem[]> {
  return async () =>
    parse(await fetchText(`https://corsproxy.io/?url=${encodeURIComponent(url)}`));
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

/** A post as returned by Substack's internal `/api/v1/posts` endpoint. */
type SubstackApiPost = {
  title?: string;
  canonical_url?: string;
  post_date?: string;
};

/**
 * Parse the response body of `/api/v1/posts`. Normally a bare JSON array;
 * tolerate a `{ posts: [...] }` wrapper too in case the shape changes.
 */
function parseApiItems(json: string): FeedItem[] {
  const parsed: unknown = JSON.parse(json);
  const posts: SubstackApiPost[] = Array.isArray(parsed)
    ? parsed
    : ((parsed as { posts?: SubstackApiPost[] })?.posts ?? []);

  return posts.map((post) => ({
    title: post.title,
    link: post.canonical_url,
    pubDate: post.post_date,
  }));
}

type Rss2JsonResponse = {
  status?: string;
  items?: FeedItem[];
};

/** Fetch the RSS feed through the rss2json bridge. */
async function fetchViaRss2Json(): Promise<FeedItem[]> {
  const bridgeUrl = new URL(RSS2JSON_ENDPOINT);
  bridgeUrl.searchParams.set("rss_url", SUBSTACK_FEED_URL);
  if (process.env.RSS2JSON_API_KEY) {
    bridgeUrl.searchParams.set("api_key", process.env.RSS2JSON_API_KEY);
  }

  const feed: Rss2JsonResponse = JSON.parse(
    await fetchText(bridgeUrl.toString())
  );
  if (feed.status !== "ok") {
    throw new Error(`rss2json returned status "${feed.status}"`);
  }

  return feed.items ?? [];
}

/**
 * Strategies are tried in order; the first to return a non-empty item list
 * wins. The JSON API goes first (it's the richer, purpose-built source);
 * the RSS feed is the fallback tier in case the API endpoint ever changes.
 */
const FEED_STRATEGIES: { name: string; run: () => Promise<FeedItem[]> }[] = [
  { name: "api-direct", run: fetchDirect(SUBSTACK_API_URL, parseApiItems) },
  {
    name: "api-via-allorigins",
    run: fetchViaAllOrigins(SUBSTACK_API_URL, parseApiItems),
  },
  {
    name: "api-via-corsproxy",
    run: fetchViaCorsProxy(SUBSTACK_API_URL, parseApiItems),
  },
  { name: "rss-direct", run: fetchDirect(SUBSTACK_FEED_URL, parseRssItems) },
  { name: "rss-via-rss2json", run: fetchViaRss2Json },
  {
    name: "rss-via-allorigins",
    run: fetchViaAllOrigins(SUBSTACK_FEED_URL, parseRssItems),
  },
  {
    name: "rss-via-corsproxy",
    run: fetchViaCorsProxy(SUBSTACK_FEED_URL, parseRssItems),
  },
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
 * Fetch the latest Substack posts, sort newest-first and cap to
 * {@link SUBSTACK_POST_LIMIT}. Tries each strategy in {@link FEED_STRATEGIES}
 * until one succeeds. Never throws — returns `[]` if every strategy fails.
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
    `[substack] Could not load posts from ${SUBSTACK_FEED_URL} via any strategy; rendering an empty Writing section.`,
    errors
  );
  return [];
}
