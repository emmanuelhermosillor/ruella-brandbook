import { Hr } from "@react-email/components";
import * as React from "react";
import { Shell, FootNote, c, serif, sans, mono } from "./_shell";

export type GateFields = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  roleLabel: string;
  langLabel: string; // "ES" | "EN"
  origen: string; // "Sitio" o "Sitio · <ref>"
  message: string;
};

// Correo 2 — interno a la casa. Siempre en español.
export function InternalGate(f: GateFields) {
  const rows: [string, string][] = [
    ["Fecha", `${f.timestamp} (CDMX)`],
    ["Nombre", f.name],
    ["Correo", f.email],
    ["Teléfono", f.phone || "—"],
    ["Perfil", f.roleLabel],
    ["Idioma", f.langLabel],
    ["Origen", f.origen],
  ];
  const label = { fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: c.piedra, padding: "6px 0", verticalAlign: "top", width: 96 } as const;
  const value = { fontFamily: sans, fontSize: 14, lineHeight: "22px", color: c.grafito, padding: "6px 0" } as const;
  return (
    <Shell
      preview="Nueva solicitud de acceso"
      footer={<FootNote text="Registro en Admisiones: fila añadida automáticamente. · Ruella · Quietly first." />}
    >
      <p style={{ margin: "0 0 22px", fontFamily: serif, fontSize: 22, lineHeight: "28px", color: c.grafito }}>
        Nueva solicitud de acceso
      </p>
      <table cellPadding={0} cellSpacing={0} style={{ width: "100%", borderCollapse: "collapse" }}>
        <tbody>
          {rows.map(([k, v]) => (
            <tr key={k}>
              <td style={label}>{k}</td>
              <td style={value}>{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <Hr style={{ borderColor: c.linea, margin: "24px 0 18px" }} />
      <p style={{ margin: "0 0 8px", fontFamily: mono, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: c.piedra }}>
        Mensaje
      </p>
      <p style={{ margin: 0, fontFamily: serif, fontSize: 16, lineHeight: "26px", color: c.grafito, whiteSpace: "pre-wrap" }}>
        {f.message || "—"}
      </p>
    </Shell>
  );
}

export default InternalGate;
