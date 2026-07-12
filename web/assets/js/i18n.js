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
      page_title_events: "Events — Re-balance",
      page_title_sessions: "Sessions — Re-balance",
      page_title_groups: "Classes — Re-balance",
      hero_badge: "🌿 Nature-assisted wellbeing · Denmark & Sweden",
      hero_tagline: "We hike for better mental health, well-being and self-knowledge.",
      hero_intro: "Guided therapeutic hikes, retreats and 1:1 therapy — slow down, breathe, and find your footing in the wild.",
      hero_find_event: "Find an event", hero_book_session: "Book a session",
      moments_eyebrow: "Moments on the trail", moments_heading: "Where we’ve wandered", view_full_gallery: "View full gallery →",
      events_eyebrow: "Upcoming events", events_heading: "Hikes & retreats you can book",
      events_intro: "Small groups, paced for presence rather than performance. Reserve your spot or pay securely online.",
      book_pay: "Book & pay", reserve_spot: "Reserve a spot", enquire: "Enquire", view_details: "View details →",
      book_time: "Book a time", book_free_call: "Book free call", pay_online: "Pay online", buy: "Buy", get_started: "Get started",
      sessions_eyebrow: "Work 1:1 with Tanya", sessions_heading: "Sessions & therapy",
      sessions_intro: "Tanya Basse is a therapist working with psychomotor and nature-assisted therapy. Pick a session, choose a time that suits you, and pay securely — online or in person.",
      sessions_note: "Sessions are confidential and tailored to you. They support wellbeing and are not a substitute for emergency or acute medical care — if you are in crisis, contact your local emergency services.",
      why_heading: "Why I offer different types of support",
      why_body: "<p>Healing rarely happens during one hour a week.</p><p>When we are going through periods of high stress, trauma, or major life challenges, we often need a stronger support system. My intention is to make that support more accessible.</p><p>Rather than relying only on individual sessions, you can combine private therapy with shorter follow-up calls and Deep Rest group sessions. This allows you to receive more consistent support while keeping the overall cost lower than adding additional private sessions.</p>",
      about_eyebrow: "Meet Tanya", about_heading: "About me",
      about_bio: "<p>I’m Tanya, founder of Re-balance.</p><p>I hold a Master of Social Science (Cand.Soc.) and have spent more than a decade working with stress, movement, and nervous system regulation.</p><p>My background combines psychotherapy training, bodywork, yoga, Functional Relaxation, qigong, mindfulness, and neuroscience-informed approaches to stress and trauma.</p><p>For seven years I developed and taught Office Yoga, creating practical movement and breathing techniques that people could use during the working day to reduce stress and prevent burnout.</p><p>Today I am completing advanced training in Bodynamic psychotherapy, specialising in psychomotor development, attachment, and developmental psychology.</p><p>Over the past five years I have developed an integrative therapeutic approach based on both education and clinical experience. My work has included supporting refugees affected by war and displacement in collaboration with Copenhagen Municipality and DIGNITY – the Danish Institute Against Torture, as well as working with soldiers living with PTSD and severe physical injuries, including amputations.</p><p>Today I bring this experience into private practice, helping people restore a sense of safety, regulation, and connection through body-oriented psychotherapy and nervous system work.</p>",
      about_approach_heading: "About the approach",
      about_approach: "<p>Many emotional and physical symptoms are signs of a nervous system that has been under strain for a long time.</p><p>My work focuses on supporting people experiencing complex trauma (C-PTSD), burnout, chronic stress, anxiety, emotional overwhelm, emotional numbness, and other stress-related challenges. Whether your experience is constant tension, anger, exhaustion, or feeling disconnected from yourself, these are often expressions of a nervous system that no longer feels safe.</p><p>My work is also suitable for people living with chronic pain, physical trauma, or amputations. When the nervous system begins to regulate, the body often has better conditions for healing, recovery, and pain management. Some people also experience a reduction in phantom pain.</p><p>The aim is not simply relaxation. It is to help your nervous system regain a sense of safety, connection, and resilience, allowing both mind and body to function more naturally again.</p>",
      see_events: "See events", langs_display: "Danish, English",
      parallax_quote: "Slow down, breathe, and rebalance.",
      reviews_eyebrow: "Partners feedback", reviews_heading: "In their words", reviews_line: "recommend · based on 32 reviews on Facebook",
      review_q1: "Super nice weekend with sweet, friendly people, all very well organised including contingency planning. Relaxing atmosphere but serious hiking. My body aches, yet my head is totally refreshed. I look forward to the next opportunity to join this group!",
      review_q2: "This was my second hiking trip with Rebalance. Saying that I enjoyed it would be a huge understatement. Both trips were truly special, unique, and unforgettable. My mind completely reset, and my body showed me what I can. Hiking in nature is wonderful on its own, but sharing the experience with the organizers and a welcoming group where you can talk, laugh, enjoy peaceful moments in silence, and discover new practices — made it exactly what I needed.",
      review_q3: "An incredible experience and a complete reset after the hike! I'm so grateful to the organizers for creating such a wonderful experience and such great company. I especially loved the combination of hiking with relaxation practices and exercises that support mental wellbeing. Spending time with interesting people, sharing lunches and dinners together — everything was simply wonderful!",
      review_q4: "The trip was incredibly meaningful and inspiring, especially if you're going through a challenging period in your life. It truly helps reset your mind and gives you a fresh perspective on life. I especially loved the Silent Walk, the tea ceremony, and the sauna. Thank you to the organizers — you helped me shift my mindset and reconnect with myself. Thank you so much, girls!",
      review_author: "Rebalance member",
      cta_heading: "Ready to join us in the wild?",
      cta_text: "Book a guided hike, reserve a place on a retreat, or start with a 1:1 session. Spaces are limited to keep groups small.",
      footer_tagline: "Guided wellbeing hikes & nature retreats across Scandinavia and the Alps.",
      footer_explore: "Explore", footer_getintouch: "Get in touch", footer_made: "Made with care for the outdoors 🌲",
      footer_blurb: "Body-oriented therapy and nervous-system work — a calm, safe space to slow down and reconnect.",
      footer_rights: "All rights reserved.", label_email: "Email", label_phone: "Phone", label_location: "Location",
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
      booking_loading: "Loading available times…",
      booking_pick_time: "Choose a time",
      booking_none: "All upcoming sessions are currently full.",
      booking_full_title: "Fully booked",
      booking_contact_intro: "Reach out and Tanya will help you find a time:",
      booking_seats_left: "{n} spots left", booking_seats_left_one: "1 spot left",
      booking_back: "← Back",
      booking_your_details: "Your details",
      booking_name: "Name", booking_email: "Email", booking_phone: "Phone",
      booking_confirm: "Confirm booking", booking_sending: "Booking…",
      booking_fill_all: "Please fill in all fields.",
      booking_bad_email: "Please enter a valid email address.",
      booking_bad_phone: "Please enter a valid phone number.",
      booking_full: "Sorry, that time just filled up. Please pick another.",
      booking_error: "Something went wrong. Please try again.",
      booking_confirmed_title: "You're booked in 🌿",
      booking_confirmed_text: "Your session on {when} is confirmed. Check your email for details and a cancellation link.",
      enquiry_title: "Request a session",
      enquiry_first: "First name", enquiry_last: "Last name", enquiry_message: "Message (optional)",
      enquiry_send: "Send request", enquiry_sending: "Sending…",
      enquiry_sent_title: "Thanks — your message is on its way 🌿",
      enquiry_sent_text: "Tanya will get back to you by email soon.",
      cancel_heading: "Cancel booking",
      cancel_checking: "Cancelling…",
      cancel_done: "Your booking has been cancelled. Your seat is now free.",
      cancel_toolate: "This booking can no longer be cancelled online — it's less than 24 hours before the session. Please contact us directly.",
      cancel_notfound: "We couldn't find that booking.",
      cancel_already: "This booking was already cancelled.",
      cancel_error: "Something went wrong. Please try again or contact us.",
      cancel_missing: "Invalid cancellation link.",
      page_title_home: "Re-balance — Body-oriented therapy in Copenhagen",
      page_title_gallery: "Gallery — Re-balance",
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
      page_title_events: "Begivenheder — Re-balance",
      page_title_sessions: "Sessioner — Re-balance",
      page_title_groups: "Gruppesessioner — Re-balance",
      hero_badge: "🌿 Naturassisteret velvære · Danmark & Sverige",
      hero_tagline: "Vi vandrer for bedre mental sundhed, trivsel og selvindsigt.",
      hero_intro: "Guidede terapeutiske vandringer, retreats og 1:1-terapi — sæt tempoet ned, træk vejret, og find fodfæste i naturen.",
      hero_find_event: "Find en begivenhed", hero_book_session: "Book en session",
      moments_eyebrow: "Øjeblikke på stien", moments_heading: "Hvor vi har vandret", view_full_gallery: "Se hele galleriet →",
      events_eyebrow: "Kommende begivenheder", events_heading: "Vandringer & retreats, du kan booke",
      events_intro: "Små grupper i roligt tempo — nærvær frem for præstation. Reservér din plads, eller betal sikkert online.",
      book_pay: "Book & betal", reserve_spot: "Reservér plads", enquire: "Forespørg", view_details: "Se detaljer →",
      book_time: "Book et tidspunkt", book_free_call: "Book gratis samtale", pay_online: "Betal online", buy: "Køb", get_started: "Kom i gang",
      sessions_eyebrow: "Arbejd 1:1 med Tanya", sessions_heading: "Sessioner & terapi",
      sessions_intro: "Tanya Basse er terapeut og arbejder med psykomotorisk og naturassisteret terapi. Vælg en session, find et tidspunkt, der passer dig, og betal sikkert — online eller fysisk.",
      sessions_note: "Sessionerne er fortrolige og tilpasset dig. De understøtter trivsel og er ikke en erstatning for akut lægehjælp — er du i krise, så kontakt de lokale alarmtjenester.",
      why_heading: "Hvorfor jeg tilbyder forskellige former for støtte",
      why_body: "<p>Heling sker sjældent i løbet af én time om ugen.</p><p>Når vi gennemgår perioder med høj stress, traumer eller store livsudfordringer, har vi ofte brug for et stærkere støttesystem. Min hensigt er at gøre den støtte mere tilgængelig.</p><p>I stedet for kun at basere sig på individuelle sessioner kan du kombinere privat terapi med kortere opfølgende samtaler og Deep Rest-gruppesessioner. Det giver dig mere vedvarende støtte, samtidig med at de samlede omkostninger holdes lavere end ved at tilføje flere private sessioner.</p>",
      about_eyebrow: "Mød Tanya", about_heading: "Om mig",
      about_bio: "<p>Jeg er Tanya, grundlægger af Re-balance.</p><p>Jeg har en kandidat i samfundsvidenskab (Cand.Soc.) og har i mere end ti år arbejdet med stress, bevægelse og regulering af nervesystemet.</p><p>Min baggrund kombinerer psykoterapeutisk uddannelse, kropsterapi, yoga, Funktionel Afspænding, qigong, mindfulness og neurovidenskabeligt informerede tilgange til stress og traumer.</p><p>I syv år udviklede og underviste jeg i kontoryoga og skabte praktiske bevægelses- og vejrtrækningsteknikker, som folk kunne bruge i løbet af arbejdsdagen til at reducere stress og forebygge udbrændthed.</p><p>I dag er jeg ved at afslutte en videreuddannelse i Bodynamic-psykoterapi med speciale i psykomotorisk udvikling, tilknytning og udviklingspsykologi.</p><p>Gennem de seneste fem år har jeg udviklet en integrativ terapeutisk tilgang baseret på både uddannelse og klinisk erfaring. Mit arbejde har blandt andet omfattet støtte til flygtninge ramt af krig og fordrivelse i samarbejde med Københavns Kommune og DIGNITY – Dansk Institut Mod Tortur, samt arbejde med soldater med PTSD og alvorlige fysiske skader, herunder amputationer.</p><p>I dag bringer jeg denne erfaring ind i privat praksis, hvor jeg hjælper mennesker med at genfinde en følelse af tryghed, regulering og forbindelse gennem kropsorienteret psykoterapi og arbejde med nervesystemet.</p>",
      about_approach_heading: "Om tilgangen",
      about_approach: "<p>Mange følelsesmæssige og fysiske symptomer er tegn på et nervesystem, der har været under pres i lang tid.</p><p>Mit arbejde fokuserer på at støtte mennesker med kompleks traume (C-PTSD), udbrændthed, kronisk stress, angst, følelsesmæssig overvældelse, følelsesmæssig følelsesløshed og andre stressrelaterede udfordringer. Uanset om din oplevelse er konstant spænding, vrede, udmattelse eller en følelse af at være afkoblet fra dig selv, er dette ofte udtryk for et nervesystem, der ikke længere føler sig trygt.</p><p>Mit arbejde er også velegnet til mennesker, der lever med kroniske smerter, fysiske traumer eller amputationer. Når nervesystemet begynder at regulere sig, har kroppen ofte bedre betingelser for heling, restitution og smertehåndtering. Nogle oplever også en reduktion af fantomsmerter.</p><p>Målet er ikke blot afspænding. Det er at hjælpe dit nervesystem med at genvinde en følelse af tryghed, forbindelse og modstandskraft, så både sind og krop igen kan fungere mere naturligt.</p>",
      see_events: "Se begivenheder", langs_display: "Dansk, engelsk",
      parallax_quote: "Sæt tempoet ned, træk vejret, og find balancen.",
      reviews_eyebrow: "Feedback fra partnere", reviews_heading: "Med deres egne ord", reviews_line: "anbefaler · baseret på 32 anmeldelser på Facebook",
      review_q1: "Super skøn weekend med søde og imødekommende mennesker. Det hele var virkelig godt organiseret og gennemtænkt. Afslappet stemning, men seriøse vandreture. Min krop er øm, men mit hoved er helt frisk og fyldt med ny energi. Jeg glæder mig allerede til næste mulighed for at tage med denne gruppe!",
      review_q2: "Det var anden gang, jeg var på vandretur med Rebalance. At sige, at jeg nød det, er næsten en underdrivelse. Begge ture har været helt særlige, anderledes og uforglemmelige. Mit hoved blev nulstillet, og min krop viste mig, hvad jeg kan. Naturen er fantastisk i sig selv, men sammen med arrangørerne og en skøn gruppe, hvor der er plads til både samtaler, grin, stilhed og nye kropslige praksisser — blev det præcis det, jeg havde brug for.",
      review_q3: "En fantastisk oplevelse og en total genopladning efter vandreturen! Jeg er meget taknemmelig over for arrangørerne for den gode organisering og det dejlige fællesskab. Jeg var især vild med kombinationen af vandring, afspændingsøvelser og praksisser, der styrker det mentale velvære. Tiden sammen med spændende mennesker samt vores fælles frokoster og aftensmåltider gjorde oplevelsen helt fantastisk!",
      review_q4: "Turen var en fantastisk oplevelse og især værdifuld, hvis man går igennem en svær periode i livet. Den hjalp mig virkelig med at nulstille tankerne og se livet fra et nyt perspektiv. Jeg var især vild med Silent Walk, teceremonien og saunaen. Tusind tak til arrangørerne – I hjalp mig med at finde en ny ro og et nyt perspektiv. Tak, piger!",
      review_author: "Rebalance-deltager",
      cta_heading: "Klar til at komme med ud i naturen?",
      cta_text: "Book en guidet vandring, reservér en plads på et retreat, eller start med en 1:1-session. Antallet af pladser er begrænset, så grupperne forbliver små.",
      footer_tagline: "Guidede trivselsvandringer & naturretreats i Skandinavien og Alperne.",
      footer_explore: "Udforsk", footer_getintouch: "Kontakt", footer_made: "Skabt med omtanke for naturen 🌲",
      footer_blurb: "Kropsorienteret terapi og arbejde med nervesystemet — et roligt, trygt rum til at sætte tempoet ned og finde tilbage til dig selv.",
      footer_rights: "Alle rettigheder forbeholdes.", label_email: "E-mail", label_phone: "Telefon", label_location: "Placering",
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
      booking_loading: "Henter ledige tider…",
      booking_pick_time: "Vælg et tidspunkt",
      booking_none: "Alle kommende sessioner er i øjeblikket fuldt booket.",
      booking_full_title: "Fuldt booket",
      booking_contact_intro: "Kontakt os, så hjælper Tanya dig med at finde et tidspunkt:",
      booking_seats_left: "{n} pladser tilbage", booking_seats_left_one: "1 plads tilbage",
      booking_back: "← Tilbage",
      booking_your_details: "Dine oplysninger",
      booking_name: "Navn", booking_email: "E-mail", booking_phone: "Telefon",
      booking_confirm: "Bekræft booking", booking_sending: "Booker…",
      booking_fill_all: "Udfyld venligst alle felter.",
      booking_bad_email: "Indtast venligst en gyldig e-mailadresse.",
      booking_bad_phone: "Indtast venligst et gyldigt telefonnummer.",
      booking_full: "Beklager, den tid blev lige fyldt op. Vælg venligst en anden.",
      booking_error: "Noget gik galt. Prøv igen.",
      booking_confirmed_title: "Du er booket 🌿",
      booking_confirmed_text: "Din session {when} er bekræftet. Tjek din e-mail for detaljer og et link til at afmelde.",
      enquiry_title: "Anmod om en session",
      enquiry_first: "Fornavn", enquiry_last: "Efternavn", enquiry_message: "Besked (valgfri)",
      enquiry_send: "Send anmodning", enquiry_sending: "Sender…",
      enquiry_sent_title: "Tak — din besked er på vej 🌿",
      enquiry_sent_text: "Tanya vender tilbage til dig via e-mail snart.",
      cancel_heading: "Afmeld booking",
      cancel_checking: "Afmelder…",
      cancel_done: "Din booking er afmeldt. Din plads er nu ledig igen.",
      cancel_toolate: "Denne booking kan ikke længere afmeldes online — der er mindre end 24 timer til sessionen. Kontakt os venligst direkte.",
      cancel_notfound: "Vi kunne ikke finde den booking.",
      cancel_already: "Denne booking er allerede afmeldt.",
      cancel_error: "Noget gik galt. Prøv igen eller kontakt os.",
      cancel_missing: "Ugyldigt afmeldingslink.",
      page_title_home: "Re-balance — Kropsorienteret terapi i København",
      page_title_gallery: "Galleri — Re-balance",
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
