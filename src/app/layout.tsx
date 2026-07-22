import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/site/Analytics";
import { ConsentBanner } from "@/components/site/ConsentBanner";
import { HashScroll } from "@/components/site/HashScroll";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["500"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["300", "400"],
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  variable: "--font-plex",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const DESCRIPTION_EN =
  "A curation house for exceptional real estate. A closed circle. Entry by invitation.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ruella.mx"),
  title: "Ruella · Quietly first.",
  description: DESCRIPTION_EN,
  alternates: {
    canonical: "/",
    languages: { en: "/", es: "/?lang=es", "x-default": "/" },
  },
  openGraph: {
    title: "Ruella · Quietly first.",
    description: DESCRIPTION_EN,
    url: "https://ruella.mx",
    siteName: "Ruella",
    locale: "en_US",
    alternateLocale: "es_MX",
    type: "website",
  },
};

export const viewport: Viewport = { themeColor: "#F6F5F1" };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-galeria text-grafito">
        {children}
        <HashScroll />
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
