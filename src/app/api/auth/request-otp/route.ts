import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendWhatsApp } from "@/lib/twilio";

export async function POST(request: Request) {
  try {
    const { phone } = await request.json();

    if (!phone || !/^\+\d{10,15}$/.test(phone)) {
      return NextResponse.json(
        { error: "Invalid phone number. Use E.164 format (e.g. +447123456789)" },
        { status: 400 }
      );
    }

    // Rate limit: max 3 OTP requests per phone per 15 minutes
    const { count } = await supabaseAdmin
      .from("otp_codes")
      .select("*", { count: "exact", head: true })
      .eq("phone", phone)
      .gte("created_at", new Date(Date.now() - 15 * 60 * 1000).toISOString());

    if ((count ?? 0) >= 3) {
      return NextResponse.json(
        { error: "Too many requests. Try again in 15 minutes." },
        { status: 429 }
      );
    }

    // Generate 6-digit OTP
    const code = Math.floor(100000 + Math.random() * 900000).toString();

    // Store OTP
    await supabaseAdmin.from("otp_codes").insert({
      phone,
      code,
      expires_at: new Date(Date.now() + 5 * 60 * 1000).toISOString(),
    });

    // Send via WhatsApp
    await sendWhatsApp(
      phone,
      `Your GCSE Revision login code is: ${code}\n\nIt expires in 5 minutes.`
    );

    // Log message
    await supabaseAdmin.from("message_log").insert({
      phone,
      direction: "outbound",
      message_type: "otp",
      content: `OTP sent to ${phone}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Request OTP error:", error);
    return NextResponse.json(
      { error: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
