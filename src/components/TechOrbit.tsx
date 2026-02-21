"use client";

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type TechOrbitProps = {
    loadedLabel?: string;
};

const techStack = [
    { name: "Next.js", iconPath: "/tech-orbit/nextdotjs.svg" },
    { name: "React", iconPath: "/tech-orbit/react.svg" },
    { name: "Vue.js", iconPath: "/tech-orbit/vuedotjs.svg" },
    { name: "Nuxt.js", iconPath: "/tech-orbit/nuxt-js-icon.svg" },
    { name: "Tailwind", iconPath: "/tech-orbit/tailwindcss.svg" },
    { name: "ASP.NET", iconPath: "/tech-orbit/dotnet.svg" },
    { name: "PostgreSQL", iconPath: "/tech-orbit/postgresql-icon.svg" },
];

export function TechOrbit({ loadedLabel = " // LOADED" }: TechOrbitProps) {
    const [isMobile, setIsMobile] = useState(false);
    const [isSectionVisible, setIsSectionVisible] = useState(false);
    const reducedMotion = useReducedMotion();
    const mobileSectionRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const checkMobile = () => {
            const nextIsMobile = window.innerWidth < 1024;
            setIsMobile(nextIsMobile);
            if (!nextIsMobile) {
                setIsSectionVisible(false);
            }
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    useEffect(() => {
        if (!isMobile || reducedMotion) {
            return;
        }

        const node = mobileSectionRef.current;
        if (!node) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsSectionVisible(true);
                    observer.disconnect();
                }
            },
            {
                threshold: 0.15,
                rootMargin: "0px 0px -20% 0px",
            }
        );

        observer.observe(node);

        return () => observer.disconnect();
    }, [isMobile, reducedMotion]);

    if (isMobile) {
        const hasAnimationStarted = reducedMotion || isSectionVisible;

        return (
            <div
                ref={mobileSectionRef}
                className="w-full py-20 px-4"
            >
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {techStack.map((tech, idx) => (
                        <div
                            key={tech.name}
                            style={{
                                opacity: hasAnimationStarted ? 1 : 0,
                                transform: hasAnimationStarted ? "scale(1)" : "scale(0.95)",
                                transition: "opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)",
                                transitionDelay: `${idx * 0.08}s`,
                            }}
                            className="group relative overflow-hidden bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col items-center gap-4 transition-all duration-300 hover:border-cyan-500/50 hover:bg-cyan-500/5 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
                        >
                            <div
                                className="transition-transform duration-500 group-hover:scale-110"
                            >
                                <Image
                                    src={tech.iconPath}
                                    alt={tech.name}
                                    width={40}
                                    height={40}
                                    sizes="40px"
                                    className="w-10 h-10 object-contain"
                                    loading="lazy"
                                />
                            </div>
                            <span className="font-space font-bold uppercase tracking-widest text-xs text-white/70 group-hover:text-white transition-colors">
                                {tech.name}
                            </span>
                            <div className="absolute top-0 right-0 p-2 opacity-20 group-hover:opacity-100 transition-opacity">
                                <div className="w-1 h-1 rounded-full bg-cyan-400 animate-pulse" />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[500px] h-[500px] rounded-full border border-dashed border-cyan-500/10 animate-[spin_60s_linear_infinite]" />
                <div className="absolute w-[350px] h-[350px] rounded-full border border-white/5" />
            </div>

            {/* Central Hub */}
            <motion.div
                {...(reducedMotion
                    ? {}
                    : {
                          initial: { scale: 0, opacity: 0 },
                          whileInView: { scale: 1, opacity: 1 },
                      })}
                className="relative z-10 w-48 h-48 rounded-full bg-[#050505] border-2 border-cyan-500/30 flex items-center justify-center shadow-[0_0_80px_rgba(6,182,212,0.2)]"
            >
                <div className="flex flex-col items-center">
                    <span className="text-xs sm:text-sm font-space font-bold text-cyan-400/60 uppercase tracking-[0.3em] mb-1">Stack_Engine</span>
                    <span className="text-2xl font-space font-black text-white uppercase tracking-tighter">Core</span>
                    <div className="h-0.5 w-12 bg-cyan-500 mt-2 shadow-[0_0_15px_rgba(6,182,212,1)]" />
                </div>
            </motion.div>

            {/* Orbiting Elements */}
            {techStack.map((tech, idx) => {
                const angle = (idx / techStack.length) * 2 * Math.PI;
                const radius = 220;

                return (
                    <motion.div
                        key={tech.name}
                        animate={reducedMotion ? false : { rotate: 360 }}
                        transition={reducedMotion ? undefined : { duration: 25, repeat: Infinity, ease: "linear" }}
                        style={{
                            position: "absolute",
                            width: "440px",
                            height: "440px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            pointerEvents: "none",
                        }}
                    >
                        <motion.div
                            style={{
                                x: radius * Math.cos(angle),
                                y: radius * Math.sin(angle),
                                pointerEvents: "auto",
                            }}
                            animate={reducedMotion ? false : { rotate: -360 }}
                            transition={reducedMotion ? undefined : { duration: 25, repeat: Infinity, ease: "linear" }}
                            className="group relative cursor-pointer"
                        >
                            <div className="relative z-20 w-20 h-20 rounded-2xl bg-black/80 border border-white/10 backdrop-blur-xl flex flex-col items-center justify-center gap-2 group-hover:border-cyan-500/50 group-hover:scale-110 group-hover:bg-cyan-950/20 transition-all duration-300 shadow-[0_10px_30px_rgba(0,0,0,0.5)]">
                                <div className="transition-transform group-hover:rotate-12">
                                <Image
                                    src={tech.iconPath}
                                    alt={tech.name}
                                    width={40}
                                    height={40}
                                        sizes="40px"
                                        className="w-10 h-10 object-contain"
                                        loading="lazy"
                                    />
                                </div>
                                <div className="absolute -bottom-8 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                                    <span className="text-xs sm:text-sm font-space font-bold uppercase tracking-widest text-cyan-400 whitespace-nowrap">
                                        {tech.name}
                                        {loadedLabel}
                                    </span>
                                </div>
                            </div>

                            {/* Connector Line (Stylized) */}
                            <div className="absolute top-1/2 left-1/2 w-32 h-[1px] bg-gradient-to-r from-cyan-500/20 to-transparent origin-left -translate-y-1/2 -z-10 opacity-0 group-hover:opacity-100 transition-all duration-500" style={{ transform: `rotate(${angle + Math.PI}rad)` }} />
                        </motion.div>
                    </motion.div>
                );
            })}
        </div>
    );
}
