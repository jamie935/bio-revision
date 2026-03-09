import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJWT(token);

    const { data: rows } = await supabaseAdmin
      .from("card_performance")
      .select("*")
      .eq("user_id", payload.sub);

    // Transform to Record<cardId, CardPerformance> format for client
    const performance: Record<string, unknown> = {};
    for (const row of rows || []) {
      performance[row.card_id] = {
        cardId: row.card_id,
        correctCount: row.correct_count,
        incorrectCount: row.incorrect_count,
        streak: row.streak,
        lastSeen: row.last_seen ? new Date(row.last_seen).getTime() : 0,
        nextDue: row.next_due ? new Date(row.next_due).getTime() : 0,
        ease: row.ease,
        interval: row.interval_mins,
        topic: row.topic,
        subtopic: row.subtopic,
      };
    }

    return NextResponse.json({ performance });
  } catch {
    return NextResponse.json({ error: "Failed to load" }, { status: 500 });
  }
}
