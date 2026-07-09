import type { Metadata } from "next";
import { Privacidad } from "@/components/site/Privacidad";

export const metadata: Metadata = { title: "Aviso de privacidad · Ruella" };

export default function PrivacidadPage() {
  return <Privacidad />;
}
