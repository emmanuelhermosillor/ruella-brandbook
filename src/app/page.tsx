"use client";
import { useLang } from "@/lib/useLang";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Casa } from "@/components/site/Casa";
import { Circulo } from "@/components/site/Circulo";
import { Opening } from "@/components/site/Opening";
import { Nombre } from "@/components/site/Nombre";
import { Acceso } from "@/components/site/Acceso";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  const [lang, setLang] = useLang();

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Casa lang={lang} />
        <Circulo lang={lang} />
        <Opening lang={lang} />
        <Nombre lang={lang} />
        <Acceso lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
