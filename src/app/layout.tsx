import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "GCSE Biology Revision - Edexcel IGCSE",
  description: "Interactive flashcards and revision notes for Year 10 GCSE Biology (Edexcel IGCSE) with spaced repetition",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-gray-50 min-h-screen">
        {children}
      </body>
    </html>
  );
}
