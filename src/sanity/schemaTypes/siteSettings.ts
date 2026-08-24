import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Налаштування сайту",
  type: "document",
  groups: [
    { name: "contacts", title: "Контакти", default: true },
    { name: "socials", title: "Соцмережі" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({
      name: "specialistName",
      title: "Імʼя спеціаліста",
      type: "localizedString",
      group: "contacts",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phone",
      title: "Телефон у міжнародному форматі",
      description: "Наприклад: +380632429890",
      type: "string",
      group: "contacts",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "phoneDisplay",
      title: "Телефон для показу",
      type: "string",
      group: "contacts",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "email",
      title: "Email",
      type: "string",
      group: "contacts",
      validation: (rule) => rule.required().email(),
    }),
    defineField({
      name: "city",
      title: "Місто",
      type: "localizedString",
      group: "contacts",
    }),
    defineField({
      name: "workingHours",
      title: "Графік роботи",
      type: "localizedString",
      group: "contacts",
    }),
    defineField({
      name: "telegramUsername",
      title: "Telegram username",
      type: "string",
      group: "socials",
    }),
    defineField({
      name: "whatsappNumber",
      title: "WhatsApp номер",
      description: "Тільки цифри, наприклад: 380632429890",
      type: "string",
      group: "socials",
    }),
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "url",
      group: "socials",
    }),
    defineField({
      name: "siteTitle",
      title: "SEO-заголовок головної сторінки",
      type: "localizedString",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "siteDescription",
      title: "SEO-опис головної сторінки",
      type: "localizedText",
      group: "seo",
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return { title: "Контакти, соцмережі та SEO" };
    },
  },
});
