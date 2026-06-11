import Link from "next/link";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/translations";

type ApproachProps = {
  locale: Locale;
};

const content = {
  ru: {
    label: "ПРОЦЕСС",
    title: ["От первой встречи", "до реализации"],
    brief_label: "Для подписавшихся клиентов",
    brief_text: "После заключения договора мы пришлём подробный бриф — техническое задание на 19 разделов: от планировки и сантехники до света, отделки и эстетики. Заполняется онлайн, черновик сохраняется автоматически.",
    brief_cta: "Открыть бриф →",
    steps: [
      {
        num: "01",
        title: "Знакомство и замер",
        text: "Обсуждаем задачу, фиксируем вводные, проводим замер и фотофиксацию пространства.",
      },
      {
        num: "02",
        title: "Планировочная логика",
        text: "Выстраиваем сценарии жизни, эргономику и несколько вариантов планировочного решения.",
      },
      {
        num: "03",
        title: "Рабочая документация",
        text: "Готовим чертежи, схемы, спецификации и решения, необходимые для реализации проекта.",
      },
      {
        num: "04",
        title: "Реализация и сопровождение",
        text: "Помогаем пройти этап реализации спокойно: уточняем решения, контролируем детали и поддерживаем процесс.",
      },
    ],
  },
  en: {
    label: "PROCESS",
    title: ["From first meeting", "to completion"],
    brief_label: "For signed clients",
    brief_text: "After signing the contract we share a detailed brief — a technical assignment across 19 sections covering layout, plumbing, lighting, finishing and aesthetics. Filled out online, draft is saved automatically.",
    brief_cta: "Open the brief →",
    steps: [
      {
        num: "01",
        title: "Briefing and measurements",
        text: "Discussing the task, collecting inputs, measuring and documenting the space.",
      },
      {
        num: "02",
        title: "Planning logic",
        text: "Building living scenarios, ergonomics and several layout options.",
      },
      {
        num: "03",
        title: "Working documentation",
        text: "Preparing drawings, schemes, specifications and decisions needed for implementation.",
      },
      {
        num: "04",
        title: "Implementation support",
        text: "Helping the project move calmly through execution, clarifying decisions and supporting the process.",
      },
    ],
  },
};

export function Approach({ locale }: ApproachProps) {
  const t = content[locale];

  return (
    <section id="approach" className="py-20 md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left: label + title */}
          <FadeIn className="md:col-span-4">
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-5">{t.label}</p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em]">
              {t.title[0]}
              <br />
              {t.title[1]}
            </h2>
          </FadeIn>

          {/* Right: steps */}
          <div className="md:col-span-8">
            {t.steps.map((step, index) => (
              <FadeIn key={step.num} delay={index * 100}>
                <div className="group border-t border-border py-7 md:py-9 grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] gap-x-4 md:gap-x-6 items-start cursor-default motion-safe:transition-colors duration-500 md:hover:border-foreground/25">

                  {/* Number */}
                  <span className="text-[10px] tracking-[0.28em] text-muted uppercase pt-[0.35rem] motion-safe:transition-colors duration-700 md:group-hover:text-foreground/60">
                    {step.num}
                  </span>

                  <div className="space-y-2.5">
                    {/* Title */}
                    <h3 className="font-display text-[1.375rem] md:text-[1.75rem] font-light leading-[1.2] tracking-[-0.02em] motion-safe:transition-transform duration-700 md:group-hover:translate-x-1">
                      {step.title}
                    </h3>
                    {/* Description */}
                    <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744]">
                      {step.text}
                    </p>
                  </div>

                </div>
              </FadeIn>
            ))}
            {/* Closing border after last step */}
            <div className="border-b border-border" />

            <FadeIn delay={400}>
              <div className="mt-8 md:mt-10 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 p-6 md:p-7 border border-border bg-[#faf7f2]">
                <div className="flex-1">
                  <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-2">
                    {t.brief_label}
                  </p>
                  <p className="text-[0.9375rem] leading-[1.7] text-[#4A4744]">
                    {t.brief_text}
                  </p>
                </div>
                <Link
                  href="/tz"
                  className="label text-[#8a7a66] hover:text-[#4A4744] transition-colors shrink-0"
                >
                  {t.brief_cta}
                </Link>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
}
