/**
 * Ruella · Apps Script v3 — Webhook de Admisiones + Aplicaciones
 * Script BOUND al Sheet CRM de Ruella (id 19SNyQKKh_qiSADhI5Qa0eTPMYqN-yXbkGA-X-fp0LjY).
 *
 * v3 añade sobre v2:
 *  - Soporta dos tipos de payload vía `kind`:
 *      "gate"   → fila en "Admisiones" (como v2, ahora con ref/UTM en ORIGEN)
 *      "survey" → fila en la pestaña "Aplicaciones" (respuestas de la encuesta)
 *  - Crea la pestaña "Aplicaciones" con encabezados si no existe.
 *
 * DEPLOY: Implementar → Administrar implementaciones → editar (lápiz) →
 * Nueva versión → Implementar. La URL /exec NO cambia.
 * Ejecutar como: yo · Acceso: cualquier persona.
 *
 * Seguridad: si defines WEBHOOK_TOKEN en Configuración del proyecto →
 * Propiedades del script, el POST debe traer el mismo valor en `token`.
 */

const SHEET_ADMISIONES = "Admisiones";
const SHEET_APLICACIONES = "Aplicaciones";
const HEADER_ROW_ADMISIONES = 3; // encabezados reales del CRM viven en la fila 3

/** Neutraliza inyección de fórmulas: prefija apóstrofo a =, +, -, @. */
function safe_(v) {
  const s = String(v == null ? "" : v);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function jsonOut_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}

function doPost(e) {
  try {
    const expected = PropertiesService.getScriptProperties().getProperty("WEBHOOK_TOKEN");
    const data = JSON.parse(e.postData.contents || "{}");
    if (expected && data.token !== expected) {
      return jsonOut_({ ok: false, error: "unauthorized" });
    }
    if (data.kind === "survey") return appendSurvey_(data);
    return appendGate_(data); // default: compatibilidad con el route.ts actual
  } catch (err) {
    return jsonOut_({ ok: false, error: String(err) });
  }
}

/** Admisiones — columnas A–K (encabezados en fila 3):
 *  A MARCA TEMPORAL · B NOMBRE · C CORREO · D TELÉFONO · E SOY · F MENSAJE
 *  G IDIOMA · H ORIGEN · I ESTADO · J ASIGNADO A · K NOTAS
 */
function appendGate_(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_ADMISIONES);
  if (!sheet) return jsonOut_({ ok: false, error: "sheet_not_found" });
  // ORIGEN: "Sitio" + referencia/UTM si el sitio la mandó (p. ej. "Sitio · ig-bio").
  const origen = data.ref ? "Sitio · " + safe_(data.ref) : "Sitio";
  sheet.appendRow([
    safe_(data.timestamp),
    safe_(data.name),
    safe_(data.email),
    safe_(data.phone),
    safe_(data.role),
    safe_(data.message),
    safe_(String(data.lang || "es").toUpperCase()),
    origen,
    "Nuevo",
  ]);
  return jsonOut_({ ok: true, sheet: SHEET_ADMISIONES });
}

/** Aplicaciones — una fila por encuesta completada:
 *  A MARCA TEMPORAL · B NOMBRE · C CORREO · D PERFIL · E IDIOMA
 *  F–K R1…R6 (cada celda: "Pregunta — Respuesta" legible) · L ESTADO
 *  Payload esperado: { kind:"survey", timestamp, name, email, role, lang,
 *                      answers: [{q:"…", a:"…"}, …] }  (máx. 6)
 */
function appendSurvey_(data) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(SHEET_APLICACIONES);
  if (!sheet) {
    sheet = ss.insertSheet(SHEET_APLICACIONES);
    sheet
      .getRange(1, 1, 1, 12)
      .setValues([[
        "MARCA TEMPORAL", "NOMBRE", "CORREO", "PERFIL", "IDIOMA",
        "R1", "R2", "R3", "R4", "R5", "R6", "ESTADO",
      ]])
      .setFontWeight("bold");
    sheet.setFrozenRows(1);
  }
  const answers = Array.isArray(data.answers) ? data.answers.slice(0, 6) : [];
  const cells = [];
  for (let i = 0; i < 6; i++) {
    const it = answers[i];
    cells.push(it ? safe_((it.q || "") + " — " + (it.a || "")) : "");
  }
  sheet.appendRow([
    safe_(data.timestamp),
    safe_(data.name),
    safe_(data.email),
    safe_(data.role),
    safe_(String(data.lang || "es").toUpperCase()),
    cells[0], cells[1], cells[2], cells[3], cells[4], cells[5],
    "Completa",
  ]);
  return jsonOut_({ ok: true, sheet: SHEET_APLICACIONES });
}
