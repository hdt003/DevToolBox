import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';

export const HTMLFormatter: React.FC = () => {
  const [input, setInput] = useState('<div class="box"><h1>DevToolBox</h1><p>Fast & free utilities</p></div>');
  const [output, setOutput] = useState('');

  const formatHTML = (html: string) => {
    let tab = '  ';
    let result = '';
    let indent = '';

    html.split(/>\s*</).forEach(function (element) {
      if (element.match(/^\/\w/)) {
        indent = indent.substring(tab.length);
      }
      result += indent + '<' + element + '>\r\n';
      if (element.match(/^<?\w[^>]*[^\/]$/) && !element.startsWith('input') && !element.startsWith('img') && !element.startsWith('br')) {
        indent += tab;
      }
    });

    return result.substring(1, result.length - 3);
  };

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      setOutput(formatHTML(input.trim()));
    } catch {
      setOutput(input);
    }
  };

  const handleMinify = () => {
    if (!input.trim()) return;
    setOutput(input.replace(/>\s+</g, '><').trim());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleFormat} variant="primary" size="sm">
          Format HTML
        </Button>
        <Button onClick={handleMinify} variant="secondary" size="sm">
          Minify HTML
        </Button>
        <Button onClick={() => { setInput(''); setOutput(''); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="HTML Input" editable />
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
            <DownloadButton content={output} filename="formatted.html" mimeType="text/html" />
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

export default HTMLFormatter;
