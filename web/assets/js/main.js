/* Rebalance — site behaviour. No build step, no dependencies. */
(function () {
  "use strict";

  var CFG = window.SITE_CONFIG || {};

  /* ---------- helpers ------------------------------------------------------ */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") node.className = attrs[k];
      else if (k === "html") node.innerHTML = attrs[k];
      else if (k === "text") node.textContent = attrs[k];
      else if (k in node && k !== "list") { try { node[k] = attrs[k]; } catch (e) { node.setAttribute(k, attrs[k]); } }
      else node.setAttribute(k, attrs[k]);
    });
    (children || []).forEach(function (c) { if (c) node.appendChild(typeof c === "string" ? document.createTextNode(c) : c); });
    return node;
  }
  function escapeHtml(s) {
    return String(s).replace(/[<>&]/g, function (c) { return { "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]; });
  }
  function slugify(s) { return String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""); }
  // pick the active language from a localized {en,da,uk} value; fall back to en.
  // legacy plain strings/numbers pass through unchanged.
  function loc(v) {
    if (v == null) return v;
    if (Array.isArray(v)) return v;
    if (typeof v === "object") {
      var L = window.getLocale ? window.getLocale() : "en";
      var ok = function (x) { return x != null && !(typeof x === "string" && x.trim() === "") && !(Array.isArray(x) && x.length === 0); };
      if (ok(v[L])) return v[L];
      if (ok(v.en)) return v.en;
      var ks = ["en", "da"]; for (var i = 0; i < ks.length; i++) if (ok(v[ks[i]])) return v[ks[i]];
      return v.en != null ? v.en : "";
    }
    return v;
  }
  function eventHref(t) { return "event.html?id=" + encodeURIComponent(t._id || slugify(loc(t.title))); }
  function localeImg(item, field) {
    var L = window.getLocale ? window.getLocale() : "en";
    var sfx = L === "da" ? "Da" : "En";
    return item[field + sfx] || item[field] || "";
  }
  // remember a paid booking client-side. Test/demo only — not server-verified;
  // a real one-time-purchase guard needs accounts + a Stripe webhook.
  function isPaid(id) { try { return !!id && localStorage.getItem("ttt_paid_" + id) === "1"; } catch (e) { return false; } }
  function markPaidFromUrl() {
    var p = new URLSearchParams(location.search).get("paid");
    if (!p) return null;
    try { localStorage.setItem("ttt_paid_" + p, "1"); } catch (e) {}
    history.replaceState(null, "", location.pathname + location.hash); // drop ?paid
    return p;
  }
  function bookedBtn() { return el("span", { class: "btn btn--booked", "data-i18n": "booked", text: tr("booked") }); }
  function escapeXml(s) {
    return String(s).replace(/[<>&'"]/g, function (c) {
      return { "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" }[c];
    });
  }

  /* Generate a tasteful SVG placeholder (data URI) when no photo is set. */
  function placeholder(label, hue) {
    hue = hue == null ? 150 : hue;
    var svg =
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">' +
        '<defs><linearGradient id="g" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0" stop-color="hsl(' + hue + ',42%,72%)"/>' +
          '<stop offset="1" stop-color="hsl(' + (hue + 18) + ',38%,42%)"/>' +
        '</linearGradient></defs>' +
        '<rect width="800" height="600" fill="url(#g)"/>' +
        '<circle cx="610" cy="150" r="60" fill="#fff" opacity="0.28"/>' +
        '<path d="M0 430 L150 250 L290 400 L430 210 L600 410 L720 320 L800 380 L800 600 L0 600 Z" fill="hsl(' + (hue + 12) + ',40%,30%)" opacity="0.55"/>' +
        '<path d="M-20 470 L230 220 L470 470 Z" fill="hsl(' + (hue + 14) + ',42%,26%)"/>' +
        '<path d="M230 220 L292 296 L262 312 L230 282 L198 312 L168 296 Z" fill="#f3f6f1" opacity="0.9"/>' +
        '<text x="40" y="545" fill="#fff" font-family="Georgia, serif" font-size="34" opacity="0.96">' + escapeXml(label || "") + '</text>' +
        '<text x="40" y="62" fill="#fff" font-family="Arial, sans-serif" font-size="20" opacity="0.8">Add your photo</text>' +
      '</svg>';
    return "data:image/svg+xml," + encodeURIComponent(svg);
  }
  function imgFor(item) {
    return (item && (item.src || item.image)) ? (item.src || item.image) : placeholder(item.label || item.title, item.hue);
  }
  /* <img> that falls back to a styled placeholder if the file is missing. */
  function makeImg(item, alt) {
    var ph = placeholder(item.label || item.title, item.hue);
    var img = el("img", { alt: alt || item.label || item.title || "", loading: "lazy" });
    img.addEventListener("error", function () { if (img.getAttribute("src") !== ph) img.src = ph; });
    img.src = (item.src || item.image) || ph;
    return img;
  }
  function tr(key) { return (window.t ? window.t(key) : key); }
  function btnLink(key, href, solid) {
    return el("a", { class: "btn " + (solid ? "btn--solid" : "btn--ghost"), href: href, target: "_blank", rel: "noopener", "data-i18n": key, text: tr(key) });
  }
  function btnBook(key, schedulerUrl, solid) {
    return el("button", { class: "btn " + (solid ? "btn--solid" : "btn--ghost"), type: "button", "data-book": "1", "data-scheduler": schedulerUrl || "", "data-i18n": key, text: tr(key) });
  }

  /* ---------- brand text / links ------------------------------------------- */
  function applyBrand() {
    var b = CFG.brand || {};
    $all("[data-brand-name]").forEach(function (n) { n.textContent = b.name || "Rebalance"; });
    $all("[data-brand-tagline]").forEach(function (n) { n.textContent = b.tagline || ""; });
    $all("[data-brand-intro]").forEach(function (n) { n.textContent = b.intro || ""; });
    $all("[data-link-instagram]").forEach(function (n) { if (b.instagram) n.href = b.instagram; });
    $all("[data-link-facebook]").forEach(function (n) { if (b.facebook) { n.href = b.facebook; } else { n.style.display = "none"; } });
    $all("[data-link-telegram]").forEach(function (n) { if (b.telegram) { n.href = b.telegram; } else { n.style.display = "none"; } });
    var waNum = String(b.whatsapp || "").replace(/[^\d]/g, "");
    $all("[data-link-whatsapp]").forEach(function (n) {
      if (waNum) { n.href = "https://wa.me/" + waNum; } else { n.style.display = "none"; }
    });
    if (!waNum) $all("[data-wa-line]").forEach(function (n) { n.style.display = "none"; });
    $all("[data-link-email]").forEach(function (n) { if (b.email) n.href = "mailto:" + b.email; });
    $all("[data-brand-email]").forEach(function (n) { n.textContent = b.email || ""; });
    $all("[data-link-phone]").forEach(function (n) { if (b.phone) { n.href = "tel:" + b.phone.replace(/[^\d+]/g, ""); } });
    $all("[data-brand-phone]").forEach(function (n) { n.textContent = b.phone || ""; });
    $all("[data-brand-location]").forEach(function (n) { if (b.location) { n.textContent = b.location; } else { n.style.display = "none"; } });
    $all("[data-map-link]").forEach(function (n) { if (b.location) { n.href = "https://www.google.com/maps/search/?api=1&query=" + encodeURIComponent(b.location); } });
    $all("[data-brand-cvr]").forEach(function (n) { if (b.cvr) { n.textContent = "CVR " + b.cvr; } else { n.style.display = "none"; } });
    $all("[data-year]").forEach(function (n) { n.textContent = String(new Date().getFullYear()); });
    if ((CFG.locations || []).length) $all("[data-locations]").forEach(function (n) { n.textContent = CFG.locations.join(" · "); });
    if ((CFG.languages || []).length) $all("[data-languages]").forEach(function (n) { n.textContent = CFG.languages.join(", "); });
    if (CFG.sessionsNote) $all("[data-sessions-note]").forEach(function (n) { n.textContent = CFG.sessionsNote; });
    if (CFG.groupSessionsNote) $all("[data-group-sessions-note]").forEach(function (n) { n.textContent = CFG.groupSessionsNote; });
    var r = CFG.reviews || {};
    $all("[data-review-score]").forEach(function (n) { n.textContent = r.score || ""; });
    $all("[data-review-count]").forEach(function (n) { n.textContent = r.count != null ? r.count : ""; });
  }

  /* ---------- events (group hikes / retreats you BUY) ---------------------- */
  function fmtShortDate(dateStr) {
    if (!dateStr) return "";
    var jsLoc = window.getLocale() === "ua" ? "uk" : (window.getLocale() === "da" ? "da" : "en");
    return new Date(dateStr + "T12:00:00").toLocaleDateString(jsLoc, { day: "numeric", month: "short" });
  }
  function fmtDateRange(start, end) {
    if (!start) return "";
    var jsLoc = window.getLocale() === "ua" ? "uk" : (window.getLocale() === "da" ? "da" : "en");
    var d1 = new Date(start + "T12:00:00");
    var opts = { day: "numeric", month: "short", year: "numeric" };
    if (!end) return d1.toLocaleDateString(jsLoc, opts);
    var d2 = new Date(end + "T12:00:00");
    if (d1.getMonth() === d2.getMonth() && d1.getFullYear() === d2.getFullYear())
      return d1.getDate() + "–" + d2.toLocaleDateString(jsLoc, opts);
    return fmtShortDate(start) + "–" + d2.toLocaleDateString(jsLoc, opts);
  }
  function fmtDays(start, end) {
    if (!start || !end) return "";
    var n = Math.round((new Date(end + "T12:00:00") - new Date(start + "T12:00:00")) / 86400000) + 1;
    if (n < 2) return "";
    var jsLoc = window.getLocale() === "ua" ? "uk" : (window.getLocale() === "da" ? "da" : "en");
    var forms = { en: { one: "day", other: "days" }, da: { one: "dag", other: "dage" }, uk: { one: "день", few: "дні", many: "днів", other: "дні" } };
    var f = forms[jsLoc] || forms.en;
    try { var rule = new Intl.PluralRules(jsLoc).select(n); return n + " " + (f[rule] || f.other); } catch (e) { return n + " days"; }
  }
  function buildPriceBadge(t) {
    var reg = t.regularPrice, early = t.earlyBirdPrice, until = t.earlyBirdUntil;
    if (!reg) return null;
    var jsLoc = window.getLocale() === "ua" ? "uk" : (window.getLocale() === "da" ? "da" : "en");
    var text = reg.toLocaleString(jsLoc) + " DKK";
    if (early) {
      text += ", EarlyBird: " + early.toLocaleString(jsLoc) + " DKK";
      if (until) text += " " + tr("until_date") + " " + fmtShortDate(until);
    }
    return el("span", { class: "card__price", text: text });
  }

  function renderEvents() {
    var wrap = $("#events-grid");
    if (!wrap) return;
    var list = CFG.events || CFG.trips || [];
    wrap.innerHTML = "";
    list.forEach(function (t) {
      var href = eventHref(t), title = loc(t.title);
      var dateStr = fmtDateRange(t.startDate, t.endDate);
      var actions = isPaid(t._id)
        ? el("div", { class: "card__actions" }, [bookedBtn()])
        : t.active === false
          ? el("div", { class: "card__actions" }, [btnBook("enquire", "", true)])
          : el("div", { class: "card__actions" }, [
              t.stripeUrl ? btnLink("book_pay", t.stripeUrl, true) : btnBook("enquire", "", true),
            ]);
      var card = el("article", { class: "card reveal" }, [
        el("div", { class: "card__media" }, [
          el("a", { href: href, "aria-label": title }, [makeImg({ src: localeImg(t, "image"), label: title, hue: t.hue }, title)]),
          buildPriceBadge(t),
        ]),
        el("div", { class: "card__body" }, [
          el("h3", { class: "card__title" }, [el("a", { href: href, text: title })]),
          el("p", { class: "card__meta", html:
            (loc(t.location) ? '<a class="meta-loc" href="https://maps.google.com/?q=' + encodeURIComponent(loc(t.location)) + '" target="_blank" rel="noopener">📍 ' + escapeHtml(loc(t.location)) + '</a>' : "") +
            (dateStr ? '<span>🗓 ' + escapeHtml(dateStr) + '</span>' : "") +
            (fmtDays(t.startDate, t.endDate) ? '<span>⏱ ' + escapeHtml(fmtDays(t.startDate, t.endDate)) + '</span>' : "") }),
          el("p", { class: "card__blurb", text: loc(t.blurb) || "" }),
          el("a", { class: "card__more", href: href, "data-i18n": "view_details", text: tr("view_details") }),
          actions,
        ]),
      ]);
      wrap.appendChild(card);
    });
  }

  /* ---------- sessions (1:1 with Tanya — incl. therapy — you BOOK) --------- */
  function renderSessionsInto(wrap, list) {
    if (!wrap) return;
    wrap.innerHTML = "";
    list.forEach(function (s) {
      var price = loc(s.price), time = loc(s.time);
      var metaText = [time, price].filter(Boolean).join(" · "); // e.g. "60 min · 850 DKK"
      // one BOOK action per card. group session -> slot picker; personal -> enquiry form.
      var action = btnBook("hero_book_session", "", true);
      action.classList.add("btn--book");
      action.setAttribute("data-mode", s.groupBooking ? "group" : "enquiry");
      action.setAttribute("data-session", loc(s.title) || "");
      // rich text (Portable Text) or plain-text fallback
      var descEl = el("div", { class: "session-card__desc" });
      var d = loc(s.description);
      if (Array.isArray(d) && d.length) descEl.innerHTML = ptToHtml(d);
      else if (typeof d === "string" && d.trim()) d.split(/\n{2,}/).forEach(function (p) { if (p.trim()) descEl.appendChild(el("p", { text: p.trim() })); });
      var body = el("div", { class: "session-card__body" }, [
        el("h3", { class: "session-card__title", text: loc(s.title) }),
        metaText ? el("p", { class: "session-card__meta", text: metaText }) : null,
        descEl,
      ]);
      var card = el("article", { class: "session-card reveal" }, [
        body,
        el("div", { class: "session-card__action" }, [action]),
      ]);
      // mobile: description is clamped with a Read more / Show less toggle
      if (descEl.childNodes.length) {
        var toggle = el("button", { class: "session-card__toggle", type: "button", text: tr("read_more") });
        toggle.addEventListener("click", function () {
          var open = card.classList.toggle("is-open");
          toggle.textContent = open ? tr("read_less") : tr("read_more");
        });
        body.appendChild(toggle);
      }
      wrap.appendChild(card);
    });
  }
  function renderSessions() { renderSessionsInto($("#sessions-grid"), CFG.sessions || []); }
  function renderGroupSessions() { renderSessionsInto($("#group-sessions-grid"), CFG.groupSessions || []); }

  /* ---------- gallery ------------------------------------------------------ */
  var galleryItems = [];
  function galleryTile(g, index) {
    var media;
    if (g.video) {
      // inline muted looping preview; click opens the lightbox with sound + controls
      media = el("video", { class: "tile__video", autoplay: true, loop: true, playsinline: true, preload: "metadata" });
      media.muted = true; media.defaultMuted = true; // required for autoplay
      if (g.src) media.poster = g.src;
      media.src = g.video;
    } else {
      media = makeImg(g, g.label);
    }
    var children = [media, el("span", { class: "tile__cap", text: g.label })];
    if (g.video) children.push(el("span", { class: "tile__badge", "aria-hidden": "true" }));
    var fig = el("button", {
      class: "tile reveal" + (g.video ? " tile--video" : ""), type: "button",
      "aria-label": (g.video ? "Play video: " : "Open photo: ") + g.label,
    }, children);
    fig.addEventListener("click", function () { openLightbox(index); });
    return fig;
  }
  function galleryItemsFromCfg() {
    return (CFG.gallery || []).map(function (g, i) {
      return { src: g.src, video: g.video, label: loc(g.label) || ("Photo " + (i + 1)), hue: g.hue, groupId: g.groupId };
    });
  }
  function folderTile(id, name, imgs) {
    var cover = imgs[0] || { label: name };
    return el("a", { class: "folder-tile reveal", href: "folder.html?id=" + encodeURIComponent(id), "aria-label": name }, [
      makeImg(cover, name),
      el("div", { class: "folder-tile__bar" }, [
        el("span", { class: "folder-tile__name", text: name }),
        el("span", { class: "folder-tile__count", text: "📷 " + imgs.length }),
      ]),
    ]);
  }
  // home mosaic (flat featured) + gallery page (one tile per folder)
  function renderGallery() {
    var flat = $("#gallery-grid");
    var folders = $("#gallery-folders");
    var items = galleryItemsFromCfg();
    if (flat) {
      flat.innerHTML = "";
      var limit = parseInt(flat.getAttribute("data-limit") || "0", 10);
      galleryItems = limit > 0 ? items.slice(0, limit) : items;
      galleryItems.forEach(function (g, i) { flat.appendChild(galleryTile(g, i)); });
    }
    if (folders) {
      folders.innerHTML = "";
      var groups = (CFG.galleryGroups || []);
      var known = {};
      groups.forEach(function (grp) {
        known[grp._id] = 1;
        folders.appendChild(folderTile(grp._id, loc(grp.title) || "", items.filter(function (g) { return g.groupId === grp._id; })));
      });
      var rest = items.filter(function (g) { return !g.groupId || !known[g.groupId]; });
      if (rest.length) folders.appendChild(folderTile("__ungrouped", tr("gallery_more"), rest));
    }
  }
  // folder page (folder.html?id=…): one folder's photos, with lightbox
  function renderFolder() {
    var grid = $("#folder-grid");
    if (!grid) return;
    var id = (new URLSearchParams(location.search)).get("id");
    var groups = (CFG.galleryGroups || []);
    var known = {}; groups.forEach(function (g) { known[g._id] = 1; });
    var items = galleryItemsFromCfg();
    var grp = groups.filter(function (g) { return g._id === id; })[0];
    var imgs, title;
    if (id === "__ungrouped") {
      imgs = items.filter(function (g) { return !g.groupId || !known[g.groupId]; });
      title = tr("gallery_more");
    } else {
      imgs = items.filter(function (g) { return g.groupId === id; });
      title = grp ? (loc(grp.title) || "") : "";
    }
    var titleEl = $("#folder-title");
    if (titleEl) titleEl.textContent = title || tr("nav_gallery");
    document.title = (title || "Gallery") + " — Re-balance";
    grid.innerHTML = "";
    galleryItems = imgs;
    galleryItems.forEach(function (g, i) { grid.appendChild(galleryTile(g, i)); });
  }

  /* ---------- lightbox (photos + video player) ----------------------------- */
  var lb, lbImg, lbVideo, lbCap, lbIndex = 0;
  function ensureLightbox() {
    if (lb) return;
    lb = el("div", { class: "lightbox", "aria-hidden": "true", role: "dialog", "aria-modal": "true" }, [
      el("button", { class: "lightbox__close", type: "button", "aria-label": "Close", html: "&times;" }),
      el("button", { class: "lightbox__nav lightbox__nav--prev", type: "button", "aria-label": "Previous", html: "&#8249;" }),
      (function () { lbImg = el("img", { class: "lightbox__img", alt: "" }); return lbImg; })(),
      (function () { lbVideo = el("video", { class: "lightbox__video", controls: true, playsinline: true, preload: "metadata" }); return lbVideo; })(),
      (function () { lbCap = el("p", { class: "lightbox__cap" }); return lbCap; })(),
      el("button", { class: "lightbox__nav lightbox__nav--next", type: "button", "aria-label": "Next", html: "&#8250;" }),
    ]);
    document.body.appendChild(lb);
    lbImg.addEventListener("error", function () { var g = galleryItems[lbIndex] || {}; var ph = placeholder(g.label, g.hue); if (lbImg.getAttribute("src") !== ph) lbImg.src = ph; });
    $(".lightbox__close", lb).addEventListener("click", closeLightbox);
    $(".lightbox__nav--prev", lb).addEventListener("click", function () { step(-1); });
    $(".lightbox__nav--next", lb).addEventListener("click", function () { step(1); });
    lb.addEventListener("click", function (e) { if (e.target === lb) closeLightbox(); });
  }
  function stopVideo() { if (lbVideo) { lbVideo.pause(); lbVideo.removeAttribute("src"); lbVideo.load(); } }
  function openLightbox(i) { ensureLightbox(); lbIndex = i; show(); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); }
  function show() {
    var g = galleryItems[lbIndex] || {};
    lbCap.textContent = g.label || "";
    if (g.video) {
      stopVideo();
      lbImg.style.display = "none";
      lbVideo.style.display = "";
      if (g.src) lbVideo.poster = g.src;
      lbVideo.src = g.video;
      lbVideo.play().catch(function () {}); // autoplay if the browser allows; controls are shown either way
    } else {
      stopVideo();
      lbVideo.style.display = "none";
      lbImg.style.display = "";
      lbImg.src = imgFor(g);
      lbImg.alt = g.label || "";
    }
  }
  function step(d) { lbIndex = (lbIndex + d + galleryItems.length) % galleryItems.length; show(); }
  function closeLightbox() { if (!lb) return; stopVideo(); lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }

  /* ---------- booking / scheduler modal ------------------------------------ */
  var modal, modalBody;
  function ensureModal() {
    if (modal) return;
    modal = el("div", { class: "modal", "aria-hidden": "true", role: "dialog", "aria-modal": "true", "aria-label": "Book" }, [
      el("div", { class: "modal__panel" }, [
        el("button", { class: "modal__close", type: "button", "aria-label": "Close", html: "&times;" }),
        (function () { modalBody = el("div", { class: "modal__body" }); return modalBody; })(),
      ]),
    ]);
    document.body.appendChild(modal);
    $(".modal__close", modal).addEventListener("click", closeModal);
    modal.addEventListener("click", function (e) { if (e.target === modal) closeModal(); });
  }
  /* our own group-session booking: slot picker -> form -> confirmation,
     backed by the Supabase Edge Functions (no third-party calendar). */
  function bookingCfg() { return CFG.booking || {}; }
  function bookingKey() { var c = bookingCfg(); return c.publishableKey || c.anonKey || ""; }
  function bookingApi(path, opts) {
    var cfg = bookingCfg();
    var key = bookingKey();
    var headers = { "content-type": "application/json" };
    if (key) { headers["apikey"] = key; headers["Authorization"] = "Bearer " + key; }
    return fetch(String(cfg.functionsBase || "").replace(/\/+$/, "") + path, {
      method: (opts && opts.method) || "GET",
      headers: headers,
      body: opts && opts.body ? JSON.stringify(opts.body) : undefined,
    }).then(function (r) { return r.json().then(function (j) { return { status: r.status, body: j }; }); });
  }
  function validEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e || ""); }
  function validPhone(p) { var d = (p || "").replace(/\D/g, ""); return /^[+\d\s()\-.]+$/.test(p || "") && d.length >= 6 && d.length <= 15; }
  // returns an i18n error key if invalid, else null
  function contactError(email, phone) {
    if (!validEmail(email)) return "booking_bad_email";
    if (!validPhone(phone)) return "booking_bad_phone";
    return null;
  }
  function fmtSlot(iso) {
    try {
      return new Intl.DateTimeFormat(window.getLocale && window.getLocale() === "da" ? "da-DK" : "en-GB", {
        timeZone: "Europe/Copenhagen", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
      }).format(new Date(iso));
    } catch (e) { return iso; }
  }
  function bookingMsg(html) { modalBody.innerHTML = '<div class="modal__msg">' + html + "</div>"; }
  function openModalShell() {
    ensureModal();
    modal.classList.remove("modal--wide");
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function openBooking() {
    openModalShell();
    if (!bookingCfg().functionsBase || !bookingKey()) { renderBookingFallback(); return; }
    bookingMsg('<p class="booking__loading">' + tr("booking_loading") + "</p>");
    bookingApi("/list-slots").then(function (res) {
      if (res.status !== 200 || !res.body || !res.body.slots) { renderBookingFallback(); return; }
      renderSlots(res.body.slots);
    }).catch(function () { renderBookingFallback(); });
  }
  function renderBookingFallback() {
    var email = (CFG.brand || {}).email || "";
    bookingMsg("<h3>" + tr("modal_title") + "</h3><p>" + tr("modal_text") + "</p>" +
      (email ? '<div class="modal__contacts"><a class="btn btn--solid" href="mailto:' + escapeHtml(email) + '?subject=Booking%20enquiry">' + tr("modal_email") + "</a></div>" : ""));
  }
  // contact options (email / phone / WhatsApp) for when a session is full
  function contactBlock() {
    var b = CFG.brand || {};
    var links = [];
    if (b.email) links.push(el("a", { class: "btn btn--solid btn--book-dark", href: "mailto:" + b.email, text: tr("modal_email") }));
    if (b.phone) links.push(el("a", { class: "btn btn--ghost", href: "tel:" + b.phone.replace(/[^\d+]/g, ""), text: b.phone }));
    var waNum = String(b.whatsapp || "").replace(/\D/g, "");
    if (waNum) links.push(el("a", { class: "btn btn--ghost", href: "https://wa.me/" + waNum, target: "_blank", rel: "noopener", text: "WhatsApp" }));
    return el("div", { class: "booking__contact" }, [
      el("p", { class: "booking__contact-intro", text: tr("booking_contact_intro") }),
      el("div", { class: "booking__contact-links" }, links),
    ]);
  }
  function renderNoAvailability() {
    modalBody.innerHTML = "";
    modalBody.appendChild(el("div", { class: "booking" }, [
      el("h3", { class: "booking__title", text: tr("booking_full_title") }),
      el("p", { class: "muted", text: tr("booking_none") }),
      contactBlock(),
    ]));
  }
  function renderSlots(slots) {
    modalBody.innerHTML = "";
    if (!slots.length) { renderNoAvailability(); return; }
    var wrap = el("div", { class: "booking" }, [el("h3", { class: "booking__title", text: tr("booking_pick_time") })]);
    var list = el("div", { class: "booking__slots" });
    slots.forEach(function (s) {
      var btn = el("button", { class: "booking__slot", type: "button" }, [
        el("span", { class: "booking__slot-when", text: fmtSlot(s.starts_at) }),
      ]);
      btn.addEventListener("click", function () { renderForm(s); });
      list.appendChild(btn);
    });
    wrap.appendChild(list);
    modalBody.appendChild(wrap);
  }
  function renderForm(slot) {
    modalBody.innerHTML = "";
    var wrap = el("div", { class: "booking" });
    var back = el("button", { class: "booking__back", type: "button", text: tr("booking_back") });
    back.addEventListener("click", openBooking);
    var form = el("form", { class: "booking__form" });
    function field(name, label, type) {
      return el("label", { class: "booking__field" }, [
        el("span", { text: label }),
        el("input", { name: name, type: type || "text", required: "required" }),
      ]);
    }
    var err = el("p", { class: "booking__error" });
    var submit = el("button", { class: "btn btn--solid btn--book-dark", type: "submit", text: tr("booking_confirm") });
    form.appendChild(field("name", tr("booking_name")));
    form.appendChild(field("email", tr("booking_email"), "email"));
    form.appendChild(field("phone", tr("booking_phone"), "tel"));
    form.appendChild(err);
    form.appendChild(submit);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.classList.remove("is-show");
      var data = { slot_id: slot.id, name: form.name.value.trim(), email: form.email.value.trim(), phone: form.phone.value.trim() };
      if (!data.name || !data.email || !data.phone) { err.textContent = tr("booking_fill_all"); err.classList.add("is-show"); return; }
      var ce = contactError(data.email, data.phone);
      if (ce) { err.textContent = tr(ce); err.classList.add("is-show"); return; }
      submit.disabled = true; submit.textContent = tr("booking_sending");
      bookingApi("/create-booking", { method: "POST", body: data }).then(function (res) {
        if (res.status === 200 && res.body && res.body.ok) { renderSuccess(slot); return; }
        // slot filled up (full or no longer bookable) -> show contact options
        if (res.body && res.body.error === "slot_full") { renderNoAvailability(); return; }
        submit.disabled = false; submit.textContent = tr("booking_confirm");
        err.textContent = tr("booking_error"); err.classList.add("is-show");
      }).catch(function () {
        submit.disabled = false; submit.textContent = tr("booking_confirm");
        err.textContent = tr("booking_error"); err.classList.add("is-show");
      });
    });
    wrap.appendChild(back);
    wrap.appendChild(el("h3", { class: "booking__title", text: tr("booking_your_details") }));
    wrap.appendChild(el("p", { class: "booking__chosen", text: fmtSlot(slot.starts_at) }));
    wrap.appendChild(form);
    modalBody.appendChild(wrap);
  }
  function renderSuccess(slot) {
    bookingMsg("<h3>" + tr("booking_confirmed_title") + "</h3><p>" +
      tr("booking_confirmed_text").replace("{when}", escapeHtml(fmtSlot(slot.starts_at))) + "</p>");
  }

  /* personal (1:1) session: an enquiry form emailed to Tanya */
  function openEnquiry(sessionTitle) {
    openModalShell();
    if (!bookingCfg().functionsBase || !bookingKey()) { renderBookingFallback(); return; }
    modalBody.innerHTML = "";
    var wrap = el("div", { class: "booking" });
    wrap.appendChild(el("h3", { class: "booking__title", text: tr("enquiry_title") }));
    if (sessionTitle) wrap.appendChild(el("p", { class: "booking__chosen", text: sessionTitle }));
    var form = el("form", { class: "booking__form" });
    function field(name, label, type) {
      return el("label", { class: "booking__field" }, [
        el("span", { text: label }),
        el("input", { name: name, type: type || "text", required: name !== "message" ? "required" : null }),
      ]);
    }
    var row = el("div", { class: "booking__row" }, [field("first", tr("enquiry_first")), field("last", tr("enquiry_last"))]);
    var msg = el("label", { class: "booking__field" }, [el("span", { text: tr("enquiry_message") }), el("textarea", { name: "message", rows: "4" })]);
    var err = el("p", { class: "booking__error" });
    var submit = el("button", { class: "btn btn--solid btn--book-dark", type: "submit", text: tr("enquiry_send") });
    form.appendChild(row);
    form.appendChild(field("email", tr("booking_email"), "email"));
    form.appendChild(field("phone", tr("booking_phone"), "tel"));
    form.appendChild(msg);
    form.appendChild(err);
    form.appendChild(submit);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      err.classList.remove("is-show");
      var data = {
        session: sessionTitle,
        firstName: form.first.value.trim(), lastName: form.last.value.trim(),
        email: form.email.value.trim(), phone: form.phone.value.trim(),
        message: form.message.value.trim(),
      };
      if (!data.firstName || !data.lastName || !data.email || !data.phone) { err.textContent = tr("booking_fill_all"); err.classList.add("is-show"); return; }
      var ce = contactError(data.email, data.phone);
      if (ce) { err.textContent = tr(ce); err.classList.add("is-show"); return; }
      submit.disabled = true; submit.textContent = tr("enquiry_sending");
      bookingApi("/create-enquiry", { method: "POST", body: data }).then(function (res) {
        if (res.status === 200 && res.body && res.body.ok) {
          bookingMsg("<h3>" + tr("enquiry_sent_title") + "</h3><p>" + tr("enquiry_sent_text") + "</p>");
          return;
        }
        submit.disabled = false; submit.textContent = tr("enquiry_send");
        err.textContent = tr("booking_error"); err.classList.add("is-show");
      }).catch(function () {
        submit.disabled = false; submit.textContent = tr("enquiry_send");
        err.textContent = tr("booking_error"); err.classList.add("is-show");
      });
    });
    wrap.appendChild(form);
    modalBody.appendChild(wrap);
  }

  function closeModal() { if (!modal) return; modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); modalBody.innerHTML = ""; }

  /* ---------- nav, buttons, keys, reveal ----------------------------------- */
  function initNav() {
    var btn = $("#nav-toggle"), menu = $("#nav-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () { var open = menu.classList.toggle("is-open"); btn.setAttribute("aria-expanded", open ? "true" : "false"); });
    $all("a", menu).forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }); });
  }
  function measureQuote(q) {
    if (q.classList.contains("is-open")) return; // don't re-measure while expanded
    var p = q.querySelector("p");
    if (p) q.classList.toggle("is-clamped", p.scrollHeight - p.clientHeight > 3);
  }
  function initQuotes() {
    $all(".quote").forEach(function (q) {
      if (!q.__quoteBound) {
        q.__quoteBound = true;
        q.addEventListener("click", function () { if (q.classList.contains("is-clamped")) q.classList.toggle("is-open"); });
      }
      measureQuote(q);
    });
    // re-check once webfonts settle (line heights can shift truncation)
    if (document.fonts && document.fonts.ready && !initQuotes.__fontHook) {
      initQuotes.__fontHook = true;
      document.fonts.ready.then(function () { $all(".quote").forEach(measureQuote); });
    }
  }

  function initHeroVideo() {
    var v = $(".hero__video");
    if (!v) return;
    v.muted = true; // required for autoplay in most browsers
    var p = v.play && v.play();
    if (p && p.catch) p.catch(function () {}); // blocked -> poster image shows
  }
  function initScrollHeader() {
    var hdr = document.querySelector(".site-header");
    if (!hdr) return;
    function tick() { hdr.classList.toggle("is-scrolled", window.scrollY > 32); }
    tick();
    window.addEventListener("scroll", tick, { passive: true });
  }
  function initBookingButtons() {
    document.addEventListener("click", function (e) {
      var t = e.target.closest ? e.target.closest("[data-book]") : null;
      if (t) {
        e.preventDefault();
        if (t.getAttribute("data-mode") === "enquiry") openEnquiry(t.getAttribute("data-session") || "");
        else openBooking();
      }
    });
  }
  function initKeys() {
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeLightbox(); closeModal(); }
      if (lb && lb.classList.contains("is-open")) {
        if (e.key === "ArrowLeft") step(-1);
        if (e.key === "ArrowRight") step(1);
      }
    });
  }
  function initReveal() {
    var items = $all(".reveal");
    if (!("IntersectionObserver" in window) || !items.length) { items.forEach(function (n) { n.classList.add("is-in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        // reveal when in view OR already scrolled past (e.g. after a #hash jump)
        if (e.isIntersecting || e.boundingClientRect.top < 0) { e.target.classList.add("is-in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12 });
    items.forEach(function (n) { io.observe(n); });
  }

  /* ---------- optional CMS (Sanity) content -------------------------------- */
  function sani(url, w) {
    if (!url || url.indexOf("cdn.sanity.io") === -1) return url;
    return url + (url.indexOf("?") > -1 ? "&" : "?") + "w=" + (w || 1000) + "&q=70&auto=format&fit=max";
  }
  function withImageParams(it) {
    if (it.image) it.image = sani(it.image, 1000);
    if (it.imageEn) it.imageEn = sani(it.imageEn, 1000);
    if (it.imageDa) it.imageDa = sani(it.imageDa, 1000);
    if (it.imageUa) it.imageUa = sani(it.imageUa, 1000);
    if (it.detailImage) it.detailImage = sani(it.detailImage, 1600);
    if (it.detailImageEn) it.detailImageEn = sani(it.detailImageEn, 1600);
    if (it.detailImageDa) it.detailImageDa = sani(it.detailImageDa, 1600);
    if (it.detailImageUa) it.detailImageUa = sani(it.detailImageUa, 1600);
    if (it.src) it.src = sani(it.src, 1200);
    return it;
  }
  function loadFromSanity() {
    var s = CFG.sanity;
    if (!s || !s.projectId) return Promise.resolve(); // not configured -> built-in content
    // Three content types only: session, galleryImage, galleryGroup.
    var query =
      '{' +
        '"sessions":*[_type=="session"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{_id,title,time,price,description,"image":image.asset->url,groupBooking,hue},' +
        '"gallery":*[_type=="galleryImage"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{"label":caption,"src":image.asset->url,"video":video.asset->url,hue,"groupId":group._ref},' +
        '"galleryGroups":*[_type=="galleryGroup"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{_id,"title":title,hue},' +
        '"testimonials":*[_type=="review"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{_id,text,author,role,"photo":photo.asset->url}' +
      '}';
    var ver = s.apiVersion || "2024-01-01";
    var url = "https://" + s.projectId + ".api.sanity.io/v" + ver + "/data/query/" +
              (s.dataset || "production") + "?query=" + encodeURIComponent(query);
    return fetch(url, {cache: "no-store"}) // always pull fresh so published edits show right away
      .then(function (r) { if (!r.ok) throw new Error("CMS " + r.status); return r.json(); })
      .then(function (json) {
        var d = (json && json.result) || {};
        if (d.sessions) CFG.sessions = d.sessions.map(withImageParams);
        if (d.gallery) CFG.gallery = d.gallery.map(withImageParams);
        if (d.galleryGroups) CFG.galleryGroups = d.galleryGroups;
        if (d.testimonials) CFG.testimonials = d.testimonials;
      })
      .catch(function (e) { if (window.console) console.warn("CMS load failed — using built-in content.", e); });
  }

  /* minimal Portable Text -> HTML (paragraphs, headings, bold/italic/links, lists) */
  function ptToHtml(blocks) {
    if (!Array.isArray(blocks)) return "";
    var html = "", listType = null;
    function closeList() { if (listType) { html += "</" + listType + ">"; listType = null; } }
    blocks.forEach(function (b) {
      if (!b || b._type !== "block") return;
      var defs = b.markDefs || [];
      var inner = (b.children || []).map(function (c) {
        var t = escapeHtml(c.text || "");
        (c.marks || []).forEach(function (m) {
          if (m === "strong") t = "<strong>" + t + "</strong>";
          else if (m === "em") t = "<em>" + t + "</em>";
          else if (m === "underline") t = "<u>" + t + "</u>";
          else {
            var d = defs.filter(function (x) { return x._key === m; })[0];
            if (d && d._type === "link" && d.href) t = '<a href="' + escapeHtml(d.href) + '" target="_blank" rel="noopener">' + t + "</a>";
          }
        });
        return t;
      }).join("");
      if (b.listItem) {
        var lt = b.listItem === "number" ? "ol" : "ul";
        if (listType !== lt) { closeList(); html += "<" + lt + ">"; listType = lt; }
        html += "<li>" + inner + "</li>";
        return;
      }
      closeList();
      var s = b.style || "normal";
      if (/^h[1-6]$/.test(s)) html += "<" + s + ">" + inner + "</" + s + ">";
      else if (s === "blockquote") html += "<blockquote>" + inner + "</blockquote>";
      else html += "<p>" + inner + "</p>";
    });
    closeList();
    return html;
  }

  /* ---------- event detail page (event.html?id=...) ----------------------- */
  function renderEventDetail() {
    var wrap = $("#event-detail");
    if (!wrap) return;
    var id = (new URLSearchParams(location.search)).get("id");
    var ev = (CFG.events || []).filter(function (e) { return (e._id || slugify(loc(e.title))) === id; })[0];
    if (!ev) {
      wrap.innerHTML = '<p class="detail__empty" data-i18n="detail_notfound">' + tr("detail_notfound") + '</p>';
      wrap.appendChild(el("a", { class: "btn btn--solid", href: "events.html", "data-i18n": "detail_see_all", text: tr("detail_see_all") }));
      return;
    }
    document.title = loc(ev.title) + " — Re-balance";

    var dateStr = fmtDateRange(ev.startDate, ev.endDate);
    var daysStr = fmtDays(ev.startDate, ev.endDate);
    var meta =
      (loc(ev.location) ? '<a class="meta-loc" href="https://maps.google.com/?q=' + encodeURIComponent(loc(ev.location)) + '" target="_blank" rel="noopener">📍 ' + escapeHtml(loc(ev.location)) + '</a>' : "") +
      (dateStr ? '<span>🗓 ' + escapeHtml(dateStr) + '</span>' : "") +
      (daysStr ? '<span>⏱ ' + escapeHtml(daysStr) + '</span>' : "");
    var priceBadge = buildPriceBadge(ev);

    var actions = isPaid(ev._id)
      ? el("div", { class: "card__actions detail__actions" }, [bookedBtn()])
      : ev.active === false
        ? el("div", { class: "card__actions detail__actions" }, [btnBook("enquire", "", true)])
        : el("div", { class: "card__actions detail__actions" }, [
            ev.stripeUrl ? btnLink("book_pay", ev.stripeUrl, true) : btnBook("enquire", "", true),
          ]);

    wrap.innerHTML = "";
    wrap.appendChild(el("a", { class: "detail__back", href: "events.html", "data-i18n": "detail_back", text: tr("detail_back") }));
    wrap.appendChild(el("h1", { class: "detail__title", text: loc(ev.title) }));
    wrap.appendChild(el("p", { class: "card__meta detail__meta", html: meta }));
    if (priceBadge) { priceBadge.className = "card__price detail__price"; wrap.appendChild(priceBadge); }
    wrap.appendChild(actions);
    var heroSrc = localeImg(ev, "detailImage") || localeImg(ev, "image"); // only show when there's a real photo
    if (heroSrc) wrap.appendChild(el("div", { class: "detail__media" }, [makeImg({ src: heroSrc, label: loc(ev.title), hue: ev.hue }, loc(ev.title))]));

    var ld = loc(ev.longDescription), desc = el("div", { class: "detail__desc" }), hasDesc = false;
    if (Array.isArray(ld) && ld.length) { desc.innerHTML = ptToHtml(ld); hasDesc = true; }
    else if (typeof ld === "string" && ld.trim()) { ld.split(/\n{2,}/).forEach(function (p) { if (p.trim()) desc.appendChild(el("p", { text: p.trim() })); }); hasDesc = true; }
    else if (loc(ev.blurb)) { desc.appendChild(el("p", { text: loc(ev.blurb) })); hasDesc = true; }
    if (hasDesc) wrap.appendChild(desc);

  }

  /* ---------- client reviews (from CMS) ------------------------------------ */
  function renderReviews() {
    var box = $("#quotes");
    if (!box) return;
    var list = CFG.testimonials || [];
    box.innerHTML = "";
    list.forEach(function (rv) {
      var author = (rv.author || "").trim();
      var children = [
        el("div", { class: "quote__mark", "aria-hidden": "true", text: "“" }),
        el("blockquote", { class: "quote__text" }, [el("p", { text: loc(rv.text) || "" })]),
      ];
      if (rv.photo || author) {
        var by = [];
        if (rv.photo) by.push(el("img", { class: "quote__photo", src: sani(rv.photo, 240), alt: author, loading: "lazy" }));
        else by.push(el("span", { class: "quote__photo quote__photo--mono", "aria-hidden": "true", text: author.charAt(0).toUpperCase() }));
        var info = [];
        if (author) info.push(el("span", { class: "quote__name", text: author }));
        if (rv.role) info.push(el("span", { class: "quote__role", text: rv.role }));
        if (info.length) by.push(el("div", { class: "quote__byline" }, info));
        children.push(el("figcaption", { class: "quote__by" }, by));
      }
      box.appendChild(el("figure", { class: "quote reveal" }, children));
    });
  }
  function renderContent() {
    renderSessions();
    renderGallery();
    renderFolder();
    renderReviews();
    if (window.applyI18n) window.applyI18n();
    initReveal();
  }
  // re-render CMS content (titles, blurbs, itineraries…) in the chosen language
  window.__onLocaleChange = function () { renderContent(); };

  function renderFooter() {
    var f = $(".site-footer");
    if (!f) return;
    f.innerHTML =
      '<div class="footer-flower" aria-hidden="true">' +
        '<svg viewBox="0 0 240 150" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round">' +
          '<g transform="translate(120 140)">' +
            '<path d="M0 0 C-27 -36 -23 -78 0 -104 C23 -78 27 -36 0 0 Z"/>' +
            '<path d="M0 0 C-27 -36 -23 -78 0 -104 C23 -78 27 -36 0 0 Z" transform="rotate(34)"/>' +
            '<path d="M0 0 C-27 -36 -23 -78 0 -104 C23 -78 27 -36 0 0 Z" transform="rotate(-34)"/>' +
            '<path d="M0 0 C-20 -18 -46 -34 -80 -40 C-70 -12 -34 0 0 0 Z" transform="rotate(8)"/>' +
            '<path d="M0 0 C-20 -18 -46 -34 -80 -40 C-70 -12 -34 0 0 0 Z" transform="rotate(-8) scale(-1 1)"/>' +
            '<path d="M0 0 C-16 -12 -40 -20 -66 -20 C-58 -4 -28 4 0 0 Z" transform="rotate(4)"/>' +
            '<path d="M0 0 C-16 -12 -40 -20 -66 -20 C-58 -4 -28 4 0 0 Z" transform="rotate(-4) scale(-1 1)"/>' +
          '</g>' +
        '</svg>' +
      '</div>' +
      '<div class="wrap footer-inner">' +
        '<div class="footer-lead">' +
          '<div class="footer-brand">' +
            '<svg class="footer-brand__icon" viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/><path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/></svg>' +
            '<span data-brand-name>Re-balance</span>' +
          '</div>' +
          '<p class="footer-tag" data-i18n="footer_blurb">Body-oriented therapy and nervous-system work — a calm, safe space to slow down and reconnect.</p>' +
          '<a class="btn btn--book footer-cta" href="index.html#sessions" data-i18n="hero_book_session">Book a session</a>' +
        '</div>' +
        '<div class="footer-cols">' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer_getintouch">Get in touch</h4>' +
            '<a href="#" data-link-email data-brand-email>email</a>' +
            '<a href="#" data-link-phone data-brand-phone>Phone</a>' +
            '<a href="#" data-link-whatsapp target="_blank" rel="noopener">WhatsApp</a>' +
            '<a href="#" data-link-instagram target="_blank" rel="noopener">Instagram</a>' +
            '<a href="#" data-link-facebook target="_blank" rel="noopener">Facebook</a>' +
            '<a href="#" data-link-telegram target="_blank" rel="noopener">Telegram</a>' +
            '<a class="footer-col__loc" data-map-link data-brand-location href="#" target="_blank" rel="noopener"></a>' +
          '</div>' +
          '<div class="footer-col">' +
            '<h4 data-i18n="footer_explore">Explore</h4>' +
            '<a href="index.html#sessions" data-i18n="nav_sessions">Sessions</a>' +
            '<a href="folder.html" data-i18n="nav_gallery">Gallery</a>' +
            '<a href="index.html#about" data-i18n="nav_about">About</a>' +
          '</div>' +
        '</div>' +
      '</div>' +
      '<div class="wrap footer-bottom">' +
        '<span>© <span data-year></span> <span data-brand-name>Re-balance</span>. <span data-i18n="footer_rights">All rights reserved.</span></span>' +
        '<span class="footer-legal" data-brand-cvr></span>' +
      '</div>';
  }
  function render() {
    renderFooter();
    applyBrand();
    renderContent();
    initNav();
    initHeroVideo();
    initScrollHeader();
    initQuotes();
    initBookingButtons();
    initKeys();
    // content renders after an async fetch, so re-honour a #hash deep link
    // on the next frame, once card/gallery heights exist (instant, not smooth)
    if (location.hash.length > 1) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(function () { target.scrollIntoView({behavior: "auto"}); });
    }
  }
  function showToast(msg) {
    var n = el("div", { class: "toast", text: msg });
    document.body.appendChild(n);
    requestAnimationFrame(function () { n.classList.add("is-in"); });
    setTimeout(function () { n.classList.remove("is-in"); setTimeout(function () { n.remove(); }, 400); }, 5000);
    n.addEventListener("click", function () { n.remove(); });
  }
  document.addEventListener("DOMContentLoaded", function () {
    var paidId = markPaidFromUrl();
    loadFromSanity().then(function () { render(); if (paidId) showToast(tr("paid_thanks")); });
  });
})();
