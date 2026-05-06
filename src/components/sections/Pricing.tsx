"use client";

import { useEffect, useRef } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import styles from "./Pricing.module.css";
import type { Locale } from "@/lib/translations";

type Props = { locale: Locale };

const content = {
  ru: {
    eyebrow: "Форматы работы",
    title: "Тарифы",
    description:
      "Три уровня проработки проекта — от планировочного решения до полного сопровождения реализации.",
    includedTitle: "Во все тарифы входит:",
    included: [
      "Первичная консультация",
      "Замер объекта",
      "Фотофиксация",
      "Заключение договора",
    ],
    plans: [
      {
        id: "sketch",
        name: "Эскизный проект",
        price: "1 500 ₽/м²",
        badge: null as string | null,
        description:
          "Для тех, кому нужно продуманное планировочное решение и базовая концепция пространства.",
        items: [
          "Обмерный план",
          "План демонтажа и монтажа перегородок",
          "Варианты планировочных решений",
          "План расстановки мебели с размерами",
        ],
        featured: false,
      },
      {
        id: "basic",
        name: "Базовый проект",
        price: "2 500 ₽/м²",
        badge: "Оптимальный выбор" as string | null,
        description:
          "Оптимальный формат для полноценной рабочей подготовки проекта.",
        items: [
          "Всё из эскизного проекта",
          "План открывания дверей",
          "План расстановки сантехнического оборудования",
          "Инженерные коммуникации",
          "Детализация пола, тёплый пол",
          "План потолка",
          "План осветительных приборов с привязкой к выключателям",
          "Схема привязки электроустановочных изделий",
          "Фронтальные проекции стен",
          "Ведомость отделочных материалов",
        ],
        featured: true,
      },
      {
        id: "full",
        name: "Полный проект",
        price: "8 500 ₽/м²",
        badge: null as string | null,
        description:
          "Максимальная проработка проекта с визуализацией, подбором и сопровождением реализации.",
        items: [
          "Всё из базового проекта",
          "Подбор отделочных материалов",
          "3D-визуализация / 3D-тур по объекту",
          "Авторское сопровождение",
        ],
        featured: false,
      },
    ],
    cta: "Обсудить проект",
    additionalTitle: "Дополнительно",
    additionalText:
      "Визуальная презентация объекта — фото, видео и before/after формат для эффектной подачи реализованного пространства.",
  },
  en: {
    eyebrow: "Service formats",
    title: "Pricing",
    description:
      "Three levels of project depth — from a planning solution to full implementation support.",
    includedTitle: "Included in all plans:",
    included: [
      "Initial consultation",
      "Site measurement",
      "Photo documentation",
      "Contract signing",
    ],
    plans: [
      {
        id: "sketch",
        name: "Sketch Project",
        price: "1,500 ₽/m²",
        badge: null as string | null,
        description:
          "For those who need a well-considered layout solution and a basic spatial concept.",
        items: [
          "Measurement plan",
          "Demolition and partition installation plan",
          "Layout solution options",
          "Furniture layout plan with dimensions",
        ],
        featured: false,
      },
      {
        id: "basic",
        name: "Basic Project",
        price: "2,500 ₽/m²",
        badge: "Optimal choice" as string | null,
        description:
          "The optimal format for complete working project preparation.",
        items: [
          "Everything from the Sketch Project",
          "Door opening plan",
          "Sanitary equipment layout plan",
          "Engineering communications",
          "Floor detailing and underfloor heating",
          "Ceiling plan",
          "Lighting fixture plan linked to switches",
          "Electrical outlet and equipment layout plan",
          "Wall elevations",
          "Finishing materials schedule",
        ],
        featured: true,
      },
      {
        id: "full",
        name: "Full Project",
        price: "8,500 ₽/m²",
        badge: null as string | null,
        description:
          "Maximum project development with visualization, material selection and implementation support.",
        items: [
          "Everything from the Basic Project",
          "Selection of finishing materials",
          "3D visualization / 3D tour of the object",
          "Author's supervision",
        ],
        featured: false,
      },
    ],
    cta: "Discuss a project",
    additionalTitle: "Additional",
    additionalText:
      "Visual presentation of the project — photo, video and before/after format for impressive presentation of the completed space.",
  },
};

export function Pricing({ locale }: Props) {
  const t = content[locale];
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];

    // Under reduced motion: show all cards immediately, no animation
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      cards.forEach((card) => card.classList.add(styles.inView));
      return;
    }

    const STAGGER_MS = 140; // within 120–160ms range

    const observers = cards.map((card, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              card.classList.add(styles.inView);
            }, index * STAGGER_MS);
            observer.disconnect();
          }
        },
        { threshold: 0.2 } // fires at 20% visibility
      );
      observer.observe(card);
      return observer;
    });

    return () => observers.forEach((obs) => obs.disconnect());
  }, []);

  return (
    <section id="pricing" className="py-20 md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header — uses shared FadeIn (unchanged) */}
        <FadeIn className="mb-10 md:mb-14">
          <p className="label mb-5">{t.eyebrow}</p>
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] mb-5">
            {t.title}
          </h2>
          <p className="body-text max-w-lg">{t.description}</p>
        </FadeIn>

        {/* Included in all plans — uses shared FadeIn (unchanged) */}
        <FadeIn delay={80} className="mb-12 md:mb-16">
          <div className="border-t border-border pt-7">
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-5">
              {t.includedTitle}
            </p>
            <ul className="flex flex-wrap gap-x-10 gap-y-2.5">
              {t.included.map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-muted">
                  <span className="w-2.5 h-px bg-muted-light shrink-0" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </FadeIn>

        {/* Cards — custom reveal: 28px/900ms mobile, 20px/750ms desktop, threshold 0.2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
          {t.plans.map((plan, index) => (
            <div
              key={plan.id}
              ref={(el) => { cardRefs.current[index] = el; }}
              className={[
                styles.card,
                styles.cardReveal,
                plan.featured ? styles.cardFeatured : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {plan.badge && (
                <span className={styles.badge}>{plan.badge}</span>
              )}

              <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-3">
                {plan.name}
              </p>

              <p className="font-display text-[2.25rem] md:text-[2.5rem] font-light leading-none tracking-[-0.02em] mb-5">
                {plan.price}
              </p>

              <p className="text-sm leading-relaxed text-[#4A4744]">
                {plan.description}
              </p>

              <div className={styles.divider} />

              <ul className={styles.items}>
                {plan.items.map((item) => (
                  <li key={item} className={styles.item}>
                    <span className={styles.itemDash} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>

              <a href="#contact" className={styles.cta}>
                {t.cta}
              </a>
            </div>
          ))}
        </div>

        {/* Additional services — uses shared FadeIn (unchanged) */}
        <FadeIn delay={400} className="mt-12 md:mt-16">
          <div className="border-t border-border pt-8 max-w-2xl">
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-3">
              {t.additionalTitle}
            </p>
            <p className="text-sm leading-relaxed text-[#4A4744]">
              {t.additionalText}
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
