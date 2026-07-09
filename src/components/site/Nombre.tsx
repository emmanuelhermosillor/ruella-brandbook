import { Section } from "@/components/Section";
import { copy, type Lang } from "@/content/copy";

export function Nombre({ lang }: { lang: Lang }) {
  return (
    <Section id="nombre" className="border-t border-linea">
      <div className="mx-auto max-w-[760px]">
        <p className="font-mono text-[11px] uppercase tracking-label text-grafito/50">{copy.nombre.label[lang]}</p>
        <p className="mt-10 font-display text-[clamp(1.6rem,3vw,2.3rem)] font-medium leading-[1.32] tracking-tight text-grafito/90">
          {copy.nombre.body[lang]}
        </p>
      </div>
    </Section>
  );
}
