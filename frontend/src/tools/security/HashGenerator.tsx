import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { TextAreaLabel } from '../../components/common/TextAreaLabel';
import { ShieldCheck, Hash as HashIcon, Upload } from 'lucide-react';

export const HashGenerator: React.FC = () => {
  const [inputText, setInputText] = useState('DevToolBox Security & Crypto Utilities');
  const [hashes, setHashes] = useState<{
    md5: string;
    sha1: string;
    sha256: string;
    sha384: string;
    sha512: string;
  }>({ md5: '', sha1: '', sha256: '', sha384: '', sha512: '' });
  const [isUppercase, setIsUppercase] = useState(false);

  // Pure JS MD5 implementation for client-side MD5
  const md5Hex = (str: string): string => {
    function md5cycle(x: number[], k: number[]) {
      let a = x[0], b = x[1], c = x[2], d = x[3];
      a = ff(a, b, c, d, k[0], 7, -680876936);
      d = ff(d, a, b, c, k[1], 12, -389564586);
      c = ff(c, d, a, b, k[2], 17, 606105819);
      b = ff(b, c, d, a, k[3], 22, -1044525330);
      a = ff(a, b, c, d, k[4], 7, -176418897);
      d = ff(d, a, b, c, k[5], 12, 1200080426);
      c = ff(c, d, a, b, k[6], 17, -1473231341);
      b = ff(b, c, d, a, k[7], 22, -45705983);
      a = ff(a, b, c, d, k[8], 7, 1770035416);
      d = ff(d, a, b, c, k[9], 12, -1958414417);
      c = ff(c, d, a, b, k[10], 17, -42063);
      b = ff(b, c, d, a, k[11], 22, -1990404162);
      a = ff(a, b, c, d, k[12], 7, 1804603682);
      d = ff(d, a, b, c, k[13], 12, -40341101);
      c = ff(c, d, a, b, k[14], 17, -1502002290);
      b = ff(b, c, d, a, k[15], 22, 1236535329);
      a = gg(a, b, c, d, k[1], 5, -165796510);
      d = gg(d, a, b, c, k[6], 9, -1069501632);
      c = gg(c, d, a, b, k[11], 14, 643717713);
      b = gg(b, c, d, a, k[0], 20, -373897302);
      a = gg(a, b, c, d, k[5], 5, -701558691);
      d = gg(d, a, b, c, k[10], 9, 38016083);
      c = gg(c, d, a, b, k[15], 14, -660478335);
      b = gg(b, c, d, a, k[4], 20, -405537848);
      a = gg(a, b, c, d, k[9], 5, 568446438);
      d = gg(d, a, b, c, k[14], 9, -1019803690);
      c = gg(c, d, a, b, k[3], 14, -187363961);
      b = gg(b, c, d, a, k[8], 20, 1163531501);
      a = gg(a, b, c, d, k[13], 5, -1444681467);
      d = gg(d, a, b, c, k[2], 9, -51403784);
      c = gg(c, d, a, b, k[7], 14, 1735328473);
      b = gg(b, c, d, a, k[12], 20, -1926607734);
      a = hh(a, b, c, d, k[5], 4, -378558);
      d = hh(d, a, b, c, k[8], 11, -2022574463);
      c = hh(c, d, a, b, k[11], 16, 1839030562);
      b = hh(b, c, d, a, k[14], 23, -35309556);
      a = hh(a, b, c, d, k[1], 4, -1530992060);
      d = hh(d, a, b, c, k[4], 11, 1272893353);
      c = hh(c, d, a, b, k[7], 16, -155497632);
      b = hh(b, c, d, a, k[10], 23, -1094730640);
      a = hh(a, b, c, d, k[13], 4, 681279174);
      d = hh(d, a, b, c, k[0], 11, -358537222);
      c = hh(c, d, a, b, k[3], 16, -722521979);
      b = hh(b, c, d, a, k[6], 23, 76029189);
      a = hh(a, b, c, d, k[9], 4, -640364487);
      d = hh(d, a, b, c, k[12], 11, -421815835);
      c = hh(c, d, a, b, k[15], 16, 530742520);
      b = hh(b, c, d, a, k[2], 23, -995338651);
      a = ii(a, b, c, d, k[0], 6, -198630844);
      d = ii(d, a, b, c, k[7], 10, 1126891415);
      c = ii(c, d, a, b, k[12], 15, -1416354905);
      b = ii(b, c, d, a, k[5], 21, -57434055);
      a = ii(a, b, c, d, k[14], 6, 1700485571);
      d = ii(d, a, b, c, k[3], 10, -1894980757);
      c = ii(c, d, a, b, k[8], 15, -67908009);
      b = ii(b, c, d, a, k[13], 21, -343485551);
      x[0] = add32(a, x[0]);
      x[1] = add32(b, x[1]);
      x[2] = add32(c, x[2]);
      x[3] = add32(d, x[3]);
    }
    function cmn(q: number, a: number, b: number, x: number, s: number, t: number) {
      a = add32(add32(a, q), add32(x, t));
      return add32((a << s) | (a >>> (32 - s)), b);
    }
    function ff(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & c) | (~b & d), a, b, x, s, t);
    }
    function gg(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn((b & d) | (c & ~d), a, b, x, s, t);
    }
    function hh(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a: number, b: number, c: number, d: number, x: number, s: number, t: number) {
      return cmn(c ^ (b | ~d), a, b, x, s, t);
    }
    function add32(a: number, b: number) {
      return (a + b) & 0xffffffff;
    }
    function md51(s: string) {
      const n = s.length, state = [1732584193, -271733879, -1732584194, 271733878];
      let i;
      for (i = 64; i <= s.length; i += 64) {
        md5cycle(state, md5blk(s.substring(i - 64, i)));
      }
      s = s.substring(i - 64);
      const tail = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
      for (i = 0; i < s.length; i++) tail[i >> 2] |= s.charCodeAt(i) << ((i % 4) << 3);
      tail[i >> 2] |= 0x80 << ((i % 4) << 3);
      if (i > 55) {
        md5cycle(state, tail);
        for (i = 0; i < 16; i++) tail[i] = 0;
      }
      tail[14] = n * 8;
      md5cycle(state, tail);
      return state;
    }
    function md5blk(s: string) {
      const md5blks = [];
      for (let i = 0; i < 64; i += 4) {
        md5blks[i >> 2] = s.charCodeAt(i) + (s.charCodeAt(i + 1) << 8) + (s.charCodeAt(i + 2) << 16) + (s.charCodeAt(i + 3) << 24);
      }
      return md5blks;
    }
    function rhex(n: number) {
      const hex_chr = '0123456789abcdef';
      let s = '';
      for (let j = 0; j < 4; j++) s += hex_chr.charAt((n >> (j * 8 + 4)) & 0x0f) + hex_chr.charAt((n >> (j * 8)) & 0x0f);
      return s;
    }
    return md51(str).map(rhex).join('');
  };

  const calculateWebCryptoHash = async (algo: string, text: string) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(text);
    const hashBuffer = await window.crypto.subtle.digest(algo, data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  };

  const generateHashes = async () => {
    if (!inputText) {
      setHashes({ md5: '', sha1: '', sha256: '', sha384: '', sha512: '' });
      return;
    }

    try {
      const [sha1, sha256, sha384, sha512] = await Promise.all([
        calculateWebCryptoHash('SHA-1', inputText),
        calculateWebCryptoHash('SHA-256', inputText),
        calculateWebCryptoHash('SHA-384', inputText),
        calculateWebCryptoHash('SHA-512', inputText),
      ]);
      const md5 = md5Hex(inputText);

      setHashes({ md5, sha1, sha256, sha384, sha512 });
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    generateHashes();
  }, [inputText]);

  const formatHash = (h: string) => (isUppercase ? h.toUpperCase() : h.toLowerCase());

  return (
    <div className="space-y-6">
      
      <div className="rounded-xl border border-blue-200 bg-blue-50 p-4 text-xs text-blue-900 dark:border-blue-900/50 dark:bg-blue-950/40 dark:text-blue-200 flex items-center gap-2">
        <ShieldCheck className="h-5 w-5 text-blue-500 shrink-0" />
        <span><strong>Note:</strong> Hashing is a one-way cryptographic function, not encryption. Hashes cannot be reversed to plain text.</span>
      </div>

      <div className="space-y-2">
        <TextAreaLabel label="Input Text String" editable>
          <label className="flex items-center gap-1.5 cursor-pointer">
            <input
              type="checkbox"
              checked={isUppercase}
              onChange={(e) => setIsUppercase(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500"
            />
            <span>Uppercase Hashes</span>
          </label>
        </TextAreaLabel>
        <textarea
          rows={4}
          className="w-full rounded-xl border border-slate-200 bg-slate-900 p-4 font-mono text-xs text-slate-100 placeholder-slate-500 focus:border-brand-500 focus:outline-none dark:border-slate-800"
          placeholder="Type text to calculate cryptographic hashes live..."
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
      </div>

      <div className="space-y-4">
        {[
          { label: 'MD5 (128-bit)', key: 'md5' },
          { label: 'SHA-1 (160-bit)', key: 'sha1' },
          { label: 'SHA-256 (256-bit)', key: 'sha256' },
          { label: 'SHA-384 (384-bit)', key: 'sha384' },
          { label: 'SHA-512 (512-bit)', key: 'sha512' },
        ].map(({ label, key }) => {
          const val = formatHash((hashes as any)[key]);
          return (
            <div key={key} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
              <TextAreaLabel label={label}>
                <CopyButton value={val} size="sm" />
              </TextAreaLabel>
              <input
                type="text"
                readOnly
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
                value={val}
              />
            </div>
          );
        })}
      </div>

    </div>
  );
};

export default HashGenerator;
