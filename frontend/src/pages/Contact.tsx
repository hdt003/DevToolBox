import React, { useState } from 'react';
import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from '../components/common/Button';

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error');
      setErrorMessage('Please fill in all required fields.');
      return;
    }

    try {
      const subject = encodeURIComponent(`DevToolBox Contact from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      const mailtoUrl = `mailto:contact@devtoolbox.dev?subject=${subject}&body=${body}`;
      
      window.location.href = mailtoUrl;
      setStatus('success');
      setFormData({ name: '', email: '', message: '' });
    } catch {
      setStatus('error');
      setErrorMessage('Failed to open email client. Please email us directly at contact@devtoolbox.dev');
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 space-y-8">
      <div className="text-center space-y-3">
        <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600 dark:bg-brand-950 dark:text-brand-400">
          <Mail className="h-6 w-6" />
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">Contact Us</h1>
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Have feedback, feature requests, or bug reports? We would love to hear from you.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 dark:border-slate-800 dark:bg-slate-900">
        {status === 'success' ? (
          <div className="text-center py-8 space-y-3">
            <CheckCircle className="h-12 w-12 text-emerald-500 mx-auto" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Message Ready!</h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Your email client has been opened with the form details.
            </p>
            <p className="text-xs text-slate-500 dark:text-slate-500 mt-2">
              If it didn't open automatically, you can email us at <a href="mailto:contact@devtoolbox.dev" className="text-brand-500 hover:underline">contact@devtoolbox.dev</a>
            </p>
            <Button onClick={() => setStatus('idle')} variant="outline" size="sm" className="mt-4">
              Send Another Message
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5">
            {status === 'error' && (
              <div className="flex items-center gap-2 rounded-lg bg-rose-50 p-3 text-xs text-rose-700 dark:bg-rose-950 dark:text-rose-300">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Your Name *
              </label>
              <input
                type="text"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                placeholder="John Doe"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white"
                placeholder="john@example.com"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Message *
              </label>
              <textarea
                required
                rows={5}
                className="w-full rounded-xl border border-slate-200 bg-slate-50/50 px-3 py-2 text-sm text-slate-900 focus:border-brand-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950 dark:text-white resize-y"
                placeholder="Suggest a new tool or report an issue..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <Button type="submit" isLoading={status === 'submitting'} className="w-full">
              <Send className="h-4 w-4 mr-2" /> Send Message
            </Button>
          </form>
        )}
      </div>
    </div>
  );
};
