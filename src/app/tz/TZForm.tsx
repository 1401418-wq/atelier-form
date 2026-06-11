"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { SECTIONS, Field, Section } from "./sections";

const BACKEND_URL = "https://web-production-336017.up.railway.app/tz";
const STORAGE_KEY = "tz-draft-v1";

type AnswerValue = string | string[];
type Answers = Record<string, Record<string, AnswerValue>>;

type ClientInfo = {
  name: string;
  contact: string;
  project: string;
};

const inputCls =
  "w-full px-3 py-2.5 bg-[#faf7f2] border border-[#e6e0d6] rounded text-[14px] text-[#2b2724] placeholder:text-[#b8ada0] focus:outline-none focus:border-[#8a7a66] transition";

function emptyAnswers(): Answers {
  const a: Answers = {};
  for (const s of SECTIONS) {
    a[s.id] = {};
    for (const f of s.fields) a[s.id][f.id] = f.type === "multiChips" ? [] : "";
  }
  return a;
}

function sectionTouched(answers: Answers, sectionId: string): boolean {
  const sec = answers[sectionId];
  if (!sec) return false;
  for (const v of Object.values(sec)) {
    if (Array.isArray(v) ? v.length > 0 : v.trim().length > 0) return true;
  }
  return false;
}

export default function TZPage() {
  const [client, setClient] = useState<ClientInfo>({ name: "", contact: "", project: "" });
  const [answers, setAnswers] = useState<Answers>(emptyAnswers);
  const [activeSection, setActiveSection] = useState<string>(SECTIONS[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<{ id: string; viewUrl: string } | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [accessKey, setAccessKey] = useState<string | null>(null);
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    console.log("[tz] mount effect, hash:", window.location.hash);
    const m = window.location.hash.match(/[#&]k=([^&]+)/);
    if (m) {
      const k = decodeURIComponent(m[1]);
      console.log("[tz] setting accessKey:", k);
      setAccessKey(k);
    }
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed.client) setClient(parsed.client);
        if (parsed.answers) {
          const fresh = emptyAnswers();
          for (const sid of Object.keys(parsed.answers)) {
            if (fresh[sid]) {
              for (const fid of Object.keys(parsed.answers[sid])) {
                if (fid in fresh[sid]) fresh[sid][fid] = parsed.answers[sid][fid];
              }
            }
          }
          setAnswers(fresh);
        }
      }
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ client, answers }));
    } catch {}
  }, [client, answers, hydrated]);

  const touchedCount = useMemo(
    () => SECTIONS.filter((s) => sectionTouched(answers, s.id)).length,
    [answers],
  );

  function setField(sectionId: string, fieldId: string, value: AnswerValue) {
    setAnswers((prev) => ({
      ...prev,
      [sectionId]: { ...prev[sectionId], [fieldId]: value },
    }));
  }

  function jumpTo(sectionId: string) {
    setActiveSection(sectionId);
    const el = sectionRefs.current[sectionId];
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }

  useEffect(() => {
    if (!hydrated || submitted) return;
    function onScroll() {
      let best = SECTIONS[0].id;
      let bestDist = Infinity;
      for (const s of SECTIONS) {
        const el = sectionRefs.current[s.id];
        if (!el) continue;
        const dist = Math.abs(el.getBoundingClientRect().top - 120);
        if (dist < bestDist) {
          bestDist = dist;
          best = s.id;
        }
      }
      setActiveSection(best);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [hydrated, submitted]);

  function buildViewUrl(): string {
    const payload = { client, answers, submittedAt: new Date().toISOString() };
    const json = JSON.stringify(payload);
    const bytes = new TextEncoder().encode(json);
    let binary = "";
    for (let i = 0; i < bytes.length; i++) binary += String.fromCharCode(bytes[i]);
    const b64 = btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    const origin = typeof window !== "undefined" ? window.location.origin : "";
    return `${origin}/tz/view#d=${encodeURIComponent(b64)}`;
  }

  async function submit() {
    setSubmitError(null);
    if (!client.name.trim()) {
      setSubmitError("Укажите имя — Екатерина должна понять, чей это бриф");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    if (!client.contact.trim()) {
      setSubmitError("Укажите контакт для связи");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    setSubmitting(true);
    const viewUrl = buildViewUrl();
    try {
      const r = await fetch(BACKEND_URL, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ client, answers, view_url: viewUrl, access_key: accessKey }),
      });
      const data = await r.json();
      if (!r.ok) {
        setSubmitError(data?.error || `Ошибка ${r.status}`);
      } else {
        setSubmitted({ id: data.id || "ok", viewUrl });
        try {
          localStorage.removeItem(STORAGE_KEY);
        } catch {}
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : "Сетевая ошибка");
    } finally {
      setSubmitting(false);
    }
  }

  if (!accessKey) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724]" suppressHydrationWarning>
        <header className="border-b border-[#e6e0d6] bg-white/60">
          <div className="max-w-[900px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
            <Link href="/ru" className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c] hover:text-[#2b2724]">
              ← Design Planner
            </Link>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c]">Бриф · ТЗ</span>
          </div>
        </header>
        <div className="max-w-[640px] mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8a7a66] mb-5">
            Доступ по приглашению
          </p>
          <h1 className="font-light text-[1.75rem] md:text-[2.25rem] tracking-tight leading-tight mb-5">
            Эта страница открывается по персональной ссылке
          </h1>
          <p className="text-[15px] text-[#6b635c] leading-relaxed mb-8">
            Бриф заполняют клиенты, заключившие договор со студией Design Planner. Если вы только
            присматриваетесь — попробуйте бесплатный AI-инструмент «Концепция интерьера», который
            за минуту собирает три направления под ваше пространство.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link
              href="/brief"
              className="px-6 py-3 bg-[#2b2724] text-white text-sm tracking-wider uppercase rounded hover:bg-[#1a1a1a] transition"
            >
              Собрать концепцию
            </Link>
            <a
              href="https://wa.me/79660444333"
              target="_blank"
              rel="noreferrer"
              className="px-6 py-3 border border-[#e6e0d6] text-[#2b2724] text-sm tracking-wider uppercase rounded hover:border-[#8a7a66] transition"
            >
              Написать Екатерине
            </a>
          </div>
        </div>
      </main>
    );
  }

  if (submitted) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724]">
        <header className="border-b border-[#e6e0d6] bg-white/60">
          <div className="max-w-[900px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
            <Link href="/ru" className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c] hover:text-[#2b2724]">
              ← Design Planner
            </Link>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c]">Бриф · ТЗ</span>
          </div>
        </header>
        <div className="max-w-[680px] mx-auto px-6 md:px-8 py-20 md:py-28 text-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8a7a66] mb-5">Готово</p>
          <h1 className="font-light text-[2rem] md:text-[2.5rem] tracking-tight leading-tight mb-5">
            Бриф отправлен Екатерине
          </h1>
          <p className="text-[15px] text-[#6b635c] leading-relaxed mb-8">
            Спасибо — Екатерина получит уведомление и свяжется с вами в ближайшее время. Все детали,
            которые вы заполнили, уже у неё под рукой.
          </p>
          {submitted.viewUrl && (
            <div className="bg-white border border-[#e6e0d6] rounded p-6 text-left">
              <p className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a66] mb-2">Копия брифа</p>
              <p className="text-[14px] text-[#6b635c] mb-3">
                По этой ссылке вы можете открыть и распечатать заполненный бриф в любой момент:
              </p>
              <a
                href={submitted.viewUrl}
                target="_blank"
                rel="noreferrer"
                className="block text-[13px] text-[#2b2724] underline underline-offset-2 break-all hover:text-[#8a7a66]"
              >
                {submitted.viewUrl}
              </a>
            </div>
          )}
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724]" suppressHydrationWarning>
      <header className="border-b border-[#e6e0d6] bg-white/60 sticky top-0 z-30 backdrop-blur">
        <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link href="/ru" className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c] hover:text-[#2b2724]">
            ← Design Planner
          </Link>
          <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c]">
            Бриф · ТЗ {touchedCount > 0 ? `· ${touchedCount} из ${SECTIONS.length}` : ""}
          </span>
        </div>
      </header>

      <div className="max-w-[1180px] mx-auto px-6 md:px-8 py-10 md:py-14">
        <section className="mb-10 max-w-[760px]">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8a7a66] mb-3">Техническое задание</p>
          <h1 className="font-light text-[2rem] md:text-[2.5rem] tracking-tight leading-tight mb-4">
            Бриф по вашей квартире
          </h1>
          <p className="text-[15px] text-[#6b635c] leading-relaxed">
            Заполните разделы, которые относятся к вашему проекту. Лишние можно пропустить — Екатерина
            это увидит и обсудит на встрече. Черновик сохраняется автоматически — можно закрыть
            страницу и вернуться позже.
          </p>
        </section>

        <section className="bg-white border border-[#e6e0d6] rounded-md p-6 md:p-8 mb-8">
          <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] font-semibold mb-4">
            О вас
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <label className="block">
              <div className="text-[13px] font-medium mb-1.5">Ваше имя *</div>
              <input
                value={client.name}
                onChange={(e) => setClient((c) => ({ ...c, name: e.target.value }))}
                placeholder="Анна Иванова"
                className={inputCls}
              />
            </label>
            <label className="block">
              <div className="text-[13px] font-medium mb-1.5">Контакт *</div>
              <input
                value={client.contact}
                onChange={(e) => setClient((c) => ({ ...c, contact: e.target.value }))}
                placeholder="+7 ... / Telegram / email"
                className={inputCls}
              />
            </label>
            <label className="block">
              <div className="text-[13px] font-medium mb-1.5">Кодовое имя проекта</div>
              <input
                value={client.project}
                onChange={(e) => setClient((c) => ({ ...c, project: e.target.value }))}
                placeholder="«Шмитовский 39»"
                className={inputCls}
              />
            </label>
          </div>
        </section>

        <div className="grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-8">
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <p className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] font-semibold mb-3">
                Разделы
              </p>
              <nav>
                <ul className="space-y-0.5">
                  {SECTIONS.map((s) => {
                    const touched = sectionTouched(answers, s.id);
                    const isActive = activeSection === s.id;
                    return (
                      <li key={s.id}>
                        <button
                          type="button"
                          onClick={() => jumpTo(s.id)}
                          className={
                            "w-full text-left text-[13px] py-1.5 px-2.5 rounded transition flex items-center gap-2 " +
                            (isActive
                              ? "bg-[#2b2724] text-white"
                              : "text-[#6b635c] hover:text-[#2b2724] hover:bg-[#efeae0]")
                          }
                        >
                          <span
                            className={
                              "w-1.5 h-1.5 rounded-full shrink-0 " +
                              (touched
                                ? isActive ? "bg-white" : "bg-[#8a7a66]"
                                : isActive ? "bg-white/40" : "bg-[#d8cfc1]")
                            }
                          />
                          <span className="truncate">{s.title}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </nav>
            </div>
          </aside>

          <div className="min-w-0">
            {SECTIONS.map((s) => (
              <SectionCard
                key={s.id}
                section={s}
                values={answers[s.id]}
                onChange={(fid, v) => setField(s.id, fid, v)}
                onMount={(el) => (sectionRefs.current[s.id] = el)}
              />
            ))}

            {submitError && (
              <div className="mb-5 p-3 border border-red-300 bg-red-50 text-red-700 text-sm rounded">
                {submitError}
              </div>
            )}

            <div className="bg-[#2b2724] text-white rounded-md p-6 md:p-8 flex flex-col md:flex-row md:items-center gap-5 md:gap-8">
              <div className="flex-1">
                <p className="text-[10px] tracking-[0.28em] uppercase text-[#c4b5a0] mb-2">Готово</p>
                <h3 className="font-light text-[1.4rem] md:text-[1.6rem] tracking-tight mb-2">
                  Отправить бриф Екатерине
                </h3>
                <p className="text-[13px] text-[#c4b5a0]">
                  Все ответы попадут к ней одним документом. Можно отправлять, даже если заполнили не
                  всё — остальное обсудите голосом.
                </p>
              </div>
              <button
                type="button"
                onClick={submit}
                disabled={submitting}
                className="px-7 py-3 bg-white text-[#2b2724] text-sm tracking-wider uppercase rounded hover:bg-[#f6f3ee] disabled:opacity-50 disabled:cursor-not-allowed transition shrink-0"
              >
                {submitting ? "Отправляю..." : "Отправить бриф"}
              </button>
            </div>
            <p className="text-[11px] text-[#8a8276] mt-4">
              Отправляя бриф, вы соглашаетесь с{" "}
              <a href="/privacy" className="underline underline-offset-2 hover:text-[#2b2724]">
                политикой конфиденциальности
              </a>
              .
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

function SectionCard({
  section,
  values,
  onChange,
  onMount,
}: {
  section: Section;
  values: Record<string, AnswerValue>;
  onChange: (fid: string, v: AnswerValue) => void;
  onMount: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div
      ref={onMount}
      id={`section-${section.id}`}
      className="bg-white border border-[#e6e0d6] rounded-md p-6 md:p-8 mb-6 scroll-mt-24"
    >
      <div className="mb-6 pb-4 border-b border-[#e6e0d6]">
        <h2 className="font-light text-[1.4rem] md:text-[1.55rem] tracking-tight mb-1">
          {section.title}
          {section.optional && (
            <span className="ml-2 text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] align-middle">
              опционально
            </span>
          )}
        </h2>
        {section.subtitle && (
          <p className="text-[13px] text-[#6b635c]">{section.subtitle}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {section.fields.map((f) => (
          <FieldRenderer
            key={f.id}
            field={f}
            value={values[f.id]}
            onChange={(v) => onChange(f.id, v)}
          />
        ))}
      </div>
    </div>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: Field;
  value: AnswerValue;
  onChange: (v: AnswerValue) => void;
}) {
  return (
    <label className={"block " + (field.wide ? "md:col-span-2" : "")}>
      <div className="text-[13px] font-medium mb-1">{field.label}</div>
      {field.hint && <div className="text-[11px] text-[#6b635c] mb-2">{field.hint}</div>}

      {field.type === "text" && (
        <input
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={inputCls}
        />
      )}

      {field.type === "textarea" && (
        <textarea
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={field.rows || 2}
          className={inputCls}
        />
      )}

      {field.type === "select" && (
        <select
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          className={inputCls}
        >
          <option value="">— выберите —</option>
          {(field.options || []).map((o) => (
            <option key={o}>{o}</option>
          ))}
        </select>
      )}

      {field.type === "chips" && (
        <ChipsSingle
          value={value as string}
          options={field.options || []}
          onChange={(v) => onChange(v)}
        />
      )}

      {field.type === "multiChips" && (
        <ChipsMulti
          value={Array.isArray(value) ? value : []}
          options={field.options || []}
          onChange={(v) => onChange(v)}
        />
      )}
    </label>
  );
}

function ChipsSingle({
  value,
  options,
  onChange,
}: {
  value: string;
  options: string[];
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = value === o;
        return (
          <button
            key={o}
            type="button"
            onClick={() => onChange(active ? "" : o)}
            className={
              "px-3 py-1.5 text-[12px] rounded-full border transition " +
              (active
                ? "bg-[#2b2724] border-[#2b2724] text-white"
                : "bg-white border-[#e6e0d6] text-[#6b635c] hover:border-[#8a7a66] hover:text-[#2b2724]")
            }
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}

function ChipsMulti({
  value,
  options,
  onChange,
}: {
  value: string[];
  options: string[];
  onChange: (v: string[]) => void;
}) {
  function toggle(o: string) {
    onChange(value.includes(o) ? value.filter((x) => x !== o) : [...value, o]);
  }
  return (
    <div className="flex flex-wrap gap-1.5">
      {options.map((o) => {
        const active = value.includes(o);
        return (
          <button
            key={o}
            type="button"
            onClick={() => toggle(o)}
            className={
              "px-3 py-1.5 text-[12px] rounded-full border transition " +
              (active
                ? "bg-[#2b2724] border-[#2b2724] text-white"
                : "bg-white border-[#e6e0d6] text-[#6b635c] hover:border-[#8a7a66] hover:text-[#2b2724]")
            }
          >
            {o}
          </button>
        );
      })}
    </div>
  );
}
