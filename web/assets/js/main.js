/* Trail to Thriving — site behaviour. No build step, no dependencies. */
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
  function eventHref(t) { return "event.html?id=" + encodeURIComponent(t._id || slugify(t.title)); }
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
    $all("[data-brand-name]").forEach(function (n) { n.textContent = b.name || "Trail to Thriving"; });
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

  /* ---------- events (group hikes / retreats you BUY) ---------------------- */
  function renderEvents() {
    var wrap = $("#events-grid");
    if (!wrap) return;
    var list = CFG.events || CFG.trips || [];
    list.forEach(function (t) {
      var href = eventHref(t);
      var actions = el("div", { class: "card__actions" }, [
        t.stripeUrl ? btnLink("book_pay", t.stripeUrl, true) : btnBook("enquire", t.schedulerUrl, true),
        btnBook("reserve_spot", t.schedulerUrl, false),
      ]);
      var card = el("article", { class: "card reveal" }, [
        el("div", { class: "card__media" }, [
          el("a", { href: href, "aria-label": t.title }, [makeImg(t, t.title)]),
          t.price ? el("span", { class: "card__price", text: t.price }) : null,
        ]),
        el("div", { class: "card__body" }, [
          el("h3", { class: "card__title" }, [el("a", { href: href, text: t.title })]),
          el("p", { class: "card__meta", html:
            (t.location ? '<span>📍 ' + escapeHtml(t.location) + '</span>' : "") +
            (t.dates ? '<span>🗓 ' + escapeHtml(t.dates) + '</span>' : "") +
            (t.duration ? '<span>⏱ ' + escapeHtml(t.duration) + '</span>' : "") }),
          el("p", { class: "card__blurb", text: t.blurb || "" }),
          el("a", { class: "card__more", href: href, "data-i18n": "view_details", text: tr("view_details") }),
          actions,
        ]),
      ]);
      wrap.appendChild(card);
    });
  }

  /* ---------- sessions (1:1 with Tanya — incl. therapy — you BOOK) --------- */
  function renderSessions() {
    var wrap = $("#sessions-grid");
    if (!wrap) return;
    (CFG.sessions || []).forEach(function (s) {
      var isFree = /free/i.test(s.price || "");
      var primary, secondary = null;
      if (s.schedulerUrl) {
        primary = btnBook(isFree ? "book_free_call" : "book_time", s.schedulerUrl, true);
        if (s.stripeUrl) secondary = btnLink("pay_online", s.stripeUrl, false);
      } else if (s.stripeUrl) {
        primary = btnLink(isFree ? "get_started" : "buy", s.stripeUrl, true);
      } else {
        primary = btnBook(isFree ? "book_free_call" : "enquire", "", true);
      }
      var card = el("article", { class: "card card--session reveal" }, [
        el("div", { class: "card__body" }, [
          el("div", { class: "session__head" }, [
            el("h3", { class: "card__title", text: s.title }),
            s.price ? el("span", { class: "session__price", text: s.price }) : null,
          ]),
          s.format ? el("p", { class: "card__meta", html: '<span>🌿 ' + escapeHtml(s.format) + '</span>' }) : null,
          el("p", { class: "card__blurb", text: s.blurb || "" }),
          el("div", { class: "card__actions" }, [primary, secondary]),
        ]),
      ]);
      wrap.appendChild(card);
    });
  }

  /* ---------- gallery ------------------------------------------------------ */
  var galleryItems = [];
  function renderGallery() {
    var wrap = $("#gallery-grid");
    if (!wrap) return;
    var items = (CFG.gallery || []).slice();
    var limit = parseInt(wrap.getAttribute("data-limit") || "0", 10);
    if (limit > 0) items = items.slice(0, limit);
    galleryItems = items;
    items.forEach(function (g, i) {
      var fig = el("button", { class: "tile reveal", type: "button", "aria-label": "Open photo: " + (g.label || ("Photo " + (i + 1))) }, [
        makeImg(g, g.label || ("Photo " + (i + 1))),
        el("span", { class: "tile__cap", text: g.label || "" }),
      ]);
      fig.addEventListener("click", function () { openLightbox(i); });
      wrap.appendChild(fig);
    });
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
        '"events":*[_type=="event"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{_id,title,location,dates,duration,price,blurb,longDescription,"itinerary":itinerary[]{label,title,text},"image":coalesce(thumbnail.asset->url,images[0].asset->url),"detailImage":coalesce(detailImage.asset->url,images[1].asset->url,images[0].asset->url),"stripeUrl":paymentUrl,"schedulerUrl":bookingUrl,hue},' +
        '"sessions":*[_type=="session"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{title,format,price,blurb,"image":image.asset->url,schedulerUrl,"stripeUrl":paymentUrl,hue},' +
        '"gallery":*[_type=="galleryImage"&&!(_id in path("drafts.**"))]|order(coalesce(order,99) asc)' +
          '{"label":caption,"src":image.asset->url,hue}' +
      '}';
    var ver = s.apiVersion || "2024-01-01";
    var url = "https://" + s.projectId + ".api.sanity.io/v" + ver + "/data/query/" +
              (s.dataset || "production") + "?query=" + encodeURIComponent(query);
    return fetch(url, {cache: "no-store"}) // always pull fresh so published edits show right away
      .then(function (r) { if (!r.ok) throw new Error("CMS " + r.status); return r.json(); })
      .then(function (json) {
        var d = (json && json.result) || {};
        if (d.events && d.events.length) CFG.events = d.events.map(withImageParams);
        if (d.sessions && d.sessions.length) CFG.sessions = d.sessions.map(withImageParams);
        if (d.gallery && d.gallery.length) CFG.gallery = d.gallery.map(withImageParams);
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
    var ev = (CFG.events || []).filter(function (e) { return (e._id || slugify(e.title)) === id; })[0];
    if (!ev) {
      wrap.innerHTML = '<p class="detail__empty" data-i18n="detail_notfound">' + tr("detail_notfound") + '</p>';
      wrap.appendChild(el("a", { class: "btn btn--solid", href: "index.html#events", "data-i18n": "detail_see_all", text: tr("detail_see_all") }));
      return;
    }
    document.title = ev.title + " — Trail to Thriving";

    var meta =
      (ev.location ? '<span>📍 ' + escapeHtml(ev.location) + '</span>' : "") +
      (ev.dates ? '<span>🗓 ' + escapeHtml(ev.dates) + '</span>' : "") +
      (ev.duration ? '<span>⏱ ' + escapeHtml(ev.duration) + '</span>' : "") +
      (ev.price ? '<span>💰 ' + escapeHtml(ev.price) + '</span>' : "");

    var actions = el("div", { class: "card__actions detail__actions" }, [
      ev.stripeUrl ? btnLink("book_pay", ev.stripeUrl, true) : btnBook("enquire", ev.schedulerUrl, true),
      btnBook("reserve_spot", ev.schedulerUrl, false),
    ]);

    wrap.innerHTML = "";
    wrap.appendChild(el("a", { class: "detail__back", href: "index.html#events", "data-i18n": "detail_back", text: tr("detail_back") }));
    wrap.appendChild(el("h1", { class: "detail__title", text: ev.title }));
    wrap.appendChild(el("p", { class: "card__meta detail__meta", html: meta }));
    wrap.appendChild(actions);
    var heroSrc = ev.detailImage || ev.image; // only show a media block when there's a real photo
    if (heroSrc) wrap.appendChild(el("div", { class: "detail__media" }, [makeImg({ src: heroSrc, label: ev.title, hue: ev.hue }, ev.title)]));

    var ld = ev.longDescription, desc = el("div", { class: "detail__desc" }), hasDesc = false;
    if (Array.isArray(ld) && ld.length) { desc.innerHTML = ptToHtml(ld); hasDesc = true; }
    else if (typeof ld === "string" && ld.trim()) { ld.split(/\n{2,}/).forEach(function (p) { if (p.trim()) desc.appendChild(el("p", { text: p.trim() })); }); hasDesc = true; }
    else if (ev.blurb) { desc.appendChild(el("p", { text: ev.blurb })); hasDesc = true; }
    if (hasDesc) wrap.appendChild(desc);

    if (ev.itinerary && ev.itinerary.length) {
      var itin = el("section", { class: "detail__itinerary" }, [el("h2", { "data-i18n": "detail_daybyday", text: tr("detail_daybyday") })]);
      ev.itinerary.forEach(function (d) {
        itin.appendChild(el("div", { class: "itin" }, [
          d.label ? el("span", { class: "itin__day", text: d.label }) : null,
          el("div", { class: "itin__body" }, [
            d.title ? el("h3", { class: "itin__title", text: d.title }) : null,
            d.text ? el("p", { text: d.text }) : null,
          ]),
        ]));
      });
      wrap.appendChild(itin);
    }
  }

  function render() {
    applyBrand();
    renderEvents();
    renderSessions();
    renderGallery();
    renderEventDetail();
    if (window.applyI18n) window.applyI18n();
    initNav();
    initBookingButtons();
    initKeys();
    initReveal();
    // content renders after an async fetch, so re-honour a #hash deep link
    // on the next frame, once card/gallery heights exist (instant, not smooth)
    if (location.hash.length > 1) {
      var target = document.getElementById(location.hash.slice(1));
      if (target) requestAnimationFrame(function () { target.scrollIntoView({behavior: "auto"}); });
    }
  }
  document.addEventListener("DOMContentLoaded", function () { loadFromSanity().then(render); });
})();
