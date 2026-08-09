import React, { useState } from 'react';
import YAML from 'yaml';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { DownloadButton } from '../../components/tools/DownloadButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { AlertCircle } from 'lucide-react';

const SAMPLE_JSON = `{
  "name": "DevToolBox",
  "version": "1.0.0",
  "features": ["JSON", "JWT", "YAML"],
  "server": {
    "port": 8080,
    "ssl": true
  }
}`;

export const JSONYAMLConverter: React.FC = () => {
  const [jsonInput, setJsonInput] = useState(SAMPLE_JSON);
  const [yamlOutput, setYamlOutput] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleConvert = () => {
    if (!jsonInput.trim()) return;
    try {
      const parsed = JSON.parse(jsonInput);
      const doc = new YAML.Document(parsed);
      setYamlOutput(doc.toString());
      setError(null);
    } catch (err: any) {
      setError(`JSON Parsing Error: ${err.message}`);
      setYamlOutput('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleConvert} variant="primary" size="sm">
          Convert JSON to YAML
        </Button>
        <Button onClick={() => { setJsonInput(''); setYamlOutput(''); setError(null); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-2">
          <TextAreaLabel label="JSON Input" editable />
          <textarea
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={jsonInput}
            onChange={(e) => setJsonInput(e.target.value)}
          />
        </div>

        <div className="space-y-2">
          <TextAreaLabel label="YAML Output">
            <CopyButton value={yamlOutput} />
            <DownloadButton content={yamlOutput} filename="converted.yaml" mimeType="text/yaml" />
          </TextAreaLabel>
          <textarea
            readOnly
            rows={12}
            className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 focus:outline-none dark:border-slate-800"
            value={yamlOutput}
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

export default JSONYAMLConverter;
