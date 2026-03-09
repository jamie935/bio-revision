import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendWhatsApp } from "@/lib/twilio";

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    let sentReminders = 0;
    let sentStreakAlerts = 0;

    // 1. Study reminders: users inactive > 2 days with access
    const twoDaysAgo = new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString();

    const { data: inactiveUsers } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("whatsapp_opted_in", true)
      .lt("last_active_at", twoDaysAgo)
      .or(`has_paid.eq.true,free_access.eq.true,trial_ends_at.gt.${new Date().toISOString()}`);

    for (const user of inactiveUsers || []) {
      const daysSince = Math.floor(
        (Date.now() - new Date(user.last_active_at).getTime()) / (1000 * 60 * 60 * 24)
      );

      // Get due cards count
      const { count: dueCount } = await supabaseAdmin
        .from("card_performance")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .lt("next_due", new Date().toISOString());

      const msg = `Hey${user.display_name ? ` ${user.display_name}` : ""}! 📚\n\nYou haven't revised in ${daysSince} days.${
        dueCount ? ` You have ${dueCount} cards due for review.` : ""
      }\n\nOpen the app to keep your knowledge fresh: ${process.env.NEXT_PUBLIC_APP_URL}`;

      try {
        await sendWhatsApp(user.phone, msg);
        await supabaseAdmin.from("message_log").insert({
          user_id: user.id,
          phone: user.phone,
          direction: "outbound",
          message_type: "reminder",
          content: msg.slice(0, 500),
        });
        sentReminders++;
      } catch (err) {
        console.error(`Failed to send reminder to ${user.phone}:`, err);
      }
    }

    // 2. Streak alerts: users who studied yesterday but not today
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);

    const { data: activeYesterday } = await supabaseAdmin
      .from("study_sessions")
      .select("user_id")
      .gte("started_at", yesterday.toISOString())
      .lt("started_at", today.toISOString());

    const yesterdayUserIds = Array.from(new Set(activeYesterday?.map((s) => s.user_id) || []));

    if (yesterdayUserIds.length > 0) {
      // Check who hasn't studied today
      const { data: activeToday } = await supabaseAdmin
        .from("study_sessions")
        .select("user_id")
        .gte("started_at", today.toISOString())
        .in("user_id", yesterdayUserIds);

      const todayUserIds = new Set(activeToday?.map((s) => s.user_id) || []);
      const atRisk = yesterdayUserIds.filter((id) => !todayUserIds.has(id));

      for (const userId of atRisk) {
        const { data: user } = await supabaseAdmin
          .from("users")
          .select("*")
          .eq("id", userId)
          .eq("whatsapp_opted_in", true)
          .single();

        if (user) {
          const msg = `Your study streak is at risk! 🔥\n\nDon't break the chain — even a quick 5-minute quiz counts.\n\n${process.env.NEXT_PUBLIC_APP_URL}`;
          try {
            await sendWhatsApp(user.phone, msg);
            sentStreakAlerts++;
          } catch (err) {
            console.error(`Failed to send streak alert to ${user.phone}:`, err);
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      reminders: sentReminders,
      streakAlerts: sentStreakAlerts,
    });
  } catch (error) {
    console.error("Daily cron error:", error);
    return NextResponse.json({ error: "Cron failed" }, { status: 500 });
  }
}
