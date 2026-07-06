import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { copy, type Lang } from "@/content/copy";

export function Opening({ lang }: { lang: Lang }) {
  return (
    <Section id="opening">
      <div className="mx-auto max-w-[680px] text-center">
        <p className="font-mono text-[11px] uppercase tracking-label text-grafito/55">
          {copy.opening.label[lang]}
        </p>
        <h2 className="mt-8 font-display text-[clamp(1.9rem,3.6vw,2.9rem)] font-medium leading-[1.12] tracking-tight">
          {copy.opening.place[lang]}
        </h2>
        <p className="mx-auto mt-7 max-w-[440px] font-body text-[16px] font-light leading-relaxed text-grafito/70">
          {copy.opening.body[lang]}
        </p>
        <div className="mt-11">
          <Button href="#acceso">{copy.opening.cta[lang]}</Button>
        </div>
      </div>
    </Section>
  );
}
