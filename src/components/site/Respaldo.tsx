import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { copy, type Lang } from "@/content/copy";

/**
 * El respaldo. Jerarquía: Grubsa es el origen, BAS Holding el grupo, Ruella
 * parte del grupo. Sección de texto (sin imagen) — es una nota de certeza,
 * no una lámina; el aire la sostiene.
 */
export function Respaldo({ lang }: { lang: Lang }) {
  return (
    <Section id="respaldo">
      <div className="mx-auto max-w-[720px]">
        <Label>{copy.respaldo.label[lang]}</Label>
        <h2 className="mt-7 max-w-[600px] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight">
          {copy.respaldo.title[lang]}
        </h2>
        <p className="mt-8 font-body text-[16px] font-light leading-relaxed text-grafito/75">
          {copy.respaldo.body[lang]}
        </p>
      </div>
    </Section>
  );
}
