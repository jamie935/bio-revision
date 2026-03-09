import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/server";
import { sendWhatsApp } from "@/lib/twilio";
import { searchFlashcards, getConversationalAnswer, evaluateAnswer } from "@/lib/whatsapp-bot";
import {
  getQuizState,
  startQuiz,
  getCardById,
  nextQuestion,
  recordQuizAnswer,
  endQuiz,
  parseQuizCommand,
} from "@/lib/whatsapp-quiz";
import {
  getPreferences,
  setPreference,
  setAllPreferences,
  formatPreferencesMessage,
  parseReminderCommand,
} from "@/lib/whatsapp-reminders";

export async function POST(request: Request) {
  try {
    // Twilio sends form-urlencoded data
    const formData = await request.formData();
    const body = formData.get("Body")?.toString()?.trim() || "";
    const from = formData.get("From")?.toString() || "";
    const phone = from.replace("whatsapp:", "");

    if (!body || !phone) {
      return new NextResponse("OK", { status: 200 });
    }

    // Look up user
    const { data: user } = await supabaseAdmin
      .from("users")
      .select("*")
      .eq("phone", phone)
      .single();

    if (!user) {
      await sendWhatsApp(
        phone,
        `👋 Welcome to GCSE Revision Bot!\n\nTo get started, sign up at ${process.env.NEXT_PUBLIC_APP_URL || "the app"} using your phone number.\n\nOnce registered, you can:\n📚 Ask any GCSE question\n🧠 Take quick quizzes\n📊 Track your progress\n\nSign up now and get a 7-day free trial! 🎓`
      );
      return new NextResponse("OK", { status: 200 });
    }

    // Check access
    const hasAccess =
      user.has_paid ||
      user.free_access ||
      new Date(user.trial_ends_at) > new Date();

    if (!hasAccess) {
      await sendWhatsApp(
        phone,
        `Your trial has ended. Get lifetime access at ${process.env.NEXT_PUBLIC_APP_URL || "the app"} to continue using the study bot.`
      );
      return new NextResponse("OK", { status: 200 });
    }

    // Log inbound message
    await supabaseAdmin.from("message_log").insert({
      user_id: user.id,
      phone,
      direction: "inbound",
      message_type: "query",
      content: body,
    });

    // Update last_active_at
    await supabaseAdmin
      .from("users")
      .update({ last_active_at: new Date().toISOString() })
      .eq("id", user.id);

    const lower = body.toLowerCase().trim();

    // Handle help/welcome commands
    if (/^(hi|hello|hey|start|help|menu|commands)\b/i.test(lower)) {
      const welcomeMsg = `👋 *Welcome to GCSE Revision Bot!*

Here's what I can do:

📚 *Ask a question*
Just type any GCSE question and I'll answer it using our flashcard database.
Example: _"What is mitosis?"_

🧠 *Start a quiz*
• \`quiz me\` — random subject
• \`quiz biology\` — biology questions
• \`quiz physics forces\` — specific topic
• \`quiz chemistry\` — chemistry questions

During a quiz:
• Just type your answer to reply
• \`skip\` — skip a question
• \`done\` — end the quiz & see your score

⏰ *Reminders*
• \`reminders\` — see your settings
• \`reminders on/off\` — all reminders on/off
• \`reminders biology off\` — turn off a subject

❓ *Get this menu again*
Type \`help\` anytime

Good luck with your revision! 🎓`;

      await sendReply(user.id, phone, welcomeMsg, "response");
      return new NextResponse("OK", { status: 200 });
    }

    // Handle reminder commands
    const reminderCmd = parseReminderCommand(lower);
    if (reminderCmd) {
      if (reminderCmd.action === "show") {
        const prefs = await getPreferences(user.id);
        const msg = formatPreferencesMessage(prefs, user.whatsapp_opted_in);
        await sendReply(user.id, phone, msg, "response");
      } else if (reminderCmd.action === "toggle_all") {
        await setAllPreferences(user.id, reminderCmd.enabled!);
        const status = reminderCmd.enabled ? "ON ✅" : "OFF ❌";
        await sendReply(
          user.id,
          phone,
          `All reminders turned *${status}*\n\nType \`reminders\` to see your settings.`,
          "response"
        );
      } else if (reminderCmd.action === "toggle_subject") {
        await setPreference(user.id, reminderCmd.subject!, reminderCmd.enabled!);
        const name =
          reminderCmd.subject!.charAt(0).toUpperCase() +
          reminderCmd.subject!.slice(1);
        const status = reminderCmd.enabled ? "ON ✅" : "OFF ❌";
        await sendReply(
          user.id,
          phone,
          `${name} reminders turned *${status}*\n\nType \`reminders\` to see all settings.`,
          "response"
        );
      }
      return new NextResponse("OK", { status: 200 });
    }

    // Get current quiz state
    const quizState = await getQuizState(user.id);

    // Handle stop/done commands
    if (
      quizState?.mode === "quiz" &&
      /^(stop|done|end|quit|exit)/i.test(lower)
    ) {
      const msg = await endQuiz(user.id, quizState);
      await sendReply(user.id, phone, msg, "quiz_answer");
      return new NextResponse("OK", { status: 200 });
    }

    // Handle skip command
    if (quizState?.mode === "quiz" && /^skip/i.test(lower)) {
      const card = quizState.current_card_id
        ? getCardById(quizState.current_card_id)
        : null;
      if (card) {
        const skipMsg = `*Answer:* ${card.answer}\n\n*Key points:* ${card.keyPoints.join(", ")}`;
        await sendReply(user.id, phone, skipMsg, "quiz_answer");
      }
      // Record as incorrect
      await recordQuizAnswer(user.id, quizState, false);
      const updatedState = await getQuizState(user.id);
      const nextMsg = await nextQuestion(user.id, updatedState!);
      await sendReply(user.id, phone, nextMsg, "quiz_question");
      return new NextResponse("OK", { status: 200 });
    }

    // Handle quiz start command
    const quizCmd = parseQuizCommand(lower);
    if (quizCmd !== null) {
      const result = await startQuiz(user.id, quizCmd.subject, quizCmd.topic);
      await sendReply(user.id, phone, result.message, "quiz_question");
      return new NextResponse("OK", { status: 200 });
    }

    // Handle quiz answer (user is in quiz mode and sent a reply)
    if (quizState?.mode === "quiz" && quizState.current_card_id) {
      const card = getCardById(quizState.current_card_id);
      if (card) {
        const evaluation = await evaluateAnswer(card, body);
        await recordQuizAnswer(user.id, quizState, evaluation.correct);

        const icon = evaluation.correct ? "✅" : "❌";
        const feedbackMsg = `${icon} ${evaluation.feedback}\n\n*Correct answer:* ${card.answer}`;
        await sendReply(user.id, phone, feedbackMsg, "quiz_answer");

        const updatedState = await getQuizState(user.id);
        const nextMsg = await nextQuestion(user.id, updatedState!);
        await sendReply(user.id, phone, nextMsg, "quiz_question");

        return new NextResponse("OK", { status: 200 });
      }
    }

    // Conversation mode: search flashcards and get AI answer
    const relevantCards = searchFlashcards(body, 5);
    const answer = await getConversationalAnswer(body, relevantCards);
    await sendReply(user.id, phone, answer, "response");

    return new NextResponse("OK", { status: 200 });
  } catch (error) {
    console.error("WhatsApp webhook error:", error);
    return new NextResponse("OK", { status: 200 });
  }
}

async function sendReply(
  userId: string,
  phone: string,
  message: string,
  type: string
) {
  await sendWhatsApp(phone, message);
  await supabaseAdmin.from("message_log").insert({
    user_id: userId,
    phone,
    direction: "outbound",
    message_type: type,
    content: message.slice(0, 500),
  });
}
