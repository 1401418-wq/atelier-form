import translations from "@/lib/translations";
import type { Locale } from "@/lib/translations";
import styles from "./Hero.module.css";

type Props = {
  locale: Locale;
};

export default function Hero({ locale }: Props) {
  const t = translations[locale].hero;

  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        <p className={styles.label}>
          Functional planning &amp; interior design
        </p>

        <div className={styles.grid}>

          {/* LEFT: title + cta */}
          <div className={styles.left}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Design</span>
              <span className={`${styles.titleLine} ${styles.titleLineIndent}`}>
                Planner
              </span>
            </h1>
            <a href="#contact" className={styles.cta}>
              {t.cta_contact}
            </a>
          </div>

          {/* RIGHT: image + caption */}
          <div className={styles.right}>
            <div className={styles.imageReveal}>
              <div className={styles.imgWrap}>
                <img
                  src="/images/hero.jpg"
                  alt="Design Planner interior"
                  className={styles.img}
                />
              </div>
            </div>
            <p className={styles.caption}>
              {t.caption}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
