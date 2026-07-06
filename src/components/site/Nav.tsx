"use client";
import { useEffect, useState } from "react";
import { Wordmark } from "@/components/Wordmark";
import { copy, type Lang } from "@/content/copy";

const links = [
  { href: "#casa", key: "casa" },
  { href: "#circulo", key: "circulo" },
  { href: "#opening", key: "opening" },
  { href: "#acceso", key: "acceso" },
] as const;

export function Nav({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-galeria/90 backdrop-blur-md border-b border-linea"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1240px] items-center justify-between px-6 py-5 md:px-12">
        <a href="#top" className="text-[19px] text-grafito">
          <Wordmark />
        </a>

        <nav className="hidden items-center gap-9 lg:flex">
          {links.map((l) => (
            <a
              key={l.key}
              href={l.href}
              className="font-mono text-[11px] uppercase tracking-[0.18em] text-grafito/70 transition-colors hover:text-grafito"
            >
              {copy.nav[l.key][lang]}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.14em]">
            {(["es", "en"] as const).map((l, i) => (
              <span key={l} className="flex items-center gap-2">
                {i === 1 && <span className="text-piedra">|</span>}
                <button
                  type="button"
                  onClick={() => setLang(l)}
                  aria-pressed={lang === l}
                  className={`transition-colors ${lang === l ? "text-grafito" : "text-piedra hover:text-grafito/70"}`}
                >
                  {l.toUpperCase()}
                </button>
              </span>
            ))}
          </div>
          {/* Quiet outline — the salvia fill is reserved for the in-content CTA, one per view. */}
          <a
            href="#acceso"
            className="hidden border border-grafito/25 px-[18px] py-[11px] font-mono text-[11px] uppercase tracking-[0.18em] text-grafito transition-colors hover:border-grafito hover:bg-grafito hover:text-galeria sm:inline-block"
          >
            {copy.nav.cta[lang]}
          </a>
        </div>
      </div>
    </header>
  );
}
