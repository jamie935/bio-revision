"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MCQCard } from "./MCQCard";
import { MultiMarkCard } from "./MultiMarkCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  type ExamQuestion,
  type MCQuestion,
  type StructuredQuestion,
  getExamQuestions,
} from "@/data/exam-questions";
import { type Subject, subjects, subjectTheme } from "@/data/subjects";
import {
  ArrowRight,
  Brain,
  Target,
  Flame,
  Trophy,
  RotateCcw,
  ChevronLeft,
  Clock,
  Share2,
  Copy,
  Check,
  FileText,
  Timer,
  AlertTriangle,
} from "lucide-react";

// ── Exam session history (stored in localStorage) ───────────────────────
export interface ExamSessionRecord {
  id: string;
  subject: Subject;
  topic?: string;
  date: string; // ISO string
  totalQuestions: number;
  mcqCorrect: number;
  mcqTotal: number;
  structuredMarks: number;
  structuredTotal: number;
  overallPercent: number;
  timeTakenSeconds: number;
  timeLimitSeconds: number;
}

const EXAM_HISTORY_KEY = "bio-revision-exam-history";

export function getExamHistory(): ExamSessionRecord[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(EXAM_HISTORY_KEY);
  return raw ? JSON.parse(raw) : [];
}

function saveExamSession(record: ExamSessionRecord) {
  const history = getExamHistory();
  history.unshift(record);
  // Keep last 50 sessions
  localStorage.setItem(EXAM_HISTORY_KEY, JSON.stringify(history.slice(0, 50)));
}

// ── Helpers ─────────────────────────────────────────────────────────────
function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}

// ── Props ───────────────────────────────────────────────────────────────
interface ExamModeProps {
  onBack: () => void;
  subject: Subject;
  topicFilter?: string;
}

type ExamPhase = "setup" | "active" | "results";

const TIME_OPTIONS = [
  { label: "5 min", seconds: 5 * 60 },
  { label: "10 min", seconds: 10 * 60 },
  { label: "15 min", seconds: 15 * 60 },
  { label: "20 min", seconds: 20 * 60 },
  { label: "No limit", seconds: 0 },
];

export function ExamMode({ onBack, subject, topicFilter }: ExamModeProps) {
  const [phase, setPhase] = useState<ExamPhase>("setup");
  const [timeLimit, setTimeLimit] = useState(10 * 60);
  const [timeRemaining, setTimeRemaining] = useState(10 * 60);
  const [questions, setQuestions] = useState<ExamQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqCorrect, setMcqCorrect] = useState(0);
  const [mcqTotal, setMcqTotal] = useState(0);
  const [structuredMarks, setStructuredMarks] = useState(0);
  const [structuredTotal, setStructuredTotal] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [copied, setCopied] = useState(false);
  const [savedRecord, setSavedRecord] = useState<ExamSessionRecord | null>(null);
  const startTimeRef = useRef(Date.now());
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const subjectData = subjects[subject];
  const theme = subjectTheme[subject];

  // Timer
  useEffect(() => {
    if (phase !== "active" || timeLimit === 0) return;
    timerRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setPhase("results");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, timeLimit]);

  // Save results when entering results phase
  useEffect(() => {
    if (phase !== "results" || savedRecord) return;

    const totalMcqMarks = mcqCorrect;
    const totalStructMarks = structuredMarks;
    const totalPossible = mcqTotal + structuredTotal;
    const overallPercent = totalPossible > 0 ? Math.round(((totalMcqMarks + totalStructMarks) / totalPossible) * 100) : 0;
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);

    const record: ExamSessionRecord = {
      id: `exam-${Date.now()}`,
      subject,
      topic: topicFilter,
      date: new Date().toISOString(),
      totalQuestions: questions.length,
      mcqCorrect,
      mcqTotal,
      structuredMarks,
      structuredTotal,
      overallPercent,
      timeTakenSeconds: timeTaken,
      timeLimitSeconds: timeLimit,
    };

    saveExamSession(record);
    setSavedRecord(record);
  }, [phase, savedRecord, mcqCorrect, mcqTotal, structuredMarks, structuredTotal, questions.length, subject, topicFilter, timeLimit]);

  const startExam = () => {
    const available = getExamQuestions(subject, topicFilter);
    const selected = shuffleArray(available).slice(0, 10);
    setQuestions(selected);
    setCurrentIndex(0);
    setMcqCorrect(0);
    setMcqTotal(0);
    setStructuredMarks(0);
    setStructuredTotal(0);
    setAnswered(false);
    setTimeRemaining(timeLimit);
    setSavedRecord(null);
    startTimeRef.current = Date.now();
    setPhase("active");
  };

  const handleMCQAnswer = useCallback((correct: boolean) => {
    setMcqTotal((prev) => prev + 1);
    if (correct) setMcqCorrect((prev) => prev + 1);
    setAnswered(true);
  }, []);

  const handleStructuredAnswer = useCallback((marks: number, total: number) => {
    setStructuredMarks((prev) => prev + marks);
    setStructuredTotal((prev) => prev + total);
    setAnswered(true);
  }, []);

  const handleNext = () => {
    setAnswered(false);
    if (currentIndex + 1 >= questions.length) {
      if (timerRef.current) clearInterval(timerRef.current);
      setPhase("results");
    } else {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handleRestart = () => {
    setPhase("setup");
  };

  // ── Share results ─────────────────────────────────────────────────────
  const getShareText = () => {
    if (!savedRecord) return "";
    const topicName = topicFilter
      ? subjectData.topics.find((t) => t.id === topicFilter)?.name || "All Topics"
      : "All Topics";
    const timeTaken = formatTime(savedRecord.timeTakenSeconds);
    let text = `GCSE ${subjectData.name} Exam Practice\n`;
    text += `Topic: ${topicName}\n`;
    text += `Score: ${savedRecord.overallPercent}%\n`;
    if (savedRecord.mcqTotal > 0) {
      text += `MCQ: ${savedRecord.mcqCorrect}/${savedRecord.mcqTotal}\n`;
    }
    if (savedRecord.structuredTotal > 0) {
      text += `Structured: ${savedRecord.structuredMarks}/${savedRecord.structuredTotal} marks\n`;
    }
    text += `Time: ${timeTaken}\n`;
    text += `Date: ${new Date(savedRecord.date).toLocaleDateString()}\n`;
    text += `\nRevise at bio-revision.vercel.app`;
    return text;
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(getShareText());
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textarea = document.createElement("textarea");
      textarea.value = getShareText();
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleShare = async () => {
    const text = getShareText();
    if (navigator.share) {
      try {
        await navigator.share({ title: "GCSE Exam Results", text });
      } catch {
        handleCopy();
      }
    } else {
      handleCopy();
    }
  };

  const topicName = topicFilter
    ? subjectData.topics.find((t) => t.id === topicFilter)?.name || "All Topics"
    : "All Topics";

  // ── SETUP SCREEN ──────────────────────────────────────────────────────
  if (phase === "setup") {
    const availableCount = getExamQuestions(subject, topicFilter).length;
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <Button variant="ghost" onClick={onBack} className="mb-4">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </Button>

        <Card className="overflow-hidden">
          <div className={`bg-gradient-to-r ${theme.gradient} p-8 text-white text-center`}>
            <FileText className="w-12 h-12 mx-auto mb-3" />
            <h2 className="text-2xl font-bold mb-1">Exam Practice</h2>
            <p className="opacity-80">{subjectData.name} — {topicName}</p>
            <p className="text-sm opacity-60 mt-1">{availableCount} questions available</p>
          </div>

          <CardContent className="p-6 space-y-6">
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Question types included:</p>
              <div className="flex gap-2 flex-wrap">
                <Badge className="bg-blue-100 text-blue-700">Multiple Choice</Badge>
                <Badge className="bg-purple-100 text-purple-700">Structured Questions</Badge>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gray-700 mb-3">Time limit:</p>
              <div className="flex gap-2 flex-wrap">
                {TIME_OPTIONS.map((opt) => (
                  <button
                    key={opt.seconds}
                    onClick={() => setTimeLimit(opt.seconds)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      timeLimit === opt.seconds
                        ? `${theme.lightBg} ${theme.lightText} ring-2 ${theme.ring}`
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    }`}
                  >
                    <Clock className="w-3 h-3 inline mr-1" />
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {availableCount === 0 ? (
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <p className="text-sm text-amber-800">No exam questions available for this topic yet.</p>
              </div>
            ) : (
              <Button
                onClick={startExam}
                className={`w-full gap-2 text-lg py-6 bg-gradient-to-r ${theme.gradient} hover:opacity-90`}
              >
                <Timer className="w-5 h-5" /> Start Exam
              </Button>
            )}
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // ── RESULTS SCREEN ────────────────────────────────────────────────────
  if (phase === "results") {
    const totalMarks = mcqCorrect + structuredMarks;
    const totalPossible = mcqTotal + structuredTotal;
    const overallPercent = totalPossible > 0 ? Math.round((totalMarks / totalPossible) * 100) : 0;
    const timeTaken = Math.round((Date.now() - startTimeRef.current) / 1000);

    const grade =
      overallPercent >= 90
        ? "9"
        : overallPercent >= 80
          ? "8"
          : overallPercent >= 70
            ? "7"
            : overallPercent >= 60
              ? "6"
              : overallPercent >= 50
                ? "5"
                : overallPercent >= 40
                  ? "4"
                  : "3";

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
          <div className={`bg-gradient-to-r ${theme.gradient} p-8 text-white text-center`}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
            >
              <Trophy className="w-16 h-16 mx-auto mb-4" />
            </motion.div>
            <h2 className="text-3xl font-bold mb-2">Exam Complete!</h2>
            <p className="opacity-80">{topicName}</p>
          </div>

          <CardContent className="p-8">
            {/* Grade badge */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
              className="flex justify-center mb-6"
            >
              <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${theme.gradient} flex items-center justify-center`}>
                <span className="text-3xl font-bold text-white">
                  {grade}
                </span>
              </div>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Target className="w-6 h-6 mx-auto mb-2 text-indigo-500" />
                <p className="text-2xl font-bold">{overallPercent}%</p>
                <p className="text-xs text-gray-500">Overall</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Brain className="w-6 h-6 mx-auto mb-2 text-green-500" />
                <p className="text-2xl font-bold">
                  {totalMarks}/{totalPossible}
                </p>
                <p className="text-xs text-gray-500">Marks</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Clock className="w-6 h-6 mx-auto mb-2 text-blue-500" />
                <p className="text-2xl font-bold">{formatTime(timeTaken)}</p>
                <p className="text-xs text-gray-500">Time Taken</p>
              </motion.div>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center p-4 bg-gray-50 rounded-xl"
              >
                <Flame className="w-6 h-6 mx-auto mb-2 text-orange-500" />
                <p className="text-2xl font-bold">Grade {grade}</p>
                <p className="text-xs text-gray-500">Estimated</p>
              </motion.div>
            </div>

            {/* Breakdown */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mb-8 space-y-3"
            >
              {mcqTotal > 0 && (
                <div className="flex items-center justify-between bg-blue-50 border border-blue-100 rounded-lg p-3">
                  <span className="text-sm text-gray-700">Multiple Choice</span>
                  <Badge className="bg-blue-100 text-blue-700">
                    {mcqCorrect}/{mcqTotal} correct
                  </Badge>
                </div>
              )}
              {structuredTotal > 0 && (
                <div className="flex items-center justify-between bg-purple-50 border border-purple-100 rounded-lg p-3">
                  <span className="text-sm text-gray-700">Structured Questions</span>
                  <Badge className="bg-purple-100 text-purple-700">
                    {structuredMarks}/{structuredTotal} marks
                  </Badge>
                </div>
              )}
            </motion.div>

            {/* Action buttons */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex flex-wrap gap-3 justify-center"
            >
              <Button onClick={handleShare} variant="outline" className="gap-2">
                <Share2 className="w-4 h-4" /> Share with a Friend
              </Button>
              <Button onClick={handleCopy} variant="outline" className="gap-2">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                {copied ? "Copied!" : "Copy Results"}
              </Button>
              <Button onClick={handleRestart} className="gap-2">
                <RotateCcw className="w-4 h-4" /> Try Again
              </Button>
              <Button variant="outline" onClick={onBack}>
                Back to Topics
              </Button>
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  // ── ACTIVE EXAM ───────────────────────────────────────────────────────
  const currentQ = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;
  const isTimerWarning = timeLimit > 0 && timeRemaining < 60;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <Button variant="ghost" size="sm" onClick={() => {
          if (timerRef.current) clearInterval(timerRef.current);
          setPhase("results");
        }}>
          <ChevronLeft className="w-4 h-4 mr-1" /> End Exam
        </Button>
        <div className="text-center">
          <p className="text-sm text-gray-500">{topicName}</p>
          <p className="text-xs text-gray-400">
            Question {currentIndex + 1} of {questions.length}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {timeLimit > 0 && (
            <div
              className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-semibold ${
                isTimerWarning
                  ? "bg-red-100 text-red-600 animate-pulse"
                  : "bg-gray-100 text-gray-600"
              }`}
            >
              <Clock className="w-3 h-3" /> {formatTime(timeRemaining)}
            </div>
          )}
        </div>
      </div>

      <Progress value={progressPercent} className="mb-6 h-2" />

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQ?.id}
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -50, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          {currentQ?.type === "mcq" ? (
            <MCQCard
              question={currentQ as MCQuestion}
              onAnswer={handleMCQAnswer}
              subject={subject}
            />
          ) : (
            <MultiMarkCard
              question={currentQ as StructuredQuestion}
              onAnswer={handleStructuredAnswer}
              subject={subject}
            />
          )}
        </motion.div>
      </AnimatePresence>

      {answered && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex justify-center mt-6"
        >
          <Button onClick={handleNext} className="gap-2 px-8">
            {currentIndex + 1 >= questions.length ? "See Results" : "Next Question"}{" "}
            <ArrowRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
}
