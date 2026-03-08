"use client";

import { useState } from "react";
import {
  elements,
  CATEGORY_COLORS,
  CATEGORY_LABELS,
  type Element,
} from "@/data/periodic-table-data";

interface PeriodicTableProps {
  className?: string;
}

export function PeriodicTable({ className }: PeriodicTableProps) {
  const [hoveredElement, setHoveredElement] = useState<Element | null>(null);

  return (
    <div className={className}>
      {/* Title */}
      <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider text-center mb-2">
        Periodic Table
      </p>

      {/* Hovered element detail */}
      <div className="h-14 mb-2 flex items-center justify-center">
        {hoveredElement ? (
          <div className="text-center">
            <div className="flex items-baseline justify-center gap-1">
              <span className="text-xs text-gray-400">{hoveredElement.atomicNumber}</span>
              <span className="text-2xl font-bold text-gray-800">{hoveredElement.symbol}</span>
            </div>
            <p className="text-[10px] text-gray-600 leading-tight">{hoveredElement.name}</p>
          </div>
        ) : (
          <p className="text-[10px] text-gray-400 text-center">
            Hover an element
          </p>
        )}
      </div>

      {/* Grid: 18 columns, rows 1-7 + spacer + lanthanides + actinides */}
      <div
        className="grid gap-[1px]"
        style={{
          gridTemplateColumns: "repeat(18, 1fr)",
          gridTemplateRows: "repeat(7, 1fr) 6px repeat(2, 1fr)",
        }}
      >
        {elements.map((el) => {
          const colors = CATEGORY_COLORS[el.category];
          const isHovered = hoveredElement?.atomicNumber === el.atomicNumber;

          return (
            <div
              key={el.atomicNumber}
              className={`
                ${colors.bg} ${colors.text}
                rounded-[2px] flex flex-col items-center justify-center
                cursor-default select-none transition-transform duration-100
                ${isHovered ? "ring-1 ring-gray-800 scale-[1.4] z-10 shadow-md" : ""}
              `}
              style={{
                gridRow: el.row + 1,
                gridColumn: el.col + 1,
                aspectRatio: "1",
                minWidth: 0,
              }}
              onMouseEnter={() => setHoveredElement(el)}
              onMouseLeave={() => setHoveredElement(null)}
            >
              <span className="text-[5px] leading-none opacity-50">{el.atomicNumber}</span>
              <span className="text-[7px] font-bold leading-none">{el.symbol}</span>
            </div>
          );
        })}
      </div>

      {/* Category legend */}
      <div className="mt-3 flex flex-wrap gap-x-2 gap-y-1 justify-center">
        {CATEGORY_LABELS.map(({ key, label }) => {
          const colors = CATEGORY_COLORS[key];
          return (
            <div key={key} className="flex items-center gap-0.5">
              <div className={`w-2 h-2 rounded-sm ${colors.bg}`} />
              <span className="text-[7px] text-gray-500">{label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
