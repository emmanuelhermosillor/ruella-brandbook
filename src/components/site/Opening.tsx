import Image from "next/image";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { copy, type Lang } from "@/content/copy";
import { blur } from "@/lib/blur";

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

      {/* Horizontal evocadora — anticipación. Teaser, no álbum. */}
      <figure className="relative mt-20 aspect-[16/7] w-full overflow-hidden border border-linea">
        <Image
          src="/img/opening.jpg"
          alt={copy.figs.opening.alt[lang]}
          fill
          placeholder="blur"
          blurDataURL={blur.opening}
          sizes="(min-width: 768px) 90vw, 100vw"
          className="object-cover"
        />
        <figcaption className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-galeria/85 mix-blend-difference">
          {copy.figs.opening.caption[lang]}
        </figcaption>
      </figure>
    </Section>
  );
}
