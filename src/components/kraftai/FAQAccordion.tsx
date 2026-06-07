'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FAQ {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  faqs: FAQ[];
  /** Set to true if the parent page already injects FAQPage JSON-LD */
  skipSchema?: boolean;
}

export default function FAQAccordion({ faqs, skipSchema = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <div aria-label="Frequently asked questions">
      {!skipSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <div className="space-y-3" itemScope itemType="https://schema.org/FAQPage">
        {faqs.map((faq, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;
          const headingId = `faq-heading-${index}`;

          return (
            <div
              key={index}
              className="rounded-xl border border-slate-700/50 bg-slate-900 overflow-hidden transition-colors hover:border-slate-600/50"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <h3 id={headingId} className="m-0">
                <button
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  className="flex w-full items-center justify-between gap-4 px-6 py-4 text-left text-sm font-medium text-white transition-colors hover:bg-slate-800/50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-400 sm:text-base"
                >
                  <span itemProp="name">{faq.question}</span>
                  <ChevronDown
                    className={`h-5 w-5 shrink-0 text-slate-400 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                    aria-hidden="true"
                  />
                </button>
              </h3>
              <div
                id={panelId}
                role="region"
                aria-labelledby={headingId}
                itemScope
                itemProp="acceptedAnswer"
                itemType="https://schema.org/Answer"
                className={`grid transition-all duration-200 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="px-6 pb-4 text-sm text-slate-400 leading-relaxed" itemProp="text">
                    {faq.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
