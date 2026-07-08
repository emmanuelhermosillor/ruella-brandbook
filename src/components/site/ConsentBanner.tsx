"use client";
import { useEffect, useState } from "react";
import { useLang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { getConsent, setConsent } from "@/lib/consent";

/**
 * Discreet, fixed to the bottom. Galería identity, no salvia (each view's
 * accent already belongs to its CTA). Shows only until the visitor chooses;
 * the choice is remembered and it never returns.
 */
export function ConsentBanner() {
  const [lang] = useLang();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(getConsent() === null);
  }, []);

  if (!show) return null;

  const choose = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-linea bg-galeria/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-[1240px] flex-col gap-4 px-6 py-5 md:flex-row md:items-center md:justify-between md:px-12">
        <p className="max-w-[660px] font-body text-[13px] font-light leading-relaxed text-grafito/75">
          {copy.cookies.body[lang]}{" "}
          <a href="/privacidad" className="underline decoration-linea underline-offset-4 transition-colors hover:text-grafito">
            {copy.cookies.link[lang]}
          </a>
        </p>
        <div className="flex shrink-0 items-center gap-4">
          <button
            type="button"
            onClick={() => choose("denied")}
            className="font-mono text-[11px] uppercase tracking-[0.16em] text-grafito/55 transition-colors hover:text-grafito"
          >
            {copy.cookies.decline[lang]}
          </button>
          <button
            type="button"
            onClick={() => choose("granted")}
            className="border border-grafito/25 px-[18px] py-[10px] font-mono text-[11px] uppercase tracking-[0.16em] text-grafito transition-colors hover:border-grafito hover:bg-grafito hover:text-galeria"
          >
            {copy.cookies.accept[lang]}
          </button>
        </div>
      </div>
    </div>
  );
}
