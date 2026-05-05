import { FadeIn } from "@/components/ui/FadeIn";
import translations from "@/lib/translations";
import type { Locale } from "@/lib/translations";

type AboutProps = {
  locale: Locale;
};

export function About({ locale }: AboutProps) {
  const t = translations[locale].about;

  return (
    <section id="about" className="py-20 md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left: eyebrow + statement */}
          <FadeIn className="md:col-span-5">
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-5">
              {t.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em]">
              {t.statement}
            </h2>
          </FadeIn>

          {/* Right: description + values */}
          <div className="md:col-span-7">
            <FadeIn delay={100}>
              <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744] mb-10 md:mb-12">
                {t.description}
              </p>
            </FadeIn>

            {t.values.map((value, index) => (
              <FadeIn key={index} delay={index * 80 + 180}>
                <div className="border-t border-border py-5 md:py-6">
  <p className="mb-2 text-[0.6875rem] uppercase tracking-[0.22em] text-muted-foreground">
    {value.label}
  </p>
  <p className="text-[0.9375rem] leading-[1.6] text-foreground font-light">
    {value.text}
  </p>
</div>
              </FadeIn>
            ))}
            <div className="border-b border-border" />
          </div>

        </div>
      </div>
    </section>
  );
}
