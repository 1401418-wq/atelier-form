"use client";

import type { Locale } from "@/lib/translations";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  return (
    <section className="px-6 md:px-12 pt-24 md:pt-40 pb-20 md:pb-32">
      <div className="max-w-[1400px] mx-auto w-full">

        {/* TOP TEXT */}
        <p className="text-[11px] uppercase tracking-[0.35em] text-neutral-500 mb-6">
          Functional residential design
        </p>

        {/* TITLE */}
        <h1 className="text-[64px] leading-[0.9] tracking-[-0.06em] font-light md:text-[150px]">
          Design
          <br />
          Planner
        </h1>

        {/* CTA */}
        <div className="mt-4">
          <a
            href="#contact"
            className="text-[13px] uppercase tracking-[0.25em] text-neutral-800 border-b border-neutral-500 pb-[2px]"
          >
            Обсудить проект
          </a>
        </div>

        {/* IMAGE */}
        <div className="mt-6 overflow-hidden">
          <img
            src="/images/hero.jpg"
            alt="Design Planner"
            className="w-full object-cover transition duration-700 ease-out hover:scale-[1.05] hover:brightness-110"
            style={{
              height: "clamp(260px, 50vw, 520px)",
            }}
          />
        </div>

        {/* TEXT UNDER IMAGE */}
        <p className="mt-4 text-[15px] leading-relaxed text-neutral-700">
          Проектируем пространства, в которых удобно жить. От продуманной
          планировки до полной реализации интерьера.
        </p>

      </div>
    </section>
  );
}