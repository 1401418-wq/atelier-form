"use client";
import { useState } from "react";
import { FadeIn } from "@/components/ui/FadeIn";
import type { Locale } from "@/lib/translations";
import translations from "@/lib/translations";

interface ContactProps {
  locale: Locale;
}

export function Contact({ locale }: ContactProps) {
  const t = translations[locale];
  const [form, setForm] = useState({ name: "", contact: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-[72px] md:py-36 border-t border-border">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.5fr] gap-10 md:gap-24">
          {/* Left */}
          <FadeIn>
            <div>
              <p className="label mb-4">{t.contact.heading}</p>
              <h2 className="font-display font-light leading-[1.1] tracking-[-0.02em] text-[clamp(1.625rem,5vw,4rem)] mb-6 md:mb-8">
                {t.contact.subheading}
              </h2>

              <div className="space-y-3">
                <div className="flex gap-4">
                  <p className="label w-16 shrink-0">Email</p>
                  <p className="label text-foreground">{t.contact.info.email}</p>
                </div>
                <div className="flex gap-4">
                  <p className="label w-16 shrink-0">Tel</p>
                  <p className="label text-foreground">{t.contact.info.phone}</p>
                </div>
                <div className="flex gap-4">
                  <p className="label w-16 shrink-0">
                    {locale === "ru" ? "Адрес" : "Address"}
                  </p>
                  <p className="label text-foreground">{t.contact.info.address}</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: form */}
          <FadeIn delay={150}>
            {submitted ? (
              <div className="flex items-center h-full py-12 md:py-20">
                <div>
                  <div className="w-8 h-px bg-foreground mb-6" />
                  <p className="font-display text-2xl font-light">
                    {t.contact.form.success}
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-0 divide-y divide-border border-y border-border">
                {/* Name */}
                <div className="py-5 md:py-6 flex flex-col gap-2">
                  <label className="label">{t.contact.form.name}</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full bg-transparent text-foreground font-display text-base md:text-xl font-light placeholder:text-muted-light outline-none focus:outline-none border-none cursor-text"
                    placeholder="—"
                  />
                </div>

                {/* Contact */}
                <div className="py-5 md:py-6 flex flex-col gap-2">
                  <label className="label">{t.contact.form.contact}</label>
                  <input
                    type="text"
                    required
                    value={form.contact}
                    onChange={(e) => setForm({ ...form, contact: e.target.value })}
                    className="w-full bg-transparent text-foreground font-display text-base md:text-xl font-light placeholder:text-muted-light outline-none focus:outline-none border-none cursor-text"
                    placeholder="—"
                  />
                </div>

                {/* Message */}
                <div className="py-5 md:py-6 flex flex-col gap-2">
                  <label className="label">{t.contact.form.message}</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full bg-transparent text-foreground font-display text-base md:text-xl font-light placeholder:text-muted-light outline-none focus:outline-none border-none resize-none cursor-text"
                    placeholder="—"
                  />
                </div>

                {/* Submit */}
                <div className="pt-6 md:pt-8 pb-2">
                  <button
                    type="submit"
                    disabled={loading}
                    className="group w-full md:w-auto inline-flex items-center justify-center md:justify-start gap-3 border border-foreground px-8 py-4 text-xs tracking-[0.15em] uppercase hover:bg-foreground hover:text-background transition-all duration-500 disabled:opacity-40 cursor-pointer"
                  >
                    {loading ? "..." : t.contact.form.submit}
                    {!loading && (
                      <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                    )}
                  </button>
                </div>
              </form>
            )}
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
