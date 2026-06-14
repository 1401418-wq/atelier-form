import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import translations, { locales, type Locale } from "@/lib/translations";

export async function generateStaticParams() {
  return locales.flatMap((locale) =>
    projects.map((project) => ({ locale, slug: project.slug }))
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>;
}) {
  const { locale, slug } = await params;
  const project = projects.find((p) => p.slug === slug);

  if (!project) notFound();

  const t = translations[locale];

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">

        <Link
          href={`/${locale}/projects`}
          className="inline-block text-[11px] uppercase tracking-[0.28em] text-neutral-500 hover:text-neutral-900 transition mb-10"
        >
          {t.project.back}
        </Link>

        {/* Заголовок + мета */}
        <header className="mb-12 md:mb-16">
          <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] mb-8 max-w-3xl">
            {project.title[locale]}
          </h1>
          <div className="flex flex-wrap gap-8 md:gap-12">
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-1">
                {t.project.area}
              </p>
              <p className="text-sm text-neutral-800">{project.area}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-1">
                {t.project.year}
              </p>
              <p className="text-sm text-neutral-800">{project.year}</p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-1">
                {t.project.location}
              </p>
              <p className="text-sm text-neutral-800">{project.location[locale]}</p>
            </div>
          </div>
        </header>

        {/* Hero фото */}
        <div className="relative aspect-[4/5] md:aspect-[16/9] w-full overflow-hidden mb-16 md:mb-20">
          <Image
            src={project.heroImage}
            alt={project.title[locale]}
            fill
            className="object-cover"
            sizes="(max-width: 1200px) 100vw, 1200px"
            priority
          />
        </div>

        {/* Текстовые блоки: задача / концепция / особенность */}
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-y-10 md:gap-y-12 gap-x-12 mb-20 md:mb-24">
          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mt-1">
              {t.project.brief}
            </p>
          </div>
          <p className="text-[1rem] md:text-[1.0625rem] leading-[1.75] text-[#1f1d1b]">
            {project.brief[locale]}
          </p>

          <div>
            <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mt-1">
              {t.project.concept}
            </p>
          </div>
          <p className="text-[1rem] md:text-[1.0625rem] leading-[1.75] text-[#1f1d1b]">
            {project.concept[locale]}
          </p>

          {project.highlight && (
            <>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mt-1">
                  {t.project.highlight}
                </p>
              </div>
              <p className="text-[1rem] md:text-[1.0625rem] leading-[1.75] text-[#1f1d1b]">
                {project.highlight[locale]}
              </p>
            </>
          )}

          {project.partner && (
            <>
              <div>
                <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mt-1">
                  {t.project.partner}
                </p>
              </div>
              <p className="text-[0.9375rem] leading-[1.7] text-[#1f1d1b]">
                <a
                  href={project.partner.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="border-b border-neutral-400 hover:text-neutral-600 transition"
                >
                  {project.partner.name[locale]}
                </a>
              </p>
            </>
          )}
        </div>

        {/* Галерея */}
        <section>
          <p className="text-[10px] uppercase tracking-[0.28em] text-neutral-400 mb-6 md:mb-8">
            {t.project.gallery}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
            {project.gallery.slice(1).map((src, i) => (
              <div
                key={src}
                className="relative aspect-[3/4] w-full overflow-hidden bg-neutral-100"
              >
                <Image
                  src={src}
                  alt={`${project.title[locale]} — ${i + 2}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 600px"
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </section>

        {/* Возврат */}
        <div className="mt-20 md:mt-24">
          <Link
            href={`/${locale}/projects`}
            className="inline-block text-[11px] uppercase tracking-[0.28em] text-neutral-500 hover:text-neutral-900 transition"
          >
            {t.project.back}
          </Link>
        </div>

      </div>
    </main>
  );
}
