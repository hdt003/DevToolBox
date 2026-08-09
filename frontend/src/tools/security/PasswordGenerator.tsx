import React, { useState, useEffect } from 'react';
import { Button } from '../../components/common/Button';
import { CopyButton } from '../../components/tools/CopyButton';
import { ShieldCheck, RefreshCw, Lock, Sparkles } from 'lucide-react';

export const PasswordGenerator: React.FC = () => {
  const [length, setLength] = useState(16);
  const [useUppercase, setUseUppercase] = useState(true);
  const [useLowercase, setUseLowercase] = useState(true);
  const [useNumbers, setUseNumbers] = useState(true);
  const [useSymbols, setUseSymbols] = useState(true);
  const [excludeAmbiguous, setExcludeAmbiguous] = useState(false);
  const [password, setPassword] = useState('');

  const UPPERCASE = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const LOWERCASE = 'abcdefghijklmnopqrstuvwxyz';
  const NUMBERS = '0123456789';
  const SYMBOLS = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const AMBIGUOUS = 'iI1lLo0O8';

  const generatePassword = () => {
    let charSet = '';
    if (useUppercase) charSet += UPPERCASE;
    if (useLowercase) charSet += LOWERCASE;
    if (useNumbers) charSet += NUMBERS;
    if (useSymbols) charSet += SYMBOLS;

    if (excludeAmbiguous) {
      charSet = charSet.split('').filter((c) => !AMBIGUOUS.includes(c)).join('');
    }

    if (!charSet) {
      setPassword('');
      return;
    }

    // Cryptographically secure random selection using Web Crypto API
    const randomBuffer = new Uint32Array(length);
    window.crypto.getRandomValues(randomBuffer);

    let result = '';
    for (let i = 0; i < length; i++) {
      result += charSet[randomBuffer[i] % charSet.length];
    }

    setPassword(result);
  };

  useEffect(() => {
    generatePassword();
  }, [length, useUppercase, useLowercase, useNumbers, useSymbols, excludeAmbiguous]);

  // Calculate Entropy strength
  const getEntropyScore = () => {
    let poolSize = 0;
    if (useUppercase) poolSize += 26;
    if (useLowercase) poolSize += 26;
    if (useNumbers) poolSize += 10;
    if (useSymbols) poolSize += 26;
    if (poolSize === 0) return 0;
    return Math.floor(length * Math.log2(poolSize));
  };

  const entropy = getEntropyScore();
  const getStrengthLabel = () => {
    if (entropy < 40) return { label: 'Weak', color: 'bg-rose-500 text-rose-500' };
    if (entropy < 65) return { label: 'Moderate', color: 'bg-amber-500 text-amber-500' };
    if (entropy < 90) return { label: 'Strong', color: 'bg-emerald-500 text-emerald-500' };
    return { label: 'Very Strong', color: 'bg-indigo-500 text-indigo-500' };
  };

  const strength = getStrengthLabel();

  return (
    <div className="space-y-6">
      
      {/* Generated Password Box */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Generated Secure Password
          </span>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Strength: <span className={strength.color.split(' ')[1]}>{strength.label}</span> ({entropy} bits entropy)
            </span>
          </div>
        </div>

        <div className="relative flex items-center rounded-xl border border-slate-200 bg-slate-900 p-4 dark:border-slate-800">
          <span className="w-full font-mono text-lg font-bold text-white tracking-wider break-all">
            {password || 'Select options below'}
          </span>
          <div className="flex items-center gap-2 shrink-0 ml-2">
            <Button onClick={generatePassword} variant="ghost" size="sm" className="text-slate-300">
              <RefreshCw className="h-4 w-4" />
            </Button>
            <CopyButton value={password} variant="primary" size="md" />
          </div>
        </div>

        {/* Strength Progress Bar */}
        <div className="h-1.5 w-full rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
          <div
            className={`h-full transition-all duration-300 ${strength.color.split(' ')[0]}`}
            style={{ width: `${Math.min(100, (entropy / 120) * 100)}%` }}
          />
        </div>
      </div>

      {/* Options Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white">Password Rules & Options</h3>

        {/* Length Slider */}
        <div className="space-y-2">
          <div className="flex justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
            <label>Password Length: <span className="font-mono text-brand-600 dark:text-brand-400">{length} characters</span></label>
          </div>
          <input
            type="range"
            min={6}
            max={64}
            value={length}
            onChange={(e) => setLength(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-brand-600 dark:bg-slate-800"
          />
        </div>

        {/* Character Set Checkboxes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-medium text-slate-700 dark:text-slate-300">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={useUppercase}
              onChange={(e) => setUseUppercase(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>Include Uppercase Letters (A-Z)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={useLowercase}
              onChange={(e) => setUseLowercase(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>Include Lowercase Letters (a-z)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={useNumbers}
              onChange={(e) => setUseNumbers(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>Include Numbers (0-9)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={useSymbols}
              onChange={(e) => setUseSymbols(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>Include Symbols (!@#$%)</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer sm:col-span-2">
            <input
              type="checkbox"
              checked={excludeAmbiguous}
              onChange={(e) => setExcludeAmbiguous(e.target.checked)}
              className="rounded border-slate-300 text-brand-600 focus:ring-brand-500 h-4 w-4"
            />
            <span>Exclude Ambiguous Characters (e.g. 1, l, I, 0, O, 8)</span>
          </label>
        </div>

      </div>

    </div>
  );
};

export default PasswordGenerator;
