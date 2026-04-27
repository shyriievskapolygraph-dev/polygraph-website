"use client";

import { LanguageProvider } from "@/lib/LanguageContext";
import type { Lang } from "@/lib/translations";

export default function Providers({
  children,
  initialLang,
}: {
  children: React.ReactNode;
  initialLang: Lang;
}) {
  return <LanguageProvider initialLang={initialLang}>{children}</LanguageProvider>;
}
