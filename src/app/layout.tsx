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
};

export const metadata: Metadata = {
  metadataBase: new URL("https://riveer.cz"),
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
