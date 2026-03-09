import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendWhatsApp } from "@/lib/twilio";

export async function GET(request: Request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let sent = 0;
    const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString();

    // Get all active users with opt-in
    const { data: users } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("whatsapp_opted_in", true)
      .or(`has_paid.eq.true,free_access.eq.true,trial_ends_at.gt.${new Date().toISOString()}`);

    for (const user of users || []) {
      // Get study sessions from last week
      const { data: sessions } = await supabaseAdmin
        .from("study_sessions")
        .select("*")
        .eq("user_id", user.id)
        .gte("started_at", weekAgo);

      const totalSessions = sessions?.length || 0;
      const totalAnswered = sessions?.reduce((s, x) => s + x.total_answered, 0) || 0;
      const totalCorrect = sessions?.reduce((s, x) => s + x.correct, 0) || 0;
      const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

      // Get mastered cards count
      const { count: mastered } = await supabaseAdmin
        .from("card_performance")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("streak", 3);

      if (totalSessions === 0) continue; // Skip users who didn't study

      const msg = `*Weekly Progress Report* 📊\n\n` +
        `Sessions: ${totalSessions}\n` +
        `Cards answered: ${totalAnswered}\n` +
        `Accuracy: ${accuracy}%\n` +
        `Cards mastered: ${mastered || 0}\n\n` +
        `${accuracy >= 80 ? "Amazing work this week! 🎉" : accuracy >= 50 ? "Good progress! Keep pushing! 💪" : "Every session counts — keep going! 📚"}\n\n` +
        `${process.env.NEXT_PUBLIC_APP_URL}`;

      try {
        await sendWhatsApp(user.phone, msg);
        await supabaseAdmin.from("message_log").insert({
          user_id: user.id,
          phone: user.phone,
          direction: "outbound",
          message_type: "progress_report",
          content: msg.slice(0, 500),
        });
        sent++;
      } catch (err) {
        console.error(`Failed to send report to ${user.phone}:`, err);
      }
    }

    return NextResponse.json({ success: true, sent });
  } catch (error) {
    console.error("Weekly report cron error:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
