import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CheckCircle2, AlertCircle } from 'lucide-react';

export const UUIDValidator: React.FC = () => {
  const [uuidInput, setUuidInput] = useState('f47ac10b-58cc-4372-a567-0e02b2c3d479');

  const validateUUID = () => {
    if (!uuidInput.trim()) return null;
    const str = uuidInput.trim();

    const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-([1-8])[0-9a-f]{3}-([89ab])[0-9a-f]{3}-[0-9a-f]{12}$/i;
    const regexNoHyphen = /^[0-9a-f]{8}[0-9a-f]{4}([1-8])[0-9a-f]{3}([89ab])[0-9a-f]{3}[0-9a-f]{12}$/i;

    const match = str.match(regex) || str.match(regexNoHyphen);
    if (!match) {
      return { valid: false, message: 'Invalid UUID string format.' };
    }

    const version = match[1];
    const variantNibble = match[2].toLowerCase();
    const variant = ['8', '9', 'a', 'b'].includes(variantNibble) ? 'RFC 4122 / DCE 1.1' : 'Reserved';

    return {
      valid: true,
      version: `Version ${version}`,
      variant,
      hyphenated: str.includes('-'),
    };
  };

  const result = validateUUID();

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Enter UUID / GUID to Validate
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-sm font-bold text-brand-300 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800 tracking-wider"
          placeholder="f47ac10b-58cc-4372-a567-0e02b2c3d479"
          value={uuidInput}
          onChange={(e) => setUuidInput(e.target.value)}
        />
      </div>

      {result && (
        <div
          className={`rounded-2xl border p-6 space-y-4 ${
            result.valid
              ? 'border-emerald-200 bg-emerald-50 text-emerald-900 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-200'
              : 'border-rose-200 bg-rose-50 text-rose-900 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200'
          }`}
        >
          <div className="flex items-center gap-2 font-bold text-base">
            {result.valid ? <CheckCircle2 className="h-6 w-6 text-emerald-500" /> : <AlertCircle className="h-6 w-6 text-rose-500" />}
            <span>{result.valid ? 'Valid RFC4122 UUID!' : result.message}</span>
          </div>

          {result.valid && (
            <div className="grid grid-cols-3 gap-4 border-t border-emerald-200/60 dark:border-emerald-900/60 pt-4 text-xs">
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">UUID Version:</span>
                <strong className="font-mono text-sm">{result.version}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">RFC Variant:</span>
                <strong className="font-mono text-sm">{result.variant}</strong>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400 block">Format:</span>
                <strong className="font-mono text-sm">{result.hyphenated ? 'Hyphenated' : 'Compact (No Hyphens)'}</strong>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UUIDValidator;
