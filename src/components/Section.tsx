import { ReactNode } from "react";

/**
 * Ritmo vertical de la casa. Dos medidas, derivadas del 130px original:
 * - estándar: 56 en móvil · 84 en desktop (entre dos secciones: 168, no 260)
 * - `air`: para las secciones ceremoniales (La Casa, El Respaldo), 68 · 104
 * El aire mayor vive ENTRE secciones; dentro, el encabezado se queda cerca
 * de su propio contenido.
 */
export function Section({
  id,
  children,
  dark = false,
  air = false,
  className = "",
}: {
  id?: string;
  children: ReactNode;
  dark?: boolean;
  air?: boolean;
  className?: string;
}) {
  const pad = air ? "py-[68px] md:py-[104px]" : "py-[56px] md:py-[84px]";
  return (
    <section id={id} className={`${dark ? "bg-grafito text-galeria" : ""} ${pad} ${className}`}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">{children}</div>
    </section>
  );
}
