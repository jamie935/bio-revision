"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopicBrowser } from "@/components/TopicBrowser";
import { QuizMode } from "@/components/QuizMode";
import { Dashboard } from "@/components/Dashboard";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, GraduationCap, Dna, FlaskConical, Atom, Upload } from "lucide-react";
import { type Subject } from "@/data/subjects";
import { PeriodicTable } from "@/components/PeriodicTable";
import { ContentUpload } from "@/components/ContentUpload";

type View = "topics" | "quiz" | "dashboard" | "periodic-table";

export default function Home() {
  const [view, setView] = useState<View>("topics");
  const [quizTopic, setQuizTopic] = useState<string | undefined>();
  const [subject, setSubject] = useState<Subject>("biology");
  const [showUpload, setShowUpload] = useState(false);

  const startQuiz = (topicId?: string) => {
    setQuizTopic(topicId);
    setView("quiz");
  };

  const goBack = () => {
    setView("topics");
    setQuizTopic(undefined);
  };

  const switchSubject = (s: Subject) => {
    setSubject(s);
    setView("topics");
    setQuizTopic(undefined);
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center transition-all duration-300 ${
                subject === "biology"
                  ? "from-indigo-500 to-purple-600"
                  : "from-orange-500 to-red-500"
              }`}
            >
              {subject === "biology" ? (
                <Dna className="w-6 h-6 text-white" />
              ) : (
                <FlaskConical className="w-6 h-6 text-white" />
              )}
            </div>
            <div>
              <p className="font-[family-name:var(--font-signature)] text-base text-blue-600">By Avi True</p>
              <h1 className="font-bold text-lg text-gray-800">GCSE Revision</h1>
              <p className="text-[11px] text-gray-400">Edexcel IGCSE</p>
            </div>
          </div>

          <nav className="flex gap-1">
            <Button
              variant={view === "topics" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("topics")}
              className="gap-1.5"
            >
              <BookOpen className="w-4 h-4" />
              <span className="hidden sm:inline">Topics</span>
            </Button>
            <Button
              variant={view === "quiz" ? "default" : "ghost"}
              size="sm"
              onClick={() => startQuiz()}
              className="gap-1.5"
            >
              <GraduationCap className="w-4 h-4" />
              <span className="hidden sm:inline">Quick Quiz</span>
            </Button>
            <Button
              variant={view === "dashboard" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("dashboard")}
              className="gap-1.5"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Dashboard</span>
            </Button>
            {subject === "chemistry" && (
              <Button
                variant={view === "periodic-table" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("periodic-table")}
                className="gap-1.5"
              >
                <Atom className="w-4 h-4" />
                <span className="hidden sm:inline">Periodic Table</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpload(true)}
              className="gap-1.5 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Add Content</span>
            </Button>
          </nav>
        </div>

        {/* Subject Switcher */}
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex gap-2">
            <button
              onClick={() => switchSubject("biology")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                subject === "biology"
                  ? "bg-indigo-100 text-indigo-700 ring-2 ring-indigo-300 shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">🧬</span>
              Biology
            </button>
            <button
              onClick={() => switchSubject("chemistry")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                subject === "chemistry"
                  ? "bg-orange-100 text-orange-700 ring-2 ring-orange-300 shadow-sm"
                  : "bg-gray-100 text-gray-500 hover:bg-gray-200"
              }`}
            >
              <span className="text-lg">⚗️</span>
              Chemistry
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        <AnimatePresence mode="wait">
          {view === "topics" && (
            <motion.div
              key={`topics-${subject}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <TopicBrowser onStartQuiz={startQuiz} subject={subject} />
            </motion.div>
          )}

          {view === "quiz" && (
            <motion.div
              key={`quiz-${subject}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <QuizMode onBack={goBack} topicFilter={quizTopic} subject={subject} />
            </motion.div>
          )}

          {view === "dashboard" && (
            <motion.div
              key={`dashboard-${subject}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <Dashboard onStartQuiz={startQuiz} subject={subject} />
            </motion.div>
          )}

          {view === "periodic-table" && (
            <motion.div
              key="periodic-table"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <PeriodicTable />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Upload Modal */}
      <ContentUpload isOpen={showUpload} onClose={() => setShowUpload(false)} />
    </div>
  );
}
