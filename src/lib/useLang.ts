"use client";
import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/content/copy";

const KEY = "ruella-lang";
const EVENT = "ruella-lang-change";

function readLang(): Lang {
  if (typeof window === "undefined") return "en";
  // ?lang=es hace enlazable la versión en español (hreflang, correos, firmas).
  const fromUrl = new URLSearchParams(window.location.search).get("lang");
  if (fromUrl === "es" || fromUrl === "en") return fromUrl;
  return localStorage.getItem(KEY) === "es" ? "es" : "en";
}

/**
 * Persistent EN/ES choice, shared across every component that calls it.
 * Default "en" (the Los Cabos market is international); ES lives behind the
 * switch and is linkable with ?lang=es. Restored from localStorage on mount. A custom event keeps
 * the nav toggle, the pages, and the global consent banner in sync live.
 */
export function useLang(): [Lang, (l: Lang) => void] {
  // Start "en" so SSR and first client render match; sync after mount.
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const sync = () => {
      const next = readLang();
      setLang(next);
      document.documentElement.lang = next;
    };
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  const set = useCallback((next: Lang) => {
    try {
      localStorage.setItem(KEY, next);
    } catch {
      /* private mode / storage blocked — fall back to in-memory state */
    }
    if (typeof document !== "undefined") document.documentElement.lang = next;
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return [lang, set];
}
