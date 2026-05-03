import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import type { Locale } from "@/lib/translations";

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: Locale };
}

export async function generateMetadata({ params }: LocaleLayoutProps): Promise<Metadata> {
  const { locale } =  params;
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

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } =  params;

  return (
    <>
      <Navigation locale={locale} />
      <main>{children}</main>
     
    </>
  );
}
