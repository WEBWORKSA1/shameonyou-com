# ShameOnYou.com — Concept & Phase-Wise Build Prompt

## 1. The winning concept

**ShameOnYou.com = the people-powered consumer accountability network.**
Expose scams, junk fees, shrinkflation, dark patterns, greenwashing, fake reviews and subscription traps — then convert outraged or harmed visitors into **qualified case leads**.

### Why this beats the alternatives

| Idea for the domain | Traffic | RPM / monetization | Legal risk | Verdict |
|---|---|---|---|---|
| Public shaming of *people* (pillory site) | High, spiky | Low (advertisers avoid it) | **Extreme** (defamation, doxxing) | ❌ Reject |
| Humor / meme “shame” site | High | Low ($1–3 RPM) | Low | ⚠️ Weak |
| Anonymous confession board | Medium | Low | Medium | ⚠️ Weak |
| **Consumer accountability + scam help + lead-gen** | High, evergreen (“is X legit”, “scam text”, “cancel subscription”) | **High** (finance, legal, security, insurance advertisers; $15–40 RPM niches; $50–$300+ per qualified legal lead) | Manageable (practices-not-people, moderation, right of reply) | ✅ **Build this** |

**Revenue stack:** AdSense (finance/legal/security keywords command high CPCs) → lead-gen (consumer attorneys, class actions, identity protection, debt/credit help) → YouTube (explainers + AdSense) → sponsorships (security & ID-protection brands) → donations/memberships → contests (sponsor-funded) → affiliate safety tools.

**Moat:** the name itself is a viral, memorable brand (“Shame on you, [practice]”) + user-generated reports = programmatic SEO pages at scale.

---

## 2. Research basis (35 sites benchmarked)

Trustpilot, ScamAdviser, BBB Scam Tracker, CFPB Complaint Database, ConsumerAffairs, Consumer Reports, Which?, Scamwatch (ACCC), Canada Report Cyber & Fraud, CAFC, Action Fraud, FTC Consumer Advice, IdentityTheft.gov, Snopes, PolitiFact, Change.org, GoFundMe, Patreon, Buy Me a Coffee, Ko-fi, ClassAction.org, Top Class Actions, Deceptive.design, Mouse Print, Truth in Advertising, Good On You, Ethical Consumer, Have I Been Pwned, AARP Fraud Watch, Clark.com, MoneySavingExpert, SmartCustomer (ex-Sitejabber), Devpost, Kickstarter, shrinkflation trackers (The Shrink List).

**Patterns adopted:** search-first hero (HIBP/ScamAdviser) · 3-step report → moderate → publish (BBB) · labeled score bands (Good On You, PolitiFact) · Hall/Wall of Shame (Deceptive.design, TINA) · big-number counters (Change.org, HIBP) · emergency action plan (IdentityTheft.gov, AARP) · attorney-referral lead form (ClassAction.org) · donation presets + monthly toggle + “where it goes” (Buy Me a Coffee, Ko-fi, GoFundMe) · quizzes (Scamwatch, ScamAdviser) · transparency/methodology pages (PolitiFact, MSE) · right of reply + no pay-to-hide (avoid Ripoff Report’s reputation problem).

---

## 3. Phase-wise build prompt (copy each phase into your AI builder)

### PHASE 0 — Global rules (prepend to every phase)
> You are building **ShameOnYou.com**, a static, responsive, accessible (WCAG 2.1 AA) website deployable on the **GitHub Pages free plan** (pure HTML/CSS/vanilla JS, no server). Brand: red→orange gradient (#e11d48→#f97316), Inter + Space Grotesk, light/dark mode.
> 1. Every page shows a top bar: “Contact, if you are interested in this website/domain name/Sponsorship/Advertisement/Partnership” linked to `https://web.works/contact`.
> 2. One contact address only, **never rendered in HTML**. Store it encoded in `config.js`; decode at click/submit time for FormSubmit AJAX and PayPal links. `mailto` links are built on click.
> 3. Focus on **practices, not private people**. Include trademark/copyright disclosure in footer + dedicated legal page.
> 4. Every page: unique title/meta description, canonical, OG/Twitter tags, JSON-LD, AdSense-ready slots, cookie consent, sticky mobile CTA.

### PHASE 1 — Foundation & design system
> Build `assets/css/style.css` with tokens, dark mode, grid utilities, cards, buttons, forms, multi-step form steps, meters, stats, chips, ad slots, video facades, footer. Build a tiny Python generator that injects a shared header/footer into each page. Add favicon, OG image, manifest, robots.txt, sitemap.xml, ads.txt, .nojekyll, 404 page.

### PHASE 2 — Core pages
> Home (search hero, live Shame-O-Meter, cited stats, Hall of Shame top 6, how-it-works, trending alerts, lead-gen block, videos, explore grid, FAQ, newsletter). Hall of Shame (search + category chips + vote + share + fight-back tips). Report (3-step form: category/business/URL/contact method → date/amount/payment/story/evidence → identity/publish-as/on-behalf/help opt-in/truth attestation). Scam Alerts (risk-level cards + official agencies table for US, CA, UK, AU, IN, EU, global).

### PHASE 3 — Lead generation engine (highest priority for revenue)
> A reusable multi-step **Free Case Review** form on Home, Hall of Shame, Tools, Get Help, About: issue type → money lost band → payment method → when/country/description → name/email/phone/preferred contact → explicit consent to partner referral → newsletter opt-in. Show trust bullets, response SLA, privacy note and referral-fee disclosure. Fire a GA4 `generate_lead` event on success. Dedicated Get Help page adds a 6-step emergency plan and partner categories (attorneys, ID protection, dispute help, victim support).

### PHASE 4 — Interactive tools (engagement + SEO + shares)
> Link Red-Flag Scanner (client-side heuristics: HTTPS, IP host, punycode, hyphens, abused TLDs, bait words, brand impersonation, ‘@’ trick). Shame-O-Meter offer rater (weighted checkboxes → needle + verdict). 10-question Scam IQ quiz with share-your-score.

### PHASE 5 — Monetization
> AdSense: header, in-content, sidebar slots, auto-inject when publisher ID set in `config.js`; update `ads.txt`. YouTube: lite facades (thumbnail → click to load `youtube-nocookie` iframe) from `config.videos`. Advertise page with 6 packages + inquiry form (ads, sponsorship, partnership, lead-gen partner, domain acquisition). Integrity rule: no pay-to-hide.

### PHASE 6 — Donations, contests, hiring
> Donate: one-time/monthly toggle, 8 presets + custom, “direct my support to” (operations, investigations, promotion/marketing, hiring, prizes), PayPal donate/subscription URL built at click time, optional Ko-fi/BMC/Patreon/Stripe links, allocation bars, supporter tiers, grant inquiry form. Contests: featured contest with countdown, prizes, entry form, 4 always-on challenges, sponsor CTA, official rules page. Careers: 8 roles + application form.

### PHASE 7 — Trust, legal & compliance
> Legal (trademark disclosure, copyright, DMCA process, disclaimer, affiliate disclosure), Privacy (AdSense cookie language, GDPR/CCPA/PIPEDA/DPDP rights), Terms, Moderation & Right of Reply, Contest Rules (no purchase necessary, skill-based, skill-testing question for Canada), About (mission, methodology, funding).

### PHASE 8 — Deploy & launch
> Push to `github.com/webworksa1/shameonyou-com` (branch `main`), enable Pages (root). Custom domain: add `CNAME` file containing `shameonyou.com`, set DNS A records to 185.199.108–111.153 and `www` CNAME to `webworksa1.github.io`, enforce HTTPS. Submit sitemap to Google Search Console, apply for AdSense once 20–30 quality articles are live.

### PHASE 9 — Growth & expansion (next 90 days)
> 1. Programmatic SEO: “Is [site] legit?” and “[scam type] scam” pages from moderated reports (JSON → generator).
> 2. Backend upgrade path: Supabase/Firebase for live votes, report database, company pages, right-of-reply threads.
> 3. Weekly “Shame Sheet” newsletter (Beehiiv/Buttondown) + YouTube Shorts from each alert.
> 4. Multilingual (ES, FR, HI, PT). 5. Browser extension “Shame Check”. 6. Paid B2B: monitoring alerts for brands, API.
