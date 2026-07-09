import Image from "next/image";
import { Button } from "@/components/Button";
import { copy, type Lang } from "@/content/copy";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      <Image
        src="/img/hero.jpg"
        alt={copy.figs.hero.alt[lang]}
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 40%" }}
      />
      {/* Velo galería (nunca negro): fuerte a la izquierda para sostener el texto grafito. */}
      <div
        className="absolute inset-0"
        aria-hidden
        style={{
          background:
            "linear-gradient(100deg, rgba(246,245,241,0.94) 0%, rgba(246,245,241,0.82) 28%, rgba(246,245,241,0.30) 58%, rgba(246,245,241,0) 82%)",
        }}
      />

      <span className="absolute bottom-8 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-grafito/50 md:right-12">
        {copy.figs.hero.caption[lang]}
      </span>

      <div className="relative z-10 mx-auto w-full max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] uppercase tracking-label text-grafito/60">
            {copy.hero.eyebrow[lang]}
          </p>
          <h1 className="mt-8 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-grafito">
            {copy.hero.title[lang]}
          </h1>
          <p className="mt-8 max-w-[520px] font-body text-[17px] font-light leading-relaxed text-grafito/80">
            {copy.hero.sub[lang]}
          </p>
          <div className="mt-11">
            <Button href="#acceso">{copy.hero.cta[lang]}</Button>
          </div>
        </div>
      </div>
    </section>
  );
}
