import React, { useState } from 'react';
import { Search } from 'lucide-react';

const MIME_TYPES = [
  { ext: '.json', mime: 'application/json', desc: 'JavaScript Object Notation data format' },
  { ext: '.html', mime: 'text/html', desc: 'HyperText Markup Language web document' },
  { ext: '.css', mime: 'text/css', desc: 'Cascading Style Sheets stylesheet' },
  { ext: '.js', mime: 'text/javascript', desc: 'JavaScript source code file' },
  { ext: '.pdf', mime: 'application/pdf', desc: 'Adobe Portable Document Format' },
  { ext: '.png', mime: 'image/png', desc: 'Portable Network Graphics lossless image' },
  { ext: '.jpg', mime: 'image/jpeg', desc: 'Joint Photographic Experts Group image' },
  { ext: '.svg', mime: 'image/svg+xml', desc: 'Scalable Vector Graphics vector image' },
  { ext: '.csv', mime: 'text/csv', desc: 'Comma-Separated Values table data' },
  { ext: '.xml', mime: 'application/xml', desc: 'Extensible Markup Language document' },
  { ext: '.zip', mime: 'application/zip', desc: 'ZIP compressed archive file' },
];

export const MIMELookup: React.FC = () => {
  const [query, setQuery] = useState('');

  const filtered = MIME_TYPES.filter(
    (m) =>
      m.ext.toLowerCase().includes(query.toLowerCase()) ||
      m.mime.toLowerCase().includes(query.toLowerCase()) ||
      m.desc.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="relative">
        <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          placeholder="Search by extension (.pdf, .json) or MIME type (application/json)..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filtered.map((item) => (
          <div key={item.ext} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm font-bold text-brand-600 dark:text-brand-400">{item.ext}</span>
              <span className="font-mono text-xs font-semibold text-slate-800 dark:text-slate-200">{item.mime}</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MIMELookup;
