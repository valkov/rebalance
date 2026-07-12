// POST /create-booking { slot_id, name, email, phone } -> { ok: true }
// Atomically reserves a seat (never overbooks a 1:4 slot) and emails a
// confirmation with a cancel link.
import { confirmationHtml, cors, json, sendEmail, supabase } from "../_shared/util.ts";

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, headers);

  try {
    const body = await req.json().catch(() => ({}));
    const slot_id = String(body.slot_id ?? "");
    const name = String(body.name ?? "").trim();
    const email = String(body.email ?? "").trim();
    const phone = String(body.phone ?? "").trim();

    if (!slot_id || !name || !email || !phone) return json({ error: "missing_fields" }, 400, headers);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "bad_email" }, 400, headers);
    if (phone.replace(/\D/g, "").length < 6) return json({ error: "bad_phone" }, 400, headers);

    const { data, error } = await supabase.rpc("book_slot", {
      p_slot_id: slot_id, p_name: name, p_email: email, p_phone: phone,
    });
    if (error) {
      if (String(error.message).includes("slot_unavailable")) return json({ error: "slot_full" }, 409, headers);
      throw error;
    }

    const row = Array.isArray(data) ? data[0] : data;
    const siteUrl = Deno.env.get("SITE_URL") ?? "https://valkov.github.io/rebalance";
    const cancelUrl = `${siteUrl}/cancel.html?token=${row.cancel_token}`;
    const when = new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/Copenhagen", weekday: "long", day: "numeric", month: "long", hour: "2-digit", minute: "2-digit",
    }).format(new Date(row.starts_at));

    // confirmation to the client (best-effort)
    await sendEmail(email, "Your Re-balance session is confirmed", confirmationHtml(name, row.starts_at, cancelUrl));
    // notification to Tanya so she sees new bookings by email too (best-effort)
    const notify = Deno.env.get("ENQUIRY_TO");
    if (notify) {
      await sendEmail(notify, `Group booking — ${name}`,
        `<div style="font-family:Mulish,Arial,sans-serif;color:#404041;line-height:1.6">
          <h2>New group-session booking</h2>
          <p><strong>When:</strong> ${when} (Copenhagen)</p>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
        </div>`, email);
    }

    return json({ ok: true }, 200, headers);
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500, headers);
  }
});
