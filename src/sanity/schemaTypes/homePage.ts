import { defineArrayMember, defineField, defineType } from "sanity";

export const homePage = defineType({
  name: "homePage",
  title: "Головна сторінка",
  type: "document",
  groups: [
    { name: "hero", title: "Перший екран", default: true },
    { name: "intro", title: "Коли потрібен поліграф" },
    { name: "process", title: "Процес" },
    { name: "contact", title: "Форма консультації" },
  ],
  fields: [
    defineField({ name: "heroLabel", title: "Надзаголовок", type: "localizedString", group: "hero" }),
    defineField({ name: "heroTitleLine1", title: "Заголовок — рядок 1", type: "localizedString", group: "hero" }),
    defineField({ name: "heroTitleLine2", title: "Заголовок — акцент", type: "localizedString", group: "hero" }),
    defineField({ name: "heroTitleLine3", title: "Заголовок — рядок 3", type: "localizedString", group: "hero" }),
    defineField({
      name: "heroBadges",
      title: "Переваги під заголовком",
      type: "array",
      group: "hero",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (rule) => rule.max(4),
    }),
    defineField({
      name: "heroStats",
      title: "Показники",
      type: "array",
      group: "hero",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Значення", type: "localizedString" }),
            defineField({ name: "label", title: "Підпис", type: "localizedString" }),
          ],
          preview: {
            select: { title: "value.uk", subtitle: "label.uk" },
          },
        }),
      ],
      validation: (rule) => rule.max(4),
    }),
    defineField({ name: "introTitle", title: "Заголовок секції", type: "localizedString", group: "intro" }),
    defineField({ name: "introBody", title: "Основний текст", type: "localizedText", group: "intro" }),
    defineField({ name: "introQuote", title: "Акцентний текст", type: "localizedText", group: "intro" }),
    defineField({ name: "processTitle", title: "Заголовок секції", type: "localizedString", group: "process" }),
    defineField({ name: "processDescription", title: "Опис", type: "localizedText", group: "process" }),
    defineField({
      name: "processSteps",
      title: "Етапи дослідження",
      type: "array",
      group: "process",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({ name: "contactTitle", title: "Заголовок", type: "localizedString", group: "contact" }),
    defineField({ name: "contactDescription", title: "Опис", type: "localizedText", group: "contact" }),
    defineField({
      name: "contactTrustItems",
      title: "Гарантії біля форми",
      type: "array",
      group: "contact",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Тексти головної сторінки" };
    },
  },
});
