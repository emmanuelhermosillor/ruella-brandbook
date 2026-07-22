"use client";
import { useLang } from "@/lib/useLang";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Casa } from "@/components/site/Casa";
import { Respaldo } from "@/components/site/Respaldo";
import { Rol } from "@/components/site/Rol";
import { Curaduria } from "@/components/site/Curaduria";
import { Circulo } from "@/components/site/Circulo";
import { Opening } from "@/components/site/Opening";
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
        <Respaldo lang={lang} />
        <Rol lang={lang} />
        <Curaduria lang={lang} />
        <Circulo lang={lang} />
        <Opening lang={lang} />
        <Acceso lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
