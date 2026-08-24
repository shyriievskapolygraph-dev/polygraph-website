import { defineField, defineType } from "sanity";

export const faq = defineType({
  name: "faq",
  title: "Питання та відповідь",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Питання",
      type: "localizedString",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "answer",
      title: "Відповідь",
      type: "localizedText",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "order",
      title: "Порядок",
      type: "number",
      initialValue: 1,
      validation: (rule) => rule.required().integer().min(1),
    }),
    defineField({
      name: "active",
      title: "Показувати на сайті",
      type: "boolean",
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
    select: { title: "question.uk", order: "order" },
    prepare({ title, order }) {
      return { title: `${order ? `${order}. ` : ""}${title || "Без питання"}` };
    },
  },
});
