"use client";

import { useEffect, useRef, type ReactNode } from "react";

/** Interruptor único del movimiento. En false, Reveal no toca un solo estilo. */
export const MOTION = true;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

/**
 * Movimiento Galería.
 *
 * Dos invariantes, en este orden:
 *  1. Nada se oculta por CSS. El contenido nace visible; solo este efecto puede
 *     ocultarlo, y únicamente si el bloque está MUY por debajo del pliegue.
 *  2. Ningún elemento pasa más de ~0.8s por debajo de opacidad 1 una vez que
 *     entra al viewport. El plazo se arma POR ELEMENTO al entrar — nunca un
 *     temporizador global al cargar, que revelaría todo antes de que el
 *     usuario llegue (y entonces el movimiento existe pero no se ve).
 *
 * El armado se repite tras `load`: al hidratar, las imágenes todavía no han
 * medido y casi nada parece estar fuera de pantalla.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: {
  children: ReactNode;
  delay?: number;
  as?: "div" | "li" | "section" | "figure" | "p";
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !MOTION) return;
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // En teléfono el gesto necesita un poco más de recorrido y de tiempo para
    // percibirse; en escritorio, la mesura de siempre.
    const small = window.matchMedia("(max-width: 767px)").matches;
    const shift = small ? 18 : 12;
    const dur = small ? 650 : 560;

    let armed = false;
    let done = false;
    let io: IntersectionObserver | null = null;
    let watch = 0;
    let fuse = 0;

    const show = () => {
      if (done) return;
      done = true;
      window.clearInterval(watch);
      window.clearTimeout(fuse);
      io?.disconnect();
      el.style.opacity = "";
      el.style.transform = "";
      window.setTimeout(() => {
        el.style.transition = "";
        el.style.willChange = "";
      }, dur + delay + 120);
    };

    const arm = () => {
      if (armed || done) return;
      // Solo lo que está claramente fuera de pantalla: así nadie ve un bloque
      // desaparecer para volver a entrar.
      if (el.getBoundingClientRect().top < window.innerHeight * 1.25) return;
      armed = true;

      el.style.willChange = "opacity, transform";
      el.style.opacity = "0";
      el.style.transform = `translateY(${shift}px)`;
      el.style.transition = `opacity ${dur}ms ${EASE} ${delay}ms, transform ${dur}ms ${EASE} ${delay}ms`;

      io = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) show();
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" },
      );
      io.observe(el);

      // Seguridad por elemento: en cuanto asoma, se le da un plazo corto.
      watch = window.setInterval(() => {
        if (done) return;
        const r = el.getBoundingClientRect();
        const dentro = r.top < window.innerHeight && r.bottom > 0;
        if (dentro && !fuse) fuse = window.setTimeout(show, 800);
      }, 200);
    };

    arm();
    // Segundo intento con la página ya medida (imágenes cargadas).
    const onLoad = () => arm();
    if (document.readyState === "complete") window.setTimeout(arm, 0);
    else window.addEventListener("load", onLoad, { once: true });

    return () => {
      window.removeEventListener("load", onLoad);
      show();
    };
  }, [delay]);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>} className={className}>
      {children}
    </Tag>
  );
}
