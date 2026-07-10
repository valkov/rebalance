// Shared helpers for the booking Edge Functions.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Service-role client — bypasses RLS. Only ever runs server-side in the function.
export const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
);

// Origins allowed to call the functions from the browser.
// Set with: supabase secrets set ALLOWED_ORIGINS="https://valkov.github.io,http://localhost:8090"
const ALLOWED = (Deno.env.get("ALLOWED_ORIGINS") ?? "")
  .split(",").map((s) => s.trim()).filter(Boolean);

export function cors(origin: string | null): Record<string, string> {
  const allow = origin && (ALLOWED.length === 0 || ALLOWED.includes(origin))
    ? origin
    : (ALLOWED[0] ?? "*");
  return {
    "Access-Control-Allow-Origin": allow,
    "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
    "Access-Control-Allow-Headers": "content-type, authorization, apikey, x-client-info",
    "Vary": "Origin",
  };
}

export function json(body: unknown, status: number, headers: Record<string, string>) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...headers, "content-type": "application/json" },
  });
}

// Human-readable slot time in the practice's timezone.
export function fmtWhen(iso: string): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Copenhagen",
    weekday: "long", day: "numeric", month: "long",
    hour: "2-digit", minute: "2-digit",
  }).format(new Date(iso));
}

// Send an email via Resend. Best-effort: never throws (a failed email must not
// roll back a completed booking).
export async function sendEmail(to: string, subject: string, html: string, replyTo?: string): Promise<void> {
  const key = Deno.env.get("RESEND_API_KEY");
  const from = Deno.env.get("EMAIL_FROM") ?? "Re-balance <onboarding@resend.dev>";
  if (!key) return;
  try {
    const body: Record<string, unknown> = { from, to, subject, html };
    if (replyTo) body.reply_to = replyTo;
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "content-type": "application/json" },
      body: JSON.stringify(body),
    });
  } catch (_e) { /* swallow */ }
}

const WRAP = (inner: string) =>
  `<div style="font-family:Mulish,Arial,sans-serif;color:#404041;max-width:520px;margin:0 auto;line-height:1.6">${inner}
   <p style="color:#8a8a89;font-size:12px;margin-top:28px">Re-balance · Tanya Basse</p></div>`;

export function confirmationHtml(name: string, whenIso: string, cancelUrl: string): string {
  return WRAP(
    `<h2 style="font-weight:700">You're booked in 🌿</h2>
     <p>Hi ${escapeHtml(name)}, your semi-private session is confirmed for:</p>
     <p style="font-size:18px;font-weight:700">${fmtWhen(whenIso)} (Copenhagen time)</p>
     <p>Need to cancel? You can do so up to <strong>24 hours before</strong> the session:</p>
     <p><a href="${cancelUrl}" style="background:#111;color:#fff;padding:10px 18px;text-decoration:none;display:inline-block">Cancel my booking</a></p>
     <p style="color:#8a8a89;font-size:13px">Within 24 hours of the start time, cancellation is no longer possible — please reach out directly.</p>`,
  );
}

export function cancellationHtml(name: string, whenIso: string): string {
  return WRAP(
    `<h2 style="font-weight:700">Booking cancelled</h2>
     <p>Hi ${escapeHtml(name)}, your session on <strong>${fmtWhen(whenIso)}</strong> has been cancelled and your seat released.</p>
     <p>You're welcome to book another time whenever you like.</p>`,
  );
}

function escapeHtml(s: string): string {
  return String(s).replace(/[<>&"]/g, (c) =>
    ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;" }[c] as string));
}
