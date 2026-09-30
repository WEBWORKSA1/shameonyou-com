/* Content data — practice-based (no private individuals, no unverified accusations). */
window.SOY_DATA = {
  categories: ["All","Scams","Shrinkflation","Junk Fees","Dark Patterns","Greenwashing","Fake Reviews","Subscription Traps","Bad Service","Data & Privacy"],

  shames: [
    {id:"drip-pricing",cat:"Junk Fees",icon:"💸",title:"Drip Pricing",score:92,desc:"The advertised price is a teaser. ‘Service’, ‘resort’, ‘convenience’ and ‘processing’ fees appear only at checkout.",fix:"Screenshot the first price you saw, compare total-to-total, and report it to your consumer protection agency."},
    {id:"roach-motel",cat:"Subscription Traps",icon:"🪤",title:"The Roach Motel Subscription",score:95,desc:"One click to join. A phone call, a chatbot maze and three ‘are you sure?’ screens to leave.",fix:"Cancel in writing, keep proof, and dispute future charges with your card issuer."},
    {id:"shrink-snack",cat:"Shrinkflation",icon:"📉",title:"The Shrinking Snack Bag",score:88,desc:"Same bag, same price, 10–20% less inside. The ‘new look’ packaging is the tell.",fix:"Compare unit price (per 100 g / per oz), not shelf price. Log it in our Shrinkflation Tracker."},
    {id:"fake-was-price",cat:"Fake Reviews",icon:"🏷️",title:"The Fake ‘Was’ Price",score:84,desc:"A ‘70% off’ tag against a ‘was’ price the item was never actually sold at.",fix:"Use price-history tools before buying; report fictitious reference pricing."},
    {id:"confirmshaming",cat:"Dark Patterns",icon:"😒",title:"Confirmshaming",score:71,desc:"‘No thanks, I prefer paying full price.’ Guilt-trip buttons designed to shame you into opting in.",fix:"Close the pop-up. Submit a screenshot to our Dark Pattern gallery."},
    {id:"eco-vague",cat:"Greenwashing",icon:"🌿",title:"‘Eco-Friendly’ With Zero Proof",score:79,desc:"Leaves, green packaging and vague words like ‘natural’ or ‘conscious’ — with no certification or data.",fix:"Look for specific, verifiable claims and third-party certification."},
    {id:"review-gating",cat:"Fake Reviews",icon:"⭐",title:"Review Gating & Paid Stars",score:86,desc:"Only happy customers are asked to review, or reviews are bought in bulk. The 4.9★ is manufactured.",fix:"Read the 2- and 3-star reviews; check review date clusters."},
    {id:"phantom-store",cat:"Scams",icon:"👻",title:"The Phantom Online Store",score:98,desc:"Slick site, social ads, unreal discounts — and a parcel that never arrives (or arrives as junk).",fix:"Check domain age, contact details and payment options. Pay by credit card only."},
    {id:"toll-text",cat:"Scams",icon:"📱",title:"The ‘Unpaid Toll’ Text",score:94,desc:"A text says you owe a small toll or delivery fee. The link harvests your card details.",fix:"Never click. Go to the official site directly. Forward the text to your carrier’s spam line."},
    {id:"hold-forever",cat:"Bad Service",icon:"☎️",title:"‘Your Call Is Important to Us’ (90 min)",score:76,desc:"Endless hold loops and chatbots that can’t transfer you to a human.",fix:"Escalate in writing to executive customer relations; document every contact."},
    {id:"data-hoarding",cat:"Data & Privacy",icon:"🕵️",title:"Pre-Ticked Data Sharing",score:81,desc:"Consent boxes pre-ticked to share your data with ‘trusted partners’ you’ve never heard of.",fix:"Untick everything, use ‘reject all’, and file a privacy request to delete your data."},
    {id:"free-trial",cat:"Subscription Traps",icon:"🎁",title:"The ‘Free’ Trial That Isn’t",score:90,desc:"A $0 trial that silently converts to an annual plan charged in full on day 8.",fix:"Set a reminder the day you sign up; use a virtual card with a spend limit."}
  ],

  alerts: [
    {date:"2026-09-26",level:"High",type:"Phishing",title:"Fake package-redelivery texts spike before holiday season",body:"Messages impersonate couriers and ask for a small ‘redelivery fee’. The goal is your card number."},
    {date:"2026-09-18",level:"High",type:"AI Voice",title:"AI voice-clone ‘family emergency’ calls",body:"Scammers clone a relative’s voice from social clips and demand urgent money. Agree on a family safe-word."},
    {date:"2026-09-10",level:"Medium",type:"Jobs",title:"Task-based ‘like and rate’ job scams",body:"You’re paid small amounts at first, then asked to ‘top up’ to unlock bigger earnings. You never get it back."},
    {date:"2026-09-02",level:"Medium",type:"QR Codes",title:"Tampered QR codes on parking meters",body:"Stickers over real QR codes send you to fake payment pages. Pay via the official app or coins."},
    {date:"2026-08-25",level:"High",type:"Investment",title:"Crypto ‘pig-butchering’ romance-investment combos",body:"A friendly stranger builds trust for weeks, then introduces a ‘can’t-lose’ trading platform."},
    {date:"2026-08-14",level:"Low",type:"Shopping",title:"Clearance ‘going out of business’ fake stores",body:"Emotional ‘we’re closing’ stories paired with 80% off. Check domain age — often under 30 days."}
  ],

  guides: [
    {slug:"spot-a-scam-website",icon:"🔎",title:"How to Spot a Scam Website (12 Checks)",cat:"Scams",read:"7 min"},
    {slug:"what-to-do-if-scammed",icon:"🚨",title:"Scammed? The First 24 Hours Action Plan",cat:"Recovery",read:"6 min"},
    {slug:"shrinkflation-guide",icon:"📉",title:"Shrinkflation: How to Catch It and Fight Back",cat:"Shrinkflation",read:"5 min"},
    {slug:"cancel-any-subscription",icon:"✂️",title:"How to Cancel Any Subscription (Scripts Included)",cat:"Subscriptions",read:"6 min"},
    {slug:"dark-patterns-guide",icon:"🕳️",title:"Dark Patterns: The 12 Tricks Apps Play on You",cat:"Dark Patterns",read:"8 min"},
    {slug:"write-a-complaint-that-works",icon:"✍️",title:"Write a Complaint Companies Can’t Ignore",cat:"Consumer Rights",read:"5 min"}
  ]
};
