import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <p className="label mb-6">404</p>
      <h1 className="font-display text-5xl md:text-7xl font-light mb-8">
        Страница не найдена
      </h1>
      <Link href="/ru" className="label hover:text-foreground transition-colors">
        ← На главную
      </Link>
    </div>
  );
}
