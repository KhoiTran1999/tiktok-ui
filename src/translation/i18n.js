import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import HEADER_EN from './storeTranslation/en/Header.json';
import HEADER_VI from './storeTranslation/vi/Header.json';
// translation catalog
const resources = {
    en: {
        header: HEADER_EN,
    },
    vi: {
        header: HEADER_VI,
    },
};

const defaultNS = 'header';

// initialize i18next with catalog and language to use
i18n.use(initReactI18next).init({
    resources,
    lng: JSON.parse(localStorage.getItem('language')) || 'en',
    ns: ['header'],
    defaultNS,
    fallbackLng: 'vi',
    interpolation: {
        escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    },
});
