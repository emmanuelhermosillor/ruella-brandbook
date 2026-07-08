"use client";
import { useLang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { Nav } from "./Nav";
import { Acceso } from "./Acceso";
import { Footer } from "./Footer";
import { Button } from "@/components/Button";

type PerfilKey = "brokers" | "inversionistas" | "desarrolladores";
type Role = "investor" | "broker" | "developer";

const ROLE: Record<PerfilKey, Role> = {
  brokers: "broker",
  inversionistas: "investor",
  desarrolladores: "developer",
};

export function Perfil({ perfil }: { perfil: PerfilKey }) {
  const [lang, setLang] = useLang();
  const p = copy.perfiles[perfil];

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <section className="pt-[168px] pb-[120px]">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="max-w-[720px]">
              <p className="font-mono text-[11px] uppercase tracking-label text-grafito/55">{p.label[lang]}</p>
              <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.06] tracking-tight">
                {p.title[lang]}
              </h1>
              <div className="mt-10 max-w-[560px] space-y-6">
                {p.paras[lang].map((para, i) => (
                  <p key={i} className="font-body text-[17px] font-light leading-relaxed text-grafito/75">
                    {para}
                  </p>
                ))}
              </div>
              <div className="mt-12">
                <Button href="#acceso">{p.cta[lang]}</Button>
              </div>
            </div>
          </div>
        </section>

        <Acceso lang={lang} defaultRole={ROLE[perfil]} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
