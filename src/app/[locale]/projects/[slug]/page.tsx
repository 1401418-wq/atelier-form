import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import translations, { locales, type Locale } from "@/lib/translations";

const localImages: Record<string, string> = {
  "warm-apartment": "/projects/light-apartment.png",
  "open-plan-house": "/projects/open-plan-house.png",
  "soft-bedroom": "/projects/soft-bedroom.png",
};

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
  const imageSrc = localImages[slug] || project.heroImage;

  return (
    <main className="pt-24 pb-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">

        <Link
          href={`/${locale}/projects`}
          className="inline-block text-[11px] uppercase tracking-[0.28em] text-neutral-500 hover:text-neutral-900 transition mb-12"
        >
          {t.project.back}
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-start">

          <div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] mb-8">
              {project.title[locale]}
            </h1>

            <div className="flex gap-8 mb-8">
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

            <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744]">
              {project.description[locale]}
            </p>
          </div>

          <div className="relative aspect-[4/3] w-full overflow-hidden">
            <Image
              src={imageSrc}
              alt={project.title[locale]}
              fill
              className="object-cover"
              sizes="(max-width: 767px) 100vw, 50vw"
              priority
            />
          </div>

        </div>
      </div>
    </main>
  );
}
