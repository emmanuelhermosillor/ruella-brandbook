/**
 * Ruella · CRM — Webhook de Admisiones
 * Apps Script BOUND al Google Sheet del CRM (RUELLA_CRM_Asesores_v1).
 *
 * Qué hace: recibe el POST del sitio (/api/access) y añade una fila a la
 * pestaña "Admisiones" — columnas A–H desde el formulario + ESTADO="Nuevo" (col. I).
 * Los encabezados de Admisiones viven en la FILA 3; los datos empiezan en la fila 4.
 * appendRow escribe después de la última fila con contenido, así que respeta esa estructura.
 *
 * Deploy: Extensiones → Apps Script → pegar → Implementar → Nueva implementación
 * → tipo "Aplicación web" → Ejecutar como: yo · Acceso: Cualquier persona → copiar URL.
 * Esa URL es el valor de la env var SHEETS_WEBHOOK_URL en Vercel.
 *
 * Seguridad opcional: en Configuración del proyecto → Propiedades del script,
 * crear WEBHOOK_TOKEN con un valor secreto. Si existe, el sitio debe mandar
 * el mismo valor en el campo "token" del JSON (añadirlo en route.ts).
 */

var SHEET_NAME = 'Admisiones';

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);

    var expected = PropertiesService.getScriptProperties().getProperty('WEBHOOK_TOKEN');
    if (expected && data.token !== expected) {
      return json_({ ok: false, error: 'unauthorized' });
    }

    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(SHEET_NAME);
    if (!sheet) return json_({ ok: false, error: 'sheet_not_found' });

    sheet.appendRow([
      String(data.timestamp || new Date()),          // A · MARCA TEMPORAL (hora de México, la manda el sitio)
      String(data.name || ''),                       // B · NOMBRE
      String(data.email || ''),                      // C · CORREO
      String(data.phone || ''),                      // D · TELÉFONO
      String(data.role || ''),                       // E · SOY
      String(data.message || ''),                    // F · MENSAJE
      String(data.lang || 'es').toUpperCase(),       // G · IDIOMA
      String(data.origen || 'Sitio'),                // H · ORIGEN
      'Nuevo',                                       // I · ESTADO (default)
    ]);

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
