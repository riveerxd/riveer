"use client";

import { motion } from "framer-motion";
import type { Dictionary } from "@/i18n/types";

type FooterProps = {
    dictionary: Dictionary["footer"];
};

export function Footer({ dictionary }: FooterProps) {
    return (
        <footer className="relative w-full overflow-hidden bg-[#050505] pt-16 pb-4 md:pt-32 md:pb-8 px-6 md:px-12">
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

            <div className="max-w-[1400px] mx-auto">
                <div className="flex flex-col items-center justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                        className="relative w-full flex flex-col items-center"
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[30vw] bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none" />

                        <h2 className="text-[9vw] sm:text-[9vw] lg:text-[7vw] xl:text-[6vw] font-space font-black tracking-tighter text-white/20 uppercase leading-[0.8] select-none flex items-center justify-center gap-[2vw] text-center whitespace-nowrap transition-colors duration-500 hover:text-white/40">
                            <span className="relative inline-block">RIVER</span>
                            <span className="text-purple-500/50 inline-block">{"//"}</span>
                            <span className="inline-block">EOF</span>
                        </h2>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 1.5, delay: 0.5, ease: "circOut" }}
                            className="h-1 lg:h-2 w-[80vw] bg-gradient-to-r from-transparent via-cyan-500 to-transparent mt-8 shadow-[0_0_30px_rgba(6,182,212,0.5)]"
                        />
                    </motion.div>

                    <div className="mt-24 w-full flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
                        <div className="flex flex-col items-center md:items-start gap-2">
                            <span className="text-xs sm:text-sm font-space font-bold text-white/20 uppercase tracking-[0.4em]">
                                {dictionary.protocolLabel}
                            </span>
                            <div className="flex items-center gap-4">
                                <span className="text-cyan-400/80 font-space font-bold uppercase text-xs tracking-widest animate-pulse">
                                    {dictionary.connectionLabel}
                                </span>
                                <div className="h-1 w-8 bg-white/10" />
                                <span className="text-white/40 font-mono text-xs sm:text-sm">{dictionary.statusCode}</span>
                            </div>
                        </div>

                        <div className="flex flex-col items-center md:items-end gap-2">
                            <span className="text-xs sm:text-sm font-space font-bold text-white/20 uppercase tracking-[0.4em]">
                                {dictionary.entityLabel}
                            </span>
                            <span className="text-white/60 font-space font-bold uppercase text-xs tracking-widest">
                                {dictionary.registryLabel} {new Date().getFullYear()} {dictionary.registrySuffix}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-[30vh] bg-gradient-to-t from-cyan-500/5 to-transparent pointer-events-none" />
        </footer>
    );
}
