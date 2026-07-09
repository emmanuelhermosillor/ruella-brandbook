"use client";
import { useLang } from "@/lib/useLang";
import { copy } from "@/content/copy";
import { Wordmark } from "@/components/Wordmark";

export default function NotFound() {
  const [lang] = useLang();
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-6 text-center">
      <a href="/" className="text-[20px] text-grafito">
        <Wordmark />
      </a>
      <h1 className="mt-12 max-w-[600px] font-display text-[clamp(1.8rem,4vw,2.8rem)] font-medium leading-[1.15] tracking-tight">
        {copy.notFound.title[lang]}
      </h1>
      <a
        href="/"
        className="mt-12 border border-grafito/25 px-[22px] py-[13px] font-mono text-[11px] uppercase tracking-[0.18em] text-grafito transition-colors hover:border-grafito hover:bg-grafito hover:text-galeria"
      >
        {copy.notFound.cta[lang]}
      </a>
    </main>
  );
}
