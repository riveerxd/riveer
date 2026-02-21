import type { Dictionary } from "./types";

export const csDictionary: Dictionary = {
    metadata: {
        defaultTitle: "River | Softwarový inženýr & vývojář",
        titleTemplate: "%s | River",
        description:
            "Vytvářím interaktivní a vysoce výkonné aplikace s platformovým přístupem – od robustních API až po elegantní uživatelská rozhraní. Pokud má být řešení rychlé, spolehlivé a připravené na růst, je to moje parketa.",
        keywords: [
            "River",
            "Software Engineer",
            "Fullstack Developer",
            "React",
            "Next.js",
            "Portfolio",
            "Engineering",
            "Lukas Hrehor",
        ],
        openGraphLocale: "cs_CZ",
        ogTitle: "River - Portfolio",
        ogDescription:
            "Vytvářím interaktivní a vysoce výkonné aplikace s platformovým přístupem – od robustních API až po elegantní rozhraní.",
        siteName: "River Portfolio",
        ogImageAlt: "River - Softwarový inženýr & vývojář",
        twitterTitle: "River - Portfolio",
        twitterDescription:
            "Vytvářím interaktivní a vysoce výkonné aplikace s platformovým přístupem.",
    },
    personal: {
        role: "Softwarový inženýr & vývojář",
        bio: "Vytvářím interaktivní a vysoce výkonné aplikace s platformovým přístupem – od robustních API až po elegantní uživatelská rozhraní. Pokud má být řešení rychlé, spolehlivé a připravené na růst, je to moje parketa.",
    },
    ui: {
        skipToContent: "Přeskočit na obsah",
        currentRolePrefix: "Aktuální role // ",
        scrollHint: "Posuňte níže",
        orbitLoadedLabel: " // NAČTENO",
    },
    nav: {
        about: "O mně",
        experience: "Zkušenosti",
        projectLog: "Projekty",
        tools: "Nástroje",
        contact: "Kontakt",
        systemLinkSuffix: "// SYSTEM_LINK",
        languageButtonLabel: "Jazyk",
        languageOptions: [
            { code: "en", label: "EN" },
            { code: "cs", label: "CZ" },
        ],
    },
    sections: {
        workExperience: "Pracovní_zkušenosti",
        certifications: "Certifikace",
        projectLog: "Projekty",
        technicalArsenal: "Technologický_arzenál",
        openForOpportunities: "Otevřen novým příležitostem",
        contact: "Kontakt",
    },
    headings: {
        heroLine1: "Řešení, která",
        heroLine2: "rostou",
        contactLine1: "Navázat",
        contactLine2: "Kontakt",
    },
    buttons: {
        projects: "Projekty",
        contact: "Kontakt",
        visitSite: "Navštívit web",
        contactSubmit: "Odeslat zprávu",
    },
    form: {
        subjectLabel: "Předmět // Parametr",
        subjectPlaceholder: "Zadejte předmět zprávy...",
        messageLabel: "Obsah // Zpráva",
        messagePlaceholder: "Zde zadejte obsah zprávy...",
    },
    footer: {
        protocolLabel: "Protokol // End_of_Stream",
        connectionLabel: "Spojení navázáno",
        statusCode: "0x00000000",
        entityLabel: "Entita // Registry",
        registryLabel: "©",
        registrySuffix: "RIVER_CORE // DEVELOPED_IN_PRAGUE",
    },
    data: {
        projects: {
            videre: "Videre.cz",
            "vpn.free": "Vpn.free",
            nclinic: "Nclinic.cz",
            hlasovyrobot: "Hlasovyrobot.cz",
            clinicm: "Clinicm.cz",
            videre2: "Videre2.cz",
            vlastimilbilek: "Vlastimilbilek.cz",
            ocnipetriny: "Ocnipetriny.cz",
        },
        projectDescriptions: {
            videre:
                "Komplexní web oční kliniky v Praze se dvěma pobočkami, moderní diagnostikou a přehledným průchodem pro pacienty.",
            "vpn.free":
                "Instantní VPN a proxy platforma zaměřená na rychlý přístup bez instalace aplikace a složitého nastavení.",
            nclinic:
                "Prezentace moderní zubní kliniky se zaměřením na čelistní chirurgii, rozsah péče a kontaktní informace pro pacienty.",
            hlasovyrobot:
                "Web služeb AI voicebotů navržených pro automatizaci příchozích hovorů, podpory a kvalifikace leadů.",
            clinicm:
                "Web oční kliniky s praktickou kontaktně orientovanou strukturou, ordinační dobou a přehledem klíčových služeb.",
            videre2:
                "Web oční kliniky prezentující vyšetření, diagnostiku a péči hrazenou pojišťovnami pro pacienty z Prahy 7.",
            vlastimilbilek:
                "Profesní web technického poradce v oblasti životního prostředí se specializací na ochranu ovzduší.",
            ocnipetriny:
                "Web oční ordinace kombinující lidský přístup s detailním přehledem diagnostiky a ošetření.",
        },
        experienceRoles: {
            "exp-5": "Freelance Web Developer",
            "exp-1": "Software Engineer & Developer",
            "exp-2": "Linux System Administrator",
            "exp-3": "IT Intern",
            "exp-4": "Network Admin Intern",
            "cert-1": "CCNA 2",
            "cert-2": "NDG Linux Essentials",
            "cert-3": "HTML Essentials",
            "cert-6": "B2 FCE",
            "cert-5": "CSS Essentials",
            "cert-4": "JavaScript Essentials 2",
        },
        experienceDescriptions: {
            "exp-5":
                "Navrhuji a vyvíjím webové stránky a aplikace pro klienty napříč frontendovými i backendovými procesy.",
            "exp-1":
                "Vyvíjím webové a síťové aplikace se zaměřením na škálovatelné architektury a softwarové systémy, které zvyšují výkon, spolehlivost a efektivitu integračních procesů.",
            "exp-2":
                "Monitoruji Linuxová prostředí, udržuji zdraví serverů a podporuji provoz infrastruktury prostřednictvím ladění výkonu, správy aktualizací a zajištění spolehlivosti služeb.",
            "exp-3":
                "Analyzuji hlasové konverzace klientů a vyvíjím AI voiceboty pro zefektivnění podpůrných procesů, zvýšení kvality odpovědí a automatizaci rutinní komunikace se zákazníky.",
            "exp-4":
                "Působil jsem jako Network Engineer Intern, kde jsem navrhoval klientské sítě, analyzoval topologii infrastruktury a podílel se na nasazení, řešení problémů a optimalizaci.",
            "cert-1": "",
            "cert-2": "",
            "cert-3": "",
            "cert-6": "",
            "cert-5": "",
            "cert-4": "",
        },
    },
};
