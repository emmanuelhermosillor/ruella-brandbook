import { ReactNode } from "react";
export function Button({ children, href, type = "button", className = "" }: { children: ReactNode; href?: string; type?: "button" | "submit"; className?: string; }) {
  const cls = `inline-block font-mono text-[11px] tracking-[0.18em] uppercase bg-salvia hover:bg-salvia-dark text-white px-[22px] py-[13px] transition-colors ${className}`;
  return href ? <a href={href} className={cls}>{children}</a> : <button type={type} className={cls}>{children}</button>;
}
