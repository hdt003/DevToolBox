import React, { useState } from 'react';
import cronstrue from 'cronstrue';
import { CopyButton } from '../../components/tools/CopyButton';
import { CalendarClock, Sparkles } from 'lucide-react';

export const CronGenerator: React.FC = () => {
  const [minute, setMinute] = useState('*');
  const [hour, setHour] = useState('*');
  const [dayMonth, setDayMonth] = useState('*');
  const [month, setMonth] = useState('*');
  const [dayWeek, setDayWeek] = useState('*');

  const cronExpression = `${minute} ${hour} ${dayMonth} ${month} ${dayWeek}`;

  const getHumanReadable = () => {
    try {
      return cronstrue.toString(cronExpression, { use24HourTimeFormat: true });
    } catch {
      return 'Invalid Cron Expression';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Visual Controls */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Configure Cron Schedule Fields</h3>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          
          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Minute (0-59)</label>
            <select
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="*">Every minute (*)</option>
              <option value="*/5">Every 5 minutes (*/5)</option>
              <option value="*/15">Every 15 minutes (*/15)</option>
              <option value="0">At minute 0 (0)</option>
              <option value="30">At minute 30 (30)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Hour (0-23)</label>
            <select
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="*">Every hour (*)</option>
              <option value="0">At midnight (0)</option>
              <option value="12">At noon (12)</option>
              <option value="*/2">Every 2 hours (*/2)</option>
              <option value="9-17">Business hours (9-17)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Day of Month</label>
            <select
              value={dayMonth}
              onChange={(e) => setDayMonth(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="*">Every day (*)</option>
              <option value="1">1st of month (1)</option>
              <option value="15">15th of month (15)</option>
              <option value="L">Last day of month (L)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Month (1-12)</label>
            <select
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="*">Every month (*)</option>
              <option value="1">January (1)</option>
              <option value="6">June (6)</option>
              <option value="12">December (12)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">Day of Week</label>
            <select
              value={dayWeek}
              onChange={(e) => setDayWeek(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs font-mono text-slate-900 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="*">Every weekday (*)</option>
              <option value="1-5">Monday to Friday (1-5)</option>
              <option value="0,6">Weekends only (0,6)</option>
              <option value="1">Monday (1)</option>
            </select>
          </div>

        </div>
      </div>

      {/* Generated Result */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
          <span>Generated Cron Expression</span>
          <CopyButton value={cronExpression} variant="primary" />
        </div>

        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-2xl font-extrabold text-brand-300 dark:border-slate-800 tracking-widest">
          {cronExpression}
        </div>

        <div className="rounded-xl border border-brand-200 bg-brand-50/50 p-4 text-xs font-medium text-brand-900 dark:border-brand-900/50 dark:bg-brand-950/40 dark:text-brand-300 flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-brand-500 shrink-0" />
          <span>&quot;{getHumanReadable()}&quot;</span>
        </div>
      </div>

    </div>
  );
};

export default CronGenerator;
