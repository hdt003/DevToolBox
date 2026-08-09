import React, { useState } from 'react';
import YAML from 'yaml';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle } from 'lucide-react';

const SAMPLE_YAML = `version: "1.0"
services:
  web:
    image: nginx:latest
    ports:
      - "80:80"
  db:
    image: postgres:15
    environment:
      POSTGRES_DB: devtoolbox`;

export const YAMLJSONConverter: React.FC = () => {
  const [yamlInput, setYamlInput] = useState(SAMPLE_YAML);
  const [jsonOutput, setJsonOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    if (!yamlInput.trim()) return;
    try {
      const parsed = YAML.parse(yamlInput);
      setJsonOutput(JSON.stringify(parsed, null, 2));
      setError(null);
    } catch (err: any) {
      setError(`YAML Parsing Error: ${err.message}`);
      setJsonOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleConvert} variant="primary" size="sm">
          Convert YAML to JSON
        </Button>
        <Button onClick={() => { setYamlInput(''); setJsonOutput(''); setError(null); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="YAML Input" editable />
          <textarea
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={yamlInput}
            onChange={(e) => setYamlInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="JSON Output">
            <CopyButton value={jsonOutput} />
            <DownloadButton content={jsonOutput} filename="converted.json" mimeType="application/json" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={jsonOutput}
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

export default YAMLJSONConverter;
