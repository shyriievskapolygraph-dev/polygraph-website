import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import About from "@/components/sections/About";
import Certificates from "@/components/sections/Certificates";
import ContactForm from "@/components/sections/ContactForm";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import { SITE_URL, SPECIALIST_NAME, PHONE, EMAIL } from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";
  const url = `${SITE_URL}/${locale}/about`;
  return {
    title: isRu
      ? "Обо мне — Ирина Шириевская, полиграфолог"
      : "Про мене — Ірина Ширієвська, поліграфолог",
    description: isRu
      ? "Сертифицированный полиграфолог Ирина Шириевская. Опыт 11+ лет, 500+ исследований. Государственный сертификат, член Ассоциации полиграфологов Украины."
      : "Сертифікований поліграфолог Ірина Ширієвська. Досвід 11+ років, 500+ досліджень. Державний сертифікат, член Асоціації поліграфологів України.",
    alternates: {
      canonical: url,
      languages: {
        "uk-UA": `${SITE_URL}/uk/about`,
        "ru-UA": `${SITE_URL}/ru/about`,
        "x-default": `${SITE_URL}/uk/about`,
      },
    },
    openGraph: {
      title: isRu ? "Обо мне — Ирина Шириевская" : "Про мене — Ірина Ширієвська",
      description: isRu
        ? "Сертифицированный полиграфолог. 11+ лет практики, 500+ исследований."
        : "Сертифікований поліграфолог. 11+ років практики, 500+ досліджень.",
      url,
      locale: isRu ? "ru_UA" : "uk_UA",
      alternateLocale: isRu ? "uk_UA" : "ru_UA",
      images: [{
        url: `${SITE_URL}/${locale}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: isRu
          ? "Ирина Шириевская — сертифицированный полиграфолог"
          : "Ірина Ширієвська — сертифікований поліграфолог",
      }],
    },
  };
}

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  const isRu = locale === "ru";

  const personSchema = {
    "@type": "Person",
    "@id": `${SITE_URL}/uk/about#person`,
    name: SPECIALIST_NAME,
    jobTitle: isRu ? "Сертифицированный полиграфолог" : "Сертифікований поліграфолог",
    description: isRu
      ? "Сертифицированный полиграфолог с 11+ годами опыта. Специализируется на проверках для бизнеса, служебных расследованиях и частных запросах."
      : "Сертифікований поліграфолог з 11+ роками досвіду. Спеціалізується на перевірках для бізнесу, службових розслідуваннях та приватних запитах.",
    url: `${SITE_URL}/${locale}/about`,
    telephone: PHONE,
    email: EMAIL,
    address: {
      "@type": "PostalAddress",
      addressLocality: isRu ? "Киев" : "Київ",
      addressCountry: "UA",
    },
    worksFor: { "@id": `${SITE_URL}/#business` },
    hasCredential: [
      {
        "@type": "EducationalOccupationalCredential",
        name: isRu ? "Государственный сертификат полиграфолога" : "Державний сертифікат поліграфолога",
        credentialCategory: "Professional Certification",
      },
      {
        "@type": "EducationalOccupationalCredential",
        name: isRu ? "Членство в Ассоциации полиграфологов Украины" : "Членство в Асоціації поліграфологів України",
        credentialCategory: "Professional Membership",
      },
    ],
    knowsAbout: isRu
      ? ["Полиграфология", "Психофизиологические исследования", "Проверка персонала", "Служебные расследования"]
      : ["Поліграфологія", "Психофізіологічні дослідження", "Перевірка персоналу", "Службові розслідування"],
    sameAs: [
      "https://www.instagram.com/iryna_polygraph",
      "https://t.me/+380632429890",
    ],
  };

  const breadcrumbSchema = {
    "@type": "BreadcrumbList",
    "@id": `${SITE_URL}/${locale}/about#breadcrumb`,
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
        name: isRu ? "Обо мне" : "Про мене",
        item: `${SITE_URL}/${locale}/about`,
      },
    ],
  };

  return (
    <>
      <JsonLd data={[personSchema, breadcrumbSchema]} />
      <main>
        <Header />
        <About />
        <Certificates />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
}
