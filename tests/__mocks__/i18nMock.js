import { createI18n } from 'vue-i18n';

const i18nMock = createI18n({
    legacy: false,
    locale: 'en', // default locale
    messages: {
        en: {
            'submit': 'Submit'  
        },
        ua: {
            'submit': 'Подати'
        }
    }
});

export default i18nMock;