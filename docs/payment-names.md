# Payment display names

Set these environment variables in this project's `.env.local` for local development,
or in the Vercel project's environment for production. Use matching values in
`muse/firebase/functions/.env` so hosted checkout and Paire's order responses agree.

| Variable | Default / purpose |
|---|---|
| `PAIRE_PLUS_NAME` | `Paire Plus`; used to generate the retained app catalog labels |
| `PAIRE_CHAT_NAME` | `Paire Unlimited Chat`; used to generate the retained Chat catalog label |
| `PAIRE_PLUS_DAY_LABEL` | Optional full label; default `<Plus name> · 1 day` |
| `PAIRE_PLUS_WEEK_LABEL` | Optional full label; default `<Plus name> · 7 days` |
| `PAIRE_PLUS_MONTH_LABEL` | Optional full label; default `<Plus name> · 1 month + 1 month free` |
| `PAIRE_CHAT_LABEL` | Optional full label; default `<Chat name> · one-time ₹49 unlock` |
| `RAZORPAY_PLUS_NAME` | `KraftAI Plus`; independent of the app labels |
| `RAZORPAY_CHAT_NAME` | `KraftAI Unlimited Chat`; independent of the app labels |
| `RAZORPAY_PLUS_DAY_LABEL` | Optional full Razorpay description for the day plan |
| `RAZORPAY_PLUS_WEEK_LABEL` | Optional full Razorpay description for the week plan |
| `RAZORPAY_PLUS_MONTH_LABEL` | Optional full Razorpay description for the month plan |
| `RAZORPAY_CHAT_LABEL` | Optional full Razorpay description for Chat |
| `KRAFTAI_CHECKOUT_NAME` | `KraftAI`; merchant display name for hosted checkout on kraftai.in |

For example, set `PAIRE_PLUS_NAME="Premium"` and `PAIRE_CHAT_NAME="Messaging"`
in both projects to generate `Premium · 1 day` and `Messaging · one-time ₹49 unlock`.
Full-label settings take precedence over generated labels. Leave them unset to
have future name changes apply automatically. Empty or whitespace-only settings
fall back to the defaults; surrounding whitespace is trimmed.

To show Paire on our pages and KraftAI in Razorpay, set this in both projects:

```dotenv
PAIRE_PLUS_NAME="Paire Plus"
PAIRE_CHAT_NAME="Paire Unlimited Chat"
RAZORPAY_PLUS_NAME="KraftAI Plus"
RAZORPAY_CHAT_NAME="KraftAI Unlimited Chat"
```

The app retains its names. The former `/paire` pricing page redirects to `/` and
is removed from the sitemap. The hosted payment page
shows only the supplied artwork (`public/payments/checkout-icon.jpg`) and opens
Razorpay automatically. Plan names, prices and merchant details are shown inside
Razorpay's own payment window. The same artwork is sent as Razorpay's checkout
image. Closing the payment window returns to the app; if the script fails to
load, activating the icon retries. Error explanations remain available to
screen readers. Invalid or paid orders cannot open checkout; their icon links
back to the app. Full
`RAZORPAY_*_LABEL` overrides take priority over generated Razorpay descriptions.
Unset/blank Razorpay settings use KraftAI defaults and never inherit app names.

New Razorpay order notes use `kraftai_plus` (with `plan`) or
`kraftai_unlimited_chat`. The member uid stays in Muse's Firestore order record.
Both new and legacy product IDs are accepted when validating an order, so old
payments and refunds remain supported. Prices and ownership checks are unchanged.

The browser enters `https://kraftai.in/?order=…`. Middleware internally rewrites
only root URLs containing `order` to the validated `/pay/checkout` page, leaving
the browser address on the homepage. Normal homepage visits show the website.
Legacy `/pay/start` links clear the incoming referrer before redirecting to this
root URL. Checkout and callback responses use a
`Referrer-Policy: no-referrer` header. `/pay/paire` is a redirect for old links;
the old callback remains accepted for existing checkout windows. Razorpay's
script loads only on the KraftAI payment page, with a neutral callback path:
`/pay/checkout/callback`. Client props contain only merchant payment fields;
the destination app URL is resolved on the callback server.

Server API requests forward no browser cookies/referrers and identify their
client as `KraftAI/1.0`. Browser origin headers remain truthful, app cookies keep
their real domain scope, and Razorpay controls its own cookies and telemetry.
This does not erase historical metadata or change the registered business,
webhooks or public pricing/legal disclosures.

Restart the dev server after editing local settings. For production, redeploy
KraftAI and the Muse functions that return checkout details (`createPlusOrder`
and `createChatUnlockOrder`). Names are resolved on the server and passed to the
checkout component as props; `NEXT_PUBLIC_` variables are not needed. The pricing
page is rendered with these settings during the KraftAI build.

Muse requires `KRAFTAI_CHECKOUT_URL=https://kraftai.in`; missing or
invalid host settings refuse new checkout instead of loading Razorpay on the app.

Configuration lives in `src/lib/payment-names.ts` and
`muse/firebase/functions/src/lib/payment-names.ts`. Both expose the same contract.
The plan IDs (`day`, `week`, `month`, `chat`) and internal entitlement IDs remain
independent of the public payment branding. Prices, durations, existing orders
and entitlements do not change.

Name settings control payment descriptions and the merchant display name.
They do not rename the app, legal ownership text, webhooks, or the
merchant/bank-statement identity configured in Razorpay. The checkout migration
uses the neutral routes described above while preserving old callbacks.

## Website builder plans

`src/lib/website-builder-plans.ts` defines ₹19/minute, ₹99/hour and ₹299/3 hours.
These are builder credits, separate from app memberships and gateway order
validation. The homepage and `/website-builder` show the plans and three basic
design previews. Visitors choose a plan/design and prepare an email request to
`hello@kraftai.in`; the mail link includes their name, email and project brief.
The operator replies manually with confirmation, credentials and a private
portal URL. No credit purchase, charge or automatic credential issuance happens
on this form. It uses the visitor's email app; the local email-provider key
returned 401 during a read-only check, so server-side sending is not enabled.
