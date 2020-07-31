import {InitOptions} from 'i18next';
import resources from '@fos/locale/languages';

export const namespaces = ['common', 'screens', 'carouselItems'];
export const defaultNamespace = 'common';
export const defaultLang = 'en';
export const fallbackLang = 'en';

export const i18nextConfig: InitOptions = {
  resources,
  debug: __DEV__,
  lng: defaultLang,
  fallbackLng: fallbackLang,
  ns: namespaces,
  defaultNS: defaultNamespace,
  fallbackNS: defaultNamespace,
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
};
