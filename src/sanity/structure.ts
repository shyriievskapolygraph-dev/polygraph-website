import type { StructureResolver } from "sanity/structure";

const singleton = (
  S: Parameters<StructureResolver>[0],
  title: string,
  schemaType: string,
  documentId: string
) =>
  S.listItem()
    .title(title)
    .id(documentId)
    .child(
      S.document()
        .schemaType(schemaType)
        .documentId(documentId)
        .title(title)
    );

export const structure: StructureResolver = (S) =>
  S.list()
    .title("Керування сайтом")
    .items([
      singleton(S, "Головна сторінка", "homePage", "homePage"),
      singleton(S, "Сторінка «Про мене»", "aboutPage", "aboutPage"),
      singleton(S, "Контакти та SEO", "siteSettings", "siteSettings"),
      S.divider(),
      S.documentTypeListItem("service").title("Послуги та ціни"),
      S.documentTypeListItem("faq").title("FAQ"),
    ]);
