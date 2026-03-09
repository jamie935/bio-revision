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

    const { data: user } = await supabaseAdmin
      .from("users")
      .select("has_paid, trial_ends_at, free_access")
      .eq("id", payload.sub)
      .single();

    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const trialEndsAt = new Date(user.trial_ends_at);
    const trialActive = trialEndsAt > new Date();
    const daysLeft = trialActive
      ? Math.ceil((trialEndsAt.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
      : 0;

    return NextResponse.json({
      hasPaid: user.has_paid,
      freeAccess: user.free_access,
      trialEndsAt: user.trial_ends_at,
      trialActive,
      hasAccess: user.has_paid || user.free_access || trialActive,
      daysLeft,
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
