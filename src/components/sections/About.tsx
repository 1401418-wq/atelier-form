"use client";

import translations from "@/lib/translations";

type AboutProps = {
  locale: "ru" | "en";
};

export function About({ locale }: AboutProps) {
  const t = translations[locale];

  return (
    <section id="about" className="px-6 md:px-12 py-[72px] md:py-24 border-t border-border">
      <div className="max-w-[1200px] mx-auto space-y-10 md:space-y-16">
        <div className="space-y-3 md:space-y-4 max-w-xl">
          <h2 className="font-display text-[clamp(1.75rem,6vw,3rem)] font-light">
            {t.about.heading}
          </h2>
          <p className="text-neutral-600 text-sm md:text-base leading-relaxed">
            {t.about.subheading}
          </p>
        </div>

        <div className="space-y-5 md:space-y-6 max-w-2xl">
          {t.about.description.map((text, i) => (
            <p key={i} className="text-base md:text-lg text-neutral-700 leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10 pt-4 md:pt-10">
          {t.about.values.map((item, i) => (
            <div key={i} className="space-y-1 md:space-y-2">
              <p className="text-sm text-neutral-400 uppercase tracking-wide">
                {item.label}
              </p>
              <p className="text-neutral-700 text-sm md:text-base">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
