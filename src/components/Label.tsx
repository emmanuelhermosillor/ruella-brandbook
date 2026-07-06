import { ReactNode } from "react";
export function Label({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <span className={`font-mono text-[11px] tracking-label uppercase text-salvia-dark ${className}`}>{children}</span>;
}
