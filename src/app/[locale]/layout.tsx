import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Providers from "@/components/Providers";
import StickyCallBar from "@/components/StickyCallBar";
import HtmlLang from "@/components/HtmlLang";
import type { Lang } from "@/lib/translations";
import { SITE_URL } from "@/lib/seo";
import { getSiteTranslations } from "@/sanity/lib/content";

const LOCALES = ["uk", "ru"];

type Props = { children: React.ReactNode; params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  await params;
  return {
    alternates: {
      languages: {
        "uk-UA": `${SITE_URL}/uk`,
        "ru-UA": `${SITE_URL}/ru`,
        "x-default": `${SITE_URL}/uk`,
      },
    },
  };
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params;
  if (!LOCALES.includes(locale)) notFound();
  const lang = (locale === "ru" ? "ru" : "ua") as Lang;
  const initialTranslations = await getSiteTranslations(lang);
  return (
    <Providers initialLang={lang} initialTranslations={initialTranslations}>
      <HtmlLang lang={locale} />
      {children}
      <StickyCallBar />
    </Providers>
  );
}
