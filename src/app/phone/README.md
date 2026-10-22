# DPHONES Workbench concept

An independent, interactive sales demo by KraftAI for DPHONES. The four store
names come from DPHONES' public website. Customers, repairs, staff, inventory
and prices are fictional examples, clearly labelled in the interface.

- `/phone`: overview, searchable repair desk, stock and customer preview.
- `/phone/customer`: opens the customer preview directly.
- `/phone/opengraph-image`: the generated PNG used when sharing the demo.

The main journey follows DP-1042: customer quote approval, repair start,
quality check, ready for collection and collection. Starting a repair uses
one part at the correct store. Transfers validate availability and update
both stores. New sample repairs start with diagnosis and can receive a quote.

The state lives only in browser storage under `kraftai:phone-demo:v1`, with
in-memory fallback and cross-tab updates. Reset demo restores the fixtures.
No API, database, customer messages, notifications or payments are connected.
The customer screen previews a status experience; it is not a production
authenticated customer portal. Both routes are marked noindex/nofollow and
are intentionally absent from the public sitemap.

```sh
npm run dev -- --hostname 127.0.0.1 --port 3107
npm run test:phone
npm run test:phone:browser
npm run build
```

Browser tests exercise the complete repair journey, persistence, inventory
transfers and sample intake on desktop and mobile. They also check that the
demo interactions make no same-origin mutation requests.

The route is part of the existing KraftAI deployment. Push the reviewed
commit to its existing `main` branch to use the established Vercel integration.
