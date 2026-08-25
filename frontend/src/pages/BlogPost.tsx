import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getBlogPostBySlug } from '../data/blogData';
import { NotFoundPage } from './NotFound';
import { ChevronRight, Calendar, Clock, User, ArrowLeft } from 'lucide-react';
import { Badge } from '../components/common/Badge';

// Helper component to render inline markdown formatting (bold, code, links)
const FormattedText: React.FC<{ text: string }> = ({ text }) => {
  // Regex to split by links, inline code, and bold text
  const parts = text.split(/(\*\*.*?\*\*|`.*?`|\[.*?\]\(.*?\))/g);

  return (
    <>
      {parts.map((part, idx) => {
        if (part.startsWith('**') && part.endsWith('**')) {
          return <strong key={idx} className="font-bold text-slate-900 dark:text-white">{part.slice(2, -2)}</strong>;
        }
        if (part.startsWith('`') && part.endsWith('`')) {
          return (
            <code key={idx} className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-xs text-brand-600 dark:bg-slate-800 dark:text-brand-400">
              {part.slice(1, -1)}
            </code>
          );
        }
        const linkMatch = part.match(/^\[(.*?)\]\((.*?)\)$/);
        if (linkMatch) {
          const [, linkText, url] = linkMatch;
          if (url.startsWith('/')) {
            return (
              <Link key={idx} to={url} className="text-brand-600 hover:underline dark:text-brand-400 font-semibold">
                {linkText}
              </Link>
            );
          }
          return (
            <a key={idx} href={url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline dark:text-brand-400 font-semibold">
              {linkText}
            </a>
          );
        }
        return part;
      })}
    </>
  );
};

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
          const trimmed = paragraph.trim();

          // Heading 2 (###)
          if (trimmed.startsWith('### ')) {
            return (
              <h2 key={index} className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white mt-8 mb-3">
                <FormattedText text={trimmed.replace('### ', '')} />
              </h2>
            );
          }

          // Heading 3 (####)
          if (trimmed.startsWith('#### ')) {
            return (
              <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white mt-6 mb-2">
                <FormattedText text={trimmed.replace('#### ', '')} />
              </h3>
            );
          }

          // Horizontal Divider (---)
          if (trimmed.startsWith('---')) {
            return <hr key={index} className="my-6 border-slate-200 dark:border-slate-800" />;
          }

          // Code Block (```lang ... ```)
          if (trimmed.startsWith('```')) {
            const lines = trimmed.split('\n');
            const lang = lines[0].replace('```', '').trim();
            const codeContent = lines.slice(1, lines[-1] === '```' ? -1 : lines.length).filter(l => l !== '```').join('\n');

            return (
              <div key={index} className="my-4 rounded-xl border border-slate-800 bg-slate-950 p-4 font-mono text-xs sm:text-sm text-emerald-400 overflow-x-auto shadow-inner">
                {lang && <div className="text-[10px] uppercase font-bold text-slate-500 mb-2 border-b border-slate-800 pb-1">{lang}</div>}
                <pre className="whitespace-pre">
                  <code>{codeContent}</code>
                </pre>
              </div>
            );
          }

          // Markdown Table (| ... |)
          if (trimmed.startsWith('|')) {
            const rows = trimmed.split('\n').filter(r => r.trim().startsWith('|') && !r.includes(':---'));
            if (rows.length > 0) {
              const headers = rows[0].split('|').filter(c => c.trim() !== '').map(c => c.trim());
              const bodyRows = rows.slice(1).map(r => r.split('|').filter(c => c.trim() !== '').map(c => c.trim()));

              return (
                <div key={index} className="my-6 overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-800">
                  <table className="w-full text-left text-xs sm:text-sm">
                    <thead className="bg-slate-100 dark:bg-slate-800/80 text-slate-900 dark:text-white font-bold border-b border-slate-200 dark:border-slate-800">
                      <tr>
                        {headers.map((h, i) => (
                          <th key={i} className="px-4 py-3"><FormattedText text={h} /></th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                      {bodyRows.map((row, rowIndex) => (
                        <tr key={rowIndex} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                          {row.map((cell, cellIndex) => (
                            <td key={cellIndex} className="px-4 py-3 text-slate-700 dark:text-slate-300">
                              <FormattedText text={cell} />
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }
          }

          // Bullet or Numbered Lists
          if (trimmed.startsWith('* ') || trimmed.startsWith('1. ') || trimmed.includes('\n* ') || trimmed.includes('\n1. ')) {
            const listItems = trimmed.split('\n');
            return (
              <ul key={index} className="list-disc list-inside space-y-2 text-sm sm:text-base my-4 pl-2 text-slate-700 dark:text-slate-300">
                {listItems.map((item, i) => (
                  <li key={i} className="leading-relaxed">
                    <FormattedText text={item.replace(/^(\*|\d+\.)\s*/, '')} />
                  </li>
                ))}
              </ul>
            );
          }

          // Standard Paragraph
          return (
            <p key={index} className="leading-relaxed text-sm sm:text-base text-slate-700 dark:text-slate-300">
              <FormattedText text={trimmed} />
            </p>
          );
        })}
      </article>

      {/* Footer / Back link */}
      <div className="pt-8 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Guides
        </Link>
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-xl bg-brand-600 px-4 py-2 text-xs font-semibold text-white hover:bg-brand-500 shadow-md shadow-brand-500/20 transition-colors"
        >
          Explore All Tools
        </Link>
      </div>
    </div>
  );
};
