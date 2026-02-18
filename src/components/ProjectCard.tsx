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
        const textHover = isEven ? 'group-hover:text-cyan-400' : 'group-hover:text-purple-400';
        const textColor = isEven ? 'text-cyan-400' : 'text-purple-400';
        const bgHover = isEven ? 'hover:bg-cyan-500' : 'hover:bg-purple-500';
        const shadowHover = isEven ? 'hover:shadow-[0_0_30px_rgba(6,182,212,0.3)]' : 'hover:shadow-[0_0_30px_rgba(168,85,247,0.3)]';
        const borderHover = isEven ? 'group-hover:border-cyan-500/50' : 'group-hover:border-purple-500/50';
        const flexDir = isEven ? 'md:flex-row' : 'md:flex-row-reverse';
        const nodePosition = isEven
          ? '-top-2 -left-2 md:-top-3 md:-left-3'
          : '-top-2 -right-2 md:-top-3 md:-right-3';

        const nodeColor = isEven ? 'bg-cyan-950 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:bg-cyan-400' : 'bg-purple-950 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] group-hover:bg-purple-400';

        return (
            <motion.div
                variants={itemVariants}
                initial="offscreen"
                whileInView="onscreen"
                viewport={{ once: true, amount: 0.2 }}
                className={`group relative flex flex-col ${flexDir} gap-6 md:gap-10 items-center w-full max-w-5xl mx-auto p-4 md:p-6 bg-black/80 rounded-2xl border-2 border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.04)] backdrop-blur-xl transition-[box-shadow] duration-300 ${shadowHover}`}
            >
                {/* Glowing node matching experience timeline */}
                <div className={`absolute ${nodePosition} w-4 h-4 md:w-6 md:h-6 rounded-full border-2 ${nodeColor} group-hover:scale-125 transition-all duration-300 z-20`} />

                {/* Native API Screenshot */}
                <div className={`relative w-full md:w-1/2 aspect-video overflow-hidden rounded-xl shadow-inner border border-white/20 ${borderHover} transition-colors duration-300 transform-gpu`}>
                    <Image
                        src={project.image}
                        alt={`Screenshot of ${project.title}`}
                        width={1280}
                        height={720}
                        sizes="(min-width: 768px) 50vw, 100vw"
                        className="w-full h-full object-cover object-top pointer-events-none"
                        loading="lazy"
                    />
                </div>

                {/* Content */}
                <div className="flex flex-col justify-center w-full md:w-1/2 z-10 space-y-4">
                    <div>
                        <div className={`text-xs font-space font-bold ${textColor} tracking-widest uppercase mb-1 transition-colors duration-300`}>
                            0{idx + 1} {"//"} {project.title}
                        </div>
                        <h3 className={`text-3xl lg:text-4xl font-space font-bold text-white ${textHover} tracking-tight transition-colors duration-300 drop-shadow-md`}>
                            {project.title}
                        </h3>
                    </div>

                    <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-none border border-white/20 bg-transparent text-white hover:text-white ${bgHover} transition-all duration-300 w-fit font-bold tracking-widest uppercase text-xs cursor-pointer`}
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
