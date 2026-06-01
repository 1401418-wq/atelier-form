"use client";

import { useState } from "react";

const IFRAME_URL = "https://pervyyii.ru/alina-agent.html";

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const handleToggle = () => {
    if (!loaded) setLoaded(true);
    setOpen((v) => !v);
  };

  return (
    <>
      <button
        type="button"
        onClick={handleToggle}
        aria-label={open ? "Закрыть чат с ассистентом" : "Открыть чат с ассистентом"}
        className="fixed bottom-5 right-5 z-[9998] flex h-11 w-11 items-center justify-center rounded-full bg-[#4A4744] text-background shadow-[0_6px_18px_rgba(74,71,68,0.18)] transition-opacity duration-300 hover:opacity-80 sm:bottom-6 sm:right-6 sm:h-12 sm:w-12"
      >
        {open ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>

      <div
        aria-hidden={!open}
        className={`fixed bottom-20 right-4 z-[9999] flex w-[calc(100vw-2rem)] max-w-[440px] flex-col overflow-hidden bg-background border border-border shadow-[0_20px_60px_rgba(26,26,26,0.15)] transition-all duration-300 sm:bottom-24 sm:right-8 ${
          open ? "pointer-events-auto opacity-100 translate-y-0" : "pointer-events-none opacity-0 translate-y-3"
        }`}
        style={{ height: "min(760px, calc(100vh - 6rem))" }}
      >
        <button
          type="button"
          onClick={() => setOpen(false)}
          aria-label="Закрыть"
          className="absolute right-2 top-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-background/80 text-foreground/60 backdrop-blur transition-opacity duration-300 hover:text-foreground hover:opacity-100"
        >
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.25" className="h-4 w-4" aria-hidden="true">
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        </button>

        {loaded && (
          <iframe
            src={IFRAME_URL}
            title="Чат с ассистентом Алиной"
            className="flex-1 w-full border-0 bg-background"
            loading="lazy"
          />
        )}
      </div>
    </>
  );
}
