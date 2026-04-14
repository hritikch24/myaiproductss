// RAG-lite: Web search for real-time context injection
// Multiple search providers for reliability

interface SearchResult {
  title: string;
  snippet: string;
  url: string;
}

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, ""));
}

// Always search — the LLM benefits from real-time context
export function needsWebSearch(_message: string): boolean {
  return true;
}

// Provider 1: DuckDuckGo Lite
async function searchDuckDuckGoLite(query: string): Promise<SearchResult[]> {
  try {
    const url = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml",
        "Accept-Language": "en-US,en;q=0.9",
      },
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) return [];

    const html = await response.text();
    const results: SearchResult[] = [];
    const rows = html.split("<tr>");
    let currentTitle = "";
    let currentUrl = "";

    for (const row of rows) {
      const linkMatch = row.match(/uddg=(https?%3A%2F%2F[^&"]+)[^>]*>([\s\S]*?)<\/a>/);
      if (linkMatch) {
        currentUrl = decodeURIComponent(linkMatch[1]);
        currentTitle = stripHtml(linkMatch[2]);
        continue;
      }

      if (currentTitle) {
        const snippetMatch = row.match(/<td[^>]*>([\s\S]{20,}?)<\/td>/);
        if (snippetMatch) {
          const snippet = stripHtml(snippetMatch[1]);
          if (snippet.length > 20 && !snippet.startsWith("http")) {
            results.push({ title: currentTitle, snippet, url: currentUrl });
            currentTitle = "";
            currentUrl = "";
          }
        }
      }
      if (results.length >= 5) break;
    }

    return results;
  } catch (error) {
    console.error("[Search] DuckDuckGo Lite failed:", error);
    return [];
  }
}

// Provider 2: DuckDuckGo HTML (fallback)
async function searchDuckDuckGoHtml(query: string): Promise<SearchResult[]> {
  try {
    const url = `https://html.duckduckgo.com/html/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36",
      },
      body: `q=${encodeURIComponent(query)}`,
      signal: AbortSignal.timeout(4000),
    });

    if (!response.ok) return [];

    const html = await response.text();
    const results: SearchResult[] = [];

    // Try multiple selectors
    const blocks = html.split(/class="result[_ ]?/);
    for (let i = 1; i < Math.min(blocks.length, 8); i++) {
      const block = blocks[i];
      const titleMatch = block.match(/href="[^"]*uddg=([^&"]+)[^"]*"[^>]*>([\s\S]*?)<\/a>/);
      const snippetMatch = block.match(/snippet[^>]*>([\s\S]*?)<\//);

      if (titleMatch && snippetMatch) {
        results.push({
          title: stripHtml(titleMatch[2]),
          snippet: stripHtml(snippetMatch[1]),
          url: decodeURIComponent(titleMatch[1]),
        });
      }
      if (results.length >= 5) break;
    }
    return results;
  } catch (error) {
    console.error("[Search] DuckDuckGo HTML failed:", error);
    return [];
  }
}

// Provider 3: Google Custom Search (if API key configured)
async function searchGoogle(query: string): Promise<SearchResult[]> {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_CX;
  if (!apiKey || !cx) return [];

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&num=5`;
    const response = await fetch(url, { signal: AbortSignal.timeout(4000) });
    if (!response.ok) return [];

    const data = await response.json();
    return (data.items || []).slice(0, 5).map(
      (item: { title: string; snippet: string; link: string }) => ({
        title: item.title,
        snippet: item.snippet,
        url: item.link,
      })
    );
  } catch (error) {
    console.error("[Search] Google failed:", error);
    return [];
  }
}

// Provider 4: Brave Search API (if configured)
async function searchBrave(query: string): Promise<SearchResult[]> {
  const apiKey = process.env.BRAVE_SEARCH_API_KEY;
  if (!apiKey) return [];

  try {
    const url = `https://api.search.brave.com/res/v1/web/search?q=${encodeURIComponent(query)}&count=5`;
    const response = await fetch(url, {
      headers: { "X-Subscription-Token": apiKey, Accept: "application/json" },
      signal: AbortSignal.timeout(4000),
    });
    if (!response.ok) return [];

    const data = await response.json();
    return (data.web?.results || []).slice(0, 5).map(
      (item: { title: string; description: string; url: string }) => ({
        title: item.title,
        snippet: item.description,
        url: item.url,
      })
    );
  } catch (error) {
    console.error("[Search] Brave failed:", error);
    return [];
  }
}

// Main search — tries all providers with fallback chain
export async function webSearch(query: string): Promise<SearchResult[]> {
  // Priority: Google API > Brave API > DuckDuckGo Lite > DuckDuckGo HTML
  if (process.env.GOOGLE_SEARCH_API_KEY) {
    const results = await searchGoogle(query);
    if (results.length > 0) return results;
  }

  if (process.env.BRAVE_SEARCH_API_KEY) {
    const results = await searchBrave(query);
    if (results.length > 0) return results;
  }

  // Try both DuckDuckGo methods in parallel, use whichever returns first
  const [liteResults, htmlResults] = await Promise.allSettled([
    searchDuckDuckGoLite(query),
    searchDuckDuckGoHtml(query),
  ]);

  const lite = liteResults.status === "fulfilled" ? liteResults.value : [];
  const html = htmlResults.status === "fulfilled" ? htmlResults.value : [];

  return lite.length > 0 ? lite : html;
}

// Format search results into context for the LLM
export function formatSearchContext(results: SearchResult[], query: string): string {
  if (results.length === 0) return "";

  const today = new Date().toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedResults = results
    .map((r, i) => `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.url}`)
    .join("\n\n");

  return `\n\nREAL-TIME WEB SEARCH RESULTS (searched on: ${today}, query: "${query}"):\n${formattedResults}\n\nINSTRUCTIONS FOR USING SEARCH RESULTS:\n- Use the above search results to provide up-to-date, accurate answers.\n- Prefer search results over your training data for current events, prices, scores, policies, and dates.\n- Cite sources naturally (e.g., "According to [source]...").\n- If search results are insufficient, supplement with your knowledge but note it may not be current.`;
}
