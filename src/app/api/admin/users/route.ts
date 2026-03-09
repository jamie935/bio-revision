import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { verifyJWT } from "@/lib/auth/jwt";
import { cookies } from "next/headers";

async function getAuthUser() {
  const cookieStore = await cookies();
  const token = cookieStore.get("session-token")?.value;
  if (!token) return null;
  const payload = await verifyJWT(token);
  const { data: user } = await supabaseAdmin
    .from("users")
    .select("*")
    .eq("id", payload.sub)
    .single();
  return user;
}

// GET: List all users (admin only)
export async function GET(request: Request) {
  try {
    const admin = await getAuthUser();
    if (!admin || (admin.role !== "admin" && admin.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const url = new URL(request.url);
    const search = url.searchParams.get("search") || "";
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = 50;
    const offset = (page - 1) * limit;

    let query = supabaseAdmin
      .from("users")
      .select("*", { count: "exact" })
      .order("created_at", { ascending: false })
      .range(offset, offset + limit - 1);

    if (search) {
      query = query.or(`phone.ilike.%${search}%,display_name.ilike.%${search}%`);
    }

    const { data: users, count } = await query;

    // Get card counts per user
    const userIds = users?.map((u) => u.id) || [];
    const { data: perfCounts } = await supabaseAdmin
      .from("card_performance")
      .select("user_id")
      .in("user_id", userIds);

    const cardCounts: Record<string, number> = {};
    for (const row of perfCounts || []) {
      cardCounts[row.user_id] = (cardCounts[row.user_id] || 0) + 1;
    }

    const enriched = (users || []).map((u) => ({
      id: u.id,
      phone: u.phone,
      displayName: u.display_name,
      role: u.role,
      hasPaid: u.has_paid,
      freeAccess: u.free_access,
      trialEndsAt: u.trial_ends_at,
      createdAt: u.created_at,
      lastActiveAt: u.last_active_at,
      cardsAnswered: cardCounts[u.id] || 0,
    }));

    return NextResponse.json({ users: enriched, total: count, page, limit });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}

// PATCH: Update user (admin: free_access; super_admin: role)
export async function PATCH(request: Request) {
  try {
    const admin = await getAuthUser();
    if (!admin || (admin.role !== "admin" && admin.role !== "super_admin")) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const { userId, freeAccess, role } = await request.json();

    if (!userId) {
      return NextResponse.json({ error: "userId required" }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};

    // Free access toggle (any admin)
    if (typeof freeAccess === "boolean") {
      updates.free_access = freeAccess;
      updates.granted_by = freeAccess ? admin.id : null;
    }

    // Role change (super_admin only)
    if (role && typeof role === "string") {
      if (admin.role !== "super_admin") {
        return NextResponse.json(
          { error: "Only super_admin can change roles" },
          { status: 403 }
        );
      }
      if (!["user", "admin", "super_admin"].includes(role)) {
        return NextResponse.json({ error: "Invalid role" }, { status: 400 });
      }
      updates.role = role;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json({ error: "No updates provided" }, { status: 400 });
    }

    await supabaseAdmin.from("users").update(updates).eq("id", userId);

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed" }, { status: 500 });
  }
}
