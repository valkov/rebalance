// POST /create-enquiry { firstName, lastName, email, phone, message, session } -> { ok: true }
// Saves a personal-session enquiry to the DB (source of truth) and, best-effort,
// emails a notification to ENQUIRY_TO via Resend.
import { cors, enquiryConfirmationHtml, json, sendEmail, supabase } from "../_shared/util.ts";

function esc(s: string): string {
  return String(s ?? "").replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c] as string));
}

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });
  if (req.method !== "POST") return json({ error: "method_not_allowed" }, 405, headers);

  try {
    const b = await req.json().catch(() => ({}));
    const firstName = String(b.firstName ?? "").trim();
    const lastName = String(b.lastName ?? "").trim();
    const email = String(b.email ?? "").trim();
    const phone = String(b.phone ?? "").trim();
    const message = String(b.message ?? "").trim();
    const session = String(b.session ?? "").trim();

    if (!firstName || !lastName || !email || !phone) return json({ error: "missing_fields" }, 400, headers);
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return json({ error: "bad_email" }, 400, headers);
    if (phone.replace(/\D/g, "").length < 6) return json({ error: "bad_phone" }, 400, headers);

    // 1) Persist to the DB — this is the reliable record (survives email failures).
    const { error: insErr } = await supabase.from("enquiries").insert({
      session, first_name: firstName, last_name: lastName, email, phone, message,
    });
    if (insErr) throw insErr;

    // 2) Best-effort email notification (won't fail the request).
    const to = Deno.env.get("ENQUIRY_TO");
    if (to) {
      const html =
        `<div style="font-family:Mulish,Arial,sans-serif;color:#404041;line-height:1.6">
          <h2>New session enquiry</h2>
          ${session ? `<p><strong>Session:</strong> ${esc(session)}</p>` : ""}
          <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
          <p><strong>Email:</strong> ${esc(email)}</p>
          <p><strong>Phone:</strong> ${esc(phone)}</p>
          ${message ? `<p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>` : ""}
        </div>`;
      await sendEmail(to, `Private booking — ${firstName} ${lastName}`, html, email);
    }

    // 3) Best-effort confirmation to the client (no date — Tanya arranges the
    // time). Reply-to points at Tanya so replies reach her.
    await sendEmail(
      email,
      "Your Re-balance session request 🌿",
      enquiryConfirmationHtml(firstName, session),
      to ?? undefined,
    );
    return json({ ok: true }, 200, headers);
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500, headers);
  }
});
