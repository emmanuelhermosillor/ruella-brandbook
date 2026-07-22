import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = {
  title: "For buyers & investors · Ruella",
  description:
    "Curated opportunities you won't find listed, opened early — with a body of work behind them.",
  alternates: { canonical: "/inversionistas", languages: { en: "/inversionistas", es: "/inversionistas?lang=es" } },
};

export default function InversionistasPage() {
  return <Perfil perfil="inversionistas" />;
}
