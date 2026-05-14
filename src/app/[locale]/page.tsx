import type { Metadata } from "next";
import Header from "@/components/layout/Header";
import Hero from "@/components/sections/Hero";
import WhenNeeded from "@/components/sections/WhenNeeded";
import Services from "@/components/sections/Services";
import Process from "@/components/sections/Process";
import FAQ from "@/components/sections/FAQ";
import ContactForm from "@/components/sections/ContactForm";
import Contacts from "@/components/sections/Contacts";
import Footer from "@/components/layout/Footer";
import JsonLd from "@/components/JsonLd";
import {
  SITE_URL, SITE_NAME, SPECIALIST_NAME,
  PHONE, EMAIL, GEO_LAT, GEO_LNG,
  PRICE_RANGE, OPENING_HOURS, TELEGRAM_URL,
} from "@/lib/seo";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const isRu = locale === "ru";
  const url = `${SITE_URL}/${locale}`;
  return {
    title: isRu
      ? "Полиграфолог в Киеве — Ирина Шириевская"
      : "Поліграфолог у Києві — Ірина Ширієвська",
    description: isRu
      ? "Сертифицированный полиграфолог в Киеве. 11+ лет опыта. Проверка персонала, служебные расследования, частные запросы. Конфиденциально."
      : "Сертифікований поліграфолог у Києві. 11+ років досвіду. Перевірка персоналу, службові розслідування, приватні запити. Конфіденційно.",
    keywords: isRu
      ? [
          "полиграфолог Киев", "проверка на полиграфе Киев", "детектор лжи Киев",
          "полиграф для бизнеса", "проверка персонала полиграф", "служебное расследование полиграф",
          "полиграф при приеме на работу", "полиграф для проверки партнера",
          "сколько стоит полиграф Киев", "сертифицированный полиграфолог Украина",
          "Ирина Шириевская полиграфолог",
        ]
      : [
          "поліграфолог Київ", "перевірка на поліграфі Київ", "детектор брехні Київ",
          "поліграф для бізнесу", "перевірка персоналу поліграф", "службове розслідування поліграф",
          "поліграф при прийомі на роботу", "поліграф перевірка партнера",
          "скільки коштує поліграф Київ", "сертифікований поліграфолог Україна",
          "Ірина Ширієвська поліграфолог",
        ],
    alternates: {
      canonical: url,
      languages: {
        "uk-UA": `${SITE_URL}/uk`,
        "ru-UA": `${SITE_URL}/ru`,
        "x-default": `${SITE_URL}/uk`,
      },
    },
    openGraph: {
      title: isRu ? "Полиграфолог в Киеве — Ирина Шириевская" : "Поліграфолог у Києві — Ірина Ширієвська",
      description: isRu
        ? "Сертифицированный полиграфолог. 11+ лет практики. Конфиденциально."
        : "Сертифікований поліграфолог. 11+ років практики. Конфіденційно.",
      url,
      locale: isRu ? "ru_UA" : "uk_UA",
      alternateLocale: isRu ? "uk_UA" : "ru_UA",
      images: [{
        url: `${SITE_URL}/${locale}/opengraph-image`,
        width: 1200,
        height: 630,
        alt: isRu
          ? "Ирина Шириевская — сертифицированный полиграфолог в Киеве"
          : "Ірина Ширієвська — сертифікований поліграфолог у Києві",
      }],
    },
    twitter: {
      card: "summary_large_image",
      images: [`${SITE_URL}/${locale}/opengraph-image`],
    },
  };
}

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  const isRu = locale === "ru";

  const websiteSchema = {
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: SITE_NAME,
    inLanguage: ["uk", "ru"],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["h1", "h2", "#faq"],
    },
  };

  const localBusinessSchema = {
    "@type": ["LocalBusiness", "ProfessionalService"],
    "@id": `${SITE_URL}/#business`,
    name: SITE_NAME,
    description: isRu
      ? "Сертифицированный полиграфолог в Киеве. Проверка персонала, служебные расследования, частные запросы."
      : "Сертифікований поліграфолог у Києві. Перевірка персоналу, службові розслідування, приватні запити.",
    url: SITE_URL,
    telephone: PHONE,
    email: EMAIL,
    priceRange: PRICE_RANGE,
    openingHours: OPENING_HOURS,
    image: `${SITE_URL}/${locale}/opengraph-image`,
    address: {
      "@type": "PostalAddress",
      addressLocality: isRu ? "Киев" : "Київ",
      addressCountry: "UA",
    },
    geo: { "@type": "GeoCoordinates", latitude: GEO_LAT, longitude: GEO_LNG },
    serviceArea: { "@type": "Country", name: "Ukraine" },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: PHONE,
      email: EMAIL,
      contactType: "customer service",
      availableLanguage: ["Ukrainian", "Russian"],
      hoursAvailable: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "19:00",
      },
    },
    employee: {
      "@type": "Person",
      "@id": `${SITE_URL}/uk/about#person`,
      name: SPECIALIST_NAME,
      jobTitle: isRu ? "Сертифицированный полиграфолог" : "Сертифікований поліграфолог",
      url: `${SITE_URL}/${locale}/about`,
    },
    sameAs: [
      "https://www.instagram.com/iryna_polygraph",
      TELEGRAM_URL,
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: isRu ? "Полиграфные исследования" : "Поліграфні дослідження",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: isRu ? "Проверка кандидатов при трудоустройстве" : "Перевірка кандидатів при працевлаштуванні" }, price: "2200", priceCurrency: "UAH" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: isRu ? "Проверка действующего персонала" : "Перевірка діючого персоналу" }, price: "2200", priceCurrency: "UAH" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: isRu ? "Служебные расследования" : "Службові розслідування" }, price: "4000", priceCurrency: "UAH" },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: isRu ? "Частные запросы" : "Приватні запити" }, price: "3500", priceCurrency: "UAH" },
      ],
    },
  };

  const faqSchema = {
    "@type": "FAQPage",
    "@id": `${SITE_URL}/#faq`,
    mainEntity: isRu ? [
      {
        "@type": "Question",
        name: "Насколько точны результаты полиграфа?",
        acceptedAnswer: { "@type": "Answer", text: "Полиграф выявляет психофизиологические реакции, связанные со значимой для человека информацией. Заключение формируется на основе комплексного анализа интервью, тестирования и поведенческих факторов. Точность определяется квалификацией специалиста и соблюдением методологии." },
      },
      {
        "@type": "Question",
        name: "Сколько стоит полиграфное исследование в Киеве?",
        acceptedAnswer: { "@type": "Answer", text: "Стоимость полиграфных исследований у Ирины Шириевской — от 2 200 до 4 500 грн в зависимости от вида исследования. Проверка персонала от 2 200 грн, ТОП-менеджеры и служебные расследования 4 000 грн, запросы супружеской верности 4 500 грн." },
      },
      {
        "@type": "Question",
        name: "Гарантируется ли конфиденциальность?",
        acceptedAnswer: { "@type": "Answer", text: "Да. Вся информация, полученная в ходе работы, является конфиденциальной и не передаётся третьим лицам без согласования. На каждое исследование составляется официальный договор." },
      },
      {
        "@type": "Question",
        name: "Сколько длится исследование?",
        acceptedAnswer: { "@type": "Answer", text: "В зависимости от задачи — в среднем от 1,5 до 3 часов. В сложных случаях продолжительность может быть увеличена для достижения более точного результата." },
      },
      {
        "@type": "Question",
        name: "Можно ли подготовиться к полиграфу?",
        acceptedAnswer: { "@type": "Answer", text: "Специальная подготовка не требуется. Важно выспаться и находиться в нормальном физическом и психологическом состоянии. Перед тестированием проводится предварительное интервью, которое помогает снизить напряжение." },
      },
      {
        "@type": "Question",
        name: "Можно ли провести проверку без согласия сотрудника?",
        acceptedAnswer: { "@type": "Answer", text: "Нет. Исследование проводится исключительно на добровольной основе. Респондент подписывает добровольное согласие — это обязательное условие достоверности результатов." },
      },
    ] : [
      {
        "@type": "Question",
        name: "Наскільки точні результати поліграфа?",
        acceptedAnswer: { "@type": "Answer", text: "Поліграф виявляє психофізіологічні реакції, пов'язані зі значущою для людини інформацією. Висновок формується на основі комплексного аналізу інтерв'ю, тестування та поведінкових факторів. Точність визначається кваліфікацією спеціаліста та дотриманням методології." },
      },
      {
        "@type": "Question",
        name: "Скільки коштує поліграфне дослідження у Києві?",
        acceptedAnswer: { "@type": "Answer", text: "Вартість поліграфних досліджень у Ірини Ширієвської — від 2 200 до 4 500 грн залежно від виду дослідження. Перевірка персоналу від 2 200 грн, ТОП-менеджери та службові розслідування 4 000 грн, запити подружньої вірності 4 500 грн." },
      },
      {
        "@type": "Question",
        name: "Чи гарантується конфіденційність?",
        acceptedAnswer: { "@type": "Answer", text: "Так. Уся інформація, отримана під час роботи, є конфіденційною і не передається третім особам без погодження. На кожне дослідження складається офіційний договір." },
      },
      {
        "@type": "Question",
        name: "Скільки триває дослідження?",
        acceptedAnswer: { "@type": "Answer", text: "Залежно від задачі — в середньому від 1,5 до 3 годин. У складних випадках тривалість може бути збільшена для досягнення більш точного результату." },
      },
      {
        "@type": "Question",
        name: "Чи можна підготуватись до поліграфа?",
        acceptedAnswer: { "@type": "Answer", text: "Спеціальна підготовка не потрібна. Важливо виспатися та бути у нормальному фізичному та психологічному стані. Перед тестуванням проводиться попереднє інтерв'ю, яке допомагає знизити напругу." },
      },
      {
        "@type": "Question",
        name: "Чи можна проводити перевірку без згоди співробітника?",
        acceptedAnswer: { "@type": "Answer", text: "Ні. Дослідження проводиться виключно за добровільною згодою. Респондент підписує добровільну згоду — це обов'язкова умова достовірності результатів." },
      },
    ],
  };

  const howToSchema = {
    "@type": "HowTo",
    "@id": `${SITE_URL}/#howto`,
    name: isRu ? "Как проходит полиграфное исследование" : "Як проходить поліграфне дослідження",
    description: isRu
      ? "Пошаговая процедура проведения полиграфного исследования Ириной Шириевской в Киеве"
      : "Покрокова процедура проведення поліграфного дослідження Іриною Ширієвською у Києві",
    totalTime: "PT2H",
    step: isRu ? [
      { "@type": "HowToStep", position: 1, name: "Предварительная консультация", text: "Обсуждение задачи, целей исследования и формирование предварительных вопросов." },
      { "@type": "HowToStep", position: 2, name: "Подписание договора", text: "Заказчик подписывает официальный договор об оказании услуг полиграфолога." },
      { "@type": "HowToStep", position: 3, name: "Подготовка опросника", text: "Формируется индивидуальный тестовый опросник и согласовывается с заказчиком." },
      { "@type": "HowToStep", position: 4, name: "Добровольное согласие", text: "Респондент подписывает добровольное согласие на проведение полиграфного тестирования." },
      { "@type": "HowToStep", position: 5, name: "Проведение исследования", text: "Непосредственное проведение полиграфного тестирования в комфортных условиях." },
      { "@type": "HowToStep", position: 6, name: "Заключение", text: "Анализ результатов и подготовка письменного заключения, которое передаётся заказчику." },
    ] : [
      { "@type": "HowToStep", position: 1, name: "Попередня консультація", text: "Обговорення задачі, цілей дослідження та формування попередніх питань." },
      { "@type": "HowToStep", position: 2, name: "Підписання договору", text: "Замовник підписує офіційний договір про надання послуг поліграфолога." },
      { "@type": "HowToStep", position: 3, name: "Підготовка опитувальника", text: "Формується індивідуальний тестовий опитувальник та погоджується з замовником." },
      { "@type": "HowToStep", position: 4, name: "Добровільна згода", text: "Респондент підписує добровільну згоду на проведення поліграфного тестування." },
      { "@type": "HowToStep", position: 5, name: "Проведення дослідження", text: "Безпосереднє проведення поліграфного тестування у комфортних умовах." },
      { "@type": "HowToStep", position: 6, name: "Висновок", text: "Аналіз результатів та підготовка письмового висновку, який передається замовнику." },
    ],
  };

  return (
    <>
      <JsonLd data={[websiteSchema, localBusinessSchema, faqSchema, howToSchema]} />
      <main>
        <Header />
        <Hero />
        <WhenNeeded />
        <Services />
        <Process />
        <FAQ />
        <ContactForm />
        <Contacts />
      </main>
      <Footer />
    </>
  );
}
