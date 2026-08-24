import { aboutPage } from "./aboutPage";
import { faq } from "./faq";
import { homePage } from "./homePage";
import { localizedString, localizedText } from "./localized";
import { service } from "./service";
import { siteSettings } from "./siteSettings";

export const schemaTypes = [
  localizedString,
  localizedText,
  siteSettings,
  homePage,
  aboutPage,
  service,
  faq,
];
