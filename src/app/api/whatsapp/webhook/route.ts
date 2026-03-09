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
        `Welcome! Sign up at ${process.env.NEXT_PUBLIC_APP_URL || "the app"} to use the GCSE study bot.`
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

    const lower = body.toLowerCase().trim();

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
      let msg = card
        ? `*Answer:* ${card.answer}\n\n*Key points:* ${card.keyPoints.join(", ")}\n\n`
        : "";
      // Record as incorrect
      await recordQuizAnswer(user.id, quizState, false);
      const updatedState = await getQuizState(user.id);
      msg += await nextQuestion(user.id, updatedState!);
      await sendReply(user.id, phone, msg, "quiz_answer");
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
        let msg = `${icon} ${evaluation.feedback}\n\n*Correct answer:* ${card.answer}\n\n`;

        const updatedState = await getQuizState(user.id);
        msg += await nextQuestion(user.id, updatedState!);

        await sendReply(user.id, phone, msg, "quiz_answer");
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
