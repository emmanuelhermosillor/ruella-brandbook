import { Button, Img } from "@react-email/components";
import * as React from "react";
import { copy } from "@/content/copy";
import { Shell, FootNote, c, serif, sans } from "./_shell";

type Lang = "es" | "en";

const t = {
  es: {
    preview: "Tu solicitud en Ruella",
    p1: "Gracias por tu interés en Ruella. Tu solicitud ya está con nosotros y se revisa personalmente.",
    p2: "Antes de conversar, queremos conocerte un poco mejor: son unas cuantas preguntas, dos minutos.",
    button: "Completar mi solicitud",
    p3: "Te escribimos en unos días.",
    foot: "Recibiste este correo porque solicitaste acceso en ruella.mx.",
    privacy: "Aviso de privacidad",
  },
  en: {
    preview: "Your application to Ruella",
    p1: "Thank you for your interest in Ruella. Your request has been received and will be reviewed personally.",
    p2: "Before we speak, we'd like to learn a little more about you — a few short questions, two minutes at most.",
    button: "Complete your application",
    p3: "We'll be in touch within a few days.",
    foot: "You received this email because you requested access at ruella.mx.",
    privacy: "Privacy Notice",
  },
} as const;

export function Applicant({ name, lang, actionUrl }: { name: string; lang: Lang; actionUrl: string }) {
  const s = t[lang];
  const para = { margin: "0 0 20px", fontFamily: sans, fontSize: 15, lineHeight: "25px", color: c.grafito } as const;
  return (
    <Shell
      preview={s.preview}
      footer={<FootNote text={`${s.foot} ·`} link={{ label: s.privacy, href: "https://ruella.mx/privacidad" }} />}
    >
      {/* Una sola banda, muted. El correo se lee perfecto aunque el cliente la bloquee. */}
      <Img
        src="https://ruella.mx/img/email-band.jpg"
        alt={copy.figs.emailBand.alt[lang]}
        width="472"
        style={{ width: "100%", height: "auto", display: "block", border: `1px solid ${c.piedra}`, marginBottom: 32 }}
      />
      <p style={{ margin: "0 0 24px", fontFamily: serif, fontSize: 26, lineHeight: "32px", color: c.grafito }}>
        {name},
      </p>
      <p style={para}>{s.p1}</p>
      <p style={para}>{s.p2}</p>
      <Button
        href={actionUrl}
        style={{
          backgroundColor: c.salvia,
          color: c.galeria,
          fontFamily: sans,
          fontSize: 12,
          letterSpacing: "0.16em",
          textTransform: "uppercase",
          padding: "15px 30px",
          borderRadius: 2,
          display: "inline-block",
          margin: "8px 0 28px",
        }}
      >
        {s.button}
      </Button>
      <p style={{ ...para, marginBottom: 28 }}>{s.p3}</p>
      <p style={{ margin: 0, fontFamily: serif, fontSize: 16, color: c.grafito }}>
        Ruella · <span style={{ fontStyle: "italic" }}>Quietly first.</span>
      </p>
    </Shell>
  );
}

export default Applicant;
