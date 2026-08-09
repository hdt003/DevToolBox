import React, { useState } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import { SearchModal } from '../navigation/SearchModal';
import { AdSlot } from '../ads/AdSlot';

interface LayoutProps {
  children: React.ReactNode;
  showTopAd?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ children, showTopAd = false }) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors">
      <Header onOpenSearch={() => setIsSearchOpen(true)} />
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {showTopAd && (
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <AdSlot position="top" />
        </div>
      )}

      <main className="flex-1 w-full">{children}</main>

      <Footer />
    </div>
  );
};
