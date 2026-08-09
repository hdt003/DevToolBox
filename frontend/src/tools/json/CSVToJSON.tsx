import React, { useState } from 'react';
import Papa from 'papaparse';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { Upload, AlertCircle, RefreshCw } from 'lucide-react';

const SAMPLE_CSV = `id,name,role,department
101,Sarah Connor,Engineer,DevOps
102,John Doe,Product Owner,Product
103,Jane Smith,QA Lead,Quality`;

export const CSVToJSON: React.FC = () => {
  const [csvInput, setCsvInput] = useState(SAMPLE_CSV);
  const [jsonOutput, setJsonOutput] = useState('');
  const [hasHeader, setHasHeader] = useState(true);
  const [dynamicTyping, setDynamicTyping] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    if (!csvInput.trim()) return;

    Papa.parse(csvInput, {
      header: hasHeader,
      dynamicTyping: dynamicTyping,
      skipEmptyLines: true,
      complete: (results) => {
        if (results.errors.length > 0) {
          setError(`CSV Error: ${results.errors[0].message}`);
        } else {
          setError(null);
        }
        setJsonOutput(JSON.stringify(results.data, null, 2));
      },
      error: (err: any) => {
        setError(`Parsing Failed: ${err.message}`);
      },
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target?.result as string;
      setCsvInput(content);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleConvert} variant="primary" size="sm">
            Convert to JSON
          </Button>

          <label className="inline-flex items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 cursor-pointer">
            <Upload className="h-3.5 w-3.5" /> Upload CSV
            <input type="file" accept=".csv,text/csv" onChange={handleFileUpload} className="hidden" />
          </label>

          <Button onClick={() => setCsvInput(SAMPLE_CSV)} variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Load Sample
          </Button>

          <Button onClick={() => { setCsvInput(''); setJsonOutput(''); setError(null); }} variant="ghost" size="sm">
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-4 text-xs">
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={hasHeader}
              onChange={(e) => setHasHeader(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>Header Row</span>
          </label>
          <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 dark:text-slate-300">
            <input
              type="checkbox"
              checked={dynamicTyping}
              onChange={(e) => setDynamicTyping(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>Auto Numbers/Booleans</span>
          </label>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="CSV Text Input" editable />
          <textarea
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder="Paste CSV text here or upload file..."
            value={csvInput}
            onChange={(e) => setCsvInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="JSON Output">
            <CopyButton value={jsonOutput} />
            <DownloadButton content={jsonOutput} filename="output.json" mimeType="application/json" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none dark:border-slate-800"
            placeholder="JSON output array will appear here..."
            value={jsonOutput}
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

export default CSVToJSON;
