import { Section } from "@/components/Section";
import { Label } from "@/components/Label";
import { copy, type Lang } from "@/content/copy";

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

        {/* Image placeholder 4:5 — editorial photo drops in here. */}
        <div className="relative aspect-[4/5] w-full overflow-hidden border border-linea">
          <div
            className="absolute inset-0"
            style={{ background: "linear-gradient(160deg, var(--color-nacar) 0%, var(--color-piedra) 100%)" }}
            aria-hidden
          />
          <span className="absolute bottom-6 left-6 font-mono text-[10px] uppercase tracking-[0.22em] text-grafito/40">
            FIG. 002 · La Casa
          </span>
        </div>
      </div>
    </Section>
  );
}
