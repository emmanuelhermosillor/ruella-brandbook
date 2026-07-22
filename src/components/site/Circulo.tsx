import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { Reveal } from "./Reveal";
import { copy, type Lang } from "@/content/copy";

export function Circulo({ lang }: { lang: Lang }) {
  return (
    <Section id="circulo" dark>
      <div className="max-w-[620px]">
        <Reveal><Label>{copy.circulo.label[lang]}</Label></Reveal>
        <Reveal delay={70}>
        <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-tight text-galeria">
          {copy.circulo.title[lang]}
        </h2>
        <p className="mt-6 font-body text-[16px] font-light leading-relaxed text-galeria/60">
          {copy.circulo.sub[lang]}
        </p>
        </Reveal>
      </div>

      <div className="mt-14 grid gap-px border-t border-galeria/15 md:grid-cols-3">
        {copy.circulo.items.map((item, i) => (
          <Reveal key={item.n} delay={i * 70} className="flex flex-col border-t border-galeria/15 py-10 md:border-t-0 md:pr-10">
            <span className="font-mono text-[12px] tracking-[0.2em] text-galeria/40">{item.n}</span>
            <h3 className="mt-5 font-display text-[1.6rem] font-medium leading-tight text-galeria">
              {item.title[lang]}
            </h3>
            <p className="mt-4 max-w-[300px] font-body text-[15px] font-light leading-relaxed text-galeria/65">
              {item.body[lang]}
            </p>
            {/* Quiet link, no salvia — the accent on this view is the section label. */}
            <a
              href={item.href}
              className="mt-7 inline-flex items-center font-mono text-[11px] uppercase tracking-[0.18em] text-galeria/55 transition-colors hover:text-galeria"
            >
              {copy.circulo.more[lang]}
              {/* El texto visible se repite por diseño; el destino se nombra
                  para lectores de pantalla y buscadores, sin verse. */}
              <span
                style={{
                  position: "absolute",
                  width: 1,
                  height: 1,
                  padding: 0,
                  margin: -1,
                  overflow: "hidden",
                  clip: "rect(0 0 0 0)",
                  whiteSpace: "nowrap",
                  border: 0,
                }}
              >
                {" "}— {item.title[lang]}
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
