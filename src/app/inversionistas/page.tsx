import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = { title: "Ruella · Inversionistas" };

export default function InversionistasPage() {
  return <Perfil perfil="inversionistas" />;
}
