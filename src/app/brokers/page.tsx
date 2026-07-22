import type { Metadata } from "next";
import { Perfil } from "@/components/site/Perfil";

export const metadata: Metadata = {
  title: "For agents & brokerages · Ruella",
  description:
    "Inventory no one else holds, your commission whole, your client under your name. Entry by invitation.",
  alternates: { canonical: "/brokers", languages: { en: "/brokers", es: "/brokers?lang=es" } },
};

export default function BrokersPage() {
  return <Perfil perfil="brokers" />;
}
