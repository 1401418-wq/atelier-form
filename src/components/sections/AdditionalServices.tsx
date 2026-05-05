import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/translations";
import translations from "@/lib/translations";
import styles from "./AdditionalServices.module.css";

interface AdditionalServicesProps {
  locale: Locale;
}

export function AdditionalServices({ locale }: AdditionalServicesProps) {
  const t = translations[locale].additionalServices;

  return (
    <section id="additional" className="py-20 md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16 items-start">

          {/* Left: eyebrow + heading + lead + CTA */}
          <FadeIn className="md:col-span-4">
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-5">
              {t.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] mb-6">
              {t.heading}
            </h2>
            <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744] mb-10 md:mb-12">
              {t.lead}
            </p>
            <a href="#contact" className={styles.cta}>
              {t.cta}
            </a>
          </FadeIn>

          {/* Right: numbered items */}
          <div className="md:col-span-8">
            {t.items.map((item, index) => (
              <FadeIn key={item.num} delay={index * 100}>
                <div className="group border-t border-border py-7 md:py-9 grid grid-cols-[3rem_1fr] md:grid-cols-[4rem_1fr] gap-x-4 md:gap-x-6 items-start cursor-default motion-safe:transition-colors duration-500 md:hover:border-foreground/25">

                  <span className="text-[10px] tracking-[0.28em] text-muted uppercase pt-[0.35rem] motion-safe:transition-colors duration-700 md:group-hover:text-foreground/60">
                    {item.num}
                  </span>

                  <div className="space-y-2.5">
                    <h3 className="font-display text-[1.375rem] md:text-[1.75rem] font-light leading-[1.2] tracking-[-0.02em] motion-safe:transition-transform duration-700 md:group-hover:translate-x-1">
                      {item.title}
                    </h3>
                    <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744]">
                      {item.text}
                    </p>
                  </div>

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
