import { defineArrayMember, defineField, defineType } from "sanity";

export const service = defineType({
  name: "service",
  title: "Послуга",
  type: "document",
  groups: [
    { name: "content", title: "Контент", default: true },
    { name: "settings", title: "Налаштування" },
  ],
  fields: [
    defineField({
      name: "title",
      title: "Назва",
      type: "localizedString",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "teaser",
      title: "Короткий опис",
      type: "localizedText",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "benefits",
      title: "Що дає перевірка",
      type: "array",
      group: "content",
      of: [defineArrayMember({ type: "localizedString" })],
      validation: (rule) => rule.min(1),
    }),
    defineField({
      name: "result",
      title: "Результат для клієнта",
      type: "localizedText",
      group: "content",
    }),
    defineField({
      name: "price",
      title: "Ціна для показу",
      description: "Наприклад: «від 2 200 грн» / «от 2 200 грн».",
      type: "localizedString",
      group: "content",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "priceValue",
      title: "Числове значення ціни",
      description: "Використовується у структурованих SEO-даних.",
      type: "number",
      group: "settings",
      validation: (rule) => rule.required().integer().positive(),
    }),
    defineField({
      name: "audience",
      title: "Категорія",
      type: "string",
      group: "settings",
      options: {
        layout: "radio",
        list: [
          { title: "Для бізнесу", value: "business" },
          { title: "Для приватних осіб", value: "personal" },
          { title: "Для обох категорій", value: "all" },
        ],
      },
      initialValue: "business",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
      group: "settings",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "featured",
      title: "Позначити як найпопулярнішу",
      type: "boolean",
      group: "settings",
      initialValue: false,
    }),
    defineField({
      name: "active",
      title: "Показувати на сайті",
      type: "boolean",
      group: "settings",
      initialValue: true,
    }),
  ],
  orderings: [
    {
      title: "Порядок на сайті",
      name: "siteOrder",
      by: [{ field: "order", direction: "asc" }],
    },
  ],
  preview: {
    select: {
      title: "title.uk",
      subtitle: "price.uk",
      order: "order",
    },
    prepare({ title, subtitle, order }) {
      return {
        title: `${order ? `${order}. ` : ""}${title || "Без назви"}`,
        subtitle,
      };
    },
  },
});
