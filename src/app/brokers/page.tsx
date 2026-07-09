import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = { title: "Brokers y Asesores · Ruella" };

export default function BrokersPage() {
  return <Perfil perfil="brokers" />;
}
