import type { Lang, T } from "@/lib/translations";
import { translations } from "@/lib/translations";
import { sanityClient } from "./client";
import { SITE_CONTENT_QUERY } from "./queries";

type LocaleKey = "uk" | "ru";
type Localized = Partial<Record<LocaleKey, string>>;

interface CmsService {
  order?: number;
  title?: Localized;
  teaser?: Localized;
  benefits?: Localized[];
  result?: Localized;
  price?: Localized;
}

interface CmsFaq {
  question?: Localized;
  answer?: Localized;
}

interface CmsStat {
  value?: Localized;
  label?: Localized;
}

interface CmsHomePage {
  heroLabel?: Localized;
  heroTitleLine1?: Localized;
  heroTitleLine2?: Localized;
  heroTitleLine3?: Localized;
  heroBadges?: Localized[];
  heroStats?: CmsStat[];
  introBody?: Localized;
  introQuote?: Localized;
  processDescription?: Localized;
  processSteps?: Localized[];
  contactDescription?: Localized;
  contactTrustItems?: Localized[];
}

interface CmsAboutPage {
  title?: Localized;
  description?: Localized;
  additionalText?: Localized;
  qualifications?: Localized[];
  stats?: CmsStat[];
}

interface CmsSiteSettings {
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  city?: Localized;
  workingHours?: Localized;
}

interface CmsContent {
  homePage?: CmsHomePage;
  aboutPage?: CmsAboutPage;
  siteSettings?: CmsSiteSettings;
  services?: CmsService[];
  faqItems?: CmsFaq[];
}

const read = (value: Localized | undefined, locale: LocaleKey) =>
  value?.[locale]?.trim();

const readList = (values: Localized[] | undefined, locale: LocaleKey) =>
  values?.map((value) => read(value, locale)).filter(Boolean) as
    | string[]
    | undefined;

export async function getSiteTranslations(lang: Lang): Promise<T> {
  const fallback = translations[lang] as T;
  const result: T = structuredClone(fallback);
  const locale: LocaleKey = lang === "ru" ? "ru" : "uk";

  try {
    const cms = await sanityClient.fetch<CmsContent>(
      SITE_CONTENT_QUERY,
      {},
      { next: { revalidate: 60 } }
    );

    const home = cms.homePage;
    if (home) {
      result.hero.label = read(home.heroLabel, locale) || result.hero.label;
      result.hero.h1Line1 =
        read(home.heroTitleLine1, locale) || result.hero.h1Line1;
      result.hero.h1Line2 =
        read(home.heroTitleLine2, locale) || result.hero.h1Line2;
      result.hero.h1Line3 =
        read(home.heroTitleLine3, locale) || result.hero.h1Line3;
      result.hero.pills = readList(home.heroBadges, locale) || result.hero.pills;

      if (home.heroStats?.length) {
        result.hero.stats = home.heroStats.map((stat, index) => ({
          value:
            read(stat.value, locale) || result.hero.stats[index]?.value || "",
          label:
            read(stat.label, locale) || result.hero.stats[index]?.label || "",
        }));
      }

      result.whenNeeded.body =
        read(home.introBody, locale) || result.whenNeeded.body;
      result.whenNeeded.quote =
        read(home.introQuote, locale) || result.whenNeeded.quote;
      result.process.description =
        read(home.processDescription, locale) || result.process.description;
      result.process.steps =
        readList(home.processSteps, locale) || result.process.steps;
      result.contactForm.description =
        read(home.contactDescription, locale) || result.contactForm.description;
      result.contactForm.trust =
        readList(home.contactTrustItems, locale) || result.contactForm.trust;
    }

    if (cms.services?.length) {
      result.services.items = cms.services.map((service, index) => ({
        id: service.order || index + 1,
        title: read(service.title, locale) || "",
        teaser: read(service.teaser, locale) || "",
        bullets: readList(service.benefits, locale) || [],
        result: read(service.result, locale) || "",
        price: read(service.price, locale) || "",
      }));
      result.pricing.items = result.services.items.map(({ title, price }) => ({
        title,
        price,
      }));
    }

    if (cms.faqItems?.length) {
      result.faq.items = cms.faqItems.map((item) => ({
        q: read(item.question, locale) || "",
        a: read(item.answer, locale) || "",
      }));
    }

    const about = cms.aboutPage;
    if (about) {
      const [firstName, ...lastName] = (read(about.title, locale) || "").split(
        " "
      );
      result.about.h1Line1 = firstName || result.about.h1Line1;
      result.about.h1Line2 = lastName.join(" ") || result.about.h1Line2;
      result.about.description1 =
        read(about.description, locale) || result.about.description1;
      result.about.description2 =
        read(about.additionalText, locale) || result.about.description2;
      result.about.qualifications =
        readList(about.qualifications, locale) || result.about.qualifications;

      if (about.stats?.length) {
        result.about.stats = about.stats.map((stat, index) => ({
          value:
            read(stat.value, locale) || result.about.stats[index]?.value || "",
          label:
            read(stat.label, locale) || result.about.stats[index]?.label || "",
        }));
      }
    }

    const settings = cms.siteSettings;
    if (settings) {
      const [city, phone, email] = result.contacts.items;
      city.value = read(settings.city, locale) || city.value;
      phone.value = settings.phoneDisplay || phone.value;
      phone.href = settings.phone ? `tel:${settings.phone}` : phone.href;
      phone.sub = read(settings.workingHours, locale) || phone.sub;
      email.value = settings.email || email.value;
      email.href = settings.email ? `mailto:${settings.email}` : email.href;
    }
  } catch {
    return fallback;
  }

  return result;
}
