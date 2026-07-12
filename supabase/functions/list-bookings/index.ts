// GET /list-bookings  (auth via x-admin-key header or ?key=) -> { sessions: [...] }
// Private overview of group bookings — service-role read of PII, gated by ADMIN_KEY.
import { cors, json, supabase } from "../_shared/util.ts";

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });

  const url = new URL(req.url);
  const key = req.headers.get("x-admin-key") || url.searchParams.get("key") || "";
  const expected = Deno.env.get("ADMIN_KEY");
  if (!expected || key !== expected) return json({ error: "unauthorized" }, 401, headers);

  try {
    const { data, error } = await supabase
      .from("bookings")
      .select("name, email, phone, created_at, status, slots(id, starts_at, capacity, booked)")
      .eq("status", "booked");
    if (error) throw error;

    // group by slot
    const bySlot: Record<string, any> = {};
    (data ?? []).forEach((b: any) => {
      const s = b.slots;
      if (!s) return;
      if (!bySlot[s.id]) bySlot[s.id] = { starts_at: s.starts_at, capacity: s.capacity, booked: s.booked, attendees: [] };
      bySlot[s.id].attendees.push({ name: b.name, email: b.email, phone: b.phone, created_at: b.created_at });
    });
    const sessions = Object.values(bySlot).sort((a: any, b: any) => a.starts_at.localeCompare(b.starts_at));

    return json({ sessions, total: (data ?? []).length }, 200, headers);
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500, headers);
  }
});
