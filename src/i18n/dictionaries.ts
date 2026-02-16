import { defaultLocale, type Locale } from "./config";
import { enDictionary } from "./en";
import { csDictionary } from "./cs";
import type { Dictionary } from "./types";

const dictionaries: Record<Locale, Dictionary> = {
    en: enDictionary,
    cs: csDictionary,
};

export const getDictionary = (locale: Locale): Dictionary => {
    return dictionaries[locale] ?? dictionaries[defaultLocale];
};
