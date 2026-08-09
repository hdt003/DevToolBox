import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { Clock, RefreshCw } from 'lucide-react';

export const TimestampConverter: React.FC = () => {
  const [timestampInput, setTimestampInput] = useState(Math.floor(Date.now() / 1000).toString());
  const [unit, setUnit] = useState<'seconds' | 'milliseconds'>('seconds');

  const getParsedDate = (): Date | null => {
    if (!timestampInput.trim()) return null;
    const num = Number(timestampInput.trim());
    if (isNaN(num)) return null;

    const ms = unit === 'seconds' ? num * 1000 : num;
    const d = new Date(ms);
    return isNaN(d.getTime()) ? null : d;
  };

  const parsedDate = getParsedDate();

  const utcString = parsedDate ? parsedDate.toUTCString() : 'Invalid Timestamp';
  const localString = parsedDate ? parsedDate.toString() : 'Invalid Timestamp';
  const isoString = parsedDate ? parsedDate.toISOString() : 'Invalid Timestamp';
  const unixSec = parsedDate ? Math.floor(parsedDate.getTime() / 1000).toString() : '';
  const unixMs = parsedDate ? parsedDate.getTime().toString() : '';

  const handleSetNow = () => {
    const now = Date.now();
    setTimestampInput(unit === 'seconds' ? Math.floor(now / 1000).toString() : now.toString());
  };

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <Button onClick={handleSetNow} variant="primary" size="sm">
            <Clock className="h-3.5 w-3.5 mr-1" /> Use Current Time (Now)
          </Button>
          <Button onClick={() => setTimestampInput('')} variant="ghost" size="sm">
            Clear
          </Button>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <span className="font-semibold text-slate-600 dark:text-slate-300">Unit:</span>
          <select
            value={unit}
            onChange={(e) => setUnit(e.target.value as 'seconds' | 'milliseconds')}
            className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
          >
            <option value="seconds">Seconds (10 digits)</option>
            <option value="milliseconds">Milliseconds (13 digits)</option>
          </select>
        </div>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Enter Unix Epoch Timestamp
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-base text-brand-300 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
          placeholder="e.g. 1700000000"
          value={timestampInput}
          onChange={(e) => setTimestampInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[
          { label: 'UTC Time', val: utcString },
          { label: 'Local Timezone', val: localString },
          { label: 'ISO 8601 Format', val: isoString },
          { label: 'Unix Seconds', val: unixSec },
          { label: 'Unix Milliseconds', val: unixMs },
        ].map(({ label, val }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>{label}</span>
              <CopyButton value={val} size="sm" />
            </div>
            <input
              type="text"
              readOnly
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              value={val}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default TimestampConverter;
