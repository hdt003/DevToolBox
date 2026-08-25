export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  publishedDate: string;
  author: string;
  content: string;
  tags: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    id: 'json-formatting-validation-guide',
    slug: 'json-formatting-validation-guide',
    title: 'The Ultimate Guide to JSON Formatting, Linting, and Schema Validation',
    excerpt: 'Learn how to properly format, validate, and minify JSON data payloads, fix syntax errors, and follow security best practices in web development.',
    category: 'Data Formats',
    readTime: '6 min read',
    publishedDate: 'August 24, 2026',
    author: 'DevToolBox Team',
    tags: ['JSON', 'Web APIs', 'Data Formats', 'Debugging'],
    content: `### What is JSON and Why is Formatting Critical?

JSON (JavaScript Object Notation) is the ubiquitous data-interchange format of modern software engineering. Used across REST APIs, GraphQL endpoints, microservices, and configuration files (\`package.json\`, \`tsconfig.json\`), JSON combines human readability with machine-parseable simplicity.

However, raw JSON strings returned from server APIs or log aggregators are frequently minified into single-line blobs lacking indentation or whitespace. Unformatted JSON makes debugging API responses, detecting nested key-value mismatches, and identifying syntax errors extremely difficult.

---

### Common JSON Syntax Errors and How to Avoid Them

When working with JSON payloads, developers frequently encounter parsing errors (\`SyntaxError: Unexpected token\`). Here are the most common pitfalls:

* **Trailing Commas**: Unlike JavaScript objects, standard JSON specification (RFC 8259) strictly forbids trailing commas after the final element in an array or object. Incorrect: \`{"name": "DevToolBox", "active": true,}\`. Correct: \`{"name": "DevToolBox", "active": true}\`.
* **Single Quotes vs Double Quotes**: JSON keys and string values **must** be enclosed in double quotation marks (\`"\`). Single quotes (\`'\`) cause immediate parse failure. Incorrect: \`{'status': 'ok'}\`. Correct: \`{"status": "ok"}\`.
* **Unquoted Object Keys**: In JavaScript, key names can omit quotes if they are valid identifiers. In JSON, every key must be wrapped in double quotes.
* **Invalid Number Formats**: Leading zeros in numbers (e.g. \`0123\`) or raw hexadecimals are invalid in standard JSON.

---

### JSON Minification vs Pretty Printing

* **Minification**: Removes all unnecessary whitespace, line breaks, and indentation. Minified JSON reduces payload transfer sizes over HTTP/HTTPS by up to 20-30%, conserving network bandwidth for production API endpoints.
* **Pretty Printing**: Formats JSON with consistent indentation spaces (typically 2 or 4 spaces per nesting level) and line breaks. Pretty printing is essential during local API development, logging, and code reviews.

---

### In-Browser Processing & Privacy

When working with production logs or customer API payloads containing personal identifiable information (PII) or access tokens, uploading JSON payloads to external remote formatter websites poses significant security risks.

Always utilize **browser-first client-side formatters** like [DevToolBox JSON Formatter](/tools/json-formatter) that parse and validate data completely within your browser using local JavaScript engines (\`JSON.parse\` and \`JSON.stringify\`), ensuring zero network transmissions or data logging.`
  },
  {
    id: 'jwt-authentication-security-guide',
    slug: 'jwt-authentication-security-guide',
    title: 'Understanding JWT Authentication: Structure, Verification, and Best Practices',
    excerpt: 'A comprehensive deep dive into JSON Web Tokens (JWT). Learn about Headers, Payloads, Signatures, security algorithms (HS256 vs RS256), and common vulnerabilities.',
    category: 'Security & Auth',
    readTime: '8 min read',
    publishedDate: 'August 22, 2026',
    author: 'DevToolBox Team',
    tags: ['JWT', 'Security', 'Authentication', 'OAuth2'],
    content: `### What is a JSON Web Token (JWT)?

JSON Web Token (JWT) is an open standard (RFC 7519) for securely transmitting information between client applications and web servers as a compact, self-contained JSON object. JWTs are widely adopted for user authentication, SSO (Single Sign-On), and stateless authorization in microservice architectures.

---

### The Three Parts of a JWT

A JWT string consists of three separate base64url-encoded parts separated by dots (\`.\`):

\`\`\`
header.payload.signature
\`\`\`

#### 1. Header

The header contains metadata regarding the token type and the cryptographic signing algorithm used:

\`\`\`json
{
  "alg": "HS256",
  "typ": "JWT"
}
\`\`\`

#### 2. Payload

The payload contains claim statements about the authenticated entity (user) and additional metadata:

* **Registered Claims**: Pre-defined standard claims such as \`iss\` (issuer), \`sub\` (subject), \`exp\` (expiration time in Unix seconds), and \`iat\` (issued at time).
* **Public/Private Claims**: Custom application claims such as \`user_id\`, \`role\`, or \`email\`.

#### 3. Signature

The signature verifies that the message was not altered in transit and, in the case of tokens signed with a private key, confirms the sender's identity.

---

### Security Best Practices for JWT Implementation

* **Always Set Expiration (\`exp\`)**: Never issue tokens without a reasonable expiration time. Access tokens should generally expire within 15 to 60 minutes, paired with secure refresh tokens.
* **Never Store Sensitive Secrets in Payload**: Remember that base64url encoding is **not encryption**. Anyone with access to the JWT string can decode and read the payload using a [JWT Decoder](/tools/jwt-decoder).
* **Use Strong Signature Algorithms**: Prefer asymmetric signing (\`RS256\` or \`ES256\`) over symmetric signing (\`HS256\`) for distributed microservices so authentication services can hold the private key while resource servers verify signatures using public keys.
* **Validate Signature and Claims Server-Side**: Always verify signature integrity, issuer (\`iss\`), and expiration (\`exp\`) before accepting requests.`
  },
  {
    id: 'regex-mastery-cheatsheet',
    slug: 'regex-mastery-cheatsheet',
    title: 'Mastering Regular Expressions: A Comprehensive Developer Cheat Sheet',
    excerpt: 'Unlock the power of Regular Expressions (Regex). Explore anchors, character classes, quantifiers, lookaheads, lookbehinds, and optimization techniques.',
    category: 'Regex',
    readTime: '7 min read',
    publishedDate: 'August 20, 2026',
    author: 'DevToolBox Team',
    tags: ['Regex', 'Pattern Matching', 'JavaScript', 'Python'],
    content: `### Why Regular Expressions Matter

Regular Expressions (Regex) provide a concise, declarative syntax for searching, matching, parsing, and replacing text patterns within strings. Whether validating email addresses, extracting URL parameters, or sanitizing form inputs, mastering regex is a high-leverage developer skill.

---

### Essential Regex Reference Table

| Symbol | Description | Example Match |
| :--- | :--- | :--- |
| \`^\` | Start of line anchor | \`^Hello\` matches "Hello world" |
| \`$\` | End of line anchor | \`world$\` matches "Hello world" |
| \`\\d\` | Any digit (0-9) | \`\\d{3}\` matches "123" |
| \`\\w\` | Word character (a-z, A-Z, 0-9, _) | \`\\w+\` matches "dev_tool" |
| \`\\s\` | Whitespace character (space, tab, newline) | \`\\s+\` matches spaces |
| \`[abc]\` | Character set (any of a, b, or c) | \`[aeiou]\` matches vowels |
| \`[^abc]\` | Negated set (anything except a, b, c) | \`[^0-9]\` matches non-digits |
| \`*\` | Zero or more occurrences | \`a*\` matches "", "a", "aaa" |
| \`+\` | One or more occurrences | \`a+\` matches "a", "aaa" |
| \`?\` | Zero or one occurrence (optional) | \`https?\` matches "http" & "https" |

---

### Common Real-World Patterns

#### Email Validation Pattern:
\`\`\`regex
^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$
\`\`\`

#### IPv4 Address Pattern:
\`\`\`regex
^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$
\`\`\`

---

### Testing Regex Safely In Browser

Testing regular expressions on live production strings can lead to unexpected catastrophic backtracking if regex patterns are improperly constructed. Use client-side tools like [DevToolBox Regex Tester](/tools/regex-tester) to test patterns interactively with instant match highlighting.`
  },
  {
    id: 'sql-formatting-best-practices',
    slug: 'sql-formatting-best-practices',
    title: 'SQL Formatting Best Practices: Writing Clean, Maintainable Queries',
    excerpt: 'Improve query readability, simplify database code reviews, and reduce debugging time by applying professional SQL formatting guidelines.',
    category: 'Databases',
    readTime: '5 min read',
    publishedDate: 'August 18, 2026',
    author: 'DevToolBox Team',
    tags: ['SQL', 'Database', 'PostgreSQL', 'MySQL'],
    content: `### The Cost of Poorly Formatted SQL

Database queries in modern applications often grow into complex multi-table joins, subqueries, and window functions. Unformatted single-line SQL queries obscure logical structure, make peer code reviews difficult, and increase the likelihood of missing \`WHERE\` clause conditions or join constraints.

---

### Core Formatting Guidelines

* **Capitalize Reserved Keywords**: Always write SQL keywords (\`SELECT\`, \`FROM\`, \`WHERE\`, \`JOIN\`, \`GROUP BY\`, \`ORDER BY\`) in UPPERCASE. Write table and column names in lowercase or snake_case.
* **One Clause Per Line**: Start major clauses (\`SELECT\`, \`FROM\`, \`INNER JOIN\`, \`WHERE\`, \`HAVING\`) on a new line aligned to the left.
* **Indent Column Lists and Subqueries**: Indent columns under \`SELECT\` and subquery logic by 2 or 4 spaces.
* **Use Explicit Join Syntaxes**: Avoid implicit legacy comma joins (\`FROM tableA, tableB\`). Always use explicit \`INNER JOIN\`, \`LEFT JOIN\`, or \`RIGHT JOIN\` with clear \`ON\` criteria.

---

### SQL Minification vs Formatting

While pretty-printed SQL is essential for human development and code reviews, minifying SQL query strings before sending them across network drivers or embedding them in application binaries reduces payload size.

Use our [SQL Formatter](/tools/sql-formatter) and [SQL Minifier](/tools/sql-minifier) to effortlessly format or compress your database statements in one click.`
  },
  {
    id: 'cron-expressions-explained-guide',
    slug: 'cron-expressions-explained-guide',
    title: 'Cron Expressions Explained: A Practical Guide to Task Scheduling',
    excerpt: 'Demystifying cron syntax. Learn the 5-field structure, special characters (*, /, -, ,), and how to schedule automated background jobs reliably.',
    category: 'System Admin',
    readTime: '6 min read',
    publishedDate: 'August 15, 2026',
    author: 'DevToolBox Team',
    tags: ['Cron', 'Linux', 'DevOps', 'Automation'],
    content: `### What is Cron?

Cron is a time-based job scheduler utility found in Unix-like operating systems (Linux, macOS). Developers, DevOps engineers, and system administrators use cron jobs to execute automated commands, scripts, data backups, and routine maintenance tasks at fixed times, dates, or intervals.

---

### Understanding the 5-Field Cron Syntax

A standard cron expression consists of 5 fields separated by spaces:

\`\`\`
* * * * *
│ │ │ │ │
│ │ │ │ └── Day of week (0 - 6) (Sunday=0 or 7)
│ │ │ └───── Month (1 - 12)
│ │ └─────── Day of month (1 - 31)
│ └───────── Hour (0 - 23)
└─────────── Minute (0 - 59)
\`\`\`

---

### Special Characters Reference

* \`*\` (Asterisk): Matches any value. E.g., \`*\` in the minute field means "every minute".
* \`,\` (Comma): Specifies a list of values. E.g., \`1,15,30\` in the hour field runs at 1 AM, 3 AM, and 6 PM.
* \`-\` (Hyphen): Defines a range of values. E.g., \`1-5\` in day of week means Monday through Friday.
* \`/\` (Slash): Specifies step values. E.g., \`*/15\` in the minute field means "every 15 minutes".

---

### Common Cron Schedule Examples

* **Every 5 minutes**: \`*/5 * * * *\`
* **Every hour at minute 0**: \`0 * * * *\`
* **Every midnight at 00:00**: \`0 0 * * *\`
* **Every Monday at 9:00 AM**: \`0 9 * * 1\`
* **First day of every month at midnight**: \`0 0 1 * *\`

Use our interactive [Cron Generator](/tools/cron-generator) and [Cron Parser](/tools/cron-parser) to construct and inspect human-readable schedules effortlessly!`
  }
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((p) => p.slug === slug);
}
