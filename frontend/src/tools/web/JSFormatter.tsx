import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';

export const JSFormatter: React.FC = () => {
  const [input, setInput] = useState('function calculateTotal(items){return items.reduce((sum,item)=>sum+item.price,0);}');
  const [output, setOutput] = useState('');

  const handleFormat = () => {
    if (!input.trim()) return;
    // Safe client-side JS formatting without eval or arbitrary execution
    const formatted = input
      .replace(/;\s*/g, ';\n')
      .replace(/\{\s*/g, ' {\n  ')
      .replace(/\}\s*/g, '\n}\n');
    setOutput(formatted);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleFormat} variant="primary" size="sm">
          Format JavaScript
        </Button>
        <Button onClick={() => { setInput(''); setOutput(''); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="JavaScript / TS Input" editable />
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

export default JSFormatter;
