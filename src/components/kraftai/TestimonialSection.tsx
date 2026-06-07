import { Star, Quote } from 'lucide-react';

interface Testimonial {
  name: string;
  role: string;
  company: string;
  quote: string;
  rating: number;
}

interface TestimonialSectionProps {
  testimonials: Testimonial[];
}

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < rating ? 'fill-amber-400 text-amber-400' : 'text-slate-600'
          }`}
          aria-hidden="true"
        />
      ))}
    </div>
  );
}

export default function TestimonialSection({ testimonials }: TestimonialSectionProps) {
  return (
    <section aria-label="Customer testimonials">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {testimonials.map((t, index) => (
          <figure
            key={index}
            className="rounded-2xl border border-slate-700/50 bg-slate-900 p-6 transition-all hover:border-indigo-500/30"
          >
            <Quote className="h-8 w-8 text-indigo-500/30 mb-3" aria-hidden="true" />

            <blockquote>
              <p className="text-sm text-slate-300 leading-relaxed">
                &ldquo;{t.quote}&rdquo;
              </p>
            </blockquote>

            <div className="mt-4">
              <StarRating rating={t.rating} />
            </div>

            <figcaption className="mt-4 flex items-center gap-3">
              {/* Avatar placeholder */}
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-indigo-600 text-sm font-semibold text-white"
                aria-hidden="true"
              >
                {t.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)
                  .toUpperCase()}
              </div>
              <div>
                <p className="text-sm font-medium text-white">{t.name}</p>
                <p className="text-xs text-slate-400">
                  {t.role}, {t.company}
                </p>
              </div>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
