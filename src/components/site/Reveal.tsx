"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Movimiento Galería: un solo gesto para todo el sitio.
 *
 * Regla de seguridad primero: el contenido nace VISIBLE. La animación solo
 * existe si <html> lleva la clase `reveal-on`, que el script del layout pone
 * únicamente cuando el navegador soporta IntersectionObserver y el usuario no
 * pidió menos movimiento. Sin JS, con JS lento o con un observador que falle,
 * el sitio se lee igual — nunca una página en blanco.
 *
 * El bloque entra con fundido y 12px de recorrido, una sola vez. Solo opacity
 * y transform: el CLS se queda en 0.
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
    if (!el) return;
    if (!document.documentElement.classList.contains("reveal-on")) return;

    const show = () => el.classList.add("is-in");

    // Lo que ya está en pantalla entra de inmediato.
    if (el.getBoundingClientRect().top < window.innerHeight * 0.92) {
      show();
      return;
    }

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          show();
          io.disconnect();
        }
      },
      { threshold: 0.18, rootMargin: "0px 0px -5% 0px" },
    );
    io.observe(el);

    // Respaldo: si en 2.5s nadie lo reveló, se revela solo.
    const t = window.setTimeout(show, 2500);
    return () => {
      window.clearTimeout(t);
      io.disconnect();
    };
  }, []);

  return (
    <Tag
      ref={ref as React.Ref<HTMLDivElement & HTMLLIElement>}
      className={`reveal ${className}`}
      style={{ transitionDelay: delay ? `${delay}ms` : undefined }}
    >
      {children}
    </Tag>
  );
}
