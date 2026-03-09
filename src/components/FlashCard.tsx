"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Flashcard } from "@/data/flashcards";
import { type Subject, subjectTheme } from "@/data/subjects";
import { Badge } from "@/components/ui/badge";
import { Lightbulb } from "lucide-react";

interface FlashCardProps {
  card: Flashcard;
  onAnswer: (correct: boolean) => void;
  showResult?: boolean;
  subject?: Subject;
}

export function FlashCard({ card, onAnswer, showResult, subject = "biology" }: FlashCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const [hasAnswered, setHasAnswered] = useState(false);

  const handleFlip = () => {
    if (!isFlipped) {
      setIsFlipped(true);
    }
  };

  const handleAnswer = (correct: boolean) => {
    if (hasAnswered) return;
    setHasAnswered(true);
    onAnswer(correct);
  };

  const difficultyLabel = card.difficulty === 1 ? "Foundation" : card.difficulty === 2 ? "Intermediate" : "Higher";
  const difficultyColor =
    card.difficulty === 1
      ? "bg-green-100 text-green-800"
      : card.difficulty === 2
      ? "bg-amber-100 text-amber-800"
      : "bg-red-100 text-red-800";

  const theme = subjectTheme[subject];
  const cardGradient = theme.gradient;
  const bulletColor = theme.bullet;

  return (
    <div className="w-full max-w-2xl mx-auto perspective-1000">
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {card.subtopic}
        </Badge>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>{difficultyLabel}</span>
      </div>

      <div
        className="relative w-full min-h-[320px] cursor-pointer"
        style={{ perspective: "1000px" }}
        onClick={handleFlip}
      >
        <AnimatePresence mode="wait">
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: 90, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeIn" }}
              className="absolute inset-0"
            >
              <div className={`w-full h-full min-h-[320px] rounded-2xl bg-gradient-to-br ${cardGradient} p-8 flex flex-col items-center justify-center text-white shadow-xl hover:shadow-2xl transition-shadow`}>
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, duration: 0.3 }}
                  className="text-center"
                >
                  <p className="text-xs uppercase tracking-widest mb-4 opacity-70">Question</p>
                  <h2 className="text-xl md:text-2xl font-bold leading-relaxed">{card.question}</h2>
                  <motion.p
                    className="mt-6 text-sm opacity-60"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    Tap to reveal answer
                  </motion.p>
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: -90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="w-full"
            >
              <div className="w-full min-h-[320px] rounded-2xl bg-white border-2 border-gray-100 p-8 shadow-xl">
                <p className="text-xs uppercase tracking-widest mb-4 text-gray-400">Answer</p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.15, duration: 0.4 }}
                >
                  <p className="text-gray-800 text-lg leading-relaxed mb-6">{card.answer}</p>

                  <div className="space-y-2 mb-4">
                    <p className="text-xs font-semibold text-gray-500 uppercase">Key Points:</p>
                    {card.keyPoints.map((point, i) => (
                      <motion.div
                        key={i}
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: 0.2 + i * 0.1 }}
                        className="flex items-start gap-2"
                      >
                        <span className={`${bulletColor} mt-0.5`}>•</span>
                        <span className="text-sm text-gray-600">{point}</span>
                      </motion.div>
                    ))}
                  </div>

                  {card.examTip && (
                    <motion.div
                      initial={{ y: 10, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5 }}
                      className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2"
                    >
                      <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                      <p className="text-sm text-amber-800">
                        <span className="font-semibold">Exam Tip:</span> {card.examTip}
                      </p>
                    </motion.div>
                  )}
                </motion.div>

                {!hasAnswered && (
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mt-6 flex gap-3 justify-center"
                  >
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswer(false);
                      }}
                      className="px-6 py-3 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 font-semibold transition-all hover:scale-105 active:scale-95 border border-red-200"
                    >
                      Got it wrong
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnswer(true);
                      }}
                      className="px-6 py-3 rounded-xl bg-green-50 hover:bg-green-100 text-green-600 font-semibold transition-all hover:scale-105 active:scale-95 border border-green-200"
                    >
                      Got it right
                    </button>
                  </motion.div>
                )}

                {hasAnswered && showResult !== undefined && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className={`mt-6 text-center py-3 rounded-xl font-semibold ${
                      showResult
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {showResult ? "Correct! Well done!" : "Keep practising — you'll get it!"}
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
