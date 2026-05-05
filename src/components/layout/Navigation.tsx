"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { type Locale, locales } from "@/lib/translations";
import translations from "@/lib/translations";

interface NavProps {
  locale: Locale;
}

export function Navigation({ locale }: NavProps) {
  const safeLocale: Locale = locales.includes(locale) ? locale : "ru";
  const t = translations[safeLocale];
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const otherLocale: Locale = safeLocale === "ru" ? "en" : "ru";

  const links = [
    { href: `/${safeLocale}#projects`, label: t.nav.projects },
    { href: `/${safeLocale}#services`, label: t.nav.services },
    { href: `/${safeLocale}#approach`, label: t.nav.approach },
    { href: `/${safeLocale}#contact`, label: t.nav.contact },
  ];

  return (
    <>
      <header
        className={clsx(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-[1440px] mx-auto px-6 md:px-12 h-16 md:h-20 flex items-center justify-between">
          <Link
            href={`/${safeLocale}`}
            className="font-display text-xl md:text-2xl font-light tracking-[0.08em] text-foreground hover:opacity-60 transition-opacity duration-300"
          >
            Design Planner
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="label hover:text-foreground transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button
              className="md:hidden flex flex-col gap-1.5 w-6 h-5 justify-center"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className={clsx("h-px bg-foreground transition-all duration-300", menuOpen ? "rotate-45 translate-y-[7px] w-full" : "w-full")} />
              <span className={clsx("h-px bg-foreground transition-all duration-300", menuOpen ? "opacity-0 w-0" : "w-2/3")} />
              <span className={clsx("h-px bg-foreground transition-all duration-300", menuOpen ? "-rotate-45 -translate-y-[7px] w-full" : "w-full")} />
            </button>
          </div>
        </nav>
      </header>

      <div
        className={clsx(
          "fixed inset-0 z-40 bg-background flex flex-col justify-center px-8 md:hidden transition-all duration-500",
          menuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="space-y-8 mt-16">
          {links.map((link) => (
            <div key={link.href}>
              <Link
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl font-light text-foreground hover:text-muted transition-colors"
              >
                {link.label}
              </Link>
            </div>
          ))}
        </div>
        <div className="absolute bottom-12 left-8 right-8 flex justify-between items-end">
          <p className="label">hello@designplanner.ru</p>
          <Link
            href={`/${otherLocale}`}
            onClick={() => setMenuOpen(false)}
            className="label hover:text-foreground"
          >
            {otherLocale.toUpperCase()}
          </Link>
        </div>
      </div>
    </>
  );
}
