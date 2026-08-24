import { getCliClient } from "sanity/cli";
import { translations } from "../src/lib/translations";

const client = getCliClient({ apiVersion: "2026-08-24" });
const { ua, ru } = translations;

const localizedString = (uk: string, ruValue: string) => ({
  _type: "localizedString",
  uk,
  ru: ruValue,
});

const localizedText = (uk: string, ruValue: string) => ({
  _type: "localizedText",
  uk,
  ru: ruValue,
});

const localizedItems = (ukItems: string[], ruItems: string[]) =>
  ukItems.map((item, index) => ({
    _key: `item-${index + 1}`,
    ...localizedString(item, ruItems[index] || item),
  }));

const services = ua.services.items.map((item, index) => ({
  _id: `service-${String(index + 1).padStart(2, "0")}`,
  _type: "service",
  title: localizedString(item.title, ru.services.items[index].title),
  teaser: localizedText(item.teaser, ru.services.items[index].teaser),
  benefits: localizedItems(item.bullets, ru.services.items[index].bullets),
  result: localizedText(item.result, ru.services.items[index].result),
  price: localizedString(item.price, ru.services.items[index].price),
  priceValue: Number(item.price.replace(/\D/g, "")),
  audience: index < 7 || index === 10 ? "business" : "personal",
  order: index + 1,
  featured: index === 0,
  active: true,
}));

const faqItems = ua.faq.items.map((item, index) => ({
  _id: `faq-${String(index + 1).padStart(2, "0")}`,
  _type: "faq",
  question: localizedString(item.q, ru.faq.items[index].q),
  answer: localizedText(item.a, ru.faq.items[index].a),
  order: index + 1,
  active: true,
}));

const homePage = {
  _id: "homePage",
  _type: "homePage",
  heroLabel: localizedString(ua.hero.label, ru.hero.label),
  heroTitleLine1: localizedString(ua.hero.h1Line1, ru.hero.h1Line1),
  heroTitleLine2: localizedString(ua.hero.h1Line2, ru.hero.h1Line2),
  heroTitleLine3: localizedString(ua.hero.h1Line3, ru.hero.h1Line3),
  heroBadges: localizedItems([...ua.hero.pills], [...ru.hero.pills]),
  heroStats: ua.hero.stats.map((stat, index) => ({
    _key: `stat-${index + 1}`,
    _type: "object",
    value: localizedString(stat.value, ru.hero.stats[index].value),
    label: localizedString(stat.label, ru.hero.stats[index].label),
  })),
  introTitle: localizedString(
    `${ua.whenNeeded.h2Line1} ${ua.whenNeeded.h2Line2}`,
    `${ru.whenNeeded.h2Line1} ${ru.whenNeeded.h2Line2}`
  ),
  introBody: localizedText(ua.whenNeeded.body, ru.whenNeeded.body),
  introQuote: localizedText(ua.whenNeeded.quote, ru.whenNeeded.quote),
  processTitle: localizedString(
    `${ua.process.h2Line1} ${ua.process.h2Line2}`,
    `${ru.process.h2Line1} ${ru.process.h2Line2}`
  ),
  processDescription: localizedText(
    ua.process.description,
    ru.process.description
  ),
  processSteps: localizedItems([...ua.process.steps], [...ru.process.steps]),
  contactTitle: localizedString(
    `${ua.contactForm.h2Line1} ${ua.contactForm.h2Line2}`,
    `${ru.contactForm.h2Line1} ${ru.contactForm.h2Line2}`
  ),
  contactDescription: localizedText(
    ua.contactForm.description,
    ru.contactForm.description
  ),
  contactTrustItems: localizedItems(
    [...ua.contactForm.trust],
    [...ru.contactForm.trust]
  ),
};

const aboutPage = {
  _id: "aboutPage",
  _type: "aboutPage",
  title: localizedString(
    `${ua.about.h1Line1} ${ua.about.h1Line2}`,
    `${ru.about.h1Line1} ${ru.about.h1Line2}`
  ),
  description: localizedText(ua.about.description1, ru.about.description1),
  additionalText: localizedText(ua.about.description2, ru.about.description2),
  qualifications: localizedItems(
    [...ua.about.qualifications],
    [...ru.about.qualifications]
  ),
  stats: ua.about.stats.map((stat, index) => ({
    _key: `stat-${index + 1}`,
    _type: "object",
    value: localizedString(stat.value, ru.about.stats[index].value),
    label: localizedString(stat.label, ru.about.stats[index].label),
  })),
};

const siteSettings = {
  _id: "siteSettings",
  _type: "siteSettings",
  specialistName: localizedString("Ірина Ширієвська", "Ирина Шириевская"),
  phone: "+380632429890",
  phoneDisplay: "+38 (063) 242 98 90",
  email: "shyriievska.polygraph@gmail.com",
  city: localizedString("Київ", "Киев"),
  workingHours: localizedString("Пн–Пт, 9:00–19:00", "Пн–Пт, 9:00–19:00"),
  telegramUsername: "shyriievska",
  whatsappNumber: "380632429890",
  instagramUrl: "https://www.instagram.com/iryna_polygraph",
  siteTitle: localizedString(
    "Поліграфолог у Києві — Ірина Ширієвська",
    "Полиграфолог в Киеве — Ирина Шириевская"
  ),
  siteDescription: localizedText(
    "Сертифікований поліграфолог у Києві. Перевірка персоналу, службові розслідування, приватні запити.",
    "Сертифицированный полиграфолог в Киеве. Проверка персонала, служебные расследования, частные запросы."
  ),
};

const documents: Array<{
  _id: string;
  _type: string;
  [key: string]: unknown;
}> = [siteSettings, homePage, aboutPage, ...services, ...faqItems];

async function seed() {
  const existingDocumentCount = await client.fetch<number>("count(*)");
  const force = process.argv.includes("--force");

  if (existingDocumentCount > 0 && !force) {
    throw new Error(
      `Dataset already contains ${existingDocumentCount} documents. ` +
        "Use --force only when you intentionally want to replace seeded content."
    );
  }

  let transaction = client.transaction();

  for (const document of documents) {
    transaction = transaction.createOrReplace(document);
  }

  await transaction.commit();
  console.log(`Imported ${documents.length} documents into Sanity.`);
}

seed().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
