// POST /create-enquiry { firstName, lastName, email, phone, message, session } -> { ok: true }
// Emails a personal-session enquiry to Tanya (ENQUIRY_TO) via Resend.
import { cors, json, sendEmail } from "../_shared/util.ts";

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

    const to = Deno.env.get("ENQUIRY_TO");
    if (!to) return json({ error: "not_configured" }, 500, headers);

    const html =
      `<div style="font-family:Mulish,Arial,sans-serif;color:#404041;line-height:1.6">
        <h2>New session enquiry</h2>
        ${session ? `<p><strong>Session:</strong> ${esc(session)}</p>` : ""}
        <p><strong>Name:</strong> ${esc(firstName)} ${esc(lastName)}</p>
        <p><strong>Email:</strong> ${esc(email)}</p>
        <p><strong>Phone:</strong> ${esc(phone)}</p>
        ${message ? `<p><strong>Message:</strong><br>${esc(message).replace(/\n/g, "<br>")}</p>` : ""}
      </div>`;

    await sendEmail(to, `Session enquiry — ${firstName} ${lastName}`, html, email);
    return json({ ok: true }, 200, headers);
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500, headers);
  }
});
