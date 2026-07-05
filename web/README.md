# Rebalance — website

A minimal, no-build static site: a home page with photos, bookable trips, an
about/reviews section, and a separate gallery page. Booking + payment work
through **your own** Stripe Payment Links and a Cal.com/Calendly scheduler —
no backend, no API keys in the code.

## Files

```
index.html            Home page
gallery.html          Full photo gallery (lightbox)
assets/
  css/styles.css      All styling
  js/config.js        ← THE ONLY FILE YOU NORMALLY EDIT (text, links, photos)
  js/main.js          Logic (rendering, lightbox, booking modal) — leave as is
  images/logo.svg     Logo / favicon (original artwork)
```

## Run it locally

It's plain HTML — just open `index.html` in a browser. For the gallery links
and fonts to behave exactly like production, serve it:

```bash
cd trail-to-thriving
python3 -m http.server 8080      # then open http://localhost:8080
```

## Editing content — two layers

- **Events, Sessions, Gallery** → managed by **Tanya** in the **Sanity CMS** (a
  friendly hosted editor with photo upload, email/Google login). The site loads
  these live from the CMS. The editor (Sanity Studio) lives in its own folder at
  `~/Projects/Side/ttt` — see its `README.md` for setup. Connect it by pasting
  the project id into `sanity.projectId` in `config.js`.
- **Everything else** (brand name, tagline, About text, reviews, locations,
  footer, theme) → edited by a developer in `config.js`. Rarely changes.

Until a Sanity `projectId` is set, the site uses the built-in content in
`config.js` as a demo/fallback — so nothing breaks before the CMS is wired up,
and the CMS only overrides events/sessions/gallery.

## Edit the content — `assets/js/config.js`

Everything visible on the site comes from `config.js`. Open it and change the
text in quotes. Highlights:

- **Brand**: name, tagline, intro, contact email, Instagram/Facebook links.
- **Events**: group hikes/retreats people **buy** — title, location, dates, price,
  blurb, `image`, and a `stripeUrl` (Stripe Payment Link).
- **Sessions**: 1:1 time with Tanya, incl. **therapy** — people **book a time** and
  pay. Each has a title, format, price, blurb, its own `schedulerUrl`
  (Cal.com/Calendly), and an optional `stripeUrl` (e.g. to sell a package).
- **Gallery**: a list of photos (`label`, `hue`, `src`).
- **Reviews**: the score/count and a few quotes (replace the sample quotes).
- **Locations / languages**: shown in the About section.

## Add your own photos

1. Drop image files into `assets/images/` (e.g. `lofoten.jpg`).
2. In `config.js`, point to them:
   - Gallery: `{ label: "Lofoten, Norway", src: "assets/images/lofoten.jpg" }`
   - Trip: set `image: "assets/images/geiranger.jpg"`
3. Any entry left with `src: ""` / `image: ""` shows a styled placeholder, so
   the layout always looks complete. If a `src` points to a file that doesn't
   exist yet, it **also** falls back to a placeholder (no broken images).

### Demo photos (pre-wired filenames)

The home gallery + event cards are already pointed at these filenames. Save the
photos you want as exactly these names in `assets/images/` and they appear with
no further edits (best to use Tanya's own originals):

| File | Used for | Suggested shot |
|------|----------|----------------|
| `demo-1.jpg` | Gallery "Forest in bloom" + Chamonix event | spring forest / flowers |
| `demo-2.jpg` | Gallery "Still water" + Geirangerfjord event | fjord / lake / sea |
| `demo-3.jpg` | Gallery "Nourish" | food / retreat detail |
| `demo-4.jpg` | Gallery "Among the pines" + Preikestolen event | forest trail |
| `demo-5.jpg` | Gallery "Northern lights" + Lofoten event | aurora / night sky |
| `demo-6.jpg` | Gallery "Evening fire" | campfire / candles |

To download from Facebook: open a photo → **⋯ → Download** (or right-click →
Save image), then rename it. Square-ish crops look best in the grid.

> ⚠️ **Photo rights:** use only photos you have permission to publish. The
> images currently on the Facebook/Instagram pages are fine **if they're yours**
> — download your originals and add them here. This project ships with
> generated placeholders, not scraped photos.

## Booking + payment (no secrets in the code)

There are two flows. Both use only **public** URLs you paste in — no API keys.

### A. Events → "Book & pay" with a Stripe Payment Link
A Payment Link is a public URL Stripe hosts for you (no keys, safe to commit).

1. Stripe Dashboard → **Payment Links → New link** (set price/currency, e.g.
   DKK/SEK/EUR). For Danish/Swedish customers enable **MobilePay**, **Swish** and
   cards under Settings → Payment methods.
2. Copy the link (looks like `https://buy.stripe.com/xxxxxxxx`).
3. Paste it into that event's `stripeUrl` in `config.js`.

An event with no `stripeUrl` shows an **Enquire** button instead, so the site
works before payments are set up.

### B. Sessions with Tanya (incl. therapy) → "Book a time" + pay
Sessions are 1:1, so people pick a time on a calendar. Give each session its own
**Cal.com** or **Calendly** event-type link in `schedulerUrl`:

```js
{ title: "Nature-assisted therapy", schedulerUrl: "https://cal.com/tanya/therapy-60", ... }
```

The button opens that calendar in a modal. To **take payment for a session**,
either:
- connect Stripe **inside Cal.com/Calendly** so payment is collected at booking
  (recommended for therapy — one step, no separate link); **or**
- set the session's `stripeUrl` to a Stripe Payment Link — handy for selling a
  **package** (e.g. 5 sessions) up front. A "Pay online" button then appears
  next to "Book a time".

A session with neither link falls back to an email enquiry using `brand.email`.
The generic **Book** buttons (nav/hero) use the top-level `schedulerUrl` as a
default — set it to your main Cal.com page, or leave it for the email fallback.

> 🔒 Never put Stripe **secret keys**, passwords, or tokens in this project.
> Only public Payment Links and scheduler URLs belong here.

## Deploy (pick one — all free for a site this size)

- **Netlify**: drag the `trail-to-thriving` folder onto <https://app.netlify.com/drop>.
- **Vercel**: `vercel` in the folder, or import the repo at vercel.com.
- **GitHub Pages**: push to a repo → Settings → Pages → deploy from `main`/root.
- **Cloudflare Pages**: connect the repo, no build command, output dir = root.

Then point your domain (e.g. `trailtothriving.com`) at the host and you're live.

## Customising the look

Colours, fonts and spacing live as CSS variables at the top of
`assets/css/styles.css` (`--forest`, `--sun`, `--cream`, …). Change those to
re-theme the whole site in one place.
