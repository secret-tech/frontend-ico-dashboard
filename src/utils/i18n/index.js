import i18n from 'i18next';
import LngDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-chained-backend';
import XHR from 'i18next-xhr-backend';
import LocalStorageBackend from 'i18next-localstorage-backend';

import Globals from '../../assets/locales/globals';

i18n
  .use(LngDetector)
  .use(Backend)
  .init({
    debug: true,
    interpolation: { defaultVariables: Globals },

    whitelist: ['en', 'ru'],
    fallbackLng: 'en',

    ns: ['common', 'auth'],
    defaultNS: 'common',

    react: {
      wait: true,
      nsMode: 'default'
    },

    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
    },

    backend: {
      backends: [
        LocalStorageBackend,
        XHR
      ],
      backendOptions: [
        {
          prefix: 'i18next_res_',
          expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
        },
        {
          loadPath: '/assets/locales/{{lng}}/{{ns}}.json',
        }
      ]
    }
  });

export default i18n;
