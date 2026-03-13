"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { type Subject, subjects, subjectTheme, getAddedContentCount } from "@/data/subjects";
import {
  getOverallStats,
  getTopicStats,
  getWeakestTopics,
  resetPerformance,
} from "@/lib/spaced-repetition";
import { usePerformance } from "@/lib/performance-api";
import { getExamHistory, type ExamSessionRecord } from "./ExamMode";
import {
  Brain,
  Target,
  BookOpen,
  AlertTriangle,
  Trophy,
  TrendingUp,
  Trash2,
  FileText,
  Clock,
  Upload,
} from "lucide-react";

interface DashboardProps {
  onStartQuiz: (topicId?: string) => void;
  subject: Subject;
}

export function Dashboard({ onStartQuiz, subject }: DashboardProps) {
  const { performance, setPerformance } = usePerformance();
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [examHistory, setExamHistory] = useState<ExamSessionRecord[]>([]);

  const subjectData = subjects[subject];
  const currentTopics = subjectData.topics;
  const currentFlashcards = subjectData.flashcards;
  const addedCounts = getAddedContentCount();

  useEffect(() => {
    setExamHistory(getExamHistory().filter((r) => r.subject === subject).slice(0, 5));
  }, [subject]);

  const overall = getOverallStats(currentFlashcards, performance);
  const weakAreas = getWeakestTopics(currentFlashcards, performance).slice(0, 5);

  const handleReset = () => {
    resetPerformance();
    setPerformance({});
    setShowResetConfirm(false);
  };

  const theme = subjectTheme[subject];
  const accentColor = theme.accent;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">{subjectData.name} Dashboard</h2>
          <p className="text-sm text-gray-500">Track your revision progress</p>
        </div>
      </div>

      {/* Overall Stats */}
      <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-8">
        {[
          {
            icon: BookOpen,
            label: "Total Cards",
            value: overall.totalCards,
            color: accentColor,
            bg: theme.bg,
          },
          {
            icon: Target,
            label: "Attempted",
            value: `${overall.attempted}/${overall.totalCards}`,
            color: "text-blue-500",
            bg: "bg-blue-50",
          },
          {
            icon: Trophy,
            label: "Mastered",
            value: overall.mastered,
            color: "text-green-500",
            bg: "bg-green-50",
          },
          {
            icon: Brain,
            label: "Accuracy",
            value: `${overall.accuracy}%`,
            color: "text-purple-500",
            bg: "bg-purple-50",
          },
        ].map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card>
              <CardContent className="p-4 text-center">
                <div className={`w-10 h-10 rounded-full ${stat.bg} flex items-center justify-center mx-auto mb-2`}>
                  <stat.icon className={`w-5 h-5 ${stat.color}`} />
                </div>
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs text-gray-500">{stat.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Topic Progress */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className={`w-5 h-5 ${accentColor}`} />
              Topic Progress
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentTopics.map((topic) => {
                const stats = getTopicStats(currentFlashcards, performance, topic.id);
                const progress = Math.round(
                  ((stats.mastered + stats.learning * 0.5) / stats.totalCards) * 100
                );

                return (
                  <div key={topic.id}>
                    <div className="flex items-center justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span>{topic.icon}</span>
                        <span className="text-sm font-medium">{topic.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-500">
                          {stats.accuracy}% accuracy
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => onStartQuiz(topic.id)}
                        >
                          Practice
                        </Button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Progress value={progress} className="h-2 flex-1" />
                      <span className="text-xs text-gray-500 w-8">{progress}%</span>
                    </div>
                    {stats.weakSubtopics.length > 0 && (
                      <div className="flex gap-1 mt-1 flex-wrap">
                        {stats.weakSubtopics.map((sub) => (
                          <Badge
                            key={sub}
                            variant="secondary"
                            className="text-[10px] bg-red-50 text-red-600"
                          >
                            Weak: {sub}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Weak Areas */}
      {weakAreas.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                Areas That Need Work
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {weakAreas.map((area, i) => {
                  const topicData = currentTopics.find((t) => t.id === area.topic);
                  return (
                    <div
                      key={i}
                      className="flex items-center justify-between bg-red-50 border border-red-100 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-2">
                        <span>{topicData?.icon}</span>
                        <div>
                          <p className="text-sm font-medium">{area.subtopic}</p>
                          <p className="text-xs text-gray-500">{topicData?.name}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="destructive" className="text-xs">
                          {area.accuracy}%
                        </Badge>
                        <Button
                          variant="outline"
                          size="sm"
                          className="h-7 text-xs"
                          onClick={() => onStartQuiz(area.topic)}
                        >
                          Practice
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Exam Paper History */}
      {examHistory.length > 0 && (
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.55 }}
        >
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className={`w-5 h-5 ${accentColor}`} />
                Exam Paper History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {examHistory.map((record) => {
                  const topicData = record.topic
                    ? currentTopics.find((t) => t.id === record.topic)
                    : null;
                  const totalMarks = record.mcqCorrect + record.structuredMarks;
                  const totalPossible = record.mcqTotal + record.structuredTotal;
                  const date = new Date(record.date);
                  const mins = Math.floor(record.timeTakenSeconds / 60);
                  const secs = record.timeTakenSeconds % 60;

                  return (
                    <div
                      key={record.id}
                      className="flex items-center justify-between bg-gray-50 border border-gray-100 rounded-lg p-3"
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm bg-gradient-to-br ${theme.gradient}`}
                        >
                          {record.overallPercent}%
                        </div>
                        <div>
                          <p className="text-sm font-medium">
                            {topicData ? topicData.name : "All Topics"}
                          </p>
                          <p className="text-xs text-gray-400">
                            {date.toLocaleDateString()} — {mins}m {secs}s
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary" className="text-xs">
                          {totalMarks}/{totalPossible} marks
                        </Badge>
                        {record.mcqTotal > 0 && (
                          <Badge className="text-[10px] bg-blue-50 text-blue-600">
                            MCQ {record.mcqCorrect}/{record.mcqTotal}
                          </Badge>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      )}

      {/* Uploaded Content */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.58 }}
      >
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Upload className={`w-5 h-5 ${accentColor}`} />
              Uploaded Content
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {(["biology", "chemistry", "physics"] as Subject[]).map((s) => {
                const count = addedCounts[s];
                const t = subjectTheme[s];
                const icons: Record<Subject, string> = { biology: "🧬", chemistry: "⚗️", physics: "⚛️" };
                const labels: Record<Subject, string> = { biology: "Biology", chemistry: "Chemistry", physics: "Physics" };
                return (
                  <div
                    key={s}
                    className={`text-center p-3 rounded-xl border ${
                      s === subject ? `${t.lightBg} border-transparent` : "border-gray-100"
                    }`}
                  >
                    <span className="text-lg">{icons[s]}</span>
                    <p className="text-xl font-bold mt-1">{count}</p>
                    <p className="text-[10px] text-gray-500">{labels[s]} cards</p>
                  </div>
                );
              })}
            </div>
            {addedCounts.biology + addedCounts.chemistry + addedCounts.physics === 0 && (
              <p className="text-xs text-gray-400 text-center mt-3">
                No content uploaded yet. Use the Upload button to add your own questions.
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Reset */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        {!showResetConfirm ? (
          <Button
            variant="ghost"
            size="sm"
            className="text-gray-400 hover:text-red-500"
            onClick={() => setShowResetConfirm(true)}
          >
            <Trash2 className="w-3 h-3 mr-1" /> Reset All Progress
          </Button>
        ) : (
          <div className="inline-flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg p-3">
            <p className="text-sm text-red-700">Are you sure? This cannot be undone.</p>
            <Button variant="destructive" size="sm" onClick={handleReset}>
              Reset
            </Button>
            <Button variant="outline" size="sm" onClick={() => setShowResetConfirm(false)}>
              Cancel
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
