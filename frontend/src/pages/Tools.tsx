import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Star, ArrowRight } from 'lucide-react';
import { TOOLS, CATEGORIES } from '../data/toolsRegistry';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { useFavorites } from '../hooks/useFavorites';

export const ToolsPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || 'all';
  const [query, setQuery] = useState('');
  const { isFavorite, toggleFavorite } = useFavorites();

  const filteredTools = TOOLS.filter((tool) => {
    const matchesCategory = selectedCategory === 'all' || tool.category === selectedCategory;
    const q = query.toLowerCase().trim();
    const matchesQuery =
      !q ||
      tool.name.toLowerCase().includes(q) ||
      tool.description.toLowerCase().includes(q) ||
      tool.keywords.some((k) => k.toLowerCase().includes(q));
    return matchesCategory && matchesQuery;
  });

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          All Developer Tools ({TOOLS.length})
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          Explore all browser-based utilities organized by domain and workflow.
        </p>
      </div>

      {/* Filter Toolbar: Category Badges + Search Input */}
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Category Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 scrollbar-none">
          <button
            onClick={() => setSearchParams({})}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors ${
              selectedCategory === 'all'
                ? 'bg-brand-600 text-white dark:bg-brand-500'
                : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
            }`}
          >
            All Tools ({TOOLS.length})
          </button>
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSearchParams({ category: cat.id })}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-colors flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-brand-600 text-white dark:bg-brand-500'
                    : 'bg-white text-slate-700 hover:bg-slate-100 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800'
                }`}
              >
                <CategoryIcon name={cat.iconName} className="h-3.5 w-3.5" />
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Filter Input */}
        <div className="relative w-full md:w-72 shrink-0">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
          <input
            type="text"
            className="w-full rounded-xl border border-slate-200 bg-white py-2 pl-9 pr-4 text-xs text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-900 dark:text-white"
            placeholder="Filter tools..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      {/* Tools Grid */}
      {filteredTools.length === 0 ? (
        <div className="rounded-xl border border-dashed border-slate-300 p-12 text-center text-slate-500 dark:border-slate-800 dark:text-slate-400">
          No developer tools match your filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTools.map((tool) => {
            const favored = isFavorite(tool.id);
            return (
              <Card key={tool.id} hoverEffect className="flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                      <CategoryIcon name={tool.iconName} className="h-5 w-5" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className="p-1.5 text-slate-300 hover:text-amber-500 dark:text-slate-700 dark:hover:text-amber-400"
                    >
                      <Star className={`h-5 w-5 ${favored ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Badge variant="outline" className="uppercase text-[10px]">
                    {tool.category}
                  </Badge>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
                  >
                    Open Tool <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};
