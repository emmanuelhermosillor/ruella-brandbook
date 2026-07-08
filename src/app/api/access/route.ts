import { NextResponse } from "next/server";
import { Resend } from "resend";

const ROLES = new Set(["investor", "broker", "developer"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_LABEL: Record<string, string> = {
  investor: "Inversionista",
  broker: "Broker",
  developer: "Desarrollador",
};

type Payload = {
  name?: unknown;
  email?: unknown;
  phone?: unknown;
  role?: unknown;
  message?: unknown;
  lang?: unknown;
  consent?: unknown;
  company?: unknown; // honeypot — humans never see or fill this field
};

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

/** Timestamp legible en hora de Ciudad de México: "2026-07-08 12:34:56". */
function mexicoCityTimestamp(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

// Rate limit básico por IP (mejor esfuerzo en serverless: vive por instancia).
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; start: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now - entry.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

type Row = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  message: string;
  lang: string;
};

// "skip" = destino no configurado (p. ej. local sin env vars) → no cuenta como fallo.
// "ok" = entregado · "fail" = configurado pero falló.
type Delivery = "ok" | "fail" | "skip";

/** Fila para Admisiones (A–H); el Apps Script añade ESTADO="Nuevo". */
async function appendToAdmisiones(row: Row): Promise<Delivery> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[access] SHEETS_WEBHOOK_URL not set — row not appended");
    return "skip";
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...row, origen: "Sitio" }),
      // Apps Script responde con redirect 302 hacia el resultado.
      redirect: "follow",
    });
    if (!res.ok) {
      console.error("[access] sheets webhook responded", res.status);
      return "fail";
    }
    return "ok";
  } catch (err) {
    console.error("[access] sheets webhook error", err);
    return "fail";
  }
}

async function emailTheHouse(row: Row): Promise<Delivery> {
  const inbox = process.env.ACCESS_INBOX;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ACCESS_FROM || "Ruella <onboarding@resend.dev>";
  const text = [
    "Nueva solicitud de acceso — Ruella",
    "",
    `Fecha:    ${row.timestamp} (CDMX)`,
    `Nombre:   ${row.name}`,
    `Correo:   ${row.email}`,
    `Teléfono: ${row.phone || "—"}`,
    `Perfil:   ${row.role}`,
    `Idioma:   ${row.lang.toUpperCase()}`,
    "",
    "Mensaje:",
    row.message || "—",
  ].join("\n");

  if (!apiKey || !inbox) {
    console.warn("[access] RESEND_API_KEY / ACCESS_INBOX not set — request not emailed:\n" + text);
    return "skip";
  }
  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: inbox,
      replyTo: row.email,
      subject: `Acceso · Ruella — ${row.name} (${row.role})`,
      text,
    });
    if (error) {
      console.error("[access] resend error", error);
      return "fail";
    }
    return "ok";
  } catch (err) {
    console.error("[access] resend unexpected error", err);
    return "fail";
  }
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  // Honeypot: si un bot llenó el campo oculto, respondemos 200 sin procesar.
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 160);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const role = str(body.role, 32);
  const message = str(body.message, 4000);
  const lang = str(body.lang, 4) === "en" ? "en" : "es";
  const consent = body.consent === true || body.consent === "on";

  if (!name || !EMAIL_RE.test(email) || !ROLES.has(role) || !consent) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const row: Row = {
    timestamp: mexicoCityTimestamp(),
    name,
    email,
    phone,
    role: ROLE_LABEL[role] ?? role,
    message,
    lang,
  };

  // Dos destinos en paralelo: fila en Admisiones + correo a la casa.
  // Redundancia deliberada: si el Sheet falla, el correo igual entra.
  const [sheetResult, emailResult] = await Promise.all([appendToAdmisiones(row), emailTheHouse(row)]);

  // 502 solo si algún destino estaba configurado y TODOS los configurados fallaron.
  // Si nada está configurado (local sin env vars) degradamos con log → ok.
  const configured = [sheetResult, emailResult].filter((r) => r !== "skip");
  const anyOk = sheetResult === "ok" || emailResult === "ok";
  if (configured.length > 0 && !anyOk) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sheet: sheetResult === "ok", email: emailResult === "ok" });
}
