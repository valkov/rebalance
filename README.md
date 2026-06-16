# Trail to Thriving

Marketing website + CMS for **Trail to Thriving** — guided wellbeing hikes,
retreats and 1:1 therapy with Tanya Ekelin (Denmark & Sweden).

## Repository structure

| Folder | What it is |
|--------|------------|
| [`web/`](web/) | The public website — a zero-build static site (HTML/CSS/vanilla JS) that reads content live from the CMS. |
| [`studio/`](studio/) | The **Sanity Studio** — the editor Tanya uses to manage events, sessions and gallery photos. Deployed at <https://trailtothriving.sanity.studio>. |

The two are independent: the studio publishes content to a Sanity dataset, and
the website fetches it at page load. Bookings/payments use external links
(Stripe Payment Links + a scheduler) set per item in the CMS — no payment
secrets live in this repo.

## `web/` — the website

Static files, no build step:

```bash
cd web
python3 -m http.server 8087     # open http://localhost:8087
```

- Content (events, sessions, gallery) loads from Sanity when
  `sanity.projectId` is set in [`web/assets/js/config.js`](web/assets/js/config.js)
  (currently `a0vcqlnf`); otherwise the built-in demo content is used as a
  fallback.
- Brand text, About copy, reviews, footer and theme are edited in `config.js`.
- **Deploy:** it's static — drop `web/` on Netlify / Vercel / GitHub Pages, then
  add the live URL to **Sanity → Manage → API → CORS origins**.

## `studio/` — the CMS (Sanity)

```bash
cd studio
npm install
npm run dev        # local studio at http://localhost:3333
npm run deploy     # publish to https://trailtothriving.sanity.studio
```

- Content types: **Event/Trip**, **Session (1:1 / therapy)**, **Gallery photo**.
- Tanya logs in with email/Google. Full setup notes in [`studio/README.md`](studio/README.md).
- `studio/seed*.ndjson` are the demo-content seeds:
  `npx sanity dataset import seed.ndjson production`.

## Notes

- **No secrets in this repo.** The Sanity project id is public (reads are
  CORS-restricted). Never commit API tokens.
- The Stripe links in the demo content are placeholders — replace them with real
  Stripe Payment Links in the CMS.
- `node_modules/` and Sanity build output are gitignored.
