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
    const { data: admin } = await supabaseAdmin
      .from("users")
      .select("role")
      .eq("id", payload.sub)
      .single();

    if (!admin || (admin.role !== "admin" && admin.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const now = new Date();
    const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();

    const [
      { count: totalUsers },
      { count: activeThisWeek },
      { count: paidUsers },
      { count: freeAccessUsers },
      { count: trialUsers },
    ] = await Promise.all([
      supabaseAdmin.from("users").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("users").select("*", { count: "exact", head: true }).gte("last_active_at", weekAgo),
      supabaseAdmin.from("users").select("*", { count: "exact", head: true }).eq("has_paid", true),
      supabaseAdmin.from("users").select("*", { count: "exact", head: true }).eq("free_access", true),
      supabaseAdmin.from("users").select("*", { count: "exact", head: true }).eq("has_paid", false).eq("free_access", false).gte("trial_ends_at", now.toISOString()),
    ]);

    return NextResponse.json({
      totalUsers: totalUsers || 0,
      activeThisWeek: activeThisWeek || 0,
      paidUsers: paidUsers || 0,
      freeAccessUsers: freeAccessUsers || 0,
      trialUsers: trialUsers || 0,
    });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
