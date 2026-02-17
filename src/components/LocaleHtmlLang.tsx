// Client-side-only locale sync for the document element.
"use client";

import { useEffect } from "react";

type LocaleHtmlLangProps = {
  locale: string;
};

export function LocaleHtmlLang({ locale }: LocaleHtmlLangProps) {
  useEffect(() => {
    if (locale) {
      document.documentElement.setAttribute("lang", locale);
    }
  }, [locale]);

  return null;
}
