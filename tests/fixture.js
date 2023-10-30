import i18nEn from '@/locale/messages/en'
import i18nEs from '@/locale/messages/es'

const i18nFixture = createI18nFixture({
  // i18n configuration options
  options: {
    debug: false,
    ns: ['translations'],
    supportedLngs: ['fr', 'es'],
    cleanCode: true,
    resources: {
      en: {
        translations: i18nEn,
      },
      es: {
        translations: i18nEs,
      },
    },
  },
  // Fetch translations in every test or fetch once
  // Default: true
  cache: true,
  // Run as auto fixture to be available through all tests by getI18nInstance()
  // Default: true
  auto: true,
})

export const testI18n =
  baseTest.extend(i18nFixture).extend <
  { i18nFix: i18n } >
  {
    i18nFix: async ({ i18n, locale }, use) => {
      if (locale === 'es-ES') {
        i18n.changeLanguage('es')
        await use(i18n)
      } else {
        i18n.changeLanguage('fr')
        await use(i18n)
      }
    },
  }
