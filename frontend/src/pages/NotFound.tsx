import React from 'react';
import { Link } from 'react-router-dom';
import { FileQuestion, ArrowLeft, Home } from 'lucide-react';
import { Button } from '../components/common/Button';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-md px-4 py-24 text-center space-y-6">
      <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
        <FileQuestion className="h-8 w-8" />
      </div>
      <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">404</h1>
      <h2 className="text-lg font-bold text-slate-800 dark:text-slate-200">Page or Tool Not Found</h2>
      <p className="text-xs text-slate-500 dark:text-slate-400">
        The tool or page you are looking for doesn&apos;t exist or may have been moved.
      </p>
      <div className="flex items-center justify-center gap-3 pt-4">
        <Link to="/">
          <Button variant="primary" size="sm">
            <Home className="h-4 w-4 mr-1.5" /> Back to Home
          </Button>
        </Link>
        <Link to="/tools">
          <Button variant="outline" size="sm">
            Browse All Tools
          </Button>
        </Link>
      </div>
    </div>
  );
};
