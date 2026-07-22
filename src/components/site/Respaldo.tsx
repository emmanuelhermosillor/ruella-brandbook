import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { Reveal } from "./Reveal";
import { copy, type Lang } from "@/content/copy";

/**
 * El respaldo. Jerarquía: Grubsa es el origen, BAS Holding el grupo, Ruella
 * parte del grupo. Sección de texto (sin imagen) — es una nota de certeza,
 * no una lámina; el aire la sostiene.
 */
export function Respaldo({ lang }: { lang: Lang }) {
  return (
    <Section id="respaldo" air>
      <div className="mx-auto max-w-[720px]">
        <Reveal><Label>{copy.respaldo.label[lang]}</Label></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-6 max-w-[600px] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight">
            {copy.respaldo.title[lang]}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-7 space-y-5">
            <p className="font-body text-[16px] font-light leading-relaxed text-grafito/75">{copy.respaldo.body1[lang]}</p>
            <p className="font-body text-[16px] font-light leading-relaxed text-grafito/75">{copy.respaldo.body2[lang]}</p>
            <p className="font-body text-[16px] font-light leading-relaxed text-grafito/75">{copy.respaldo.body3[lang]}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
