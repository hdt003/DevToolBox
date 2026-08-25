import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './components/layout/Layout';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Home } from './pages/Home';
import { ToolsPage } from './pages/Tools';
import { ToolPage } from './pages/ToolPage';
import { BlogListPage } from './pages/BlogList';
import { BlogPostPage } from './pages/BlogPost';
import { AboutPage } from './pages/About';
import { PrivacyPage } from './pages/Privacy';
import { TermsPage } from './pages/Terms';
import { ContactPage } from './pages/Contact';
import { NotFoundPage } from './pages/NotFound';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/tools" element={<ToolsPage />} />
          <Route path="/tools/:slug" element={<ToolPage />} />
          <Route path="/blog" element={<BlogListPage />} />
          <Route path="/blog/:slug" element={<BlogPostPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
