import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const Card: React.FC<CardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div
      className={`rounded-xl border border-slate-200/80 bg-white p-5 shadow-xs dark:border-slate-800 dark:bg-slate-900 ${
        hoverEffect
          ? 'transition-all duration-200 hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:hover:border-brand-700'
          : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};
