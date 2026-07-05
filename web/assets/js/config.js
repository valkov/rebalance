/* =============================================================================
   REBALANCE — site content & settings
   -----------------------------------------------------------------------------
   This is the ONLY file you normally need to edit. No coding required:
   change the text in quotes, paste your links, add your photos.

   HOW PEOPLE BOOK:
   • sessions[] -> group & personal therapy with Tanya that people BOOK on a
                   calendar (a Cal.com / Calendly link), and pay for.
                   Each session has a `category`: "group", "personal" or "other".

   Each session can carry its OWN links:
   • schedulerUrl -> a Cal.com / Calendly link (opens a calendar to pick a time)
   • stripeUrl    -> a Stripe Payment Link (a public "buy / pay" URL)
   • image / src  -> path to your own photo, e.g. "assets/images/room.jpg"
                     (leave "" to show a soft styled placeholder)

   Nothing secret goes in here — Payment Links and scheduler links are public
   URLs, safe to commit. NEVER paste API keys, secret keys or passwords.
   ========================================================================== */

window.SITE_CONFIG = {
  // ---- Content source (CMS) -------------------------------------------------
  // Leave projectId "" to use the built-in content below (demo/fallback).
  // With Tanya's Sanity project set, the site loads sessions and gallery LIVE
  // from the CMS instead. Don't forget: add your site URL + http://localhost:8087
  // to Sanity → Manage → API → CORS origins, or the browser fetch is blocked.
  sanity: { projectId: "s3xmc1k6", dataset: "production", apiVersion: "2024-01-01" },

  brand: {
    name: "Rebalance",
    tagline: "Gentle group and personal therapy — room to slow down and rebalance.",
    intro: "Group and 1:1 therapy with Tanya Basse — a calm, caring space to breathe, feel heard, and find your balance again.",
    email: "hello@rebalance.dk", // TODO: your real contact email
    instagram: "https://www.instagram.com/tanyabasse/",
    facebook: "https://www.facebook.com/",
    // Telegram channel/group — use a t.me link. Leave "" to hide it entirely.
    telegram: "",
  },

  // Default calendar used by the generic "Book" buttons when a session doesn't
  // specify its own. Paste a Cal.com or Calendly link, e.g.
  //   "https://cal.com/tanya-basse"   Leave "" to fall back to email.
  schedulerUrl: "",

  // =========================================================================
  // SESSIONS — group & personal therapy with Tanya. People BOOK a time and pay.
  // `category` controls the heading it appears under: "group" | "personal" | "other".
  // Best setup: give each one its own Cal.com / Calendly event-type link in
  // schedulerUrl. Cal.com & Calendly can collect payment at booking (connect
  // Stripe in their dashboard) — or set a stripeUrl to take payment separately
  // / sell a package. Leave both "" and it falls back to an email enquiry.
  // =========================================================================
  sessions: [
    // ---- Group therapy -----------------------------------------------------
    {
      category: "group",
      title: "Women's circle",
      format: "In person · 90 min · weekly",
      price: "kr 220 / session",
      blurb:
        "A small, recurring group where women meet to share, breathe and feel held — a gentle space to slow down together.",
      hue: 332,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      category: "group",
      title: "Functional relaxation group",
      format: "In person · 60 min",
      price: "kr 180 / session",
      blurb:
        "Guided body-oriented relaxation in a small group — soften tension, settle the nervous system and come back to your body.",
      hue: 312,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      category: "group",
      title: "Grief & transition circle",
      format: "In person · 90 min · monthly",
      price: "kr 250 / session",
      blurb:
        "A supportive group for moving through loss and change, at a pace that honours where you are.",
      hue: 346,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    // ---- Personal therapy --------------------------------------------------
    {
      category: "personal",
      title: "Individual therapy",
      format: "In person or online · 60 min",
      price: "kr 750 / session",
      blurb:
        "One-to-one sessions tailored to you — a calm, confidential space to be heard and to find your footing again.",
      hue: 336,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      category: "personal",
      title: "Functional relaxation (1:1)",
      format: "In person · 60 min",
      price: "kr 750 / session",
      blurb:
        "Body-oriented therapy that eases held tension and reconnects you with a felt sense of ease and safety.",
      hue: 320,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      category: "personal",
      title: "Walk & talk session",
      format: "Outdoors · 60 min",
      price: "kr 700 / session",
      blurb:
        "Therapy in gentle movement — we walk side by side in nature while we talk, letting the body help the mind unwind.",
      hue: 300,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      category: "personal",
      title: "5-session package",
      format: "In person or online",
      price: "kr 3,500",
      blurb:
        "A discounted series of five sessions for deeper, ongoing work — booked at a pace that suits you.",
      hue: 350,
      image: "",
      schedulerUrl: "",
      stripeUrl: "", // good candidate for a Stripe Payment Link (prepay the package)
    },
    // ---- Other -------------------------------------------------------------
    {
      category: "other",
      title: "Free intro call",
      format: "Online · 20 min",
      price: "Free",
      blurb:
        "A relaxed chat to see if working together feels right, and to find the best starting point for you.",
      hue: 326,
      image: "",
      schedulerUrl: "", // Cal.com/Calendly link for the free call
      stripeUrl: "",
    },
    {
      category: "other",
      title: "Gift a session",
      format: "Voucher · any session",
      price: "From kr 700",
      blurb:
        "Give someone you care about the gift of time to pause and breathe — a voucher towards any session.",
      hue: 314,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
  ],

  // Short, reassuring note shown under the Sessions section. Edit to taste.
  sessionsNote:
    "Sessions are confidential and tailored to you. They support wellbeing and are not a substitute for emergency or acute medical care — if you are in crisis, contact your local emergency services.",

  // ---- Photo gallery -------------------------------------------------------
  gallery: [
    // Leave src "" to show a soft styled placeholder. Drop your own photos into
    // assets/images/ and point src at them (e.g. "assets/images/room.jpg").
    { label: "A calm corner", hue: 330, src: "" },
    { label: "Soft morning light", hue: 318, src: "" },
    { label: "Room to breathe", hue: 342, src: "" },
    { label: "Stillness", hue: 305, src: "" },
    { label: "Tea & quiet", hue: 350, src: "" },
    { label: "Gentle movement", hue: 322, src: "" },
  ],

  // ---- Social proof --------------------------------------------------------
  reviews: {
    score: "100%",
    count: 24,
    quotes: [
      {
        text: "Add a real client review here. Tanya held such a gentle, safe space — I finally felt able to breathe.",
        author: "Client review",
      },
      {
        text: "Replace with a testimonial from someone you've worked with — the calm, the care, the change afterwards.",
        author: "Client review",
      },
      {
        text: "A third short quote fits nicely here. Keep them to a couple of warm sentences.",
        author: "Client review",
      },
    ],
  },

  // ---- Where you work & languages you offer therapy in ---------------------
  locations: ["Copenhagen", "Aarhus", "Online"],
  languages: ["Danish", "English"],
};
