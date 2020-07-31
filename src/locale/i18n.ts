import i18n from 'i18next';
import {initReactI18next} from 'react-i18next';
import {i18nextConfig} from '@fos/config';

i18n.use(initReactI18next).init(i18nextConfig);

export default i18n;
