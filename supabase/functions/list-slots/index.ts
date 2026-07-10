// GET /list-slots -> { slots: [{ id, starts_at, duration_min, remaining, capacity }] }
// Materialises upcoming slots from the recurring rules, then returns the
// future, open, not-yet-full ones.
import { cors, json, supabase } from "../_shared/util.ts";

Deno.serve(async (req) => {
  const headers = cors(req.headers.get("origin"));
  if (req.method === "OPTIONS") return new Response("ok", { headers });

  try {
    await supabase.rpc("materialize_slots", { p_weeks: 8 });

    const { data, error } = await supabase
      .from("slots")
      .select("id, starts_at, duration_min, capacity, booked, status")
      .eq("status", "open")
      .gt("starts_at", new Date().toISOString())
      .order("starts_at", { ascending: true });
    if (error) throw error;

    const slots = (data ?? [])
      .map((s) => ({
        id: s.id,
        starts_at: s.starts_at,
        duration_min: s.duration_min,
        capacity: s.capacity,
        remaining: s.capacity - s.booked,
      }))
      .filter((s) => s.remaining > 0);

    return json({ slots }, 200, headers);
  } catch (e) {
    return json({ error: String((e as Error)?.message ?? e) }, 500, headers);
  }
});
