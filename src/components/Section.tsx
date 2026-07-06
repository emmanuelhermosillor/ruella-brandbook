import { ReactNode } from "react";
export function Section({ id, children, dark = false, className = "" }: { id?: string; children: ReactNode; dark?: boolean; className?: string }) {
  return (
    <section id={id} className={`${dark ? "bg-grafito text-galeria" : ""} py-[130px] ${className}`}>
      <div className="mx-auto max-w-[1240px] px-6 md:px-12">{children}</div>
    </section>
  );
}
