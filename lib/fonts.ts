import {
  Google_Sans_Code as FontMono,
  Geist as FontSans,
  Inter,
} from "next/font/google";

import { cn } from "@/lib/utils";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

// Next has no fallback metrics for Google Sans Code. Turbopack ignores
// `adjustFontFallback: false` and warns unless an explicit fallback is given.
const fontMono = FontMono({
  adjustFontFallback: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400"],
});

const fontInter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const fontVariables = cn(
  fontSans.variable,
  fontMono.variable,
  fontInter.variable
);
