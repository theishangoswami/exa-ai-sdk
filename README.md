# Exa AI SDK

Exa web search tool for Vercel AI SDK. Add Exa web search tool to your AI applications in just a few lines of code. Giving your AI applications web search capabilites.

## Installation

```bash
npm install exa-ai-sdk
```

## Quick Start

```typescript
import { generateText } from "ai";
import { webSearch } from "exa-ai-sdk";
import { openai } from "@ai-sdk/openai";

const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What happened in San Francisco last week?',
  tools: {
    webSearch: webSearch(),
  },
});

console.log(text);
```

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

## Examples

### Custom Number of Results

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What are the best restaurants in New York?',
  tools: {
    webSearch: webSearch({ 
      numResults: 5 
    }),
  },
});
```

### Search Specific Websites

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Find TypeScript tutorials',
  tools: {
    webSearch: webSearch({
      includeDomains: ["dev.to", "medium.com"],
    }),
  },
});
```

### Search by Date Range

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What happened in AI this week?',
  tools: {
    webSearch: webSearch({
      startPublishedDate: "2025-10-20T00:00:00.000Z",
      endPublishedDate: "2025-10-27T23:59:59.999Z",
    }),
  },
});
```

### Search with Summary

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Find research papers about neural networks',
  tools: {
    webSearch: webSearch({
      type: "neural",
      category: "research paper",
      contents: {
        summary: true,
      },
    }),
  },
});
```

### Always Get Fresh Content

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What are the latest AI news?',
  tools: {
    webSearch: webSearch({
      contents: {
        livecrawl: "preferred",
      },
    }),
  },
});
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
import { webSearch, ExaSearchConfig, ExaSearchResult } from "exa-ai-sdk";

const config: ExaSearchConfig = {
  numResults: 10,
  type: "auto",
};

const search = webSearch(config);
```

## How It Works

When your AI needs information, it automatically:
1. Calls the web search tool with a query
2. Gets results from Exa's search API
3. Uses those results to answer your question

You don't do anything—the AI decides when to search!

## Links

- [API Dashboard](https://dashboard.exa.ai) - Try Exa API on the dashboard
- [Get your API Keys](https://dashboard.exa.ai/api-keys) - Get your API keys
- [Documentation](https://docs.exa.ai) - Exa API documentation
- [Exa Website](https://exa.ai) - Learn more about Exa

## License

MIT
