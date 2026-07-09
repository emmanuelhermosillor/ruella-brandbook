import { Body, Container, Head, Html, Img, Preview, Section } from "@react-email/components";
import * as React from "react";

// Paleta Galería + fallbacks web-safe (Cormorant→serif, Manrope→sans, Plex→mono).
export const c = {
  galeria: "#F6F5F1",
  grafito: "#1A1B18",
  salvia: "#7B8A6F",
  piedra: "#B9B6AC",
  linea: "#DCDAD0",
};
export const serif = "Georgia, 'Times New Roman', serif";
export const sans = "Helvetica, Arial, sans-serif";
export const mono = "'Courier New', Courier, monospace";

export const RINGMARK_URL = "https://ruella.mx/img/ringmark.png";

export function Shell({
  preview,
  children,
  footer,
}: {
  preview?: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <Html>
      <Head />
      {preview ? <Preview>{preview}</Preview> : null}
      <Body style={{ backgroundColor: c.galeria, margin: 0, padding: "40px 16px", fontFamily: sans }}>
        <Container
          style={{
            maxWidth: 560,
            margin: "0 auto",
            backgroundColor: c.galeria,
            border: `1px solid ${c.piedra}`,
            padding: "48px 44px",
          }}
        >
          <Img src={RINGMARK_URL} width="46" height="46" alt="Ruella" style={{ display: "block" }} />
          <Section style={{ marginTop: 34 }}>{children}</Section>
          <Section style={{ marginTop: 40, borderTop: `1px solid ${c.linea}`, paddingTop: 18 }}>{footer}</Section>
        </Container>
      </Body>
    </Html>
  );
}

// Pie mono/small, color piedra, con link opcional a privacidad.
export function FootNote({ text, link }: { text: string; link?: { label: string; href: string } }) {
  return (
    <p style={{ margin: 0, fontFamily: mono, fontSize: 11, lineHeight: "18px", color: c.piedra, letterSpacing: "0.04em" }}>
      {text}
      {link ? (
        <>
          {" "}
          <a href={link.href} style={{ color: c.piedra, textDecoration: "underline" }}>
            {link.label}
          </a>
        </>
      ) : null}
    </p>
  );
}
