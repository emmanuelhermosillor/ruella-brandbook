import { render } from "@react-email/render";
import { writeFileSync, mkdirSync } from "node:fs";
import { Applicant } from "../src/emails/Applicant";
import { InternalGate } from "../src/emails/InternalGate";
import { InternalSurvey } from "../src/emails/InternalSurvey";

const out = "/private/tmp/claude-501/ruella-emails";
mkdirSync(out, { recursive: true });

async function main() {
  const url = "https://ruella.mx/aplicacion?token=demo.sig";

  writeFileSync(`${out}/1-applicant-es.html`, await render(Applicant({ name: "María Fernanda Ruiz", lang: "es", actionUrl: url })));
  writeFileSync(`${out}/1-applicant-en.html`, await render(Applicant({ name: "James Whitfield", lang: "en", actionUrl: url })));
  writeFileSync(`${out}/2-internal-gate.html`, await render(InternalGate({
    timestamp: "2026-07-08 18:40:12", name: "María Fernanda Ruiz", email: "mf.ruiz@example.com",
    phone: "+52 322 000 0000", roleLabel: "Broker / Asesor", langLabel: "ES", origen: "Sitio · ig-bio",
    message: "Trabajo el segmento alto en Los Cabos y tengo clientes buscando algo de este calibre.",
  })));
  writeFileSync(`${out}/3-internal-survey.html`, await render(InternalSurvey({
    name: "María Fernanda Ruiz", email: "mf.ruiz@example.com", roleLabel: "Broker / Asesor",
    answers: [
      { q: "¿En qué plaza(s) operas hoy?", a: "Los Cabos" },
      { q: "¿Cuántos años llevas en el segmento alto?", a: "8 a 15" },
      { q: "¿En qué rango cerraron tus últimas operaciones?", a: "1 a 3 M USD" },
      { q: "¿Tienes hoy clientes buscando algo de este calibre?", a: "Sí, activos" },
      { q: "¿Operas con agencia o independiente?", a: "Con agencia — Coldwell Banker Riveras" },
      { q: "¿Quién te habló de Ruella?", a: "Un colega en una mesa de Los Cabos" },
    ],
  })));

  console.log("wrote HTML to", out);
}
main();
