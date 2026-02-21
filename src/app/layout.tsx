import type { Metadata, Viewport } from "next";
import {
  fontInter,
  fontOutfit,
  fontSpaceGrotesk,
  fontJetBrainsMono,
  fontPlayfairDisplay,
  fontLato,
  fontSyne,
  fontDMSans,
  fontArchivoBlack,
  fontRobotoMono,
} from "./fonts";
import "./globals.css";

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.riveer.cz"),
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon-16x16.png", type: "image/png", sizes: "16x16" },
      { url: "/favicon-32x32.png", type: "image/png", sizes: "32x32" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    other: [{ rel: "mask-icon", url: "/safari-pinned-tab.svg", color: "#22d3ee" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`
          ${fontInter.variable} ${fontOutfit.variable} 
          ${fontSpaceGrotesk.variable} ${fontJetBrainsMono.variable} 
          ${fontPlayfairDisplay.variable} ${fontLato.variable} 
          ${fontSyne.variable} ${fontDMSans.variable} 
          ${fontArchivoBlack.variable} ${fontRobotoMono.variable} 
          antialiased bg-[#050505] text-foreground overflow-x-hidden
        `}
      >
        {children}
      </body>
    </html>
  );
}
