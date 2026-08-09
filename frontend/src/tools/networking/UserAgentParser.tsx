import React, { useState } from 'react';
import { UAParser } from 'ua-parser-js';
import { Button } from '../../components/common/Button';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { Laptop, RefreshCw } from 'lucide-react';

export const UserAgentParser: React.FC = () => {
  const [uaInput, setUaInput] = useState(navigator.userAgent);

  const parseUA = () => {
    const parser = new UAParser(uaInput);
    return parser.getResult();
  };

  const result = parseUA();

  return (
    <div className="space-y-6">
      
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={() => setUaInput(navigator.userAgent)} variant="primary" size="sm">
          <Laptop className="h-3.5 w-3.5 mr-1" /> Use My Browser&apos;s User-Agent
        </Button>
        <Button onClick={() => setUaInput('')} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="space-y-2">
        <TextAreaLabel label="User-Agent Header String" editable />
        <textarea
          rows={3}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800 break-all"
          placeholder="Paste User-Agent string here..."
          value={uaInput}
          onChange={(e) => setUaInput(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Browser Name</span>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{result.browser.name || 'Unknown'}</p>
          <span className="text-[11px] text-slate-400 font-mono">Version: {result.browser.version || 'N/A'}</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Operating System</span>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{result.os.name || 'Unknown'}</p>
          <span className="text-[11px] text-slate-400 font-mono">Version: {result.os.version || 'N/A'}</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Rendering Engine</span>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{result.engine.name || 'Unknown'}</p>
          <span className="text-[11px] text-slate-400 font-mono">Version: {result.engine.version || 'N/A'}</span>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-1">
          <span className="text-xs font-semibold text-slate-500">Device Type / CPU</span>
          <p className="text-sm font-bold text-slate-900 dark:text-white">{result.device.type || 'Desktop'}</p>
          <span className="text-[11px] text-slate-400 font-mono">Arch: {result.cpu.architecture || 'N/A'}</span>
        </div>

      </div>

    </div>
  );
};

export default UserAgentParser;
