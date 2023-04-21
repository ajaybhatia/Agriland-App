import ar from '@/translations/ar.json';
import en from '@/translations/en.json';
import urIN from '@/translations/ur.json';

export const resources = {
  en: {
    translation: en,
  },
  ar: {
    translation: ar,
  },
  urIN: {
    translation: urIN,
  },
};

export type Language = keyof typeof resources;
