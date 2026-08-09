import React, { useState } from 'react';
import { CopyButton } from '../../components/tools/CopyButton';
import { Button } from '../../components/common/Button';
import { Palette, RefreshCw } from 'lucide-react';

export const ColorConverter: React.FC = () => {
  const [hex, setHex] = useState('#6366f1');

  const hexToRgb = (h: string) => {
    let clean = h.replace('#', '');
    if (clean.length === 3) {
      clean = clean.split('').map((c) => c + c).join('');
    }
    const num = parseInt(clean, 16);
    if (isNaN(num) || clean.length !== 6) return { r: 99, g: 102, b: 241 };
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255,
    };
  };

  const rgb = hexToRgb(hex);

  const rgbToHsl = (r: number, g: number, b: number) => {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h = 0, s = 0, l = (max + min) / 2;

    if (max !== min) {
      const d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break;
        case g: h = (b - r) / d + 2; break;
        case b: h = (r - g) / d + 4; break;
      }
      h /= 6;
    }
    return {
      h: Math.round(h * 360),
      s: Math.round(s * 100),
      l: Math.round(l * 100),
    };
  };

  const rgbToCmyk = (r: number, g: number, b: number) => {
    let c = 1 - r / 255;
    let m = 1 - g / 255;
    let y = 1 - b / 255;
    let k = Math.min(c, Math.min(m, y));
    if (k === 1) return { c: 0, m: 0, y: 0, k: 100 };
    c = Math.round(((c - k) / (1 - k)) * 100);
    m = Math.round(((m - k) / (1 - k)) * 100);
    y = Math.round(((y - k) / (1 - k)) * 100);
    k = Math.round(k * 100);
    return { c, m, y, k };
  };

  const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b);
  const cmyk = rgbToCmyk(rgb.r, rgb.g, rgb.b);

  const rgbStr = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
  const rgbaStr = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1.0)`;
  const hslStr = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
  const hslaStr = `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, 1.0)`;
  const cmykStr = `cmyk(${cmyk.c}%, ${cmyk.m}%, ${cmyk.y}%, ${cmyk.k}%)`;

  const handleRandomColor = () => {
    const randomHex = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    setHex(randomHex);
  };

  return (
    <div className="space-y-6">
      
      {/* Color Preview & Picker */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 flex flex-col md:flex-row items-center justify-between gap-6">
        
        <div className="flex items-center gap-4 w-full md:w-auto">
          <div
            className="h-20 w-20 rounded-2xl shadow-inner border border-slate-300 dark:border-slate-700 shrink-0 transition-colors"
            style={{ backgroundColor: hex }}
          />
          <div>
            <span className="text-xs font-semibold text-slate-500 block">HEX Color Picker</span>
            <div className="flex items-center gap-2 mt-1">
              <input
                type="color"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="h-9 w-9 rounded-lg border border-slate-300 cursor-pointer"
              />
              <input
                type="text"
                value={hex}
                onChange={(e) => setHex(e.target.value)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 font-mono text-sm font-bold text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
              />
            </div>
          </div>
        </div>

        <Button onClick={handleRandomColor} variant="outline" size="sm">
          <RefreshCw className="h-4 w-4 mr-1.5" /> Random Color
        </Button>

      </div>

      {/* Converted Formats List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {[
          { label: 'HEX Format', val: hex.toUpperCase() },
          { label: 'RGB Format', val: rgbStr },
          { label: 'RGBA Format', val: rgbaStr },
          { label: 'HSL Format', val: hslStr },
          { label: 'HSLA Format', val: hslaStr },
          { label: 'CMYK Format', val: cmykStr },
        ].map(({ label, val }) => (
          <div key={label} className="rounded-xl border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900 space-y-2">
            <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
              <span>{label}</span>
              <CopyButton value={val} size="sm" />
            </div>
            <input
              type="text"
              readOnly
              className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 font-mono text-xs text-slate-900 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-slate-100"
              value={val}
            />
          </div>
        ))}
      </div>

    </div>
  );
};

export default ColorConverter;
