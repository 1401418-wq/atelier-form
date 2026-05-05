"use client";

import Link from "next/link";
import Image from "next/image";
import { projects } from "@/lib/projects";
import translations, { type Locale } from "@/lib/translations";
import styles from "./ProjectsPreview.module.css";

const projectImages: Record<string, string> = {
  "warm-apartment": "/projects/light-apartment.png",
  "open-plan-house": "/projects/open-plan-house.png",
  "soft-bedroom": "/projects/soft-bedroom.png",
};

type Props = {
  locale: Locale;
};

export function ProjectsPreview({ locale }: Props) {
  const slugOrder = ["warm-apartment", "open-plan-house", "soft-bedroom"];
  const featured = slugOrder
    .map((slug) => projects.find((p) => p.slug === slug))
    .filter(Boolean) as typeof projects;

  return (
    <section id="projects" className="px-6 md:px-12 pt-[72px] pb-[72px] md:pt-[140px] md:pb-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10 md:mb-16">
          <h2 className="font-display text-[clamp(2rem,8vw,4rem)] font-light tracking-[-0.04em]">
            {translations[locale].projects.heading}
          </h2>
        </div>

        <div className={styles.grid}>
          {featured.map((project) => {
            const descPart = project.shortDescription[locale]
              .split(" · ")
              .slice(1)
              .join(" · ");
            return (
              <Link
                key={project.id}
                href={`/${locale}/projects/${project.slug}`}
                className={styles.card}
              >
                <Image
                  src={projectImages[project.slug] || project.heroImage}
                  alt={project.title[locale]}
                  fill
                  className={styles.cardImage}
                  sizes="(max-width: 767px) 100vw, 33vw"
                />
                <div className={styles.gradient} />
                <div className={styles.caption}>
                  <p className={styles.captionTitle}>{project.title[locale]}</p>
                  <p className={styles.captionMeta}>
                    {project.area} · {project.year}
                  </p>
                  <p className={styles.captionDesc}>{descPart}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
