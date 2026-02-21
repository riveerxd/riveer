"use client";

import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { Project } from "@/data/projects";

interface ProjectCardProps {
    project: Project;
    idx: number;
    itemVariants?: Variants;
    variant?: 'default' | 'cyberpunk';
    visitLabel?: string;
}

export function ProjectCard({ project, idx, itemVariants, variant = 'default', visitLabel = 'Visit Site' }: ProjectCardProps) {
    const isEven = idx % 2 === 0;

    if (variant === 'cyberpunk') {
        const textHover = isEven ? 'group-hover:text-cyan-300' : 'group-hover:text-fuchsia-300';
        const textColor = isEven ? 'text-cyan-300' : 'text-fuchsia-300';
        const cardGlow = isEven ? 'group-hover:shadow-[0_0_80px_rgba(34,211,238,0.18)]' : 'group-hover:shadow-[0_0_80px_rgba(217,70,239,0.18)]';
        const borderHover = isEven ? 'group-hover:border-cyan-400/40' : 'group-hover:border-fuchsia-400/40';
        const flexDir = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
        const domainColor = isEven ? 'border-cyan-400/40 bg-cyan-400/10 text-cyan-200' : 'border-fuchsia-400/40 bg-fuchsia-400/10 text-fuchsia-200';
        const ambientGlow = isEven ? 'from-cyan-400/10 via-cyan-500/5 to-transparent' : 'from-fuchsia-400/10 via-fuchsia-500/5 to-transparent';
        const buttonStyle = isEven
            ? 'border-cyan-300/70 text-cyan-100 hover:bg-cyan-300 hover:text-black hover:shadow-[0_0_30px_rgba(34,211,238,0.45)]'
            : 'border-fuchsia-300/70 text-fuchsia-100 hover:bg-fuchsia-300 hover:text-black hover:shadow-[0_0_30px_rgba(217,70,239,0.45)]';
        const nodePosition = isEven
          ? '-top-2 -left-2 md:-top-3 md:-left-3'
          : '-top-2 -right-2 md:-top-3 md:-right-3';
        const nodeColor = isEven
            ? 'bg-cyan-950 border-cyan-400 shadow-[0_0_18px_rgba(34,211,238,0.75)] group-hover:bg-cyan-300'
            : 'bg-fuchsia-950 border-fuchsia-400 shadow-[0_0_18px_rgba(217,70,239,0.75)] group-hover:bg-fuchsia-300';
        const domainLabel = project.url.replace(/^https?:\/\//, "").replace(/\/$/, "");
        const projectIndex = String(idx + 1).padStart(2, "0");

        return (
            <motion.div
                variants={itemVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative isolate overflow-hidden flex flex-col ${flexDir} gap-6 md:gap-10 items-center w-full max-w-5xl mx-auto p-4 md:p-7 rounded-[28px] border border-white/15 bg-black/70 backdrop-blur-2xl transition-[box-shadow,border-color] duration-500 ${cardGlow}`}
            >
                <div className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${ambientGlow} opacity-70`} />
                <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:2.8rem_2.8rem] opacity-20" />
                <div className="pointer-events-none absolute inset-0 rounded-[28px] border border-white/10" />

                {/* Glowing node matching experience timeline */}
                <div className={`absolute ${nodePosition} w-4 h-4 md:w-6 md:h-6 rounded-full border-2 ${nodeColor} group-hover:scale-125 transition-all duration-300 z-20`} />

                {/* Native API Screenshot */}
                <div className={`relative w-full md:w-1/2 aspect-video overflow-hidden rounded-[22px] border border-white/20 ${borderHover} shadow-[inset_0_0_0_1px_rgba(255,255,255,0.04)] transition-colors duration-500`}>
                    <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        width={1280}
                        height={720}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="w-full h-full object-cover object-top pointer-events-none"
                        loading="lazy"
                    />
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,0.45)_100%)]" />
                    <div className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,rgba(255,255,255,0.04)_0px,rgba(255,255,255,0.04)_1px,transparent_1px,transparent_4px)] opacity-25" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center w-full md:w-1/2 space-y-5">
                    <div className="flex items-center gap-3">
                        <span className={`rounded-full border px-3 py-1 text-[10px] font-space font-bold tracking-[0.22em] uppercase ${domainColor}`}>
                            {projectIndex}
                        </span>
                        <span className={`text-[11px] font-space font-bold ${textColor} tracking-[0.2em] uppercase`}>
                            {domainLabel}
                        </span>
                    </div>

                    <div>
                        <h3 className={`text-3xl lg:text-4xl font-space font-black text-white ${textHover} tracking-tight transition-colors duration-300`}>
                            {project.title}
                        </h3>
                        {project.description ? (
                            <p className="mt-4 text-sm md:text-base leading-relaxed text-zinc-200/80 max-w-prose">
                                {project.description}
                            </p>
                        ) : null}
                    </div>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border bg-black/35 backdrop-blur-md transition-[background-color,color,box-shadow,border-color] duration-300 w-fit font-space font-bold tracking-[0.16em] uppercase text-xs cursor-pointer ${buttonStyle}`}
                        aria-label={`Visit ${project.title} live website`}
                    >
                        {visitLabel} <ArrowUpRight size={16} />
                    </a>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            variants={itemVariants}
            whileHover={{ y: -5, scale: 1.01 }}
            className="group relative p-6 rounded-3xl bg-white/40 dark:bg-black/40 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] backdrop-blur-xl transition-all duration-300 overflow-hidden flex flex-col gap-6"
        >
            {/* Spectral hover effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/0 via-fuchsia-500/0 to-pink-500/0 group-hover:from-indigo-500/5 group-hover:via-fuchsia-500/5 group-hover:to-pink-500/5 transition-all duration-500 pointer-events-none" />

            {/* Native API Screenshot */}
            <div className="relative w-full aspect-[4/3] sm:aspect-[16/10] rounded-xl overflow-hidden bg-black/5 dark:bg-white/5 shadow-inner">
                <Image
                    src={project.image}
                    alt={`Screenshot of ${project.title}`}
                    width={1280}
                    height={720}
                    sizes="(min-width: 640px) 100vw, 100vw"
                    className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none"
                    loading="lazy"
                />
            </div>

            <div className="flex justify-between items-start z-10">
                <div>
                    <div className="text-sm font-medium text-foreground/50 mb-2 tracking-widest uppercase">
                        0{idx + 1}
                    </div>
                    <h3 className="text-2xl font-bold text-foreground group-hover:text-indigo-600 transition-colors">
                        {project.title}
                    </h3>
                    {project.description ? (
                        <p className="mt-3 text-sm leading-relaxed text-foreground/70 max-w-prose">
                            {project.description}
                        </p>
                    ) : null}
                </div>
                <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-foreground/10 text-foreground group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-300 shadow-sm cursor-pointer"
                >
                    <ArrowUpRight size={20} />
                    <span className="sr-only">Visit {project.title}</span>
                </a>
            </div>
        </motion.div>
    );
}
