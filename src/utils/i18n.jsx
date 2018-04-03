import i18next from "i18next"

const i18n = i18next

i18n
  .createInstance({
    initImmediate: false,

    fallbackLng: "en",

    // have a common namespace used around the full app
    ns: ["translations"],
    defaultNS: "translations",

    debug: false,
    
    interpolation: {
      escapeValue: false, // not needed for react!!
    },

    react: {
      wait: false,
      // bindI18n: 'languageChanged loaded',
      // bindStore: 'added removed',
      nsMode: 'default',
    },
  })


// for browser use xhr backend to load translations and browser lng detector
// if (process.browser) {
// i18n
//   .use(Backend)
//   // .use(Cache)
//   .use(LanguageDetector);
// }

// i18n.getInitialProps = (req, namespaces) => {
//   if (!namespaces) namespaces = i18n.options.defaultNS
//   if (typeof namespaces === 'string') namespaces = [namespaces]

//   req.i18n.toJSON = () => null // do not serialize i18next instance and send to client

//   const initialI18nStore = {}
//   req.i18n.languages.forEach((l) => {
//     initialI18nStore[l] = {}
//     namespaces.forEach((ns) => {
//       initialI18nStore[l][ns] = req.i18n.services.resourceStore.data[l] ? req.i18n.services.resourceStore.data[l][ns] || {} : {}
//     })
//   })

//   return {
//     i18n: req.i18n, // use the instance on req - fixed language on request (avoid issues in race conditions with lngs of different users)
//     initialI18nStore,
//     initialLanguage: req.i18n.language
//   }
// }

export default i18n