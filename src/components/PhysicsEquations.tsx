"use client";

import { useState } from "react";
import { equationCategories, type EquationCategory } from "@/data/physics-equations";

const CATEGORY_COLORS: Record<string, { bg: string; border: string; text: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",   border: "border-blue-200",   text: "text-blue-700",   badge: "bg-blue-100 text-blue-700" },
  yellow: { bg: "bg-amber-50",  border: "border-amber-200",  text: "text-amber-700",  badge: "bg-amber-100 text-amber-700" },
  purple: { bg: "bg-purple-50", border: "border-purple-200", text: "text-purple-700", badge: "bg-purple-100 text-purple-700" },
  green:  { bg: "bg-green-50",  border: "border-green-200",  text: "text-green-700",  badge: "bg-green-100 text-green-700" },
  red:    { bg: "bg-red-50",    border: "border-red-200",    text: "text-red-700",    badge: "bg-red-100 text-red-700" },
  indigo: { bg: "bg-indigo-50", border: "border-indigo-200", text: "text-indigo-700", badge: "bg-indigo-100 text-indigo-700" },
  gray:   { bg: "bg-slate-50",  border: "border-slate-200",  text: "text-slate-700",  badge: "bg-slate-100 text-slate-700" },
};

interface PhysicsEquationsProps {
  className?: string;
}

export function PhysicsEquations({ className }: PhysicsEquationsProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [showHigherOnly, setShowHigherOnly] = useState(true);

  const filteredCategories =
    activeCategory === "all"
      ? equationCategories
      : equationCategories.filter((c) => c.id === activeCategory);

  return (
    <div className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-lg font-bold text-gray-800">📐 Equation Sheet</h3>
          <p className="text-xs text-gray-400">Pearson Edexcel IGCSE Physics (4PH1)</p>
        </div>
        <label className="flex items-center gap-1.5 text-xs text-gray-500 cursor-pointer">
          <input
            type="checkbox"
            checked={showHigherOnly}
            onChange={(e) => setShowHigherOnly(e.target.checked)}
            className="rounded border-gray-300 text-indigo-500 focus:ring-indigo-500"
          />
          Show Higher only
        </label>
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-1.5 mb-4">
        <button
          onClick={() => setActiveCategory("all")}
          className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
            activeCategory === "all"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
          }`}
        >
          All
        </button>
        {equationCategories.map((cat) => {
          const colors = CATEGORY_COLORS[cat.color];
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-2.5 py-1 rounded-full text-xs font-medium transition-colors ${
                activeCategory === cat.id
                  ? `${colors.badge} ring-1 ring-current`
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {cat.name}
            </button>
          );
        })}
      </div>

      {/* Equations grid */}
      <div className="space-y-4">
        {filteredCategories.map((cat) => (
          <CategorySection
            key={cat.id}
            category={cat}
            showHigherOnly={showHigherOnly}
          />
        ))}
      </div>
    </div>
  );
}

function CategorySection({
  category,
  showHigherOnly,
}: {
  category: EquationCategory;
  showHigherOnly: boolean;
}) {
  const colors = CATEGORY_COLORS[category.color];
  const equations = showHigherOnly
    ? category.equations
    : category.equations.filter((eq) => !eq.higherOnly);

  if (equations.length === 0) return null;

  return (
    <div>
      <h4 className={`text-sm font-semibold ${colors.text} mb-2`}>
        {category.name}
      </h4>
      <div className="grid gap-2 sm:grid-cols-2">
        {equations.map((eq) => (
          <div
            key={eq.name}
            className={`${colors.bg} ${colors.border} border rounded-xl p-3 relative`}
          >
            {eq.higherOnly && (
              <span className="absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[9px] font-bold bg-white/70 text-gray-400 border border-gray-200">
                HIGHER
              </span>
            )}
            <p className="text-[10px] font-medium text-gray-400 uppercase tracking-wider mb-1">
              {eq.name}
            </p>
            <p className={`text-base font-bold ${colors.text} font-mono tracking-wide mb-1.5`}>
              {eq.formula}
            </p>
            <p className="text-[10px] text-gray-500 leading-relaxed">
              {eq.variables}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
