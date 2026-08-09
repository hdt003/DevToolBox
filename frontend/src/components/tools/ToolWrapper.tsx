import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Star, ShieldCheck, ChevronRight } from "lucide-react";
import { ToolDefinition } from "../../types/tool";
import { useFavorites } from "../../hooks/useFavorites";
import { useRecentTools } from "../../hooks/useRecentTools";
import { CategoryIcon } from "../common/CategoryIcon";
import { Badge } from "../common/Badge";
import { AdSlot } from "../ads/AdSlot";
import { RelatedTools } from "./RelatedTools";
import { ToolSEOContent } from "./ToolSEOContent";
import { ToolCategoryTabs } from "./ToolCategoryTabs";

interface ToolWrapperProps {
  tool: ToolDefinition;
  children: React.ReactNode;
  howToSteps?: string[];
  features?: string[];
  faqs?: Array<{ question: string; answer: string }>;
}

export const ToolWrapper: React.FC<ToolWrapperProps> = ({
  tool,
  children,
  howToSteps,
  features,
  faqs,
}) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  const { addRecent } = useRecentTools();
  const favored = isFavorite(tool.id);

  // Track recent tool view on render
  useEffect(() => {
    addRecent(tool.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tool.id]);

  // Update dynamic page head meta tags for SEO
  useEffect(() => {
    document.title = tool.seoTitle || `${tool.name} - DevToolBox`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", tool.seoDescription);
    }
  }, [tool]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      {/* BREADCRUMBS */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mb-6">
        <Link
          to="/"
          className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <Link
          to="/tools"
          className="hover:text-brand-600 dark:hover:text-brand-400 transition-colors"
        >
          Developer Tools
        </Link>
        <ChevronRight className="h-3.5 w-3.5 text-slate-400" />
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate">
          {tool.name}
        </span>
      </nav>

      {/* TOOL HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-brand-600 text-white dark:bg-brand-500 shadow-md shadow-brand-500/20">
            <CategoryIcon name={tool.iconName} className="h-6 w-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                {tool.name}
              </h1>
              <Badge variant="brand" className="uppercase text-[10px]">
                {tool.category}
              </Badge>
            </div>
            <p className="mt-1 text-xs text-slate-600 dark:text-slate-300 max-w-2xl leading-relaxed">
              {tool.description}
            </p>
          </div>
        </div>

        {/* Action Controls: Favorite toggle & Privacy badge */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="hidden sm:flex items-center gap-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 px-2.5 py-1 rounded-lg">
            <ShieldCheck className="h-3.5 w-3.5" /> Client-Side Tool
          </div>

          <button
            onClick={() => toggleFavorite(tool.id)}
            className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold transition-all ${
              favored
                ? "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-800 dark:bg-amber-950 dark:text-amber-300"
                : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            }`}
          >
            <Star
              className={`h-4 w-4 ${favored ? "fill-amber-500 text-amber-500" : ""}`}
            />
            <span>{favored ? "Favorited" : "Favorite"}</span>
          </button>
        </div>
      </div>

      {/* CATEGORY & TOOL TABS */}
      <ToolCategoryTabs currentTool={tool} />

      {/* TOP AD SLOT */}
      <AdSlot position="top" />

      {/* TOOL WORKSPACE / MAIN FUNCTIONALITY */}
      <div className="my-6">{children}</div>

      {/* MIDDLE AD SLOT */}
      <AdSlot position="middle" />

      {/* SEO CONTENT & FAQS */}
      <ToolSEOContent
        tool={tool}
        howToSteps={howToSteps}
        features={features}
        faqs={faqs}
      />

      {/* RELATED TOOLS */}
      <RelatedTools currentTool={tool} />
    </div>
  );
};
