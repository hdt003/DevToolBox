import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, Command, ArrowRight } from 'lucide-react';
import { useSearch } from '../../hooks/useSearch';
import { CategoryIcon } from '../common/CategoryIcon';
import { Badge } from '../common/Badge';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { query, setQuery, results } = useSearch('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
      setSelectedIndex(0);
    } else {
      setQuery('');
    }
  }, [isOpen, setQuery]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(results.length, 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + results.length) % Math.max(results.length, 1));
    } else if (e.key === 'Enter' && results[selectedIndex]) {
      e.preventDefault();
      handleSelect(results[selectedIndex].slug);
    } else if (e.key === 'Escape') {
      onClose();
    }
  };

  const handleSelect = (slug: string) => {
    navigate(`/tools/${slug}`);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in" onClick={onClose}>
      <div
        className="w-full max-w-2xl rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden dark:border-slate-800 dark:bg-slate-900"
        onKeyDown={handleKeyDown}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="relative flex items-center border-b border-slate-200 px-4 dark:border-slate-800">
          <Search className="h-5 w-5 text-slate-400" />
          <input
            ref={inputRef}
            type="text"
            className="w-full bg-transparent px-3 py-4 text-base text-slate-900 placeholder-slate-400 focus:outline-none dark:text-slate-100 dark:placeholder-slate-500"
            placeholder="Search 30+ developer tools (e.g. JSON, JWT, UUID, Regex)..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2">
          {results.length === 0 ? (
            <div className="p-8 text-center text-sm text-slate-500 dark:text-slate-400">
              No tools matching &quot;{query}&quot; found.
            </div>
          ) : (
            <div className="space-y-1">
              {results.map((tool, idx) => {
                const isSelected = idx === selectedIndex;
                return (
                  <div
                    key={tool.id}
                    onClick={() => handleSelect(tool.slug)}
                    onMouseEnter={() => setSelectedIndex(idx)}
                    className={`flex items-center justify-between rounded-lg px-3.5 py-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-brand-50 text-brand-900 dark:bg-brand-950/70 dark:text-brand-100'
                        : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800/60'
                    }`}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-md ${
                          isSelected
                            ? 'bg-brand-600 text-white dark:bg-brand-500'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        <CategoryIcon name={tool.iconName} className="h-4 w-4" />
                      </div>
                      <div className="truncate">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">{tool.name}</span>
                          <Badge variant="outline" className="text-[10px] uppercase">
                            {tool.category}
                          </Badge>
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate mt-0.5">
                          {tool.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className={`h-4 w-4 shrink-0 transition-transform ${isSelected ? 'translate-x-0.5 text-brand-600 dark:text-brand-400' : 'opacity-0'}`} />
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Search Modal Footer */}
        <div className="flex items-center justify-between border-t border-slate-200 bg-slate-50 px-4 py-2.5 text-xs text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
          <div className="flex items-center gap-3">
            <span>
              <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">
                ↑↓
              </kbd>{' '}
              Navigate
            </span>
            <span>
              <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">
                ↵
              </kbd>{' '}
              Select
            </span>
            <span>
              <kbd className="rounded border border-slate-300 bg-white px-1.5 py-0.5 font-mono text-[10px] dark:border-slate-700 dark:bg-slate-800">
                ESC
              </kbd>{' '}
              Close
            </span>
          </div>
          <div className="flex items-center gap-1">
            <Command className="h-3 w-3" />
            <span>DevToolBox Search</span>
          </div>
        </div>
      </div>
    </div>
  );
};
