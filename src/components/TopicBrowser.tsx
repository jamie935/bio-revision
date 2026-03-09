"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { type Flashcard } from "@/data/flashcards";
import { type Subject, subjects, subjectTheme } from "@/data/subjects";
import { getTopicStats, type TopicStats } from "@/lib/spaced-repetition";
import { usePerformance } from "@/lib/performance-api";
import { ChevronLeft, ChevronRight, BookOpen, Lightbulb, CheckCircle2, AlertTriangle, FileText } from "lucide-react";
import { topicSummaries } from "@/data/topic-summaries";
import { TopicSummaryView } from "./TopicSummary";

interface TopicBrowserProps {
  onStartQuiz: (topicId?: string) => void;
  subject: Subject;
}

export function TopicBrowser({ onStartQuiz, subject }: TopicBrowserProps) {
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [selectedSubtopic, setSelectedSubtopic] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { performance } = usePerformance();
  const [topicStats, setTopicStats] = useState<Record<string, TopicStats>>({});
  const [showSummary, setShowSummary] = useState(false);

  const subjectData = subjects[subject];
  const currentTopics = subjectData.topics;
  const currentFlashcards = subjectData.flashcards;

  useEffect(() => {
    // Reset drill-down when subject changes
    setSelectedTopic(null);
    setSelectedSubtopic(null);
    setExpandedCard(null);
    setShowSummary(false);
  }, [subject]);

  useEffect(() => {
    const stats: Record<string, TopicStats> = {};
    for (const topic of currentTopics) {
      stats[topic.id] = getTopicStats(currentFlashcards, performance, topic.id);
    }
    setTopicStats(stats);
  }, [subject, currentTopics, currentFlashcards, performance]);

  const selectedTopicData = currentTopics.find((t) => t.id === selectedTopic);

  function getFlashcardsBySubtopic(topicId: string, subtopic: string): Flashcard[] {
    return currentFlashcards.filter((f) => f.topic === topicId && f.subtopic === subtopic);
  }

  // Topic list view
  if (!selectedTopic) {
    return (
      <div>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">{subjectData.name} Topics</h2>
            <p className="text-sm text-gray-500">Choose a topic to revise</p>
          </div>
          <Button onClick={() => onStartQuiz()} className="gap-2">
            <BookOpen className="w-4 h-4" /> Quick Quiz (All Topics)
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {currentTopics.map((topic, i) => {
            const stats = topicStats[topic.id];
            const progressPercent = stats
              ? Math.round(((stats.mastered + stats.learning * 0.5) / stats.totalCards) * 100)
              : 0;

            return (
              <motion.div
                key={topic.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-3xl">{topic.icon}</span>
                        <div>
                          <CardTitle className="text-lg">{topic.name}</CardTitle>
                          <CardDescription>
                            {topic.subtopics.length} subtopics
                          </CardDescription>
                        </div>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-2">
                      <span>Progress</span>
                      <span>{progressPercent}%</span>
                    </div>
                    <Progress value={progressPercent} className="h-2" />
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {stats && stats.mastered > 0 && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          {stats.mastered} mastered
                        </Badge>
                      )}
                      {stats && stats.weakSubtopics.length > 0 && (
                        <Badge variant="secondary" className="text-xs bg-red-100 text-red-700">
                          {stats.weakSubtopics.length} weak area{stats.weakSubtopics.length > 1 ? "s" : ""}
                        </Badge>
                      )}
                      {stats && stats.unseen > 0 && (
                        <Badge variant="secondary" className="text-xs bg-blue-100 text-blue-700">
                          {stats.unseen} new
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Subtopic / card view
  const subtopicCards = selectedSubtopic && selectedTopicData
    ? getFlashcardsBySubtopic(selectedTopic, selectedSubtopic)
    : [];

  const theme = subjectTheme[subject];
  const accentColor = theme.accent;
  const ringColor = theme.ring;

  // Find the summary for this topic
  const topicSummary = selectedTopic
    ? topicSummaries.find((s) => s.topicId === selectedTopic && s.subject === subject)
    : undefined;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              if (selectedSubtopic) {
                setSelectedSubtopic(null);
                setExpandedCard(null);
              } else {
                setSelectedTopic(null);
                setShowSummary(false);
              }
            }}
          >
            <ChevronLeft className="w-4 h-4 mr-1" /> Back
          </Button>
          <div>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>{selectedTopicData?.icon}</span>
              {selectedSubtopic || selectedTopicData?.name}
            </h2>
          </div>
        </div>
        <Button onClick={() => onStartQuiz(selectedTopic)} size="sm" className="gap-2">
          <BookOpen className="w-4 h-4" /> Quiz This Topic
        </Button>
      </div>

      {/* Summary / Flashcards tab toggle — only show when NOT in a subtopic */}
      {!selectedSubtopic && topicSummary && (
        <div className="flex gap-2 mb-5">
          <button
            onClick={() => setShowSummary(false)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              !showSummary
                ? `${theme.lightBg} ${theme.lightText} ring-2 ${theme.ring}`
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <BookOpen className="w-4 h-4" /> Flashcards
          </button>
          <button
            onClick={() => setShowSummary(true)}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium transition-all ${
              showSummary
                ? `${theme.lightBg} ${theme.lightText} ring-2 ${theme.ring}`
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
            }`}
          >
            <FileText className="w-4 h-4" /> Summary Notes
          </button>
        </div>
      )}

      {/* Show summary view */}
      {!selectedSubtopic && showSummary && topicSummary ? (
        <TopicSummaryView summary={topicSummary} />
      ) : !selectedSubtopic && !showSummary ? (
        // Subtopic list
        <div className="grid gap-3">
          {selectedTopicData?.subtopics.map((subtopic, i) => {
            const subCards = getFlashcardsBySubtopic(selectedTopic, subtopic);
            const attempted = subCards.filter((c) => performance[c.id]).length;
            const mastered = subCards.filter(
              (c) => performance[c.id]?.streak >= 3
            ).length;

            return (
              <motion.div
                key={subtopic}
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedSubtopic(subtopic)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-10 rounded-full ${selectedTopicData?.color}`} />
                      <div>
                        <h3 className="font-semibold">{subtopic}</h3>
                        <p className="text-sm text-gray-500">{subCards.length} cards</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right text-xs text-gray-500">
                        <p>{mastered}/{subCards.length} mastered</p>
                        <p>{attempted}/{subCards.length} attempted</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400" />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      ) : (
        // Card list (revision notes style)
        <div className="space-y-3">
          {subtopicCards.map((card, i) => {
            const perf = performance[card.id];
            const isExpanded = expandedCard === card.id;

            return (
              <motion.div
                key={card.id}
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className={`cursor-pointer transition-all ${
                    isExpanded ? `ring-2 ${ringColor} shadow-lg` : "hover:shadow-md"
                  }`}
                  onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <h3 className="font-medium text-gray-800 flex-1 pr-4">{card.question}</h3>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        {perf?.streak >= 3 && (
                          <CheckCircle2 className="w-5 h-5 text-green-500" />
                        )}
                        {perf && perf.streak < 3 && perf.incorrectCount > perf.correctCount && (
                          <AlertTriangle className="w-5 h-5 text-amber-500" />
                        )}
                      </div>
                    </div>

                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 mt-4 border-t">
                            <p className="text-gray-700 leading-relaxed mb-4">{card.answer}</p>

                            <div className="space-y-1 mb-3">
                              <p className="text-xs font-semibold text-gray-500 uppercase">Key Points:</p>
                              {card.keyPoints.map((point, j) => (
                                <motion.p
                                  key={j}
                                  initial={{ x: -10, opacity: 0 }}
                                  animate={{ x: 0, opacity: 1 }}
                                  transition={{ delay: j * 0.05 }}
                                  className="text-sm text-gray-600 flex items-start gap-2"
                                >
                                  <span className={accentColor}>•</span> {point}
                                </motion.p>
                              ))}
                            </div>

                            {card.examTip && (
                              <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 flex items-start gap-2">
                                <Lightbulb className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                                <p className="text-sm text-amber-800">
                                  <span className="font-semibold">Exam Tip:</span> {card.examTip}
                                </p>
                              </div>
                            )}

                            {perf && (
                              <div className="mt-3 flex gap-2 text-xs text-gray-500">
                                <span>Correct: {perf.correctCount}</span>
                                <span>|</span>
                                <span>Incorrect: {perf.incorrectCount}</span>
                                <span>|</span>
                                <span>Streak: {perf.streak}</span>
                              </div>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
