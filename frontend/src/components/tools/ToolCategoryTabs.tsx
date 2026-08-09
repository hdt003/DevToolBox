import React from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES, getToolsByCategory } from '../../data/toolsRegistry';
import { ToolDefinition } from '../../types/tool';
import { CategoryIcon } from '../common/CategoryIcon';

interface ToolCategoryTabsProps {
  currentTool: ToolDefinition;
}

export const ToolCategoryTabs: React.FC<ToolCategoryTabsProps> = ({ currentTool }) => {
  const categoryTools = getToolsByCategory(currentTool.category);

  return (
    <div className="mb-8 space-y-4">
      {/* Category Tabs */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-2 border-b border-slate-200 dark:border-slate-800 scrollbar-none">
        {CATEGORIES.map((cat) => {
          const isCurrentCat = cat.id === currentTool.category;
          return (
            <Link
              key={cat.id}
              to={`/tools?category=${cat.id}`}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isCurrentCat
                  ? 'bg-brand-600 text-white shadow-sm dark:bg-brand-500'
                  : 'bg-white text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white'
              }`}
            >
              <CategoryIcon name={cat.iconName} className="h-3.5 w-3.5" />
              <span>{cat.name}</span>
            </Link>
          );
        })}
      </div>

      {/* Quick Tool Switcher within Same Category */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
        <span className="text-slate-400 font-medium shrink-0">In this category:</span>
        {categoryTools.map((tool) => {
          const isActive = tool.id === currentTool.id;
          return (
            <Link
              key={tool.id}
              to={`/tools/${tool.slug}`}
              className={`rounded-md px-2.5 py-1 font-semibold whitespace-nowrap transition-colors ${
                isActive
                  ? 'bg-brand-100 text-brand-700 dark:bg-brand-950 dark:text-brand-300 border border-brand-300 dark:border-brand-800'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-800'
              }`}
            >
              {tool.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
};
