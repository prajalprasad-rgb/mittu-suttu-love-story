import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Prajal & Annie | A Luxury Love Story",
  description:
    "A cinematic, premium romantic website celebrating a personal love story through memories, letters, voice notes, dreams, and gratitude.",
  keywords: [
    "luxury romantic website",
    "couple story",
    "wedding inspired website",
    "personal love story",
  ],
  openGraph: {
    title: "Prajal & Annie | A Luxury Love Story",
    description:
      "A cinematic romantic experience crafted with elegance, memories, letters, and future dreams.",
    type: "website",
    images: [
      {
        url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85",
        width: 1600,
        height: 1000,
        alt: "Luxury romantic celebration",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cormorant.variable}`}>
      <body>{children}</body>
    </html>
  );
}
