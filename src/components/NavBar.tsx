"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { isLocale, type Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/types";

type NavBarProps = {
    locale: Locale;
    dictionary: Dictionary["nav"];
};

export function NavBar({ locale, dictionary }: NavBarProps) {
    const [scrolled, setScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const reduceMotion = useReducedMotion();

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const animateScrollTo = (targetY: number) => {
        if (reduceMotion) {
            window.scrollTo({ top: targetY, behavior: "auto" });
            return;
        }

        window.scrollTo({ top: targetY, behavior: "smooth" });
    };

    const getSectionTitleOffsetTop = (id: string, targetId?: string) => {
        if (id === "top") {
            return 0;
        }
        const section = document.getElementById(id);
        if (!section) {
            return null;
        }

        if (targetId) {
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                const navOffset = 88;
                return targetElement.getBoundingClientRect().top + window.scrollY - navOffset;
            }
        }

        const heading = section.querySelector("h2");
        const target = heading || section;
        const navOffset = 88;

        return target.getBoundingClientRect().top + window.scrollY - navOffset;
    };

    const scrollTo = (id: string, targetId?: string) => {
        setIsMenuOpen(false);
        const targetY = getSectionTitleOffsetTop(id, targetId);
        if (targetY === null) {
            return;
        }
        animateScrollTo(targetY);
    };

    const switchLanguage = (nextLocale: Locale) => {
        window.localStorage.setItem("portfolio-locale", nextLocale);
        const pathname = window.location.pathname.replace(/^\/(en|cs)(\/|$)/, "/");
        const normalizedPath = pathname === "/" ? "" : pathname;
        const nextPath = `/${nextLocale}${normalizedPath}`;
        window.location.assign(`${nextPath}${window.location.search}${window.location.hash}`);
    };

    const navLinks = [
        { id: "top", label: dictionary.about, prefix: "01" },
        { id: "experience", label: dictionary.experience, prefix: "02" },
        { id: "projects", label: dictionary.projectLog, prefix: "03" },
        { id: "tools", label: dictionary.tools, prefix: "04" },
        { id: "contact", label: dictionary.contact, prefix: "05", targetId: "contact-open-opportunities" },
    ];

    return (
        <>
            <motion.nav
                initial={reduceMotion ? false : { y: -100 }}
                animate={reduceMotion ? false : { y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className={`fixed top-0 left-0 right-0 z-[110] transition-all duration-500 ${scrolled || isMenuOpen
                    ? "bg-black/80 backdrop-blur-2xl border-b border-cyan-500/20 shadow-[0_4px_20px_rgba(6,182,212,0.1)]"
                    : "bg-transparent py-4 border-transparent"
                    }`}
            >
                <div className="w-full lg:max-w-[95%] lg:mx-auto px-4 md:px-12 h-14 md:h-16 flex items-center justify-between">
                    <Link
                        href={`/${locale}`}
                        className="group flex items-center gap-2 cursor-pointer"
                        onClick={() => setIsMenuOpen(false)}
                        aria-label="Home - River Core Portfolio"
                    >
                        <div aria-hidden="true" className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                        <span className="text-xl md:text-2xl font-space font-black tracking-tighter text-white uppercase group-hover:text-cyan-400 transition-colors duration-300">
                            RIVER<span className="text-purple-500">{"//"}</span>CORE
                        </span>
                    </Link>

                    <div className="hidden lg:flex gap-10 items-center">
                        {navLinks.map((item) => (
                            <button
                                type="button"
                                key={item.id}
                                onClick={() => scrollTo(item.id, item.targetId)}
                                className="group flex flex-col items-start gap-0.5 cursor-pointer"
                                aria-label={`Scroll to ${item.label}`}
                            >
                                <span className="text-[10px] font-space font-bold text-purple-500/60 transition-colors group-hover:text-purple-400">
                                    {item.prefix}
                                </span>
                                <span className="text-xs md:text-sm font-space font-bold uppercase tracking-widest text-white/70 transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-1">
                                    {item.label}
                                </span>
                                <div className="h-0.5 w-0 bg-cyan-500 transition-all duration-300 group-hover:w-full group-hover:shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
                            </button>
                        ))}
                        <div className="flex items-center gap-3 border-l border-white/10 pl-3 ml-4">
                            {dictionary.languageOptions.map((option) => (
                                <button
                                    key={option.code}
                                    type="button"
                                    onClick={() => switchLanguage(option.code as Locale)}
                                    className={`text-[10px] md:text-xs font-space font-bold uppercase tracking-[0.2em] transition-colors ${isLocale(option.code)
                                        ? option.code === locale
                                            ? "text-cyan-300"
                                            : "text-white/50 hover:text-cyan-300"
                                        : "text-white/50 hover:text-cyan-300"
                                        }`}
                                    aria-label={`${dictionary.languageButtonLabel}: ${option.label}`}
                                >
                                    {option.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="button"
                        className="lg:hidden p-2 text-white/70 hover:text-cyan-400 transition-colors cursor-pointer"
                        onClick={() => setIsMenuOpen((isCurrentlyOpen) => !isCurrentlyOpen)}
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        aria-expanded={isMenuOpen}
                        aria-controls="mobile-nav"
                    >
                        {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </motion.nav>

        <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        id="mobile-nav"
                        {...(reduceMotion
                            ? {}
                            : {
                                  initial: { opacity: 0, y: -20 },
                                  animate: { opacity: 1, y: 0 },
                                  exit: { opacity: 0, y: -20 },
                              })}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-[105] bg-black/95 backdrop-blur-3xl pt-24 px-8 lg:hidden"
                    >
                        <div className="flex flex-col gap-8">
                            {navLinks.map((item) => (
                                <button
                                    type="button"
                                    key={item.id}
                                    onClick={() => scrollTo(item.id, item.targetId)}
                                    className="group flex flex-col items-start gap-1 text-left cursor-pointer"
                                    aria-label={`Scroll to ${item.label}`}
                                >
                                    <span className="text-xs font-space font-bold text-purple-500/80">
                                        {item.prefix} {dictionary.systemLinkSuffix}
                                    </span>
                                    <span className="text-3xl font-space font-black uppercase tracking-tighter text-white transition-all duration-300 group-hover:text-cyan-400 group-hover:translate-x-2">
                                        {item.label}
                                    </span>
                                </button>
                            ))}

                            <div className="mt-10 pt-8 border-t border-white/10 flex items-center gap-4">
                                {dictionary.languageOptions.map((option) => (
                                    <button
                                        key={option.code}
                                        type="button"
                                        onClick={() => switchLanguage(option.code as Locale)}
                                        className={`text-2xl font-space font-black uppercase tracking-[0.18em] transition-colors ${isLocale(option.code)
                                            ? option.code === locale
                                                ? "text-cyan-300"
                                                : "text-white/45 hover:text-cyan-300"
                                            : "text-white/45 hover:text-cyan-300"
                                            }`}
                                        aria-label={`${dictionary.languageButtonLabel}: ${option.label}`}
                                    >
                                        {option.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
