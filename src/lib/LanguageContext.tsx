"use client";

import { createContext, useContext } from "react";
import { translations, type Lang, type T } from "./translations";

interface LanguageCtx {
  lang: Lang;
  t: T;
}

const LanguageContext = createContext<LanguageCtx>({
  lang: "ua",
  t: translations.ua,
});

export function LanguageProvider({
  children,
  initialLang,
  initialTranslations,
}: {
  children: React.ReactNode;
  initialLang: Lang;
  initialTranslations?: T;
}) {
  return (
    <LanguageContext.Provider
      value={{
        lang: initialLang,
        t: initialTranslations || (translations[initialLang] as T),
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
