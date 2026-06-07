import { ArrowRight } from 'lucide-react';

interface Step {
  step: number;
  title: string;
  description: string;
}

interface HowItWorksProps {
  steps: Step[];
}

export default function HowItWorks({ steps }: HowItWorksProps) {
  return (
    <section id="how-it-works" className="scroll-mt-24" aria-label="How it works">
      {/* Visual steps */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-4">
        {steps.map((item, index) => (
          <div key={item.step} className="relative flex flex-col items-center">
            {/* Connecting arrow (desktop only) */}
            {index < steps.length - 1 && (
              <div className="absolute right-0 top-10 hidden translate-x-1/2 md:block" aria-hidden="true">
                <ArrowRight className="h-6 w-6 text-indigo-500/50" />
              </div>
            )}

            <div className="flex flex-col items-center rounded-2xl border border-slate-700/50 bg-slate-900 p-6 text-center w-full transition-all hover:border-indigo-500/30">
              {/* Step number badge */}
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-600 text-lg font-bold text-white shadow-lg shadow-indigo-500/25">
                {item.step}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-400 leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Q&A prose section */}
      <div className="mt-12 space-y-8">
        {steps.map((item) => (
          <div key={item.step} className="rounded-xl border border-slate-800 bg-slate-900/50 p-6">
            <h3 className="text-base font-semibold text-white mb-2">
              Step {item.step}: {item.title} — What does this involve?
            </h3>
            <p className="text-sm text-slate-400 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
