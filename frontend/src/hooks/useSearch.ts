import { useState, useMemo } from 'react';
import { TOOLS } from '../data/toolsRegistry';
import { ToolDefinition } from '../types/tool';

export function useSearch(initialQuery: string = '') {
  const [query, setQuery] = useState(initialQuery);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [] as ToolDefinition[];

    return TOOLS.filter((tool) => {
      const matchName = tool.name.toLowerCase().includes(q);
      const matchDesc = tool.description.toLowerCase().includes(q);
      const matchCat = tool.category.toLowerCase().includes(q);
      const matchKeywords = tool.keywords.some((k) => k.toLowerCase().includes(q));
      return matchName || matchDesc || matchCat || matchKeywords;
    });
  }, [query]);

  return { query, setQuery, results };
}
