"use client";

import type { Locale } from "@/lib/translations";

type HeroProps = {
  locale: Locale;
};

export function Hero({ locale }: HeroProps) {
  return (
    <section className="px-6 md:px-12 pt-40 pb-32 min-h-[90vh] flex items-center">
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-2 gap-20 items-end">
        <div>
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-400 mb-10">
            Functional residential design
          </p>

          <h1 className="text-7xl md:text-[150px] font-light leading-[0.85] tracking-[-0.08em]">
            Atelier
            <br />
            Form
          </h1>

          <p className="mt-12 text-2xl md:text-3xl font-light leading-snug text-neutral-600 max-w-xl">
            Продуманные пространства.
            <br />
            Где форма работает на жизнь.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-8">
            <a
              href={`/${locale}/projects`}
              className="border border-neutral-400 px-9 py-4 text-xs uppercase tracking-[0.3em] hover:bg-neutral-900 hover:text-white transition"
            >
              Смотреть проекты
            </a>

            <a
              href="#contact"
              className="text-xs uppercase tracking-[0.3em] text-neutral-500 hover:text-neutral-900 transition"
            >
              Обсудить проект
            </a>
          </div>
        </div>

        <div className="border-l border-neutral-200 pl-12">
          <p className="text-xs uppercase tracking-[0.45em] text-neutral-400 mb-10">
            Функциональное планирование
          </p>

          <div className="space-y-10">
            {[
              ["01", "Логика пространства", "Планировка строится вокруг реальных сценариев жизни."],
              ["02", "Эргономика", "Каждый метр должен работать удобно, спокойно и точно."],
              ["03", "Визуальная чистота", "Эстетика появляется там, где нет случайных решений."],
            ].map(([num, title, text]) => (
              <div key={num} className="grid grid-cols-12 gap-6 border-t border-neutral-200 pt-8">
                <span className="col-span-2 text-xs text-neutral-400">{num}</span>
                <div className="col-span-10">
                  <h3 className="text-2xl md:text-3xl font-light tracking-[-0.03em]">
                    {title}
                  </h3>
                  <p className="mt-3 text-neutral-500 leading-relaxed max-w-sm">
                    {text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
