# Rebalance — website

A minimal, no-build static site: a home page with a soft photo gallery, grouped
therapy sessions, and an about/reviews section, plus a gallery folder page.
Booking + payment work through **your own** Stripe Payment Links and a
Cal.com/Calendly scheduler — no backend, no API keys in the code.

## Files

```
index.html            Home page
folder.html           A gallery folder (lightbox)
assets/
  css/styles.css      All styling (soft pink theme — edit the CSS variables at the top)
  js/config.js        ← THE ONLY FILE YOU NORMALLY EDIT (text, links, photos)
  js/i18n.js          UI translations (English / Danish / Ukrainian)
  js/main.js          Logic (rendering, lightbox, booking modal) — leave as is
  images/logo.svg     Logo / favicon (currently a plain white circle)
```

## Run it locally

```bash
cd web
python3 -m http.server 8087      # then open http://localhost:8087
```

## Editing content — two layers

- **Sessions & Gallery** → managed by **Tanya** in the **Sanity CMS** (a friendly
  hosted editor with photo upload, email/Google login). The site loads these live
  from the CMS. The editor (Sanity Studio) lives in `../studio` — see its
  `README.md`. It's connected via `sanity.projectId` in `config.js` (`s3xmc1k6`).
- **Everything else** (brand name, tagline, About text, reviews, locations,
  footer, theme) → edited in `config.js`.

Until a Sanity `projectId` is set, the site uses the built-in content in
`config.js` as a demo/fallback — so nothing breaks before the CMS is wired up.

## Edit the content — `assets/js/config.js`

- **Brand**: name, tagline, intro, contact email, Instagram/Facebook links.
- **Sessions**: group & personal therapy. Each has a `category`
  (`"group"` | `"personal"` | `"other"`), title, format, price, blurb, its own
  `schedulerUrl` (Cal.com/Calendly), and an optional `stripeUrl` (e.g. a package).
  The site groups them under "Group therapy", "Personal therapy" and "Other".
- **Gallery**: a list of photos (`label`, `hue`, `src`).
- **Reviews / locations / languages**: shown in the reviews and about sections.

## Add your own photos

Drop image files into `assets/images/` and point `src` (gallery) or `image`
(session) at them. Any entry left with `src: ""` shows a soft styled placeholder,
so the layout always looks complete (no broken images).

## Booking + payment (no secrets in the code)

Sessions are booked on a calendar. Give each session its own **Cal.com** or
**Calendly** event-type link in `schedulerUrl`:

```js
{ title: "Individual therapy", schedulerUrl: "https://cal.com/tanya/therapy-60", ... }
```

The button opens that calendar in a modal. To **take payment**, either connect
Stripe inside Cal.com/Calendly (collected at booking — recommended for therapy),
or set the session's `stripeUrl` to a Stripe Payment Link (handy for selling a
**package** up front) — a "Pay online" button then appears. A session with
neither link falls back to an email enquiry using `brand.email`.

> 🔒 Never put Stripe secret keys, passwords or tokens in this project. Only
> public Payment Links and scheduler URLs belong here.

## Deploy (pick one — all free for a site this size)

- **Netlify**: drag the `web` folder onto <https://app.netlify.com/drop>.
- **Vercel** / **Cloudflare Pages** / **GitHub Pages**: no build command, output = root.

Then point your domain at the host and add your live URL to
**Sanity → Manage → API → CORS origins**.

## Customising the look

Colours and fonts live as CSS variables at the top of `assets/css/styles.css`
(`--rose`, `--rose-d`, `--blush`, `--cream`, …). Change those to re-theme the
whole site in one place.
