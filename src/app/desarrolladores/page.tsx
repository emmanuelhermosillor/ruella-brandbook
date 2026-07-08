import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = { title: "Ruella · Desarrolladores" };

export default function DesarrolladoresPage() {
  return <Perfil perfil="desarrolladores" />;
}
