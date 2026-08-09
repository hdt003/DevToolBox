import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ToolDefinition } from '../../types/tool';
import { TOOLS } from '../../data/toolsRegistry';
import { CategoryIcon } from '../common/CategoryIcon';
import { Card } from '../common/Card';

interface RelatedToolsProps {
  currentTool: ToolDefinition;
}

export const RelatedTools: React.FC<RelatedToolsProps> = ({ currentTool }) => {
  // Find related tools by category or matching keywords
  const related = TOOLS.filter(
    (t) =>
      t.id !== currentTool.id &&
      (t.category === currentTool.category ||
        t.keywords.some((k) => currentTool.keywords.includes(k)))
  ).slice(0, 4);

  if (related.length === 0) return null;

  return (
    <section className="mt-12 border-t border-slate-200 pt-8 dark:border-slate-800">
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">
        Related Developer Tools
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {related.map((tool) => (
          <Link key={tool.id} to={`/tools/${tool.slug}`}>
            <Card hoverEffect className="h-full flex flex-col justify-between p-4">
              <div>
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                    <CategoryIcon name={tool.iconName} className="h-4 w-4" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white truncate">
                    {tool.name}
                  </h4>
                </div>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                  {tool.description}
                </p>
              </div>
              <div className="mt-3 flex items-center justify-end text-xs font-semibold text-brand-600 dark:text-brand-400">
                Open <ArrowRight className="h-3.5 w-3.5 ml-1" />
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </section>
  );
};
