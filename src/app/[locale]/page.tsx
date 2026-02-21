import type { Metadata } from "next";

import { personalInfo } from "@/data/personalInfo";
import { locales, defaultLocale, isLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import type { Dictionary } from "@/i18n/types";
import { HomePage } from "@/components/HomePage";

type LocalePageProps = {
    params: { locale: string } | Promise<{ locale: string }>;
};

export function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
}

const resolveLocale = async (params: LocalePageProps["params"]): Promise<Locale> => {
    const resolvedParams = await Promise.resolve(params);
    return isLocale(resolvedParams.locale) ? resolvedParams.locale : defaultLocale;
};

export async function generateMetadata({ params }: LocalePageProps): Promise<Metadata> {
    const locale = await resolveLocale(params);
    const dictionary: Dictionary = getDictionary(locale);

    return {
        title: {
            default: dictionary.metadata.defaultTitle,
            template: dictionary.metadata.titleTemplate,
        },
        description: dictionary.metadata.description,
        keywords: dictionary.metadata.keywords,
        authors: [{ name: personalInfo.name }],
        creator: personalInfo.name,
        openGraph: {
            type: "website",
            locale: dictionary.metadata.openGraphLocale,
            url: `https://www.riveer.cz/${locale}`,
            title: dictionary.metadata.ogTitle,
            description: dictionary.metadata.ogDescription,
            siteName: dictionary.metadata.siteName,
            images: [
                {
                    url: "/og-image.webp",
                    width: 1200,
                    height: 630,
                    alt: dictionary.metadata.ogImageAlt,
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: dictionary.metadata.twitterTitle,
            description: dictionary.metadata.twitterDescription,
            images: ["/og-image.webp"],
        },
        alternates: {
            canonical: `https://www.riveer.cz/${locale}`,
            languages: {
                en: "https://www.riveer.cz/en",
                cs: "https://www.riveer.cz/cs",
                "x-default": "https://www.riveer.cz/en",
            },
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },
    };
}

export default async function HomeRoute({ params }: LocalePageProps) {
    const locale = await resolveLocale(params);
    const dictionary: Dictionary = getDictionary(locale);

    return <HomePage dictionary={dictionary} />;
}
