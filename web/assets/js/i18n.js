/* =============================================================================
   Rebalance — UI localization (English / Danish)
   -----------------------------------------------------------------------------
   This localizes the site's own UI text (nav, headings, buttons, copy).
   It does NOT touch CMS content (event/session/gallery titles, descriptions,
   itineraries) — that stays in whatever language it was entered in Sanity.

   Engine:
   • elements with  data-i18n="key"       -> textContent set from the dictionary
   • elements with  data-i18n-html="key"  -> innerHTML set (for copy with <strong> etc.)
   • buttons with   data-lang="en|da"  -> language switcher
   • t("key") is available to main.js for JS-generated labels.
   Translations of the longer sentences are a first pass — worth a native review.
   ========================================================================== */
(function () {
  var STR = {
    en: {
      nav_events: "Events", nav_sessions: "Sessions", nav_groups: "Classes", nav_gallery: "Gallery", nav_about: "About me", nav_book: "Book",
      services_eyebrow: "How we can help", services_heading: "Find your path",
      service_events_eyebrow: "Group retreats", service_events_title: "Hikes & Retreats",
      service_events_desc: "Small-group guided hikes across Scandinavia and the Alps — paced for presence, not performance.",
      service_events_cta: "Explore events →",
      service_sessions_eyebrow: "1:1 with Tanya", service_sessions_title: "Personal Sessions",
      service_sessions_desc: "Individual therapy blending movement, body awareness and time in nature — online or in person.",
      service_sessions_cta: "Book a session →",
      service_groups_eyebrow: "In good company", service_groups_title: "Classes",
      service_groups_desc: "Therapeutic group work in a natural setting — guided movement, shared reflection and a warm supportive circle.",
      service_groups_cta: "See classes →",
      groups_eyebrow: "Classes", groups_heading: "Therapy & hikes in good company",
      groups_intro: "Small group sessions in nature — guided movement, shared reflection and gentle accountability. Open to all levels.",
      page_title_events: "Events — Tanya Basse",
      page_title_sessions: "Sessions — Tanya Basse",
      page_title_groups: "Classes — Tanya Basse",
      hero_badge: "🌿 Nature-assisted wellbeing · Denmark & Sweden",
      hero_tagline: "We hike for better mental health, well-being and self-knowledge.",
      hero_intro: "Guided therapeutic hikes, retreats and 1:1 therapy — slow down, breathe, and find your footing in the wild.",
      hero_find_event: "Find an event", hero_book_session: "Book a session",
      moments_eyebrow: "Moments on the trail", moments_heading: "Where we’ve wandered", view_full_gallery: "View full gallery →",
      events_eyebrow: "Upcoming events", events_heading: "Hikes & retreats you can book",
      events_intro: "Small groups, paced for presence rather than performance. Reserve your spot or pay securely online.",
      book_pay: "Book & pay", reserve_spot: "Reserve a spot", enquire: "Enquire", view_details: "View details →", buy_clipcard: "Buy clip card",
      book_time: "Book a time", book_free_call: "Book free call", pay_online: "Pay online", buy: "Buy", get_started: "Get started",
      sessions_eyebrow: "Work 1:1 with Tanya", sessions_heading: "Sessions & therapy",
      sessions_intro: "Tanya Basse is a therapist working with psychomotor and nature-assisted therapy. Pick a session, choose a time that suits you, and pay securely — online or in person.",
      sessions_note: "Sessions are confidential and tailored to you. They support wellbeing and are not a substitute for emergency or acute medical care — if you are in crisis, contact your local emergency services.",
      about_eyebrow: "About me", about_heading: "Nature-assisted therapy, on foot",
      about_p1: "I'm <strong>Tanya Basse</strong>, a therapist working with psychomotor and nature-assisted therapy. Alongside group hikes and retreats, I offer 1:1 sessions — blending movement, body awareness and time in the wild to help you slow down, reconnect and come home to yourself.",
      about_p2: "Group events welcome all levels; 1:1 sessions and therapy are available online or in person, in several languages.",
      see_events: "See events", langs_display: "Danish, English",
      parallax_quote: "Slow down, breathe, and rebalance.",
      reviews_eyebrow: "Feedback from clients", reviews_line: "recommend · based on 32 reviews on Facebook",
      review_q1: "Super nice weekend with sweet, friendly people, all very well organised including contingency planning. Relaxing atmosphere but serious hiking. My body aches, yet my head is totally refreshed. I look forward to the next opportunity to join this group!",
      review_q2: "This was my second hiking trip with Rebalance. Saying that I enjoyed it would be a huge understatement. Both trips were truly special, unique, and unforgettable. My mind completely reset, and my body showed me what I can. Hiking in nature is wonderful on its own, but sharing the experience with the organizers and a welcoming group where you can talk, laugh, enjoy peaceful moments in silence, and discover new practices — made it exactly what I needed.",
      review_q3: "An incredible experience and a complete reset after the hike! I'm so grateful to the organizers for creating such a wonderful experience and such great company. I especially loved the combination of hiking with relaxation practices and exercises that support mental wellbeing. Spending time with interesting people, sharing lunches and dinners together — everything was simply wonderful!",
      review_q4: "The trip was incredibly meaningful and inspiring, especially if you're going through a challenging period in your life. It truly helps reset your mind and gives you a fresh perspective on life. I especially loved the Silent Walk, the tea ceremony, and the sauna. Thank you to the organizers — you helped me shift my mindset and reconnect with myself. Thank you so much, girls!",
      review_author: "Rebalance member",
      cta_heading: "Ready to join us in the wild?",
      cta_text: "Book a guided hike, reserve a place on a retreat, or start with a 1:1 session. Spaces are limited to keep groups small.",
      footer_tagline: "Guided wellbeing hikes & nature retreats across Scandinavia and the Alps.",
      footer_explore: "Explore", footer_getintouch: "Get in touch", footer_made: "Made with care for the outdoors 🌲",
      footer_rights: "All rights reserved.", label_email: "Email",
      contact_heading: "Have a question?", contact_text: "Ready to reconnect with nature and yourself? Feel free to reach out — we'd love to help you find the experience that's right for you.", read_more: "Read more",
      gallery_back_home: "← Back home", gallery_heading: "Gallery",
      gallery_intro: "Moments from our hikes and retreats. Open a folder to explore.",
      gallery_more: "More",
      folder_back: "← All folders",
      folder_intro: "Tap any photo to enlarge.",
      gallery_cta_heading: "Like what you see?",
      gallery_cta_text: "Come and experience it for yourself — join an event or book a 1:1 session with Tanya.",
      early_bird: "early bird", until_date: "until", price_regular: "regular",
      detail_back: "← All events", detail_daybyday: "Day by day",
      detail_notfound: "Sorry, we couldn’t find that trip.", detail_see_all: "See all events",
      modal_title: "Get in touch",
      modal_text: "Please contact us directly — we’d love to hear from you and help you find the right option.",
      modal_email: "Email us",
      modal_telegram: "Message on Telegram",
      page_title_home: "Tanya Basse — Guided wellbeing hikes & nature retreats",
      page_title_gallery: "Gallery — Tanya Basse",
      booked: "✓ Booked",
      paid_thanks: "Thanks — your test booking is confirmed.",
    },
    da: {
      nav_events: "Begivenheder", nav_sessions: "Sessioner", nav_groups: "Grupper", nav_gallery: "Galleri", nav_about: "Om mig", nav_book: "Book",
      services_eyebrow: "Hvad tilbyder vi", services_heading: "Find din vej",
      service_events_eyebrow: "Grupperetreat", service_events_title: "Vandringer & retreats",
      service_events_desc: "Guidede vandringer i Skandinavien og Alperne for små grupper — i roligt tempo med fokus på nærvær.",
      service_events_cta: "Se begivenheder →",
      service_sessions_eyebrow: "1:1 med Tanya", service_sessions_title: "Individuelle sessioner",
      service_sessions_desc: "Individuel terapi med bevægelse, kropsbevidsthed og tid i naturen — online eller fysisk.",
      service_sessions_cta: "Book en session →",
      service_groups_eyebrow: "I godt selskab", service_groups_title: "Gruppesessioner",
      service_groups_desc: "Terapeutisk gruppearbejde i naturen — guidet bevægelse, fælles refleksion og varmt fællesskab.",
      service_groups_cta: "Se gruppesessioner →",
      groups_eyebrow: "Gruppesessioner", groups_heading: "Terapi & vandringer i godt selskab",
      groups_intro: "Små gruppesessioner i naturen — guidet bevægelse, fælles refleksion og gensidig støtte. Åbent for alle niveauer.",
      page_title_events: "Begivenheder — Tanya Basse",
      page_title_sessions: "Sessioner — Tanya Basse",
      page_title_groups: "Gruppesessioner — Tanya Basse",
      hero_badge: "🌿 Naturassisteret velvære · Danmark & Sverige",
      hero_tagline: "Vi vandrer for bedre mental sundhed, trivsel og selvindsigt.",
      hero_intro: "Guidede terapeutiske vandringer, retreats og 1:1-terapi — sæt tempoet ned, træk vejret, og find fodfæste i naturen.",
      hero_find_event: "Find en begivenhed", hero_book_session: "Book en session",
      moments_eyebrow: "Øjeblikke på stien", moments_heading: "Hvor vi har vandret", view_full_gallery: "Se hele galleriet →",
      events_eyebrow: "Kommende begivenheder", events_heading: "Vandringer & retreats, du kan booke",
      events_intro: "Små grupper i roligt tempo — nærvær frem for præstation. Reservér din plads, eller betal sikkert online.",
      book_pay: "Book & betal", reserve_spot: "Reservér plads", enquire: "Forespørg", view_details: "Se detaljer →", buy_clipcard: "Køb klippekort",
      book_time: "Book et tidspunkt", book_free_call: "Book gratis samtale", pay_online: "Betal online", buy: "Køb", get_started: "Kom i gang",
      sessions_eyebrow: "Arbejd 1:1 med Tanya", sessions_heading: "Sessioner & terapi",
      sessions_intro: "Tanya Basse er terapeut og arbejder med psykomotorisk og naturassisteret terapi. Vælg en session, find et tidspunkt, der passer dig, og betal sikkert — online eller fysisk.",
      sessions_note: "Sessionerne er fortrolige og tilpasset dig. De understøtter trivsel og er ikke en erstatning for akut lægehjælp — er du i krise, så kontakt de lokale alarmtjenester.",
      about_eyebrow: "Om mig", about_heading: "Naturassisteret terapi — til fods",
      about_p1: "Jeg er <strong>Tanya Basse</strong>, terapeut med speciale i psykomotorisk og naturassisteret terapi. Ud over gruppevandringer og retreats tilbyder jeg 1:1-sessioner — en blanding af bevægelse, kropsbevidsthed og tid i naturen, der hjælper dig med at sætte tempoet ned, finde ro og komme hjem til dig selv.",
      about_p2: "Gruppebegivenheder er for alle niveauer; 1:1-sessioner og terapi tilbydes online eller fysisk, på flere sprog.",
      see_events: "Se begivenheder", langs_display: "Dansk, engelsk",
      parallax_quote: "Sæt tempoet ned, træk vejret, og find balancen.",
      reviews_eyebrow: "Feedback fra klienter", reviews_line: "anbefaler · baseret på 32 anmeldelser på Facebook",
      review_q1: "Super skøn weekend med søde og imødekommende mennesker. Det hele var virkelig godt organiseret og gennemtænkt. Afslappet stemning, men seriøse vandreture. Min krop er øm, men mit hoved er helt frisk og fyldt med ny energi. Jeg glæder mig allerede til næste mulighed for at tage med denne gruppe!",
      review_q2: "Det var anden gang, jeg var på vandretur med Rebalance. At sige, at jeg nød det, er næsten en underdrivelse. Begge ture har været helt særlige, anderledes og uforglemmelige. Mit hoved blev nulstillet, og min krop viste mig, hvad jeg kan. Naturen er fantastisk i sig selv, men sammen med arrangørerne og en skøn gruppe, hvor der er plads til både samtaler, grin, stilhed og nye kropslige praksisser — blev det præcis det, jeg havde brug for.",
      review_q3: "En fantastisk oplevelse og en total genopladning efter vandreturen! Jeg er meget taknemmelig over for arrangørerne for den gode organisering og det dejlige fællesskab. Jeg var især vild med kombinationen af vandring, afspændingsøvelser og praksisser, der styrker det mentale velvære. Tiden sammen med spændende mennesker samt vores fælles frokoster og aftensmåltider gjorde oplevelsen helt fantastisk!",
      review_q4: "Turen var en fantastisk oplevelse og især værdifuld, hvis man går igennem en svær periode i livet. Den hjalp mig virkelig med at nulstille tankerne og se livet fra et nyt perspektiv. Jeg var især vild med Silent Walk, teceremonien og saunaen. Tusind tak til arrangørerne – I hjalp mig med at finde en ny ro og et nyt perspektiv. Tak, piger!",
      review_author: "Rebalance-deltager",
      cta_heading: "Klar til at komme med ud i naturen?",
      cta_text: "Book en guidet vandring, reservér en plads på et retreat, eller start med en 1:1-session. Antallet af pladser er begrænset, så grupperne forbliver små.",
      footer_tagline: "Guidede trivselsvandringer & naturretreats i Skandinavien og Alperne.",
      footer_explore: "Udforsk", footer_getintouch: "Kontakt", footer_made: "Skabt med omtanke for naturen 🌲",
      footer_rights: "Alle rettigheder forbeholdes.", label_email: "E-mail",
      contact_heading: "Har du et spørgsmål?", contact_text: "Klar til at genfinde forbindelsen til naturen og dig selv? Kontakt os – vi hjælper dig gerne med at finde den oplevelse, der passer til dig.", read_more: "Læs mere",
      gallery_back_home: "← Tilbage til forsiden", gallery_heading: "Galleri",
      gallery_intro: "Øjeblikke fra vores vandringer og retreats. Åbn en mappe for at se mere.",
      gallery_more: "Mere",
      folder_back: "← Alle mapper",
      folder_intro: "Tryk på et billede for at forstørre.",
      gallery_cta_heading: "Kan du lide det, du ser?",
      gallery_cta_text: "Kom og oplev det selv — deltag i en begivenhed, eller book en 1:1-session med Tanya.",
      early_bird: "tidlig fugl", until_date: "til", price_regular: "normalpris",
      detail_back: "← Alle begivenheder", detail_daybyday: "Dag for dag",
      detail_notfound: "Beklager, vi kunne ikke finde den tur.", detail_see_all: "Se alle begivenheder",
      modal_title: "Kontakt os",
      modal_text: "Skriv til os direkte — vi hjælper dig gerne med at finde det rigtige tilbud.",
      modal_email: "Send en e-mail",
      modal_telegram: "Skriv på Telegram",
      page_title_home: "Tanya Basse — Guidede trivselsvandringer & naturretreats",
      page_title_gallery: "Galleri — Tanya Basse",
      booked: "✓ Booket",
      paid_thanks: "Tak — din test-booking er bekræftet.",
    },
  };

  function pickInitial() {
    try {
      var s = localStorage.getItem("ttt_lang");
      if (s && STR[s]) return s;
    } catch (e) {}
    return "da"; // Danish is the default language
  }
  var current = pickInitial();

  window.t = function (key) {
    return (STR[current] && STR[current][key] != null) ? STR[current][key]
         : (STR.en[key] != null ? STR.en[key] : key);
  };
  window.getLocale = function () { return current; };

  function apply() {
    var dict = STR[current] || STR.en;
    document.documentElement.lang = current;
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n]"), function (el) {
      var v = dict[el.getAttribute("data-i18n")];
      if (v == null) v = STR.en[el.getAttribute("data-i18n")];
      if (v != null) el.textContent = v;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-i18n-html]"), function (el) {
      var v = dict[el.getAttribute("data-i18n-html")];
      if (v == null) v = STR.en[el.getAttribute("data-i18n-html")];
      if (v != null) el.innerHTML = v;
    });
    Array.prototype.forEach.call(document.querySelectorAll("[data-lang]"), function (b) {
      b.classList.toggle("is-active", b.getAttribute("data-lang") === current);
      b.setAttribute("aria-pressed", b.getAttribute("data-lang") === current ? "true" : "false");
    });
  }
  window.applyI18n = apply;

  window.setLocale = function (loc) {
    if (!STR[loc] || loc === current) return;
    current = loc;
    try { localStorage.setItem("ttt_lang", loc); } catch (e) {}
    apply();
    if (typeof window.__onLocaleChange === "function") window.__onLocaleChange();
  };

  document.addEventListener("click", function (e) {
    var b = e.target.closest ? e.target.closest("[data-lang]") : null;
    if (b) { e.preventDefault(); window.setLocale(b.getAttribute("data-lang")); }
  });

  if (document.readyState !== "loading") apply();
  else document.addEventListener("DOMContentLoaded", apply);
})();
