"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import {
  loadPerformance,
  savePerformance,
  recordAnswer as localRecordAnswer,
  type CardPerformance,
} from "@/lib/spaced-repetition";
import type { Flashcard } from "@/data/flashcards";

const MIGRATION_KEY = "bio-revision-migrated";

function hasLocalData(): boolean {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("bio-revision-performance");
  return !!stored && stored !== "{}";
}

function isAlreadyMigrated(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(MIGRATION_KEY) === "true";
}

function markAsMigrated(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(MIGRATION_KEY, "true");
}

export function usePerformance() {
  const [performance, setPerformance] = useState<Record<string, CardPerformance>>({});
  const [loading, setLoading] = useState(true);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load performance from server, fall back to localStorage
  useEffect(() => {
    async function load() {
      try {
        // Try server first
        const res = await fetch("/api/performance/load");
        if (res.ok) {
          const data = await res.json();
          setPerformance(data.performance);
          // Cache locally
          savePerformance(data.performance);

          // Check if we need to migrate local data
          if (hasLocalData() && !isAlreadyMigrated()) {
            const localPerf = loadPerformance();
            if (Object.keys(localPerf).length > 0) {
              await fetch("/api/performance/sync", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ performance: localPerf }),
              });
              markAsMigrated();
              // Reload from server to get merged data
              const res2 = await fetch("/api/performance/load");
              if (res2.ok) {
                const data2 = await res2.json();
                setPerformance(data2.performance);
                savePerformance(data2.performance);
              }
            }
          }
        } else {
          // Fallback to localStorage
          setPerformance(loadPerformance());
        }
      } catch {
        setPerformance(loadPerformance());
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  // Debounced sync to server
  const syncToServer = useCallback(
    (perf: Record<string, CardPerformance>) => {
      if (syncTimer.current) clearTimeout(syncTimer.current);
      syncTimer.current = setTimeout(async () => {
        try {
          await fetch("/api/performance/sync", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ performance: perf }),
          });
        } catch {
          // Silently fail — localStorage has the data
        }
      }, 2000);
    },
    []
  );

  // Record answer: update locally immediately, sync to server in background
  const recordAnswerAndSync = useCallback(
    (card: Flashcard, correct: boolean) => {
      const updated = localRecordAnswer(performance, card, correct);
      setPerformance(updated);
      syncToServer(updated);
      return updated;
    },
    [performance, syncToServer]
  );

  return { performance, loading, setPerformance, recordAnswerAndSync };
}
