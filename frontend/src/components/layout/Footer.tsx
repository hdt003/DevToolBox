import React from 'react';
import { Link } from 'react-router-dom';
import { Wrench, ShieldCheck, Zap, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-950 transition-colors">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          
          {/* Brand & Description */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white dark:bg-brand-500">
                <Wrench className="h-4 w-4" />
              </div>
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                DevToolBox
              </span>
            </Link>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Fast, free, and privacy-friendly utilities for developers. Most tools run 100% in your browser without uploading data.
            </p>
            <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400">
              <span className="flex items-center gap-1">
                <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" /> Client-Side Only
              </span>
              <span className="flex items-center gap-1">
                <Zap className="h-3.5 w-3.5 text-amber-500" /> Instant Processing
              </span>
            </div>
          </div>

          {/* Core Tools */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Popular Utilities
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link to="/tools/json-formatter" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  JSON Formatter & Validator
                </Link>
              </li>
              <li>
                <Link to="/tools/jwt-decoder" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  JWT Decoder
                </Link>
              </li>
              <li>
                <Link to="/tools/base64-encoder-decoder" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Base64 Encoder/Decoder
                </Link>
              </li>
              <li>
                <Link to="/tools/uuid-generator" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  UUID Generator (v1, v4, v7)
                </Link>
              </li>
              <li>
                <Link to="/tools/regex-tester" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Regex Tester
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Categories */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Tool Categories
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link to="/tools?category=json" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  JSON & Data Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=security" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Security & Auth Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=sql" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  SQL & Database Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=networking" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Networking & IP Tools
                </Link>
              </li>
              <li>
                <Link to="/tools?category=web" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Web & Code Formatters
                </Link>
              </li>
            </ul>
          </div>

          {/* Legal & About */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-900 dark:text-white">
              Company & Legal
            </h3>
            <ul className="mt-4 space-y-2 text-xs">
              <li>
                <Link to="/about" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  About DevToolBox
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-slate-600 hover:text-brand-600 dark:text-slate-400 dark:hover:text-brand-400">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 dark:text-slate-400">
          <p>© 2026 DevToolBox. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built with <Heart className="h-3 w-3 text-rose-500 fill-rose-500" /> for developers around the world.
          </p>
        </div>

      </div>
    </footer>
  );
};
