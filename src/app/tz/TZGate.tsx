"use client";

import dynamic from "next/dynamic";

const TZForm = dynamic(() => import("./TZForm"), {
  ssr: false,
  loading: () => (
    <main className="min-h-screen bg-[#f6f3ee]">
      <header className="border-b border-[#e6e0d6] bg-white/60">
        <div className="max-w-[900px] mx-auto px-6 md:px-8 py-5" />
      </header>
    </main>
  ),
});

export default function TZGate() {
  return <TZForm />;
}
