/**
 * Text content options
 */
export interface TextOptions {
  /** Maximum characters for the text content */
  maxCharacters?: number;
  /** Include HTML tags in the response */
  includeHtmlTags?: boolean;
}

/**
 * Summary options
 */
export interface SummaryOptions {
  /** Custom query for the summary */
  query?: string;
}

/**
 * Extras options
 */
export interface ExtrasOptions {
  /** Number of links to return from each page */
  links?: number;
  /** Number of image links to return */
  imageLinks?: number;
}

/**
 * Contents configuration - controls what content to retrieve from search results
 */
export interface ContentsOptions {
  /** Get page text content. Pass true or an object with options (default: {maxCharacters: 1000}) */
  text?: boolean | TextOptions;
  /** Get AI-generated summary */
  summary?: boolean | SummaryOptions;
  /** Livecrawl mode (default: "fallback"): "never", "fallback", "always", "preferred" */
  livecrawl?: "never" | "fallback" | "always" | "preferred";
  /** Livecrawl timeout in milliseconds */
  livecrawlTimeout?: number;
  /** Number of subpages to crawl */
  subpages?: number;
  /** Keyword to find specific subpages */
  subpageTarget?: string | string[];
  /** Extra content to retrieve */
  extras?: ExtrasOptions;
}

/**
 * Main search configuration
 */
export interface ExaSearchConfig {
  /**
   * Your Exa API key. Get one at https://dashboard.exa.ai/api-keys
   * Defaults to process.env.EXA_API_KEY
   */
  apiKey?: string;
  
  /**
   * Search type (default: "auto")
   * - auto: Best search, intelligently combines keyword and neural
   * - keyword: Fast keyword search
   * - neural: Deep semantic search
   * - fast: Streamlined versions of neural and keyword
   * - deep: Comprehensive deep search with enhanced analysis
   */
  type?: "auto" | "keyword" | "neural" | "fast" | "deep";
  
  /**
   * Category to focus the search on
   */
  category?: "company" | "research paper" | "news" | "pdf" | "github" | "personal site" | "linkedin profile" | "financial report";
  
  /**
   * Two-letter ISO country code for localized results (e.g., "US")
   */
  userLocation?: string;
  
  /**
   * Number of results to return (default: 8)
   * Keyword max: 10, Neural max: 100
   */
  numResults?: number;
  
  /**
   * List of domains to include (e.g., ["arxiv.org", "github.com"])
   */
  includeDomains?: string[];
  
  /**
   * List of domains to exclude
   */
  excludeDomains?: string[];
  
  /**
   * Return results crawled after this date (ISO 8601 format)
   */
  startCrawlDate?: string;
  
  /**
   * Return results crawled before this date (ISO 8601 format)
   */
  endCrawlDate?: string;
  
  /**
   * Return results published after this date (ISO 8601 format)
   */
  startPublishedDate?: string;
  
  /**
   * Return results published before this date (ISO 8601 format)
   */
  endPublishedDate?: string;
  
  /**
   * Text that must be present in results (max 1 string, up to 5 words)
   */
  includeText?: string[];
  
  /**
   * Text that must not be present in results (max 1 string, up to 5 words)
   */
  excludeText?: string[];
  
  /**
   * Contents options - what to retrieve from each result
   */
  contents?: ContentsOptions;
}

/**
 * Search result returned from Exa
 */
export interface ExaSearchResult {
  /** Title of the page */
  title: string;
  /** URL of the page */
  url: string;
  /** Unique ID for the result */
  id?: string;
  /** Published date (ISO 8601 format) */
  publishedDate?: string;
  /** Author of the content */
  author?: string;
  /** URL of an image associated with the result */
  image?: string;
  /** URL of the favicon */
  favicon?: string;
  /** Full text content of the page */
  text?: string;
  /** AI-generated summary */
  summary?: string;
  /** Array of subpages */
  subpages?: ExaSearchResult[];
  /** Extra content (links, images) */
  extras?: {
    links?: string[];
    imageLinks?: string[];
  };
}

/**
 * API response from Exa search endpoint
 */
export interface ExaApiResponse {
  requestId?: string;
  resolvedSearchType?: "neural" | "keyword" | "fast" | "deep";
  results: ExaSearchResult[];
}

