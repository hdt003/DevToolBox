import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

const SAMPLE = `{
  "id": "usr_9921",
  "email": "dev@devtoolbox.co",
  "roles": ["admin", "developer"],
  "verified": true
}`;

export const JSONValidator: React.FC = () => {
  const [input, setInput] = useState(SAMPLE);
  const [validationResult, setValidationResult] = useState<{
    valid: boolean;
    message: string;
    line?: number;
    column?: number;
    stats?: { keysCount: number; depth: number; type: string };
  } | null>(null);

  const handleValidate = () => {
    if (!input.trim()) {
      setValidationResult(null);
      return;
    }

    try {
      const parsed = JSON.parse(input);
      const keysCount = countKeys(parsed);
      const depth = getDepth(parsed);
      const type = Array.isArray(parsed) ? 'Array' : typeof parsed === 'object' && parsed !== null ? 'Object' : typeof parsed;

      setValidationResult({
        valid: true,
        message: 'Valid JSON document!',
        stats: { keysCount, depth, type },
      });
    } catch (err: any) {
      let line: number | undefined;
      let column: number | undefined;
      const posMatch = err.message.match(/at position (\d+)/i) || err.message.match(/column (\d+)/i);
      if (posMatch) {
        const pos = parseInt(posMatch[1], 10);
        const lines = input.substring(0, pos).split('\n');
        line = lines.length;
        column = lines[lines.length - 1].length + 1;
      }

      setValidationResult({
        valid: false,
        message: err.message,
        line,
        column,
      });
    }
  };

  const countKeys = (obj: any): number => {
    if (typeof obj !== 'object' || obj === null) return 0;
    return Object.keys(obj).reduce((acc, key) => acc + 1 + countKeys(obj[key]), 0);
  };

  const getDepth = (obj: any): number => {
    if (typeof obj !== 'object' || obj === null) return 0;
    const values = Object.values(obj);
    if (values.length === 0) return 1;
    return 1 + Math.max(0, ...values.map(getDepth));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex gap-2">
          <Button onClick={handleValidate} variant="primary" size="sm">
            Validate JSON
          </Button>
          <Button onClick={() => setInput(SAMPLE)} variant="outline" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Load Sample
          </Button>
          <Button onClick={() => { setInput(''); setValidationResult(null); }} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      <div className="space-y-2">
        <TextAreaLabel label="JSON Content to Validate" editable />
        <textarea
          rows={12}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
          placeholder="Paste JSON string here to check syntax..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </div>

      {validationResult && (
        <div
          className={`rounded-xl border p-5 transition-all ${
            validationResult.valid
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-sm">
            {validationResult.valid ? (
              <CheckCircle2 className="h-5 w-5 text-emerald-500" />
            ) : (
              <AlertCircle className="h-5 w-5 text-rose-500" />
            )}
            <span>{validationResult.message}</span>
          </div>

          {validationResult.valid && validationResult.stats && (
            <div className="mt-4 grid grid-cols-3 gap-3 text-xs border-t border-emerald-200/60 dark:border-emerald-900/60 pt-3">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Root Type:</span>{' '}
                <strong className="font-mono">{validationResult.stats.type}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Total Keys:</span>{' '}
                <strong className="font-mono">{validationResult.stats.keysCount}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Max Nesting Depth:</span>{' '}
                <strong className="font-mono">{validationResult.stats.depth}</strong>
              </div>
            </div>
          )}

          {!validationResult.valid && validationResult.line && (
            <p className="mt-2 text-xs font-mono">
              Syntax error at Line {validationResult.line}, Column {validationResult.column}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default JSONValidator;
