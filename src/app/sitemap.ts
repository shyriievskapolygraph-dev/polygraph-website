import { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

const LOCALES = ["uk", "ru"];
const PAGES   = ["", "/about", "/pricing"];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return LOCALES.flatMap((locale) =>
    PAGES.map((page) => ({
      url: `${SITE_URL}/${locale}${page}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: page === "" ? 1.0 : page === "/about" ? 0.8 : 0.7,
      alternates: {
        languages: Object.fromEntries(
          LOCALES.map((l) => [l === "uk" ? "uk-UA" : "ru-UA", `${SITE_URL}/${l}${page}`])
        ),
      },
    }))
  );
}
