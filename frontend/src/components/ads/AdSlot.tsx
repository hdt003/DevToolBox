import React from 'react';
import { Megaphone } from 'lucide-react';

interface AdSlotProps {
  position?: 'top' | 'middle' | 'bottom' | 'sidebar';
  className?: string;
}

export const AdSlot: React.FC<AdSlotProps> = ({ position = 'middle', className = '' }) => {
  // Check if an AdSense ID or custom ad script is present in env variables
  const adsenseId = import.meta.env.VITE_ADSENSE_ID;

  if (adsenseId) {
    return (
      <div className={`my-6 text-center overflow-hidden ${className}`}>
        <ins
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client={adsenseId}
          data-ad-slot="1234567890"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    );
  }

  // Render sleek, realistic visual ad unit placeholders for development & demonstration
  const dimensions = {
    top: 'h-24 max-w-4xl mx-auto',
    middle: 'h-28 max-w-4xl mx-auto',
    bottom: 'h-24 max-w-4xl mx-auto',
    sidebar: 'h-64 w-full',
  };

  return (
    <div
      aria-label={`Advertisement Slot - ${position}`}
      className={`my-6 flex items-center justify-center rounded-xl border border-dashed border-slate-300 bg-gradient-to-r from-slate-100/80 via-slate-50 to-slate-100/80 p-4 text-center dark:border-slate-800 dark:from-slate-900/60 dark:via-slate-950 dark:to-slate-900/60 transition-all ${dimensions[position]} ${className}`}
    >
      <div className="flex items-center gap-3">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600 dark:text-amber-400">
          <Megaphone className="h-4 w-4" />
        </div>
        <div className="text-left">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Advertisement Slot ({position.toUpperCase()})
            </span>
            <span className="rounded bg-slate-200/80 px-1.5 py-0.5 font-mono text-[10px] text-slate-600 dark:bg-slate-800 dark:text-slate-400">
              {position === 'sidebar' ? '300 × 250' : '728 × 90 Leaderboard'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
            AdSense / Sponsor Unit • Set <code>VITE_ADSENSE_ID</code> in production to enable live ads
          </p>
        </div>
      </div>
    </div>
  );
};
