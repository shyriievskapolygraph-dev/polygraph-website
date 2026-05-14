import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Pricing from "@/components/sections/Pricing";
import ContactForm from "@/components/sections/ContactForm";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SPECIALIST_NAME } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";
  const url = `${SITE_URL}/${locale}/pricing`;
  return {
    title: isRu
      ? "Стоимость услуг — Полиграфолог Ирина Шириевская | Киев"
      : "Вартість послуг — Поліграфолог Ірина Ширієвська | Київ",
    description: isRu
      ? "Стоимость полиграфных исследований в Киеве. Проверка персонала от 2 200 грн, ТОП-менеджеры и служебные расследования 4 000 грн. Официальный договор."
      : "Вартість поліграфних досліджень у Києві. Перевірка персоналу від 2 200 грн, ТОП-менеджери та службові розслідування 4 000 грн. Офіційний договір.",
    alternates: {
      canonical: url,
      languages: {
        "uk-UA": `${SITE_URL}/uk/pricing`,
        "ru-UA": `${SITE_URL}/ru/pricing`,
        "x-default": `${SITE_URL}/uk/pricing`,
      },
    },
    openGraph: {
      title: isRu ? "Стоимость услуг — Полиграфолог в Киеве" : "Вартість послуг — Поліграфолог у Києві",
      description: isRu
        ? "Проверка персонала от 2 200 грн. Официальный договор, конфиденциально."
        : "Перевірка персоналу від 2 200 грн. Офіційний договір, конфіденційно.",
      url,
      locale: isRu ? "ru_UA" : "uk_UA",
      alternateLocale: isRu ? "uk_UA" : "ru_UA",
      images: [{
        url: `${SITE_URL}/${locale}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: isRu
          ? "Стоимость полиграфных услуг — Ирина Шириевская"
          : "Вартість поліграфних послуг — Ірина Ширієвська",
      }],
    },
  };
}

export default async function PricingPage({ params }: Props) {
  const { locale } = await params;
  const isRu = locale === "ru";

  const services = isRu ? [
    { name: "Проверка кандидатов при трудоустройстве", price: 2200 },
    { name: "Проверка действующего персонала",         price: 2200 },
    { name: "Проверка ТОП-менеджеров",                 price: 4000 },
    { name: "Служебные расследования",                 price: 4000 },
    { name: "Проверка перед увольнением сотрудника",   price: 2200 },
    { name: "Подозрение во внутренних нарушениях",     price: 4000 },
    { name: "Проверка благонадёжности сотрудников",    price: 2200 },
    { name: "Проверка личного персонала",              price: 3500 },
    { name: "Частные запросы",                         price: 3500 },
    { name: "Запросы супружеской верности",            price: 4500 },
    { name: "Спорт и киберспорт",                      price: 3000 },
  ] : [
    { name: "Перевірка кандидатів при працевлаштуванні", price: 2200 },
    { name: "Перевірка діючого персоналу",               price: 2200 },
    { name: "Перевірка ТОП-менеджерів",                  price: 4000 },
    { name: "Службові розслідування",                    price: 4000 },
    { name: "Перевірка перед звільненням співробітника", price: 2200 },
    { name: "Підозра у внутрішніх порушеннях",           price: 4000 },
    { name: "Перевірка благонадійності співробітників",  price: 2200 },
    { name: "Перевірка особистого персоналу",            price: 3500 },
    { name: "Приватні запити",                           price: 3500 },
    { name: "Запити подружньої вірності",                price: 4500 },
    { name: "Спорт та кіберспорт",                       price: 3000 },
  ];

  const pricingSchema = {
    "@type": "WebPage",
    "@id": `${SITE_URL}/${locale}/pricing`,
    url: `${SITE_URL}/${locale}/pricing`,
    name: isRu
      ? "Стоимость полиграфных услуг — Ирина Шириевская"
      : "Вартість поліграфних послуг — Ірина Ширієвська",
    inLanguage: locale === "ru" ? "ru" : "uk",
    mainEntity: {
      "@type": "ItemList",
      name: isRu
        ? "Стоимость полиграфных исследований в Киеве"
        : "Вартість поліграфних досліджень у Києві",
      itemListElement: services.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Offer",
          name: s.name,
          price: s.price,
          priceCurrency: "UAH",
          seller: {
            "@type": "Person",
            name: SPECIALIST_NAME,
            "@id": `${SITE_URL}/uk/about#person`,
          },
          areaServed: {
            "@type": "City",
            name: isRu ? "Киев" : "Київ",
          },
          availability: "https://schema.org/InStock",
        },
      })),
    },
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${locale}/pricing#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: isRu ? "Главная" : "Головна",
        item: `${SITE_URL}/${locale}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: isRu ? "Стоимость" : "Вартість",
        item: `${SITE_URL}/${locale}/pricing`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[pricingSchema, breadcrumbSchema]} />
      <main>
        <Header />
        <div className="h-16 sm:h-20 bg-[#2A2A2A]" />
        <Pricing />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
