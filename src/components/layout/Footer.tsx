import Link from "next/link";
import type { Locale } from "@/lib/translations";
import translations from "@/lib/translations";

interface FooterProps {
  locale: Locale;
}

export function Footer({ locale }: FooterProps) {
  const t = translations[locale];

  return (
    <footer className="border-t border-border mt-32">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-0">
          {/* Brand */}
          <div>
            <p className="font-display text-xl font-light tracking-[0.08em] mb-2">
              Atelier Form
            </p>
            <p className="label">{t.footer.tagline}</p>
          </div>

          {/* Links */}
          <div className="space-y-3">
            <Link
              href={`/${locale}/projects`}
              className="block label hover:text-foreground transition-colors"
            >
              {t.nav.projects}
            </Link>
            <Link
              href={`/${locale}#services`}
              className="block label hover:text-foreground transition-colors"
            >
              {t.nav.services}
            </Link>
            <Link
              href={`/${locale}#approach`}
              className="block label hover:text-foreground transition-colors"
            >
              {t.nav.approach}
            </Link>
            <Link
              href={`/${locale}#contact`}
              className="block label hover:text-foreground transition-colors"
            >
              {t.nav.contact}
            </Link>
          </div>

          {/* Contact */}
          <div className="space-y-2">
            <p className="label">{t.contact.info.email}</p>
            <p className="label">{t.contact.info.phone}</p>
            <p className="label">{t.contact.info.address}</p>
          </div>
        </div>

        <hr className="thin-line my-10" />

        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="label">{t.footer.copyright}</p>
          <div className="flex gap-6">
            <Link
              href="/ru"
              className={`label transition-colors ${locale === "ru" ? "text-foreground" : "hover:text-foreground"}`}
            >
              RU
            </Link>
            <Link
              href="/en"
              className={`label transition-colors ${locale === "en" ? "text-foreground" : "hover:text-foreground"}`}
            >
              EN
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
