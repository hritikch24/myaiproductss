/** Builder pricing is separate from app memberships and gateway order validation. */
export const WEBSITE_BUILDER_PLANS = [
  { id: "minute", name: "By the minute", priceInr: 19, unit: "minute", minutes: 1 },
  { id: "hour", name: "One hour", priceInr: 99, unit: "hour", minutes: 60 },
  { id: "three-hours", name: "Three hours", priceInr: 299, unit: "3 hours", minutes: 180 },
] as const;

export const WEBSITE_BUILDER_DESIGNS = [
  { id: "portfolio", name: "Personal portfolio", detail: "A simple introduction, selected work and contact section." },
  { id: "business", name: "Small business", detail: "A service overview, about section and enquiry button." },
  { id: "landing", name: "Product landing page", detail: "A bold headline, product highlights and a clear call to action." },
] as const;
