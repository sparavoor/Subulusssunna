import type { Metadata } from "next";
import { Outfit, Playfair_Display, Metrophobic } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});
const metrophobic = Metrophobic({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-metrophobic",
});

export const metadata: Metadata = {
  title: "Subulussunna Islamic Institution",
  description: "Excellence in Islamic and Secular Education",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={cn(
          outfit.variable,
          playfair.variable,
          metrophobic.variable,
          "min-h-screen bg-background font-sans antialiased flex flex-col"
        )}
      >
        {children}
      </body>
    </html>
  );
}
