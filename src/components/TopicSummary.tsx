"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { type TopicSummary as TopicSummaryType, type SummarySection } from "@/data/topic-summaries";
import { ChevronDown, BookOpen, FlaskConical, Lightbulb } from "lucide-react";

interface TopicSummaryProps {
  summary: TopicSummaryType;
}

// Colour palette that cycles through sections
const SECTION_COLORS = [
  {
    border: "border-l-blue-400",
    headerBg: "bg-blue-50",
    headerText: "text-blue-800",
    chevron: "text-blue-400",
    dot: "bg-blue-400",
  },
  {
    border: "border-l-emerald-400",
    headerBg: "bg-emerald-50",
    headerText: "text-emerald-800",
    chevron: "text-emerald-400",
    dot: "bg-emerald-400",
  },
  {
    border: "border-l-purple-400",
    headerBg: "bg-purple-50",
    headerText: "text-purple-800",
    chevron: "text-purple-400",
    dot: "bg-purple-400",
  },
  {
    border: "border-l-orange-400",
    headerBg: "bg-orange-50",
    headerText: "text-orange-800",
    chevron: "text-orange-400",
    dot: "bg-orange-400",
  },
  {
    border: "border-l-pink-400",
    headerBg: "bg-pink-50",
    headerText: "text-pink-800",
    chevron: "text-pink-400",
    dot: "bg-pink-400",
  },
  {
    border: "border-l-teal-400",
    headerBg: "bg-teal-50",
    headerText: "text-teal-800",
    chevron: "text-teal-400",
    dot: "bg-teal-400",
  },
  {
    border: "border-l-rose-400",
    headerBg: "bg-rose-50",
    headerText: "text-rose-800",
    chevron: "text-rose-400",
    dot: "bg-rose-400",
  },
  {
    border: "border-l-cyan-400",
    headerBg: "bg-cyan-50",
    headerText: "text-cyan-800",
    chevron: "text-cyan-400",
    dot: "bg-cyan-400",
  },
];

function SectionBlock({ section, index }: { section: SummarySection; index: number }) {
  const [isOpen, setIsOpen] = useState(index === 0); // first section open by default
  const colors = SECTION_COLORS[index % SECTION_COLORS.length];

  return (
    <motion.div
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: index * 0.05 }}
    >
      <Card className={`overflow-hidden border-l-4 ${colors.border}`}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full text-left p-4 flex items-center justify-between transition-colors ${
            isOpen ? colors.headerBg : `hover:${colors.headerBg}`
          }`}
        >
          <div className="flex items-center gap-2.5">
            <div className={`w-2 h-2 rounded-full ${colors.dot}`} />
            <h3 className={`font-semibold text-base ${isOpen ? colors.headerText : "text-gray-800"}`}>
              {section.heading}
            </h3>
          </div>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className={`w-5 h-5 ${isOpen ? colors.chevron : "text-gray-400"}`} />
          </motion.div>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CardContent className="pt-0 pb-5 px-5 space-y-4">
                {/* Main content */}
                <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
                  {section.content}
                </div>

                {/* Key Terms */}
                {section.keyTerms && section.keyTerms.length > 0 && (
                  <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                    <h4 className="text-xs font-bold text-indigo-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" /> Key Terms
                    </h4>
                    <dl className="space-y-1.5">
                      {section.keyTerms.map((kt, i) => (
                        <div key={i} className="text-sm">
                          <dt className="inline font-semibold text-indigo-900">{kt.term}: </dt>
                          <dd className="inline text-indigo-800">{kt.definition}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                )}

                {/* Important Equations */}
                {section.importantEquations && section.importantEquations.length > 0 && (
                  <div className="bg-amber-50 border border-amber-100 rounded-lg p-4">
                    <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wider mb-2 flex items-center gap-1">
                      <FlaskConical className="w-3.5 h-3.5" /> Important Equations
                    </h4>
                    <ul className="space-y-1">
                      {section.importantEquations.map((eq, i) => (
                        <li key={i} className="text-sm font-mono bg-white/60 rounded px-2 py-1 text-amber-900">
                          {eq}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Tables */}
                {section.tables && section.tables.map((table, ti) => (
                  <div key={ti} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="bg-gray-50 px-3 py-2 border-b">
                      <h4 className="text-xs font-bold text-gray-600 uppercase tracking-wider">
                        {table.title}
                      </h4>
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="bg-gray-50">
                            {table.headers.map((h, hi) => (
                              <th key={hi} className="text-left px-3 py-2 font-semibold text-gray-700 text-xs">
                                {h}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {table.rows.map((row, ri) => (
                            <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
                              {row.map((cell, ci) => (
                                <td key={ci} className="px-3 py-2 text-gray-700 border-t border-gray-100">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                ))}
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
}

export function TopicSummaryView({ summary }: TopicSummaryProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center gap-2 mb-4">
        <Lightbulb className="w-5 h-5 text-amber-500" />
        <h3 className="font-semibold text-gray-700">Summary Notes</h3>
        <Badge variant="secondary" className="text-xs">
          {summary.sections.length} sections
        </Badge>
      </div>
      {summary.sections.map((section, i) => (
        <SectionBlock key={i} section={section} index={i} />
      ))}
    </div>
  );
}
