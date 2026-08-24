import { defineArrayMember, defineField, defineType } from "sanity";

export const aboutPage = defineType({
  name: "aboutPage",
  title: "Сторінка «Про мене»",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Заголовок", type: "localizedString" }),
    defineField({ name: "description", title: "Опис", type: "localizedText" }),
    defineField({ name: "additionalText", title: "Додатковий текст", type: "localizedText" }),
    defineField({
      name: "qualifications",
      title: "Кваліфікації",
      type: "array",
      of: [defineArrayMember({ type: "localizedString" })],
    }),
    defineField({
      name: "stats",
      title: "Показники",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "value", title: "Значення", type: "localizedString" }),
            defineField({ name: "label", title: "Підпис", type: "localizedString" }),
          ],
          preview: { select: { title: "value.uk", subtitle: "label.uk" } },
        }),
      ],
    }),
    defineField({
      name: "certificates",
      title: "Сертифікати",
      type: "array",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "title", title: "Назва", type: "localizedString" }),
            defineField({
              name: "image",
              title: "Зображення",
              type: "image",
              options: { hotspot: true },
              validation: (rule) => rule.required(),
            }),
          ],
          preview: { select: { title: "title.uk", media: "image" } },
        }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Біографія, досвід і сертифікати" };
    },
  },
});
