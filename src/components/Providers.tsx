"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import type { Lang, T } from "@/lib/translations";

export default function Providers({
  children,
  initialLang,
  initialTranslations,
}: {
  children: React.ReactNode;
  initialLang: Lang;
  initialTranslations?: T;
}) {
  return (
    <LanguageProvider
      initialLang={initialLang}
      initialTranslations={initialTranslations}
    >
      {children}
    </LanguageProvider>
  );
}
