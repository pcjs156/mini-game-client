import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import translationKO from "./ko/translation.json";
import translationEN from "./en/translation.json";

const resources = {
  ko: {
    translation: translationKO,
  },
  en: {
    translation: translationEN,
  },
};

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    resources,
    debug: true,
    supportedLngs: ["ko", "en"],
    fallbackLng: "ko",
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["navigator"],
      caches: [],
    },
  });

export default i18n;
