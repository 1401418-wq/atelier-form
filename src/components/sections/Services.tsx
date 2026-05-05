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
              {/*
                Mobile (grid-cols-1): outer div is a normal block → number+title
                stay inside their wrapper div, description follows below.
                Desktop (3-col grid): md:contents on the wrapper div makes
                number and title participate directly in the parent grid as
                separate columns, giving: [3.5rem number] [1fr title] [1.6fr desc].
              */}
              <div className="py-5 md:py-9 grid grid-cols-1 md:grid-cols-[3.5rem_1fr_1.6fr] gap-y-3 md:gap-y-0 md:gap-x-5 items-start group cursor-default">

                <div className="md:contents">
                  {/* Number */}
                  <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-3 md:mb-0 md:pt-[0.4rem] motion-safe:transition-colors duration-700 md:group-hover:text-foreground/70">
                    0{index + 1}
                  </p>

                  {/* Title */}
                  <h3 className="font-display text-[1.375rem] md:text-[1.75rem] font-light leading-[1.2] tracking-[-0.02em] motion-safe:transition-transform duration-700 md:group-hover:translate-x-1">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744] motion-safe:transition-colors duration-700 md:group-hover:text-foreground/85">
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
