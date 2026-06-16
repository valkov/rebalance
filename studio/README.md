# Trail to Thriving — content editor (Sanity Studio)

This is the friendly editor Tanya uses to manage **Events/Trips**, **Sessions**,
and the **Gallery**. It logs in with email or Google — no GitHub, no code.

The public website reads this content live from Sanity's CDN, so **publishing in
the studio updates the site within seconds** (no rebuild).

## One-time setup (developer, ~15 min)

```bash
cd studio
npm install

# 1) Log in (opens the browser — use Google or email)
npx sanity login

# 2) Create the project + 'production' dataset (writes the project id for you)
npx sanity init --create-project "Trail to Thriving" --dataset production
#    When asked to add to your existing config, say YES.
#    (Or create it at https://www.sanity.io/manage and paste the id into
#     sanity.cli.ts AND sanity.config.ts, replacing YOUR_PROJECT_ID.)

# 3) Publish the studio so Tanya can use it from anywhere
npx sanity deploy
#    Pick a hostname, e.g. "trailtothriving" -> https://trailtothriving.sanity.studio
```

## Connect the website to the content

1. Copy your **project id** (shown by `sanity init`, or in sanity.io/manage).
2. Paste it into the website's [`../assets/js/config.js`](../assets/js/config.js):
   ```js
   sanity: { projectId: "abcd1234", dataset: "production", apiVersion: "2024-01-01" },
   ```
3. Allow the browser to read it: **sanity.io/manage → your project → API → CORS
   origins → Add origin** for:
   - `http://localhost:8087` (local preview)
   - your live site URL (e.g. `https://trailtothriving.com`)

   Leave "Allow credentials" **off**. (Read access is public; this just lets the
   browser fetch it.)

Until a project id is set, the website shows its built-in demo content — so
nothing breaks before this is wired up.

## Inviting Tanya

In **sanity.io/manage → Members → Invite**, add Tanya's email (free plan allows
multiple users). She then logs in at `https://<your-name>.sanity.studio`.

## Day-to-day (Tanya)

Open the studio URL → **Event/Trip**, **Session**, or **Gallery photo** →
edit or "+ Create" → upload photos, fill the fields, set the **Payment link** →
**Publish**. The site updates automatically.

## Local preview of the studio

```bash
npm run dev      # http://localhost:3333
```
