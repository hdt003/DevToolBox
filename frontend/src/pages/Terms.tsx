import React from 'react';

export const TermsPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Terms of Service</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last updated: August 2026</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and using <strong>DevToolBox</strong>, you agree to comply with and be bound by these Terms of Service. If you do not agree to these terms, please do not use the website.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Free & As-Is Usage</h2>
          <p>
            All tools and services provided on DevToolBox are offered &quot;AS IS&quot; and &quot;AS AVAILABLE&quot; for free without warranty of any kind, express or implied.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Limitation of Liability</h2>
          <p>
            While we strive for 100% accuracy and stability in all our parsing, formatting, conversion, and generator algorithms, DevToolBox shall not be held liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our tools.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Modifications to Service</h2>
          <p>
            We reserve the right to modify, update, or discontinue tools or features at any time without prior notice.
          </p>
        </section>
      </div>
    </div>
  );
};
