import Link from "next/link";
import TZForm from "./TZForm";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function TZPage({
  searchParams,
}: {
  searchParams: Promise<{ k?: string }>;
}) {
  const { k } = await searchParams;
  const correctKey = process.env.TZ_ACCESS_KEY || "";

  if (correctKey && k !== correctKey) {
    return (
      <main className="min-h-screen bg-[#f6f3ee] text-[#2b2724]">
        <header className="border-b border-[#e6e0d6] bg-white/60">
          <div className="max-w-[900px] mx-auto px-6 md:px-8 py-5 flex items-center justify-between">
            <Link
              href="/ru"
              className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c] hover:text-[#2b2724]"
            >
              ← Design Planner
            </Link>
            <span className="text-[11px] tracking-[0.2em] uppercase text-[#6b635c]">
              Бриф · ТЗ
            </span>
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

  return <TZForm accessKey={k || ""} />;
}
