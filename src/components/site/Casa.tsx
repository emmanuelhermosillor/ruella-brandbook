import Image from "next/image";
import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { copy, type Lang } from "@/content/copy";
import { blur } from "@/lib/blur";

export function Casa({ lang }: { lang: Lang }) {
  return (
    <Section id="casa">
      <div className="grid items-center gap-16 md:grid-cols-2 md:gap-20">
        <div className="max-w-[520px]">
          <Label>{copy.casa.label[lang]}</Label>
          <h2 className="mt-7 font-display text-[clamp(2rem,4vw,3.2rem)] font-medium leading-[1.1] tracking-tight">
            {copy.casa.title[lang]}
          </h2>
          <p className="mt-8 font-body text-[16px] font-light leading-relaxed text-grafito/75">
            {copy.casa.body1[lang]}
          </p>
          <p className="mt-5 font-body text-[16px] font-light leading-relaxed text-grafito/75">
            {copy.casa.body2[lang]}
          </p>
        </div>

        <div className="relative aspect-[4/5] w-full overflow-hidden border border-linea">
          <Image
            src="/img/casa.jpg"
            alt={copy.figs.casa.alt[lang]}
            fill
            placeholder="blur"
            blurDataURL={blur.casa}
            sizes="(min-width: 768px) 45vw, 100vw"
            className="object-cover"
          />
          <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.22em] text-galeria/80 mix-blend-difference">
            {copy.figs.casa.caption[lang]}
          </span>
        </div>
      </div>
    </Section>
  );
}
