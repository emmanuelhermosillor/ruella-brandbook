import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { copy, type Lang } from "@/content/copy";

export function Circulo({ lang }: { lang: Lang }) {
  return (
    <Section id="circulo" dark>
      <div className="max-w-[620px]">
        <Label>{copy.circulo.label[lang]}</Label>
        <h2 className="mt-7 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-tight text-galeria">
          {copy.circulo.title[lang]}
        </h2>
      </div>

      <div className="mt-20 grid gap-px border-t border-galeria/15 md:grid-cols-3">
        {copy.circulo.items.map((item) => (
          <div key={item.n} className="border-t border-galeria/15 py-10 md:border-t-0 md:pr-10">
            <span className="font-mono text-[12px] tracking-[0.2em] text-galeria/40">{item.n}</span>
            <h3 className="mt-5 font-display text-[1.6rem] font-medium leading-tight text-galeria">
              {item.title[lang]}
            </h3>
            <p className="mt-4 max-w-[300px] font-body text-[15px] font-light leading-relaxed text-galeria/65">
              {item.body[lang]}
            </p>
          </div>
        ))}
      </div>
    </Section>
  );
}
