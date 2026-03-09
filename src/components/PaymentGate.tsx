"use client";

import { useState } from "react";
import { useAuth } from "@/components/AuthProvider";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Clock, CreditCard } from "lucide-react";

export function PaymentGate({ children }: { children: React.ReactNode }) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(false);

  if (!user) return null;
  if (user.hasAccess) return <>{children}</>;

  // Trial expired and not paid and no free access
  const handlePay = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/payment/create-checkout", {
        method: "POST",
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      }
    } catch {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <Card className="max-w-md w-full">
        <CardContent className="p-8 text-center">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-8 h-8 text-indigo-500" />
          </div>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Your Free Trial Has Ended
          </h1>
          <p className="text-gray-500 mb-6">
            Get lifetime access to all GCSE revision content, quizzes, and
            the WhatsApp study bot.
          </p>

          <div className="space-y-3 text-left mb-6">
            {[
              "560+ flashcards across Biology, Chemistry & Physics",
              "Spaced repetition for efficient learning",
              "WhatsApp quiz bot & study reminders",
              "Upload your own content with AI",
            ].map((feature) => (
              <div key={feature} className="flex items-start gap-2">
                <span className="text-green-500 mt-0.5">&#10003;</span>
                <span className="text-sm text-gray-600">{feature}</span>
              </div>
            ))}
          </div>

          <Button
            onClick={handlePay}
            disabled={loading}
            className="w-full gap-2 mb-3"
            size="lg"
          >
            <CreditCard className="w-4 h-4" />
            {loading ? "Redirecting..." : "Get Lifetime Access"}
          </Button>

          <div className="flex items-center justify-center gap-1 text-xs text-gray-400 mb-4">
            <Clock className="w-3 h-3" />
            <span>One-time payment, no subscription</span>
          </div>

          <button
            onClick={logout}
            className="text-xs text-gray-400 hover:text-gray-600"
          >
            Log out
          </button>
        </CardContent>
      </Card>
    </div>
  );
}
