import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle } from 'lucide-react';

export const URLEncoder: React.FC = () => {
  const [input, setInput] = useState('https://devtoolbox.co/search?q=JSON Formatter & JWT Decoder#top');
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      setOutput(encodeURIComponent(input));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEncodeURI = () => {
    try {
      setOutput(encodeURI(input));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDecode = () => {
    try {
      setOutput(decodeURIComponent(input));
      setError(null);
    } catch (err: any) {
      setError('Invalid URL encoded string.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex flex-wrap items-center gap-2">
          <Button onClick={handleEncode} variant="primary" size="sm">
            Encode Component (encodeURIComponent)
          </Button>
          <Button onClick={handleEncodeURI} variant="secondary" size="sm">
            Encode Full URI (encodeURI)
          </Button>
          <Button onClick={handleDecode} variant="outline" size="sm">
            Decode URL
          </Button>
          <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="Raw Input URL / Text" editable />
          <textarea
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder="Enter URL string to encode or decode..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="Result">
            <CopyButton value={output} />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none dark:border-slate-800"
            placeholder="Encoded / decoded output will appear here..."
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

export default URLEncoder;
