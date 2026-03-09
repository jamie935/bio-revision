"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  type Subject,
  subjects,
  subjectTheme,
  getAddedContent,
  getAddedContentCount,
} from "@/data/subjects";
import { type Flashcard } from "@/data/flashcards";
import { usePerformance } from "@/lib/performance-api";
import {
  Upload,
  ChevronLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";

interface AddedContentProps {
  onStartQuiz: (subject: Subject, cards: Flashcard[]) => void;
  onUpload: () => void;
}

export function AddedContent({ onStartQuiz, onUpload }: AddedContentProps) {
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [expandedCard, setExpandedCard] = useState<string | null>(null);
  const { performance } = usePerformance();

  const addedContent = getAddedContent();
  const counts = getAddedContentCount();
  const totalAdded = counts.biology + counts.chemistry + counts.physics;

  // Empty state
  if (totalAdded === 0) {
    return (
      <div className="text-center py-16">
        <Upload className="w-12 h-12 text-gray-300 mx-auto mb-4" />
        <h2 className="text-xl font-bold text-gray-700 mb-2">No Added Content Yet</h2>
        <p className="text-gray-500 mb-6">
          Upload photos of textbook pages or notes to generate flashcards automatically.
        </p>
        <Button onClick={onUpload} className="gap-2">
          <Upload className="w-4 h-4" />
          Upload Content
        </Button>
      </div>
    );
  }

  // Drill-down: flashcards for a specific topic
  if (selectedSubject && selectedTopic) {
    const content = addedContent[selectedSubject];
    const topicData = content.topics.find((t) => t.id === selectedTopic);
    const topicCards = content.flashcards.filter((c) => c.topic === selectedTopic);
    const theme = subjectTheme[selectedSubject];

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedTopic(null);
                setExpandedCard(null);
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
              <span>{topicData?.icon}</span>
              {topicData?.name}
            </h2>
          </div>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => onStartQuiz(selectedSubject, topicCards)}
          >
            <GraduationCap className="w-4 h-4" /> Quiz These Cards
          </Button>
        </div>

        <div className="space-y-3">
          {topicCards.map((card, i) => {
            const isExpanded = expandedCard === card.id;
            const perf = performance[card.id];
            const diffLabel = card.difficulty === 1 ? "Foundation" : card.difficulty === 2 ? "Intermediate" : "Higher";
            const diffColor = card.difficulty === 1 ? "bg-green-100 text-green-800" : card.difficulty === 2 ? "bg-amber-100 text-amber-800" : "bg-red-100 text-red-800";

            return (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                <Card
                  className={`cursor-pointer transition-all hover:shadow-md ${isExpanded ? "ring-2 " + theme.ring : ""}`}
                  onClick={() => setExpandedCard(isExpanded ? null : card.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-1">
                      <Badge variant="outline" className="text-[10px]">{card.subtopic}</Badge>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full ${diffColor}`}>{diffLabel}</span>
                    </div>
                    <p className="font-medium text-sm mt-2">{card.question}</p>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="mt-3 pt-3 border-t"
                      >
                        <p className="text-sm text-gray-700 mb-2">{card.answer}</p>
                        <ul className="space-y-1">
                          {card.keyPoints.map((kp, j) => (
                            <li key={j} className={`text-xs flex items-start gap-1.5 ${theme.bullet}`}>
                              <span className="mt-1">•</span>
                              <span className="text-gray-600">{kp}</span>
                            </li>
                          ))}
                        </ul>
                        {card.examTip && (
                          <div className="mt-2 bg-amber-50 border border-amber-200 rounded-lg p-2 text-xs text-amber-800">
                            💡 {card.examTip}
                          </div>
                        )}
                        {perf && (
                          <div className="mt-2 text-[10px] text-gray-400">
                            Streak: {perf.streak} | Accuracy: {perf.correctCount + perf.incorrectCount > 0 ? Math.round((perf.correctCount / (perf.correctCount + perf.incorrectCount)) * 100) : 0}%
                          </div>
                        )}
                      </motion.div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Drill-down: topics for a specific subject
  if (selectedSubject) {
    const content = addedContent[selectedSubject];
    const config = subjects[selectedSubject];

    return (
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedSubject(null)}
            >
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <h2 className="text-xl font-bold text-gray-800">
              Added {config.name} Content
            </h2>
          </div>
          <Button
            size="sm"
            className="gap-2"
            onClick={() => onStartQuiz(selectedSubject, content.flashcards)}
          >
            <GraduationCap className="w-4 h-4" /> Quiz All Added
          </Button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          {content.flashcards.length} flashcard{content.flashcards.length !== 1 ? "s" : ""} across {content.topics.length} topic{content.topics.length !== 1 ? "s" : ""}
        </p>

        <div className="grid gap-3 md:grid-cols-2">
          {content.topics.map((topic, i) => {
            const topicCards = content.flashcards.filter((c) => c.topic === topic.id);
            return (
              <motion.div
                key={topic.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setSelectedTopic(topic.id)}
                >
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{topic.icon}</span>
                      <div>
                        <p className="font-medium text-sm">{topic.name}</p>
                        <p className="text-xs text-gray-500">{topicCards.length} cards</p>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400" />
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  // Overview: subject cards
  return (
    <div>
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-2xl font-bold text-gray-800">Added Content</h2>
        <Button
          variant="outline"
          size="sm"
          onClick={onUpload}
          className="gap-2"
        >
          <Upload className="w-4 h-4" /> Upload More
        </Button>
      </div>
      <p className="text-sm text-gray-500 mb-6">
        {totalAdded} flashcard{totalAdded !== 1 ? "s" : ""} from uploaded content
      </p>

      <div className="grid gap-4 md:grid-cols-3">
        {(["biology", "chemistry", "physics"] as Subject[]).map((subj, i) => {
          const config = subjects[subj];
          const theme = subjectTheme[subj];
          const count = counts[subj];
          if (count === 0) return null;

          return (
            <motion.div
              key={subj}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card
                className="cursor-pointer hover:shadow-lg transition-all"
                onClick={() => setSelectedSubject(subj)}
              >
                <CardContent className="p-6 text-center">
                  <span className="text-4xl block mb-3">{config.icon}</span>
                  <h3 className="font-semibold text-lg">{config.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{count} added card{count !== 1 ? "s" : ""}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <Badge variant="secondary" className={`text-xs ${theme.lightBg} ${theme.lightText}`}>
                      {addedContent[subj].topics.length} topic{addedContent[subj].topics.length !== 1 ? "s" : ""}
                    </Badge>
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
