import i18next from 'i18next'

const i18n = i18next

i18n.createInstance({
  initImmediate: false,

  fallbackLng: `en`,

  // have a common namespace used around the full app
  ns: [`translations`],
  defaultNS: `translations`,

  debug: false,

  interpolation: {
    escapeValue: false, // not needed for react!!
  },

  react: {
    wait: false,
    // bindI18n: 'languageChanged loaded',
    // bindStore: 'added removed',
    nsMode: `default`,
  },
})

export default i18n
