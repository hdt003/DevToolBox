import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle, RefreshCw } from 'lucide-react';

export const Base64Tool: React.FC = () => {
  const [input, setInput] = useState('Hello World! DevToolBox Base64 Converter');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState<'encode' | 'decode'>('encode');
  const [error, setError] = useState<string | null>(null);

  const handleEncode = () => {
    try {
      // UTF-8 safe base64 encoding
      const encoded = btoa(
        encodeURIComponent(input).replace(/%([0-9A-F]{2})/g, function (_, p1) {
          return String.fromCharCode(parseInt(p1, 16));
        })
      );
      setOutput(encoded);
      setError(null);
    } catch (err: any) {
      setError(`Encoding Error: ${err.message}`);
    }
  };

  const handleDecode = () => {
    try {
      // UTF-8 safe base64 decoding
      const decoded = decodeURIComponent(
        Array.prototype.map
          .call(atob(input.trim()), function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
          })
          .join('')
      );
      setOutput(decoded);
      setError(null);
    } catch (err: any) {
      setError('Invalid Base64 string. Unable to decode.');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <div className="flex gap-2">
          <Button
            onClick={() => { setMode('encode'); handleEncode(); }}
            variant={mode === 'encode' ? 'primary' : 'outline'}
            size="sm"
          >
            Encode Text to Base64
          </Button>
          <Button
            onClick={() => { setMode('decode'); handleDecode(); }}
            variant={mode === 'decode' ? 'primary' : 'outline'}
            size="sm"
          >
            Decode Base64 to Text
          </Button>
          <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="ghost" size="sm">
            Clear
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label={`Input (${mode === 'encode' ? 'Plain Text / UTF-8' : 'Base64 Encoded String'})`} editable />
          <textarea
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder={mode === 'encode' ? 'Enter text to encode...' : 'Enter Base64 string to decode...'}
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label={`Result (${mode === 'encode' ? 'Base64 String' : 'Decoded Text'})`}>
            <CopyButton value={output} />
            <DownloadButton content={output} filename={mode === 'encode' ? 'encoded.b64' : 'decoded.txt'} />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:outline-none dark:border-slate-800"
            placeholder="Converted result will appear here..."
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

export default Base64Tool;
