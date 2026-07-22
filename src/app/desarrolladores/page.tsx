import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = {
  title: "For developers · Ruella",
  description:
    "Early absorption with your public pricing untouched, and a commercial system with rules and real reporting.",
  alternates: { canonical: "/desarrolladores", languages: { en: "/desarrolladores", es: "/desarrolladores?lang=es" } },
};

export default function DesarrolladoresPage() {
  return <Perfil perfil="desarrolladores" />;
}
