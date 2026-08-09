import React, { useState } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { ShieldAlert, Key, AlertCircle, RefreshCw } from 'lucide-react';

const SAMPLE_JWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwicm9sZSI6ImRldmVsb3BlciIsImlhdCI6MTUxNjIzOTAyMn0.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';

export const JWTDecoder: React.FC = () => {
  const [jwtInput, setJwtInput] = useState(SAMPLE_JWT);
  const [header, setHeader] = useState('');
  const [payload, setPayload] = useState('');
  const [signature, setSignature] = useState('');
  const [error, setError] = useState<string | null>(null);

  const base64UrlDecode = (str: string) => {
    let base64 = str.replace(/-/g, '+').replace(/_/g, '/');
    while (base64.length % 4) {
      base64 += '=';
    }
    return decodeURIComponent(
      Array.prototype.map
        .call(atob(base64), function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
  };

  const handleDecode = () => {
    if (!jwtInput.trim()) {
      setHeader('');
      setPayload('');
      setSignature('');
      setError(null);
      return;
    }

    const parts = jwtInput.trim().split('.');
    if (parts.length !== 3) {
      setError('Invalid JWT structure. A valid JWT token must contain 3 dot-separated parts (Header.Payload.Signature).');
      setHeader('');
      setPayload('');
      setSignature('');
      return;
    }

    try {
      const decodedHeader = JSON.parse(base64UrlDecode(parts[0]));
      const decodedPayload = JSON.parse(base64UrlDecode(parts[1]));

      setHeader(JSON.stringify(decodedHeader, null, 2));
      setPayload(JSON.stringify(decodedPayload, null, 2));
      setSignature(parts[2]);
      setError(null);
    } catch (err: any) {
      setError(`Malformed JWT payload encoding: ${err.message}`);
      setHeader('');
      setPayload('');
      setSignature('');
    }
  };

  return (
    <div className="space-y-6">
      
      {/* CLEAR DISCLAIMER BANNER */}
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <strong className="font-bold">Security Disclaimer:</strong> This tool decodes JSON Web Tokens (JWT) locally inside your browser DOM. Decoding does <strong>NOT verify token signature or authenticity</strong>. Never send real secrets or private tokens to remote servers.
        </div>
      </div>

      <div className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900">
        <Button onClick={handleDecode} variant="primary" size="sm">
          Decode JWT Token
        </Button>
        <Button onClick={() => setJwtInput(SAMPLE_JWT)} variant="outline" size="sm">
          <RefreshCw className="h-3.5 w-3.5 mr-1" /> Load Sample JWT
        </Button>
        <Button onClick={() => { setJwtInput(''); setHeader(''); setPayload(''); setSignature(''); setError(null); }} variant="ghost" size="sm">
          Clear
        </Button>
      </div>

      <div className="space-y-2">
        <TextAreaLabel label="Encoded JWT Token Input" editable />
        <textarea
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800 break-all"
          placeholder="Paste encoded JWT string (eyJhbGci...)..."
          value={jwtInput}
          onChange={(e) => setJwtInput(e.target.value)}
        />
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-rose-200 bg-rose-50 p-4 text-xs text-rose-800 dark:border-rose-900/50 dark:bg-rose-950/40 dark:text-rose-200">
          <AlertCircle className="h-5 w-5 text-rose-500 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {(header || payload || signature) && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          
          {/* Header */}
          <div className="space-y-2">
            <TextAreaLabel label="Header: Algorithm & Token Type">
              <CopyButton value={header} size="sm" />
            </TextAreaLabel>
            <textarea
              readOnly
              rows={10}
              className="w-full rounded-xl border border-red-200 bg-slate-900 p-4 font-mono text-xs text-red-300 focus:outline-none dark:border-red-900/50"
              value={header}
            />
          </div>

          {/* Payload */}
          <div className="space-y-2">
            <TextAreaLabel label="Payload: Claims & Data">
              <CopyButton value={payload} size="sm" />
            </TextAreaLabel>
            <textarea
              readOnly
              rows={10}
              className="w-full rounded-xl border border-purple-200 bg-slate-900 p-4 font-mono text-xs text-purple-300 focus:outline-none dark:border-purple-900/50"
              value={payload}
            />
          </div>

          {/* Signature */}
          <div className="space-y-2">
            <TextAreaLabel label="Signature">
              <CopyButton value={signature} size="sm" />
            </TextAreaLabel>
            <textarea
              readOnly
              rows={10}
              className="w-full rounded-xl border border-blue-200 bg-slate-900 p-4 font-mono text-xs text-blue-300 focus:outline-none dark:border-blue-900/50 break-all"
              value={signature}
            />
          </div>

        </div>
      )}
    </div>
  );
};

export default JWTDecoder;
