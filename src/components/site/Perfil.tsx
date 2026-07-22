"use client";
import { useLang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { Nav } from "./Nav";
import { Acceso } from "./Acceso";
import { Footer } from "./Footer";
import { Button } from "@/components/Button";
import { Reveal } from "./Reveal";

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
        <section className="pt-[124px] pb-[72px] md:pt-[168px] md:pb-[96px]">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="max-w-[720px]">
              <p className="font-mono text-[11px] uppercase tracking-label text-grafito/55">{p.label[lang]}</p>
              <h1 className="mt-7 font-display text-[clamp(2.4rem,5vw,4rem)] font-medium leading-[1.06] tracking-tight">
                {p.title[lang]}
              </h1>
              {"intro" in p && (
                <p className="mt-9 max-w-[620px] font-body text-[17px] font-light leading-relaxed text-grafito/75">
                  {p.intro[lang]}
                </p>
              )}

              {"vias" in p ? (
                <div className="mt-14 grid gap-14 md:grid-cols-2 md:gap-16">
                  {p.vias.map((via, i) => (
                    <Reveal key={i} delay={i * 70}>
                      <p className="font-mono text-[11px] uppercase tracking-label text-grafito/55">{via.label[lang]}</p>
                      <ul className="mt-6 space-y-4">
                        {via.items[lang].map((it, j) => (
                          <li key={j} className="border-t border-linea pt-4 font-body text-[16px] font-light leading-relaxed text-grafito/75">
                            {it}
                          </li>
                        ))}
                      </ul>
                      <p className="mt-7 font-body text-[16px] font-light italic leading-relaxed text-grafito/60">{via.close[lang]}</p>
                    </Reveal>
                  ))}
                </div>
              ) : (
                <div className="mt-10 max-w-[560px] space-y-6">
                  {p.paras[lang].map((para, i) => (
                    <Reveal key={i} delay={Math.min(i, 3) * 70}>
                      <p className="font-body text-[17px] font-light leading-relaxed text-grafito/75">{para}</p>
                    </Reveal>
                  ))}
                </div>
              )}

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
