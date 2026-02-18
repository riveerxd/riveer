// Added missing type definition for the Experience item
export interface ExperienceItem {
    id: string;
    role: string;
    company: string;
    period: string;
    description: string;
    type: "work" | "certification";
}

export const experiences: ExperienceItem[] = [
    {
        id: "exp-5",
        role: "Freelance Web Developer",
        company: "Self-Employed",
        period: "Feb 2024 — Present",
        description: "Design and build websites and web applications for clients across frontend and backend workflows.",
        type: "work",
    },
    {
        id: "exp-1",
        role: "Software Engineer & Developer",
        company: "Cloudinfrastack",
        period: "Nov 2024 — Present",
        description: "Building web and network applications, with a focus on scalable architectures and software systems that improve performance, reliability, and integration workflows.",
        type: "work",
    },
    {
        id: "exp-2",
        role: "Linux System Administrator",
        company: "Cloudinfrastack",
        period: "Nov 2024 — Sep 2025",
        description: "Monitoring Linux environments, maintaining server health, and supporting infrastructure operations through performance tuning, patch management, and service reliability practices.",
        type: "work",
    },
    {
        id: "exp-3",
        role: "IT Intern",
        company: "VOCALLS",
        period: "May 2025",
        description: "Analyzing client voice conversations and developing AI voicebots to streamline support flows, improve response quality, and automate routine customer interactions.",
        type: "work",
    },
    {
        id: "exp-4",
        role: "Network Admin Intern",
        company: "MyCom Solutions, s.r.o.",
        period: "May 2024",
        description: "Working as a Network Engineer Intern by engineering client networks, analyzing infrastructure topology, and assisting with deployment, troubleshooting, and optimization tasks.",
        type: "work",
    },
    {
        id: "cert-1",
        role: "CCNA 2",
        company: "Cisco Networking Academy",
        period: "Dec 2025",
        description: "",
        type: "certification",
    },
    {
        id: "cert-2",
        role: "NDG Linux Essentials",
        company: "Cisco Networking Academy",
        period: "Apr 2025",
        description: "",
        type: "certification",
    },
    {
        id: "cert-3",
        role: "HTML Essentials",
        company: "Cisco Networking Academy",
        period: "Jan 2026",
        description: "",
        type: "certification",
    },
    {
        id: "cert-6",
        role: "B2 FCE",
        company: "Cambridge English",
        period: "Nov 2025",
        description: "",
        type: "certification",
    },
    {
        id: "cert-5",
        role: "CSS Essentials",
        company: "Cisco Networking Academy",
        period: "Feb 2026",
        description: "",
        type: "certification",
    },
    {
        id: "cert-4",
        role: "JavaScript Essentials 2",
        company: "Cisco Networking Academy",
        period: "Dec 2024",
        description: "",
        type: "certification",
    }
];
