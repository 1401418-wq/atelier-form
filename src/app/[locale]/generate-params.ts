import { locales } from "@/lib/translations";

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
