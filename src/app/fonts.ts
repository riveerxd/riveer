import {
    Inter,
    Outfit,
    Space_Grotesk,
    JetBrains_Mono,
    Playfair_Display,
    Lato,
    Syne,
    DM_Sans,
    Archivo_Black,
    Roboto_Mono,
} from "next/font/google";

export const fontInter = Inter({ subsets: ["latin"], variable: "--font-inter" });
export const fontOutfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const fontSpaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });
export const fontJetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono" });

export const fontPlayfairDisplay = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair-display" });
export const fontLato = Lato({ subsets: ["latin"], variable: "--font-lato", weight: ["400", "700"] });

export const fontSyne = Syne({ subsets: ["latin"], variable: "--font-syne" });
export const fontDMSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });

export const fontArchivoBlack = Archivo_Black({ subsets: ["latin"], variable: "--font-archivo-black", weight: "400" });
export const fontRobotoMono = Roboto_Mono({ subsets: ["latin"], variable: "--font-roboto-mono" });
