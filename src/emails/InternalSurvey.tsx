import { Hr } from "@react-email/components";
import * as React from "react";
import { Shell, FootNote, c, serif, sans, mono } from "./_shell";

export type SurveyEmailProps = {
  name: string;
  email: string;
  roleLabel: string;
  answers: { q: string; a: string }[];
};

// Correo 3 — interno a la casa: aplicación completa. Siempre en español.
export function InternalSurvey({ name, email, roleLabel, answers }: SurveyEmailProps) {
  const meta = { fontFamily: mono, fontSize: 11, letterSpacing: "0.08em", color: c.piedra, margin: "0 0 4px" } as const;
  return (
    <Shell
      preview="Aplicación completa"
      footer={<FootNote text="Respuestas registradas en la pestaña Aplicaciones. · Ruella · Quietly first." />}
    >
      <p style={{ margin: "0 0 20px", fontFamily: serif, fontSize: 22, lineHeight: "28px", color: c.grafito }}>
        Aplicación completa
      </p>
      <p style={meta}>{name}</p>
      <p style={meta}>{email}</p>
      <p style={{ ...meta, marginBottom: 0 }}>{roleLabel}</p>

      <Hr style={{ borderColor: c.linea, margin: "22px 0 6px" }} />

      <table cellPadding={0} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {answers.map((it, i) => (
            <tr key={i}>
              <td style={{ padding: "14px 0", borderBottom: `1px solid ${c.linea}` }}>
                <p style={{ margin: "0 0 6px", fontFamily: mono, fontSize: 11, letterSpacing: "0.06em", color: c.piedra }}>
                  {it.q}
                </p>
                <p style={{ margin: 0, fontFamily: sans, fontSize: 15, lineHeight: "23px", color: c.grafito, whiteSpace: "pre-wrap" }}>
                  {it.a || "—"}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Shell>
  );
}

export default InternalSurvey;
