import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck,
  Zap,
  BookOpen,
  Code2,
  CheckCircle2,
  Lock,
} from "lucide-react";
import { ToolDefinition } from "../../types/tool";

interface ToolSEOContentProps {
  tool: ToolDefinition;
  howToSteps?: string[];
  features?: string[];
  faqs?: Array<{ question: string; answer: string }>;
}

export const ToolSEOContent: React.FC<ToolSEOContentProps> = ({
  tool,
  howToSteps = [
    `Paste or type your input data directly into the ${tool.name} workspace editor above.`,
    `Adjust desired formatting parameters, conversion options, or execution flags.`,
    `Inspect the formatted output in real-time with automatic syntax checking and error highlighting.`,
    `Copy the resulting output to your clipboard or download it directly to your device as a file.`,
  ],
  features = [
    "100% In-Browser Execution - Zero server network requests or remote data logging.",
    "Real-time syntax validation, formatting error detection, and line numbers.",
    "Supports keyboard shortcuts (Ctrl/Cmd + Enter) for instant single-key execution.",
    "One-click copy to clipboard and instant local file download functionality.",
    "Clean, modern responsive UI optimized for light and dark operating system modes.",
    "Completely free with unlimited usages and zero sign-up or registration required.",
  ],
  faqs,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const defaultFaqs = faqs || [
    {
      question: `Is my data safe when using the ${tool.name}?`,
      answer: `Yes, 100%. The ${tool.name} processes all data directly inside your web browser using client-side JavaScript APIs. Your input code, tokens, or strings are never uploaded, stored, or logged on remote servers.`,
    },
    {
      question: `Is the ${tool.name} free to use?`,
      answer: `Yes, all developer utilities on DevToolBox are completely free for personal, commercial, and enterprise usage without any bandwidth limits or subscription requirements.`,
    },
    {
      question: `Can I download the formatted output file?`,
      answer: `Yes! You can instantly copy the output to your system clipboard or click the Download button to save the result directly onto your computer.`,
    },
    {
      question: `Does the ${tool.name} work offline?`,
      answer: `Once the webpage is loaded in your browser, the ${tool.name} can function without an active internet connection because all logic executes locally on your device.`,
    },
  ];

  // Dynamically inject FAQPage and SoftwareApplication JSON-LD schemas
  useEffect(() => {
    const faqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": defaultFaqs.map((faq) => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer,
        },
      })),
    };

    const appSchema = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": tool.name,
      "operatingSystem": "All",
      "applicationCategory": "DeveloperApplication",
      "offers": {
        "@type": "Offer",
        "price": "0",
        "priceCurrency": "USD",
      },
      "description": tool.seoDescription,
    };

    const scriptFaq = document.createElement("script");
    scriptFaq.type = "application/ld+json";
    scriptFaq.id = `faq-schema-${tool.id}`;
    scriptFaq.text = JSON.stringify(faqSchema);
    document.head.appendChild(scriptFaq);

    const scriptApp = document.createElement("script");
    scriptApp.type = "application/ld+json";
    scriptApp.id = `app-schema-${tool.id}`;
    scriptApp.text = JSON.stringify(appSchema);
    document.head.appendChild(scriptApp);

    return () => {
      document.getElementById(`faq-schema-${tool.id}`)?.remove();
      document.getElementById(`app-schema-${tool.id}`)?.remove();
    };
  }, [tool, defaultFaqs]);

  return (
    <article className="mt-12 space-y-10 rounded-2xl border border-slate-200 bg-white p-6 sm:p-10 dark:border-slate-800 dark:bg-slate-900 shadow-sm">
      
      {/* Intro Section */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen className="h-5 w-5 text-brand-600 dark:text-brand-400" />
          <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            About {tool.name}
          </h2>
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          The <strong>{tool.name}</strong> is an essential, high-performance developer tool engineered specifically for software developers, QA engineers, system architects, and DevOps professionals. It enables you to {tool.description.toLowerCase()} with instantaneous response times and zero server latency.
        </p>
        <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          Unlike legacy web tools that transmit developer inputs across external networks, our {tool.name} operates 100% client-side inside your browser engine. This ensures that sensitive API responses, private keys, database queries, and configuration files remain completely private and secure.
        </p>
      </div>

      {/* How To Steps */}
      <div className="space-y-4 border-t border-slate-100 dark:border-slate-800/80 pt-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="h-4 w-4 text-brand-500" />
          How to Use {tool.name} Step-by-Step
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {howToSteps.map((step, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4 dark:border-slate-800 dark:bg-slate-950/60"
            >
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white dark:bg-brand-500">
                {idx + 1}
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed pt-0.5">
                {step}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Highlights & Features Grid */}
      <div className="space-y-4 border-t border-slate-100 dark:border-slate-800/80 pt-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Zap className="h-4 w-4 text-brand-500" />
          Key Technical Features & Benefits
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-slate-600 dark:text-slate-300">
          {features.map((feat, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-500 mt-0.5" />
              <span className="leading-relaxed">{feat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Security Banner */}
      <div className="rounded-xl border border-emerald-200 bg-emerald-50/60 p-4 dark:border-emerald-900/60 dark:bg-emerald-950/30 flex items-start gap-3 text-xs text-emerald-900 dark:text-emerald-300">
        <ShieldCheck className="h-5 w-5 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-sm">Client-Side Security Guarantee</span>
          <p className="leading-relaxed">
            All code transformations and data parsing for {tool.name} happen in memory within your web browser. No confidential tokens, database credentials, or developer strings leave your computer.
          </p>
        </div>
      </div>

      {/* FAQ Accordion */}
      <div className="space-y-4 border-t border-slate-100 dark:border-slate-800/80 pt-8">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-brand-500" />
          Frequently Asked Questions (FAQ)
        </h3>
        <div className="space-y-3">
          {defaultFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-xl border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-5 py-3.5 text-left text-xs sm:text-sm font-bold text-slate-900 dark:text-white hover:bg-slate-100/70 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-brand-500" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-xs sm:text-sm text-slate-600 dark:text-slate-300 border-t border-slate-200/40 dark:border-slate-800/40 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </article>
  );
};
