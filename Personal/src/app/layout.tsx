import type { Metadata } from "next";
import { Barlow_Condensed, DM_Sans, JetBrains_Mono } from "next/font/google";
import { PROFILE } from "@/data/projects";
import "./globals.css";

const barlowCondensed = Barlow_Condensed({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const dmSans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: `${PROFILE.name} | ${PROFILE.role}`,
  description: PROFILE.about,
  keywords: [PROFILE.name, PROFILE.role, "Next.js Portfolio", "Software Engineer", "React", "TypeScript"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${dmSans.variable} ${barlowCondensed.variable} ${jetbrainsMono.variable} min-h-screen bg-background text-foreground antialiased`}>
        {children}
      </body>
    </html>
  );
}
