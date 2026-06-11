"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { SECTIONS } from "../sections";

type Answers = Record<string, Record<string, string | string[]>>;

type Payload = {
  client: { name: string; contact: string; project: string };
  answers: Answers;
  submittedAt?: string;
};

function decodePayload(hash: string): Payload | null {
  try {
    const m = hash.match(/[#&]d=([^&]+)/);
    if (!m) return null;
    const b64 = decodeURIComponent(m[1]);
    const binary = atob(b64.replace(/-/g, "+").replace(/_/g, "/"));
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
    const json = new TextDecoder().decode(bytes);
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export default function TZViewPage() {
  const [payload, setPayload] = useState<Payload | null>(null);
  const [missing, setMissing] = useState(false);

  useEffect(() => {
    const data = decodePayload(window.location.hash);
    if (data) setPayload(data);
    else setMissing(true);
  }, []);

  if (missing) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724] flex items-center justify-center px-6">
        <div className="max-w-[520px] text-center">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8a7a66] mb-3">Бриф не найден</p>
          <h1 className="font-light text-[1.75rem] tracking-tight leading-tight mb-4">
            Эта ссылка пустая или повреждена
          </h1>
          <p className="text-[14px] text-[#6b635c] mb-6">
            Содержимое брифа закодировано прямо в URL. Возможно, ссылка обрезалась при копировании.
          </p>
          <Link
            href="/tz"
            className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a66] hover:text-[#2b2724]"
          >
            Заполнить заново →
          </Link>
        </div>
      </main>
    );
  }

  if (!payload) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] flex items-center justify-center">
        <p className="text-[#6b635c] text-[14px]">Загрузка...</p>
      </main>
    );
  }

  const { client, answers, submittedAt } = payload;

  return (
    <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724] print:bg-white">
      <header className="border-b border-[#e6e0d6] bg-white/60 print:hidden">
        <div className="max-w-[840px] mx-auto px-6 md:px-8 py-4 flex items-center justify-between">
          <Link
            href="/ru"
            className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c] hover:text-[#2b2724]"
          >
            ← Design Planner
          </Link>
          <button
            type="button"
            onClick={() => window.print()}
            className="text-[11px] tracking-[0.2em] uppercase text-[#8a7a66] hover:text-[#2b2724]"
          >
            Сохранить PDF / печать
          </button>
        </div>
      </header>

      <article className="max-w-[840px] mx-auto px-6 md:px-10 py-12 md:py-16 bg-white print:py-8 print:px-0">
        <header className="mb-12 pb-8 border-b border-[#e6e0d6]">
          <p className="text-[11px] tracking-[0.28em] uppercase text-[#8a7a66] mb-3">
            Техническое задание · Design Planner
          </p>
          <h1 className="font-light text-[2rem] md:text-[2.5rem] tracking-tight leading-tight mb-6">
            Бриф по квартире
            {client.project && <span className="text-[#6b635c]"> · {client.project}</span>}
          </h1>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-[13px]">
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] mb-1">Клиент</dt>
              <dd>{client.name || "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] mb-1">Контакт</dt>
              <dd>{client.contact || "—"}</dd>
            </div>
            <div>
              <dt className="text-[10px] tracking-[0.2em] uppercase text-[#8a7a66] mb-1">Заполнен</dt>
              <dd>
                {submittedAt
                  ? new Date(submittedAt).toLocaleString("ru-RU", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })
                  : "—"}
              </dd>
            </div>
          </dl>
        </header>

        {SECTIONS.map((section) => {
          const filled = section.fields.filter((f) => {
            const v = answers[section.id]?.[f.id];
            return Array.isArray(v) ? v.length > 0 : (v || "").trim().length > 0;
          });
          if (filled.length === 0) return null;
          return (
            <section key={section.id} className="mb-10 break-inside-avoid">
              <h2 className="font-light text-[1.35rem] tracking-tight mb-2 pb-2 border-b border-[#e6e0d6]">
                {section.title}
              </h2>
              {section.subtitle && (
                <p className="text-[12px] text-[#6b635c] italic mb-4">{section.subtitle}</p>
              )}
              <dl className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-x-6 gap-y-3">
                {filled.map((f) => {
                  const raw = answers[section.id][f.id];
                  const display = Array.isArray(raw) ? raw.join(" · ") : raw;
                  return (
                    <div key={f.id} className="contents">
                      <dt className="text-[12px] text-[#8a7a66] pt-0.5">{f.label}</dt>
                      <dd className="text-[14px] leading-relaxed whitespace-pre-wrap mb-2 md:mb-0">
                        {display}
                      </dd>
                    </div>
                  );
                })}
              </dl>
            </section>
          );
        })}

        <footer className="mt-16 pt-6 border-t border-[#e6e0d6] text-[11px] text-[#8a7a66] tracking-[0.15em] uppercase">
          Design Planner · design-planner.com
        </footer>
      </article>
    </main>
  );
}
