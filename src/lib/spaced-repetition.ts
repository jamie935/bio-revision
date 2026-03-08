import { Flashcard } from "@/data/flashcards";

export interface CardPerformance {
  cardId: string;
  correctCount: number;
  incorrectCount: number;
  streak: number;
  lastSeen: number; // timestamp
  nextDue: number; // timestamp
  ease: number; // 1.3 to 2.5 (difficulty multiplier)
  interval: number; // in minutes
  topic: string;
  subtopic: string;
}

export interface TopicStats {
  topicId: string;
  totalCards: number;
  mastered: number; // streak >= 3
  learning: number; // seen but streak < 3
  unseen: number; // never attempted
  accuracy: number; // percentage
  weakSubtopics: string[]; // subtopics with <60% accuracy
}

export interface SessionStats {
  totalAnswered: number;
  correct: number;
  incorrect: number;
  streak: number;
  bestStreak: number;
  startTime: number;
}

const STORAGE_KEY = "bio-revision-performance";

export function loadPerformance(): Record<string, CardPerformance> {
  if (typeof window === "undefined") return {};
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function savePerformance(data: Record<string, CardPerformance>): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function resetPerformance(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_KEY);
}

export function recordAnswer(
  performance: Record<string, CardPerformance>,
  card: Flashcard,
  correct: boolean
): Record<string, CardPerformance> {
  const now = Date.now();
  const existing = performance[card.id];

  let newPerf: CardPerformance;

  if (!existing) {
    newPerf = {
      cardId: card.id,
      correctCount: correct ? 1 : 0,
      incorrectCount: correct ? 0 : 1,
      streak: correct ? 1 : 0,
      lastSeen: now,
      nextDue: now + (correct ? 10 * 60 * 1000 : 1 * 60 * 1000), // 10min if correct, 1min if wrong
      ease: correct ? 2.5 : 1.8,
      interval: correct ? 10 : 1,
      topic: card.topic,
      subtopic: card.subtopic,
    };
  } else {
    if (correct) {
      const newEase = Math.min(2.5, existing.ease + 0.15);
      const newInterval = Math.max(1, Math.round(existing.interval * newEase));
      newPerf = {
        ...existing,
        correctCount: existing.correctCount + 1,
        streak: existing.streak + 1,
        lastSeen: now,
        nextDue: now + newInterval * 60 * 1000,
        ease: newEase,
        interval: newInterval,
      };
    } else {
      // Wrong answer: reset interval, reduce ease
      const newEase = Math.max(1.3, existing.ease - 0.3);
      newPerf = {
        ...existing,
        incorrectCount: existing.incorrectCount + 1,
        streak: 0,
        lastSeen: now,
        nextDue: now + 1 * 60 * 1000, // Re-show in 1 minute
        ease: newEase,
        interval: 1,
      };
    }
  }

  const updated = { ...performance, [card.id]: newPerf };
  savePerformance(updated);
  return updated;
}

export function getTopicStats(
  cards: Flashcard[],
  performance: Record<string, CardPerformance>,
  topicId: string
): TopicStats {
  const topicCards = cards.filter((c) => c.topic === topicId);
  let mastered = 0;
  let learning = 0;
  let unseen = 0;
  let totalCorrect = 0;
  let totalAttempts = 0;
  const subtopicAccuracy: Record<string, { correct: number; total: number }> = {};

  for (const card of topicCards) {
    const perf = performance[card.id];
    if (!perf) {
      unseen++;
    } else if (perf.streak >= 3) {
      mastered++;
    } else {
      learning++;
    }

    if (perf) {
      totalCorrect += perf.correctCount;
      totalAttempts += perf.correctCount + perf.incorrectCount;

      if (!subtopicAccuracy[card.subtopic]) {
        subtopicAccuracy[card.subtopic] = { correct: 0, total: 0 };
      }
      subtopicAccuracy[card.subtopic].correct += perf.correctCount;
      subtopicAccuracy[card.subtopic].total += perf.correctCount + perf.incorrectCount;
    }
  }

  const weakSubtopics = Object.entries(subtopicAccuracy)
    .filter(([, stats]) => stats.total > 0 && stats.correct / stats.total < 0.6)
    .map(([name]) => name);

  return {
    topicId,
    totalCards: topicCards.length,
    mastered,
    learning,
    unseen,
    accuracy: totalAttempts > 0 ? Math.round((totalCorrect / totalAttempts) * 100) : 0,
    weakSubtopics,
  };
}

// Smart card selection: prioritises weak areas, due cards, and unseen cards
export function selectNextCards(
  allCards: Flashcard[],
  performance: Record<string, CardPerformance>,
  count: number,
  topicFilter?: string
): Flashcard[] {
  const now = Date.now();
  const pool = topicFilter ? allCards.filter((c) => c.topic === topicFilter) : [...allCards];

  // Split into categories
  const dueCards: { card: Flashcard; priority: number }[] = [];
  const unseenCards: Flashcard[] = [];
  const notYetDue: { card: Flashcard; priority: number }[] = [];

  for (const card of pool) {
    const perf = performance[card.id];
    if (!perf) {
      unseenCards.push(card);
    } else if (perf.nextDue <= now) {
      // Due now — prioritise weak cards (low streak, low ease)
      const priority = (1 / (perf.streak + 1)) * (1 / perf.ease) * 100;
      dueCards.push({ card, priority });
    } else {
      const priority = (1 / (perf.streak + 1)) * (1 / perf.ease);
      notYetDue.push({ card, priority });
    }
  }

  // Sort due cards by priority (weakest first)
  dueCards.sort((a, b) => b.priority - a.priority);
  notYetDue.sort((a, b) => b.priority - a.priority);

  // Shuffle unseen
  for (let i = unseenCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [unseenCards[i], unseenCards[j]] = [unseenCards[j], unseenCards[i]];
  }

  // Select cards: 50% due, 30% unseen, 20% weak not-yet-due
  const result: Flashcard[] = [];
  const dueCount = Math.ceil(count * 0.5);
  const unseenCount = Math.ceil(count * 0.3);
  const weakCount = count - dueCount - unseenCount;

  // Add due cards
  for (let i = 0; i < Math.min(dueCount, dueCards.length); i++) {
    result.push(dueCards[i].card);
  }

  // Add unseen
  for (let i = 0; i < Math.min(unseenCount, unseenCards.length); i++) {
    if (!result.find((c) => c.id === unseenCards[i].id)) {
      result.push(unseenCards[i]);
    }
  }

  // Add weak not-yet-due
  for (let i = 0; i < Math.min(weakCount, notYetDue.length); i++) {
    if (!result.find((c) => c.id === notYetDue[i].card.id)) {
      result.push(notYetDue[i].card);
    }
  }

  // If not enough, fill from remaining
  const remaining = [...unseenCards, ...dueCards.map((d) => d.card), ...notYetDue.map((d) => d.card)];
  for (const card of remaining) {
    if (result.length >= count) break;
    if (!result.find((c) => c.id === card.id)) {
      result.push(card);
    }
  }

  // Shuffle result
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result.slice(0, count);
}

export function getWeakestTopics(
  cards: Flashcard[],
  performance: Record<string, CardPerformance>
): { topic: string; subtopic: string; accuracy: number }[] {
  const subtopicStats: Record<string, { correct: number; total: number; topic: string }> = {};

  for (const card of cards) {
    const perf = performance[card.id];
    if (perf && perf.correctCount + perf.incorrectCount > 0) {
      const key = `${card.topic}|${card.subtopic}`;
      if (!subtopicStats[key]) {
        subtopicStats[key] = { correct: 0, total: 0, topic: card.topic };
      }
      subtopicStats[key].correct += perf.correctCount;
      subtopicStats[key].total += perf.correctCount + perf.incorrectCount;
    }
  }

  return Object.entries(subtopicStats)
    .map(([key, stats]) => ({
      topic: stats.topic,
      subtopic: key.split("|")[1],
      accuracy: Math.round((stats.correct / stats.total) * 100),
    }))
    .sort((a, b) => a.accuracy - b.accuracy);
}

export function getOverallStats(
  cards: Flashcard[],
  performance: Record<string, CardPerformance>
): {
  totalCards: number;
  attempted: number;
  mastered: number;
  accuracy: number;
  totalCorrect: number;
  totalIncorrect: number;
} {
  let attempted = 0;
  let mastered = 0;
  let totalCorrect = 0;
  let totalIncorrect = 0;

  for (const card of cards) {
    const perf = performance[card.id];
    if (perf) {
      attempted++;
      totalCorrect += perf.correctCount;
      totalIncorrect += perf.incorrectCount;
      if (perf.streak >= 3) mastered++;
    }
  }

  return {
    totalCards: cards.length,
    attempted,
    mastered,
    accuracy: totalCorrect + totalIncorrect > 0
      ? Math.round((totalCorrect / (totalCorrect + totalIncorrect)) * 100)
      : 0,
    totalCorrect,
    totalIncorrect,
  };
}
