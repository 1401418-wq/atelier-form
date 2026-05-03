import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import type { Locale } from "@/lib/translations";



export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  return {
    title:
      locale === "ru"
        ? "Atelier Form — Дизайн жилых пространств"
        : "Atelier Form — Residential Space Design",
    description:
      locale === "ru"
        ? "Студия функционального проектирования и дизайна интерьеров. Москва."
        : "Studio for functional planning and interior design. Moscow.",
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  return (
    <>
      <Navigation locale={locale} />
      <main>{children}</main>
     
    </>
  );
}
