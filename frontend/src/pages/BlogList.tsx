import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BLOG_POSTS } from '../data/blogData';
import { BookOpen, Clock, Calendar, ArrowRight, Tag } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const BlogListPage: React.FC = () => {
  useEffect(() => {
    document.title = "Developer Guides & Technical Articles - DevToolBox";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "In-depth guides, developer cheatsheets, security tutorials, and best practices on JSON, JWT, Regex, SQL, and DevOps.");
    }
  }, []);

  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 space-y-10">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg shadow-brand-500/20">
          <BookOpen className="h-7 w-7" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
          Developer Guides & Learning Hub
        </h1>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Comprehensive articles, technical tutorials, cheatsheets, and best practices written by engineers for developers.
        </p>
      </div>

      {/* Grid of Articles */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {BLOG_POSTS.map((post) => (
          <article
            key={post.id}
            className="flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900 shadow-sm hover:shadow-md transition-all group"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="brand" className="text-[10px] uppercase tracking-wider">
                  {post.category}
                </Badge>
                <div className="flex items-center gap-1 text-[11px] text-slate-500 dark:text-slate-400">
                  <Clock className="h-3.5 w-3.5" />
                  <span>{post.readTime}</span>
                </div>
              </div>

              <h2 className="text-lg font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors line-clamp-2">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </h2>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed line-clamp-3">
                {post.excerpt}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-[11px] text-slate-500 dark:text-slate-400">
                <Calendar className="h-3.5 w-3.5" />
                <span>{post.publishedDate}</span>
              </div>

              <Link
                to={`/blog/${post.slug}`}
                className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 dark:text-brand-400 hover:gap-2 transition-all"
              >
                Read Article <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
