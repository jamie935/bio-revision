import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("session-token")?.value;

    if (token) {
      const payload = await verifyJWT(token);
      await supabaseAdmin
        .from("sessions")
        .update({ revoked: true })
        .eq("token", payload.sid);
    }

    cookieStore.delete("session-token");

    return NextResponse.json({ success: true });
  } catch {
    // Clear cookie even if JWT verification fails
    const cookieStore = await cookies();
    cookieStore.delete("session-token");
    return NextResponse.json({ success: true });
  }
}
