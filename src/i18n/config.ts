export const locales = ["en", "cs"] as const;

export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "en";

export const localeCookieName = "portfolio-locale";
export const localeHeaderName = "x-portfolio-locale";

export const isLocale = (value: string | null | undefined): value is Locale => {
  return value === "en" || value === "cs";
};

const parseAcceptLanguage = (acceptLanguage: string | null | undefined) => {
  if (!acceptLanguage) {
    return [];
  }

  return acceptLanguage
    .split(",")
    .map((rawPart) => {
      const [languagePart, qPart] = rawPart.split(";").map((part) => part.trim());
      const normalized = languagePart.toLowerCase();
      const quality = qPart && qPart.startsWith("q=")
        ? Number.parseFloat(qPart.slice(2))
        : 1;
      return {
        locale: normalized,
        quality: Number.isFinite(quality) ? quality : 1,
      };
    })
    .sort((a, b) => b.quality - a.quality);
};

export const localeFromAcceptLanguage = (acceptLanguage: string | null | undefined): Locale | undefined => {
  for (const candidate of parseAcceptLanguage(acceptLanguage)) {
    if (candidate.locale.startsWith("cs")) {
      return "cs";
    }
    if (candidate.locale.startsWith("en")) {
      return "en";
    }
  }

  return undefined;
};

export const localeFromCountry = (country: string | null | undefined): Locale | undefined => {
  if (!country) {
    return undefined;
  }

  if (country.toUpperCase() === "CZ" || country.toUpperCase() === "SK") {
    return "cs";
  }

  return undefined;
};

export const resolveLocale = (input: {
  cookieLocale?: string | null;
  acceptLanguage?: string | null;
  country?: string | null | undefined;
}): Locale => {
  if (isLocale(input.cookieLocale)) {
    return input.cookieLocale;
  }

  return localeFromAcceptLanguage(input.acceptLanguage) || localeFromCountry(input.country) || defaultLocale;
};
