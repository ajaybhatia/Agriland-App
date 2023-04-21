import { locale } from 'expo-localization';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { I18nManager } from 'react-native';

import { resources } from './resources';
import { getLanguage } from './utils';

export * from './utils';

// const languageDetector = {
//   // type: 'languageDetector',
//   // async: true, // flags below detection to be async
//   // detect: locale,
//   // init: () => {},
//   // cacheUserLanguage: () => {},
//   init: Function.prototype,
//   async: true,
//   type: 'languageDetector',
//   detect: () => locale,
//   cacheUserLanguage: Function.prototype,
// };

i18n
  .use({
    // type: 'languageDetector',
    // async: true, // flags below detection to be async
    // detect: locale,
    // init: () => {},
    // cacheUserLanguage: () => {},
    init: Function.prototype,
    async: true,
    type: 'languageDetector',
    detect: () =>
      locale === 'ur-IN' || locale === 'ur_IN'
        ? 'urIN'
        : getLanguage() || locale,
    cacheUserLanguage: Function.prototype,
  })
  .use(initReactI18next)
  .init({
    resources,
    lng:
      locale === 'ur-IN' || locale === 'ur_IN'
        ? 'urIN'
        : getLanguage() || locale,
    fallbackLng: 'en',
    compatibilityJSON: 'v3', // By default React Native projects does not support Intl

    // allows integrating dynamic values into translations.
    interpolation: {
      escapeValue: false, // escape passed in values to avoid XSS injections
    },
  });

// Is it a RTL language?
export const isRTL: boolean = i18n.dir() === 'rtl';

I18nManager.allowRTL(isRTL);
I18nManager.forceRTL(isRTL);

export default i18n;
