import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { Reveal } from "./Reveal";
import { copy, type Lang } from "@/content/copy";

/** El Dictamen y la casa de relojes — la bisagra que justifica las tres puertas. */
export function Curaduria({ lang }: { lang: Lang }) {
  return (
    <Section id="curaduria">
      <div className="mx-auto max-w-[720px]">
        <Reveal><Label>{copy.curaduria.label[lang]}</Label></Reveal>
        <Reveal delay={70}>
          <h2 className="mt-6 max-w-[600px] font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight">
            {copy.curaduria.title[lang]}
          </h2>
        </Reveal>
        <Reveal delay={140}>
          <div className="mt-7 space-y-5">
            <p className="font-body text-[16px] font-light leading-relaxed text-grafito/75">{copy.curaduria.body1[lang]}</p>
            <p className="font-body text-[16px] font-light leading-relaxed text-grafito/75">{copy.curaduria.body2[lang]}</p>
            <p className="font-body text-[16px] font-light italic leading-relaxed text-grafito/60">{copy.curaduria.body3[lang]}</p>
          </div>
        </Reveal>
      </div>
    </Section>
  );
}
