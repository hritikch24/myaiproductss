// RAG-lite: Web search for real-time context injection
// Uses DuckDuckGo HTML search (no API key needed) + optional Google Custom Search

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

// Determine if a query needs real-time web data
export function needsWebSearch(message: string): boolean {
  const lowerMsg = message.toLowerCase();

  // Time-sensitive keywords
  const realtimeKeywords = [
    "latest",
    "recent",
    "today",
    "yesterday",
    "this week",
    "this month",
    "this year",
    "2024",
    "2025",
    "2026",
    "current",
    "now",
    "update",
    "news",
    "score",
    "result",
    "price",
    "stock",
    "market",
    "weather",
    "election",
    "budget",
    "policy",
    "announced",
    "launched",
    "released",
    "new scheme",
    "new rule",
    "amendment",
    "notification",
    "circular",
    "deadline",
    "last date",
    "upcoming",
    "schedule",
    "fixture",
    "standing",
    "ranking",
    "ipl",
    "world cup",
    "olympics",
    "trending",
    "viral",
    "breaking",
  ];

  if (realtimeKeywords.some((kw) => lowerMsg.includes(kw))) {
    return true;
  }

  // Questions about specific events, people in current context
  const questionPatterns = [
    /who (is|was|won|lost|scored|leads?)/i,
    /what (happened|is happening|are the|is the latest)/i,
    /when (is|was|will|does)/i,
    /how much (does|is|are|did)/i,
    /is .+ (open|closed|available|eligible|live)/i,
  ];

  return questionPatterns.some((pattern) => pattern.test(message));
}

// Search using DuckDuckGo Lite (no API key needed, reliable HTML parsing)
async function searchDuckDuckGo(query: string): Promise<SearchResult[]> {
  try {
    const url = `https://lite.duckduckgo.com/lite/?q=${encodeURIComponent(query)}`;
    const response = await fetch(url, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
        Accept: "text/html",
      },
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) return [];

    const html = await response.text();
    const results: SearchResult[] = [];

    // DuckDuckGo Lite uses <td> elements in a table
    // Pattern: link row → snippet row → URL row (repeating)
    // Links contain uddg= parameter with the actual URL
    const linkMatches = [
      ...html.matchAll(
        /uddg=(https?%3A%2F%2F[^&"]+)[^>]*>([\s\S]*?)<\/a>/g
      ),
    ];
    const snippetMatches = [
      ...html.matchAll(
        /class="result-snippet">([\s\S]*?)<\/td>/g
      ),
    ];

    // If result-snippet class doesn't exist, try parsing <td> blocks
    if (snippetMatches.length === 0) {
      // Parse the table structure: each result has 4 <td> rows
      const rows = html.split("<tr>");
      let currentTitle = "";
      let currentUrl = "";

      for (const row of rows) {
        // Link row: contains uddg= URL and title text
        const linkMatch = row.match(
          /uddg=(https?%3A%2F%2F[^&"]+)[^>]*>([\s\S]*?)<\/a>/
        );
        if (linkMatch) {
          currentUrl = decodeURIComponent(linkMatch[1]);
          currentTitle = decodeHtmlEntities(
            linkMatch[2].replace(/<[^>]*>/g, "")
          );
          continue;
        }

        // Snippet row: plain text in a <td> after a title was found
        if (currentTitle) {
          const snippetMatch = row.match(
            /<td[^>]*>([\s\S]{20,}?)<\/td>/
          );
          if (snippetMatch) {
            const snippet = decodeHtmlEntities(
              snippetMatch[1].replace(/<[^>]*>/g, "")
            );
            if (snippet.length > 20 && !snippet.startsWith("http")) {
              results.push({
                title: currentTitle,
                snippet,
                url: currentUrl,
              });
              currentTitle = "";
              currentUrl = "";
            }
          }
        }

        if (results.length >= 5) break;
      }
    } else {
      // Use result-snippet class if available
      for (
        let i = 0;
        i < Math.min(linkMatches.length, snippetMatches.length, 5);
        i++
      ) {
        const resultUrl = decodeURIComponent(linkMatches[i][1]);
        const title = decodeHtmlEntities(
          linkMatches[i][2].replace(/<[^>]*>/g, "")
        );
        const snippet = decodeHtmlEntities(
          snippetMatches[i][1].replace(/<[^>]*>/g, "")
        );

        if (title && snippet) {
          results.push({ title, snippet, url: resultUrl });
        }
      }
    }

    return results;
  } catch (error) {
    console.error("DuckDuckGo search error:", error);
    return [];
  }
}

// Search using Google Custom Search API (if configured)
async function searchGoogle(query: string): Promise<SearchResult[]> {
  const apiKey = process.env.GOOGLE_SEARCH_API_KEY;
  const cx = process.env.GOOGLE_SEARCH_CX;

  if (!apiKey || !cx) return [];

  try {
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${cx}&q=${encodeURIComponent(query)}&num=5`;
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
    });

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
    console.error("Google search error:", error);
    return [];
  }
}

// Main search function — tries Google first (if configured), falls back to DuckDuckGo
export async function webSearch(query: string): Promise<SearchResult[]> {
  // Try Google Custom Search first
  if (process.env.GOOGLE_SEARCH_API_KEY) {
    const googleResults = await searchGoogle(query);
    if (googleResults.length > 0) return googleResults;
  }

  // Fall back to DuckDuckGo
  return searchDuckDuckGo(query);
}

// Format search results into context for the LLM
export function formatSearchContext(
  results: SearchResult[],
  query: string
): string {
  if (results.length === 0) return "";

  const formattedResults = results
    .map(
      (r, i) =>
        `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.url}`
    )
    .join("\n\n");

  return `\n\nWEB SEARCH RESULTS (for query: "${query}"):\nThe following are recent web search results. Use this information to provide up-to-date, accurate answers. Cite sources when relevant.\n\n${formattedResults}\n\nIMPORTANT: Use the above search results to ground your response in current facts. If the search results contradict your training data, prefer the search results as they are more recent. If the search results don't cover the user's question, use your training knowledge but mention that the information may not be the most current.`;
}
