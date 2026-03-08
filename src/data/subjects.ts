import { flashcards, topics, type Flashcard, type Topic } from "./flashcards";
import { chemistryFlashcards, chemistryTopics } from "./chemistry-flashcards";

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

export const subjects: Record<Subject, SubjectConfig> = {
  biology: {
    id: "biology",
    name: "Biology",
    shortName: "Bio",
    icon: "🧬",
    gradient: "from-indigo-500 to-purple-600",
    topics,
    flashcards,
  },
  chemistry: {
    id: "chemistry",
    name: "Chemistry",
    shortName: "Chem",
    icon: "⚗️",
    gradient: "from-orange-500 to-red-500",
    topics: chemistryTopics,
    flashcards: chemistryFlashcards,
  },
};

export function getSubjectData(subject: Subject) {
  return subjects[subject];
}

export function getAllFlashcards(): Flashcard[] {
  return [...flashcards, ...chemistryFlashcards];
}

export function getAllTopics(): Topic[] {
  return [...topics, ...chemistryTopics];
}
