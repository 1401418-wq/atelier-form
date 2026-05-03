import type { Metadata } from "next";
import { Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Design Planner — Архитектурное проектирование и дизайн интерьеров",
  description:
    "Студия функционального проектирования и дизайна жилых пространств. Москва.",
  keywords: ["дизайн интерьера", "архитектура", "планирование", "Москва"],
  openGraph: {
    title: "Design Planner",
    description: "Функциональное проектирование и дизайн жилых пространств",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={cormorant.variable}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
