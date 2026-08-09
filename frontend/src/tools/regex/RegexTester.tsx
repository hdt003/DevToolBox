import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle, CheckCircle2, Code2, Sparkles } from 'lucide-react';

const SAMPLE_TEXT = `Contact us at support@devtoolbox.co or sales@devtoolbox.org for billing.
For urgent issues call +1 (555) 019-2834 or +44 20 7946 0912.
IP Addresses: 192.168.1.1, 10.0.0.254, 127.0.0.1`;

const PRESET_EXAMPLES = [
  { name: 'Email Address', regex: '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}', flags: 'gi' },
  { name: 'IPv4 Address', regex: '\\b(?:\\d{1,3}\\.){3}\\d{1,3}\\b', flags: 'g' },
  { name: 'Phone Number', regex: '\\+?\\d{1,4}?[-.\\s]?\\(?\\d{1,3}?\\)?[-.\\s]?\\d{1,4}[-.\\s]?\\d{1,9}', flags: 'g' },
];

export const RegexTester: React.FC = () => {
  const [pattern, setPattern] = useState('[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}');
  const [flags, setFlags] = useState({ g: true, i: true, m: false, s: false, u: false, y: false });
  const [testString, setTestString] = useState(SAMPLE_TEXT);
  const [matches, setMatches] = useState<Array<{ match: string; index: number; groups?: string[] }>>([]);
  const [error, setError] = useState<string | null>(null);

  const getFlagsString = () => {
    return Object.entries(flags)
      .filter(([_, active]) => active)
      .map(([f]) => f)
      .join('');
  };

  useEffect(() => {
    if (!pattern) {
      setMatches([]);
      setError(null);
      return;
    }

    try {
      const flagStr = getFlagsString();
      const regex = new RegExp(pattern, flagStr);
      const matchedList: Array<{ match: string; index: number; groups?: string[] }> = [];

      if (flags.g) {
        let match;
        let count = 0;
        // Limit iterations to prevent catastrophic infinite loops
        while ((match = regex.exec(testString)) !== null && count < 1000) {
          matchedList.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
          if (match.index === regex.lastIndex) {
            regex.lastIndex++;
          }
          count++;
        }
      } else {
        const match = regex.exec(testString);
        if (match) {
          matchedList.push({
            match: match[0],
            index: match.index,
            groups: match.slice(1),
          });
        }
      }

      setMatches(matchedList);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setMatches([]);
    }
  }, [pattern, flags, testString]);

  const renderHighlightedText = () => {
    if (error || matches.length === 0 || !pattern) {
      return testString;
    }

    const elements: React.ReactNode[] = [];
    let lastIndex = 0;

    matches.forEach((m, idx) => {
      if (m.index > lastIndex) {
        elements.push(testString.substring(lastIndex, m.index));
      }
      elements.push(
        <mark
          key={idx}
          className="bg-amber-300 text-slate-900 font-semibold px-0.5 rounded dark:bg-amber-400"
        >
          {m.match}
        </mark>
      );
      lastIndex = m.index + m.match.length;
    });

    if (lastIndex < testString.length) {
      elements.push(testString.substring(lastIndex));
    }

    return elements;
  };

  return (
    <div className="space-y-6">
      
      {/* PRESETS */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">Presets:</span>
        {PRESET_EXAMPLES.map((ex) => (
          <button
            key={ex.name}
            onClick={() => {
              setPattern(ex.regex);
              setFlags({ g: ex.flags.includes('g'), i: ex.flags.includes('i'), m: false, s: false, u: false, y: false });
            }}
            className="rounded-lg border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-brand-50 hover:text-brand-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-brand-950 transition-colors"
          >
            {ex.name}
          </button>
        ))}
      </div>

      {/* REGEX INPUT & FLAGS */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300">
          Regular Expression Pattern
        </label>
        
        <div className="flex items-center rounded-xl border border-slate-200 bg-slate-900 px-3 py-2 font-mono text-sm dark:border-slate-800">
          <span className="text-slate-400 font-bold mr-1">/</span>
          <input
            type="text"
            className="w-full bg-transparent font-mono text-sm text-brand-300 placeholder-slate-500 focus:outline-none"
            placeholder="[a-z]+"
            value={pattern}
            onChange={(e) => setPattern(e.target.value)}
          />
          <span className="text-slate-400 font-bold ml-1">/{getFlagsString()}</span>
        </div>

        {/* FLAG TOGGLES */}
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-700 dark:text-slate-300 pt-1">
          <span className="text-slate-400">Flags:</span>
          {[
            { key: 'g', label: 'g (global)' },
            { key: 'i', label: 'i (case insensitive)' },
            { key: 'm', label: 'm (multiline)' },
            { key: 's', label: 's (dotAll)' },
            { key: 'u', label: 'u (unicode)' },
          ].map(({ key, label }) => (
            <label key={key} className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={(flags as any)[key]}
                onChange={(e) => setFlags({ ...flags, [key]: e.target.checked })}
                className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <span>{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* TEST STRING & MATCH HIGHLIGHTS */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="Test Input Text" editable />
          <textarea
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            value={testString}
            onChange={(e) => setTestString(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="Match Preview">
            <Badge variant={matches.length > 0 ? 'success' : 'outline'}>
              {matches.length} {matches.length === 1 ? 'Match' : 'Matches'}
            </Badge>
          </TextAreaLabel>
          <div className="h-60 w-full overflow-y-auto rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 whitespace-pre-wrap dark:border-slate-800">
            {renderHighlightedText()}
          </div>
        </div>
      </div>

      {/* ERROR OR MATCH DETAILS LIST */}
      {error ? (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
          <span>Regex Syntax Error: {error}</span>
        </div>
      ) : (
        matches.length > 0 && (
          <div className="rounded-2xl border border-slate-200 bg-white p-5 dark:border-slate-800 dark:bg-slate-900 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Captured Matches Breakdown ({matches.length})
            </h4>
            <div className="max-h-48 overflow-y-auto space-y-1.5 font-mono text-xs">
              {matches.map((m, i) => (
                <div key={i} className="flex items-center justify-between rounded-lg bg-slate-50 p-2 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                  <div className="flex items-center gap-2">
                    <span className="text-brand-600 font-bold dark:text-brand-400">#{i + 1}</span>
                    <span className="text-slate-900 font-semibold dark:text-white">&quot;{m.match}&quot;</span>
                  </div>
                  <span className="text-[11px] text-slate-400">Index {m.index}</span>
                </div>
              ))}
            </div>
          </div>
        )
      )}

    </div>
  );
};

export default RegexTester;
