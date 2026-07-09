"use client";
import { useEffect } from "react";

/**
 * El scroll inicial al hash (#acceso, #opening…) no ocurre porque el contenido
 * se pinta tras la hidratación; y al cargar las fuentes display el layout se
 * corre, dejando el ancla desalineada. Saltamos al ancla en cuanto existe y
 * volvemos a corregir cuando fuentes e imágenes terminan de asentar el layout.
 * El offset del nav fijo lo da scroll-padding-top en globals.css.
 */
export function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash || hash.length < 2) return;
    const id = decodeURIComponent(hash.slice(1));

    const jump = () => {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "instant" as ScrollBehavior });
      return Boolean(el);
    };

    // Salto inicial: reintenta por rAF hasta que el ancla exista.
    let tries = 0;
    const tick = () => {
      if (jump()) return;
      if (tries++ < 30) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Correcciones tras asentar el layout (fuentes display + imágenes).
    const onLoad = () => jump();
    if (typeof document !== "undefined" && "fonts" in document) {
      document.fonts.ready.then(jump).catch(() => {});
    }
    window.addEventListener("load", onLoad, { once: true });
    const t1 = window.setTimeout(jump, 400);
    const t2 = window.setTimeout(jump, 900);

    return () => {
      window.removeEventListener("load", onLoad);
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, []);
  return null;
}
