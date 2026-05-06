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
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://design-planner.com"
  ),
  title: "Design Planner — Interior Design & Functional Planning",
  description:
    "We design residential spaces through thoughtful planning, interior design, technical documentation, and realization support.",
  icons: {
    icon: "/logo.png",
  },
  openGraph: {
    title: "Design Planner — Interior Design & Functional Planning",
    description:
      "We design residential spaces through thoughtful planning, interior design, technical documentation, and realization support.",
    type: "website",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1448,
        height: 1086,
        alt: "Design Planner — Interior Design",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Design Planner — Interior Design & Functional Planning",
    description:
      "We design residential spaces through thoughtful planning, interior design, technical documentation, and realization support.",
    images: ["/images/hero.jpg"],
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
