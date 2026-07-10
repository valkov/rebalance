// POST /cancel-booking { token } -> { ok: true } | { error: "too_late" | ... }
// Enforces the 24h cancellation cutoff server-side and frees the seat.
import { cancellationHtml, cors, json, sendEmail, supabase } from "../_shared/util.ts";

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, headers);

  try {
    const body = await req.json().catch(() => ({}));
    const token = String(body.token ?? "");
    if (!token) return json({ error: "missing_token" }, 400, headers);

    const { data, error } = await supabase.rpc("cancel_booking", { p_token: token });
    if (error) {
      const m = String(error.message);
      if (m.includes("too_late")) return json({ error: "too_late" }, 422, headers);
      if (m.includes("already_cancelled")) return json({ error: "already_cancelled" }, 409, headers);
      if (m.includes("not_found")) return json({ error: "not_found" }, 404, headers);
      throw error;
    }

    // Look up the email to notify (cancel link carries only the token).
    const row = Array.isArray(data) ? data[0] : data;
    const { data: bk } = await supabase
      .from("bookings").select("email").eq("cancel_token", token).maybeSingle();
    if (bk?.email) {
      await sendEmail(bk.email, "Your Re-balance booking was cancelled", cancellationHtml(row.name, row.starts_at));
    }

    return json({ ok: true, starts_at: row.starts_at }, 200, headers);
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500, headers);
  }
});
