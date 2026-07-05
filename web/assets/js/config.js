/* =============================================================================
   TRAIL TO THRIVING — site content & settings
   -----------------------------------------------------------------------------
   This is the ONLY file you normally need to edit. No coding required:
   change the text in quotes, paste your links, add your photos.

   TWO WAYS PEOPLE CAN BOOK:
   • events[]   -> group hikes / retreats people BUY (a Stripe Payment Link).
   • sessions[] -> 1:1 time with Tanja, incl. THERAPY, that people BOOK on a
                   calendar (a Cal.com / Calendly link), and pay for.

   Each event or session can carry its OWN links:
   • schedulerUrl -> a Cal.com / Calendly link (opens a calendar to pick a time)
   • stripeUrl    -> a Stripe Payment Link (a public "buy / pay" URL)
   • image / src  -> path to your own photo, e.g. "assets/images/lofoten.jpg"
                     (leave "" to show a styled placeholder)

   Nothing secret goes in here — Payment Links and scheduler links are public
   URLs, safe to commit. NEVER paste API keys, secret keys or passwords.
   ========================================================================== */

window.SITE_CONFIG = {
  // ---- Content source (CMS) -------------------------------------------------
  // Leave projectId "" to use the built-in content below (demo/fallback).
  // Once Tanya's Sanity project exists, paste its ID here and the site loads
  // events, sessions and gallery LIVE from the CMS instead.
  // Don't forget: add your site URL + http://localhost:8087 to
  // Sanity → Manage → API → CORS origins, or the browser fetch is blocked.
  sanity: { projectId: "s3xmc1k6", dataset: "production", apiVersion: "2024-01-01" },

  brand: {
    name: "Trail to Thriving",
    tagline: "We hike for better mental health, well-being and self-knowledge.",
    intro: "Guided nature hikes, retreats and 1:1 therapy with Tanya Ekelin — slow down, breathe, and find your footing in the wild.",
    email: "tanya.ekelin@gmail.com",
    instagram: "https://www.instagram.com/green.body.lab/",
    facebook: "https://www.facebook.com/trailtothriving/",
    telegram: "https://t.me/imagahp",
  },

  // Default calendar used by the generic "Book" buttons when an event/session
  // doesn't specify its own. Paste a Cal.com or Calendly link, e.g.
  //   "https://cal.com/trail-to-thriving"   Leave "" to fall back to email.
  schedulerUrl: "",

  // =========================================================================
  // EVENTS — group hikes & retreats people BUY (pay upfront for a spot)
  // Make one bookable: create a Stripe Payment Link (README) -> paste stripeUrl.
  // =========================================================================
  events: [
    {
      active: true,
      title: "Geirangerfjord & Waterfalls",
      location: "Geiranger, Norway",
      dates: "11–18 July 2026",
      duration: "8 days",
      price: "From kr 8,900",
      blurb:
        "A week inside Norway's most iconic UNESCO fjord — guided ridge walks, cold-water swims and quiet evenings under the midnight sun.",
      hue: 205,
      image: "assets/images/demo-2.jpg",
      stripeUrl: "",
    },
    {
      active: true,
      title: "Preikestolen (Pulpit Rock)",
      location: "Ryfylke, Norway",
      dates: "22–26 July 2026",
      duration: "5 days",
      price: "From kr 5,400",
      blurb:
        "The classic climb to the 604-metre cliff above Lysefjord, plus mindful forest walks and a grounding breath-work session at the summit.",
      hue: 150,
      image: "assets/images/demo-4.jpg",
      stripeUrl: "",
    },
    {
      active: true,
      title: "Lofoten Islands Retreat",
      location: "Lofoten, Norway",
      dates: "Summer 2026 · dates TBA",
      duration: "6 days",
      price: "From kr 7,200",
      blurb:
        "Jagged peaks straight out of the sea, white beaches and Arctic light. A small-group reset for body and mind.",
      hue: 195,
      image: "assets/images/demo-5.jpg",
      stripeUrl: "",
    },
    {
      active: true,
      title: "Mont Blanc · Chamonix",
      location: "Chamonix, France",
      dates: "2026 · dates TBA",
      duration: "7 days",
      price: "From €1,150",
      blurb:
        "Alpine meadows, glacier views and high mountain air. Daily guided hikes paced for presence, not performance.",
      hue: 220,
      image: "assets/images/demo-1.jpg",
      stripeUrl: "",
    },
  ],

  // =========================================================================
  // SESSIONS — 1:1 time with Tanya (a therapist). People BOOK a time and pay.
  // Best setup: give each one its own Cal.com / Calendly event-type link in
  // schedulerUrl. Cal.com & Calendly can collect payment at booking (connect
  // Stripe in their dashboard) — or set a stripeUrl to take payment separately
  // / sell a package. Leave both "" and it falls back to an email enquiry.
  // =========================================================================
  sessions: [
    {
      title: "Free intro call",
      format: "Online · 20 min",
      price: "Free",
      blurb:
        "A relaxed chat to see if working together feels right and to find the best starting point for you.",
      hue: 165,
      image: "",
      schedulerUrl: "", // Cal.com/Calendly link for the free call
      stripeUrl: "",
    },
    {
      title: "Nature-assisted therapy",
      format: "In person · 60 min",
      price: "kr 750 / session",
      blurb:
        "A guided 1:1 session outdoors — movement, body awareness and talk in a calm natural setting.",
      hue: 140,
      image: "assets/images/nature-therapy.jpg",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      title: "Psychomotor therapy",
      format: "In person or online · 60 min",
      price: "kr 750 / session",
      blurb:
        "Body-oriented therapy to ease tension, settle the nervous system and reconnect with yourself.",
      hue: 195,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      title: "5-session package",
      format: "Online or in person",
      price: "kr 3,500",
      blurb:
        "A discounted series of five sessions for deeper, ongoing work — booked at a pace that suits you.",
      hue: 35,
      image: "",
      schedulerUrl: "",
      stripeUrl: "", // good candidate for a Stripe Payment Link (prepay the package)
    },
  ],

  // =========================================================================
  // GROUP SESSIONS — therapy / hikes in a small group setting
  // Same structure as sessions[]. Add schedulerUrl or stripeUrl to make bookable.
  // =========================================================================
  groupSessions: [
    {
      title: "Forest morning circle",
      format: "In person · Group · 90 min",
      price: "kr 250 / session",
      blurb: "A gentle group walk and sharing circle in the forest — open to all, no experience needed. A great starting point.",
      hue: 130,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      title: "Body & breath in nature",
      format: "In person · Group · 2 hrs",
      price: "kr 350 / session",
      blurb: "Guided movement, breath work and grounding exercises in an outdoor setting — for nervous system reset and connection.",
      hue: 150,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
    {
      title: "Monthly hike & reflect",
      format: "In person · Group · Half-day",
      price: "kr 450",
      blurb: "A monthly guided hike with time for shared reflection at the end. Small group, quiet pace, real conversation.",
      hue: 105,
      image: "",
      schedulerUrl: "",
      stripeUrl: "",
    },
  ],

  groupSessionsNote:
    "Group sessions are held in small, safe circles. They complement individual therapy and are not a substitute for emergency or acute medical care.",

  // Short, neutral note shown under the Sessions section. Edit to taste.
  sessionsNote:
    "Sessions are confidential and tailored to you. They support wellbeing and are not a substitute for emergency or acute medical care — if you are in crisis, contact your local emergency services.",

  // ---- Photo gallery -------------------------------------------------------
  gallery: [
    // First 6 are pre-wired to demo filenames — save the matching photos into
    // assets/images/ with these names and they appear automatically. Until then
    // a styled placeholder shows in their place (nothing looks broken).
    { label: "Forest in bloom", hue: 110, src: "assets/images/demo-1.jpg" },
    { label: "Still water", hue: 200, src: "assets/images/demo-2.jpg" },
    { label: "Nourish", hue: 30, src: "assets/images/demo-3.jpg" },
    { label: "Among the pines", hue: 140, src: "assets/images/demo-4.jpg" },
    { label: "Northern lights", hue: 265, src: "assets/images/demo-5.jpg" },
    { label: "Evening fire", hue: 20, src: "assets/images/demo-6.jpg" },
    { label: "Morning trail", hue: 175, src: "" },
    { label: "Summit rest", hue: 95, src: "" },
    { label: "Forest path", hue: 150, src: "" },
  ],

  // ---- Social proof (the real Facebook stats) ------------------------------
  reviews: {
    score: "100%",
    count: 32,
    quotes: [
      {
        text: "Add a real guest review here. Tanya created a space where I could finally switch off and just walk.",
        author: "Guest review",
      },
      {
        text: "Replace with a testimonial from your community — the hikes, the people, the calm afterwards.",
        author: "Guest review",
      },
      {
        text: "A third short quote fits nicely here. Keep them to a couple of sentences.",
        author: "Guest review",
      },
    ],
  },

  // ---- Where you operate & languages you guide in --------------------------
  locations: ["Copenhagen", "Aarhus", "Odense", "Malmö", "Gothenburg"],
  languages: ["Danish", "English", "Ukrainian"],
};
