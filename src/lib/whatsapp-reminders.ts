import { supabaseAdmin } from "@/lib/supabase/server";
import type { Subject } from "@/data/subjects";

const ALL_SUBJECTS: Subject[] = ["biology", "chemistry", "physics"];

const SUBJECT_ALIASES: Record<string, Subject> = {
  biology: "biology",
  bio: "biology",
  chemistry: "chemistry",
  chem: "chemistry",
  physics: "physics",
  phys: "physics",
};

export interface ReminderPreference {
  subject: Subject;
  enabled: boolean;
}

// Get reminder preferences for a user (defaults to all enabled if no rows exist)
export async function getPreferences(
  userId: string
): Promise<ReminderPreference[]> {
  const { data } = await supabaseAdmin
    .from("reminder_preferences")
    .select("subject, enabled")
    .eq("user_id", userId);

  const existing = new Map(
    (data || []).map((r) => [r.subject as Subject, r.enabled as boolean])
  );

  return ALL_SUBJECTS.map((subj) => ({
    subject: subj,
    enabled: existing.has(subj) ? existing.get(subj)! : true,
  }));
}

// Get only enabled subjects for a user
export async function getEnabledSubjects(userId: string): Promise<Subject[]> {
  const prefs = await getPreferences(userId);
  return prefs.filter((p) => p.enabled).map((p) => p.subject);
}

// Set a single subject preference
export async function setPreference(
  userId: string,
  subject: Subject,
  enabled: boolean
): Promise<void> {
  await supabaseAdmin.from("reminder_preferences").upsert(
    {
      user_id: userId,
      subject,
      enabled,
    },
    { onConflict: "user_id,subject" }
  );
}

// Set all subject preferences at once
export async function setAllPreferences(
  userId: string,
  enabled: boolean
): Promise<void> {
  for (const subject of ALL_SUBJECTS) {
    await setPreference(userId, subject, enabled);
  }

  // Also update the global whatsapp_opted_in flag
  await supabaseAdmin
    .from("users")
    .update({ whatsapp_opted_in: enabled })
    .eq("id", userId);
}

// Format preferences as a WhatsApp-friendly message
export function formatPreferencesMessage(
  prefs: ReminderPreference[],
  optedIn: boolean
): string {
  const lines = prefs.map((p) => {
    const icon = p.enabled ? "✅" : "❌";
    const name = p.subject.charAt(0).toUpperCase() + p.subject.slice(1);
    return `${icon} ${name}`;
  });

  const globalStatus = optedIn ? "ON" : "OFF";

  return `⏰ *Your Reminder Settings*\n\nReminders: *${globalStatus}*\n\n${lines.join("\n")}\n\n*Commands:*\n• \`reminders on\` / \`reminders off\` — all reminders\n• \`reminders biology off\` — toggle a subject\n• \`reminders chemistry on\` — toggle a subject`;
}

// Parse a reminder command and return the action to take
export function parseReminderCommand(
  message: string
): {
  action: "show" | "toggle_all" | "toggle_subject";
  enabled?: boolean;
  subject?: Subject;
} | null {
  const lower = message.toLowerCase().trim();

  // Must start with "reminder" or "reminders"
  if (!/^reminders?\b/.test(lower)) return null;

  const rest = lower.replace(/^reminders?\s*/, "").trim();

  // Just "reminders" — show current settings
  if (!rest) return { action: "show" };

  // "reminders on" or "reminders off"
  if (rest === "on") return { action: "toggle_all", enabled: true };
  if (rest === "off") return { action: "toggle_all", enabled: false };

  // "reminders biology on" or "reminders bio off" etc.
  const parts = rest.split(/\s+/);
  const subjectKey = parts[0];
  const subject = SUBJECT_ALIASES[subjectKey];

  if (!subject) return null;

  // "reminders biology" without on/off — toggle (show current for that subject)
  if (parts.length === 1) {
    // Default: show preferences
    return { action: "show" };
  }

  const toggle = parts[1];
  if (toggle === "on") return { action: "toggle_subject", subject, enabled: true };
  if (toggle === "off") return { action: "toggle_subject", subject, enabled: false };

  return null;
}
