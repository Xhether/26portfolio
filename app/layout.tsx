import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import Nav from "@/components/Nav";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Charles Liggins",
  description: "Personal site of Charles Liggins.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${jetbrainsMono.variable} antialiased`}>
      <body className="min-h-screen">
        <Nav />
        <main className="px-6 sm:px-12 py-8 pr-32 sm:pr-48 max-w-6xl">
          {children}
        </main>
      </body>
    </html>
  );
}
