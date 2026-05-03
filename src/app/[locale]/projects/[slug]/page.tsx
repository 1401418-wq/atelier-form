import Link from "next/link";
import { projects } from "@/lib/projects";
import type { Locale } from "@/lib/translations";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: Locale }>;
}) {
  const { locale } = await params;

  return (
    <main className="pt-28">
      <section className="px-6 md:px-12 py-24">
        <div className="max-w-[1200px] mx-auto">

          {/* Заголовок */}
          <div className="mb-20">
            <h1 className="text-5xl md:text-7xl font-light tracking-[-0.04em]">
              Проекты
            </h1>
          </div>

          {/* Список */}
          <div className="border-t border-neutral-200">
            {projects.map((project, index) => (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
                className="group block border-b border-neutral-200 py-10"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

                  <div className="md:col-span-1 text-sm text-neutral-400">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="md:col-span-5">
                    <h2 className="text-2xl md:text-3xl font-light tracking-[-0.02em] group-hover:translate-x-2 transition">
                      {project.title[locale]}
                    </h2>
                  </div>

                  <div className="md:col-span-4 text-neutral-500">
                    {project.shortDescription[locale]}
                  </div>

                  <div className="md:col-span-2 text-right text-sm text-neutral-400">
                    {project.area} · {project.year}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
