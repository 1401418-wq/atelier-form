import type { Metadata } from "next";
import { Navigation } from "@/components/layout/Navigation";
import type { Locale } from "@/lib/translations";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";

  const title = isRu
    ? "Design Planner — дизайн интерьера и функциональное планирование"
    : "Design Planner — Interior Design & Functional Planning";

  const description = isRu
    ? "Проектируем жилые пространства: планировочные решения, дизайн-проект, рабочая документация и сопровождение реализации."
    : "We design residential spaces through thoughtful planning, interior design, technical documentation, and realization support.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      locale: isRu ? "ru_RU" : "en_US",
      images: [
        {
          url: "/images/hero.jpg",
          width: 1448,
          height: 1086,
          alt: "Design Planner",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/hero.jpg"],
    },
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
