"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type MCQuestion } from "@/data/exam-questions";
import { type Subject, subjectTheme } from "@/data/subjects";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, XCircle, Lightbulb } from "lucide-react";

interface MCQCardProps {
  question: MCQuestion;
  onAnswer: (correct: boolean) => void;
  subject?: Subject;
}

export function MCQCard({ question, onAnswer, subject = "biology" }: MCQCardProps) {
  const [selected, setSelected] = useState<number | null>(null);
  const [hasAnswered, setHasAnswered] = useState(false);

  const theme = subjectTheme[subject];

  const handleSelect = (index: number) => {
    if (hasAnswered) return;
    setSelected(index);
    setHasAnswered(true);
    const correct = index === question.correctIndex;
    onAnswer(correct);
  };

  const difficultyLabel = question.difficulty === 1 ? "Foundation" : question.difficulty === 2 ? "Intermediate" : "Higher";
  const difficultyColor =
    question.difficulty === 1
      ? "bg-green-100 text-green-800"
      : question.difficulty === 2
        ? "bg-amber-100 text-amber-800"
        : "bg-red-100 text-red-800";

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-3 flex items-center justify-between">
        <Badge variant="outline" className="text-xs">
          {question.subtopic}
        </Badge>
        <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>{difficultyLabel}</span>
      </div>

      <div className={`w-full rounded-2xl bg-gradient-to-br ${theme.gradient} p-6 text-white shadow-xl mb-4`}>
        <p className="text-xs uppercase tracking-widest mb-3 opacity-70">Multiple Choice</p>
        <h2 className="text-lg md:text-xl font-bold leading-relaxed">{question.question}</h2>
      </div>

      <div className="space-y-3">
        {question.options.map((option, i) => {
          const isCorrect = i === question.correctIndex;
          const isSelected = i === selected;
          let borderClass = "border-gray-200 hover:border-gray-400 hover:bg-gray-50";
          let iconContent = (
            <span className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-semibold text-gray-500">
              {String.fromCharCode(65 + i)}
            </span>
          );

          if (hasAnswered) {
            if (isCorrect) {
              borderClass = "border-green-400 bg-green-50";
              iconContent = <CheckCircle2 className="w-6 h-6 text-green-500" />;
            } else if (isSelected && !isCorrect) {
              borderClass = "border-red-400 bg-red-50";
              iconContent = <XCircle className="w-6 h-6 text-red-500" />;
            } else {
              borderClass = "border-gray-200 opacity-50";
            }
          }

          return (
            <motion.button
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => handleSelect(i)}
              disabled={hasAnswered}
              className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${borderClass} ${
                !hasAnswered ? "cursor-pointer active:scale-[0.98]" : "cursor-default"
              }`}
            >
              {iconContent}
              <span className={`text-sm font-medium ${hasAnswered && !isCorrect && !isSelected ? "text-gray-400" : "text-gray-700"}`}>
                {option}
              </span>
            </motion.button>
          );
        })}
      </div>

      {hasAnswered && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2"
        >
          <Lightbulb className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-blue-800">{question.explanation}</p>
        </motion.div>
      )}

      {hasAnswered && question.examTip && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-3 bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2"
        >
          <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Exam Tip:</span> {question.examTip}
          </p>
        </motion.div>
      )}
    </div>
  );
}
