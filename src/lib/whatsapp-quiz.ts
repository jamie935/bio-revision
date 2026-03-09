import { supabaseAdmin } from "@/lib/supabase/server";
import { subjects } from "@/data/subjects";
import type { Subject } from "@/data/subjects";
import type { Flashcard } from "@/data/flashcards";

interface QuizState {
  user_id: string;
  mode: string;
  current_card_id: string | null;
  quiz_subject: string | null;
  quiz_topic: string | null;
  quiz_score: number;
  quiz_total: number;
  quiz_cards_used: string[];
}

export async function getQuizState(userId: string): Promise<QuizState | null> {
  const { data } = await supabaseAdmin
    .from("whatsapp_state")
    .select("*")
    .eq("user_id", userId)
    .single();
  return data;
}

export async function startQuiz(
  userId: string,
  subject?: Subject,
  topic?: string
): Promise<{ message: string; cardId: string } | { message: string; cardId: null }> {
  // Pick subject if not specified
  const subj = subject || (["biology", "chemistry", "physics"] as Subject[])[
    Math.floor(Math.random() * 3)
  ];

  const pool = subjects[subj].flashcards.filter(
    (c) => !topic || c.topic === topic
  );

  if (pool.length === 0) {
    return { message: "No cards found for that topic. Try: quiz biology", cardId: null };
  }

  const card = pool[Math.floor(Math.random() * pool.length)];

  // Upsert state
  await supabaseAdmin.from("whatsapp_state").upsert({
    user_id: userId,
    mode: "quiz",
    current_card_id: card.id,
    quiz_subject: subj,
    quiz_topic: topic || null,
    quiz_score: 0,
    quiz_total: 0,
    quiz_cards_used: [card.id],
    updated_at: new Date().toISOString(),
  });

  const subjectName = subjects[subj].name;
  return {
    message: `*${subjectName} Quiz* 📝\n\n*Question 1:*\n${card.question}\n\n_Reply with your answer!_`,
    cardId: card.id,
  };
}

export function getCardById(cardId: string): Flashcard | null {
  for (const subj of ["biology", "chemistry", "physics"] as Subject[]) {
    const card = subjects[subj].flashcards.find((c) => c.id === cardId);
    if (card) return card;
  }
  return null;
}

export async function nextQuestion(
  userId: string,
  state: QuizState
): Promise<string> {
  const subj = state.quiz_subject as Subject;
  if (!subj) return endQuiz(userId, state);

  const pool = subjects[subj].flashcards.filter(
    (c) =>
      !state.quiz_cards_used.includes(c.id) &&
      (!state.quiz_topic || c.topic === state.quiz_topic)
  );

  // End after 5 questions or no more cards
  if (state.quiz_total >= 5 || pool.length === 0) {
    return endQuiz(userId, state);
  }

  const card = pool[Math.floor(Math.random() * pool.length)];

  await supabaseAdmin
    .from("whatsapp_state")
    .update({
      current_card_id: card.id,
      quiz_cards_used: [...state.quiz_cards_used, card.id],
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  return `*Question ${state.quiz_total + 1}:*\n${card.question}\n\n_Reply with your answer!_`;
}

export async function recordQuizAnswer(
  userId: string,
  state: QuizState,
  correct: boolean
): Promise<void> {
  await supabaseAdmin
    .from("whatsapp_state")
    .update({
      quiz_score: state.quiz_score + (correct ? 1 : 0),
      quiz_total: state.quiz_total + 1,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  // Also record in card_performance
  if (state.current_card_id) {
    const card = getCardById(state.current_card_id);
    if (card) {
      const { data: existing } = await supabaseAdmin
        .from("card_performance")
        .select("*")
        .eq("user_id", userId)
        .eq("card_id", card.id)
        .single();

      if (existing) {
        await supabaseAdmin
          .from("card_performance")
          .update({
            correct_count: existing.correct_count + (correct ? 1 : 0),
            incorrect_count: existing.incorrect_count + (correct ? 0 : 1),
            streak: correct ? existing.streak + 1 : 0,
            last_seen: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("id", existing.id);
      } else {
        await supabaseAdmin.from("card_performance").insert({
          user_id: userId,
          card_id: card.id,
          correct_count: correct ? 1 : 0,
          incorrect_count: correct ? 0 : 1,
          streak: correct ? 1 : 0,
          last_seen: new Date().toISOString(),
          ease: 2.5,
          interval_mins: correct ? 10 : 1,
          topic: card.topic,
          subtopic: card.subtopic,
        });
      }
    }
  }
}

export async function endQuiz(userId: string, state: QuizState): Promise<string> {
  await supabaseAdmin
    .from("whatsapp_state")
    .update({
      mode: "idle",
      current_card_id: null,
      updated_at: new Date().toISOString(),
    })
    .eq("user_id", userId);

  const pct = state.quiz_total > 0
    ? Math.round((state.quiz_score / state.quiz_total) * 100)
    : 0;

  const emoji = pct >= 80 ? "🎉" : pct >= 50 ? "👍" : "💪";

  return `*Quiz Complete!* ${emoji}\n\nScore: ${state.quiz_score}/${state.quiz_total} (${pct}%)\n\n${
    pct >= 80
      ? "Excellent work! Keep it up!"
      : pct >= 50
        ? "Good effort! Review the topics you got wrong."
        : "Keep practising — you'll improve!"
  }\n\n_Send "quiz me" to start another quiz._`;
}

// Parse quiz command: "quiz me", "quiz biology", "quiz physics forces"
export function parseQuizCommand(
  message: string
): { subject?: Subject; topic?: string } | null {
  const lower = message.toLowerCase().trim();

  if (!/^quiz\b/.test(lower)) return null;

  const parts = lower.replace(/^quiz\s*/, "").split(/\s+/);
  if (parts.length === 0 || (parts.length === 1 && parts[0] === "me")) {
    return {}; // random
  }

  const subjectMap: Record<string, Subject> = {
    biology: "biology",
    bio: "biology",
    chemistry: "chemistry",
    chem: "chemistry",
    physics: "physics",
    phys: "physics",
  };

  const subject = subjectMap[parts[0]];
  if (!subject) return {};

  const topicStr = parts.slice(1).join("-");
  if (topicStr) {
    // Try to match topic
    const topic = subjects[subject].topics.find(
      (t) =>
        t.id === topicStr ||
        t.name.toLowerCase().includes(parts.slice(1).join(" "))
    );
    return { subject, topic: topic?.id };
  }

  return { subject };
}
