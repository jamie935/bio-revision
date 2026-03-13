"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { type StructuredQuestion } from "@/data/exam-questions";
import { type Subject, subjectTheme } from "@/data/subjects";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Lightbulb, CheckCircle2, Eye } from "lucide-react";

interface MultiMarkCardProps {
  question: StructuredQuestion;
  onAnswer: (marksAwarded: number, totalMarks: number) => void;
  subject?: Subject;
}

export function MultiMarkCard({ question, onAnswer, subject = "biology" }: MultiMarkCardProps) {
  const [userAnswer, setUserAnswer] = useState("");
  const [showMarkScheme, setShowMarkScheme] = useState(false);
  const [checkedPoints, setCheckedPoints] = useState<boolean[]>(
    new Array(question.markScheme.length).fill(false)
  );
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const theme = subjectTheme[subject];

  const difficultyLabel = question.difficulty === 1 ? "Foundation" : question.difficulty === 2 ? "Intermediate" : "Higher";
  const difficultyColor =
    question.difficulty === 1
      ? "bg-green-100 text-green-800"
      : question.difficulty === 2
        ? "bg-amber-100 text-amber-800"
        : "bg-red-100 text-red-800";

  const handleRevealMarkScheme = () => {
    setShowMarkScheme(true);
  };

  const togglePoint = (index: number) => {
    if (hasSubmitted) return;
    setCheckedPoints((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const handleSubmitMarks = () => {
    const marksAwarded = checkedPoints.filter(Boolean).length;
    setHasSubmitted(true);
    onAnswer(marksAwarded, question.totalMarks);
  };

  const marksAwarded = checkedPoints.filter(Boolean).length;

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {question.subtopic}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {question.commandWord}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-1 rounded-full ${difficultyColor}`}>{difficultyLabel}</span>
          <span className="text-xs font-bold px-2 py-1 rounded-full bg-blue-100 text-blue-800">
            {question.totalMarks} marks
          </span>
        </div>
      </div>

      <div className={`w-full rounded-2xl bg-gradient-to-br ${theme.gradient} p-6 text-white shadow-xl mb-4`}>
        <p className="text-xs uppercase tracking-widest mb-3 opacity-70">Structured Question</p>
        <h2 className="text-lg md:text-xl font-bold leading-relaxed">{question.question}</h2>
      </div>

      {/* Answer textarea */}
      <div className="mb-4">
        <textarea
          value={userAnswer}
          onChange={(e) => setUserAnswer(e.target.value)}
          placeholder="Write your answer here..."
          rows={6}
          disabled={showMarkScheme}
          className="w-full rounded-xl border-2 border-gray-200 p-4 text-sm text-gray-700 focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 outline-none resize-none disabled:bg-gray-50 disabled:text-gray-500"
        />
      </div>

      {!showMarkScheme && (
        <div className="flex justify-center">
          <Button onClick={handleRevealMarkScheme} variant="outline" className="gap-2">
            <Eye className="w-4 h-4" /> Reveal Mark Scheme
          </Button>
        </div>
      )}

      {showMarkScheme && (
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <div className="bg-white border-2 border-gray-100 rounded-xl p-5 shadow-sm">
            <p className="text-xs uppercase tracking-widest mb-3 text-gray-400 font-semibold">
              Mark Scheme — tick the points you got right
            </p>

            <div className="space-y-2 mb-4">
              {question.markScheme.map((point, i) => (
                <motion.button
                  key={i}
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => togglePoint(i)}
                  disabled={hasSubmitted}
                  className={`w-full flex items-start gap-3 p-3 rounded-lg border text-left transition-all ${
                    checkedPoints[i]
                      ? "border-green-300 bg-green-50"
                      : "border-gray-200 hover:bg-gray-50"
                  } ${hasSubmitted ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div
                    className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                      checkedPoints[i]
                        ? "border-green-500 bg-green-500"
                        : "border-gray-300"
                    }`}
                  >
                    {checkedPoints[i] && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>
                  <span className="text-sm text-gray-700">{point}</span>
                </motion.button>
              ))}
            </div>

            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-600">
                Marks: <span className={marksAwarded >= question.totalMarks * 0.5 ? "text-green-600" : "text-red-600"}>
                  {marksAwarded}/{question.totalMarks}
                </span>
              </p>

              {!hasSubmitted && (
                <Button onClick={handleSubmitMarks} className="gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Submit Marks
                </Button>
              )}
            </div>

            {hasSubmitted && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`mt-4 text-center py-3 rounded-xl font-semibold ${
                  marksAwarded >= question.totalMarks * 0.5
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {marksAwarded === question.totalMarks
                  ? "Full marks! Excellent!"
                  : marksAwarded >= question.totalMarks * 0.5
                    ? `Good effort — ${marksAwarded}/${question.totalMarks} marks`
                    : `${marksAwarded}/${question.totalMarks} — review the mark scheme carefully`}
              </motion.div>
            )}
          </div>

          {question.examTip && (
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
        </motion.div>
      )}
    </div>
  );
}
