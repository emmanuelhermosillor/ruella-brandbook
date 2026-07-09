"use client";
import { useLang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";

export function Privacidad() {
  const [lang, setLang] = useLang();
  const p = copy.privacidad;

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <section className="pt-[168px] pb-[130px]">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12">
            <div className="max-w-[720px]">
              <p className="font-mono text-[11px] uppercase tracking-label text-grafito/55">{p.label[lang]}</p>
              <h1 className="mt-6 font-display text-[clamp(2.2rem,4.5vw,3.4rem)] font-medium leading-[1.08] tracking-tight">
                {p.title[lang]}
              </h1>
              <p className="mt-8 max-w-[560px] font-body text-[17px] font-light leading-relaxed text-grafito/75">
                {p.intro[lang]}
              </p>
              <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.16em] text-piedra">{p.updated[lang]}</p>

              <div className="mt-16 max-w-[620px] space-y-12">
                {p.sections.map((s, i) => (
                  <div key={i}>
                    <h2 className="font-display text-[1.5rem] font-medium leading-tight">{s.h[lang]}</h2>
                    <p className="mt-4 font-body text-[15px] font-light leading-relaxed text-grafito/75">{s.body[lang]}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
