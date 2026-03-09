import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { signJWT } from "@/lib/auth/jwt";
import { cookies } from "next/headers";
import { sendWhatsApp } from "@/lib/twilio";

export async function POST(request: Request) {
  try {
    const { phone, code } = await request.json();

    if (!phone || !code) {
      return NextResponse.json(
        { error: "Phone and code are required" },
        { status: 400 }
      );
    }

    // Find latest unverified OTP for this phone
    const { data: otp } = await supabaseAdmin
      .from("otp_codes")
      .select("*")
      .eq("phone", phone)
      .eq("verified", false)
      .gte("expires_at", new Date().toISOString())
      .order("created_at", { ascending: false })
      .limit(1)
      .single();

    if (!otp) {
      return NextResponse.json(
        { error: "No valid OTP found. Request a new one." },
        { status: 401 }
      );
    }

    // Check attempts
    if (otp.attempts >= 3) {
      return NextResponse.json(
        { error: "Too many attempts. Request a new code." },
        { status: 429 }
      );
    }

    // Increment attempts
    await supabaseAdmin
      .from("otp_codes")
      .update({ attempts: otp.attempts + 1 })
      .eq("id", otp.id);

    // Verify code
    if (otp.code !== code) {
      return NextResponse.json(
        { error: "Incorrect code" },
        { status: 401 }
      );
    }

    // Mark OTP as verified
    await supabaseAdmin
      .from("otp_codes")
      .update({ verified: true })
      .eq("id", otp.id);

    // Upsert user
    const { data: existingUser } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    let userId: string;

    if (existingUser) {
      userId = existingUser.id;
      await supabaseAdmin
        .from("users")
        .update({ last_active_at: new Date().toISOString() })
        .eq("id", userId);
    } else {
      const { data: newUser } = await supabaseAdmin
        .from("users")
        .insert({
          phone,
          trial_ends_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
          last_active_at: new Date().toISOString(),
        })
        .select()
        .single();
      userId = newUser!.id;

      // Fire-and-forget welcome message (don't block auth response)
      sendWhatsApp(
        phone,
        `🎓 Welcome to GCSE Revision Bot!\n\nYour account is set up and you have a 7-day free trial.\n\nYou can text me anytime to:\n📚 Ask GCSE questions\n🧠 Take quick quizzes — just say "quiz me"\n📊 Track your progress\n⏰ Set reminder preferences — say "reminders"\n\nType "help" for all commands.\n\nGood luck with your revision! 💪`
      ).catch((err) => console.error("Welcome message failed:", err));
    }

    // Create session
    const token = crypto.randomUUID() + "-" + crypto.randomUUID();
    const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

    await supabaseAdmin.from("sessions").insert({
      user_id: userId,
      token,
      expires_at: expiresAt.toISOString(),
    });

    // Sign JWT
    const jwt = await signJWT({ sub: userId, sid: token });

    // Set cookie
    const cookieStore = await cookies();
    cookieStore.set("session-token", jwt, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: expiresAt,
    });

    // Fetch full user for response
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    const hasAccess =
      user!.has_paid ||
      user!.free_access ||
      new Date(user!.trial_ends_at) > new Date();

    return NextResponse.json({
      token: jwt,
      user: {
        id: user!.id,
        phone: user!.phone,
        displayName: user!.display_name,
        role: user!.role,
        hasAccess,
        trialEndsAt: user!.trial_ends_at,
        hasPaid: user!.has_paid,
        freeAccess: user!.free_access,
      },
    });
  } catch (error) {
    console.error("Verify OTP error:", error);
    return NextResponse.json(
      { error: "Verification failed" },
      { status: 500 }
    );
  }
}
