import type { Metadata } from "next";
import { verifyToken } from "@/lib/token";
import { Aplicacion } from "@/components/site/Aplicacion";

export const metadata: Metadata = {
  title: "Tu aplicación · Ruella",
  robots: { index: false, follow: false },
};

export default async function AplicacionPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const { token } = await searchParams;
  const payload = verifyToken(token);

  if (!payload) {
    return <Aplicacion />;
  }
  return <Aplicacion token={token} role={payload.role} tokenLang={payload.lang} />;
}
