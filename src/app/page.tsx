"use client";

import { useEffect } from "react";

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
        <main className="min-h-screen grid place-items-center bg-[#050505] overflow-hidden">
            <style jsx>{`
                @keyframes spin-slow {
                    from { transform: translate(-50%, -50%) rotate(0deg); }
                    to { transform: translate(-50%, -50%) rotate(360deg); }
                }
                @keyframes spin-reverse {
                    from { transform: translate(-50%, -50%) rotate(360deg); }
                    to { transform: translate(-50%, -50%) rotate(0deg); }
                }
                @keyframes pulse-glow {
                    0%, 100% {
                        box-shadow: 0 0 20px rgba(6, 182, 212, 0.4), 0 0 40px rgba(6, 182, 212, 0.2);
                        transform: translate(-50%, -50%) scale(1);
                    }
                    50% {
                        box-shadow: 0 0 30px rgba(6, 182, 212, 0.6), 0 0 60px rgba(6, 182, 212, 0.3);
                        transform: translate(-50%, -50%) scale(1.05);
                    }
                }
                .orbit-outer {
                    animation: spin-slow 8s linear infinite;
                }
                .orbit-inner {
                    animation: spin-reverse 5s linear infinite;
                }
                .core-pulse {
                    animation: pulse-glow 2s ease-in-out infinite;
                }
            `}</style>

            <div className="relative w-48 h-48" aria-label="Loading">
                {/* Outer orbit ring */}
                <div
                    className="orbit-outer absolute left-1/2 top-1/2 w-48 h-48 rounded-full border border-cyan-500/30"
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    {/* Orbit dots */}
                    <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-500/60" />
                    <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2 h-2 rounded-full bg-purple-400/80 shadow-[0_0_8px_rgba(168,85,247,0.6)]" />
                </div>

                {/* Inner orbit ring */}
                <div
                    className="orbit-inner absolute left-1/2 top-1/2 w-28 h-28 rounded-full border border-purple-500/40"
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />
                    <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-cyan-400/70" />
                </div>

                {/* Central core with favicon */}
                <div
                    className="core-pulse absolute left-1/2 top-1/2 w-16 h-16 rounded-full bg-[#050505] border-2 border-cyan-500/50 flex items-center justify-center"
                    style={{ transform: "translate(-50%, -50%)" }}
                >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 to-purple-500/20" />
                    <img src="/favicon-32x32.png" alt="" className="relative z-10 w-8 h-8" />
                </div>

                {/* Dashed background rings */}
                <div
                    className="absolute left-1/2 top-1/2 w-36 h-36 rounded-full border border-dashed border-white/5"
                    style={{ transform: "translate(-50%, -50%)" }}
                />
            </div>

            {/* Loading text */}
            <p className="absolute bottom-1/3 text-xs font-space uppercase tracking-[0.3em] text-cyan-400/60">
                Initializing
            </p>
        </main>
    );
}
