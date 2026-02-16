import { Footer } from "@/components/Footer";
import { NavBar } from "@/components/NavBar";
import { LocaleHtmlLang } from "@/components/LocaleHtmlLang";
import { StructuredData } from "@/components/StructuredData";
import { personalInfo } from "@/data/personalInfo";
import { defaultLocale, isLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { type Dictionary } from "@/i18n/types";

import type { ReactNode } from "react";

type LocaleLayoutProps = {
    children: ReactNode;
    params: { locale: string } | Promise<{ locale: string }>;
};

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
    const resolvedParams = await Promise.resolve(params);
    const locale = isLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale;
    const dictionary: Dictionary = getDictionary(locale);

    return (
        <>
            <LocaleHtmlLang locale={locale} />
            <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-[200] bg-cyan-500 text-black px-4 py-2 rounded-full font-bold"
            >
                {dictionary.ui.skipToContent}
            </a>
            <NavBar locale={locale} dictionary={dictionary.nav} />
            <StructuredData
                locale={locale}
                name={personalInfo.name}
                role={dictionary.personal.role}
                bio={dictionary.personal.bio}
                email={personalInfo.email}
                sameAs={personalInfo.sameAs}
            />
            <main id="main-content" tabIndex={-1}>
                {children}
            </main>
            <Footer dictionary={dictionary.footer} />
        </>
    );
}
