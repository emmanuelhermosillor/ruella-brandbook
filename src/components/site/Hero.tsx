import { Button } from "@/components/Button";
import { copy, type Lang } from "@/content/copy";

export function Hero({ lang }: { lang: Lang }) {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      {/* Editorial image zone — placeholder nácar→piedra. Real photo (Death to Stock) drops in here. */}
      <div
        className="absolute inset-0 -z-10"
        style={{ background: "linear-gradient(145deg, var(--color-nacar) 0%, var(--color-piedra) 100%)" }}
        aria-hidden
      />
      <span className="absolute bottom-8 right-6 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-grafito/40 md:right-12">
        FIG. 001 · Editorial
      </span>

      <div className="mx-auto w-full max-w-[1240px] px-6 md:px-12">
        <div className="max-w-[760px]">
          <p className="font-mono text-[11px] uppercase tracking-label text-grafito/55">
            {copy.hero.eyebrow[lang]}
          </p>
          <h1 className="mt-8 font-display text-[clamp(2.6rem,6vw,5rem)] font-medium leading-[1.05] tracking-tight text-grafito">
            {copy.hero.title[lang]}
          </h1>
          <p className="mt-8 max-w-[520px] font-body text-[17px] font-light leading-relaxed text-grafito/75">
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
