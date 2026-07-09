import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = { title: "Desarrolladores · Ruella" };

export default function DesarrolladoresPage() {
  return <Perfil perfil="desarrolladores" />;
}
