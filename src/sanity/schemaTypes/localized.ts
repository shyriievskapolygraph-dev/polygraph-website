import { defineField, defineType } from "sanity";

export const localizedString = defineType({
  name: "localizedString",
  title: "Текст двома мовами",
  type: "object",
  fields: [
    defineField({
      name: "uk",
      title: "Українська",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ru",
      title: "Російська",
      type: "string",
      validation: (rule) => rule.required(),
    }),
  ],
});

export const localizedText = defineType({
  name: "localizedText",
  title: "Текстовий блок двома мовами",
  type: "object",
  fields: [
    defineField({
      name: "uk",
      title: "Українська",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "ru",
      title: "Російська",
      type: "text",
      rows: 5,
      validation: (rule) => rule.required(),
    }),
  ],
});
