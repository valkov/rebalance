# Rebalance — content editor (Sanity Studio)

This is the friendly editor Tanya uses to manage **Therapy sessions** and the
**Gallery**. It logs in with email or Google — no GitHub, no code.

The public website reads this content live from Sanity's CDN, so **publishing in
the studio updates the site within seconds** (no rebuild).

## One-time setup (developer, ~15 min)

```bash
cd studio
npm install

# 1) Log in (opens the browser — use Google or email)
npx sanity login

# 2) The project already exists: id "s3xmc1k6", dataset "production".
#    (To start a fresh one instead:
#     npx sanity init --create-project "Rebalance" --dataset production)

# 3) Publish the studio so Tanya can use it from anywhere
npx sanity deploy
#    Hostname "rebalance" -> https://rebalance.sanity.studio
```

## Connect the website to the content

1. The **project id** is `s3xmc1k6` (see sanity.io/manage).
2. It's already set in the website's [`../web/assets/js/config.js`](../web/assets/js/config.js):
   ```js
   sanity: { projectId: "s3xmc1k6", dataset: "production", apiVersion: "2024-01-01" },
   ```
3. Allow the browser to read it: **sanity.io/manage → your project → API → CORS
   origins → Add origin** for:
   - `http://localhost:8087` (local preview — already added)
   - your live site URL (e.g. `https://rebalance.dk`)

   Leave "Allow credentials" **off**. (Read access is public; this just lets the
   browser fetch it.)

## Seed demo content

```bash
npx sanity dataset import seed-rebalance.ndjson production --replace
```

## Inviting Tanya

In **sanity.io/manage → Members → Invite**, add Tanya's email (free plan allows
multiple users). She then logs in at `https://rebalance.sanity.studio`.

## Day-to-day (Tanya)

Open the studio URL → **Therapy session** or **Gallery photo** → edit or
"+ Create" → choose the **category** (Group / Personal / Other), fill the fields,
set the **Booking calendar** / **Payment link** → **Publish**. The site updates
automatically.

## Local preview of the studio

```bash
npm run dev      # http://localhost:3333
```
