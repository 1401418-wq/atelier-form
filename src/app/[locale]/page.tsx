"use client";

import { useEffect, useRef } from "react";

/* ── Fade-in hook ────────────────────────────────────────────── */
function useFadeIn() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("dp-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return ref;
}

/* ── Design tokens & global styles ──────────────────────────── */
const GLOBAL_CSS = `
  /* ── tokens ── */
  :root {
    --bg:            #F7F5F2;
    --card-bg:       #F4F2EE;
    --card-hover-bg: #E2DED8;
    --card-border:   #DEDAD4;
    --card-border-h: #8E8980;
    --text-primary:  #1C1C1A;
    --text-secondary:#5A5652;
    --text-muted:    #9A9489;
    --card-shadow:   0 1px 6px rgba(0,0,0,0.04);
    --card-shadow-h: 0 10px 32px rgba(0,0,0,0.10);
  }

  /* ── scroll fade ── */
  .dp-fade {
    opacity: 0;
    transform: translateY(14px);
    transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  }
  .dp-fade.dp-visible {
    opacity: 1;
    transform: translateY(0);
  }

  /* ── project cards ── */
  .dp-project-card { display: block; }
  .dp-project-img {
    transform: scale(1);
    transition: transform 0.7s ease-out;
    display: block;
    width: 100%;
  }
  .dp-project-card:hover .dp-project-img { transform: scale(1.04); }

  /* ── shared card base ── */
  .dp-card {
    border: 1px solid var(--card-border);
    box-shadow: var(--card-shadow);
    transition: background 0.25s ease, box-shadow 0.25s ease,
                border-color 0.25s ease, transform 0.25s ease;
  }
  .dp-card:hover {
    background: var(--card-hover-bg) !important;
    box-shadow: var(--card-shadow-h);
    border-color: var(--card-border-h);
    transform: translateY(-4px);
  }
  .dp-card-title { transition: color 0.25s ease; }
  .dp-card:hover .dp-card-title { color: var(--text-primary) !important; }

  /* ── service cards ── */
  .dp-svc {
    border: 1px solid #E4DFD9;
    box-shadow: 0 1px 6px rgba(0,0,0,0.04);
    transition: box-shadow 0.25s ease-out, border-color 0.25s ease-out, transform 0.25s ease-out;
  }
  .dp-svc:hover {
    box-shadow: 0 12px 32px rgba(0,0,0,0.09);
    border-color: #C4BEB8;
    transform: translateY(-4px);
  }
  .dp-svc .svc-title { transition: color 0.25s ease-out; }
  .dp-svc:hover .svc-title { color: #2A2825 !important; }
  .dp-svc .svc-btn {
    background: transparent;
    color: #7A7570;
    border-color: #D0CBC3;
    transition: background 0.25s ease-out, color 0.25s ease-out, border-color 0.25s ease-out;
  }
  .dp-svc:hover .svc-btn {
    background: #3A3836;
    color: #F0EDE8;
    border-color: #3A3836;
  }

  /* accent card */
  .dp-svc-accent {
    border: 1px solid #8E8880;
    box-shadow: 0 14px 34px rgba(0,0,0,0.09), 0 3px 8px rgba(0,0,0,0.05);
    margin-top: -10px; margin-bottom: -10px;
    position: relative; z-index: 1;
    transform: scale(1.02);
    transition: box-shadow 0.25s ease-out, transform 0.25s ease-out;
  }
  .dp-svc-accent:hover {
    box-shadow: 0 20px 44px rgba(0,0,0,0.12), 0 4px 10px rgba(0,0,0,0.06);
    transform: scale(1.02) translateY(-4px);
  }
  .dp-svc-accent .svc-title { transition: color 0.25s ease-out; }
  .dp-svc-accent:hover .svc-title { color: #1C1C1A !important; }
  .dp-svc-accent .svc-btn {
    background: transparent;
    color: #5A5652;
    border-color: #A8A39B;
    transition: background 0.25s ease-out, color 0.25s ease-out, border-color 0.25s ease-out;
  }
  .dp-svc-accent:hover .svc-btn {
    background: #3A3836;
    color: #F0EDE8;
    border-color: #3A3836;
  }

  /* ── card h3 accent line ── */
  .dp-card-h3-line {
    display: block;
  }
  .dp-card-h3-line::after {
    content: '';
    display: block;
    width: 34px;
    height: 1px;
    background: #D6D2CC;
    margin-top: 9px;
    opacity: 0.5;
    transition: width 0.25s ease, opacity 0.25s ease, background 0.25s ease;
  }
  .dp-card:hover .dp-card-h3-line::after {
    width: 54px;
    opacity: 1;
    background: #3A3836;
  }
  .dp-svc:hover .dp-card-h3-line::after,
  .dp-svc-accent:hover .dp-card-h3-line::after {
    width: 54px;
    opacity: 1;
    background: #3A3836;
  }

  /* ── hero image ── */
  .hero-img-el      { transform: scale(1); transition: transform 0.75s ease-out; }
  .hero-img-overlay { transition: opacity 0.7s ease-out; opacity: 1; }
  .hero-img-wrap:hover .hero-img-el      { transform: scale(1.04); }
  .hero-img-wrap:hover .hero-img-overlay { opacity: 0; }

  /* ── hero CTA underline animation ── */
  .hero-cta {
    text-decoration: none;
  }

  /* ── hero entrance ── */
  .hero-label   { opacity:0; transition: opacity 0.7s ease 0.05s; }
  .hero-title   { opacity:0; transform:translateY(12px); transition: opacity 0.8s ease 0.15s, transform 0.8s ease 0.15s; }
  .hero-buttons { opacity:0; transition: opacity 0.7s ease 0.35s; }
  .hero-image   { opacity:0; transform:translateY(10px); transition: opacity 0.85s ease 0.1s, transform 0.85s ease 0.1s; }
  .hero-caption { opacity:0; transition: opacity 0.7s ease 0.45s; }
  .hero-ready .hero-label,
  .hero-ready .hero-title,
  .hero-ready .hero-buttons,
  .hero-ready .hero-image,
  .hero-ready .hero-caption { opacity:1; transform:translateY(0); }

  /* ── final CTA block ── */
  .dp-cta-btn {
    display: inline-block;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.5em;
    color: #F7F5F2;
    background: #2A2A27;
    padding: 18px 48px;
    text-decoration: none;
    border: 1px solid #2A2A27;
    transition: background 0.25s ease, border-color 0.25s ease, transform 0.2s ease;
  }
  .dp-cta-btn:hover {
    background: #1C1C1A;
    border-color: #1C1C1A;
    transform: translateY(-2px);
  }

  /* ══ MOBILE ══════════════════════════════════════════════════ */
  @media (max-width: 767px) {

    /* no horizontal scroll */
    html, body { overflow-x: hidden; }

    /* sections: full width, remove max-width cap */
    section, footer {
      max-width: 100% !important;
      padding-left: 20px !important;
      padding-right: 20px !important;
    }

    /* hero */
    .dp-hero-section {
      padding-top: 88px !important;
      padding-bottom: 40px !important;
    }

    /* hero grid → vertical stack */
    .dp-hero-grid {
      display: flex !important;
      flex-direction: column !important;
      gap: 0 !important;
    }

    /* left column: normal flow, no space-between */
    .dp-hero-left {
      max-width: 100% !important;
      display: flex !important;
      flex-direction: column !important;
      justify-content: flex-start !important;
      gap: 0 !important;
    }

    .hero-label {
      margin-bottom: 20px !important;
    }

    /* hero title: 44–48px, main visual element */
    .hero-title {
      font-size: 46px !important;
      line-height: 1.0 !important;
      margin-bottom: 0 !important;
      margin-top: 14px !important;
    }

    /* Planner indent reset on mobile */
    .hero-planner {
      margin-left: 20px !important;
    }

    /* buttons row: only CTA, no Проекты */
    .hero-buttons {
      margin-top: 22px !important;
      margin-bottom: 0 !important;
      flex-direction: column !important;
      align-items: flex-start !important;
      gap: 0 !important;
    }
    .hero-sep { display: none !important; }
    .hero-link-projects { display: none !important; }
    .hero-line { display: none !important; }

    /* CTA: inline-block, border-bottom as underline */
    .hero-cta {
      display: inline-block !important;
      width: fit-content !important;
      color: rgba(0,0,0,0.85) !important;
      text-decoration: none !important;
      border-bottom: 1px solid rgba(0,0,0,0.45) !important;
      padding-bottom: 6px !important;
      letter-spacing: 0.25em !important;
      animation: none !important;
    }
    .hero-cta::after {
      display: none !important;
      content: none !important;
      animation: none !important;
    }
    .hero-cta:hover {
      color: rgba(0,0,0,1) !important;
    }

    /* right column: image below line */
    .dp-hero-right {
      margin-top: 36px !important;
      display: flex !important;
      flex-direction: column !important;
    }

    /* image: fixed height, full width */
    .hero-img-el {
      height: 320px !important;
      min-height: 320px !important;
      max-height: 340px !important;
      object-fit: cover !important;
      object-position: center !important;
    }

    /* caption: readable */
    .hero-caption {
      font-size: 12px !important;
      line-height: 1.55 !important;
      color: #5A5652 !important;
      margin-top: 12px !important;
      max-width: 90% !important;
    }

    /* all grids → single column */
    .md\\:grid-cols-2,
    .md\\:grid-cols-3,
    .md\\:grid-cols-4 {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }

    /* section headers: stack vertically */
    .md\\:flex-row {
      flex-direction: column !important;
      gap: 6px !important;
    }

    /* accent service card: no desktop offset */
    .dp-svc-accent {
      transform: none !important;
      margin-top: 0 !important;
      margin-bottom: 0 !important;
    }

    /* project images */
    .dp-project-img {
      height: 240px !important;
    }

    /* footer stacks */
    footer {
      flex-direction: column !important;
      gap: 6px !important;
      padding-top: 24px !important;
      padding-bottom: 24px !important;
    }
  }
`;

function GlobalStyles() {
  return <style dangerouslySetInnerHTML={{ __html: GLOBAL_CSS }} />;
}

/* ── Fade wrapper ────────────────────────────────────────────── */
function Fade({ children, className = "", delay = 0 }: {
  children: React.ReactNode; className?: string; delay?: number;
}) {
  const ref = useFadeIn() as React.RefObject<HTMLDivElement>;
  return (
    <div ref={ref} className={`dp-fade ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}>
      {children}
    </div>
  );
}

/* ── Page ────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <main className="bg-[#F7F5F2] text-[#1C1C1A] min-h-screen"
      style={{ fontFamily: "'Inter', 'Helvetica Neue', Arial, sans-serif" }}>
      <GlobalStyles />

      {/* HERO */}
      <HeroSection />

      {/* PROJECTS */}
      <section id="projects" className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade><SectionHeader label="Проекты" title="Проекты" /></Fade>
        <div className="grid md:grid-cols-2 gap-2 mt-16">
          <Fade delay={0}>
            <ProjectCard src="/projects/1.jpg" alt="ЖК Павелецкая Сити"
              city="Москва" title="ЖК Павелецкая Сити" meta="45 м² · минимализм" />
          </Fade>
          <Fade delay={120}>
            <ProjectCard src="/projects/2.jpg" alt="ЖК Огни"
              city="Москва" title="ЖК Огни" meta="65 м² · современный" />
          </Fade>
        </div>
      </section>

      {/* SERVICES */}
      <section id="services" className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade><SectionHeader label="Услуги" title="Форматы работы" /></Fade>
        <div className="grid md:grid-cols-3 gap-3 mt-16 items-stretch">
          <Fade delay={0}>
            <ServiceCard index="01" label="База проекта" title="Эскизный" price="1 500"
              items={["Планировочные решения","План демонтажа перегородок","План расстановки мебели"]} />
          </Fade>
          <Fade delay={120}>
            <ServiceCard index="02" label="Полный проект" title="Базовый" price="2 500" accent
              items={["Всё из эскизного проекта","Инженерные коммуникации","План потолков и освещения","План розеток","Привязка электрооборудования"]} />
          </Fade>
          <Fade delay={240}>
            <ServiceCard index="03" label="Реализация" title="Полный" price="7 500"
              items={["Всё из базового проекта","Развёртки стен","Подбор материалов и мебели","3D-визуализация","Авторское сопровождение"]} />
          </Fade>
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade><SectionHeader label="Процесс" title="Как мы работаем" /></Fade>
        <div className="grid md:grid-cols-4 gap-4 mt-16">
          {[
            ["01","Планировка","Формируем логику пространства: сценарии жизни, движение, зонирование."],
            ["02","Дизайн","Создаём визуальный образ с учётом материалов и реальных решений."],
            ["03","Чертежи","Готовим документацию для строителей без догадок и уточнений."],
            ["04","Реализация","Контролируем соответствие результата проектной задумке."],
          ].map(([num, title, text], i) => (
            <Fade key={num} delay={i * 80}>
              <div className="bg-[#F4F2EE] pt-12 pb-10 px-10 flex flex-col gap-8 dp-card h-full">
                <span className="dp-step-num" style={{ fontSize: "26px", fontWeight: 200, color: "#C4BDB5", letterSpacing: "0.08em", opacity: 0.6 }}>{num}</span>
                <div className="flex flex-col gap-3">
                  <h3 className="dp-card-title dp-card-h3-line" style={{ fontSize: "15px", fontWeight: 400, color: "#3A3835", letterSpacing: "0.03em", lineHeight: 1.35 }}>{title}</h3>
                  <p style={{ fontSize: "13px", color: "#6B6660", lineHeight: 1.8 }}>{text}</p>
                </div>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* DETAILS */}
      <section id="details" className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade><SectionHeader label="Состав проекта" title="Что входит в работу" /></Fade>
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {([
            ["Рабочая документация",["План розеток","План освещения","План потолков","План пола"]],
            ["Эргономика",["План расстановки мебели","Открывание дверей","Сантехника","Размеры мебели"]],
            ["Визуализация",["3D тур","Подбор материалов","Подбор мебели"]],
            ["Дополнительно",["Авторское сопровождение","Контроль реализации"]],
          ] as [string, string[]][]).map(([title, items], i) => (
            <Fade key={title} delay={i * 100}>
              <div className="dp-card p-10 h-full" style={{ background: "#F4F2EE" }}>
                <h3 className="dp-card-title dp-card-h3-line" style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A7570", marginBottom: "0" }}>
                  {title}
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#3A3835", lineHeight: 1.6 }}>
                      <span style={{ width: "12px", height: "1px", background: "#C4BDB5", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* EXTRA SERVICES */}
      <section id="extra" className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade>
          <SectionHeader label="Дополнительные услуги" title="Смежные задачи" />
          <p style={{ fontSize: "14px", color: "#7A7570", lineHeight: 1.8, marginTop: "16px", maxWidth: "520px" }}>
            Когда проект требует большего, мы подключаем смежные задачи — от реализации до мебели.
          </p>
        </Fade>
        <div className="grid md:grid-cols-2 gap-6 mt-16">
          {([
            ["Ремонт под ключ",["Черновые работы","Чистовая отделка","Координация подрядчиков","Контроль соответствия проекту"]],
            ["Производство мебели",["Встроенная мебель","Корпусная мебель","Гардеробные системы","Мебель по индивидуальному эскизу"]],
            ["Функциональное проектирование",["Решения перепланировок","Оптимизация хранения","Эргономика кухни, санузлов и жилых зон","Практичные сценарии жизни"]],
            ["Комплектация",["Подбор отделочных материалов","Подбор мебели и света","Согласование позиций","Помощь с финальными решениями"]],
          ] as [string, string[]][]).map(([title, items], i) => (
            <Fade key={title} delay={i * 100}>
              <div className="dp-card p-10 h-full" style={{ background: "#F4F2EE" }}>
                <h3 className="dp-card-title dp-card-h3-line" style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.12em", textTransform: "uppercase", color: "#7A7570", marginBottom: "0" }}>
                  {title}
                </h3>
                <ul style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "20px" }}>
                  {items.map((item) => (
                    <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "14px", color: "#3A3835", lineHeight: 1.6 }}>
                      <span style={{ width: "12px", height: "1px", background: "#C4BDB5", flexShrink: 0 }} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Fade>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade><SectionHeader label="Контакты" title="Обсудим проект" /></Fade>
        <div className="grid md:grid-cols-[1fr_1.5fr] gap-20 mt-16 items-start">
          <Fade delay={80}>
            <p style={{ fontSize: "14px", color: "#4A4845", lineHeight: 1.9, marginBottom: "32px", maxWidth: "300px" }}>
              Разберём задачу, предложим формат работы и сразу обозначим бюджет и объём.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "13px", color: "#5A5652" }}>
              <a href="mailto:designplannerstudio@gmail.com" className="hover:text-[#1C1C1A] transition-colors duration-200">
                designplannerstudio@gmail.com
              </a>
              <div>+7 966 044 43 33</div>
              <div>Москва, Россия</div>
            </div>
            <div className="flex gap-6 mt-10">
              {[["Telegram","https://t.me/KetDPln"],["WhatsApp","https://wa.me/79660444333"],["Instagram","https://www.instagram.com/_designplanner_"]].map(([label,href]) => (
                <a key={label} href={href} target="_blank" rel="noreferrer"
                  className="text-[11px] uppercase tracking-[0.45em] text-[#7A7570] hover:text-[#1C1C1A] transition-colors duration-200">
                  {label}
                </a>
              ))}
            </div>
          </Fade>
          <Fade delay={160}>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {["Ваше имя","Телефон / Telegram"].map((placeholder) => (
                <div key={placeholder} className="border-b border-[#C8C3BC] pb-3 focus-within:border-[#1C1C1A] transition-colors duration-300">
                  <input type="text" placeholder={placeholder}
                    className="w-full bg-transparent text-[14px] text-[#1C1C1A] placeholder:text-[#9A9489] outline-none" />
                </div>
              ))}
              <div className="border-b border-[#C8C3BC] pb-3 focus-within:border-[#1C1C1A] transition-colors duration-300">
                <textarea placeholder="Коротко о проекте" rows={3}
                  className="w-full bg-transparent text-[14px] text-[#1C1C1A] placeholder:text-[#9A9489] outline-none resize-none" />
              </div>
              <button type="button"
                className="self-start mt-2 text-[11px] uppercase tracking-[0.5em] text-white bg-[#2A2A27] px-10 py-4 hover:bg-[#1C1C1A] transition-colors duration-300">
                Отправить заявку
              </button>
            </div>
          </Fade>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="dp-section-wrap max-w-[1320px] mx-auto px-8 md:px-16 py-32 border-t border-[#E2DDD7]">
        <Fade>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "28px" }}>
            <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.55em", color: "#9A9489" }}>
              Готовы начать?
            </p>
            <h2 style={{ fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 200, lineHeight: 1.05, letterSpacing: "-0.02em", color: "#1C1C1A", margin: 0 }}>
              Обсудим ваш проект
            </h2>
            <p style={{ fontSize: "15px", color: "#6B6660", lineHeight: 1.8, maxWidth: "440px" }}>
              Расскажите о задаче — мы предложим формат работы и обозначим бюджет без обязательств.
            </p>
            <a href="#contact" className="dp-cta-btn" style={{ marginTop: "8px" }}>
              Обсудить проект
            </a>
          </div>
        </Fade>
      </section>

      {/* FOOTER */}
      <footer className="max-w-[1320px] mx-auto px-8 md:px-16 py-10 border-t border-[#E2DDD7] flex justify-between items-center">
        <span style={{ fontSize: "11px", color: "#9A9489", letterSpacing: "0.35em", textTransform: "uppercase" }}>Design Planner</span>
        <span style={{ fontSize: "11px", color: "#C4BDB5" }}>© 2015–2026</span>
      </footer>
    </main>
  );
}

/* ── Hero Section ────────────────────────────────────────────── */
function HeroSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const t = setTimeout(() => el.classList.add("hero-ready"), 60);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      ref={ref}
      className="dp-section-wrap dp-hero-section max-w-[1320px] mx-auto px-5 md:px-16 pt-28 md:pt-36 pb-16 md:pb-24"
    >
      <div
        className="dp-hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 0.85fr",
          gap: "44px",
          alignItems: "stretch",
        }}
      >
        <div
          className="dp-hero-left"
          style={{
            maxWidth: "720px",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <p
            className="hero-label"
            style={{
              fontSize: "12px",
              textTransform: "uppercase",
              letterSpacing: "0.42em",
              color: "#8A847B",
              margin: 0,
              marginBottom: "42px",
            }}
          >
            Functional planning &amp; interior design
          </p>

          <h1
            className="hero-title"
            style={{
              fontSize: "clamp(88px, 22vw, 158px)",
              fontWeight: 200,
              lineHeight: 0.86,
              letterSpacing: "-0.055em",
              margin: 0,
              color: "#1C1C1A",
            }}
          >
            <span style={{ display: "block" }}>Design</span>
            <span style={{ display: "block", marginLeft: "42px" }}>Planner</span>
          </h1>

          <div style={{ marginTop: "46px" }}>
            <a
              href="#contact"
              className="hero-cta"
              style={{
                display: "inline-block",
                fontSize: "13px",
                fontWeight: 300,
                textTransform: "uppercase",
                letterSpacing: "0.3em",
                color: "#1C1C1A",
                textDecoration: "none",
                paddingBottom: "6px",
                borderBottom: "1px solid #8A847B",
              }}
            >
              Обсудить проект
            </a>
          </div>
        </div>

        <div
          className="dp-hero-right hero-image"
          style={{
            display: "flex",
            flexDirection: "column",
            marginTop: "28px",
          }}
        >
          <div
            className="hero-img-wrap"
            style={{
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="/images/hero.jpg"
              alt="Design Planner interior"
              className="hero-img-el"
              style={{
                width: "100%",
                height: "clamp(320px, 50vw, 560px)",
                objectFit: "cover",
                objectPosition: "center",
                display: "block",
                transform: "scale(1.08)",
                filter: "brightness(0.96)",
                transition: "transform 1.4s ease, filter 1.4s ease",
              }}
            />
            <div
              className="hero-img-overlay"
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(30,28,26,0.06)",
                pointerEvents: "none",
              }}
            />
          </div>

          <p
            className="hero-caption"
            style={{
              width: "100%",
              marginTop: "14px",
              fontSize: "15px",
              color: "#4D4944",
              lineHeight: 1.55,
              maxWidth: "680px",
            }}
          >
            Проектируем пространства, в которых удобно жить. От продуманной планировки до полной реализации интерьера.
          </p>
        </div>
      </div>
    </section>
  );
}

/* ── Shared Components ───────────────────────────────────────── */
function SectionHeader({ label, title }: { label: string; title: string }) {
  return (
    <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-4">
      <p style={{ fontSize: "11px", textTransform: "uppercase", letterSpacing: "0.55em", color: "#9A9489" }}>{label}</p>
      <h2 style={{ fontSize: "clamp(28px, 3.5vw, 48px)", fontWeight: 200, letterSpacing: "-0.02em", lineHeight: 1.0, color: "#1C1C1A" }}>
        {title}
      </h2>
    </div>
  );
}

function ProjectCard({ src, alt, city, title, meta }: {
  src: string; alt: string; city: string; title: string; meta: string;
}) {
  return (
    <div className="dp-project-card" style={{ position: "relative", overflow: "hidden", display: "block" }}>
      <div style={{ overflow: "hidden" }}>
        <img
          src={src}
          alt={alt}
          className="dp-project-img"
          style={{ width: "100%", height: "480px", objectFit: "cover", display: "block" }}
        />
      </div>
      {/* gradient overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        background: "linear-gradient(to top, rgba(0,0,0,0.50) 0%, rgba(0,0,0,0.18) 40%, rgba(0,0,0,0) 70%)",
        pointerEvents: "none",
      }} />
      {/* text */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        padding: "0 20px 20px",
      }}>
        <p style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.25em", color: "rgba(255,255,255,0.8)", marginBottom: "5px" }}>
          {city}
        </p>
        <h3 style={{ fontSize: "19px", fontWeight: 300, color: "#fff", lineHeight: 1.25, marginBottom: "4px" }}>
          {title}
        </h3>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.7)" }}>
          {meta}
        </p>
      </div>
    </div>
  );
}

function ServiceCard({ index, label, title, price, items, accent = false }: {
  index: string; label: string; title: string; price: string; items: string[]; accent?: boolean;
}) {
  return (
    <div className={`flex flex-col justify-between min-h-[480px] h-full ${accent ? "dp-svc-accent" : "dp-svc"}`}
      style={{ background: accent ? "#CEC9C1" : "#F4F2EE", padding: accent ? "44px 40px" : "40px" }}>
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "32px" }}>
          <span style={{ fontSize: "11px", color: "#B8B3AC", letterSpacing: "0.35em" }}>{index}</span>
          <span style={{ fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.45em", color: "#9A9489" }}>{label}</span>
        </div>

        <h3 className="svc-title" style={{
          fontSize: "24px",
          fontWeight: 400,
          color: accent ? "#1C1C1A" : "#3A3835",
          marginBottom: "16px",
          lineHeight: 1.15,
          letterSpacing: "-0.01em",
        }}>{title}</h3>

        <div style={{ marginBottom: "44px" }}>
          <span style={{ fontSize: "54px", fontWeight: 300, color: "#1C1C1A", letterSpacing: "-0.04em", lineHeight: 1 }}>
            {price}
          </span>
          <span style={{ fontSize: "11px", color: "#9A9489", letterSpacing: "0.08em", marginLeft: "8px" }}>
            ₽/м²
          </span>
        </div>

        <ul style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {items.map((item) => (
            <li key={item} style={{ display: "flex", alignItems: "center", gap: "12px", fontSize: "13px", color: "#5A5652", lineHeight: 1.6 }}>
              <span style={{ width: "12px", height: "1px", background: "#B8B3AC", flexShrink: 0 }} />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <a href="#contact" className="svc-btn"
        style={{
          display: "block",
          marginTop: "56px",
          padding: "14px 0",
          fontSize: "11px",
          textTransform: "uppercase" as const,
          letterSpacing: "0.45em",
          textAlign: "center" as const,
          textDecoration: "none",
          border: "1px solid",
        }}>
        Обсудить проект
      </a>
    </div>
  );
}
