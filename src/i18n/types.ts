export type LanguageOption = {
    code: string;
    label: string;
};

export type Dictionary = {
    metadata: {
        defaultTitle: string;
        titleTemplate: string;
        description: string;
        keywords: string[];
        openGraphLocale: string;
        ogTitle: string;
        ogDescription: string;
        siteName: string;
        ogImageAlt: string;
        twitterTitle: string;
        twitterDescription: string;
    };
    personal: {
        role: string;
        bio: string;
    };
    ui: {
        skipToContent: string;
        currentRolePrefix: string;
        scrollHint: string;
        orbitLoadedLabel: string;
    };
    nav: {
        about: string;
        experience: string;
        projectLog: string;
        tools: string;
        contact: string;
        systemLinkSuffix: string;
        languageButtonLabel: string;
        languageOptions: LanguageOption[];
    };
    sections: {
        workExperience: string;
        certifications: string;
        projectLog: string;
        technicalArsenal: string;
        openForOpportunities: string;
        contact: string;
    };
    headings: {
        heroLine1: string;
        heroLine2: string;
        contactLine1: string;
        contactLine2: string;
    };
    buttons: {
        projects: string;
        contact: string;
        visitSite: string;
        contactSubmit: string;
    };
    form: {
        subjectLabel: string;
        subjectPlaceholder: string;
        messageLabel: string;
        messagePlaceholder: string;
    };
    footer: {
        protocolLabel: string;
        connectionLabel: string;
        statusCode: string;
        entityLabel: string;
        registryLabel: string;
        registrySuffix: string;
    };
    data: {
        projects: Record<string, string>;
        projectDescriptions: Record<string, string>;
        experienceRoles: Record<string, string>;
        experienceDescriptions: Record<string, string>;
    };
};
