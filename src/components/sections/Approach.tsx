"use client";

type ApproachProps = {
  locale: "ru" | "en";
};

export function Approach({ locale }: ApproachProps) {
  const t =
    locale === "ru"
      ? {
          label: "Подход",
          title: "Сначала функция. Затем форма.",
          items: [
            {
              title: "Логика пространства",
              text: "Планировка строится вокруг реальных сценариев жизни.",
            },
            {
              title: "Эргономика",
              text: "Каждый метр должен работать удобно, спокойно и точно.",
            },
            {
              title: "Визуальная чистота",
              text: "Эстетика появляется там, где нет случайных решений.",
            },
          ],
        }
      : {
          label: "Approach",
          title: "Function first. Form follows.",
          items: [
            {
              title: "Interior logic",
              text: "Planning is built around real living scenarios.",
            },
            {
              title: "Ergonomics",
              text: "Every meter should work comfortably and precisely.",
            },
            {
              title: "Visual clarity",
              text: "Aesthetics appear when nothing is accidental.",
            },
          ],
        };

  return (
    <section id="approach" className="px-6 md:px-12 py-[72px] md:py-32 border-t border-neutral-200">
      <div className="max-w-[1400px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          <div className="md:col-span-5">
            <p className="text-xs uppercase tracking-[0.35em] text-neutral-400 mb-6 md:mb-8">
              {t.label}
            </p>

            <h2 className="font-display text-[clamp(1.875rem,7vw,5rem)] font-light leading-[1.05] tracking-[-0.04em] max-w-xl">
              {t.title}
            </h2>
          </div>

          <div className="md:col-span-7 md:pt-28">
            <div className="divide-y divide-neutral-200 border-t border-neutral-200">
              {t.items.map((item, index) => (
                <div key={index} className="group grid grid-cols-12 gap-4 md:gap-6 py-7 md:py-10">
                  <span className="col-span-2 text-xs text-neutral-500 pt-1 md:pt-2">
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="col-span-10 space-y-2 md:space-y-3">
                    <h3 className="text-xl md:text-3xl font-light tracking-[-0.02em] text-neutral-800 transition duration-300 group-hover:translate-x-2">
                      {item.title}
                    </h3>

                    <p className="text-neutral-400 leading-relaxed max-w-md text-sm md:text-base">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}