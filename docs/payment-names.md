# Payment display names

Set these environment variables in this project's `.env.local` for local development,
or in the Vercel project's environment for production. Use matching values in
`muse/firebase/functions/.env` so hosted checkout and Paire's order responses agree.

| Variable | Default / purpose |
|---|---|
| `PAIRE_PLUS_NAME` | `Paire Plus`; used to generate all three Plus labels and on the pricing page |
| `PAIRE_CHAT_NAME` | `Paire Unlimited Chat`; used to generate the Chat label and on the pricing page |
| `PAIRE_PLUS_DAY_LABEL` | Optional full label; default `<Plus name> · 1 day` |
| `PAIRE_PLUS_WEEK_LABEL` | Optional full label; default `<Plus name> · 7 days` |
| `PAIRE_PLUS_MONTH_LABEL` | Optional full label; default `<Plus name> · 1 month + 1 month free` |
| `PAIRE_CHAT_LABEL` | Optional full label; default `<Chat name> · one-time ₹49 unlock` |
| `RAZORPAY_PLUS_NAME` | Optional separate Plus name for Razorpay; unset inherits the UI labels |
| `RAZORPAY_CHAT_NAME` | Optional separate Chat name for Razorpay; unset inherits the UI label |
| `RAZORPAY_PLUS_DAY_LABEL` | Optional full Razorpay description for the day plan |
| `RAZORPAY_PLUS_WEEK_LABEL` | Optional full Razorpay description for the week plan |
| `RAZORPAY_PLUS_MONTH_LABEL` | Optional full Razorpay description for the month plan |
| `RAZORPAY_CHAT_LABEL` | Optional full Razorpay description for Chat |
| `PAIRE_CHECKOUT_NAME` | `Paire`; merchant display name for direct checkout on paire.in (used by Muse) |
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

Our payment page uses `plan.label`, while Razorpay receives
`plan.razorpayDescription`. For a day pass this means `Paire Plus · 1 day` on
our page and `KraftAI Plus · 1 day` in the Razorpay popup. The popup is visible
to buyers too. Full `RAZORPAY_*_LABEL` overrides take priority over the generated
Razorpay descriptions. If neither a Razorpay name nor a full description is set,
Razorpay inherits the corresponding UI label, including `PAIRE_*_LABEL` overrides.
These settings change display descriptions, not order metadata: Razorpay still
receives stable Paire product IDs and the existing page/callback addresses.

Restart the dev server after editing local settings. For production, redeploy
KraftAI and the Muse functions that return checkout details (`createPlusOrder`
and `createChatUnlockOrder`). Names are resolved on the server and passed to the
checkout component as props; `NEXT_PUBLIC_` variables are not needed. The pricing
page is rendered with these settings during the KraftAI build.

Configuration lives in `src/lib/payment-names.ts` and
`muse/firebase/functions/src/lib/payment-names.ts`. Both expose the same contract.
The plan IDs (`day`, `week`, `month`, `chat`) and product IDs (`paire_plus`,
`paire_unlimited_chat`) are stable order-routing identifiers, independent of
display names. Prices, durations, existing orders and entitlements do not change.

This config controls payment plan names and the Razorpay merchant display name.
It does not rename the Paire app, legal ownership text, domains, callback paths,
webhooks, or the merchant/bank-statement identity configured in Razorpay.
