import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle } from 'lucide-react';

const SAMPLE_XML = `<note><to>Tove</to><from>Jani</from><heading>Reminder</heading><body>Don't forget me this weekend!</body></note>`;

export const XMLFormatter: React.FC = () => {
  const [input, setInput] = useState(SAMPLE_XML);
  const [output, setOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const formatXml = (xml: string) => {
    let formatted = '';
    const reg = /(>)(<)(\/*)/g;
    xml = xml.replace(reg, '$1\r\n$2$3');
    let pad = 0;

    xml.split('\r\n').forEach(function (node) {
      let indent = 0;
      if (node.match(/.+<\/\w[^>]*>$/)) {
        indent = 0;
      } else if (node.match(/^<\/\w/)) {
        if (pad !== 0) {
          pad -= 1;
        }
      } else if (node.match(/^<\w[^>]*[^\/]>.*$/)) {
        indent = 1;
      } else {
        indent = 0;
      }

      let padding = '';
      for (let i = 0; i < pad; i++) {
        padding += '  ';
      }

      formatted += padding + node + '\r\n';
      pad += indent;
    });

    return formatted.trim();
  };

  const handleFormat = () => {
    if (!input.trim()) return;
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(input, 'text/xml');
      const parseError = xmlDoc.getElementsByTagName('parsererror');

      if (parseError.length > 0) {
        setError(`XML Syntax Error: ${parseError[0].textContent}`);
        setOutput('');
        return;
      }

      setOutput(formatXml(input));
      setError(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleFormat} variant="primary" size="sm">
          Format & Validate XML
        </Button>
        <Button onClick={() => { setInput(''); setOutput(''); setError(null); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="XML Input" editable />
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
            <DownloadButton content={output} filename="formatted.xml" mimeType="application/xml" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
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

export default XMLFormatter;
