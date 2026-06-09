import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика конфиденциальности — Design Planner",
  description:
    "Политика обработки персональных данных на сайте design-planner.com. Оператор — Привалова Е. В., плательщик НПД.",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://design-planner.com/privacy" },
};

const requisites = [
  ["ФИО", "Привалова Екатерина Викторовна"],
  ["Статус", "Самозанятая (плательщик налога на профессиональный доход)"],
  ["ИНН", "771401500285"],
  ["Email", "designplannerstudio@gmail.com"],
  ["Telegram", "@design_planner"],
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-background">
      <header className="border-b border-border">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-6 flex items-center justify-between">
          <Link href="/" className="font-display text-xl font-light tracking-[0.08em]">
            Design Planner
          </Link>
          <Link href="/" className="label hover:text-foreground transition-colors">
            ← На главную
          </Link>
        </div>
      </header>

      <article className="max-w-[760px] mx-auto px-6 md:px-12 py-16 md:py-24">
        <p className="label mb-5">Правовая информация</p>
        <h1 className="section-heading mb-3">Политика конфиденциальности</h1>
        <p className="label mb-12">Действует с 9 июня 2026 года</p>

        <p className="body-text mb-6">
          Настоящая политика описывает, как на сайте{" "}
          <a href="https://design-planner.com/" className="underline underline-offset-4 hover:text-foreground">
            design-planner.com
          </a>{" "}
          (далее — «Сайт») обрабатываются персональные данные посетителей
          в соответствии с Федеральным законом от 27.07.2006 № 152-ФЗ
          «О персональных данных».
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">Оператор</h2>
        <div className="border border-border bg-white/40 px-6 py-5 md:px-8 md:py-6 mb-2">
          {requisites.map(([k, v]) => (
            <div
              key={k}
              className="flex flex-col md:flex-row md:gap-6 py-1.5 md:py-1 text-[15px]"
            >
              <span className="label md:min-w-[120px] md:pt-0.5">{k}</span>
              <span className="text-foreground">{v}</span>
            </div>
          ))}
        </div>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">
          Какие данные мы собираем
        </h2>
        <p className="body-text mb-3">
          Через формы на Сайте (форма брифа и контактная форма) посетитель
          добровольно сообщает:
        </p>
        <ul className="body-text list-disc pl-6 space-y-1 mb-6">
          <li>имя;</li>
          <li>контакт для связи (телефон, email или ник в Telegram);</li>
          <li>описание помещения, бюджета, образа жизни и пожеланий по проекту.</li>
        </ul>
        <p className="body-text mb-6">
          Автоматически собираются обезличенные технические данные
          (IP-адрес, тип устройства и браузера, источник перехода) — для
          анализа работы Сайта.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">
          Зачем мы их обрабатываем
        </h2>
        <ul className="body-text list-disc pl-6 space-y-1 mb-6">
          <li>чтобы связаться с вами по оставленной заявке;</li>
          <li>чтобы подготовить концепцию интерьера и обсудить условия работы;</li>
          <li>чтобы улучшать работу Сайта и контент.</li>
        </ul>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">
          Правовое основание
        </h2>
        <p className="body-text mb-6">
          Обработка ведётся на основании вашего согласия, которое вы даёте,
          отправляя форму на Сайте или связываясь с нами в мессенджерах.
          Отправка заявки означает согласие с настоящей политикой.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">
          Передача третьим лицам
        </h2>
        <p className="body-text mb-6">
          Мы не передаём ваши данные третьим лицам в коммерческих целях.
          Технически данные обрабатываются в инфраструктуре сервиса
          Anthropic (Claude — генерация концепции по брифу) и в мессенджерах
          Telegram / WhatsApp, через которые поступают заявки. На этих
          сервисах действуют их собственные политики конфиденциальности.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">
          Срок хранения
        </h2>
        <p className="body-text mb-6">
          Данные заявок хранятся до завершения работы по проекту и в течение
          3 лет после, либо до момента, когда вы попросите их удалить.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">
          Ваши права
        </h2>
        <p className="body-text mb-3">Вы вправе в любой момент:</p>
        <ul className="body-text list-disc pl-6 space-y-1 mb-3">
          <li>запросить, какие именно ваши данные у нас есть;</li>
          <li>попросить их исправить или удалить;</li>
          <li>отозвать согласие на обработку.</li>
        </ul>
        <p className="body-text mb-6">
          Для этого напишите на{" "}
          <a
            href="mailto:designplannerstudio@gmail.com"
            className="underline underline-offset-4 hover:text-foreground"
          >
            designplannerstudio@gmail.com
          </a>{" "}
          или в Telegram{" "}
          <a
            href="https://t.me/design_planner"
            target="_blank"
            rel="noopener"
            className="underline underline-offset-4 hover:text-foreground"
          >
            @design_planner
          </a>{" "}
          — мы реагируем в течение 10 рабочих дней.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">Cookies</h2>
        <p className="body-text mb-6">
          Сайт использует технические cookies, необходимые для работы
          интерфейса. Их можно отключить в настройках вашего браузера.
        </p>

        <h2 className="font-display text-2xl md:text-3xl font-light mt-12 mb-5">Изменения</h2>
        <p className="body-text mb-6">
          Актуальная версия политики всегда находится по адресу{" "}
          <a
            href="https://design-planner.com/privacy"
            className="underline underline-offset-4 hover:text-foreground"
          >
            design-planner.com/privacy
          </a>
          . Дата редакции указана в начале документа.
        </p>
      </article>

      <footer className="border-t border-border mt-8">
        <div className="max-w-[900px] mx-auto px-6 md:px-12 py-8 text-center">
          <p className="label">
            © 2026 Design Planner · Привалова Е. В. · ИНН 771401500285
          </p>
        </div>
      </footer>
    </main>
  );
}
