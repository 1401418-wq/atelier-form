"use client";

import { translations } from "@/lib/translations";

type AboutProps = {
  locale: "ru" | "en";
};

export function About({ locale }: AboutProps) {
  const t = translations[locale];

  return (
    <section className="px-6 md:px-12 py-24">
      <div className="max-w-[1200px] mx-auto space-y-16">
        <div className="space-y-4 max-w-xl">
          <h2 className="text-3xl md:text-5xl font-light">
            {t.about.heading}
          </h2>

          <p className="text-neutral-600">
            {t.about.subheading}
          </p>
        </div>

        <div className="space-y-6 max-w-2xl">
          {t.about.description.map((text, i) => (
            <p key={i} className="text-lg text-neutral-700 leading-relaxed">
              {text}
            </p>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pt-10">
          {t.about.values.map((item, i) => (
            <div key={i} className="space-y-2">
              <p className="text-sm text-neutral-400 uppercase tracking-wide">
                {item.label}
              </p>

              <p className="text-neutral-700">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}