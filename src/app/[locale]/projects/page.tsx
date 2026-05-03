import Link from "next/link";
import type { Locale } from "@/lib/translations";

interface ProjectsPageProps {
  params: Promise<{ locale: Locale }>;
}

export default async function ProjectsPage({ params }: ProjectsPageProps) {
  const { locale } = await params;

  const projects = [
    ["01", "Светлая квартира", "78 м² · тёплый минимализм", "2024"],
    ["02", "Дом с открытой планировкой", "240 м² · пространство и свет", "2023"],
    ["03", "Спальня в мягких тонах", "34 м² · спокойная зона отдыха", "2024"],
    ["04", "Современный дом", "160 м² · архитектура и природа", "2022"],
  ];

  return (
    <main className="px-6 md:px-12 pt-40 pb-32 min-h-screen">
      <section className="max-w-[1400px] mx-auto">
        <p className="text-xs uppercase tracking-[0.45em] text-neutral-400 mb-10">
          Избранные работы
        </p>

        <h1 className="text-6xl md:text-[120px] font-light leading-[0.85] tracking-[-0.08em] mb-24">
          Проекты
        </h1>

        <div className="border-t border-neutral-200">
          {projects.map(([num, title, desc, year]) => (
            <Link
              key={num}
              href={`/${locale}`}
              className="group grid grid-cols-1 md:grid-cols-12 gap-8 border-b border-neutral-200 py-12 transition hover:bg-neutral-50"
            >
              <div className="md:col-span-1 text-xs text-neutral-400">
                {num}
              </div>

              <h2 className="md:col-span-5 text-3xl md:text-5xl font-light tracking-[-0.05em] transition group-hover:translate-x-2">
                {title}
              </h2>

              <p className="md:col-span-4 text-neutral-500 leading-relaxed">
                {desc}
              </p>

              <div className="md:col-span-2 text-xs text-neutral-400 md:text-right">
                {year}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}