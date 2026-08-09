import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';

export const CSSFormatter: React.FC = () => {
  const [input, setInput] = useState('.card{background:#fff;color:#333;padding:16px;border-radius:8px;}');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    if (!input.trim()) return;
    const formatted = input
      .replace(/\s*\{\s*/g, ' {\n  ')
      .replace(/;\s*/g, ';\n  ')
      .replace(/\s*\}\s*/g, '\n}\n\n')
      .trim();
    setOutput(formatted);
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    const minified = input
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s*([\{\}:;,])\s*/g, '$1')
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleFormat} variant="primary" size="sm">
          Format CSS
        </Button>
        <Button onClick={handleMinify} variant="secondary" size="sm">
          Minify CSS
        </Button>
        <Button onClick={() => { setInput(''); setOutput(''); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="CSS Input" editable />
          <textarea
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="Result">
            <CopyButton value={output} />
            <DownloadButton content={output} filename="styles.css" mimeType="text/css" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={output}
          />
        </div>
      </div>
    </div>
  );
};

export default CSSFormatter;
