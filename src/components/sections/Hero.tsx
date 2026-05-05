"use client";

import { useEffect, useRef } from "react";
import styles from "./Hero.module.css";

export default function Hero() {
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const el = imgRef.current;
    if (!el) return;
    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 80);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className={styles.hero}>
      <div className={styles.container}>

        <p className={styles.label}>
          Functional planning &amp; interior design
        </p>

        <div className={styles.grid}>

          {/* LEFT: label + title + cta */}
          <div className={styles.left}>
            <h1 className={styles.title}>
              <span className={styles.titleLine}>Design</span>
              <span className={`${styles.titleLine} ${styles.titleLineIndent}`}>
                Planner
              </span>
            </h1>
            <a href="#contact" className={styles.cta}>
              Обсудить проект
            </a>
          </div>

          {/* RIGHT: image + caption — same width, same container */}
          <div className={styles.right}>
            <div className={styles.imgWrap}>
              <img
                ref={imgRef}
                src="/images/hero.jpg"
                alt="Design Planner — интерьер"
                className={styles.img}
              />
            </div>
            <p className={styles.caption}>
              Проектируем пространства, в которых удобно жить.
              От продуманной планировки до полной реализации интерьера.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
