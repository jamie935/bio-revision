"use client";

import { createContext, useContext, useState, useEffect, useCallback, useRef } from "react";

export interface User {
  id: string;
  phone: string;
  displayName: string | null;
  role: "user" | "admin" | "super_admin";
  hasAccess: boolean;
  trialEndsAt: string;
  hasPaid: boolean;
  freeAccess: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refreshUser: () => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  refreshUser: async () => {},
  logout: async () => {},
});

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const retryCount = useRef(0);

  const refreshUser = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me", {
        cache: "no-store",
        headers: { "Cache-Control": "no-cache" },
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        retryCount.current = 0; // Reset retry count on success
      } else if (res.status === 401) {
        // Only clear user on explicit 401 (unauthorized), not on other errors
        setUser(null);
        retryCount.current = 0;
      } else {
        // Server error (500, 502, etc.) — don't log out, retry
        console.warn(`Auth check returned ${res.status}, retrying...`);
        if (retryCount.current < 2) {
          retryCount.current++;
          // Wait a moment then retry
          await new Promise((r) => setTimeout(r, 1000));
          const retryRes = await fetch("/api/auth/me", {
            cache: "no-store",
            headers: { "Cache-Control": "no-cache" },
          });
          if (retryRes.ok) {
            const data = await retryRes.json();
            setUser(data.user);
            retryCount.current = 0;
          } else if (retryRes.status === 401) {
            setUser(null);
          }
          // If retry also fails with non-401, keep existing user state
        }
      }
    } catch {
      // Network error — don't immediately log out
      console.warn("Auth check network error, retrying...");
      if (retryCount.current < 2) {
        retryCount.current++;
        try {
          await new Promise((r) => setTimeout(r, 1000));
          const retryRes = await fetch("/api/auth/me", {
            cache: "no-store",
            headers: { "Cache-Control": "no-cache" },
          });
          if (retryRes.ok) {
            const data = await retryRes.json();
            setUser(data.user);
            retryCount.current = 0;
          } else if (retryRes.status === 401) {
            setUser(null);
          }
        } catch {
          // Still failing — only clear if we never had a user
          if (!user) setUser(null);
        }
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  const logout = useCallback(async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/login";
  }, []);

  useEffect(() => {
    refreshUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, refreshUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
