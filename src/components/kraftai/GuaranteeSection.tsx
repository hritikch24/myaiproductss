import { ShieldCheck } from 'lucide-react';

export default function GuaranteeSection() {
  return (
    <section className="bg-slate-900 py-16 sm:py-20 border-y border-slate-800/50" aria-labelledby="guarantee-heading">
      <div className="mx-auto max-w-3xl px-6 text-center">
        <div className="mx-auto w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6">
          <ShieldCheck className="h-8 w-8 text-emerald-400" aria-hidden="true" />
        </div>
        <h2 id="guarantee-heading" className="text-2xl font-bold text-white sm:text-3xl">
          Our &ldquo;It Pays for Itself&rdquo; Guarantee
        </h2>
        <p className="mt-4 text-slate-400 leading-relaxed max-w-xl mx-auto">
          If our automation doesn&apos;t save you at least 10 hours/week or generate enough new leads to cover your investment within 60 days, we&apos;ll refund every penny and let you keep the automations. Zero risk.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-6 text-sm">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>60-Day Money Back</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>No Long-Term Contract</span>
          </div>
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>Keep the Automations</span>
          </div>
        </div>
      </div>
    </section>
  );
}
