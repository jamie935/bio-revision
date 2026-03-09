"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FlashCard } from "./FlashCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { type Flashcard } from "@/data/flashcards";
import { type Subject, subjects, subjectTheme } from "@/data/subjects";
import {
  selectNextCards,
  getWeakestTopics,
  type SessionStats,
} from "@/lib/spaced-repetition";
import { usePerformance } from "@/lib/performance-api";
import {
  ArrowRight,
  Brain,
  Target,
  Flame,
  Trophy,
  RotateCcw,
  ChevronLeft,
  Zap,
} from "lucide-react";
import { PeriodicTable } from "./PeriodicTable";

interface QuizModeProps {
  onBack: () => void;
  topicFilter?: string;
  subject: Subject;
  customCards?: Flashcard[];
  customLabel?: string;
}

export function QuizMode({ onBack, topicFilter, subject, customCards, customLabel }: QuizModeProps) {
  const { performance, recordAnswerAndSync } = usePerformance();
  const [cards, setCards] = useState<Flashcard[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sessionStats, setSessionStats] = useState<SessionStats>({
    totalAnswered: 0,
    correct: 0,
    incorrect: 0,
    streak: 0,
    bestStreak: 0,
    startTime: Date.now(),
  });
  const [lastAnswer, setLastAnswer] = useState<boolean | undefined>();
  const [isComplete, setIsComplete] = useState(false);
  const [quizSize] = useState(10);

  const subjectData = subjects[subject];
  const subjectFlashcards = subjectData.flashcards;
  const subjectTopics = subjectData.topics;

  useEffect(() => {
    const pool = customCards || subjectFlashcards;
    const selected = selectNextCards(pool, performance, quizSize, customCards ? undefined : topicFilter);
    setCards(selected);
  }, [topicFilter, quizSize, subject, subjectFlashcards, customCards, performance]);

  const handleAnswer = useCallback(
    (correct: boolean) => {
      const card = cards[currentIndex];
      if (!card) return;
      recordAnswerAndSync(card, correct);
      setLastAnswer(correct);

      setSessionStats((prev) => {
        const newStreak = correct ? prev.streak + 1 : 0;
        return {
          ...prev,
          totalAnswered: prev.totalAnswered + 1,
          correct: prev.correct + (correct ? 1 : 0),
          incorrect: prev.incorrect + (correct ? 0 : 1),
          streak: newStreak,
          bestStreak: Math.max(prev.bestStreak, newStreak),
        };
      });
    },
    [cards, currentIndex, recordAnswerAndSync]
  );

  const handleNext = () => {
    setLastAnswer(undefined);
    if (currentIndex + 1 >= cards.length) {
      setIsComplete(true);
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    const pool = customCards || subjectFlashcards;
    const selected = selectNextCards(pool, performance, quizSize, customCards ? undefined : topicFilter);
    setCards(selected);
    setCurrentIndex(0);
    setIsComplete(false);
    setLastAnswer(undefined);
    setSessionStats({
      totalAnswered: 0,
      correct: 0,
      incorrect: 0,
      streak: 0,
      bestStreak: 0,
      startTime: Date.now(),
    });
  };

  const topicName = customLabel
    ? customLabel
    : topicFilter
      ? subjectTopics.find((t) => t.id === topicFilter)?.name || "All Topics"
      : "All Topics";

  const gradientClass = subjectTheme[subject].gradient;

  if (cards.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-gray-500">Loading cards...</p>
      </div>
    );
  }

  if (isComplete) {
    const weakAreas = getWeakestTopics(subjectFlashcards, performance).slice(0, 3);
    const accuracy = sessionStats.totalAnswered > 0
      ? Math.round((sessionStats.correct / sessionStats.totalAnswered) * 100)
      : 0;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back to Topics
        </Button>

        <Card className="overflow-hidden">
          <div className={`bg-gradient-to-r ${gradientClass} p-8 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Trophy className="w-16 h-16 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Session Complete!</h2>
            <p className="opacity-80">{topicName}</p>
          </div>

          <CardContent className="p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Target className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <p className="text-2xl font-bold">{accuracy}%</p>
                <p className="text-xs text-gray-500">Accuracy</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Brain className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">
                  {sessionStats.correct}/{sessionStats.totalAnswered}
                </p>
                <p className="text-xs text-gray-500">Correct</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold">{sessionStats.bestStreak}</p>
                <p className="text-xs text-gray-500">Best Streak</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Zap className="w-6 h-6 mx-auto mb-2 text-amber-500" />
                <p className="text-2xl font-bold">{sessionStats.totalAnswered}</p>
                <p className="text-xs text-gray-500">Answered</p>
              </motion.div>
            </div>

            {weakAreas.length > 0 && (
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="mb-8"
              >
                <h3 className="font-semibold text-gray-700 mb-3">Areas to Focus On:</h3>
                <div className="space-y-2">
                  {weakAreas.map((area, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3"
                    >
                      <span className="text-sm text-gray-700">{area.subtopic}</span>
                      <Badge variant="destructive" className="text-xs">
                        {area.accuracy}% accuracy
                      </Badge>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            <div className="flex gap-3 justify-center">
              <Button onClick={handleRestart} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Study Again (Focuses on Weak Areas)
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back to Topics
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  const progressPercent = ((currentIndex + 1) / cards.length) * 100;

  const quizContent = (
    <>
      <div className="flex items-center justify-between mb-6">
        <Button variant="ghost" size="sm" onClick={onBack}>
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-500">{topicName}</p>
          <p className="text-xs text-gray-400">
            Card {currentIndex + 1} of {cards.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {sessionStats.streak > 0 && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="flex items-center gap-1 bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs font-semibold"
            >
              <Flame className="w-3 h-3" /> {sessionStats.streak}
            </motion.div>
          )}
          <span className="text-sm text-gray-500">
            {sessionStats.correct}/{sessionStats.totalAnswered}
          </span>
        </div>
      </div>

      <Progress value={progressPercent} className="mb-6 h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={cards[currentIndex]?.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <FlashCard
            card={cards[currentIndex]}
            onAnswer={handleAnswer}
            showResult={lastAnswer}
            subject={subject}
          />
        </motion.div>
      </AnimatePresence>

      {lastAnswer !== undefined && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center mt-6"
        >
          <Button onClick={handleNext} className="gap-2 px-8">
            {currentIndex + 1 >= cards.length ? "See Results" : "Next Card"}{" "}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </>
  );

  if (subject === "chemistry") {
    return (
      <div className="max-w-6xl mx-auto flex gap-6 items-start">
        {/* Periodic Table sidebar — hidden below lg */}
        <div className="hidden lg:block w-[320px] flex-shrink-0 sticky top-28">
          <PeriodicTable className="bg-white/90 backdrop-blur rounded-xl border border-gray-100 shadow-sm p-3" />
        </div>
        {/* Quiz content */}
        <div className="flex-1 max-w-2xl">{quizContent}</div>
      </div>
    );
  }

  return <div className="max-w-2xl mx-auto">{quizContent}</div>;
}
