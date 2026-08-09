import React, { useState } from "react";
import {
  ChevronDown,
  ChevronUp,
  HelpCircle,
  ShieldCheck,
  Zap,
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
    "Paste or enter your input data into the editor area above.",
    "Select desired formatting options, indentation, or operation flags.",
    "Review processed output in real-time with instant validation.",
    "Copy the result to your clipboard or download it as a local file.",
  ],
  features = [
    "100% In-Browser Execution - Zero server uploads or data logging.",
    "Real-time parsing, formatting, and validation error detection.",
    "Supports keyboard shortcuts (Ctrl/Cmd + Enter) for quick execution.",
    "One-click copy to clipboard and downloadable file output.",
  ],
  faqs,
}) => {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const defaultFaqs = faqs || [
    {
      question: `Is using the ${tool.name} safe for private data?`,
      answer: `Yes, absolutely. The ${tool.name} operates entirely inside your web browser using client-side JavaScript. Your data is never uploaded, stored, or logged on remote servers.`,
    },
    {
      question: `Is the ${tool.name} free to use?`,
      answer: `Yes! All utilities on DevToolBox are 100% free with unlimited usage and no login or subscription required.`,
    },
    {
      question: `Can I download the output file?`,
      answer: `Yes, you can copy output directly to your clipboard or use the Download button to save it locally to your computer.`,
    },
  ];

  return (
    <article className="mt-12 space-y-8 rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
      {/* Intro Heading */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          About {tool.name}
        </h2>
        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
          The {tool.name} is a high-performance web-based utility designed for
          software engineers, web developers, system administrators, and QA
          testers. It allows you to {tool.description.toLowerCase()} instantly
          without installing external software or uploading confidential code.
        </p>
      </div>

      {/* How To Use */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          How to Use {tool.name}
        </h3>
        <ol className="space-y-2 text-xs text-slate-600 dark:text-slate-300 list-decimal list-inside">
          {howToSteps.map((step, idx) => (
            <li key={idx} className="leading-relaxed">
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                {step}
              </span>
            </li>
          ))}
        </ol>
      </div>

      {/* Core Features */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3">
          Key Features & Highlights
        </h3>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-600 dark:text-slate-300">
          {features.map((feat, idx) => (
            <li key={idx} className="flex items-start gap-2">
              <Zap className="h-4 w-4 shrink-0 text-brand-500 mt-0.5" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* FAQ Accordion */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-3 flex items-center gap-2">
          <HelpCircle className="h-4 w-4 text-brand-500" />
          Frequently Asked Questions
        </h3>
        <div className="space-y-2">
          {defaultFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-lg border border-slate-200/80 bg-slate-50/50 dark:border-slate-800 dark:bg-slate-950/50 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-xs font-semibold text-slate-900 dark:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
                >
                  <span>{faq.question}</span>
                  {isOpen ? (
                    <ChevronUp className="h-4 w-4 shrink-0 text-slate-400" />
                  ) : (
                    <ChevronDown className="h-4 w-4 shrink-0 text-slate-400" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 pb-3 pt-1 text-xs text-slate-600 dark:text-slate-300 border-t border-slate-200/40 dark:border-slate-800/40">
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
