import Link from "next/link";
import { type Locale, locales } from "@/lib/translations";
import translations from "@/lib/translations";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const safeLocale: Locale = locales.includes(locale) ? locale : "ru";
  const t = translations[safeLocale];

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          <div>
            <p className="font-display text-xl font-light tracking-[0.08em] mb-2">
              Design Planner
            </p>
            <p className="label">{t.footer.tagline}</p>
          </div>

          <div className="space-y-3">
            <Link href={`/${safeLocale}/projects`} className="block label hover:text-foreground transition-colors">
              {t.nav.projects}
            </Link>
            <Link href={`/${safeLocale}#services`} className="block label hover:text-foreground transition-colors">
              {t.nav.services}
            </Link>
            <Link href={`/${safeLocale}#approach`} className="block label hover:text-foreground transition-colors">
              {t.nav.approach}
            </Link>
            <Link href={`/${safeLocale}#contact`} className="block label hover:text-foreground transition-colors">
              {t.nav.contact}
            </Link>
          </div>

          <div className="space-y-2">
            <p className="label">{t.contact.contacts[0].value}</p>
            <p className="label">{t.contact.contacts[1].value}</p>
            <p className="label">{t.contact.location}</p>
          </div>
        </div>

        <hr className="thin-line my-10" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="label">{t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link href="/ru" className={`label transition-colors ${safeLocale === "ru" ? "text-foreground" : "hover:text-foreground"}`}>
              RU
            </Link>
            <Link href="/en" className={`label transition-colors ${safeLocale === "en" ? "text-foreground" : "hover:text-foreground"}`}>
              EN
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
