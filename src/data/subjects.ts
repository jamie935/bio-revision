import { flashcards, topics, type Flashcard, type Topic } from "./flashcards";
import { chemistryFlashcards, chemistryTopics } from "./chemistry-flashcards";

// Import AI-generated content (auto-populated by the upload pipeline)
import bioGenerated from "./generated/biology-generated.json";
import chemGenerated from "./generated/chemistry-generated.json";

export type Subject = "biology" | "chemistry";

export interface SubjectConfig {
  id: Subject;
  name: string;
  shortName: string;
  icon: string;
  gradient: string;
  topics: Topic[];
  flashcards: Flashcard[];
}

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
};

export function getSubjectData(subject: Subject) {
  return subjects[subject];
}

export function getAllFlashcards(): Flashcard[] {
  return [
    ...flashcards,
    ...chemistryFlashcards,
    ...(bioGenerated.flashcards as unknown as Flashcard[]),
    ...(chemGenerated.flashcards as unknown as Flashcard[]),
  ];
}

export function getAllTopics(): Topic[] {
  return [
    ...mergeTopics(topics, bioGenerated),
    ...mergeTopics(chemistryTopics, chemGenerated),
  ];
}
