import type { Locale } from './index';

export const localizedRoutes = {
  home: {
    en: '/',
    es: '/es/',
  },
} satisfies Record<string, Record<Locale, string>>;

export type RouteName = keyof typeof localizedRoutes;

export function getLocalizedRoute(route: RouteName, locale: Locale): string {
  return localizedRoutes[route][locale];
}
