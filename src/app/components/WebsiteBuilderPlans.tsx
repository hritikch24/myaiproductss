"use client";

import { useState } from "react";
import { WEBSITE_BUILDER_DESIGNS, WEBSITE_BUILDER_PLANS } from "@/lib/website-builder-plans";

export function WebsiteBuilderPlans() {
  const [planId, setPlanId] = useState<string>("hour");
  const [designId, setDesignId] = useState<string>("portfolio");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [brief, setBrief] = useState("");
  const [prepared, setPrepared] = useState(false);
  const plan = WEBSITE_BUILDER_PLANS.find(item => item.id === planId)!;
  const design = WEBSITE_BUILDER_DESIGNS.find(item => item.id === designId)!;
  const mail = `mailto:hello@kraftai.in?${Object.entries({
    subject: `Website builder access: ${plan.name}`,
    body: `Name: ${name}\nEmail: ${email}\nPlan: ₹${plan.priceInr} / ${plan.unit}\nDesign: ${design.name}\n\n${brief}\n\nPlease send confirmation and my private portal sign-in details.`,
  }).map(([key, value]) => `${key}=${encodeURIComponent(value)}`).join("&")}`;

  return (
    <section id="builder-plans" aria-labelledby="builder-plans-title" className="bg-[#0b0b10] px-5 py-16 text-white sm:py-24">
      <div className="mx-auto max-w-5xl">
        <p className="text-xs font-bold uppercase tracking-widest text-orange-400">Online website builder</p>
        <h2 id="builder-plans-title" className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">Choose your creation time.</h2>
        <p className="mt-4 max-w-2xl leading-7 text-white/60">Time credits for creating and editing your website in the online builder. Choose a plan and design, then email your request. We&apos;ll reply with confirmation, sign-in details and your private portal link.</p>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {WEBSITE_BUILDER_PLANS.map((item) => (
            <article key={item.id} className={`rounded-2xl border p-6 ${planId === item.id ? "border-orange-400 bg-orange-500/5" : "border-white/10 bg-white/[0.03]"}`}>
              <h3 className="font-semibold">{item.name}</h3>
              <p className="mt-5"><span className="text-4xl font-bold">₹{item.priceInr}</span><span className="ml-2 text-sm text-white/60">/ {item.unit}</span></p>
              <p className="mt-3 text-sm text-white/60">{item.minutes} {item.minutes === 1 ? "minute" : "minutes"} of builder time</p>
              <button type="button" aria-pressed={planId === item.id} aria-label={`Request ${item.name} plan`} onClick={() => { setPlanId(item.id); setPrepared(false); document.getElementById("builder-request")?.scrollIntoView({ behavior: "smooth", block: "start" }); }} className="mt-6 flex min-h-12 w-full items-center justify-center rounded-xl bg-orange-500 px-4 py-3 text-sm font-semibold text-black hover:bg-orange-400">Request this plan</button>
            </article>
          ))}
        </div>

        <h3 className="mt-14 text-2xl font-bold">Start with a simple design.</h3>
        <p className="mt-3 text-sm text-white/60">Pick a sample layout to include in your request.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {WEBSITE_BUILDER_DESIGNS.map((item, index) => (
            <button key={item.id} type="button" aria-pressed={designId === item.id} onClick={() => { setDesignId(item.id); setPrepared(false); }} className={`overflow-hidden rounded-2xl border text-left ${designId === item.id ? "border-orange-400" : "border-white/10"}`}>
              <div aria-hidden className={`min-h-52 p-5 ${index === 0 ? "bg-[#ede9fe] text-[#312e81]" : index === 1 ? "bg-[#ecfdf5] text-[#064e3b]" : "bg-[#172554] text-white"}`}>
                <div className="flex items-center justify-between text-[10px] font-bold uppercase tracking-widest"><span>{index === 0 ? "Your name" : index === 1 ? "Your business" : "Your product"}</span><span>● ● ●</span></div>
                <p className="mt-8 max-w-40 text-2xl font-bold leading-tight">{index === 0 ? "Make room for your best work." : index === 1 ? "Good service. A great first impression." : "Your next idea starts here."}</p>
                <div className="mt-5 flex gap-2"><span className="h-2 w-20 rounded bg-current opacity-20" /><span className="h-2 w-10 rounded bg-current opacity-10" /></div>
                <div className="mt-4 inline-block rounded-lg border border-current px-3 py-1 text-[10px]">{index === 0 ? "View my work" : index === 1 ? "Get in touch" : "Explore"}</div>
              </div>
              <div className="p-4"><h4 className="font-semibold">{item.name}</h4><p className="mt-2 text-sm leading-6 text-white/60">{item.detail}</p><p className="mt-3 text-xs text-orange-300">{designId === item.id ? "Selected design" : "Choose design"}</p></div>
            </button>
          ))}
        </div>

        <form id="builder-request" onSubmit={event => { event.preventDefault(); window.location.href = mail; setPrepared(true); }} className="mt-12 scroll-mt-24 rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
          <h3 className="text-2xl font-bold">Request your builder access</h3>
          <p className="mt-3 text-sm leading-6 text-white/60">Send your request to hello@kraftai.in. We review it and reply with confirmation, login credentials and a private URL for your portal. This form prepares an email in your email app; it does not charge you.</p>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <label className="text-sm">Your name<input required maxLength={100} value={name} onChange={event => { setName(event.target.value); setPrepared(false); }} autoComplete="name" className="mt-2 block min-h-12 w-full rounded-lg border border-white/20 bg-[#111118] px-3 text-white" /></label>
            <label className="text-sm">Email address<input required type="email" maxLength={254} value={email} onChange={event => { setEmail(event.target.value); setPrepared(false); }} autoComplete="email" className="mt-2 block min-h-12 w-full rounded-lg border border-white/20 bg-[#111118] px-3 text-white" /></label>
            <label className="text-sm">Builder plan<select value={planId} onChange={event => { setPlanId(event.target.value); setPrepared(false); }} className="mt-2 block min-h-12 w-full rounded-lg border border-white/20 bg-[#111118] px-3 text-white">{WEBSITE_BUILDER_PLANS.map(item => <option key={item.id} value={item.id}>₹{item.priceInr} / {item.unit}</option>)}</select></label>
            <label className="text-sm">Starting design<select value={designId} onChange={event => { setDesignId(event.target.value); setPrepared(false); }} className="mt-2 block min-h-12 w-full rounded-lg border border-white/20 bg-[#111118] px-3 text-white">{WEBSITE_BUILDER_DESIGNS.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}</select></label>
          </div>
          <label className="mt-5 block text-sm">What would you like to create? (optional)<textarea maxLength={2000} value={brief} onChange={event => { setBrief(event.target.value); setPrepared(false); }} rows={3} className="mt-2 block w-full rounded-lg border border-white/20 bg-[#111118] p-3 text-white" /></label>
          <button type="submit" className="mt-5 min-h-12 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-black hover:bg-orange-400">Continue in email</button>
          {prepared ? <p role="status" className="mt-4 text-sm text-orange-300">Send the prepared request from your email app. We&apos;ll reply to your email with the next steps and portal access.</p> : null}
          <a href={mail} className="mt-4 block text-sm text-white/60 underline underline-offset-4">Or email hello@kraftai.in directly</a>
        </form>
      </div>
    </section>
  );
}
