"use client";
import { useState } from "react";
import { type Lang } from "@/content/copy";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Casa } from "@/components/site/Casa";
import { Circulo } from "@/components/site/Circulo";
import { Opening } from "@/components/site/Opening";
import { Acceso } from "@/components/site/Acceso";
import { Footer } from "@/components/site/Footer";

export default function Page() {
  const [lang, setLang] = useState<Lang>("es");

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <Hero lang={lang} />
        <Casa lang={lang} />
        <Circulo lang={lang} />
        <Opening lang={lang} />
        <Acceso lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
