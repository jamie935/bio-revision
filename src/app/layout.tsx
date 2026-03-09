import type { Metadata } from "next";
import { Dancing_Script } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";

const dancingScript = Dancing_Script({
  subsets: ["latin"],
  weight: ["700"],
  variable: "--font-signature",
});

export const metadata: Metadata = {
  title: "GCSE Revision - Edexcel IGCSE",
  description: "Interactive flashcards and revision notes for GCSE Biology, Chemistry & Physics (Edexcel IGCSE) with spaced repetition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-gray-50 min-h-screen ${dancingScript.variable}`}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
