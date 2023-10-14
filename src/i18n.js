import { createI18n } from 'vue-i18n';
import store from './store/store'; // Adjust the path accordingly

const i18n = createI18n({
  legacy: false,
  locale: store.state.locale,
  fallbackLocale: 'en',
  messages: {
    // Import your translation files dynamically here
  },
});

const loadLocaleMessages = async () => {
  const locales = ['en', 'ua'];
  for (const locale of locales) {
    const messages = await import(`./locales/${locale}.json`);
    i18n.global.setLocaleMessage(locale, messages.default);
  }
};

loadLocaleMessages();

export default i18n;
