/* =============================================================================
   REBALANCE — UI localization (English / Danish / Ukrainian)
   -----------------------------------------------------------------------------
   This localizes the site's own UI text (nav, headings, buttons, copy).
   It does NOT touch CMS content (session/gallery titles, descriptions) — that
   stays in whatever language it was entered in Sanity.

   Engine:
   • elements with  data-i18n="key"       -> textContent set from the dictionary
   • elements with  data-i18n-html="key"  -> innerHTML set (for copy with <strong> etc.)
   • buttons with   data-lang="en|da|uk"  -> language switcher
   • t("key") is available to main.js for JS-generated labels.
   Translations of the longer sentences are a first pass — worth a native review.
   ========================================================================== */
(function () {
  var STR = {
    en: {
      nav_sessions: "Sessions", nav_gallery: "Gallery", nav_about: "About", nav_book: "Book",
      hero_badge: "🌸 Gentle group & personal therapy · Denmark",
      hero_tagline: "Room to slow down, feel held, and rebalance.",
      hero_intro: "Group and 1:1 therapy with Tanya Basse — a calm, caring space to breathe, be heard, and find your balance again.",
      hero_book_session: "Book a session", hero_free_call: "Free intro call",
      moments_eyebrow: "A glimpse", moments_heading: "A soft, safe space",
      sessions_eyebrow: "Work with Tanya", sessions_heading: "Sessions & therapy",
      sessions_intro: "Tanya Basse offers group and personal therapy. Choose what feels right, pick a time that suits you, and pay securely — online or in person.",
      sessions_note: "Sessions are confidential and tailored to you. They support wellbeing and are not a substitute for emergency or acute medical care — if you are in crisis, contact your local emergency services.",
      cat_group: "Group therapy", cat_personal: "Personal therapy", cat_other: "Other",
      book_time: "Book a time", book_free_call: "Book free call", pay_online: "Pay online", buy: "Buy", get_started: "Get started", enquire: "Enquire",
      about_eyebrow: "About", about_heading: "A calm space to rebalance",
      about_p1: "Rebalance is led by <strong>Tanya Basse</strong>, a therapist offering group and personal therapy. Through gentle, body-aware work she helps you slow down, soften what feels tense, and reconnect with yourself.",
      about_p2: "Group sessions welcome all; 1:1 therapy is available online or in person, in several languages.",
      langs_display: "Danish, English",
      reviews_eyebrow: "Kind words", reviews_line: "recommend · based on 24 reviews",
      review_q1: "Add a real client review here. Tanya held such a gentle, safe space — I finally felt able to breathe.",
      review_q2: "Replace with a testimonial from someone you've worked with — the calm, the care, the change afterwards.",
      review_q3: "A third short quote fits nicely here. Keep them to a couple of warm sentences.",
      review_author: "Client review",
      cta_heading: "Ready to give yourself this time?",
      cta_text: "Book a session, join a group, or start with a free intro call. Spaces are kept small and gentle.",
      footer_tagline: "Gentle group & personal therapy with Tanya Basse.",
      footer_explore: "Explore", footer_getintouch: "Get in touch", footer_made: "Made with care 🌸",
      footer_rights: "All rights reserved.", label_email: "Email",
      gallery_back_home: "← Back home", gallery_heading: "Gallery",
      gallery_intro: "A few quiet moments. Open a folder to explore.",
      gallery_more: "More",
      folder_back: "← All folders",
      folder_intro: "Tap any photo to enlarge.",
      gallery_cta_heading: "Like the feel of it?",
      gallery_cta_text: "Come and experience it for yourself — book a session or a free intro call with Tanya.",
      modal_title: "Request a time",
      modal_text: "Online booking is being set up. In the meantime, send an enquiry and we'll get back to you with times and details.",
      modal_email: "Email us",
      modal_hint: "Tip: add a Cal.com or Calendly link to this session in the CMS to embed a live calendar here.",
      page_title_home: "Rebalance — gentle group & personal therapy with Tanya Basse",
      page_title_gallery: "Gallery — Rebalance",
      booked: "✓ Booked",
      paid_thanks: "Thanks — your test booking is confirmed.",
    },
    da: {
      nav_sessions: "Sessioner", nav_gallery: "Galleri", nav_about: "Om mig", nav_book: "Book",
      hero_badge: "🌸 Blid gruppe- & individuel terapi · Danmark",
      hero_tagline: "Plads til at sætte tempoet ned, blive mødt og finde balancen igen.",
      hero_intro: "Gruppe- og individuel terapi med Tanya Basse — et roligt, omsorgsfuldt rum til at trække vejret, blive hørt og finde din balance igen.",
      hero_book_session: "Book en session", hero_free_call: "Gratis introsamtale",
      moments_eyebrow: "Et glimt", moments_heading: "Et blødt, trygt rum",
      sessions_eyebrow: "Arbejd med Tanya", sessions_heading: "Sessioner & terapi",
      sessions_intro: "Tanya Basse tilbyder gruppe- og individuel terapi. Vælg det, der føles rigtigt, find et tidspunkt, der passer dig, og betal sikkert — online eller fysisk.",
      sessions_note: "Sessionerne er fortrolige og tilpasset dig. De understøtter trivsel og er ikke en erstatning for akut lægehjælp — er du i krise, så kontakt de lokale alarmtjenester.",
      cat_group: "Gruppeterapi", cat_personal: "Individuel terapi", cat_other: "Andet",
      book_time: "Book et tidspunkt", book_free_call: "Book gratis samtale", pay_online: "Betal online", buy: "Køb", get_started: "Kom i gang", enquire: "Forespørg",
      about_eyebrow: "Om mig", about_heading: "Et roligt rum til at finde balancen",
      about_p1: "Rebalance ledes af <strong>Tanya Basse</strong>, terapeut med gruppe- og individuel terapi. Gennem blidt, kropsbevidst arbejde hjælper hun dig med at sætte tempoet ned, løsne det, der spænder, og finde tilbage til dig selv.",
      about_p2: "Gruppesessioner er for alle; individuel terapi tilbydes online eller fysisk, på flere sprog.",
      langs_display: "Dansk, engelsk",
      reviews_eyebrow: "Pæne ord", reviews_line: "anbefaler · baseret på 24 anmeldelser",
      review_q1: "Tilføj en rigtig klientanmeldelse her. Tanya skabte et så blidt, trygt rum — jeg kunne endelig trække vejret.",
      review_q2: "Erstat med en udtalelse fra en, du har arbejdet med — roen, omsorgen, forandringen bagefter.",
      review_q3: "Et tredje kort citat passer fint her. Hold dem til et par varme sætninger.",
      review_author: "Klientanmeldelse",
      cta_heading: "Klar til at give dig selv denne tid?",
      cta_text: "Book en session, deltag i en gruppe, eller start med en gratis introsamtale. Der er få, rolige pladser.",
      footer_tagline: "Blid gruppe- & individuel terapi med Tanya Basse.",
      footer_explore: "Udforsk", footer_getintouch: "Kontakt", footer_made: "Skabt med omsorg 🌸",
      footer_rights: "Alle rettigheder forbeholdes.", label_email: "E-mail",
      gallery_back_home: "← Tilbage til forsiden", gallery_heading: "Galleri",
      gallery_intro: "Et par stille øjeblikke. Åbn en mappe for at se mere.",
      gallery_more: "Mere",
      folder_back: "← Alle mapper",
      folder_intro: "Tryk på et billede for at forstørre.",
      gallery_cta_heading: "Kan du lide stemningen?",
      gallery_cta_text: "Kom og oplev det selv — book en session eller en gratis introsamtale med Tanya.",
      modal_title: "Anmod om et tidspunkt",
      modal_text: "Online-booking er ved at blive sat op. Indtil da kan du sende en forespørgsel, så vender vi tilbage med tidspunkter og detaljer.",
      modal_email: "Skriv til os",
      modal_hint: "Tip: tilføj et Cal.com- eller Calendly-link til denne session i CMS'et for at indlejre en live-kalender her.",
      page_title_home: "Rebalance — blid gruppe- & individuel terapi med Tanya Basse",
      page_title_gallery: "Galleri — Rebalance",
      booked: "✓ Booket",
      paid_thanks: "Tak — din test-booking er bekræftet.",
    },
    uk: {
      nav_sessions: "Сесії", nav_gallery: "Галерея", nav_about: "Про мене", nav_book: "Бронювати",
      hero_badge: "🌸 Дбайлива групова та індивідуальна терапія · Данія",
      hero_tagline: "Простір, щоб сповільнитися, відчути підтримку й віднайти баланс.",
      hero_intro: "Групова та індивідуальна терапія з Танею Бассе — спокійний, турботливий простір, щоб дихати, бути почутою та віднайти свій баланс.",
      hero_book_session: "Забронювати сесію", hero_free_call: "Безкоштовний дзвінок",
      moments_eyebrow: "Погляд", moments_heading: "М’який, безпечний простір",
      sessions_eyebrow: "Працювати з Танею", sessions_heading: "Сесії та терапія",
      sessions_intro: "Таня Бассе проводить групову та індивідуальну терапію. Оберіть те, що відгукується, зручний час і сплатіть онлайн або особисто.",
      sessions_note: "Сесії конфіденційні та підлаштовані під вас. Вони підтримують добробут, але не замінюють невідкладної медичної допомоги — у разі кризи звертайтеся до місцевих екстрених служб.",
      cat_group: "Групова терапія", cat_personal: "Індивідуальна терапія", cat_other: "Інше",
      book_time: "Обрати час", book_free_call: "Безкоштовний дзвінок", pay_online: "Оплатити онлайн", buy: "Купити", get_started: "Почати", enquire: "Запитати",
      about_eyebrow: "Про мене", about_heading: "Спокійний простір, щоб віднайти баланс",
      about_p1: "Rebalance веде <strong>Таня Бассе</strong> — терапевтка, яка проводить групову та індивідуальну терапію. Через дбайливу, тілесно-орієнтовану роботу вона допомагає сповільнитися, відпустити напруження й повернутися до себе.",
      about_p2: "Групові сесії — для всіх; індивідуальна терапія доступна онлайн або особисто, кількома мовами.",
      langs_display: "Данська, англійська",
      reviews_eyebrow: "Добрі слова", reviews_line: "рекомендують · на основі 24 відгуків",
      review_q1: "Додайте справжній відгук клієнта тут. Таня створила такий дбайливий, безпечний простір — я нарешті змогла дихати.",
      review_q2: "Замініть на відгук від когось, з ким ви працювали — спокій, турбота, зміни після.",
      review_q3: "Тут добре пасуватиме третя коротка цитата. Кілька теплих речень — і досить.",
      review_author: "Відгук клієнта",
      cta_heading: "Готові подарувати собі цей час?",
      cta_text: "Забронюйте сесію, приєднайтеся до групи або почніть з безкоштовного дзвінка. Місць небагато й вони спокійні.",
      footer_tagline: "Дбайлива групова та індивідуальна терапія з Танею Бассе.",
      footer_explore: "Огляд", footer_getintouch: "Контакти", footer_made: "Зроблено з турботою 🌸",
      footer_rights: "Усі права захищено.", label_email: "Пошта",
      gallery_back_home: "← На головну", gallery_heading: "Галерея",
      gallery_intro: "Кілька тихих митей. Відкрийте теку, щоб переглянути.",
      gallery_more: "Інше",
      folder_back: "← Усі теки",
      folder_intro: "Торкніться фото, щоб збільшити.",
      gallery_cta_heading: "Подобається атмосфера?",
      gallery_cta_text: "Завітайте й відчуйте це самі — забронюйте сесію або безкоштовний дзвінок з Танею.",
      modal_title: "Запит на час",
      modal_text: "Онлайн-бронювання ще налаштовується. А поки надішліть запит, і ми повернемося до вас із часом і деталями.",
      modal_email: "Напишіть нам",
      modal_hint: "Порада: додайте посилання Cal.com або Calendly до цієї сесії в CMS, щоб вбудувати живий календар тут.",
      page_title_home: "Rebalance — дбайлива групова та індивідуальна терапія з Танею Бассе",
      page_title_gallery: "Галерея — Rebalance",
      booked: "✓ Заброньовано",
      paid_thanks: "Дякуємо — вашу тестову бронь підтверджено.",
    },
  };

  function pickInitial() {
    try { var s = localStorage.getItem("rebalance_lang"); if (s && STR[s]) return s; } catch (e) {}
    var n = (navigator.language || "en").slice(0, 2).toLowerCase();
    return STR[n] ? n : "en";
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
    try { localStorage.setItem("rebalance_lang", loc); } catch (e) {}
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
