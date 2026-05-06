import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/translations";
import translations from "@/lib/translations";
import styles from "./Contact.module.css";

interface ContactProps {
  locale: Locale;
}

export function Contact({ locale }: ContactProps) {
  const t = translations[locale].contact;

  return (
    <section id="contact" className="py-[72px] md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-start">

          {/* Left: eyebrow, heading, lead, location, CTA */}
          <FadeIn>
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-5">
              {t.eyebrow}
            </p>
            <h2 className="font-display text-[clamp(2rem,5vw,4rem)] font-light leading-[1.05] tracking-[-0.03em] mb-6">
              {t.heading}
            </h2>
            <p className="text-[0.9375rem] leading-[1.75] text-[#4A4744] mb-8 md:mb-10">
              {t.lead}
            </p>
            <p className="text-[10px] tracking-[0.28em] text-muted uppercase mb-10 md:mb-14">
              {t.location}
            </p>
            <a
              href="https://wa.me/79660444333?text=%D0%97%D0%B4%D1%80%D0%B0%D0%B2%D1%81%D1%82%D0%B2%D1%83%D0%B9%D1%82%D0%B5.%20%D0%A5%D0%BE%D1%87%D1%83%20%D0%BE%D0%B1%D1%81%D1%83%D0%B4%D0%B8%D1%82%D1%8C%20%D0%BF%D1%80%D0%BE%D0%B5%D0%BA%D1%82%20%D0%B8%20%D1%83%D0%B7%D0%BD%D0%B0%D1%82%D1%8C%20%D0%B2%D0%BE%D0%B7%D0%BC%D0%BE%D0%B6%D0%BD%D1%8B%D0%B9%20%D1%84%D0%BE%D1%80%D0%BC%D0%B0%D1%82%20%D1%80%D0%B0%D0%B1%D0%BE%D1%82%D1%8B."
              target="_blank"
              rel="noopener noreferrer"
              className={styles.whatsappCta}
            >
              {t.whatsappCta}
            </a>
          </FadeIn>

          {/* Right: phone + email info rows, then social button links */}
          <FadeIn delay={150}>
            <div className={styles.contactList}>
              {t.contacts.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target={item.href.startsWith("http") ? "_blank" : undefined}
                  rel={item.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className={styles.contactItem}
                >
                  <span className={styles.contactLabel}>{item.label}</span>
                  <span className={styles.contactValue}>{item.value}</span>
                </a>
              ))}
            </div>
            <div className={styles.socialLinks}>
              {t.socials.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </FadeIn>

        </div>
      </div>
    </section>
  );
}
