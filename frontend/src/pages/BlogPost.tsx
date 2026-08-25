import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blogData';
import { NotFoundPage } from './NotFound';
import { ChevronRight, Calendar, Clock, User, Tag, ArrowLeft, Share2 } from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  useEffect(() => {
    if (post) {
      document.title = `${post.title} - DevToolBox Blog`;
      const metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute("content", post.excerpt);
      }

      // Inject Article JSON-LD Schema
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'article-schema';
      script.text = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.excerpt,
        "author": {
          "@type": "Organization",
          "name": post.author
        },
        "datePublished": post.publishedDate,
        "keywords": post.tags.join(', ')
      });
      document.head.appendChild(script);

      return () => {
        const existingScript = document.getElementById('article-schema');
        if (existingScript) existingScript.remove();
      };
    }
  }, [post]);

  if (!post) return <NotFoundPage />;

  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8 space-y-8">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
        <Link to="/" className="hover:text-brand-600 dark:hover:text-brand-400">
          Home
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <Link to="/blog" className="hover:text-brand-600 dark:hover:text-brand-400">
          Guides & Articles
        </Link>
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[200px]">
          {post.title}
        </span>
      </nav>

      {/* Article Header */}
      <header className="space-y-4 border-b border-slate-200 dark:border-slate-800 pb-8">
        <div className="flex items-center gap-2">
          <Badge variant="brand" className="uppercase text-[10px]">
            {post.category}
          </Badge>
          <div className="flex items-center gap-1 text-xs text-slate-500 dark:text-slate-400">
            <Clock className="h-3.5 w-3.5" />
            <span>{post.readTime}</span>
          </div>
        </div>

        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl leading-tight">
          {post.title}
        </h1>

        <p className="text-base text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
          {post.excerpt}
        </p>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-2 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1 font-semibold text-slate-700 dark:text-slate-300">
              <User className="h-3.5 w-3.5 text-brand-500" />
              {post.author}
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {post.publishedDate}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-slate-100 dark:bg-slate-800 px-2 py-0.5 text-[11px] font-medium text-slate-600 dark:text-slate-300"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </header>

      {/* Article Content */}
      <article className="prose prose-slate dark:prose-invert max-w-none text-slate-700 dark:text-slate-300 text-sm sm:text-base leading-relaxed space-y-6">
        {post.content.split('\n\n').map((paragraph, index) => {
          if (paragraph.startsWith('### ')) {
            return (
              <h2 key={index} className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-8 mb-3">
                {paragraph.replace('### ', '')}
              </h2>
            );
          }
          if (paragraph.startsWith('#### ')) {
            return (
              <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">
                {paragraph.replace('#### ', '')}
              </h3>
            );
          }
          if (paragraph.startsWith('---')) {
            return <hr key={index} className="my-6 border-slate-200 dark:border-slate-800" />;
          }
          if (paragraph.startsWith('* ') || paragraph.startsWith('1. ')) {
            const items = paragraph.split('\n');
            return (
              <ul key={index} className="list-disc list-inside space-y-1.5 text-sm my-4 pl-2">
                {items.map((item, i) => (
                  <li key={i}>{item.replace(/^(\*|\d+\.)\s*/, '')}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={index} className="leading-relaxed text-sm sm:text-base">
              {paragraph}
            </p>
          );
        })}
      </article>

      {/* Footer / Back link */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Guides
        </Link>
        <Link
          to="/tools"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-500 shadow-md shadow-brand-500/20"
        >
          Explore All Tools
        </Link>
      </div>
    </div>
  );
};
