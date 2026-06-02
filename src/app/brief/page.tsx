"use client";

import { useState } from "react";
import Link from "next/link";

const BACKEND_URL = "https://web-production-336017.up.railway.app/brief";
const REGEN_URL = "https://web-production-336017.up.railway.app/regenerate-images";

type Palette = { hex: string; name: string };
type Image = {
  prompt: string;
  query: string | null;
  url: string | null;
  photographer: string | null;
  page: string | null;
};

type Concept = {
  name: string;
  tagline: string;
  palette: Palette[];
  materials: string[];
  furniture: string[];
  lighting: string;
  mood: string;
  image_prompts: string[];
  pexels_queries?: string[];
  images?: Image[];
};

type FormState = {
  room: string;
  area: string;
  ceiling: string;
  people: string;
  lifestyle: string;
  budget: string;
  light: string;
  dislikes: string;
  style: string;
  anchors: string;
  notes: string;
  name: string;
  contact: string;
};

const EMPTY: FormState = {
  room: "",
  area: "",
  ceiling: "",
  people: "",
  lifestyle: "",
  budget: "",
  light: "",
  dislikes: "",
  style: "",
  anchors: "",
  notes: "",
  name: "",
  contact: "",
};

const TILE_GRADIENTS = [
  "linear-gradient(135deg, #d8cbb8, #b4a48b)",
  "linear-gradient(135deg, #e5dccc, #8a7a66)",
  "linear-gradient(135deg, #c4b5a0, #6b5d4a)",
  "linear-gradient(135deg, #ede4d4, #a89578)",
];

export default function BriefPage() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [concepts, setConcepts] = useState<Concept[] | null>(null);

  function update<K extends keyof FormState>(k: K, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (!form.room && !form.area) {
      setError("Укажите хотя бы помещение или площадь");
      return;
    }
    setLoading(true);
    setConcepts(null);
    try {
      const r = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await r.json();
      if (!r.ok) {
        setError(data?.error || `Ошибка ${r.status}`);
      } else {
        setConcepts(data.concepts);
        setTimeout(() => {
          document.getElementById("result")?.scrollIntoView({ behavior: "smooth" });
        }, 100);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Сетевая ошибка");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724]">
      <header className="border-b border-[#e6e0d6] bg-white/60">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
          <Link href="/ru" className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c] hover:text-[#2b2724]">
            ← Design Planner
          </Link>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c]">
            Концепция интерьера
          </span>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-12 md:py-16">
        <section className="mb-10">
          <h1 className="font-light text-[2rem] md:text-[2.5rem] tracking-tight leading-tight mb-3">
            Расскажите о пространстве —<br />получите 3 концепции интерьера
          </h1>
          <p className="text-[15px] text-[#6b635c] max-w-[640px]">
            Заполните короткий бриф, и за минуту мы соберём три заметно разных направления:
            палитра, материалы, мебель, настроение. Стартовая точка для разговора с Екатериной.
          </p>
        </section>

        <form onSubmit={submit} className="bg-white border border-[#e6e0d6] rounded-md p-6 md:p-10 mb-8">
          <SectionLabel>1 · Обязательное</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <Field label="Помещение *" hint="гостиная / спальня / кухня-гостиная / детская / ванная">
              <input
                value={form.room}
                onChange={(e) => update("room", e.target.value)}
                placeholder="Гостиная"
                className={inputCls}
              />
            </Field>
            <div className="grid grid-cols-2 gap-5">
              <Field label="Площадь *" hint="в м²">
                <input
                  value={form.area}
                  onChange={(e) => update("area", e.target.value)}
                  placeholder="25"
                  className={inputCls}
                />
              </Field>
              <Field label="Потолок" hint="если нестандартный">
                <input
                  value={form.ceiling}
                  onChange={(e) => update("ceiling", e.target.value)}
                  placeholder="2.8"
                  className={inputCls}
                />
              </Field>
            </div>
            <Field label="Кто живёт *" hint="пара / семья с детьми (возраст) / одиночка / питомцы">
              <input
                value={form.people}
                onChange={(e) => update("people", e.target.value)}
                placeholder="Молодая пара, без детей"
                className={inputCls}
              />
            </Field>
            <Field label="Бюджет *" hint="эконом / средний / комфорт / премиум">
              <select
                value={form.budget}
                onChange={(e) => update("budget", e.target.value)}
                className={inputCls}
              >
                <option value="">— выберите —</option>
                <option>эконом</option>
                <option>средний</option>
                <option>комфорт</option>
                <option>премиум</option>
              </select>
            </Field>
            <Field label="Образ жизни *" hint="что главное делают в этой комнате — читают, принимают гостей, кино, работа" wide>
              <textarea
                value={form.lifestyle}
                onChange={(e) => update("lifestyle", e.target.value)}
                placeholder="Любят читать и принимать друзей по выходным. Иногда работают с ноутбука."
                rows={2}
                className={inputCls}
              />
            </Field>
          </div>

          <SectionLabel>2 · Сильно улучшает результат</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <Field label="Свет / окна" hint="сторона света, темно или светло">
              <input
                value={form.light}
                onChange={(e) => update("light", e.target.value)}
                placeholder="Окна на запад, сейчас темновато"
                className={inputCls}
              />
            </Field>
            <Field label="Стиль-ориентир" hint="минимализм, Japandi, лофт — или 'не знаю'">
              <input
                value={form.style}
                onChange={(e) => update("style", e.target.value)}
                placeholder="Тёплый минимализм"
                className={inputCls}
              />
            </Field>
            <Field label="Что НЕ нравится" hint="работает лучше чем 'что нравится'" wide>
              <textarea
                value={form.dislikes}
                onChange={(e) => update("dislikes", e.target.value)}
                placeholder="Не хочу холодные тона, не люблю глянец, классика тоже мимо"
                rows={2}
                className={inputCls}
              />
            </Field>
            <Field label="Якоря" hint="что обязательно остаётся / должно быть" wide>
              <textarea
                value={form.anchors}
                onChange={(e) => update("anchors", e.target.value)}
                placeholder="Любимое кресло, библиотека на 200 книг, тёмный паркет"
                rows={2}
                className={inputCls}
              />
            </Field>
          </div>

          <SectionLabel>3 · Опционально</SectionLabel>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
            <Field label="Имя" hint="чтобы Екатерина знала, к кому возвращаться">
              <input
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Анна"
                className={inputCls}
              />
            </Field>
            <Field label="Контакт" hint="WhatsApp / Telegram / телефон">
              <input
                value={form.contact}
                onChange={(e) => update("contact", e.target.value)}
                placeholder="+7 ..."
                className={inputCls}
              />
            </Field>
            <Field label="Доп. пожелания" wide>
              <textarea
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Что угодно ещё — срок, мысли, страхи, любимые объекты"
                rows={2}
                className={inputCls}
              />
            </Field>
          </div>

          {error && (
            <div className="mb-5 p-3 border border-red-300 bg-red-50 text-red-700 text-sm rounded">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="px-7 py-3 bg-[#2b2724] text-white text-sm tracking-wider uppercase rounded hover:bg-[#1a1a1a] disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            {loading ? "Claude думает..." : "Получить 3 концепции"}
          </button>
          <p className="text-[12px] text-[#6b635c] mt-3">
            Генерация занимает 20–40 секунд. Запрос идёт в Anthropic Claude.
          </p>
        </form>

        {concepts && (
          <section id="result" className="mt-16">
            <div className="mb-8 pb-6 border-b border-[#e6e0d6]">
              <p className="text-[10px] tracking-[0.28em] text-[#6b635c] uppercase mb-2">
                Результат
              </p>
              <h2 className="font-light text-[1.75rem] tracking-tight">
                {concepts.length} направления для обсуждения
              </h2>
            </div>
            {concepts.map((c, i) => (
              <ConceptCard
                key={i}
                concept={c}
                idx={i + 1}
                onImagesUpdate={(images) => {
                  setConcepts((prev) =>
                    prev ? prev.map((pc, pi) => (pi === i ? { ...pc, images } : pc)) : prev,
                  );
                }}
              />
            ))}
            <p className="text-center text-[12px] text-[#6b635c] mt-8 pt-6 border-t border-[#e6e0d6]">
              Это концепт-направления. Финальный дизайн делает Екатерина.{" "}
              <a
                href="https://wa.me/79660444333"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-[#2b2724]"
              >
                Написать в WhatsApp
              </a>
            </p>
          </section>
        )}
      </div>
    </main>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] font-semibold mb-4 mt-2 first:mt-0">
      {children}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
  wide,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <label className={`block ${wide ? "md:col-span-2" : ""}`}>
      <div className="text-[13px] font-medium mb-1.5">{label}</div>
      {hint && <div className="text-[11px] text-[#6b635c] mb-2">{hint}</div>}
      {children}
    </label>
  );
}

const inputCls =
  "w-full px-3 py-2.5 bg-[#faf7f2] border border-[#e6e0d6] rounded text-[14px] text-[#2b2724] placeholder:text-[#b8ada0] focus:outline-none focus:border-[#8a7a66] transition";

function ConceptCard({
  concept: c,
  idx,
  onImagesUpdate,
}: {
  concept: Concept;
  idx: number;
  onImagesUpdate: (images: Image[]) => void;
}) {
  const [regenLoading, setRegenLoading] = useState(false);
  const [regenError, setRegenError] = useState<string | null>(null);
  const [regenPage, setRegenPage] = useState(1);

  const hasRealImages = !!(c.images && c.images.some((i) => i.url));

  async function regenerate() {
    if (regenLoading) return;
    setRegenError(null);
    setRegenLoading(true);
    const nextPage = regenPage + 1;
    try {
      const r = await fetch(REGEN_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          pexels_queries: c.pexels_queries || [],
          image_prompts: c.image_prompts || [],
          page: nextPage,
        }),
      });
      const data = await r.json();
      if (!r.ok) {
        setRegenError(data?.error || `Ошибка ${r.status}`);
      } else if (Array.isArray(data.images)) {
        onImagesUpdate(data.images);
        setRegenPage(nextPage);
      }
    } catch (err) {
      setRegenError(err instanceof Error ? err.message : "Сетевая ошибка");
    } finally {
      setRegenLoading(false);
    }
  }

  return (
    <article className="bg-white border border-[#e6e0d6] rounded-md p-6 md:p-10 mb-6">
      <header className="flex gap-5 items-start mb-8 pb-6 border-b border-[#e6e0d6]">
        <span className="text-[2.5rem] font-light text-[#8a7a66] leading-none tracking-tight">
          0{idx}
        </span>
        <div>
          <h3 className="text-[1.5rem] font-medium leading-tight mb-1">{c.name}</h3>
          <p className="text-[14px] italic text-[#6b635c]">{c.tagline}</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-7">
        <div className="md:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <BlockTitle className="!mb-0">Визуальные референсы</BlockTitle>
            {hasRealImages && (
              <button
                type="button"
                onClick={regenerate}
                disabled={regenLoading}
                className="text-[11px] tracking-[0.15em] uppercase text-[#8a7a66] hover:text-[#2b2724] disabled:opacity-50 disabled:cursor-not-allowed transition flex items-center gap-1.5"
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className={regenLoading ? "animate-spin" : ""}
                >
                  <path d="M3 12a9 9 0 0 1 15-6.7L21 8" />
                  <path d="M21 3v5h-5" />
                  <path d="M21 12a9 9 0 0 1-15 6.7L3 16" />
                  <path d="M3 21v-5h5" />
                </svg>
                {regenLoading ? "Обновляю..." : "Обновить фото"}
              </button>
            )}
          </div>
          {regenError && (
            <div className="mb-3 text-[11px] text-red-600">{regenError}</div>
          )}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {(c.images && c.images.length ? c.images : c.image_prompts.map((p) => ({ prompt: p, url: null, photographer: null, page: null, query: null }))).map((img, i) => (
              <figure key={i}>
                {img.url ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={img.url}
                    alt={img.prompt}
                    className="aspect-square w-full object-cover rounded"
                    loading="lazy"
                  />
                ) : (
                  <div
                    className="aspect-square rounded"
                    style={{ background: TILE_GRADIENTS[i % TILE_GRADIENTS.length] }}
                  />
                )}
                <figcaption className="text-[11px] text-[#6b635c] mt-2 leading-snug">
                  {img.prompt}
                  {img.photographer && img.page && (
                    <>
                      {" · "}
                      <a
                        href={img.page}
                        target="_blank"
                        rel="noreferrer"
                        className="underline hover:text-[#2b2724]"
                      >
                        фото {img.photographer} / Pexels
                      </a>
                    </>
                  )}
                </figcaption>
              </figure>
            ))}
          </div>
          {!(c.images && c.images.some((i) => i.url)) && (
            <p className="text-[11px] italic text-[#6b635c] mt-3">
              Плейсхолдеры. Промпты готовы к копированию в Midjourney / DALL-E.
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <BlockTitle>Палитра</BlockTitle>
          <div className="grid grid-cols-5 gap-3">
            {c.palette.map((p, i) => (
              <div
                key={i}
                className="aspect-[1/1.1] rounded border border-[#e6e0d6] flex flex-col justify-end p-2.5 text-white text-[11px]"
                style={{ background: p.hex, textShadow: "0 1px 2px rgba(0,0,0,.25)" }}
              >
                <span className="font-mono text-[10px] opacity-85">{p.hex}</span>
                <span className="font-medium text-[12px]">{p.name}</span>
              </div>
            ))}
          </div>
        </div>

        <div>
          <BlockTitle>Настроение</BlockTitle>
          <p className="text-[14px]">{c.mood}</p>
          <BlockTitle className="mt-4">Свет</BlockTitle>
          <p className="text-[14px]">{c.lighting}</p>
        </div>

        <div>
          <BlockTitle>Материалы и текстуры</BlockTitle>
          <ul className="list-none p-0 m-0">
            {c.materials.map((m, i) => (
              <li key={i} className="py-2 border-b border-dashed border-[#e6e0d6] text-[14px] last:border-0">
                {m}
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-2">
          <BlockTitle>Мебель и предметы</BlockTitle>
          <ul className="list-none p-0 m-0 grid grid-cols-1 md:grid-cols-2 gap-x-6">
            {c.furniture.map((f, i) => (
              <li key={i} className="py-2 border-b border-dashed border-[#e6e0d6] text-[14px] last:border-0">
                {f}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

function BlockTitle({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`text-[11px] tracking-[0.15em] uppercase text-[#6b635c] font-semibold mb-3 ${className}`}
    >
      {children}
    </div>
  );
}
