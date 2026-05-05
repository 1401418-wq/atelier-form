import Hero from "@/components/sections/Hero";
import { ProjectsPreview } from "@/components/sections/ProjectsPreview";
import { Services } from "@/components/sections/Services";
import { Pricing } from "@/components/sections/Pricing";
import { Approach } from "@/components/sections/Approach";
import { AdditionalServices } from "@/components/sections/AdditionalServices";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import type { Locale } from "@/lib/translations";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale = rawLocale as Locale;
  return (
    <main>
      <Hero locale={locale} />
      <ProjectsPreview locale={locale} />
      <Services locale={locale} />
      <Pricing locale={locale} />
      <Approach locale={locale} />
      <AdditionalServices locale={locale} />
      <About locale={locale} />
      <Contact locale={locale} />
    </main>
  );
}
