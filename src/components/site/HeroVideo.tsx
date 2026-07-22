"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Loop ambiental del hero. Es fondo: se monta encima del poster (que sigue
 * siendo el LCP) y sólo cuando el contexto lo justifica.
 *
 * - Sólo ≥768px: en móvil el velo cubre casi todo el cuadro y el costo en
 *   datos/batería no se paga con lo que se alcanza a ver. Ahí queda el poster.
 * - Respeta prefers-reduced-motion: reduce → no se monta, queda el poster.
 * - Al no montarse, el navegador nunca pide el video (no basta con ocultarlo).
 * - Aparece con un fundido corto sobre el poster para que no haya salto.
 */
export function HeroVideo({ poster }: { poster: string }) {
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const mq = window.matchMedia(
      "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
    );
    const update = () => setEnabled(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  if (!enabled) return null;

  return (
    <video
      ref={ref}
      autoPlay
      muted
      loop
      playsInline
      preload="metadata"
      poster={poster}
      aria-hidden
      tabIndex={-1}
      onCanPlay={() => setReady(true)}
      className="absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-out"
      style={{ objectPosition: "center 45%", opacity: ready ? 1 : 0 }}
    >
      <source src="/video/hero-loop-v2.webm" type="video/webm" />
      <source src="/video/hero-loop-v2.mp4" type="video/mp4" />
    </video>
  );
}
