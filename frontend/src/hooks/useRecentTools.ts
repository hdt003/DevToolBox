import { useState, useEffect, useCallback } from 'react';

const RECENT_KEY = 'devtoolbox_recent';
const MAX_RECENT = 6;

export function useRecentTools() {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(RECENT_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(RECENT_KEY, JSON.stringify(recentIds));
  }, [recentIds]);

  const addRecent = useCallback((toolId: string) => {
    setRecentIds((prev) => {
      const filtered = prev.filter((id) => id !== toolId);
      return [toolId, ...filtered].slice(0, MAX_RECENT);
    });
  }, []);

  const clearRecent = () => {
    setRecentIds([]);
    localStorage.removeItem(RECENT_KEY);
  };

  return { recentIds, addRecent, clearRecent };
}
