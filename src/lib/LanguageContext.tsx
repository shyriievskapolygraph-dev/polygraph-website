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
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  return (
    <LanguageContext.Provider value={{ lang: initialLang, t: translations[initialLang] }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
