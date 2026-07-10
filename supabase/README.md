# Re-balance — group booking backend (Supabase)

Self-service booking for the **semi-private 1:4** session. The private 1:1
sessions use Stripe payment links and do **not** touch this.

## What's here
- `migrations/0001_booking.sql` — tables (`recurring_rules`, `slots`, `bookings`) + the
  `materialize_slots`, `book_slot`, `cancel_booking` functions.
- `functions/list-slots` — returns upcoming, open, not-full slots.
- `functions/create-booking` — atomically books a seat (never overbooks 4) + emails confirmation.
- `functions/cancel-booking` — enforces the **24h cancellation cutoff** + emails cancellation.
- `functions/create-enquiry` — personal (1:1) session enquiry form → emails you (reply-to = client).

## One-time setup

1. **Create a Supabase project** (free tier) at supabase.com. Note the **Project URL** and
   the **anon key** (Project Settings → API) — both are safe for the browser.
2. **Create a Resend account** (free) and an API key. Optionally verify your sending domain so
   mail comes from e.g. `booking@your-domain`; until then it can send from `onboarding@resend.dev`.
3. Install the CLI and link:
   ```bash
   brew install supabase/tap/supabase
   supabase login
   supabase link --project-ref <your-project-ref>
   ```
4. **Apply the schema:**
   ```bash
   supabase db push
   ```
   (or paste `migrations/0001_booking.sql` into the SQL editor).
5. **Set function secrets** (server-side only — never in the site):
   ```bash
   supabase secrets set RESEND_API_KEY="re_..."
   supabase secrets set EMAIL_FROM="Re-balance <booking@your-domain>"
   supabase secrets set SITE_URL="https://valkov.github.io/rebalance"
   supabase secrets set ALLOWED_ORIGINS="https://valkov.github.io,http://localhost:8090"
   supabase secrets set ENQUIRY_TO="tanyabasse@gmail.com"   # where 1:1 enquiries are sent
   ```
   `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are injected automatically.
6. **Deploy the functions** (public — the booking page calls them from the browser):
   ```bash
   supabase functions deploy list-slots     --no-verify-jwt
   supabase functions deploy create-booking --no-verify-jwt
   supabase functions deploy cancel-booking --no-verify-jwt
   supabase functions deploy create-enquiry --no-verify-jwt
   ```

## Managing availability (Tanya)
Open the Supabase **Table editor → `recurring_rules`**. Each row is a weekly slot:
- `weekday` 0–6 (0 = Sunday … 2 = Tuesday … 6 = Saturday)
- `start_time` e.g. `17:00` (Copenhagen time)
- `capacity` e.g. `4`, `active` on/off

Slots for the next 8 weeks are generated automatically. See who's booked in the
**`bookings`** table.

## What the site needs
Only the **Project URL** and **anon key** go into the site config (public, safe). The booking
UI calls the three functions above.
