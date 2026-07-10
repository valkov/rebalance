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
    name: "Re-balance", // visible brand name; "Rebalance" stays the internal code name (repo, Sanity, paths)
    tagline: "We hike for better mental health, well-being and self-knowledge.",
    intro: "Guided nature hikes, retreats and 1:1 therapy with Tanya Basse — slow down, breathe, and find your footing in the wild.",
    email: "tanyabasse@gmail.com",
    instagram: "https://www.instagram.com/tanyabasse/",
    facebook: "",
    telegram: "",
  },

  // Default calendar used by the generic "Book" buttons when a session
  // doesn't specify its own. Paste a Cal.com or Calendly link. Leave "" to
  // fall back to email.
  schedulerUrl: "",

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

  // ---- Where you operate & languages you guide in --------------------------
  locations: ["Copenhagen"],
  languages: ["Danish", "English"],
};
