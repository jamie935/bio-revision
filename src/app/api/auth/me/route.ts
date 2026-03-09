import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session-token")?.value;

    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const payload = await verifyJWT(token);

    // Check session not revoked
    const { data: session } = await supabaseAdmin
      .from("sessions")
      .select("*")
      .eq("token", payload.sid)
      .eq("revoked", false)
      .single();

    if (!session || new Date(session.expires_at) < new Date()) {
      return NextResponse.json({ error: "Session expired" }, { status: 401 });
    }

    // Fetch user
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", payload.sub)
      .single();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 401 });
    }

    // Update last active
    await supabaseAdmin
      .from("users")
      .update({ last_active_at: new Date().toISOString() })
      .eq("id", user.id);

    const hasAccess =
      user.has_paid || user.free_access || new Date(user.trial_ends_at) > new Date();

    return NextResponse.json({
      user: {
        id: user.id,
        phone: user.phone,
        displayName: user.display_name,
        role: user.role,
        hasAccess,
        trialEndsAt: user.trial_ends_at,
        hasPaid: user.has_paid,
        freeAccess: user.free_access,
      },
    });
  } catch {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }
}
