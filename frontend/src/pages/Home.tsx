import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Star, ShieldCheck, Zap, ArrowRight, Sparkles, Clock, CheckCircle, Lock, Wrench } from 'lucide-react';
import { TOOLS, CATEGORIES, getPopularTools } from '../data/toolsRegistry';
import { CategoryIcon } from '../components/common/CategoryIcon';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { AdSlot } from '../components/ads/AdSlot';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentTools } from '../hooks/useRecentTools';

export const Home: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const { recentIds } = useRecentTools();

  const popularTools = getPopularTools();

  const filteredTools = searchQuery.trim()
    ? TOOLS.filter(
        (t) =>
          t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.keywords.some((k) => k.toLowerCase().includes(searchQuery.toLowerCase()))
      )
    : [];

  const favoriteTools = TOOLS.filter((t) => favorites.includes(t.id));
  const recentTools = TOOLS.filter((t) => recentIds.includes(t.id));

  const sampleSearchExamples = [
    'JSON Formatter',
    'JWT Decoder',
    'Base64 Encoder',
    'UUID Generator',
    'Regex Tester',
    'Timestamp Converter',
  ];

  return (
    <div className="space-y-16 pb-16">
      
      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50/50 via-white to-slate-50 py-16 dark:from-brand-950/20 dark:via-slate-950 dark:to-slate-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center space-y-6">
            
            <div className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3.5 py-1 text-xs font-semibold text-brand-700 shadow-2xs backdrop-blur-md dark:border-brand-800 dark:bg-brand-950/80 dark:text-brand-300">
              <Sparkles className="h-3.5 w-3.5 text-brand-500 animate-pulse" />
              <span>30+ Free Browser-Based Developer Utilities</span>
            </div>

            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
              Developer Tools <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-brand-600 to-indigo-500 bg-clip-text text-transparent dark:from-brand-400 dark:to-indigo-400">
                That Just Work.
              </span>
            </h1>

            <p className="text-base text-slate-600 sm:text-lg dark:text-slate-300 leading-relaxed">
              Free, fast, privacy-friendly utilities for developers. Most tools run 100% directly in your browser with zero data logging.
            </p>

            {/* Instant Search Bar */}
            <div className="relative mx-auto max-w-2xl pt-2">
              <div className="relative flex items-center rounded-2xl border border-slate-300 bg-white shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <Search className="ml-4 h-5 w-5 text-slate-400" />
                <input
                  type="text"
                  className="w-full bg-transparent px-3 py-4 text-base text-slate-900 placeholder-slate-400 focus:outline-none dark:text-white dark:placeholder-slate-500"
                  placeholder="Search developer tools (e.g. JSON, JWT, UUID, Regex)..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="mr-3 text-xs font-medium text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Live Search Quick Overlay */}
              {searchQuery.trim() !== '' && (
                <div className="absolute left-0 right-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-2xl dark:border-slate-800 dark:bg-slate-900 text-left">
                  {filteredTools.length === 0 ? (
                    <div className="p-4 text-center text-sm text-slate-500 dark:text-slate-400">
                      No tool found matching &quot;{searchQuery}&quot;
                    </div>
                  ) : (
                    filteredTools.map((tool) => (
                      <Link
                        key={tool.id}
                        to={`/tools/${tool.slug}`}
                        className="flex items-center justify-between rounded-lg p-3 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                            <CategoryIcon name={tool.iconName} className="h-4 w-4" />
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-slate-900 dark:text-white">
                              {tool.name}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400">
                              {tool.description}
                            </p>
                          </div>
                        </div>
                        <ArrowRight className="h-4 w-4 text-slate-400" />
                      </Link>
                    ))
                  )}
                </div>
              )}
            </div>

            {/* Quick Filter Example Chips */}
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs pt-1">
              <span className="text-slate-400 font-medium">Popular searches:</span>
              {sampleSearchExamples.map((ex) => (
                <button
                  key={ex}
                  onClick={() => setSearchQuery(ex)}
                  className="rounded-full bg-slate-200/70 px-3 py-1 text-slate-700 hover:bg-brand-100 hover:text-brand-700 dark:bg-slate-800 dark:text-slate-300 dark:hover:bg-brand-950 dark:hover:text-brand-300 transition-colors"
                >
                  {ex}
                </button>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* PRIVACY PROMISE BANNER */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-emerald-200/80 bg-emerald-50/60 p-6 dark:border-emerald-900/50 dark:bg-emerald-950/30 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-600 text-white dark:bg-emerald-500 shadow-md">
              <ShieldCheck className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Privacy-First Architecture
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300">
                Most tools process your sensitive JSON, JWTs, keys, and code locally inside your browser. No input data is sent to backend servers.
              </p>
            </div>
          </div>
          <Badge variant="success" className="shrink-0 text-xs px-3 py-1">
            100% Client-Side
          </Badge>
        </div>
      </section>

      {/* FAVORITES SECTION (IF ANY EXIST) */}
      {favoriteTools.length > 0 && (
        <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2 mb-6">
            <Star className="h-5 w-5 text-amber-500 fill-amber-500" />
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">Your Favorite Tools</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {favoriteTools.map((tool) => (
              <Card key={tool.id} hoverEffect className="relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                      <CategoryIcon name={tool.iconName} className="h-5 w-5" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className="p-1.5 text-amber-500 hover:scale-110 transition-transform"
                      title="Remove from favorites"
                    >
                      <Star className="h-5 w-5 fill-amber-500" />
                    </button>
                  </div>
                  <h3 className="mt-3 text-base font-bold text-slate-900 dark:text-white">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 line-clamp-2">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Badge variant="outline">{tool.category}</Badge>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
                  >
                    Open Tool <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        </section>
      )}

      {/* POPULAR TOOLS SECTION */}
      <section id="popular" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Popular Tools
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Most frequently used utilities by software engineers & DevOps
            </p>
          </div>
          <Link
            to="/tools"
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 dark:text-brand-400 flex items-center gap-1"
          >
            View All 30+ Tools <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {popularTools.map((tool) => {
            const favored = isFavorite(tool.id);
            return (
              <Card key={tool.id} hoverEffect className="group relative flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
                      <CategoryIcon name={tool.iconName} className="h-6 w-6" />
                    </div>
                    <button
                      onClick={() => toggleFavorite(tool.id)}
                      className="p-1.5 text-slate-300 hover:text-amber-500 dark:text-slate-700 dark:hover:text-amber-400 transition-colors"
                      title={favored ? 'Remove favorite' : 'Add favorite'}
                    >
                      <Star className={`h-5 w-5 ${favored ? 'text-amber-500 fill-amber-500' : ''}`} />
                    </button>
                  </div>
                  <h3 className="mt-4 text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {tool.name}
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    {tool.description}
                  </p>
                </div>
                <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <Badge variant="brand" className="uppercase text-[10px]">
                    {tool.category}
                  </Badge>
                  <Link
                    to={`/tools/${tool.slug}`}
                    className="inline-flex items-center gap-1 rounded-lg bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-600 hover:bg-brand-100 dark:bg-brand-950 dark:text-brand-300 dark:hover:bg-brand-900 transition-colors"
                  >
                    Open Tool <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      </section>

      {/* AD SLOT PLACEHOLDER */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AdSlot position="middle" />
      </div>

      {/* CATEGORIES SECTION */}
      <section id="categories" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
            Browse by Category
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Find the right developer tool categorized by workflow
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {CATEGORIES.map((cat) => {
            const count = TOOLS.filter((t) => t.category === cat.id).length;
            return (
              <Link
                key={cat.id}
                to={`/tools?category=${cat.id}`}
                className="group rounded-xl border border-slate-200/80 bg-white p-4 transition-all hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-md dark:border-slate-800 dark:bg-slate-900 dark:hover:border-brand-700"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300 group-hover:bg-brand-600 group-hover:text-white dark:group-hover:bg-brand-500 transition-colors">
                    <CategoryIcon name={cat.iconName} className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-[11px] text-slate-400">{count} tools</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* HOMEPAGE SEO CONTENT */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 space-y-4">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Free Online Developer Tools — Fast & Privacy-Friendly
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            DevToolBox provides fast, privacy-friendly utilities built for modern software developers, DevOps engineers, and system administrators. Format complex JSON files, decode JSON Web Tokens (JWT), generate unique RFC4122 UUIDs, test regular expressions, convert Unix epoch timestamps, format SQL queries, calculate IP CIDR subnets, and generate secure cryptographic hashes.
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
            Unlike traditional online utility websites that route your sensitive tokens or payload data through backend web servers, DevToolBox runs processing directly in your browser DOM. Your code and secrets never leave your local machine.
          </p>
        </div>
      </section>

    </div>
  );
};
