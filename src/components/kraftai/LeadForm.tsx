'use client';

import { useState, type FormEvent } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

interface LeadFormProps {
  source: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

const US_PHONE_REGEX = /^\+?1?\s*\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LeadForm({ source }: LeadFormProps) {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  const validate = (formData: FormData): boolean => {
    const errors: Record<string, string> = {};

    const name = (formData.get('name') as string).trim();
    const email = (formData.get('email') as string).trim();
    const phone = (formData.get('phone') as string).trim();
    const company = (formData.get('company') as string).trim();

    if (!name) errors.name = 'Name is required';
    if (!email) {
      errors.email = 'Email is required';
    } else if (!EMAIL_REGEX.test(email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!phone) {
      errors.phone = 'Phone number is required';
    } else if (!US_PHONE_REGEX.test(phone)) {
      errors.phone = 'Please enter a valid US phone number';
    }
    if (!company) errors.company = 'Company name is required';

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    if (!validate(formData)) return;

    setStatus('loading');
    setErrorMessage('');

    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: (formData.get('name') as string).trim(),
          email: (formData.get('email') as string).trim(),
          phone: (formData.get('phone') as string).trim(),
          company: (formData.get('company') as string).trim(),
          message: (formData.get('message') as string).trim(),
          source,
        }),
      });

      if (!response.ok) {
        const data = await response.json().catch(() => ({}));
        throw new Error(data.error || data.message || 'Something went wrong. Please try again.');
      }

      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again.'
      );
    }
  };

  if (status === 'success') {
    return (
      <section id="lead-form" className="scroll-mt-24">
        <div className="rounded-2xl border border-emerald-500/30 bg-slate-900 p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-emerald-400 mb-4" aria-hidden="true" />
          <h3 className="text-xl font-semibold text-white mb-2">Thank you!</h3>
          <p className="text-slate-400">
            We&apos;ve received your information and will be in touch within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section id="lead-form" className="scroll-mt-24">
      <div className="rounded-2xl border border-indigo-500/30 bg-gradient-to-b from-slate-900 to-slate-950 p-1">
        <div className="rounded-xl bg-slate-900 p-6 sm:p-8">
          <h2 className="text-2xl font-bold text-white mb-2">Get Started Today</h2>
          <p className="text-slate-400 mb-6">
            Fill out the form below and our team will reach out to discuss your needs.
          </p>

          {status === 'error' && (
            <div
              className="mb-6 flex items-start gap-3 rounded-lg border border-red-500/30 bg-red-500/10 p-4"
              role="alert"
            >
              <AlertCircle className="h-5 w-5 text-red-400 mt-0.5 shrink-0" aria-hidden="true" />
              <p className="text-sm text-red-300">{errorMessage}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} noValidate className="space-y-5">
            {/* Name */}
            <div>
              <label htmlFor="lead-name" className="block text-sm font-medium text-slate-300 mb-1.5">
                Full Name <span className="text-red-400" aria-label="required">*</span>
              </label>
              <input
                id="lead-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="John Doe"
              />
              {fieldErrors.name && (
                <p className="mt-1 text-xs text-red-400" role="alert">{fieldErrors.name}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor="lead-email" className="block text-sm font-medium text-slate-300 mb-1.5">
                Email <span className="text-red-400" aria-label="required">*</span>
              </label>
              <input
                id="lead-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="john@company.com"
              />
              {fieldErrors.email && (
                <p className="mt-1 text-xs text-red-400" role="alert">{fieldErrors.email}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="lead-phone" className="block text-sm font-medium text-slate-300 mb-1.5">
                Phone <span className="text-red-400" aria-label="required">*</span>
              </label>
              <input
                id="lead-phone"
                name="phone"
                type="tel"
                required
                autoComplete="tel"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="(555) 123-4567"
              />
              {fieldErrors.phone && (
                <p className="mt-1 text-xs text-red-400" role="alert">{fieldErrors.phone}</p>
              )}
            </div>

            {/* Company */}
            <div>
              <label htmlFor="lead-company" className="block text-sm font-medium text-slate-300 mb-1.5">
                Company <span className="text-red-400" aria-label="required">*</span>
              </label>
              <input
                id="lead-company"
                name="company"
                type="text"
                required
                autoComplete="organization"
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                placeholder="Acme Inc."
              />
              {fieldErrors.company && (
                <p className="mt-1 text-xs text-red-400" role="alert">{fieldErrors.company}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor="lead-message" className="block text-sm font-medium text-slate-300 mb-1.5">
                Message <span className="text-slate-500 text-xs">(optional)</span>
              </label>
              <textarea
                id="lead-message"
                name="message"
                rows={4}
                className="w-full rounded-lg border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm text-white placeholder-slate-500 transition-colors focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500 resize-y"
                placeholder="Tell us about your needs..."
              />
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === 'loading' ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" aria-hidden="true" />
                  Get Started
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
