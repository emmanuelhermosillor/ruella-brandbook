import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Manrope, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@/components/site/Analytics";
import { ConsentBanner } from "@/components/site/ConsentBanner";

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

export const metadata: Metadata = {
  metadataBase: new URL("https://ruella.mx"),
  title: "Ruella · Quietly first.",
  description: "Una casa de curaduría. Un círculo cerrado. Acceso por invitación.",
  openGraph: {
    title: "Ruella · Quietly first.",
    description: "Una casa de curaduría. Un círculo cerrado. Acceso por invitación.",
    url: "https://ruella.mx",
    siteName: "Ruella",
    locale: "es_MX",
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
      lang="es"
      className={`${cormorant.variable} ${manrope.variable} ${plexMono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-galeria text-grafito">
        {children}
        <ConsentBanner />
        <Analytics />
      </body>
    </html>
  );
}
