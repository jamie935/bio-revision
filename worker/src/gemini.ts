const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `You are a GCSE content extraction assistant. Analyze the uploaded image (curriculum document, textbook page, specification screenshot) and extract educational content.

You MUST return valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "subject": "biology" or "chemistry",
  "detectedTopic": {
    "id": "kebab-case-id",
    "name": "Human Readable Name",
    "isNewTopic": false
  },
  "flashcards": [
    {
      "topic": "topic-id",
      "subtopic": "Subtopic Name",
      "question": "What is...?",
      "answer": "A concise but complete answer.",
      "keyPoints": ["Point 1", "Point 2", "Point 3"],
      "difficulty": 1,
      "examTip": "Practical exam tip or null"
    }
  ],
  "topicSummary": {
    "heading": "Section Heading",
    "content": "Detailed revision notes...",
    "keyTerms": [{"term": "Word", "definition": "Meaning"}],
    "importantEquations": ["equation1"] or null,
    "tables": null
  },
  "newSubtopics": ["Any New Subtopic"]
}

EXISTING BIOLOGY TOPICS (use these IDs when content matches):
- cells (Cell Structure, Cell Division, Transport in Cells, Cell Specialisation)
- organisation (Digestive System, Blood & Heart, Lungs & Gas Exchange, Non-Communicable Diseases)
- bioenergetics (Photosynthesis, Respiration)
- infection (Pathogens & Disease, Human Defence, Vaccination & Drugs, Monoclonal Antibodies)
- homeostasis (Nervous System, Hormonal Control, Blood Glucose, Kidney & Water Balance)
- genetics (DNA & Protein Synthesis, Inheritance, Variation, Evolution & Natural Selection)
- ecology (Ecosystems, Food Chains & Cycles, Biodiversity, Human Impact)

EXISTING CHEMISTRY TOPICS:
- acids-alkalis (Indicators & pH Scale, Acids/Bases & Neutralisation, Solubility Rules, Reactions of Acids, Making Salts)

RULES:
- Auto-detect whether the image is biology or chemistry
- Map content to existing topics/subtopics when possible
- Only set isNewTopic to true if the content genuinely doesn't fit any existing topic
- difficulty: 1 = foundation/easy, 2 = intermediate, 3 = higher/hard
- Each keyPoints array should have 3 items
- examTip should be practical exam advice, or null
- Generate 5-15 flashcards per image depending on content density
- Questions should test ONE concept each
- Return ONLY valid JSON, no other text`;

export async function analyzeWithGemini(
  imageBase64: string,
  mimeType: string,
  apiKey: string
): Promise<unknown> {
  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts: [
            {
              inlineData: {
                mimeType,
                data: imageBase64,
              },
            },
            {
              text: SYSTEM_PROMPT,
            },
          ],
        },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 8192,
        responseMimeType: "application/json",
      },
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Gemini API error (${response.status}): ${error}`);
  }

  const data = (await response.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!text) {
    throw new Error("No response from Gemini");
  }

  // Parse JSON (handle markdown code fences if present)
  let jsonStr = text.trim();
  const fenceMatch = jsonStr.match(/```json?\s*([\s\S]*?)```/);
  if (fenceMatch) jsonStr = fenceMatch[1].trim();

  return JSON.parse(jsonStr);
}
