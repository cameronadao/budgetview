import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import translation files
import en from './en.json';
import fr from './fr.json';

// Initialize i18n
i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      fr: {
        translation: fr
      }
    },
    lng: localStorage.getItem('language') || 'fr',
    fallbackLng: 'fr',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;