import type { Metadata } from "next";
import Link from "next/link";
import { PAIRE_PLANS, PAIRE_SITE } from "@/lib/paire";

export const metadata: Metadata = {
  title: "Paire pricing",
  description:
    "Paire, India's dating app where women set the rules, is a KraftAI product. Free to use, with Paire Plus passes of ₹20 a day, ₹99 a week or ₹299 for 2 months, and Unlimited Chat for ₹49 once. Nothing auto-renews.",
  alternates: { canonical: "/paire" },
};

const plan = (id: (typeof PAIRE_PLANS)[number]["id"]) => PAIRE_PLANS.find((item) => item.id === id)!;
const month = plan("month");
const week = plan("week");
const day = plan("day");
const chat = plan("chat");

const PLUS_FEATURES = [
  "Unlimited messaging while it runs",
  "100 likes a day",
  "5 Super Likes a day",
  "Priority likes: shown ahead of plain likes",
  "Age-gap filter",
  "Ends by itself. No auto-renewal.",
];

const FREE_FEATURES = [
  "10 likes a day, with notes",
  "1 Super Like a day",
  "See everyone who likes you",
  "Read every message",
  "Every privacy & safety control",
];

function Check() {
  return (
    <svg aria-hidden className="mt-0.5 h-4 w-4 flex-none text-rose-600" viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M16.7 5.3a1 1 0 0 1 0 1.4l-8 8a1 1 0 0 1-1.4 0l-4-4a1 1 0 1 1 1.4-1.4L8 12.6l7.3-7.3a1 1 0 0 1 1.4 0Z" clipRule="evenodd" />
    </svg>
  );
}

export default function PairePricingPage() {
  return (
    <main className="min-h-screen bg-[#faf6f0] text-slate-900">
      <header className="border-b border-black/5 bg-white/70 backdrop-blur">
        <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
            <img src="/icon.svg" alt="" width={24} height={24} />
            KraftAI
          </Link>
          <a href={`${PAIRE_SITE}/app/`} className="rounded-full bg-slate-900 px-4 py-2 text-sm font-medium text-white hover:bg-slate-800">
            Open Paire
          </a>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pt-14 pb-10 sm:pt-20">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-rose-700">A KraftAI product</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-5xl">
          Paire pricing
        </h1>
        <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-600">
          <a href={PAIRE_SITE} className="font-medium text-slate-900 underline decoration-rose-300 underline-offset-4">Paire</a> is
          India&apos;s dating app where women set the rules. Meeting people is free. Passes are one-time payments that
          never auto-renew, and men and women pay the same. These are the same prices as on paire.in.
        </p>
      </section>

      <section aria-label="Plans" className="mx-auto grid max-w-5xl gap-4 px-4 pb-6 md:grid-cols-3">
        <article className="flex flex-col rounded-3xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Free, forever</p>
          <p className="mt-3 text-4xl font-semibold">₹0</p>
          <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
            {FREE_FEATURES.map((item) => (
              <li key={item} className="flex gap-2"><Check />{item}</li>
            ))}
          </ul>
        </article>

        <article className="relative flex flex-col rounded-3xl border-2 border-rose-600 bg-white p-6 shadow-lg shadow-rose-900/5">
          <span className="absolute -top-3 left-6 rounded-full bg-rose-600 px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-white">
            Buy 1 month, get 1 free
          </span>
          <p className="text-xs font-semibold uppercase tracking-wider text-rose-700">Paire Plus · Month · Best value</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-semibold">₹{month.priceInr}</span>
            <span className="text-sm text-slate-500">for {month.days} days</span>
          </p>
          <p className="mt-1 text-sm text-slate-600">About ₹5 a day · 2 months for the price of 1</p>
          <ul className="mt-6 space-y-2.5 text-sm text-slate-700">
            {PLUS_FEATURES.map((item) => (
              <li key={item} className="flex gap-2"><Check />{item}</li>
            ))}
          </ul>
        </article>

        <article className="flex flex-col rounded-3xl border border-black/10 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Paire Plus · Day or week</p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-semibold">₹{day.priceInr}</span>
            <span className="text-sm text-slate-500">/ 24 hours</span>
          </p>
          <p className="mt-3 flex items-baseline gap-2">
            <span className="text-2xl font-semibold">₹{week.priceInr}</span>
            <span className="text-sm text-slate-500">/ 7 days · about ₹14 a day</span>
          </p>
          <p className="mt-6 text-sm leading-6 text-slate-600">The same Plus benefits for a shorter stretch. Paying never guarantees a match, and safety is never for sale.</p>
        </article>
      </section>

      <section className="mx-auto max-w-5xl px-4 pb-14">
        <article className="flex flex-col gap-4 rounded-3xl border border-black/10 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Unlimited Chat</p>
            <p className="mt-2 text-lg font-semibold">₹{chat.priceInr} once, for all your current and future matches</p>
            <p className="mt-1 text-sm text-slate-600">No expiry. An alternative to Plus if you only want to message.</p>
          </div>
          <a href={`${PAIRE_SITE}/app/`} className="inline-flex h-11 flex-none items-center justify-center rounded-xl bg-slate-900 px-5 text-sm font-medium text-white hover:bg-slate-800">
            Get started on Paire
          </a>
        </article>
      </section>

      <section className="border-t border-black/5 bg-white">
        <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-3">
          <div>
            <h2 className="font-semibold">How to buy</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Sign in at <a href={`${PAIRE_SITE}/app/`} className="underline underline-offset-2">paire.in/app</a>, pick a pass in
              Paire Plus (or Unlimited Chat in a chat), and you&apos;ll be taken to KraftAI&apos;s secure checkout and straight back.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Who you pay</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              Paire is run by KraftAI. Payments are processed by KraftAI through Razorpay (UPI, cards, netbanking, wallets),
              so your bank statement shows KraftAI.
            </p>
          </div>
          <div>
            <h2 className="font-semibold">Refunds & help</h2>
            <p className="mt-2 text-sm leading-6 text-slate-600">
              See Paire&apos;s <a href={`${PAIRE_SITE}/refunds/`} className="underline underline-offset-2">refund policy</a> and{" "}
              <a href={`${PAIRE_SITE}/terms/`} className="underline underline-offset-2">terms</a>, or{" "}
              <a href={`${PAIRE_SITE}/contact/`} className="underline underline-offset-2">contact Paire support</a>.
            </p>
          </div>
        </div>
        <p className="mx-auto max-w-5xl px-4 pb-10 text-xs text-slate-500">
          Prices in Indian rupees, inclusive of taxes. 18+ only. These are passes for the Paire app only; they don&apos;t include
          KraftAI development services, which are quoted separately on <Link href="/services" className="underline underline-offset-2">our services page</Link>.
        </p>
      </section>
    </main>
  );
}
