import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';

export const SQLMinifier: React.FC = () => {
  const [input, setInput] = useState(`SELECT u.id, u.name, SUM(o.total_amount) AS total_spent
FROM users u
JOIN orders o ON u.id = o.user_id
WHERE o.status = 'completed'
GROUP BY u.id, u.name;`);
  const [output, setOutput] = useState('');

  const handleMinify = () => {
    if (!input.trim()) return;
    // Strip single line & block comments and collapse spaces
    const minified = input
      .replace(/--.*$/gm, '')
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/\s+/g, ' ')
      .trim();
    setOutput(minified);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleMinify} variant="primary" size="sm">
          Minify SQL
        </Button>
        <Button onClick={() => { setInput(''); setOutput(''); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="Raw SQL Query" editable />
          <textarea
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:border-brand-500 focus:outline-none dark:border-slate-800"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="Minified SQL">
            <CopyButton value={output} />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={10}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={output}
          />
        </div>
      </div>
    </div>
  );
};

export default SQLMinifier;
