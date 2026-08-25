import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShieldCheck, Lock, Eye, FileText, CheckCircle2, ExternalLink } from 'lucide-react';

export const PrivacyPage: React.FC = () => {
  useEffect(() => {
    document.title = "Privacy Policy & Google AdSense Disclosures - DevToolBox";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "DevToolBox Privacy Policy detailing client-side browser execution, cookie usage, Google AdSense policy compliance, and user data safety.");
    }
  }, []);

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-8">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ShieldCheck className="h-6 w-6 text-emerald-500" />
          <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Privacy Policy</h1>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">Effective Date: August 26, 2026</p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 space-y-8 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        
        {/* Section 1: Client Side Execution */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Lock className="h-4 w-4 text-brand-500" /> 1. Client-Side Browser Security & Zero Data Uploads
          </h2>
          <p>
            At <strong>DevToolBox</strong>, user data privacy and developer security are our highest technical priorities. Every utility tool available on our platform—including JSON formatters, JWT decoders, SQL formatters, Base64 converters, Hash generators, and Regex testers—executes <strong>100% inside your local web browser engine</strong> using client-side JavaScript.
          </p>
          <div className="rounded-xl bg-emerald-50 border border-emerald-200 dark:bg-emerald-950/40 dark:border-emerald-800 p-4 text-xs text-emerald-800 dark:text-emerald-300 flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-600 dark:text-emerald-400 mt-0.5" />
            <span>
              <strong>Zero Server Storage Guarantee:</strong> Your sensitive developer payloads, bearer tokens, passwords, database query strings, and custom inputs are never uploaded to remote servers, logged in databases, or shared with external third parties.
            </span>
          </div>
        </section>

        {/* Section 2: Google AdSense & Cookies */}
        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="h-4 w-4 text-brand-500" /> 2. Google AdSense & Third-Party Advertising Disclosures
          </h2>
          <p>
            To keep DevToolBox completely free for developers worldwide, we display advertising through third-party ad networks, including <strong>Google AdSense</strong>.
          </p>
          <ul className="list-disc list-inside space-y-2 text-xs">
            <li>
              <strong>Third-Party Vendors:</strong> Third-party vendors, including Google, use cookies to serve ads based on a user's prior visits to our website or other websites on the Internet.
            </li>
            <li>
              <strong>DoubleClick Cookie:</strong> Google's use of advertising cookies enables it and its partners to serve ads to users based on their visit to our sites and/or other sites on the Internet.
            </li>
            <li>
              <strong>Google Partner Privacy Link:</strong> To learn more about how Google processes information when you use partner sites, visit{' '}
              <a
                href="https://www.google.com/policies/privacy/partners/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline font-semibold inline-flex items-center gap-0.5"
              >
                How Google uses data when you use our partners' sites or apps <ExternalLink className="h-3 w-3 inline" />
              </a>
              .
            </li>
            <li>
              <strong>Personalized Advertising Opt-Out:</strong> Users may opt out of personalized advertising by visiting Google's Ads Settings page at{' '}
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline font-semibold"
              >
                Google Ads Settings
              </a>
              . Alternatively, users can opt out of a third-party vendor's use of cookies for personalized advertising by visiting{' '}
              <a
                href="https://www.aboutads.info/choices/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-600 dark:text-brand-400 underline font-semibold"
              >
                www.aboutads.info
              </a>
              .
            </li>
          </ul>
        </section>

        {/* Section 3: Browser Storage */}
        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="h-4 w-4 text-brand-500" /> 3. Browser Storage & Local Preferences
          </h2>
          <p>
            We utilize standard web browser technologies such as <code>localStorage</code> solely to persist non-sensitive user preferences directly on your device. These include:
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs">
            <li>Dark mode vs Light mode user interface setting</li>
            <li>List of user-favorited developer tools</li>
            <li>Recently accessed tool shortcuts</li>
          </ul>
          <p className="text-xs text-slate-500">
            This data never leaves your browser device and can be erased at any time by clearing your browser cache.
          </p>
        </section>

        {/* Section 4: GDPR & CCPA Rights */}
        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">4. GDPR & CCPA Privacy Rights</h2>
          <p>
            Under the European General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA), users have the right to request access to, deletion of, or restriction of processing of their personal data. Because DevToolBox does not collect, store, or process personal user accounts or identities on remote servers, no user identifiable data is retained by us.
          </p>
        </section>

        {/* Section 5: Contact */}
        <section className="space-y-3 border-t border-slate-100 dark:border-slate-800 pt-6">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">5. Contact Information</h2>
          <p>
            If you have questions regarding this Privacy Policy or AdSense compliance disclosures, please contact us via our{' '}
            <Link to="/contact" className="text-brand-600 dark:text-brand-400 underline font-semibold">
              Contact Page
            </Link>
            .
          </p>
        </section>

      </div>
    </div>
  );
};
