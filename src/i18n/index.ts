import { en } from './en';
import { es } from './es';

export const locales = ['en', 'es'] as const;

export type Locale = (typeof locales)[number];

export const dictionaries = {
  en,
  es,
} satisfies Record<Locale, typeof en>;

export const alternateLocales = {
  en: 'es',
  es: 'en',
} satisfies Record<Locale, Locale>;

export function getDictionary(locale: Locale) {
  return dictionaries[locale];
}
