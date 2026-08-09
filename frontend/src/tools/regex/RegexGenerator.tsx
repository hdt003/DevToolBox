import React, { useState } from 'react';
import { CopyButton } from '../../components/tools/CopyButton';
import { Wand2, Check } from 'lucide-react';

const REGEX_TEMPLATES = [
  { name: 'Email Address', pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$', description: 'Matches standard RFC 5322 email addresses.' },
  { name: 'URL (HTTP / HTTPS)', pattern: 'https?:\\/\\/(www\\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\\.[a-zA-Z0-9()]{1,6}\\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)', description: 'Matches web URLs with optional query parameters.' },
  { name: 'IPv4 Address', pattern: '^(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$', description: 'Validates IPv4 dot-decimal notation.' },
  { name: 'IPv6 Address', pattern: '(([0-9a-fA-F]{1,4}:){7,7}[0-9a-fA-F]{1,4}|([0-9a-fA-F]{1,4}:){1,7}:|([0-9a-fA-F]{1,4}:){1,6}:[0-9a-fA-F]{1,4})', description: 'Matches standard IPv6 hex addresses.' },
  { name: 'Date (YYYY-MM-DD)', pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$', description: 'Matches ISO dates formatted as YYYY-MM-DD.' },
  { name: 'US Phone Number', pattern: '^\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}$', description: 'Matches domestic and international phone numbers.' },
  { name: 'Strong Password', pattern: '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$', description: 'Requires min 8 chars, 1 uppercase, 1 lowercase, 1 number, 1 special char.' },
  { name: 'Alphanumeric Only', pattern: '^[a-zA-Z0-9]+$', description: 'Matches strings containing only letters and numbers.' },
];

export const RegexGenerator: React.FC = () => {
  const [selected, setSelected] = useState(REGEX_TEMPLATES[0]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {REGEX_TEMPLATES.map((tpl) => (
          <div
            key={tpl.name}
            onClick={() => setSelected(tpl)}
            className={`cursor-pointer rounded-xl border p-4 transition-all ${
              selected.name === tpl.name
                ? 'border-brand-500 bg-brand-50/50 dark:border-brand-700 dark:bg-brand-950/50'
                : 'border-slate-200 bg-white hover:border-slate-300 dark:border-slate-800 dark:bg-slate-900'
            }`}
          >
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center justify-between">
              <span>{tpl.name}</span>
              {selected.name === tpl.name && <Wand2 className="h-4 w-4 text-brand-600 dark:text-brand-400" />}
            </h3>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{tpl.description}</p>
          </div>
        ))}
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">
          Generated Regex Pattern ({selected.name})
        </h3>
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-sm dark:border-slate-800">
          <span className="w-full text-brand-300 break-all">{selected.pattern}</span>
          <CopyButton value={selected.pattern} variant="primary" size="md" />
        </div>
      </div>
    </div>
  );
};

export default RegexGenerator;
