"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TopicBrowser } from "@/components/TopicBrowser";
import { QuizMode } from "@/components/QuizMode";
import { Dashboard } from "@/components/Dashboard";
import { AddedContent } from "@/components/AddedContent";
import { AuthGate } from "@/components/AuthGate";
import { PaymentGate } from "@/components/PaymentGate";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { BookOpen, BarChart3, GraduationCap, Dna, FlaskConical, Atom, Upload, FolderPlus, Shield, LogOut, Calculator } from "lucide-react";
import { type Subject, subjectTheme } from "@/data/subjects";
import { type Flashcard } from "@/data/flashcards";
import { PeriodicTable } from "@/components/PeriodicTable";
import { PhysicsEquations } from "@/components/PhysicsEquations";
import { ContentUpload } from "@/components/ContentUpload";

type View = "topics" | "quiz" | "dashboard" | "periodic-table" | "equations" | "added-content";

const subjectIcons: Record<Subject, React.ReactNode> = {
  biology: <Dna className="w-6 h-6 text-white" />,
  chemistry: <FlaskConical className="w-6 h-6 text-white" />,
  physics: <Atom className="w-6 h-6 text-white" />,
};

export default function Home() {
  const { user, logout } = useAuth();
  const [view, setView] = useState<View>("topics");
  const [quizTopic, setQuizTopic] = useState<string | undefined>();
  const [subject, setSubject] = useState<Subject>("biology");
  const [showUpload, setShowUpload] = useState(false);
  const [customQuizCards, setCustomQuizCards] = useState<Flashcard[] | undefined>();
  const [customQuizLabel, setCustomQuizLabel] = useState<string | undefined>();

  const startQuiz = (topicId?: string) => {
    setCustomQuizCards(undefined);
    setCustomQuizLabel(undefined);
    setQuizTopic(topicId);
    setView("quiz");
  };

  const startAddedQuiz = (subj: Subject, cards: Flashcard[]) => {
    setSubject(subj);
    setCustomQuizCards(cards);
    setCustomQuizLabel(`Added ${subj.charAt(0).toUpperCase() + subj.slice(1)} Content`);
    setQuizTopic(undefined);
    setView("quiz");
  };

  const goBack = () => {
    setView("topics");
    setQuizTopic(undefined);
    setCustomQuizCards(undefined);
    setCustomQuizLabel(undefined);
  };

  const switchSubject = (s: Subject) => {
    setSubject(s);
    setView("topics");
    setQuizTopic(undefined);
    setCustomQuizCards(undefined);
    setCustomQuizLabel(undefined);
  };

  const theme = subjectTheme[subject];

  return (
    <AuthGate>
      <PaymentGate>
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-10 bg-gradient-to-br rounded-xl flex items-center justify-center transition-all duration-300 ${theme.gradient}`}
            >
              {subjectIcons[subject]}
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
            {subject === "physics" && (
              <Button
                variant={view === "equations" ? "default" : "ghost"}
                size="sm"
                onClick={() => setView("equations")}
                className="gap-1.5"
              >
                <Calculator className="w-4 h-4" />
                <span className="hidden sm:inline">Equations</span>
              </Button>
            )}
            <Button
              variant={view === "added-content" ? "default" : "ghost"}
              size="sm"
              onClick={() => setView("added-content")}
              className="gap-1.5"
            >
              <FolderPlus className="w-4 h-4" />
              <span className="hidden sm:inline">Added</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowUpload(true)}
              className="gap-1.5 text-green-600 hover:text-green-700 hover:bg-green-50"
            >
              <Upload className="w-4 h-4" />
              <span className="hidden sm:inline">Upload</span>
            </Button>
            {user && user.role !== "user" && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.href = "/admin"}
                className="gap-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50"
              >
                <Shield className="w-4 h-4" />
                <span className="hidden sm:inline">Admin</span>
              </Button>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={logout}
              className="gap-1.5 text-gray-400 hover:text-red-500"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </nav>
        </div>

        {/* Subject Switcher */}
        <div className="max-w-5xl mx-auto px-4 pb-3">
          <div className="flex gap-2">
            {(["biology", "chemistry", "physics"] as Subject[]).map((s) => {
              const t = subjectTheme[s];
              const icons: Record<Subject, string> = { biology: "🧬", chemistry: "⚗️", physics: "⚛️" };
              const labels: Record<Subject, string> = { biology: "Biology", chemistry: "Chemistry", physics: "Physics" };
              return (
                <button
                  key={s}
                  onClick={() => switchSubject(s)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    subject === s
                      ? `${t.lightBg} ${t.lightText} ring-2 ${t.ring} shadow-sm`
                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                  }`}
                >
                  <span className="text-lg">{icons[s]}</span>
                  {labels[s]}
                </button>
              );
            })}
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
              <QuizMode
                onBack={goBack}
                topicFilter={quizTopic}
                subject={subject}
                customCards={customQuizCards}
                customLabel={customQuizLabel}
              />
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

          {view === "equations" && (
            <motion.div
              key="equations"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <div className="bg-white rounded-2xl shadow-sm border p-6">
                <PhysicsEquations />
              </div>
            </motion.div>
          )}

          {view === "added-content" && (
            <motion.div
              key="added-content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <AddedContent onStartQuiz={startAddedQuiz} onUpload={() => setShowUpload(true)} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Upload Modal */}
      <ContentUpload isOpen={showUpload} onClose={() => setShowUpload(false)} />
    </div>
      </PaymentGate>
    </AuthGate>
  );
}
