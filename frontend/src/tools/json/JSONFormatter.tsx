import React, { useState } from 'react';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { Button } from '../../components/common/Button';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { CheckCircle2, AlertCircle, RefreshCw, FileText } from 'lucide-react';

const SAMPLE_JSON = `{
  "app": "DevToolBox",
  "version": "1.0.0",
  "features": [
    "JSON Formatter",
    "JWT Decoder",
    "UUID Generator",
    "Regex Tester"
  ],
  "settings": {
    "theme": "dark",
    "autoSave": true,
    "maxHistory": 50
  },
  "status": "active"
}`;

export const JSONFormatter: React.FC = () => {
  const [input, setInput] = useState(SAMPLE_JSON);
  const [output, setOutput] = useState('');
  const [indent, setIndent] = useState<number | string>(2);
  const [error, setError] = useState<{ message: string; line?: number; column?: number } | null>(null);

  const getIndentSpace = () => {
    if (indent === 'tab') return '\t';
    return Number(indent);
  };

  const handleFormat = () => {
    if (!input.trim()) {
      setOutput('');
      setError(null);
      return;
    }
    try {
      const parsed = JSON.parse(input);
      const formatted = JSON.stringify(parsed, null, getIndentSpace());
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      parseJsonError(err.message, input);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    try {
      const parsed = JSON.parse(input);
      const minified = JSON.stringify(parsed);
      setOutput(minified);
      setError(null);
    } catch (err: any) {
      parseJsonError(err.message, input);
    }
  };

  const parseJsonError = (errMsg: string, rawInput: string) => {
    // Extract line/column information from error message if available
    let line: number | undefined;
    let column: number | undefined;

    const posMatch = errMsg.match(/at position (\d+)/i) || errMsg.match(/column (\d+)/i);
    if (posMatch) {
      const pos = parseInt(posMatch[1], 10);
      const lines = rawInput.substring(0, pos).split('\n');
      line = lines.length;
      column = lines[lines.length - 1].length + 1;
    }

    setError({ message: errMsg, line, column });
    setOutput('');
  };

  const handleClear = () => {
    setInput('');
    setOutput('');
    setError(null);
  };

  const lineCount = input ? input.split('\n').length : 0;
  const charCount = input.length;

  return (
    <div className="space-y-6">
      {/* TOOL CONTROLS TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleFormat} variant="primary" size="sm">
            Format JSON
          </Button>
          <Button onClick={handleMinify} variant="secondary" size="sm">
            Minify JSON
          </Button>
          <Button onClick={() => setInput(SAMPLE_JSON)} variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Load Sample
          </Button>
          <Button onClick={handleClear} variant="ghost" size="sm">
            Clear
          </Button>
        </div>

        {/* Indentation Select */}
        <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
          <label htmlFor="indent-select" className="font-medium">
            Indent:
          </label>
          <select
            id="indent-select"
            value={indent}
            onChange={(e) => setIndent(e.target.value === 'tab' ? 'tab' : Number(e.target.value))}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value={2}>2 Spaces</option>
            <option value={4}>4 Spaces</option>
            <option value="tab">Tab</option>
          </select>
        </div>
      </div>

      {/* INPUT & OUTPUT WORKSPACE */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Input Column */}
        <div className="space-y-2">
          <TextAreaLabel label="Input JSON" editable>
            <span className="text-slate-400 font-mono">
              {lineCount} lines | {charCount} chars
            </span>
          </TextAreaLabel>
          <textarea
            rows={16}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder="Paste raw JSON here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        {/* Output Column */}
        <div className="space-y-2">
          <TextAreaLabel label="Formatted Output">
            <CopyButton value={output} />
            <DownloadButton content={output} filename="formatted.json" mimeType="application/json" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={16}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none dark:border-slate-800"
            placeholder="Formatted output will appear here..."
            value={output}
          />
        </div>

      </div>

      {/* ERROR DIAGNOSTICS DISPLAY */}
      {error && (
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 dark:border-rose-900/50 dark:bg-rose-950/40 text-rose-800 dark:text-rose-200 text-xs space-y-2">
          <div className="flex items-center gap-2 font-bold text-sm">
            <AlertCircle className="h-5 w-5 text-rose-500" />
            <span>Invalid JSON Syntax</span>
          </div>
          <p className="font-mono bg-rose-100/50 dark:bg-rose-900/40 p-2 rounded-lg">
            {error.message}
          </p>
          {error.line && (
            <p className="text-[11px] text-rose-600 dark:text-rose-300">
              Check around <strong>Line {error.line}</strong>
              {error.column && `, Column ${error.column}`}. Common fixes: check for missing commas, trailing commas, or unquoted keys.
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JSONFormatter;
