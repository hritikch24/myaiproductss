# Claude Code Context — July 13, 2026

## Two Business Websites (Next.js + Prisma + PostgreSQL)

### Urban Shopfronts
- **Repo**: `/Users/hritik/Projects/Urban-shopfronts-limited`
- **Live**: urbanshopfronts.co.uk
- **Address**: 31 Norton Close, Smethwick, West Midlands, B66 3NR
- **Phone**: 07471 043827
- **Services**: Aluminium shopfronts, automatic doors, roller shutters, curtain walling, commercial glazing, shutter repair, glass replacement

### Sigma Shopfronts
- **Repo**: `/Users/hritik/Projects/sigmashopfronts`
- **Live**: sigmashopfronts.com
- **Address**: 4 Thornwood Close, Oldbury, West Midlands, B68 9LX
- **Phone**: 07414 779594
- **Services**: Same as Urban

**NEVER confuse addresses/phones between the two sites.**

---

## Tech Stack (both sites identical structure)
- Next.js 14 (App Router)
- Prisma ORM + PostgreSQL (Neon)
- Tailwind CSS
- Deployed on Vercel
- Google Ads running (needs conversion tracking setup)
- Google Business Profile exists but UNVERIFIED for both

---

## What's Been Built (exhaustive list)

### SEO/GEO (both sites)
- Full structured data: WebSite, SiteNavigationElement, BreadcrumbList, BlogPosting, HowTo, ItemList, speakable, ServiceInCity schemas
- Entity consolidation with @id across all schemas
- 20+ UK city pages with local schema
- Service+city combo pages (e.g., /services/aluminium-shopfronts/birmingham)
- Sitemaps updated with all pages
- robots.txt with AI bot directives
- llms.txt for AI search discoverability
- Meta titles/descriptions audited and optimized for high-impression pages
- HSTS + cache headers in next.config

### Lead Generation Components (both sites)
- StickyMobileCTA — floating call/WhatsApp button on mobile
- StickyDesktopCTA — slide-in CTA on desktop
- ExitIntentPopup — popup when user tries to leave
- AIRecommender — AI-powered service recommendation on homepage
- AI Chat widget (Urban uses Grok/X.AI, Sigma uses Groq)
- CallTracker — tracks calls, copies, WhatsApp clicks via API
- /reviews page on both sites

### Admin Dashboard (both sites)
- `/admin` page — Job Tracker for managing leads/customers
- Customer model in Prisma schema
- API routes: `/api/admin/customers`, `/api/admin/metrics`
- Auth: ADMIN_API_KEY env var + "nimda" suffix for customers/metrics API, raw key for middleware page access, raw key for leads API
- **DO NOT fix the lead status auth issue — user explicitly said to leave it**
- Source/channel field must NOT be visible in the admin form (hidden tracking only)
- Admin page framing: designed to "increase productivity" NOT to "track money" — the shopfront installer partner should not feel monitored

### Blog (both sites)
- Multiple blog posts with HowTo schema where applicable
- Blog index pages
- Homepage blog section

### Services
- Full service pages with how-it-works steps, comparison tables, pricing guides
- Shutter repair & glass replacement added as services
- GEO content fields on service pages
- Glossary/knowledge-base page

### Infrastructure
- PWA manifest, favicons, apple-touch-icon
- Enhanced security headers
- Internal linking improvements
- Footer links fixed

---

## Google Ads Status
- Ads running for both Urban and Sigma
- PMax campaigns paused (not performing well)
- Search ad headlines reviewed and improved
- Junk campaigns (DevOps, Sunrise PG) should be removed from the account
- **NEEDS**: Add funds to Google Ads account
- **NEEDS**: Set up conversion tracking (calls + form fills)
- **NEEDS**: Remove junk campaigns

---

## Facebook Marketing (just completed)
- Joined 5 UK Facebook groups:
  1. Aluminium Windows, Glazing, Cladding (15.4K members)
  2. Builders UK (20K members)
  3. Cladding in UK (6.3K members)
  4. Home Renovation UK, All Contractors (3.3K members)
  5. Uk Builders & Architect (9.5K members)
- Posted promotional content for BOTH Urban and Sigma to all 5 groups
- Sigma post confirmed live (admin approved in Builders UK, crossposted to others)
- Urban post submitted and crossposted to Home Renovation UK confirmed
- Some groups require admin approval

---

## Current Priority: Compete with Bark (Lead Generation Platform)

The client is buying leads from Bark which costs £10-30 per lead, shared with 3-4 competitors. The goal is to generate enough organic/paid leads through own channels to make Bark unnecessary.

### Immediate Actions Needed:
1. **Verify Google Business Profile** for both businesses — #1 priority, without this they're invisible on Google Maps
2. **Set up Google Ads conversion tracking** — can't optimize ads without knowing which clicks convert
3. **Build instant quote calculator** on both sites — visitors pick service type, size, location and get ballpark estimate. Converts much better than generic "contact us" form
4. **Add funds to Google Ads**

### Medium Term:
5. Register on Checkatrade / MyBuilder / Rated People (cheaper than Bark, higher intent leads)
6. Collect Google reviews once GBP is verified
7. Continue Facebook group engagement

---

## Critical Constraints (from user across sessions)
- "make sure not to break anything in current flow since we are getting leads and it's going good"
- "make sure my shopfront partner who's installing doesn't feel that it's to track money i am going to earn (10% of profit) but feels like to increase their productivity" — framing constraint for admin page
- "don't give this option in form" — Source/channel field must NOT be visible in admin form
- Admin auth pattern: ADMIN_API_KEY env var + "nimda" suffix for customers/metrics API, raw key for middleware, raw key for leads API. DO NOT attempt to fix the lead status auth issue.
- StickyDesktopCTA.tsx has two different phone numbers (07414 779594 and 07397 066538) — this is intentional, not a bug

---

## Pending Git
- User may still need to push commits from prior session (AIRecommenderWrapper fix) — unclear if done
- Always verify build before committing: `npm run build`
- Always check TypeScript: `npx tsc --noEmit`

---

## What to Work On Next
The user wants to **compete with Bark** by improving lead generation. The most impactful next step is building an **instant quote calculator** for both sites — a form where visitors select service type, approximate size, and location to get a ballpark price range. This captures leads with higher intent than a generic contact form and gives the visitor immediate value.
