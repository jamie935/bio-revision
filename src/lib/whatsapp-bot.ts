import { subjects } from "@/data/subjects";
import type { Subject } from "@/data/subjects";
import type { Flashcard } from "@/data/flashcards";

const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent";

// Load all flashcards across all subjects
function getAllFlashcards(): Array<Flashcard & { subject: Subject }> {
  const all: Array<Flashcard & { subject: Subject }> = [];
  for (const subj of ["biology", "chemistry", "physics"] as Subject[]) {
    for (const card of subjects[subj].flashcards) {
      all.push({ ...card, subject: subj });
    }
  }
  return all;
}

// Simple keyword search to find relevant flashcards
export function searchFlashcards(
  query: string,
  limit = 5
): Array<Flashcard & { subject: Subject }> {
  const allCards = getAllFlashcards();
  const tokens = query.toLowerCase().split(/\s+/).filter((t) => t.length > 2);

  const scored = allCards.map((card) => {
    const searchText = [
      card.question,
      card.answer,
      card.topic,
      card.subtopic,
      ...card.keyPoints,
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const token of tokens) {
      if (searchText.includes(token)) score++;
    }
    return { card, score };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.card);
}

// Detect which subject a question is about
export function detectSubject(message: string): Subject | null {
  const lower = message.toLowerCase();
  if (/biology|cell|mitosis|enzyme|organ|ecology|gene|dna|pathogen/i.test(lower))
    return "biology";
  if (/chemistry|acid|element|bonding|reaction|atom|mole|organic|periodic/i.test(lower))
    return "chemistry";
  if (/physics|force|energy|wave|electric|magnet|radioact|momentum|newton/i.test(lower))
    return "physics";
  return null;
}

// Call Gemini for conversational answer
export async function getConversationalAnswer(
  question: string,
  relevantCards: Flashcard[]
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return "Sorry, the AI service is not configured.";

  const cardContext = relevantCards
    .map(
      (c) =>
        `Q: ${c.question}\nA: ${c.answer}\nKey Points: ${c.keyPoints.join("; ")}${c.examTip ? `\nExam Tip: ${c.examTip}` : ""}`
    )
    .join("\n\n");

  const prompt = `You are a GCSE study assistant. Answer the student's question using the flashcard data provided below. Be concise, clear, and exam-focused.

Student's question: ${question}

Relevant flashcard data:
${cardContext || "No matching flashcards found."}

Rules:
- Answer in 2-3 short paragraphs max (must be under 1500 characters total for WhatsApp)
- Use bullet points for key facts
- Include an exam tip if one exists in the data
- If the question doesn't match any flashcard data, give your best GCSE-level answer but note it's not from the database`;

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { temperature: 0.3, maxOutputTokens: 1024 },
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("Gemini API error:", response.status, errorText);
    return "Sorry, I couldn't process your question right now. Please try again.";
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  return text?.slice(0, 1500) || "Sorry, I couldn't generate an answer.";
}

// Call Gemini to evaluate a quiz answer
export async function evaluateAnswer(
  card: Flashcard,
  studentAnswer: string
): Promise<{ correct: boolean; feedback: string }> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return { correct: false, feedback: "AI evaluation unavailable." };

  const prompt = `You are marking a GCSE student's answer. Compare their response to the correct answer.

Question: ${card.question}
Correct answer: ${card.answer}
Key points: ${card.keyPoints.join("; ")}
Student's answer: ${studentAnswer}

Respond in EXACTLY this JSON format (no markdown, no code fences):
{"correct": true/false, "feedback": "Brief feedback under 400 chars"}

If partially correct, set correct to false but give encouraging feedback.`;

  try {
    const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.2,
          maxOutputTokens: 256,
          responseMimeType: "application/json",
        },
      }),
    });

    if (!response.ok) return { correct: false, feedback: "Couldn't evaluate your answer." };

    const data = (await response.json()) as {
      candidates?: { content?: { parts?: { text?: string }[] } }[];
    };
    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!text) return { correct: false, feedback: "Couldn't evaluate your answer." };

    const result = JSON.parse(text);
    return { correct: !!result.correct, feedback: result.feedback || "" };
  } catch {
    return { correct: false, feedback: "Couldn't evaluate your answer." };
  }
}
