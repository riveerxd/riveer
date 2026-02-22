"use client";

import { motion, Variants, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { Award, Briefcase, Terminal, ArrowDown, ArrowUpRight, Copy, Check } from "lucide-react";
import Image from "next/image";

import { ProjectCard } from "@/components/ProjectCard";
import { TechOrbit } from "@/components/TechOrbit";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { personalInfo } from "@/data/personalInfo";
import type { Dictionary } from "@/i18n/types";

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const heroStagger: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.25 },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
};

const heroRevealItem: Variants = {
  hidden: { opacity: 0, y: 40, scale: 0.96, rotateX: 8, filter: "blur(8px)" },
  show: {
    transition: {
      duration: 0.95,
      ease: "easeOut",
      type: "spring",
      stiffness: 100,
      damping: 18,
    },
    opacity: 1,
    y: 0,
    scale: 1,
    rotateX: 0,
    filter: "blur(0px)",
  },
};

const monthLookup: Record<string, number> = {
  Jan: 0,
  Feb: 1,
  Mar: 2,
  Apr: 3,
  May: 4,
  Jun: 5,
  Jul: 6,
  Aug: 7,
  Sep: 8,
  Oct: 9,
  Nov: 10,
  Dec: 11,
};

const parseMonthYear = (value: string) => {
  const parts = value.trim().replace(/,/g, "").split(" ");
  if (parts.length < 2) {
    return Number.NEGATIVE_INFINITY;
  }

  const month = monthLookup[parts[0]];
  const year = Number(parts[1]);
  if (!Number.isInteger(month) || Number.isNaN(year)) {
    return Number.NEGATIVE_INFINITY;
  }

  return new Date(year, month, 1).getTime();
};

const parsePeriodForSort = (period: string) => {
  const [startDateText, endDateText] = period.split("—").map((part) => part.trim());
  const hasPresent = endDateText?.toLowerCase().includes("present");

  if (hasPresent) {
    return Date.now();
  }

  if (endDateText && !hasPresent) {
    return parseMonthYear(endDateText);
  }

  if (startDateText) {
    return parseMonthYear(startDateText);
  }

  return Number.NEGATIVE_INFINITY;
};

type HomePageProps = {
  dictionary: Dictionary;
};

export function HomePage({ dictionary }: HomePageProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [showScrollCue, setShowScrollCue] = useState(true);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    const handleScroll = () => {
      const shouldShow = window.scrollY < 220;
      setShowScrollCue((prev) => (prev === shouldShow ? prev : shouldShow));
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("resize", checkMobile);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const workExperiences = experiences
    .filter((exp) => exp.type === "work")
    .slice()
    .sort((a, b) => parsePeriodForSort(b.period) - parsePeriodForSort(a.period));

  const certificationList = experiences
    .filter((exp) => exp.type === "certification")
    .slice()
    .sort((a, b) => parsePeriodForSort(b.period) - parsePeriodForSort(a.period));

  const getRole = (id: string, fallback: string) => dictionary.data.experienceRoles[id] || fallback;
  const getDescription = (id: string, fallback: string) =>
    dictionary.data.experienceDescriptions[id] || fallback;
  const getProjectTitle = (id: string, fallback: string) => dictionary.data.projects[id] || fallback;
  const getProjectDescription = (id: string, fallback = "") =>
    dictionary.data.projectDescriptions[id] || fallback;
  const socialCards = [
    {
      key: "email",
      title: dictionary.contactPanel.emailTitle,
      value: personalInfo.email,
      href: `mailto:${personalInfo.email}`,
      icon: "/icons/social/mail.svg",
      tone: "cyan" as const,
    },
    {
      key: "linkedin",
      title: dictionary.contactPanel.linkedinTitle,
      value: personalInfo.linkedinUrl,
      href: personalInfo.linkedinUrl,
      icon: "/icons/social/linkedin.svg",
      tone: "violet" as const,
    },
    {
      key: "github",
      title: dictionary.contactPanel.githubTitle,
      value: personalInfo.githubUrl,
      href: personalInfo.githubUrl,
      icon: "/icons/social/github.svg",
      tone: "hybrid" as const,
    },
  ];

  const easeInOutQuad = (t: number) =>
    t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

  const animateScrollTo = (targetY: number, duration = 1400) => {
    if (reducedMotion) {
      window.scrollTo({ top: targetY, behavior: "auto" });
      return;
    }

    const startY = window.scrollY;
    const distance = targetY - startY;
    if (distance === 0) {
      return;
    }

    const startTime = performance.now();

    const step = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeInOutQuad(progress);
      window.scrollTo({ top: startY + distance * eased, behavior: "auto" });

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
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

  const scrollToSection = (id: string, targetId?: string) => {
    const targetY = getSectionTitleOffsetTop(id, targetId);
    if (targetY === null) {
      return;
    }
    animateScrollTo(targetY);
  };

  const getContactValueLabel = (value: string, fallback: string) => {
    if (!value) {
      return fallback;
    }

    return value.replace(/^https?:\/\//, "").replace(/\/$/, "");
  };

  const copyEmailToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopiedEmail(true);
      window.setTimeout(() => setCopiedEmail(false), 1800);
    } catch {
      setCopiedEmail(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] relative overflow-hidden font-jetbrains text-cyan-50 selection:bg-cyan-900/50">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <motion.div
          animate={{
            x: ["0%", "20%", "-20%", "0%"],
            y: ["0%", "30%", "-10%", "0%"],
          }}
          transition={{ duration: 20, ease: "linear", repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-[40vw] h-[40vw] rounded-full bg-cyan-900/20 blur-[120px] mix-blend-screen"
        />
        <motion.div
          animate={{
            x: ["0%", "-30%", "10%", "0%"],
            y: ["0%", "-20%", "20%", "0%"],
          }}
          transition={{ duration: 25, ease: "linear", repeat: Infinity }}
          className="absolute bottom-1/4 right-1/4 w-[50vw] h-[50vw] rounded-full bg-purple-900/10 blur-[150px] mix-blend-screen"
        />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_40%,transparent_100%)] opacity-20" />
      </div>

      <section className="relative z-10 max-w-[95%] mx-auto p-6 md:p-12">
        <motion.section
          id="about"
          aria-labelledby="about-heading"
          variants={heroStagger}
          initial="hidden"
          animate="show"
          className="mt-20 md:mt-48 flex flex-col items-center justify-center gap-5 md:gap-8 text-center"
        >
          <motion.div
            variants={heroRevealItem}
            className="flex items-center gap-2 md:gap-3 px-4 md:px-6 py-2 rounded-full border border-purple-500/30 bg-purple-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(168,85,247,0.15)]"
          >
            <Terminal size={14} className="text-purple-400 hidden sm:block" aria-hidden="true" />
            <span className="text-xs sm:text-sm md:text-sm uppercase tracking-[0.18em] sm:tracking-[0.22em] md:tracking-[0.3em] font-bold text-purple-300">
              <span className="hidden sm:inline">{dictionary.ui.currentRolePrefix}</span>
              {dictionary.personal.role}
            </span>
          </motion.div>

          <motion.h1
            id="about-heading"
            variants={heroRevealItem}
            className="text-5xl sm:text-6xl md:text-8xl lg:text-[7.5rem] font-space font-black tracking-tighter leading-[0.95] text-white uppercase overflow-visible"
          >
            {dictionary.headings.heroLine1} <br />
            <span className="inline-block pr-2 text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-cyan-500 to-purple-600 [text-shadow:0_0_80px_rgba(6,182,212,0.5)]">
              {dictionary.headings.heroLine2}
            </span>
          </motion.h1>

          <motion.p
            variants={heroRevealItem}
            className="text-sm sm:text-lg md:text-2xl text-cyan-100/60 max-w-3xl leading-relaxed mt-2 md:mt-4 font-light px-2"
          >
            {dictionary.personal.bio}
          </motion.p>

            <motion.div variants={heroRevealItem} className="flex flex-row items-center gap-3 sm:gap-6 mt-4 md:mt-8">
            <button
              type="button"
              onClick={() => scrollToSection("projects")}
              className="px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-cyan-500 text-black font-space font-bold uppercase text-xs sm:text-sm tracking-wider sm:tracking-widest hover:bg-cyan-400 hover:shadow-[0_0_40px_rgba(6,182,212,0.6)] hover:scale-105 transition-all duration-300 cursor-pointer"
              aria-label={`Scroll to ${dictionary.nav.projectLog} section`}
            >
              {dictionary.buttons.projects}
            </button>
            <button
              type="button"
              onClick={() => scrollToSection("contact", "contact-open-opportunities")}
              className="px-5 py-3 sm:px-8 sm:py-4 rounded-full border border-purple-500/50 text-purple-400 font-space font-bold uppercase text-xs sm:text-sm tracking-wider sm:tracking-widest hover:bg-purple-500/10 hover:shadow-[0_0_30px_rgba(168,85,247,0.3)] transition-all duration-300 cursor-pointer"
              aria-label={`Scroll to ${dictionary.sections.contact} section`}
            >
              {dictionary.buttons.contact}
            </button>
          </motion.div>

          <motion.div variants={heroRevealItem} className="mt-2 flex flex-col items-center gap-2">
            <motion.button
              type="button"
              onClick={() => scrollToSection("experience")}
              animate={{ opacity: showScrollCue ? 1 : 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              style={{ pointerEvents: showScrollCue ? "auto" : "none" }}
              className="inline-flex flex-col items-center gap-2 text-cyan-200/80 hover:text-cyan-100 transition-colors duration-300"
              aria-label="Scroll to Experience section"
            >
              <span className="text-xs sm:text-sm uppercase tracking-[0.28em] font-medium font-space">
                {dictionary.ui.scrollHint}
              </span>
              <span className="h-10 w-6 rounded-full border border-cyan-500/40 bg-cyan-500/5 flex items-start justify-center pt-1.5 backdrop-blur-sm">
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.35, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowDown size={15} className="text-cyan-300" aria-hidden="true" />
                </motion.span>
              </span>
            </motion.button>
          </motion.div>
        </motion.section>

        <motion.section
          id="experience"
          aria-labelledby="experience-heading"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-8 scroll-mt-32"
        >
          <div>
            <motion.div variants={fadeUp} className="mb-12 flex items-center gap-4">
              <h2 id="experience-heading" className="text-2xl font-space font-bold uppercase tracking-widest text-white/90">
                {dictionary.sections.workExperience}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
            </motion.div>

            <div className="relative border-l border-cyan-900/50 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-16">
              {workExperiences.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="relative group pr-4"
                >
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-cyan-950 border-2 border-cyan-500 shadow-[0_0_15px_rgba(6,182,212,0.6)] group-hover:scale-125 group-hover:bg-cyan-400 transition-all duration-300" />

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-cyan-400">
                      <Briefcase size={18} className="text-cyan-400" aria-hidden="true" />
                      <span className="text-sm font-space font-bold tracking-widest uppercase">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-100 transition-colors">
                      {getRole(exp.id, exp.role)}
                    </h3>
                    <h4 className="text-lg text-purple-400/80 font-medium">
                      {exp.company}
                    </h4>
                    <p className="text-cyan-100/60 leading-relaxed max-w-2xl mt-2">
                      {getDescription(exp.id, exp.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <motion.div variants={fadeUp} className="mb-12 flex items-center gap-4">
              <h2 className="text-2xl font-space font-bold uppercase tracking-widest text-white/90">
                {dictionary.sections.certifications}
              </h2>
              <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
            </motion.div>

            <div className="relative border-l border-cyan-900/50 pl-6 sm:pl-8 ml-2 sm:ml-4 space-y-16">
              {certificationList.map((exp) => (
                <motion.div
                  key={exp.id}
                  variants={fadeUp}
                  className="relative group pr-4"
                >
                  <div className="absolute -left-[33px] sm:-left-[41px] top-1 w-5 h-5 rounded-full bg-purple-950 border-2 border-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.6)] group-hover:scale-125 group-hover:bg-purple-400 transition-all duration-300" />

                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 text-purple-400">
                      <Award size={18} className="text-purple-400" aria-hidden="true" />
                      <span className="text-sm font-space font-bold tracking-widest uppercase">
                        {exp.period}
                      </span>
                    </div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-purple-100 transition-colors">
                      {getRole(exp.id, exp.role)}
                    </h3>
                    <h4 className="text-lg text-cyan-400/80 font-medium">
                      {exp.company}
                    </h4>
                    <p className="text-cyan-100/60 leading-relaxed max-w-2xl mt-2">
                      {getDescription(exp.id, exp.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        <motion.section
          id="projects"
          aria-labelledby="projects-heading"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 scroll-mt-32"
        >
          <motion.div variants={fadeUp} className="mb-12 flex items-center gap-4">
            <h2 id="projects-heading" className="text-2xl font-space font-bold uppercase tracking-widest text-white/90">
              {dictionary.sections.projectLog}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-cyan-500/30 to-transparent" />
          </motion.div>

          <div className="flex flex-col gap-24 mt-16">
            {projects.map((project, idx) => {
              const slideVariant = {
                offscreen: {
                  opacity: 0,
                  x: isMobile ? 0 : (idx % 2 === 0 ? -100 : 100),
                  y: 50,
                },
                onscreen: {
                  opacity: 1,
                  x: isMobile ? 0 : (idx % 2 === 0 ? -1 : 1),
                  y: 0,
                  transition: { duration: 0.8 },
                },
              };
              const railAlignClass =
                idx % 2 === 0
                  ? "md:mr-auto md:ml-0"
                  : "md:ml-auto md:mr-0";
              const localizedProject = {
                ...project,
                title: getProjectTitle(project.id, project.title),
                description: getProjectDescription(project.id, project.description),
              };
              return (
                <div key={project.id} className={`w-full ${railAlignClass} max-w-5xl`}>
                  <ProjectCard
                    project={localizedProject}
                    idx={idx}
                    itemVariants={slideVariant}
                    variant="cyberpunk"
                    visitLabel={dictionary.buttons.visitSite}
                  />
                </div>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          id="tools"
          aria-labelledby="tools-heading"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 pb-20 scroll-mt-32"
        >
          <motion.div variants={fadeUp} className="mb-12 flex items-center gap-4">
            <h2 id="tools-heading" className="text-2xl font-space font-bold uppercase tracking-widest text-white/90">
              {dictionary.sections.technicalArsenal}
            </h2>
            <div className="h-px flex-1 bg-gradient-to-r from-purple-500/30 to-transparent" />
          </motion.div>

          <TechOrbit loadedLabel={dictionary.ui.orbitLoadedLabel} />
        </motion.section>

        <motion.section
          id="contact"
          aria-labelledby="contact-heading"
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="mt-32 pb-24 flex flex-col items-center justify-center gap-8 text-center max-w-6xl mx-auto w-full scroll-mt-32"
        >
          <motion.div variants={fadeUp} className="flex items-center gap-3 px-6 py-2.5 rounded-full border border-cyan-500/30 bg-cyan-500/10 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(6,182,212,0.8)]" />
            <span id="contact-open-opportunities" className="text-xs md:text-sm uppercase tracking-[0.3em] font-bold text-cyan-300">
              {dictionary.sections.openForOpportunities}
            </span>
          </motion.div>

          <motion.h2
            id="contact-heading"
            variants={fadeUp}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-[6rem] font-space font-black tracking-tighter leading-[1.05] text-white uppercase"
          >
            {dictionary.headings.contactLine1} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 via-cyan-500 to-purple-600 [text-shadow:0_0_80px_rgba(6,182,212,0.5)]">
              {dictionary.headings.contactLine2}
            </span>
          </motion.h2>

          <motion.div variants={fadeUp} className="relative w-full mt-8 p-1 sm:p-2">
            <div className="pointer-events-none absolute -top-24 -left-24 h-64 w-64 rounded-full bg-cyan-500/20 blur-[110px]" />
            <div className="pointer-events-none absolute -bottom-28 -right-24 h-72 w-72 rounded-full bg-purple-500/18 blur-[120px]" />

            <div className="relative z-10 flex flex-col gap-8">
              <div className="flex flex-wrap items-start justify-center gap-6 md:gap-10">
                {socialCards.map((card, index) => {
                  const isActive = Boolean(card.href);
                  const toneRing =
                    card.tone === "violet"
                      ? "hover:border-purple-300/75 hover:shadow-[0_0_45px_rgba(196,181,253,0.4)]"
                      : card.tone === "hybrid"
                        ? "hover:border-cyan-300/80 hover:shadow-[0_0_45px_rgba(125,211,252,0.35),0_0_55px_rgba(167,139,250,0.28)]"
                        : "hover:border-cyan-300/75 hover:shadow-[0_0_45px_rgba(103,232,249,0.4)]";
                  const toneText =
                    card.tone === "violet"
                      ? "text-purple-200"
                      : card.tone === "hybrid"
                        ? "text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 to-purple-200"
                        : "text-cyan-200";
                  const toneIconShell =
                    card.tone === "violet"
                      ? "border-purple-300/35 bg-purple-400/10"
                      : card.tone === "hybrid"
                        ? "border-cyan-300/35 bg-gradient-to-br from-cyan-400/15 to-purple-500/12"
                        : "border-cyan-300/35 bg-cyan-400/10";
                  const toneInnerRing =
                    card.tone === "violet"
                      ? "border-purple-200/20"
                      : card.tone === "hybrid"
                        ? "border-cyan-200/20"
                        : "border-cyan-200/20";

                  if (!isActive) {
                    return null;
                  }

                  return (
                    <a
                      key={card.key}
                      href={card.href}
                      target={card.key === "email" ? undefined : "_blank"}
                      rel={card.key === "email" ? undefined : "noopener noreferrer"}
                      className="group flex flex-col items-center gap-3"
                      aria-label={`${card.title}: ${getContactValueLabel(card.value, dictionary.contactPanel.unavailable)}`}
                    >
                      <span
                        className={`relative flex h-24 w-24 sm:h-28 sm:w-28 items-center justify-center rounded-full border border-white/30 bg-white/[0.08] backdrop-blur-xl transition-all duration-300 ${toneRing}`}
                      >
                        <span className={`pointer-events-none absolute inset-1 rounded-full border ${toneInnerRing}`} />
                        <span className={`pointer-events-none absolute inset-[22%] rounded-full border ${toneIconShell}`} />
                        <Image
                          src={card.icon}
                          alt={card.title}
                          width={42}
                          height={42}
                          sizes="42px"
                          className="h-9 w-9 sm:h-10 sm:w-10 invert"
                          priority={index < 2}
                        />
                      </span>
                      <span className="text-[11px] font-space font-bold uppercase tracking-[0.2em] text-white/90">
                        {card.title}
                      </span>
                      <span className={`text-[11px] font-space tracking-[0.08em] ${toneText}`}>
                        {getContactValueLabel(card.value, dictionary.contactPanel.unavailable)}
                      </span>
                    </a>
                  );
                })}
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={copyEmailToClipboard}
                  className="inline-flex items-center gap-2 rounded-full border border-cyan-300/35 bg-cyan-500/10 px-4 py-2 text-[10px] font-space font-bold uppercase tracking-[0.14em] text-cyan-200 hover:bg-cyan-500/20 hover:border-cyan-300/60 transition-all duration-300 cursor-pointer"
                >
                  {copiedEmail ? <Check size={14} /> : <Copy size={14} />}
                  {copiedEmail ? dictionary.contactPanel.copied : dictionary.contactPanel.copyEmail}
                </button>
              </div>

              <motion.form
                variants={fadeUp}
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.currentTarget);
                  const subject = formData.get("subject");
                  const message = formData.get("message");
                  window.location.href = `mailto:${personalInfo.email}?subject=${encodeURIComponent(subject as string)}&body=${encodeURIComponent(message as string)}`;
                }}
                className="mx-auto w-full max-w-3xl rounded-[1.5rem] border border-white/12 bg-black/35 p-4 sm:p-5 md:p-6 text-left"
              >
                <div className="grid grid-cols-1 gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2 rounded-xl border border-white/10 bg-white/[0.02] px-3 py-2.5">
                      <p className="text-[10px] font-space font-bold uppercase tracking-[0.2em] text-white/55">
                        {dictionary.contactPanel.formLabel}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="subject" className="text-[10px] font-space font-bold text-cyan-300 tracking-[0.16em] uppercase">
                      {dictionary.form.subjectLabel}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      required
                      placeholder={dictionary.form.subjectPlaceholder}
                      className="w-full rounded-xl border border-white/15 bg-white/[0.04] p-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-cyan-400 focus:bg-white/[0.07] transition-all duration-300"
                    />
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <label htmlFor="message" className="text-[10px] font-space font-bold text-violet-300 tracking-[0.16em] uppercase">
                      {dictionary.form.messageLabel}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder={dictionary.form.messagePlaceholder}
                      className="w-full rounded-xl border border-white/15 bg-white/[0.04] p-3.5 text-white placeholder:text-white/35 focus:outline-none focus:border-violet-400 focus:bg-white/[0.07] transition-all duration-300 resize-none"
                    />
                  </div>

                  <div className="pt-0.5 flex justify-end">
                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-6 py-2.5 w-full sm:w-auto rounded-full bg-cyan-400 text-black font-space font-black uppercase tracking-[0.14em] hover:bg-cyan-300 hover:shadow-[0_0_35px_rgba(6,182,212,0.45)] transition-all duration-300 cursor-pointer"
                    >
                      {dictionary.buttons.contactSubmit}
                      <ArrowUpRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.form>
            </div>
          </motion.div>
        </motion.section>
      </section>
    </div>
  );
}
