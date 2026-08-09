import React, { useState, useEffect } from 'react';
import { CopyButton } from '../../components/tools/CopyButton';
import { Timer, Pause, Play } from 'lucide-react';
import { Button } from '../../components/common/Button';

export const UnixTimestamp: React.FC = () => {
  const [now, setNow] = useState(Date.now());
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => setNow(Date.now()), 100);
    return () => clearInterval(interval);
  }, [paused]);

  const sec = Math.floor(now / 1000).toString();
  const ms = now.toString();
  const utc = new Date(now).toUTCString();
  const local = new Date(now).toString();
  const iso = new Date(now).toISOString();

  return (
    <div className="space-y-6">
      
      <div className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <Timer className="h-5 w-5 text-brand-600 dark:text-brand-400 animate-pulse" />
          <span className="text-xs font-bold text-slate-800 dark:text-slate-200">Live Clock Counter</span>
        </div>
        <Button onClick={() => setPaused(!paused)} variant={paused ? 'primary' : 'outline'} size="sm">
          {paused ? <Play className="h-3.5 w-3.5 mr-1" /> : <Pause className="h-3.5 w-3.5 mr-1" />}
          {paused ? 'Resume Live Clock' : 'Pause Live Clock'}
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        
        {/* Unix Seconds Big Counter */}
        <div className="rounded-2xl border border-brand-200 bg-brand-50/50 p-6 dark:border-brand-900/50 dark:bg-brand-950/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-brand-900 dark:text-brand-300">
            <span>Unix Seconds (Epoch)</span>
            <CopyButton value={sec} variant="primary" />
          </div>
          <p className="font-mono text-3xl font-extrabold text-brand-700 dark:text-brand-300 tracking-wider">
            {sec}
          </p>
        </div>

        {/* Unix Milliseconds Big Counter */}
        <div className="rounded-2xl border border-indigo-200 bg-indigo-50/50 p-6 dark:border-indigo-900/50 dark:bg-indigo-950/40 space-y-3">
          <div className="flex items-center justify-between text-xs font-bold text-indigo-900 dark:text-indigo-300">
            <span>Unix Milliseconds</span>
            <CopyButton value={ms} variant="primary" />
          </div>
          <p className="font-mono text-3xl font-extrabold text-indigo-700 dark:text-indigo-300 tracking-wider">
            {ms}
          </p>
        </div>

      </div>

      <div className="space-y-4">
        {[
          { label: 'UTC Time', val: utc },
          { label: 'Local Timezone', val: local },
          { label: 'ISO 8601 Format', val: iso },
        ].map(({ label, val }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 flex items-center justify-between">
            <div>
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 block">{label}</span>
              <span className="font-mono text-sm font-bold text-slate-900 dark:text-white">{val}</span>
            </div>
            <CopyButton value={val} size="sm" />
          </div>
        ))}
      </div>

    </div>
  );
};

export default UnixTimestamp;
