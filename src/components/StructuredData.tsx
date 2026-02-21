import { type Locale } from "@/i18n/config";

type StructuredDataProps = {
    locale: Locale;
    name: string;
    role: string;
    bio: string;
    email: string;
    sameAs?: string[];
};

export function StructuredData({ locale, name, role, bio, email, sameAs = [] }: StructuredDataProps) {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Person",
        name,
        url: "https://www.riveer.cz",
        email,
        jobTitle: role,
        description: bio,
        inLanguage: locale === "cs" ? "cs-CZ" : "en-US",
        sameAs,
    };

    const websiteData = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        name: `${name} Portfolio`,
        url: "https://www.riveer.cz",
        inLanguage: locale === "cs" ? "cs-CZ" : "en-US",
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteData) }}
            />
        </>
    );
}
