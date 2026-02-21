 "use client";

import { useEffect, type CSSProperties } from "react";

import Link from "next/link";

import { defaultLocale, isLocale, localeFromAcceptLanguage } from "@/i18n/config";

const preserveLanguage = (localeCandidate?: string | null): string => {
    if (isLocale(localeCandidate)) {
        return localeCandidate;
    }

    const browserLocale = localeFromAcceptLanguage(
        typeof navigator !== "undefined" ? navigator.language : null
    );

    return isLocale(browserLocale) ? browserLocale : defaultLocale;
};

export default function Home() {
    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }

        const storedLocale = window.localStorage.getItem("portfolio-locale");
        const locale = preserveLanguage(storedLocale);

        if (window.location.pathname !== `/${locale}`) {
            window.location.replace(`/${locale}`);
        }
    }, []);

    return (
        <main
            style={
                {
                    minHeight: "100vh",
                    display: "grid",
                    placeItems: "center",
                    backgroundColor: "#050505",
                } as CSSProperties
            }
            aria-label="Locale redirect"
        >
            <p className="text-base text-white/75">
                Redirecting to <Link href={`/${defaultLocale}`} className="underline">English</Link> or{" "}
                <Link href="/cs" className="underline">Czech</Link> version...
            </p>
        </main>
    );
}
