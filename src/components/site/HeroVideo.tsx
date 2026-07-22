"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Loop ambiental del hero. Es fondo: se monta encima del poster (que sigue
 * siendo el LCP) y nunca bloquea el primer render.
 *
 * - Corre en todos los tamaños. En celular se sirve una copia ligera (960px)
 *   para no gastar datos de más; en desktop, la de 1280.
 * - Respeta prefers-reduced-motion: reduce → no se monta y queda el poster.
 *   Al no montarse, el navegador ni siquiera pide el archivo.
 * - La revelación NO cuelga de un solo evento: iOS Safari es poco fiable con
 *   `canplay` cuando preload="metadata". Se revela con lo que ocurra primero
 *   —la promesa de play(), `playing`, `loadeddata`— y con un plazo de respaldo.
 * - Si el autoplay se bloquea (pestaña suspendida, ahorro de energía), se
 *   reintenta al volver a la pestaña y al primer toque del usuario.
 */
export function HeroVideo({ poster }: { poster: string }) {
  const [enabled, setEnabled] = useState(false);
  const [small, setSmall] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  // Montaje: solo la preferencia de movimiento decide. El ancho elige la copia.
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const narrow = window.matchMedia("(max-width: 767px)");
    const update = () => {
      setEnabled(motion.matches);
      setSmall(narrow.matches);
    };
    update();
    motion.addEventListener("change", update);
    return () => motion.removeEventListener("change", update);
  }, []);

  // Arranque + reintentos. El vídeo es mudo, así que reproducir no molesta.
  useEffect(() => {
    if (!enabled) return;
    const v = ref.current;
    if (!v) return;

    let done = false;
    const reveal = () => {
      if (!done) {
        done = true;
        setReady(true);
      }
    };

    const attempt = () => {
      const p = v.play();
      if (p && typeof p.then === "function") p.then(reveal).catch(() => {});
    };

    v.addEventListener("playing", reveal);
    v.addEventListener("loadeddata", reveal);
    attempt();

    // Respaldo: si el vídeo ya tiene fotogramas, se muestra aunque ningún
    // evento haya llegado (iOS a veces no dispara ninguno).
    const t = window.setTimeout(() => {
      if (v.readyState >= 2) reveal();
    }, 1200);

    const onVisible = () => {
      if (document.visibilityState === "visible" && v.paused) attempt();
    };
    const onTouch = () => {
      if (v.paused) attempt();
    };
    document.addEventListener("visibilitychange", onVisible);
    window.addEventListener("touchstart", onTouch, { once: true, passive: true });

    return () => {
      window.clearTimeout(t);
      v.removeEventListener("playing", reveal);
      v.removeEventListener("loadeddata", reveal);
      document.removeEventListener("visibilitychange", onVisible);
      window.removeEventListener("touchstart", onTouch);
    };
  }, [enabled, small]);

  if (!enabled) return null;

  const src = small ? "/video/hero-loop-mobile-v3" : "/video/hero-loop-v2";

  return (
    <video
      // key: al cambiar de copia (rotación del teléfono, resize) se remonta
      // limpio en lugar de quedarse con las fuentes anteriores.
      key={src}
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
      tabIndex={-1}
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
      style={{ objectPosition: "center 45%", opacity: ready ? 1 : 0 }}
    >
      <source src={`${src}.webm`} type="video/webm" />
      <source src={`${src}.mp4`} type="video/mp4" />
    </video>
  );
}
