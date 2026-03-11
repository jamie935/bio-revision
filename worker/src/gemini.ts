const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

const SYSTEM_PROMPT = `You are a GCSE content extraction assistant. Analyze the uploaded content (image, PDF, or text — e.g. curriculum document, textbook page, specification, revision notes) and extract educational content.

You MUST return valid JSON matching this exact structure (no markdown, no code fences, just raw JSON):

{
  "subject": "biology" or "chemistry" or "physics",
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
- states-matter (States of Matter & Particle Theory, Changes of State, Diffusion, Solutions & Solubility, Separation Techniques)
- atomic-structure (Atoms/Elements/Compounds, Atomic Structure & Isotopes, Electronic Configuration, The Periodic Table, Group 1/7/0)
- bonding-structure (Ionic Bonding, Covalent Bonding, Metallic Bonding, Properties of Structures, Nanoparticles & Allotropes of Carbon)
- formulae-equations (Writing Formulae, Balancing Equations, Moles & Relative Formula Mass, Concentration & Volume Calculations)
- metals-reactivity (The Reactivity Series, Displacement Reactions, Extraction of Metals, Oxidation & Reduction, Tests for Ions & Gases)
- rates-energy (Rate of Reaction, Collision Theory, Catalysts & Surface Area, Exothermic & Endothermic Reactions, Equilibrium)
- organic-chemistry (Crude Oil & Hydrocarbons, Alkanes & Combustion, Alkenes & Addition Reactions, Alcohols/Carboxylic Acids/Esters, Polymers & Plastics)

EXISTING PHYSICS TOPICS:
- forces-motion (Speed/Distance/Time, Velocity & Acceleration, D-T & V-T Graphs, Forces & Newton's Laws, Stopping Distances, Momentum)
- electricity (Charge/Current/Voltage, Resistance & Ohm's Law, Series & Parallel Circuits, Electrical Power & Energy, Static Electricity)
- waves (Wave Properties, Reflection & Refraction, Electromagnetic Spectrum, Sound Waves, Lenses & Images)
- energy-resources (Energy Stores & Transfers, Conservation of Energy, Efficiency, Renewable & Non-Renewable Resources, Specific Heat Capacity)
- solids-liquids-gases (Particle Model, Density, Pressure in Gases & Liquids, Changes of State, Specific & Latent Heat)
- magnetism (Magnets & Magnetic Fields, Electromagnets, The Motor Effect, Electromagnetic Induction, Transformers)
- radioactivity (Atomic Structure, Types of Radiation, Half-Life, Uses & Hazards of Radiation, Nuclear Fission & Fusion)
- astrophysics (The Solar System, Stellar Evolution, The Big Bang & Red Shift, Orbits & Gravity)

RULES:
- Auto-detect whether the content is biology, chemistry or physics
- Map content to existing topics/subtopics when possible
- Only set isNewTopic to true if the content genuinely doesn't fit any existing topic
- difficulty: 1 = foundation/easy, 2 = intermediate, 3 = higher/hard
- Each keyPoints array should have 3 items
- examTip should be practical exam advice, or null
- Generate 5-15 flashcards per image depending on content density
- Questions should test ONE concept each
- Return ONLY valid JSON, no other text`;

export async function analyzeWithGemini(
  base64Data: string | null,
  mimeType: string,
  apiKey: string,
  textContent?: string
): Promise<unknown> {
  // Build the content parts based on input type
  const parts: Array<Record<string, unknown>> = [];

  if (textContent) {
    // Text file: send the content as a text part
    parts.push({
      text: `Here is the educational content to analyze:\n\n---\n${textContent}\n---\n\n${SYSTEM_PROMPT}`,
    });
  } else if (base64Data) {
    // Image or PDF: send as inline data
    parts.push({
      inlineData: {
        mimeType,
        data: base64Data,
      },
    });
    parts.push({
      text: SYSTEM_PROMPT,
    });
  }

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          parts,
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
