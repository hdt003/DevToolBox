import { ToolDefinition, CategoryInfo, ToolCategory } from "../types/tool";

export const CATEGORIES: CategoryInfo[] = [
  {
    id: "json",
    name: "JSON & Data",
    description: "Format, validate, and convert JSON & CSV datasets",
    iconName: "FileJson",
  },
  {
    id: "encoding",
    name: "Encoding & Decoding",
    description: "Base64, URL, and HTML entity encoder/decoder utilities",
    iconName: "Binary",
  },
  {
    id: "security",
    name: "Security & Auth",
    description: "JWT decoder, secure hash generators, and password tools",
    iconName: "ShieldCheck",
  },
  {
    id: "regex",
    name: "Regular Expressions",
    description: "Build, test, and debug regex patterns live",
    iconName: "Code2",
  },
  {
    id: "time",
    name: "Time & Timestamps",
    description: "Convert Unix timestamps, dates, and live current time",
    iconName: "Clock",
  },
  {
    id: "cron",
    name: "Cron Jobs",
    description: "Generate and parse cron schedules with human text",
    iconName: "CalendarClock",
  },
  {
    id: "sql",
    name: "Database & SQL",
    description: "Format and minify complex SQL queries across dialects",
    iconName: "Database",
  },
  {
    id: "web",
    name: "Web & Markup",
    description: "HTML, CSS, JS, XML, YAML, and Markdown utilities",
    iconName: "Layout",
  },
  {
    id: "networking",
    name: "Networking & HTTP",
    description: "IP CIDR calculator, HTTP status codes, MIME types, UA parser",
    iconName: "Network",
  },
  {
    id: "generators",
    name: "Generators & Utility",
    description: "UUID v1/v4/v7 generators, validators, and color converter",
    iconName: "Sparkles",
  },
];

export const TOOLS: ToolDefinition[] = [
  // JSON Tools
  {
    id: "json-formatter",
    name: "JSON Formatter",
    slug: "json-formatter",
    description:
      "Format, beautify, validate, and minify raw JSON data with custom indentation.",
    category: "json",
    keywords: [
      "json",
      "format",
      "beautify",
      "minify",
      "pretty print",
      "parser",
    ],
    iconName: "FileJson",
    popular: true,
    featured: true,
    seoTitle: "JSON Formatter & Beautifier Online - Free | DevToolBox",
    seoDescription:
      "Format, validate, beautify and minify JSON instantly in your browser. Fast, free, and privacy-friendly developer tool.",
  },
  {
    id: "json-validator",
    name: "JSON Validator",
    slug: "json-validator",
    description:
      "Validate JSON structure with precise line, column, and syntax error locations.",
    category: "json",
    keywords: ["json", "validate", "check", "syntax", "errors", "linter"],
    iconName: "CheckCircle2",
    popular: true,
    seoTitle: "JSON Validator & Error Checker - DevToolBox",
    seoDescription:
      "Validate JSON syntax and discover exact line/column errors in your browser. Privacy-focused JSON validator.",
  },
  {
    id: "json-to-csv",
    name: "JSON to CSV",
    slug: "json-to-csv",
    description:
      "Convert JSON arrays and nested objects into clean downloadable CSV spreadsheets.",
    category: "json",
    keywords: ["json", "csv", "convert", "table", "export", "spreadsheet"],
    iconName: "FileSpreadsheet",
    seoTitle: "JSON to CSV Converter Online - DevToolBox",
    seoDescription:
      "Convert JSON objects and arrays to CSV format instantly in your browser.",
  },
  {
    id: "csv-to-json",
    name: "CSV to JSON",
    slug: "csv-to-json",
    description:
      "Convert CSV files or raw text into formatted JSON arrays with auto delimiter detection.",
    category: "json",
    keywords: ["csv", "json", "parse", "import", "converter", "delimiters"],
    iconName: "FileCode",
    seoTitle: "CSV to JSON Converter Online - DevToolBox",
    seoDescription:
      "Convert CSV text and upload CSV files into JSON format online.",
  },

  // Encoding Tools
  {
    id: "base64-encoder-decoder",
    name: "Base64 Encoder/Decoder",
    slug: "base64-encoder-decoder",
    description:
      "Encode text strings to Base64 format and decode Base64 back to plain text (UTF-8).",
    category: "encoding",
    keywords: ["base64", "encode", "decode", "utf8", "string", "binary"],
    iconName: "Binary",
    popular: true,
    featured: true,
    seoTitle: "Base64 Encoder & Decoder Online - DevToolBox",
    seoDescription:
      "Fast Base64 encoder and decoder tool supporting UTF-8 text in browser.",
  },
  {
    id: "url-encoder-decoder",
    name: "URL Encoder/Decoder",
    slug: "url-encoder-decoder",
    description:
      "Encode special characters for URI query strings and decode URL-encoded components.",
    category: "encoding",
    keywords: ["url", "uri", "encode", "decode", "percent encoding", "params"],
    iconName: "Link",
    popular: true,
    seoTitle: "URL Encoder & Decoder Online - DevToolBox",
    seoDescription:
      "Safely encode and decode URLs and URI query parameters online.",
  },
  {
    id: "html-entity-encoder-decoder",
    name: "HTML Entity Encoder/Decoder",
    slug: "html-entity-encoder-decoder",
    description:
      "Convert HTML special characters to named or numeric entities and decode them.",
    category: "encoding",
    keywords: ["html", "entity", "escape", "unescape", "xml", "entities"],
    iconName: "Code",
    seoTitle: "HTML Entity Encoder & Decoder - DevToolBox",
    seoDescription:
      "Escape and unescape HTML special characters and HTML entities.",
  },

  // Security Tools
  {
    id: "jwt-decoder",
    name: "JWT Decoder",
    slug: "jwt-decoder",
    description:
      "Decode JSON Web Tokens (JWT) locally to view header, payload, and signature details.",
    category: "security",
    keywords: ["jwt", "token", "decode", "bearer", "auth", "header", "payload"],
    iconName: "Key",
    popular: true,
    featured: true,
    seoTitle:
      "JWT Decoder Online - Decode JSON Web Tokens Privately | DevToolBox",
    seoDescription:
      "Decode JSON Web Tokens (JWT) locally in your browser. Never uploads your sensitive tokens to any server.",
  },
  {
    id: "hash-generator",
    name: "Hash Generator",
    slug: "hash-generator",
    description:
      "Generate cryptographic hashes (MD5, SHA-1, SHA-256, SHA-384, SHA-512) via Web Crypto API.",
    category: "security",
    keywords: ["hash", "md5", "sha256", "sha512", "crypto", "checksum"],
    iconName: "Hash",
    popular: true,
    seoTitle: "Hash Generator (MD5, SHA256, SHA512) - DevToolBox",
    seoDescription:
      "Calculate cryptographic hashes for text and files directly in your browser.",
  },
  {
    id: "password-generator",
    name: "Password Generator",
    slug: "password-generator",
    description:
      "Create cryptographically strong random passwords using window.crypto.getRandomValues().",
    category: "security",
    keywords: [
      "password",
      "generator",
      "secure",
      "random",
      "entropy",
      "credentials",
    ],
    iconName: "Lock",
    popular: true,
    seoTitle: "Strong Random Password Generator - DevToolBox",
    seoDescription:
      "Generate secure, cryptographically random passwords with custom rules right in your browser.",
  },

  // Regex Tools
  {
    id: "regex-tester",
    name: "Regex Tester",
    slug: "regex-tester",
    description:
      "Test JavaScript regular expressions live with match highlighting, capture groups, and flags.",
    category: "regex",
    keywords: [
      "regex",
      "regexp",
      "test",
      "pattern",
      "match",
      "flags",
      "groups",
    ],
    iconName: "Code2",
    popular: true,
    featured: true,
    seoTitle: "Regex Tester & Matcher Online - DevToolBox",
    seoDescription:
      "Test and debug JavaScript regular expressions online with real-time match highlights.",
  },
  {
    id: "regex-generator",
    name: "Regex Generator",
    slug: "regex-generator",
    description:
      "Generate standard regular expression patterns for emails, URLs, IPs, dates, and phone numbers.",
    category: "regex",
    keywords: [
      "regex",
      "builder",
      "generator",
      "email regex",
      "url regex",
      "ipv4",
    ],
    iconName: "Wand2",
    seoTitle: "Regex Generator & Pattern Library - DevToolBox",
    seoDescription:
      "Quickly generate production-ready regular expressions for standard string validations.",
  },

  // Time Tools
  {
    id: "timestamp-converter",
    name: "Unix Timestamp Converter",
    slug: "timestamp-converter",
    description:
      "Convert Unix epoch timestamps (seconds/ms) to UTC, Local, ISO 8601, and human dates.",
    category: "time",
    keywords: [
      "unix",
      "timestamp",
      "epoch",
      "date",
      "utc",
      "iso8601",
      "convert",
    ],
    iconName: "Clock",
    popular: true,
    featured: true,
    seoTitle: "Unix Timestamp Converter - Epoch to Date | DevToolBox",
    seoDescription:
      "Convert Unix timestamps to readable human dates and convert dates to Unix epoch seconds/ms.",
  },
  {
    id: "unix-timestamp",
    name: "Current Unix Timestamp",
    slug: "unix-timestamp",
    description:
      "Live real-time clock displaying Unix seconds, milliseconds, UTC, and local time.",
    category: "time",
    keywords: [
      "current timestamp",
      "clock",
      "now",
      "unix seconds",
      "epoch clock",
    ],
    iconName: "Timer",
    seoTitle: "Current Unix Timestamp Live Counter - DevToolBox",
    seoDescription:
      "Get current Unix epoch time in seconds and milliseconds with copy buttons.",
  },

  // Cron Tools
  {
    id: "cron-generator",
    name: "Cron Expression Generator",
    slug: "cron-generator",
    description:
      "Build valid 5-part cron expressions visually with minute, hour, day, month, and weekday controls.",
    category: "cron",
    keywords: ["cron", "generator", "schedule", "tab", "builder", "crontab"],
    iconName: "CalendarClock",
    seoTitle: "Cron Expression Generator - Visual Cron Builder | DevToolBox",
    seoDescription:
      "Visually generate crontab schedule expressions with instant plain English explanations.",
  },
  {
    id: "cron-parser",
    name: "Cron Expression Parser",
    slug: "cron-parser",
    description:
      "Parse cron schedules into plain English text explanations and calculate upcoming execution times.",
    category: "cron",
    keywords: [
      "cron",
      "parse",
      "explain",
      "human readable",
      "schedule",
      "next run",
    ],
    iconName: "FileSearch",
    seoTitle: "Cron Expression Parser & Schedule Explainer - DevToolBox",
    seoDescription:
      "Parse crontab expressions to human-readable explanations and upcoming schedule runs.",
  },

  // SQL Tools
  {
    id: "sql-formatter",
    name: "SQL Formatter",
    slug: "sql-formatter",
    description:
      "Beautify and auto-format SQL queries with customizable indentation and keyword casing.",
    category: "sql",
    keywords: [
      "sql",
      "formatter",
      "beautify",
      "queries",
      "postgres",
      "mysql",
      "sqlite",
    ],
    iconName: "Database",
    popular: true,
    seoTitle: "SQL Formatter & Query Beautifier - DevToolBox",
    seoDescription:
      "Format SQL statements with customized indentation and uppercase keywords online.",
  },
  {
    id: "sql-minifier",
    name: "SQL Minifier",
    slug: "sql-minifier",
    description:
      "Compress SQL queries by stripping whitespace and comments while preserving execution logic.",
    category: "sql",
    keywords: ["sql", "minify", "compress", "strip comments", "whitespace"],
    iconName: "Minimize2",
    seoTitle: "SQL Minifier - Compress SQL Queries | DevToolBox",
    seoDescription:
      "Minify SQL code into a single compact string without breaking query execution.",
  },

  // Web & Markup Tools
  {
    id: "html-formatter",
    name: "HTML Formatter",
    slug: "html-formatter",
    description:
      "Format, beautify, and minify HTML markup code with configurable indentation.",
    category: "web",
    keywords: ["html", "formatter", "beautify", "minify", "markup", "dom"],
    iconName: "FileCode2",
    seoTitle: "HTML Formatter & Minifier - DevToolBox",
    seoDescription:
      "Beautify or minify HTML code online directly in your browser.",
  },
  {
    id: "css-formatter",
    name: "CSS Formatter",
    slug: "css-formatter",
    description:
      "Beautify and minify CSS styles with proper indentation and rule organization.",
    category: "web",
    keywords: ["css", "formatter", "beautify", "minify", "styles", "clean"],
    iconName: "Palette",
    seoTitle: "CSS Formatter & Beautifier - DevToolBox",
    seoDescription:
      "Format and minify CSS stylesheets online for clean and readable code.",
  },
  {
    id: "javascript-formatter",
    name: "JavaScript Formatter",
    slug: "javascript-formatter",
    description:
      "Format JavaScript / TypeScript code with consistent indentation and semicolon rules.",
    category: "web",
    keywords: [
      "javascript",
      "typescript",
      "js",
      "formatter",
      "beautify",
      "prettier",
    ],
    iconName: "FileCode",
    seoTitle: "JavaScript & TypeScript Code Formatter - DevToolBox",
    seoDescription:
      "Format JavaScript and TypeScript code safely without code execution.",
  },
  {
    id: "xml-formatter",
    name: "XML Formatter",
    slug: "xml-formatter",
    description:
      "Format, beautify, validate, and minify XML data structures with error identification.",
    category: "web",
    keywords: ["xml", "formatter", "beautify", "minify", "validate", "tags"],
    iconName: "Code",
    seoTitle: "XML Formatter & Validator - DevToolBox",
    seoDescription:
      "Pretty print, validate, and minify XML documents online in browser.",
  },
  {
    id: "yaml-json-converter",
    name: "YAML to JSON",
    slug: "yaml-json-converter",
    description:
      "Convert YAML configuration documents into formatted JSON objects.",
    category: "web",
    keywords: ["yaml", "json", "convert", "yml", "parser", "config"],
    iconName: "ArrowRightLeft",
    seoTitle: "YAML to JSON Converter - DevToolBox",
    seoDescription:
      "Convert YAML text and YAML configuration files to JSON online.",
  },
  {
    id: "json-yaml-converter",
    name: "JSON to YAML",
    slug: "json-yaml-converter",
    description:
      "Convert JSON data into clean human-readable YAML configuration format.",
    category: "web",
    keywords: ["json", "yaml", "convert", "yml", "config"],
    iconName: "ArrowRightLeft",
    seoTitle: "JSON to YAML Converter - DevToolBox",
    seoDescription: "Convert JSON objects into clean YAML documents online.",
  },
  {
    id: "markdown-html",
    name: "Markdown to HTML",
    slug: "markdown-html",
    description:
      "Convert Markdown to sanitized HTML code with real-time rendered preview.",
    category: "web",
    keywords: ["markdown", "html", "convert", "preview", "md", "sanitized"],
    iconName: "FileText",
    popular: true,
    seoTitle: "Markdown to HTML Converter & Live Preview - DevToolBox",
    seoDescription:
      "Convert Markdown syntax into sanitized HTML markup with instant live preview.",
  },

  // Networking Tools
  {
    id: "ip-calculator",
    name: "IPv4 CIDR Calculator",
    slug: "ip-calculator",
    description:
      "Calculate network address, broadcast address, subnet mask, usable host IP range, and binary masks.",
    category: "networking",
    keywords: [
      "ip",
      "cidr",
      "subnet",
      "calculator",
      "broadcast",
      "network",
      "ipv4",
    ],
    iconName: "Network",
    popular: true,
    featured: true,
    seoTitle: "IPv4 Subnet & CIDR Calculator - DevToolBox",
    seoDescription:
      "Calculate IP subnet details, netmasks, broadcast addresses, and usable host counts.",
  },
  {
    id: "http-status-codes",
    name: "HTTP Status Codes",
    slug: "http-status-codes",
    description:
      "Searchable developer reference for HTTP response status codes, descriptions, and examples.",
    category: "networking",
    keywords: [
      "http",
      "status code",
      "200",
      "404",
      "500",
      "reference",
      "rest api",
    ],
    iconName: "HelpCircle",
    popular: true,
    seoTitle: "HTTP Status Codes Reference & Meanings - DevToolBox",
    seoDescription:
      "Search and inspect HTTP status code definitions, RFC standards, and developer guide.",
  },
  {
    id: "mime-type-lookup",
    name: "MIME Type Lookup",
    slug: "mime-type-lookup",
    description:
      "Lookup MIME types by file extension or find standard extensions by MIME media type.",
    category: "networking",
    keywords: [
      "mime",
      "media type",
      "content type",
      "extension",
      "lookup",
      "headers",
    ],
    iconName: "FileType",
    seoTitle: "MIME Type & Content-Type Lookup - DevToolBox",
    seoDescription:
      "Search standard MIME media types and file extensions for web and HTTP APIs.",
  },
  {
    id: "user-agent-parser",
    name: "User-Agent Parser",
    slug: "user-agent-parser",
    description:
      "Parse browser User-Agent strings locally to detect browser version, OS, engine, and device type.",
    category: "networking",
    keywords: [
      "user agent",
      "ua",
      "browser",
      "os",
      "device",
      "parse",
      "headers",
    ],
    iconName: "Laptop",
    seoTitle: "User-Agent Parser Online - DevToolBox",
    seoDescription:
      "Parse HTTP User-Agent strings locally without sending data to any remote server.",
  },

  // Generators & Utilities
  {
    id: "uuid-generator",
    name: "UUID Generator",
    slug: "uuid-generator",
    description:
      "Generate unique RFC4122 UUIDs (v1, v4, v7) in bulk with custom capitalization and hyphens.",
    category: "generators",
    keywords: ["uuid", "guid", "generator", "v4", "v1", "v7", "random id"],
    iconName: "Fingerprint",
    popular: true,
    featured: true,
    seoTitle: "UUID / GUID Generator (v1, v4, v7) - DevToolBox",
    seoDescription:
      "Generate single or bulk RFC4122 compliant UUIDs (v1, v4, v7) instantly in browser.",
  },
  {
    id: "uuid-validator",
    name: "UUID Validator",
    slug: "uuid-validator",
    description:
      "Validate UUID format, detect version (v1-v7), RFC variant, and extract embedded timestamps.",
    category: "generators",
    keywords: ["uuid", "validator", "check", "guid", "version", "variant"],
    iconName: "ShieldAlert",
    seoTitle: "UUID / GUID Validator & Version Detector - DevToolBox",
    seoDescription:
      "Validate UUID strings, verify versions, and inspect RFC variants online.",
  },
  {
    id: "color-converter",
    name: "Color Code Converter",
    slug: "color-converter",
    description:
      "Convert between HEX, RGB, RGBA, HSL, HSLA, HSV, and CMYK color representations.",
    category: "generators",
    keywords: ["color", "converter", "hex", "rgb", "hsl", "cmyk", "picker"],
    iconName: "Palette",
    popular: true,
    seoTitle: "Color Converter (HEX, RGB, HSL, CMYK) - DevToolBox",
    seoDescription:
      "Convert color codes between HEX, RGB, HSL, and CMYK with live color preview picker.",
  },
];

export function getToolBySlug(slug: string): ToolDefinition | undefined {
  return TOOLS.find((t) => t.slug === slug);
}

export function getToolsByCategory(category: ToolCategory): ToolDefinition[] {
  return TOOLS.filter((t) => t.category === category);
}

export function getPopularTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.popular);
}

export function getFeaturedTools(): ToolDefinition[] {
  return TOOLS.filter((t) => t.featured);
}
