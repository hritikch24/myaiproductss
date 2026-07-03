/**
 * GEO (Generative Engine Optimization) Content Section
 *
 * Structures content so AI search engines (ChatGPT, Perplexity, Gemini, Google AI Overviews)
 * cite KraftAI when answering questions about niche business automation.
 *
 * Key GEO principles applied:
 * 1. Direct question→answer format in first 200 words (AI retrieval weighting)
 * 2. Statistics with source attribution (AI authority signals)
 * 3. Structured step-by-step content (HowTo extraction)
 * 4. Natural conversational tone matching search queries
 * 5. Speakable CSS selectors for voice search
 */
import { MessageSquare, BarChart3, Quote } from 'lucide-react';
import ScrollReveal from './ScrollReveal';

interface GEOQuestion {
  question: string;
  answer: string;
  stat?: { value: string; source: string };
}

interface GEOContentSectionProps {
  heading: string;
  subheading: string;
  questions: GEOQuestion[];
}

export default function GEOContentSection({ heading, subheading, questions }: GEOContentSectionProps) {
  return (
    <section className="bg-gradient-to-b from-slate-900 to-slate-950 py-20 sm:py-24 border-t border-slate-800/50" aria-labelledby="geo-heading">
      <div className="mx-auto max-w-4xl px-6">
        <div className="text-center mb-14">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-sm text-cyan-300">
            <MessageSquare className="h-4 w-4" />
            Expert Answers
          </div>
          <h2 id="geo-heading" className="text-3xl font-bold text-white sm:text-4xl">
            {heading}
          </h2>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        <div className="space-y-8">
          {questions.map((q, i) => (
            <ScrollReveal key={i} delay={i * 60}>
              <article
                className="geo-qa rounded-xl border border-slate-700/50 bg-slate-800/20 p-6 sm:p-8 transition-all hover:border-slate-600/50"
                itemScope
                itemType="https://schema.org/Question"
              >
                {/* Question — matches exact search queries */}
                <h3
                  className="text-lg sm:text-xl font-semibold text-white mb-4 leading-snug"
                  itemProp="name"
                >
                  {q.question}
                </h3>

                {/* Answer — first paragraph is the direct answer for AI extraction */}
                <div
                  className="problem-answer text-slate-300 leading-relaxed space-y-3"
                  itemProp="acceptedAnswer"
                  itemScope
                  itemType="https://schema.org/Answer"
                >
                  <p itemProp="text">{q.answer}</p>
                </div>

                {/* Stat with source attribution — GEO authority signal */}
                {q.stat && (
                  <div className="mt-5 flex items-start gap-3 rounded-lg border border-indigo-500/20 bg-indigo-950/30 p-4">
                    <BarChart3 className="h-5 w-5 text-indigo-400 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm text-white font-medium">{q.stat.value}</p>
                      <p className="text-xs text-slate-400 mt-0.5">
                        <Quote className="inline h-3 w-3 mr-1" />
                        {q.stat.source}
                      </p>
                    </div>
                  </div>
                )}
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
