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
  // Client reviews (short versions). testimonialsPinned keeps these on the site instead of the CMS copies.
  testimonialsPinned: true,
  testimonials: [
    { author: "Combat soldier, 25", role: "In rehabilitation after combat injuries", text: "I finally felt able to relax and let go. The flashbacks almost disappeared, and the phantom pain no longer came at night like it used to." },
    // { author: "Andrij, 39", role: "Combat soldier \u2022 Leg amputation and multiple shrapnel wounds", photo: "https://cdn.sanity.io/images/s3xmc1k6/production/305247d33b4d57a3e6d4fb24b5228d2608ddb468-200x200.png", text: "My leg started healing faster, the pain in my joints disappeared, and I began sleeping better." },
    // { author: "Margarita, 72", role: "Displaced due to the war", photo: "https://cdn.sanity.io/images/s3xmc1k6/production/50c264c288a3d96b62206f67b7aad9061cca2eb3-200x200.png", text: "I feel a boost of energy and lightness. My body relaxes, the pain fades, and I find a sense of calm I didn\u2019t know I needed." },
    // { author: "Anastasia, 42", role: "Displaced due to the war", photo: "https://cdn.sanity.io/images/s3xmc1k6/production/5b9f04dc6fa71544449533d646b821fc97ab8bae-200x200.png", text: "I have more energy and a stronger desire to live and work. I\u2019ve started focusing on developing my skills and learning the language." },
  ],

  brand: {
    name: "Re-balance", // visible brand name; "Rebalance" stays the internal code name (repo, Sanity, paths)
    tagline: "We hike for better mental health, well-being and self-knowledge.",
    intro: "Guided nature hikes, retreats and 1:1 therapy with Tanya Basse — slow down, breathe, and find your footing in the wild.",
    email: "tanyabasse@gmail.com",
    phone: "+45 41 18 50 96",
    whatsapp: "4541185096", // digits only — becomes https://wa.me/…
    location: "København, Østerbro",
    cvr: "32386644",
    instagram: "https://www.instagram.com/tanyabasse/",
    facebook: "",
    telegram: "",
  },

  // Default calendar used by the generic "Book" buttons when a session
  // doesn't specify its own. Paste a Cal.com or Calendly link. Leave "" to
  // fall back to email.
  schedulerUrl: "",

  // ---- Group-session booking (our own system on Supabase) ------------------
  // The semi-private (1:4) session books through our Supabase Edge Functions.
  // Both values below are PUBLIC and safe to commit (the anon key is meant for
  // browsers). The service-role key / DB password never go here.
  booking: {
    functionsBase: "https://egtaoiaiqxvgiismhpvd.supabase.co/functions/v1",
    publishableKey: "sb_publishable__oBXfiS03HP5YMwtwFv-tw_uevE27Hv", // Supabase publishable key — browser-safe
  },

  // Content (therapy sessions + photo gallery) is loaded LIVE from Sanity
  // (projectId above). There is intentionally no built-in fallback content:
  // the three document types — session, galleryGroup, galleryImage — are the
  // single source of truth. If Sanity is unreachable those sections render empty.

  // Short, neutral note shown under the Sessions section. Edit to taste.
  sessionsNote:
    "Sessions are confidential and tailored to you. They support wellbeing and are not a substitute for emergency or acute medical care — if you are in crisis, contact your local emergency services.",

  // ---- Social proof --------------------------------------------------------
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

  // ---- Local gallery photos (no Sanity needed) ------------------------------
  // These always show on the Gallery page, in addition to anything managed in
  // Sanity. Each item needs a src (path under assets/images/) and a label; give
  // items in the same group a matching groupId so they form one folder tile.
  localGalleryGroups: [
    { _id: "sessions", title: { en: "Individual sessions", da: "Individuelle sessioner" }, hue: 150 },
    { _id: "studio", title: { en: "The studio", da: "Studiet" }, hue: 40 },
    { _id: "dignity", title: { en: "DIGNITY \u2013 project work", da: "DIGNITY \u2013 projektarbejde" }, hue: 10 },
  ],
  localGallery: [
    ...Array.from({ length: 20 }, (_, i) => ({
      src: "assets/images/session/session-" + String(i + 1).padStart(2, "0") + ".jpg",
      label: { en: "Functional Relaxation session", da: "Funktionel Afspænding-session" },
      groupId: "sessions", hue: 150,
    })),
    ...Array.from({ length: 6 }, (_, i) => ({
      src: "assets/images/studio/studio-" + String(i + 1).padStart(2, "0") + ".jpg",
      label: { en: "The studio", da: "Studiet" },
      groupId: "studio", hue: 40,
    })),
    { src: "assets/images/studio/grouprest-01.jpg", label: { en: "Deep Rest group session", da: "Deep Rest-gruppesession" }, groupId: "studio", hue: 40 },
    ...Array.from({ length: 6 }, (_, i) => ({
      src: "assets/images/dignity/dignity-" + String(i + 1).padStart(2, "0") + ".jpg",
      label: { en: "DIGNITY \u2013 Danish Institute Against Torture", da: "DIGNITY \u2013 Dansk Institut Mod Tortur" },
      groupId: "dignity", hue: 10,
    })),
  ],

  // ---- Where you operate & languages you guide in --------------------------
  locations: ["Copenhagen"],
  languages: ["Danish", "English"],
};
