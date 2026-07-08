import { Wordmark } from "@/components/Wordmark";
import { RingMark } from "@/components/RingMark";
import { copy, type Lang } from "@/content/copy";

export function Footer({ lang }: { lang: Lang }) {
  return (
    <footer className="bg-grafito text-galeria">
      <div className="mx-auto max-w-[1240px] px-6 py-20 md:px-12">
        <div className="flex flex-col items-start gap-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-4 text-galeria">
            <RingMark size={34} variant="dot" />
            <span className="text-[19px]">
              <Wordmark />
            </span>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-label text-galeria/55">
            {copy.descriptor[lang]}
          </p>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-galeria/15 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-[560px] font-body text-[12px] font-light leading-relaxed text-galeria/45">
            {copy.footer.disclaimer[lang]}
          </p>
          <div className="flex items-center gap-6 font-mono text-[11px] tracking-[0.14em] text-galeria/45">
            <a href="/privacidad" className="uppercase tracking-[0.18em] transition-colors hover:text-galeria">
              {copy.footer.privacy[lang]}
            </a>
            <span>© Ruella</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
