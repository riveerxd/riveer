export type Project = {
    id: string;
    title: string;
    url: string;
    image: string;
    description?: string;
    waitFor?: number;
};

export const projects: Project[] = [
    { id: "videre", title: "Videre.cz", url: "https://videre.cz", image: "/project-screenshots/videre.webp" },
    { id: "vpn.free", title: "Vpn.free", url: "https://vpn.free", image: "/project-screenshots/vpn.free.webp" },
    { id: "nclinic", title: "Nclinic.cz", url: "https://nclinic.cz", image: "/project-screenshots/nclinic.webp" },
    { id: "hlasovyrobot", title: "Hlasovyrobot.cz", url: "https://hlasovyrobot.cz", image: "/project-screenshots/hlasovyrobot.webp", waitFor: 25000 },
    { id: "clinicm", title: "Clinicm.cz", url: "https://clinicm.cz", image: "/project-screenshots/clinicm.webp" },
    { id: "videre2", title: "Videre2.cz", url: "https://videre2.cz", image: "/project-screenshots/videre2.webp" },
    { id: "vlastimilbilek", title: "Vlastimilbilek.cz", url: "https://vlastimilbilek.cz", image: "/project-screenshots/vlastimilbilek.webp" },
    { id: "ocnipetriny", title: "Ocnipetriny.cz", url: "https://ocnipetriny.cz", image: "/project-screenshots/ocnipetriny.webp" },
];
