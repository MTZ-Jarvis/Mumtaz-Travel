import "./globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import AssistantWidget from "@/components/AssistantWidget";

export const metadata: Metadata = {
  title: "Mumtaz Madaniah Utama",
  description: "Umroh resmi & amanah — Mumtaz Madaniah Utama",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className="antialiased bg-white">
        <Navbar />
        {children}
        <AssistantWidget />
      </body>
    </html>
  );
}
