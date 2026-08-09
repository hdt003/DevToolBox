import React, { useState } from 'react';
import { format as formatSql } from 'sql-formatter';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { Database, RefreshCw, AlertCircle } from 'lucide-react';

const SAMPLE_SQL = `WITH monthly_sales AS (
SELECT u.id, u.name, SUM(o.total_amount) AS total_spent, COUNT(o.id) AS order_count
FROM users u JOIN orders o ON u.id = o.user_id WHERE o.created_at >= '2026-01-01'
GROUP BY u.id, u.name HAVING COUNT(o.id) > 2 ORDER BY total_spent DESC
) SELECT * FROM monthly_sales LIMIT 50;`;

export const SQLFormatter: React.FC = () => {
  const [input, setInput] = useState(SAMPLE_SQL);
  const [output, setOutput] = useState('');
  const [keywordCase, setKeywordCase] = useState<'upper' | 'lower'>('upper');
  const [dialect, setDialect] = useState<'sql' | 'postgresql' | 'mysql' | 'sqlite' | 'transactsql'>('sql');
  const [error, setError] = useState<string | null>(null);

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const formatted = formatSql(input, {
        language: dialect,
        keywordCase: keywordCase,
        tabWidth: 2,
      });
      setOutput(formatted);
      setError(null);
    } catch (err: any) {
      setError(`SQL Formatting Error: ${err.message}`);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleFormat} variant="primary" size="sm">
            Format SQL
          </Button>
          <Button onClick={() => setInput(SAMPLE_SQL)} variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Load Sample
          </Button>
          <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="ghost" size="sm">
            Clear
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <label className="font-medium text-slate-600 dark:text-slate-300">Dialect:</label>
            <select
              value={dialect}
              onChange={(e) => setDialect(e.target.value as any)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="sql">Standard SQL</option>
              <option value="postgresql">PostgreSQL</option>
              <option value="mysql">MySQL</option>
              <option value="sqlite">SQLite</option>
              <option value="transactsql">T-SQL (SQL Server)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-medium text-slate-600 dark:text-slate-300">Keywords:</label>
            <select
              value={keywordCase}
              onChange={(e) => setKeywordCase(e.target.value as any)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
            >
              <option value="upper">UPPERCASE</option>
              <option value="lower">lowercase</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="Raw SQL Input Query" editable />
          <textarea
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder="Paste raw unformatted SQL query here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="Formatted SQL Output">
            <CopyButton value={output} />
            <DownloadButton content={output} filename="formatted.sql" mimeType="text/plain" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={14}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none dark:border-slate-800"
            placeholder="Formatted SQL statement will appear here..."
            value={output}
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

export default SQLFormatter;
