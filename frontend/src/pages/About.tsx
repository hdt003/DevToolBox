import React from 'react';
import { ShieldCheck, Zap, Code, Heart, Wrench } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 space-y-10">
      <div className="text-center space-y-4">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-brand-600 text-white shadow-lg">
          <Wrench className="h-8 w-8" />
        </div>
        <h1 className="text-4xl font-extrabold text-slate-900 dark:text-white">
          About DevToolBox
        </h1>
        <p className="text-base text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Fast, free, and privacy-friendly utilities for developers around the globe.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900 space-y-6 text-slate-700 dark:text-slate-300 text-sm leading-relaxed">
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Our Mission</h2>
        <p>
          As software engineers, we routinely use web tools to format JSON strings, decode JWT tokens, validate UUIDs, test regular expressions, and convert timestamps. However, many existing web utilities send sensitive developer payloads across the network, run intrusive ads, or require unnecessary sign-ups.
        </p>
        <p>
          <strong>DevToolBox</strong> was built to solve this problem by providing a modern suite of developer utilities designed with a single core principle: <strong>100% browser-first execution</strong>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-6 pt-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
            <ShieldCheck className="h-6 w-6 text-emerald-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Privacy First</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Your inputs, tokens, and payloads are processed locally in your browser. We never log or store your sensitive developer data.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
            <Zap className="h-6 w-6 text-amber-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">Blazing Speed</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Without server round-trips or heavy network latencies, tools calculate results instantly in real-time.
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950 space-y-2">
            <Code className="h-6 w-6 text-brand-500" />
            <h3 className="font-bold text-slate-900 dark:text-white text-base">30+ Utilities</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              A comprehensive toolkit covering JSON, encoding, regex, SQL, time, networking, and cryptography.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-900 dark:text-white pt-4">Browser-Side Execution</h2>
        <p>
          Every tool on DevToolBox is constructed using TypeScript, Web APIs, and client-side JavaScript libraries. When you format JSON, parse a JWT token, or generate a hash, the computation happens directly inside your web browser engine.
        </p>
      </div>
    </div>
  );
};
