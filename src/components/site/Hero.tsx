import Image from "next/image";
import { Button } from "@/components/Button";
import { copy, type Lang } from "@/content/copy";
import { blur } from "@/lib/blur";
import { HeroVideo } from "./HeroVideo";

const HERO_POSTER = "/img/hero-poster-v1.jpg";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section id="top" className="relative flex min-h-screen items-center overflow-hidden">
      {/* El poster es el LCP: hereda el rol de la foto. El video nunca lo bloquea. */}
      <Image
        src={HERO_POSTER}
        alt={copy.figs.hero.alt[lang]}
        fill
        priority
        fetchPriority="high"
        placeholder="blur"
        blurDataURL={blur.heroPoster}
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: "center 45%" }}
      />
      <HeroVideo poster={HERO_POSTER} />
      {/* Velo galería (nunca negro). Desktop: fuerte a la izquierda. */}
      <div
        className="absolute inset-0 hidden md:block"
        aria-hidden
        style={{
          background:
            "linear-gradient(100deg, rgba(246,245,241,0.94) 0%, rgba(246,245,241,0.82) 28%, rgba(246,245,241,0.30) 58%, rgba(246,245,241,0) 82%)",
        }}
      />
      {/* Móvil: velo vertical pensado para el texto centrado, de arriba hacia abajo. */}
      <div
        className="absolute inset-0 md:hidden"
        aria-hidden
        style={{
          background:
            "linear-gradient(180deg, rgba(246,245,241,0.92) 0%, rgba(246,245,241,0.85) 42%, rgba(246,245,241,0.55) 68%, rgba(246,245,241,0.12) 88%, rgba(246,245,241,0) 100%)",
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
