import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/translations";
import translations from "@/lib/translations";

interface ServicesProps {
  locale: Locale;
}

export function Services({ locale }: ServicesProps) {
  const t = translations[locale];

  return (
    <section id="services" className="py-24 md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        {/* Header */}
        <FadeIn className="mb-20 md:mb-28">
          <p className="label mb-4">{t.services.subheading}</p>
          <h2 className="section-heading max-w-sm">{t.services.heading}</h2>
        </FadeIn>

        {/* Services list */}
        <div className="divide-y divide-border">
          {t.services.items.map((service, index) => (
            <FadeIn key={service.id} delay={index * 80}>
              <div className="py-10 md:py-12 grid grid-cols-1 md:grid-cols-[1fr_auto_2fr] gap-6 md:gap-16 items-start group">
                {/* Number + Title */}
                <div>
                  <p className="label mb-3">0{index + 1}</p>
                  <h3 className="font-display text-2xl md:text-3xl font-light">
                    {service.title}
                  </h3>
                </div>

                {/* Divider line (desktop) */}
                <div className="hidden md:block w-px h-full min-h-[4rem] bg-border self-stretch" />

                {/* Description */}
                <p className="body-text max-w-lg">{service.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
