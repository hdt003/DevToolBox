import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle, RefreshCw } from 'lucide-react';

const SAMPLE_JSON_ARRAY = `[
  { "id": 1, "name": "Alice", "role": "Developer", "location": { "city": "New York", "country": "USA" } },
  { "id": 2, "name": "Bob", "role": "Designer", "location": { "city": "London", "country": "UK" } },
  { "id": 3, "name": "Charlie", "role": "DevOps", "location": { "city": "Tokyo", "country": "Japan" } }
]`;

export const JSONToCSV: React.FC = () => {
  const [input, setInput] = useState(SAMPLE_JSON_ARRAY);
  const [csvOutput, setCsvOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [error, setError] = useState<string | null>(null);

  const flattenObject = (obj: any, prefix = ''): any => {
    return Object.keys(obj).reduce((acc: any, k) => {
      const pre = prefix.length ? prefix + '.' : '';
      if (typeof obj[k] === 'object' && obj[k] !== null && !Array.isArray(obj[k])) {
        Object.assign(acc, flattenObject(obj[k], pre + k));
      } else {
        acc[pre + k] = Array.isArray(obj[k]) ? JSON.stringify(obj[k]) : obj[k];
      }
      return acc;
    }, {});
  };

  const handleConvert = () => {
    if (!input.trim()) return;
    try {
      let parsed = JSON.parse(input);
      if (!Array.isArray(parsed)) {
        parsed = [parsed];
      }

      const flattened = parsed.map((item: any) => flattenObject(item));
      const csv = Papa.unparse(flattened, { delimiter });
      setCsvOutput(csv);
      setError(null);
    } catch (err: any) {
      setError(`Invalid JSON input: ${err.message}`);
      setCsvOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex gap-2">
          <Button onClick={handleConvert} variant="primary" size="sm">
            Convert to CSV
          </Button>
          <Button onClick={() => setInput(SAMPLE_JSON_ARRAY)} variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Load Sample
          </Button>
          <Button onClick={() => { setInput(''); setCsvOutput(''); setError(null); }} variant="ghost" size="sm">
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <label className="font-medium text-slate-600 dark:text-slate-300">Delimiter:</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value=",">Comma (,)</option>
            <option value=";">Semicolon (;)</option>
            <option value="\t">Tab (\t)</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="JSON Array Input" editable />
          <textarea
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder="Paste JSON array here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="CSV Output">
            <CopyButton value={csvOutput} />
            <DownloadButton content={csvOutput} filename="converted.csv" mimeType="text/csv" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none dark:border-slate-800"
            placeholder="CSV output will be generated here..."
            value={csvOutput}
          />
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

export default JSONToCSV;
