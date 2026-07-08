import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = { title: "Ruella · Brokers" };

export default function BrokersPage() {
  return <Perfil perfil="brokers" />;
}
