import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';

export const HTMLEntityTool: React.FC = () => {
  const [input, setInput] = useState('<div class="container">Hello & Welcome to "DevToolBox"!</div>');
  const [output, setOutput] = useState('');

  const handleEncode = () => {
    const encoded = input.replace(/[\u00A0-\u9999<>&"']/g, (i) => '&#' + i.charCodeAt(0) + ';');
    setOutput(encoded);
  };

  const handleDecode = () => {
    const doc = new DOMParser().parseFromString(input, 'text/html');
    setOutput(doc.documentElement.textContent || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleEncode} variant="primary" size="sm">
          Escape / Encode Entities
        </Button>
        <Button onClick={handleDecode} variant="outline" size="sm">
          Unescape / Decode Entities
        </Button>
        <Button onClick={() => { setInput(''); setOutput(''); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="Raw HTML / Entity Input" editable />
          <textarea
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            placeholder="Paste HTML or entity string..."
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
            placeholder="Result will appear here..."
            value={output}
          />
        </div>
      </div>
    </div>
  );
};

export default HTMLEntityTool;
