import { MetadataRoute } from 'next'
import { locales } from "@/i18n/config";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = "https://riveer.cz";

    return locales.map((locale) => ({
        url: `${baseUrl}/${locale}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 1,
    }));
}
