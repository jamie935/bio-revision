import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

interface CardPerformanceInput {
  cardId: string;
  correctCount: number;
  incorrectCount: number;
  streak: number;
  lastSeen: number;
  nextDue: number;
  ease: number;
  interval: number;
  topic: string;
  subtopic: string;
}

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session-token")?.value;
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const payload = await verifyJWT(token);
    const { performance } = (await request.json()) as {
      performance: Record<string, CardPerformanceInput>;
    };

    if (!performance || typeof performance !== "object") {
      return NextResponse.json({ error: "Invalid data" }, { status: 400 });
    }

    const entries = Object.values(performance);
    let synced = 0;

    // Batch upsert in groups of 50
    for (let i = 0; i < entries.length; i += 50) {
      const batch = entries.slice(i, i + 50).map((card) => ({
        user_id: payload.sub,
        card_id: card.cardId,
        correct_count: card.correctCount,
        incorrect_count: card.incorrectCount,
        streak: card.streak,
        last_seen: card.lastSeen ? new Date(card.lastSeen).toISOString() : null,
        next_due: card.nextDue ? new Date(card.nextDue).toISOString() : null,
        ease: card.ease,
        interval_mins: card.interval,
        topic: card.topic,
        subtopic: card.subtopic,
        updated_at: new Date().toISOString(),
      }));

      const { error } = await supabaseAdmin
        .from("card_performance")
        .upsert(batch, { onConflict: "user_id,card_id" });

      if (!error) synced += batch.length;
    }

    // Update last active
    await supabaseAdmin
      .from("users")
      .update({ last_active_at: new Date().toISOString() })
      .eq("id", payload.sub);

    return NextResponse.json({ success: true, synced });
  } catch {
    return NextResponse.json({ error: "Sync failed" }, { status: 500 });
  }
}
