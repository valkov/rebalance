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
      var ks = ["en", "da", "uk"]; for (var i = 0; i < ks.length; i++) if (ok(v[ks[i]])) return v[ks[i]];
      return v.en != null ? v.en : "";
    }
    return v;
  }
  // remember a paid booking client-side. Test/demo only — not server-verified;
  // a real one-time-purchase guard needs accounts + a Stripe webhook.
  function isPaid(id) { try { return !!id && localStorage.getItem("rebalance_paid_" + id) === "1"; } catch (e) { return false; } }
  function markPaidFromUrl() {
    var p = new URLSearchParams(location.search).get("paid");
    if (!p) return null;
    try { localStorage.setItem("rebalance_paid_" + p, "1"); } catch (e) {}
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
    $all("[data-link-facebook]").forEach(function (n) { if (b.facebook) n.href = b.facebook; });
    $all("[data-link-telegram]").forEach(function (n) { if (b.telegram) { n.href = b.telegram; } else { n.style.display = "none"; } });
    $all("[data-link-email]").forEach(function (n) { if (b.email) n.href = "mailto:" + b.email; });
    $all("[data-brand-email]").forEach(function (n) { n.textContent = b.email || ""; });
    $all("[data-year]").forEach(function (n) { n.textContent = String(new Date().getFullYear()); });
    if ((CFG.locations || []).length) $all("[data-locations]").forEach(function (n) { n.textContent = CFG.locations.join(" · "); });
    if ((CFG.languages || []).length) $all("[data-languages]").forEach(function (n) { n.textContent = CFG.languages.join(", "); });
    if (CFG.sessionsNote) $all("[data-sessions-note]").forEach(function (n) { n.textContent = CFG.sessionsNote; });
    var r = CFG.reviews || {};
    $all("[data-review-score]").forEach(function (n) { n.textContent = r.score || ""; });
    $all("[data-review-count]").forEach(function (n) { n.textContent = r.count != null ? r.count : ""; });
  }

  /* ---------- sessions (group & personal therapy with Tanya — you BOOK) ---- */
  var SESSION_CATS = [
    { key: "group", i18n: "cat_group" },
    { key: "personal", i18n: "cat_personal" },
    { key: "other", i18n: "cat_other" },
  ];
  function sessionCard(s) {
    var price = loc(s.price), format = loc(s.format), isFree = /free/i.test(price || "");
    var primary, secondary = null;
    if (s.schedulerUrl) {
      primary = btnBook(isFree ? "book_free_call" : "book_time", s.schedulerUrl, true);
      if (s.stripeUrl) secondary = btnLink("pay_online", s.stripeUrl, false);
    } else if (s.stripeUrl) {
      primary = btnLink(isFree ? "get_started" : "buy", s.stripeUrl, true);
    } else {
      primary = btnBook(isFree ? "book_free_call" : "enquire", "", true);
    }
    if (isPaid(s._id)) { primary = bookedBtn(); secondary = null; }
    return el("article", { class: "card card--session reveal" }, [
      el("div", { class: "card__body" }, [
        el("div", { class: "session__head" }, [
          el("h3", { class: "card__title", text: loc(s.title) }),
          price ? el("span", { class: "session__price", text: price }) : null,
        ]),
        format ? el("p", { class: "card__meta", html: '<span>🌸 ' + escapeHtml(format) + '</span>' }) : null,
        el("p", { class: "card__blurb", text: loc(s.blurb) || "" }),
        el("div", { class: "card__actions" }, [primary, secondary]),
      ]),
    ]);
  }
  // Sessions are shown grouped under category headings (Group / Personal / Other).
  function renderSessions() {
    var wrap = $("#sessions-list");
    if (!wrap) return;
    var all = CFG.sessions || [];
    wrap.innerHTML = "";
    var cats = SESSION_CATS.slice(), seen = {};
    all.forEach(function (s) {
      var c = s.category || "other";
      if (!cats.some(function (x) { return x.key === c; }) && !seen[c]) { seen[c] = 1; cats.push({ key: c, label: c }); }
    });
    cats.forEach(function (cat) {
      var items = all.filter(function (s) { return (s.category || "other") === cat.key; });
      if (!items.length) return;
      var head = el("h3", { class: "session-cat__title" });
      if (cat.i18n) { head.setAttribute("data-i18n", cat.i18n); head.textContent = tr(cat.i18n); }
      else { head.textContent = cat.label || cat.key; }
      wrap.appendChild(el("div", { class: "session-cat" }, [
        head,
        el("div", { class: "trips-grid" }, items.map(sessionCard)),
      ]));
    });
  }

  /* ---------- gallery ------------------------------------------------------ */
  var galleryItems = [];
  function galleryTile(g, index) {
    var fig = el("button", { class: "tile reveal", type: "button", "aria-label": "Open photo: " + g.label }, [
      makeImg(g, g.label),
      el("span", { class: "tile__cap", text: g.label }),
    ]);
    fig.addEventListener("click", function () { openLightbox(index); });
    return fig;
  }
  function galleryItemsFromCfg() {
    return (CFG.gallery || []).map(function (g, i) {
      return { src: g.src, label: loc(g.label) || ("Photo " + (i + 1)), hue: g.hue, groupId: g.groupId };
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
    document.title = (title || "Gallery") + " — Rebalance";
    grid.innerHTML = "";
    galleryItems = imgs;
    galleryItems.forEach(function (g, i) { grid.appendChild(galleryTile(g, i)); });
  }

  /* ---------- lightbox ----------------------------------------------------- */
  var lb, lbImg, lbCap, lbIndex = 0;
  function ensureLightbox() {
    if (lb) return;
    lb = el("div", { class: "lightbox", "aria-hidden": "true", role: "dialog", "aria-modal": "true" }, [
      el("button", { class: "lightbox__close", type: "button", "aria-label": "Close", html: "&times;" }),
      el("button", { class: "lightbox__nav lightbox__nav--prev", type: "button", "aria-label": "Previous", html: "&#8249;" }),
      (function () { lbImg = el("img", { class: "lightbox__img", alt: "" }); return lbImg; })(),
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
  function openLightbox(i) { ensureLightbox(); lbIndex = i; show(); lb.classList.add("is-open"); lb.setAttribute("aria-hidden", "false"); document.body.classList.add("no-scroll"); }
  function show() { var g = galleryItems[lbIndex] || {}; lbImg.src = imgFor(g); lbImg.alt = g.label || ""; lbCap.textContent = g.label || ""; }
  function step(d) { lbIndex = (lbIndex + d + galleryItems.length) % galleryItems.length; show(); }
  function closeLightbox() { if (!lb) return; lb.classList.remove("is-open"); lb.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); }

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
  function openBooking(url) {
    ensureModal();
    url = url || CFG.schedulerUrl;
    if (url) {
      modalBody.innerHTML = "";
      modalBody.appendChild(el("iframe", { class: "modal__frame", src: url, title: "Booking calendar", loading: "lazy", frameborder: "0" }));
    } else {
      var email = (CFG.brand || {}).email || "";
      modalBody.innerHTML =
        '<div class="modal__msg">' +
          '<h3>' + tr("modal_title") + '</h3>' +
          '<p>' + tr("modal_text") + '</p>' +
          (email ? '<a class="btn btn--solid" href="mailto:' + email + '?subject=Booking%20enquiry">' + tr("modal_email") + '</a>' : "") +
          '<p class="modal__hint">' + tr("modal_hint") + '</p>' +
        '</div>';
    }
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function closeModal() { if (!modal) return; modal.classList.remove("is-open"); modal.setAttribute("aria-hidden", "true"); document.body.classList.remove("no-scroll"); modalBody.innerHTML = ""; }

  /* ---------- nav, buttons, keys, reveal ----------------------------------- */
  function initNav() {
    var btn = $("#nav-toggle"), menu = $("#nav-menu");
    if (!btn || !menu) return;
    btn.addEventListener("click", function () { var open = menu.classList.toggle("is-open"); btn.setAttribute("aria-expanded", open ? "true" : "false"); });
    $all("a", menu).forEach(function (a) { a.addEventListener("click", function () { menu.classList.remove("is-open"); btn.setAttribute("aria-expanded", "false"); }); });
  }
  function initQuotes() {
    $all(".quote").forEach(function (q) {
      q.addEventListener("click", function () { q.classList.toggle("is-open"); });
    });
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
      if (t) { e.preventDefault(); openBooking(t.getAttribute("data-scheduler") || ""); }
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
    if (it.detailImage) it.detailImage = sani(it.detailImage, 1600);
    if (it.src) it.src = sani(it.src, 1200);
    return it;
  }
  function loadFromSanity() {
    var s = CFG.sanity;
    if (!s || !s.projectId) return Promise.resolve(); // not configured -> built-in content
    var query =
      '{' +
        '"sessions":*[_type=="session"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{_id,title,category,format,price,blurb,"image":image.asset->url,schedulerUrl,"stripeUrl":paymentUrl,hue},' +
        '"gallery":*[_type=="galleryImage"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{"label":caption,"src":image.asset->url,hue,"groupId":group._ref},' +
        '"galleryGroups":*[_type=="galleryGroup"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{_id,"title":title,hue}' +
      '}';
    var ver = s.apiVersion || "2024-01-01";
    var url = "https://" + s.projectId + ".api.sanity.io/v" + ver + "/data/query/" +
              (s.dataset || "production") + "?query=" + encodeURIComponent(query);
    return fetch(url, {cache: "no-store"}) // always pull fresh so published edits show right away
      .then(function (r) { if (!r.ok) throw new Error("CMS " + r.status); return r.json(); })
      .then(function (json) {
        var d = (json && json.result) || {};
        if (d.sessions && d.sessions.length) CFG.sessions = d.sessions.map(withImageParams);
        if (d.gallery && d.gallery.length) CFG.gallery = d.gallery.map(withImageParams);
        if (d.galleryGroups && d.galleryGroups.length) CFG.galleryGroups = d.galleryGroups;
      })
      .catch(function (e) { if (window.console) console.warn("CMS load failed — using built-in content.", e); });
  }

  function renderContent() {
    renderSessions();
    renderGallery();
    renderFolder();
    if (window.applyI18n) window.applyI18n();
    initReveal();
  }
  // re-render CMS content (titles, blurbs, itineraries…) in the chosen language
  window.__onLocaleChange = function () { renderContent(); };

  function render() {
    applyBrand();
    renderContent();
    initNav();
    initQuotes();
    initScrollHeader();
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
