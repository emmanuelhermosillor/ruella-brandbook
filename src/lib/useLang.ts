"use client";
import { useCallback, useEffect, useState } from "react";
import type { Lang } from "@/content/copy";

const KEY = "ruella-lang";
const EVENT = "ruella-lang-change";

function readLang(): Lang {
  if (typeof window === "undefined") return "es";
  return localStorage.getItem(KEY) === "en" ? "en" : "es";
}

/**
 * Persistent ES/EN choice, shared across every component that calls it.
 * Default "es"; restored from localStorage on mount. A custom event keeps
 * the nav toggle, the pages, and the global consent banner in sync live.
 */
export function useLang(): [Lang, (l: Lang) => void] {
  // Start "es" so SSR and first client render match; sync after mount.
  const [lang, setLang] = useState<Lang>("es");

  useEffect(() => {
    const sync = () => setLang(readLang());
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
