import { flashcards, topics, type Flashcard, type Topic } from "./flashcards";
import { chemistryFlashcards, chemistryTopics } from "./chemistry-flashcards";
import { physicsFlashcards, physicsTopics } from "./physics-flashcards";

// Import AI-generated / user-uploaded content (auto-populated by the upload pipeline)
import bioGenerated from "./generated/biology-generated.json";
import chemGenerated from "./generated/chemistry-generated.json";
import physGenerated from "./generated/physics-generated.json";

export type Subject = "biology" | "chemistry" | "physics";

export interface SubjectConfig {
  id: Subject;
  name: string;
  shortName: string;
  icon: string;
  gradient: string;
  topics: Topic[];
  flashcards: Flashcard[];
}

// Centralised theme for each subject — replaces scattered ternaries in components
export const subjectTheme: Record<Subject, {
  gradient: string;
  accent: string;
  ring: string;
  bg: string;
  lightBg: string;
  lightText: string;
  bullet: string;
}> = {
  biology: {
    gradient: "from-indigo-500 to-purple-600",
    accent: "text-indigo-500",
    ring: "ring-indigo-300",
    bg: "bg-indigo-50",
    lightBg: "bg-indigo-100",
    lightText: "text-indigo-700",
    bullet: "text-indigo-500",
  },
  chemistry: {
    gradient: "from-orange-500 to-red-500",
    accent: "text-orange-500",
    ring: "ring-orange-300",
    bg: "bg-orange-50",
    lightBg: "bg-orange-100",
    lightText: "text-orange-700",
    bullet: "text-orange-500",
  },
  physics: {
    gradient: "from-blue-500 to-cyan-500",
    accent: "text-blue-500",
    ring: "ring-blue-300",
    bg: "bg-blue-50",
    lightBg: "bg-blue-100",
    lightText: "text-blue-700",
    bullet: "text-blue-500",
  },
};

// Merge AI-generated topics and subtopics into existing topic list
interface GeneratedData {
  newTopics: { id: string; name: string; icon: string; color: string; subtopics: string[] }[];
  newSubtopics: Record<string, string[]>;
  flashcards: { id: string; topic: string; subtopic: string; question: string; answer: string; keyPoints: string[]; difficulty: number; examTip?: string }[];
  lastUpdated: string | null;
}

function mergeTopics(
  base: Topic[],
  generated: GeneratedData
): Topic[] {
  const merged = base.map((t) => {
    const newSubs = generated.newSubtopics[t.id] || [];
    return newSubs.length > 0
      ? { ...t, subtopics: [...t.subtopics, ...newSubs.filter((s: string) => !t.subtopics.includes(s))] }
      : t;
  });

  // Add entirely new topics from AI-generated content
  for (const nt of generated.newTopics) {
    if (!merged.find((t) => t.id === nt.id)) {
      merged.push(nt as Topic);
    }
  }

  return merged;
}

export const subjects: Record<Subject, SubjectConfig> = {
  biology: {
    id: "biology",
    name: "Biology",
    shortName: "Bio",
    icon: "🧬",
    gradient: "from-indigo-500 to-purple-600",
    topics: mergeTopics(topics, bioGenerated),
    flashcards: [...flashcards, ...(bioGenerated.flashcards as unknown as Flashcard[])],
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    shortName: "Chem",
    icon: "⚗️",
    gradient: "from-orange-500 to-red-500",
    topics: mergeTopics(chemistryTopics, chemGenerated),
    flashcards: [...chemistryFlashcards, ...(chemGenerated.flashcards as unknown as Flashcard[])],
  },
  physics: {
    id: "physics",
    name: "Physics",
    shortName: "Phys",
    icon: "⚛️",
    gradient: "from-blue-500 to-cyan-500",
    topics: mergeTopics(physicsTopics, physGenerated),
    flashcards: [...physicsFlashcards, ...(physGenerated.flashcards as unknown as Flashcard[])],
  },
};

export function getSubjectData(subject: Subject) {
  return subjects[subject];
}

export function getAllFlashcards(): Flashcard[] {
  return [
    ...flashcards,
    ...chemistryFlashcards,
    ...physicsFlashcards,
    ...(bioGenerated.flashcards as unknown as Flashcard[]),
    ...(chemGenerated.flashcards as unknown as Flashcard[]),
    ...(physGenerated.flashcards as unknown as Flashcard[]),
  ];
}

export function getAllTopics(): Topic[] {
  return [
    ...mergeTopics(topics, bioGenerated),
    ...mergeTopics(chemistryTopics, chemGenerated),
    ...mergeTopics(physicsTopics, physGenerated),
  ];
}

// --- Added Content accessors (read from generated JSON = user-uploaded content) ---

// Build topic list from generated flashcards — includes both existing topics
// (that flashcards were mapped to) and genuinely new topics from the AI.
function getAddedTopics(
  generated: GeneratedData,
  baseTopics: Topic[]
): Topic[] {
  // Collect unique topic IDs referenced by generated flashcards
  const topicIds = Array.from(new Set(generated.flashcards.map((fc) => fc.topic)));

  const result: Topic[] = [];

  for (const id of topicIds) {
    // First check existing topics
    const existing = baseTopics.find((t) => t.id === id);
    if (existing) {
      result.push(existing);
      continue;
    }
    // Then check newTopics (AI-invented topics that don't exist in the base set)
    const newTopic = generated.newTopics.find((t) => t.id === id);
    if (newTopic) {
      result.push(newTopic as Topic);
    }
  }

  return result;
}

export function getAddedContent(): Record<Subject, { topics: Topic[]; flashcards: Flashcard[] }> {
  return {
    biology: {
      topics: getAddedTopics(bioGenerated, topics),
      flashcards: bioGenerated.flashcards as unknown as Flashcard[],
    },
    chemistry: {
      topics: getAddedTopics(chemGenerated, chemistryTopics),
      flashcards: chemGenerated.flashcards as unknown as Flashcard[],
    },
    physics: {
      topics: getAddedTopics(physGenerated, physicsTopics),
      flashcards: physGenerated.flashcards as unknown as Flashcard[],
    },
  };
}

export function hasAddedContent(): boolean {
  return (
    bioGenerated.flashcards.length > 0 ||
    chemGenerated.flashcards.length > 0 ||
    physGenerated.flashcards.length > 0
  );
}

export function getAddedContentCount(): Record<Subject, number> {
  return {
    biology: bioGenerated.flashcards.length,
    chemistry: chemGenerated.flashcards.length,
    physics: physGenerated.flashcards.length,
  };
}
