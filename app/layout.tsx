import type { Metadata } from "next";
import { Nunito_Sans, Schoolbell } from "next/font/google";
import RoughFilter from "@/components/RoughFilter";
import "./globals.css";

// Schoolbell ships a single weight, so it has to be declared explicitly.
const schoolbell = Schoolbell({
  variable: "--font-schoolbell",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

// Nunito Sans is variable, so the weight range comes along for free.
const nunito = Nunito_Sans({
  variable: "--font-nunito",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Charles Liggins",
  description:
    "A human driven to build efficient, accessible software that people actually love.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${schoolbell.variable} ${nunito.variable} antialiased`}
    >
      <body className="overflow-x-hidden bg-paper text-ink">
        <RoughFilter />
        {children}
      </body>
    </html>
  );
}
