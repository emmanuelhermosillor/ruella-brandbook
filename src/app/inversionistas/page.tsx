import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = { title: "Inversionistas · Ruella" };

export default function InversionistasPage() {
  return <Perfil perfil="inversionistas" />;
}
