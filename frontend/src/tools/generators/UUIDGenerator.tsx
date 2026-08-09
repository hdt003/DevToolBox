import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { Fingerprint, RefreshCw } from 'lucide-react';

export const UUIDGenerator: React.FC = () => {
  const [version, setVersion] = useState<'v4' | 'v1' | 'v7'>('v4');
  const [quantity, setQuantity] = useState(5);
  const [uppercase, setUppercase] = useState(false);
  const [hyphenated, setHyphenated] = useState(true);
  const [uuids, setUuids] = useState<string[]>([]);

  // Generate UUID v4 (random)
  const generateV4 = (): string => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  // Generate UUID v1 (timestamp-based mock RFC)
  const generateV1 = (): string => {
    const now = Date.now();
    const hex = now.toString(16).padStart(12, '0');
    return `${hex.substring(4)}-${hex.substring(0, 4)}-11ee-8000-${generateV4().substring(24)}`;
  };

  // Generate UUID v7 (Unix Epoch time-ordered)
  const generateV7 = (): string => {
    const now = Date.now();
    const timeHex = now.toString(16).padStart(12, '0');
    const rand = '7xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
      const r = (Math.random() * 16) | 0;
      const v = c === 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
    return `${timeHex.substring(0, 8)}-${timeHex.substring(8, 12)}-${rand}`;
  };

  const generateBulk = () => {
    const list: string[] = [];
    for (let i = 0; i < quantity; i++) {
      let id = version === 'v1' ? generateV1() : version === 'v7' ? generateV7() : generateV4();
      if (!hyphenated) id = id.replace(/-/g, '');
      if (uppercase) id = id.toUpperCase();
      list.push(id);
    }
    setUuids(list);
  };

  useEffect(() => {
    generateBulk();
  }, [version, quantity, uppercase, hyphenated]);

  const outputText = uuids.join('\n');

  return (
    <div className="space-y-6">
      
      {/* CONTROLS TOOLBAR */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        
        <div className="flex flex-wrap items-center gap-4 text-xs font-medium">
          <div className="flex items-center gap-2">
            <label className="text-slate-600 dark:text-slate-300">Version:</label>
            <select
              value={version}
              onChange={(e) => setVersion(e.target.value as any)}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-bold"
            >
              <option value="v4">UUID v4 (Random - Recommended)</option>
              <option value="v7">UUID v7 (Time-Ordered Epoch)</option>
              <option value="v1">UUID v1 (Timestamp based)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-slate-600 dark:text-slate-300">Quantity:</label>
            <select
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-800 focus:outline-none dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 font-bold"
            >
              <option value={1}>1</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-medium text-slate-600 dark:text-slate-300">
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={uppercase}
              onChange={(e) => setUppercase(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>Uppercase</span>
          </label>

          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={hyphenated}
              onChange={(e) => setHyphenated(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>Hyphens (-)</span>
          </label>

          <Button onClick={generateBulk} variant="primary" size="sm">
            <RefreshCw className="h-3.5 w-3.5 mr-1" /> Regenerate
          </Button>
        </div>

      </div>

      {/* OUTPUT CONTAINER */}
      <div className="space-y-2">
        <TextAreaLabel label={`Generated UUIDs (${uuids.length})`}>
          <CopyButton value={outputText} />
          <DownloadButton content={outputText} filename="uuids.txt" />
        </TextAreaLabel>
        <textarea
          readOnly
          rows={Math.max(6, Math.min(16, quantity + 2))}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-sm text-brand-300 focus:outline-none dark:border-slate-800 tracking-wider leading-relaxed"
          value={outputText}
        />
      </div>

    </div>
  );
};

export default UUIDGenerator;
