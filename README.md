# Exa AI SDK

Exa web search tool for Vercel AI SDK. Add Exa web search tool to your AI applications in just a few lines of code. Giving your AI applications web search capabilites.

The AI decides when to search, sends your question to Exa, and uses the web results to answer you.

## Installation

```bash
npm install @exalabs/ai-sdk
```

## Quick Start

```typescript
import { generateText, stepCountIs } from "ai";
import { webSearch } from "@exalabs/ai-sdk";
import { openai } from "@ai-sdk/openai";

const { text } = await generateText({
  model: openai('gpt-5-nano'),
  prompt: 'Tell me the latest developments in AI',
  system: "Only use web search once per turn. Answer based on the information you have.",
  tools: {
    webSearch: webSearch(),
  },
  stopWhen: stepCountIs(3),
});

console.log(text);
```

Get your API key from the [Exa Dashboard](https://dashboard.exa.ai/api-keys).

**Defaults when you use `webSearch()`:**
- Type: `auto` (best search)
- Results: `10`
- Text: `1000 characters per result`
- Livecrawl: `fallback` (fresh content when needed)

## Setup

1. Get your API key from the [Exa Dashboard](https://dashboard.exa.ai/api-keys)
2. Add it to your `.env` file:

```bash
EXA_API_KEY=your-api-key-here
```

That's it! The package reads it automatically.

## Example

Here's a full-featured example combining the most useful search settings:

```typescript
const { text } = await generateText({
  model: openai('gpt-5-nano'),
  prompt: 'Find the top AI companies in Europe founded after 2018',
  tools: {
    webSearch: webSearch({
      type: "auto",                           // intelligent hybrid search
      numResults: 6,                          // return up to 6 results
      category: "company",                    // focus on companies
      contents: {
        text: { maxCharacters: 1000 },        // get up to 1000 chars per result
        livecrawl: "preferred",               // always get fresh content if possible
        summary: true,                        // return an AI-generated summary for each result
      },
    }),
  },
  stopWhen: stepCountIs(5),
});

console.log(text);
```

## All Options

```typescript
webSearch({
  // Search settings
  type: "auto",           // "auto", "keyword", "neural", "fast", "deep"
  category: "news",       // "company", "research paper", "news", "pdf", 
                          // "github", "personal site", "linkedin profile", "financial report"
  numResults: 10,
  
  // Filter by domain
  includeDomains: ["linkedin.com", "github.com"],
  excludeDomains: ["wikipedia.com"],
  
  // Filter by date (ISO 8601)
  startPublishedDate: "2025-01-01T00:00:00.000Z",
  endPublishedDate: "2025-12-31T23:59:59.999Z",
  startCrawlDate: "2025-01-01T00:00:00.000Z",
  endCrawlDate: "2025-12-31T23:59:59.999Z",
  
  // Filter by text
  includeText: ["AI"],    // Must contain
  excludeText: ["spam"],  // Must not contain
  
  // Location
  userLocation: "US",     // Two-letter country code
  
  // Content options
  contents: {
    text: {
      maxCharacters: 1000,
      includeHtmlTags: false,
    },
    summary: {
      query: "Main points",
    },
    livecrawl: "fallback",     // "never", "fallback", "always", "preferred"
    livecrawlTimeout: 10000,
    subpages: 5,
    subpageTarget: "about",
    extras: {
      links: 5,
      imageLinks: 3,
    },
  },
})
```

## TypeScript Support

Full TypeScript types included:

```typescript
import { webSearch, ExaSearchConfig, ExaSearchResult } from "@exalabs/ai-sdk";

const config: ExaSearchConfig = {
  numResults: 10,
  type: "auto",
};

const search = webSearch(config);
```

## Links

- [API Dashboard](https://dashboard.exa.ai) - Try Exa API on the dashboard
- [Get your API Keys](https://dashboard.exa.ai/api-keys) - Get your API keys
- [Documentation](https://docs.exa.ai) - Exa API documentation
- [Exa Website](https://exa.ai) - Learn more about Exa

## License

MIT
