// import i18n from 'i18next';
// import LngDetector from 'i18next-browser-languagedetector';
// import Backend from 'i18next-chained-backend';
// import XHR from 'i18next-xhr-backend';
// import LocalStorageBackend from 'i18next-localstorage-backend';
//
// import config from '../config';
//
// i18n
//   .use(LngDetector)
//   .use(Backend)
//   .init({
//     debug: true,
//     interpolation: { defaultVariables: config },
//
//     whitelist: ['en'],
//     fallbackLng: 'en',
//
//     ns: ['common'],
//     defaultNS: 'common',
//
//     react: {
//       wait: true,
//       nsMode: 'default'
//     },
//
//     detection: {
//       order: ['localStorage', 'navigator'],
//       caches: ['localStorage'],
//     },
//
//     backend: {
//       backends: [
//         LocalStorageBackend,
//         XHR
//       ],
//       backendOptions: [
//         {
//           prefix: 'i18next_res_',
//           expirationTime: 7 * 24 * 60 * 60 * 1000 // 7 days
//         },
//         {
//           loadPath: './assets/locales/{{lng}}/{{ns}}.json',
//         }
//       ]
//     }
//   });
//
// export default i18n;


import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import langDetector from 'i18next-browser-languagedetector';

import config from '../config';

const en = {
  settings: require('../../assets/locales/en/settings.json'),
  app: require('../../assets/locales/en/app.json'),
  common: require('../../assets/locales/en/common.json'),
  auth: require('../../assets/locales/en/auth.json'),
  dashboard: require('../../assets/locales/en/dashboard.json'),
  referrals: require('../../assets/locales/en/referrals.json'),
  transactions: require('../../assets/locales/en/transactions.json'),
  verification: require('../../assets/locales/en/verification.json')
};

const ru = {
  settings: require('../../assets/locales/ru/settings.json'),
  app: require('../../assets/locales/ru/app.json'),
  common: require('../../assets/locales/ru/common.json'),
  auth: require('../../assets/locales/ru/auth.json'),
  dashboard: require('../../assets/locales/ru/dashboard.json'),
  referrals: require('../../assets/locales/ru/referrals.json'),
  transactions: require('../../assets/locales/ru/transactions.json'),
  verification: require('../../assets/locales/ru/verification.json')
};

i18next
  .use(XHR)
  .use(langDetector)
  .init({
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    react: {
      wait: true,
      nsMode: 'default'
    },
    resources: { en, ru },
    interpolation: {
      defaultVariables: config
    },
    ns: ['common'],
    defaultNS: 'common'
  });

export default i18next;
