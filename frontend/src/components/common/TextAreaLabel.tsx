import React from 'react';
import { Pencil } from 'lucide-react';

interface TextAreaLabelProps {
  label: string;
  editable?: boolean;
  children?: React.ReactNode;
}

export const TextAreaLabel: React.FC<TextAreaLabelProps> = ({
  label,
  editable = false,
  children,
}) => {
  return (
    <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300">
      <span className="flex items-center gap-1.5">
        {label}
        {editable && (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-medium text-amber-700 dark:bg-amber-950/60 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
            <Pencil className="h-2.5 w-2.5" />
            Editable
          </span>
        )}
      </span>
      {children && <div className="flex items-center gap-2">{children}</div>}
    </div>
  );
};
