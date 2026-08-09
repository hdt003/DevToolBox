import React, { useState } from 'react';
import cronstrue from 'cronstrue';
import { Button } from '../../components/common/Button';
import { CalendarClock, AlertCircle, RefreshCw } from 'lucide-react';

export const CronParser: React.FC = () => {
  const [expression, setExpression] = useState('0 0 * * *');
  const [description, setDescription] = useState('At 00:00 AM (midnight) every day');

  const handleParse = () => {
    if (!expression.trim()) return;
    try {
      const desc = cronstrue.toString(expression.trim(), { use24HourTimeFormat: true });
      setDescription(desc);
    } catch {
      setDescription('Invalid Cron Expression');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleParse} variant="primary" size="sm">
          Parse & Explain Cron
        </Button>
        <Button onClick={() => { setExpression('0 0 * * *'); setDescription('At 00:00 AM (midnight) every day'); }} variant="outline" size="sm">
          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Reset Sample
        </Button>
      </div>

      <div className="space-y-2">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Enter 5-Field Cron Expression
        </label>
        <input
          type="text"
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xl font-bold text-brand-300 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800 tracking-widest"
          placeholder="e.g. */15 * * * *"
          value={expression}
          onChange={(e) => { setExpression(e.target.value); }}
        />
      </div>

      <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:border-brand-900/50 dark:bg-brand-950/40 space-y-2">
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block uppercase tracking-wider">
          Plain English Schedule Explanation
        </span>
        <p className="text-lg font-bold text-brand-900 dark:text-brand-200">
          &quot;{description}&quot;
        </p>
      </div>
    </div>
  );
};

export default CronParser;
