import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Last updated: August 2026</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">1. Client-Side Processing</h2>
          <p>
            At <strong>DevToolBox</strong>, privacy is our foundational technical principle. Most developer tools available on our website execute 100% inside your browser using client-side JavaScript code.
          </p>
          <p>
            When you enter sensitive data (such as JSON payloads, JWT bearer tokens, passwords, database strings, or private code), that data is processed strictly within your local browser memory. <strong>Your input is not uploaded, stored, transmitted, or logged on remote backend servers.</strong>
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">2. Local Storage Usage</h2>
          <p>
            We use your browser&apos;s <code>localStorage</code> API solely to store user preferences on your device, including:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Color theme preference (Light, Dark, or System)</li>
            <li>Tool favorites list</li>
            <li>Recently opened tools history</li>
          </ul>
          <p className="text-xs text-slate-500">
            This information remains strictly on your local browser and can be cleared at any time through your browser settings.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">3. Third-Party Analytics & Ads</h2>
          <p>
            We may use privacy-preserving analytics services to monitor aggregate page views and popular tool counts. Analytics services collect anonymous metrics (such as page path and browser user agent) and do NOT collect tool input contents or developer payloads.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. Contact & Support</h2>
          <p>
            If you have questions regarding our privacy policy, please visit our <Link to="/contact" className="text-brand-600 underline">Contact Page</Link>.
          </p>
        </section>
      </div>
    </div>
  );
};
