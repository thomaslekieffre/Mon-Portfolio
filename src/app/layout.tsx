import type { Metadata } from "next";
import { Sen, Aldrich } from "next/font/google";
import "./globals.css";

const sen = Sen({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const aldrich = Aldrich({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Thomas Lekieffre - Développeur Full-Stack",
  description:
    "Portfolio de Thomas Lekieffre, développeur full-stack passionné. Next.js, React, TypeScript, Rust. Découvrez mes projets et compétences.",
  keywords: [
    "Thomas Lekieffre",
    "développeur",
    "full-stack",
    "portfolio",
    "React",
    "Next.js",
    "TypeScript",
  ],
  authors: [{ name: "Thomas Lekieffre" }],
  openGraph: {
    title: "Thomas Lekieffre - Développeur Full-Stack",
    description:
      "Portfolio de Thomas Lekieffre, développeur full-stack passionné. Découvrez mes projets et compétences.",
    type: "website",
    locale: "fr_FR",
  },
  twitter: {
    card: "summary_large_image",
    title: "Thomas Lekieffre - Développeur Full-Stack",
    description:
      "Portfolio de Thomas Lekieffre, développeur full-stack passionné.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${sen.variable} ${aldrich.variable}`}>
      <body>{children}</body>
    </html>
  );
}
