import React, { useState, useEffect } from 'react';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';

const SAMPLE_MD = `# DevToolBox Markdown Editor

Welcome to **DevToolBox**! Fast, browser-based utilities.

## Features List
- [x] 100% Client-side processing
- [x] Real-time live HTML preview
- [x] DOMPurify XSS Sanitization

\`\`\`javascript
const greeting = "Hello DevToolBox!";
console.log(greeting);
\`\`\`

> Privacy First — Tools process data in your browser.
`;

export const MarkdownHTML: React.FC = () => {
  const [markdown, setMarkdown] = useState(SAMPLE_MD);
  const [rawHtml, setRawHtml] = useState('');
  const [sanitizedHtml, setSanitizedHtml] = useState('');

  useEffect(() => {
    try {
      const parsed = marked.parse(markdown) as string;
      const clean = DOMPurify.sanitize(parsed);
      setRawHtml(clean);
      setSanitizedHtml(clean);
    } catch {
      setRawHtml('');
      setSanitizedHtml('');
    }
  }, [markdown]);

  return (
    <div className="space-y-6">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Markdown Input */}
        <div className="space-y-2">
          <TextAreaLabel label="Markdown Input" editable />
          <textarea
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
          />
        </div>

        {/* Live Preview / Raw HTML Tab */}
        <div className="space-y-2">
          <TextAreaLabel label="Rendered Live Preview (DOMPurify Sanitized)">
            <CopyButton value={rawHtml} label="Copy HTML" />
            <DownloadButton content={rawHtml} filename="document.html" mimeType="text/html" />
          </TextAreaLabel>
          
          <div
            className="h-[310px] w-full overflow-y-auto rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 text-slate-900 dark:text-white prose dark:prose-invert max-w-none text-xs"
            dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
          />
        </div>

      </div>

      <div className="space-y-2">
        <TextAreaLabel label="Raw Generated HTML Code" />
        <textarea
          readOnly
          rows={6}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
          value={rawHtml}
        />
      </div>

    </div>
  );
};

export default MarkdownHTML;
