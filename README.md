# @exa/ai-sdk

Exa web search tool for Vercel AI SDK. Add powerful web search to your AI applications in just a few lines of code.

## Installation

```bash
npm install @exa/ai-sdk
```

## Quick Start

The simplest way to add web search to your AI app:

```typescript
import { generateText } from "ai";
import { webSearch } from "@exa/ai-sdk";
import { openai } from "@ai-sdk/openai";

const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What happened in San Francisco last week?',
  tools: {
    webSearch: webSearch(), // That's it! 
  },
});

console.log(text);
```

**Default behavior** (when you call `webSearch()` with no config):
- Search type: `auto` (best results)
- Number of results: `10`
- Text content: `1000 characters per result`
- Livecrawl: `fallback` (uses cache, falls back to fresh crawl if needed)

## Get Your API Key

1. Go to [exa.ai](https://exa.ai)
2. Sign up for an account
3. Get your API key from the dashboard
4. Set it as `EXA_API_KEY` in your `.env` file

```bash
# .env
EXA_API_KEY=your-api-key-here
```

That's it! The package automatically reads from your environment variables.

## Configuration Options

Want to customize? All options are optional and have smart defaults:

```typescript
const search = webSearch({
  // Basic search options
  numResults: 10, // default: 10
  type: "auto", // default: "auto" | also: "keyword", "neural", "fast", "deep"
  category: "research paper", // optional: focus on specific content types
  
  // Filter by domains
  includeDomains: ["linkedin.com", "github.com"],
  excludeDomains: ["wikipedia.com"],
  
  // Filter by date range (ISO 8601 format)
  startPublishedDate: "2025-01-01T00:00:00.000Z",
  endPublishedDate: "2025-12-31T23:59:59.999Z",
  
  // Filter by text content
  includeText: ["large language model"],
  excludeText: ["course"],
  
  // Localize results
  userLocation: "US",
  
  // Contents options - what to retrieve from each result
  contents: {
    // Get text content (default: {maxCharacters: 1000})
    text: {
      maxCharacters: 1000, // default: 1000
    },
    
    // Get AI-generated summary (optional)
    summary: {
      query: "Main points",
    },
    
    // Livecrawl for fresh content (default: "fallback")
    livecrawl: "fallback", // default: "fallback" | also: "never", "always", "preferred"
    
    // Get subpages
    subpages: 2,
    subpageTarget: "sources",
    
    // Get extra content
    extras: {
      links: 5,
      imageLinks: 3,
    },
  },
});
```

## Examples

### Search Recent News

```typescript
import { generateText } from "ai";
import { webSearch } from "@exa/ai-sdk";
import { openai } from "@ai-sdk/openai";

const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What are the latest developments in AI?',
  tools: {
    webSearch: webSearch({
      numResults: 5,
      startPublishedDate: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    }),
  },
});
```

### Search Specific Websites

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Find articles about TypeScript best practices',
  tools: {
    webSearch: webSearch({
      includeDomains: ["dev.to", "medium.com"],
      numResults: 10,
    }),
  },
});
```

### Deep Semantic Search with Summaries

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'Find research papers about neural networks',
  tools: {
    webSearch: webSearch({
      type: "neural", // Use semantic search
      category: "research paper",
      numResults: 8,
      contents: {
        text: { maxCharacters: 2000 },
        summary: { query: "Main contributions" },
      },
    }),
  },
});
```

### With Livecrawl (Always Fresh Content)

```typescript
const { text } = await generateText({
  model: openai('gpt-4o-mini'),
  prompt: 'What are the latest AI news today?',
  tools: {
    webSearch: webSearch({
      numResults: 5,
      category: "news",
      contents: {
        text: true,
        livecrawl: "preferred", // Always fetch fresh content, with fallback on cache
      },
    }),
  },
});
```

### With Streaming

```typescript
import { streamText } from "ai";
import { webSearch } from "@exa/ai-sdk";
import { openai } from "@ai-sdk/openai";

const result = streamText({
  model: openai('gpt-4o-mini'),
  prompt: 'What are the best restaurants in New York?',
  tools: {
    webSearch: webSearch(),
  },
});

for await (const chunk of result.textStream) {
  process.stdout.write(chunk);
}
```

## Search Types

- **auto**: Best search option. Intelligently combines keyword and neural search for optimal results.
- **fast**: Streamlined versions of neural and keyword models for faster results.
- **deep**: Comprehensive deep search with enhanced analysis.
- **keyword**: Fast, Google-like keyword search. Good for exact matches.
- **neural**: Deep semantic search. Finds results based on meaning, not just keywords.

## TypeScript Support

Full TypeScript support with exported types:

```typescript
import { webSearch, ExaSearchConfig, ExaSearchResult } from "@exa/ai-sdk";

const config: ExaSearchConfig = {
  numResults: 10,
  type: "auto",
};

const search = webSearch(config);
```

## How It Works

When the AI needs information, it will:
1. Automatically call the web search tool with a query
2. Get real-time results from Exa's search API
3. Use the search results to answer your question

The AI decides when to search based on your prompt!

## Support

- Documentation: [exa.ai/docs](https://exa.ai/docs)
- Email: hello@exa.ai

## License

MIT

