import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/translations";
import translations from "@/lib/translations";

interface ServicesProps {
  locale: Locale;
}

export function Services({ locale }: ServicesProps) {
  const t = translations[locale];

  return (
    <section id="services" className="py-20 md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">

        {/* Header */}
        <FadeIn className="mb-6 md:mb-16">
          <p className="label mb-5">{t.services.subheading}</p>
          <h2 className="font-display text-[clamp(2rem,6vw,4.5rem)] font-light leading-[1.05] tracking-[-0.03em] max-w-xs md:max-w-sm">
            {t.services.heading}
          </h2>
        </FadeIn>

        {/* Services list */}
        <div className="divide-y divide-border">
          {t.services.items.map((service, index) => (
            <FadeIn key={service.id} delay={index * 80}>
              <div className="py-5 md:py-10 grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-y-3 md:gap-16 items-start group cursor-default">

                {/* Number + Title */}
                <div>
                  <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-3 md:mb-4 motion-safe:transition-colors duration-700 group-hover:text-foreground/70">
                    0{index + 1}
                  </p>
                  <h3 className="font-display text-[1.375rem] md:text-[1.75rem] font-light leading-[1.2] tracking-[-0.02em] motion-safe:transition-transform duration-700 group-hover:translate-x-1">
                    {service.title}
                  </h3>
                </div>

                {/* Vertical divider (desktop only) */}
                <div className="hidden md:block w-px bg-border self-stretch motion-safe:transition-colors duration-700 group-hover:bg-foreground/20" />

                {/* Description */}
                <p className="body-text max-w-lg motion-safe:transition-colors duration-700 group-hover:text-foreground">
                  {service.description}
                </p>

              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  );
}
