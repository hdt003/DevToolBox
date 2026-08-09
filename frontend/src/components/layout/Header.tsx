import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search, Sun, Moon, Laptop, Menu, X, Wrench, Star, Sparkles, LayoutGrid } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { Button } from '../common/Button';

interface HeaderProps {
  onOpenSearch: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSearch }) => {
  const { theme, setTheme } = useTheme();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [themeDropdownOpen, setThemeDropdownOpen] = useState(false);
  const themeDropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();
  const navigate = useNavigate();

  // Handle Ctrl+K / Cmd+K search shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onOpenSearch();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onOpenSearch]);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  // Close theme dropdown on outside click
  useEffect(() => {
    if (!themeDropdownOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      if (themeDropdownRef.current && !themeDropdownRef.current.contains(e.target as Node)) {
        setThemeDropdownOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [themeDropdownOpen]);

  const handleAnchorClick = (anchorId: string) => {
    if (location.pathname !== '/') {
      navigate('/');
      setTimeout(() => {
        const el = document.getElementById(anchorId);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(anchorId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-md dark:border-slate-800/80 dark:bg-slate-950/90 transition-colors shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo & Tagline */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-indigo-500 text-white shadow-md shadow-brand-500/25 group-hover:scale-105 transition-transform">
            <Wrench className="h-5 w-5" />
          </div>
          <div>
            <span className="font-extrabold tracking-tight text-slate-900 text-lg dark:text-white flex items-center gap-1.5">
              DevToolBox
              <span className="hidden sm:inline-block rounded-full bg-brand-50 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-600 dark:bg-brand-950 dark:text-brand-300 border border-brand-200/60 dark:border-brand-800/60">
                v1.0
              </span>
            </span>
            <span className="hidden sm:block text-[10px] font-medium text-slate-500 dark:text-slate-400">
              Fast, Free, Browser-First Tools
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-semibold text-slate-600 dark:text-slate-300">
          <Link
            to="/tools"
            className={`flex items-center gap-1.5 transition-colors hover:text-brand-600 dark:hover:text-brand-400 ${
              location.pathname === '/tools' ? 'text-brand-600 dark:text-brand-400 font-bold' : ''
            }`}
          >
            <LayoutGrid className="h-4 w-4" /> All Tools
          </Link>

          <button
            onClick={() => handleAnchorClick('categories')}
            className="transition-colors hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer"
          >
            Categories
          </button>

          <button
            onClick={() => handleAnchorClick('popular')}
            className="transition-colors hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer"
          >
            Popular
          </button>

          <Link
            to="/about"
            className={`transition-colors hover:text-brand-600 dark:hover:text-brand-400 ${
              location.pathname === '/about' ? 'text-brand-600 dark:text-brand-400 font-bold' : ''
            }`}
          >
            About
          </Link>
        </nav>

        {/* Action controls */}
        <div className="flex items-center gap-3">
          {/* Global Search Button */}
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2 rounded-xl border border-slate-200 bg-slate-100/70 px-3.5 py-1.5 text-xs text-slate-500 hover:border-slate-300 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-slate-700 dark:hover:bg-slate-800/80 transition-all shadow-2xs"
            aria-label="Search tools"
          >
            <Search className="h-4 w-4 text-slate-400" />
            <span className="hidden sm:inline font-medium">Search 30+ tools...</span>
            <kbd className="hidden sm:inline-block rounded border border-slate-300 bg-white px-1.5 py-0.5 text-[10px] font-bold text-slate-500 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-400">
              ⌘K
            </kbd>
          </button>

          {/* Theme Dropdown Toggle */}
          <div className="relative" ref={themeDropdownRef}>
            <button
              onClick={() => setThemeDropdownOpen(!themeDropdownOpen)}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-slate-800 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' && <Sun className="h-4 w-4 text-amber-500" />}
              {theme === 'dark' && <Moon className="h-4 w-4 text-brand-400" />}
              {theme === 'system' && <Laptop className="h-4 w-4" />}
            </button>

            {themeDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-36 rounded-xl border border-slate-200 bg-white p-1.5 shadow-xl dark:border-slate-800 dark:bg-slate-900 z-50 animate-fade-in"
                onClick={() => setThemeDropdownOpen(false)}
              >
                <button
                  onClick={() => setTheme('light')}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                    theme === 'light' ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Sun className="h-3.5 w-3.5 text-amber-500" /> Light
                </button>
                <button
                  onClick={() => setTheme('dark')}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                    theme === 'dark' ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Moon className="h-3.5 w-3.5 text-brand-400" /> Dark
                </button>
                <button
                  onClick={() => setTheme('system')}
                  className={`flex w-full items-center gap-2 rounded-lg px-2.5 py-1.5 text-xs font-medium ${
                    theme === 'system' ? 'bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400' : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                >
                  <Laptop className="h-3.5 w-3.5" /> System
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-slate-600 md:hidden dark:border-slate-800 dark:bg-slate-900 dark:text-slate-300"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 md:hidden dark:border-slate-800 dark:bg-slate-950 animate-fade-in space-y-3">
          <nav className="flex flex-col space-y-2.5 font-medium text-slate-700 dark:text-slate-200 text-sm">
            <Link to="/tools" className="py-1.5 hover:text-brand-600 dark:hover:text-brand-400">
              All Tools (32)
            </Link>
            <button onClick={() => handleAnchorClick('categories')} className="py-1.5 text-left hover:text-brand-600 dark:hover:text-brand-400">
              Browse Categories
            </button>
            <button onClick={() => handleAnchorClick('popular')} className="py-1.5 text-left hover:text-brand-600 dark:hover:text-brand-400">
              Popular Tools
            </button>
            <Link to="/about" className="py-1.5 hover:text-brand-600 dark:hover:text-brand-400">
              About & Privacy
            </Link>
            <Link to="/contact" className="py-1.5 hover:text-brand-600 dark:hover:text-brand-400">
              Contact Us
            </Link>
          </nav>
          <Button onClick={onOpenSearch} variant="outline" size="sm" className="w-full justify-start mt-2">
            <Search className="h-4 w-4 mr-2" /> Search developer tools...
          </Button>
        </div>
      )}
    </header>
  );
};
