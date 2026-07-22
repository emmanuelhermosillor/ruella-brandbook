"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Interruptor único del movimiento. En false, Reveal no toca un solo estilo:
 * el sitio queda quieto y completo.
 *
 * APAGADO (22 jul): el revelado no se pudo verificar en un iPhone real y ya
 * falló una vez ahí. El resto del ciclo —copy v2.1, espaciado, metadata y el
 * video móvil— sí sale hoy. Se enciende con calma, verificando en dispositivo.
 */
export const MOTION = false;

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const DUR = 560;

/**
 * Movimiento Galería.
 *
 * Invariante: **nada se oculta por CSS**. El elemento nace visible en el HTML
 * y sigue visible aunque el JS no corra, falle a medias o el observador nunca
 * dispare. Solo este efecto puede ocultarlo, y únicamente en el instante en
 * que va a animarlo — y solo si aún está fuera de la pantalla.
 *
 * Garantía dura: ningún elemento queda por debajo de opacidad 1 más de ~1s
 * después de entrar al viewport. Tres redes: el observador, un vigilante que
 * revisa la posición, y un plazo máximo absoluto.
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

    // Menos movimiento, o navegador sin observador: no se toca nada. Estado
    // final desde el primer instante.
    if (
      typeof IntersectionObserver === "undefined" ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    // Lo que ya se ve (o casi) jamás se oculta: evita parpadeos arriba del todo.
    if (el.getBoundingClientRect().top < window.innerHeight * 1.05) return;

    // A partir de aquí sí se oculta — un solo frame antes de animarlo.
    el.style.willChange = "opacity, transform";
    el.style.opacity = "0";
    el.style.transform = "translateY(12px)";
    el.style.transition = `opacity ${DUR}ms ${EASE} ${delay}ms, transform ${DUR}ms ${EASE} ${delay}ms`;

    let done = false;
    const show = () => {
      if (done) return;
      done = true;
      el.style.opacity = "";
      el.style.transform = "";
      // Se limpia la transición para no dejar contexto de apilamiento vivo
      // (rompería mix-blend-difference de los pies de figura).
      window.setTimeout(() => {
        el.style.transition = "";
        el.style.willChange = "";
      }, DUR + delay + 120);
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);

    // Vigilante: si el elemento está en pantalla y sigue oculto, se muestra.
    // Cubre a iOS Safari cuando el observador no dispara tras el scroll.
    const watch = window.setInterval(() => {
      if (done) return;
      const r = el.getBoundingClientRect();
      if (r.top < window.innerHeight && r.bottom > 0) show();
    }, 400);

    // Red final: pase lo que pase, nada permanece oculto indefinidamente.
    const cap = window.setTimeout(show, 6000);

    return () => {
      io.disconnect();
      window.clearInterval(watch);
      window.clearTimeout(cap);
      show();
    };
  }, [delay]);

  return (
    <Tag ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>} className={className}>
      {children}
    </Tag>
  );
}
