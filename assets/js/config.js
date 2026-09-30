/* =====================================================================
   ShameOnYou.com — SITE CONFIG (edit this one file to go live)
   ===================================================================== */
window.SOY_CONFIG = {
  siteName: "ShameOnYou.com",
  // Contact route is encoded (never shown as plain text anywhere on the site).
  // All forms + donation links decode it at runtime only.
  c: "bW9jLmxpYW1nQDFhc2tyb3diZXc=",

  // Google AdSense — paste your publisher ID (e.g. "ca-pub-1234567890123456").
  // Leave empty to show tasteful placeholders. Also update /ads.txt.
  adsenseClient: "",
  adSlots: { header: "", inContent: "", sidebar: "", footer: "" },

  // Google Analytics 4 measurement ID (e.g. "G-XXXXXXX"). Optional.
  ga4: "",

  // YouTube: add your own video IDs (the 11-char code after watch?v=).
  // Empty IDs render a branded card that links to a YouTube search.
  youtubeChannel: "https://www.youtube.com/results?search_query=scam+awareness",
  videos: [
    { id: "", title: "How to Spot a Fake Online Store in 60 Seconds", q: "how to spot fake online store" },
    { id: "", title: "Shrinkflation Explained: Same Price, Less Product", q: "shrinkflation explained" },
    { id: "", title: "Junk Fees & Drip Pricing: The Hidden Cost Game", q: "junk fees drip pricing explained" },
    { id: "", title: "Dark Patterns: Tricks Apps Use on You", q: "dark patterns ux explained" },
    { id: "", title: "Phishing Texts: Real Examples Broken Down", q: "phishing text message examples" },
    { id: "", title: "Greenwashing: How to Read Eco Claims", q: "greenwashing explained" }
  ],

  // Donations: PayPal is built from the encoded contact at click time.
  // Optional extra platforms (full URLs) — leave "" to hide the button.
  kofi: "", buymeacoffee: "", patreon: "", stripeLink: "",
  currency: "USD",

  // Current contest end date (ISO)
  contestEnds: "2026-12-31T23:59:59",

  // Required banner link on every page
  interestUrl: "https://web.works/contact"
};
