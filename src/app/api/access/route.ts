import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { createToken } from "@/lib/token";
import { Applicant } from "@/emails/Applicant";
import { InternalGate } from "@/emails/InternalGate";

const ROLES = new Set(["investor", "broker", "developer"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+\d{8,18}$/;
const SITE_URL = "https://ruella.mx";

const ROLE_LABEL: Record<string, string> = {
  investor: "Inversionista",
  broker: "Broker / Asesor",
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
  company?: unknown; // honeypot
  turnstileToken?: unknown;
  ref?: unknown;
};

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

function mexicoCityTimestamp(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
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

/** Turnstile server-side. Solo valida si TURNSTILE_SECRET_KEY existe. */
async function turnstileOk(token: string, ip: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // no configurado → no bloquea (dev)
  try {
    const body = new URLSearchParams({ secret, response: token || "", remoteip: ip });
    const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    });
    const data = (await res.json()) as { success?: boolean };
    return Boolean(data.success);
  } catch (err) {
    console.error("[access] turnstile verify error", err);
    return false;
  }
}

type Delivery = "ok" | "fail" | "skip";

type Row = {
  timestamp: string;
  name: string;
  email: string;
  phone: string;
  roleKey: string;
  roleLabel: string;
  message: string;
  lang: "es" | "en";
  ref: string;
};

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
      body: JSON.stringify({
        kind: "gate",
        timestamp: row.timestamp,
        name: row.name,
        email: row.email,
        phone: row.phone,
        role: row.roleLabel,
        message: row.message,
        lang: row.lang,
        ref: row.ref || undefined,
      }),
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

async function sendEmails(row: Row, actionUrl: string): Promise<Delivery> {
  const inbox = process.env.ACCESS_INBOX;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ACCESS_FROM || "Ruella <onboarding@resend.dev>";
  if (!apiKey || !inbox) {
    console.warn("[access] RESEND_API_KEY / ACCESS_INBOX not set — emails not sent");
    return "skip";
  }
  try {
    const resend = new Resend(apiKey);
    const origen = row.ref ? `Sitio · ${row.ref}` : "Sitio";

    const applicantHtml = await render(
      Applicant({ name: row.name, lang: row.lang, actionUrl })
    );
    const internalHtml = await render(
      InternalGate({
        timestamp: row.timestamp,
        name: row.name,
        email: row.email,
        phone: row.phone,
        roleLabel: row.roleLabel,
        langLabel: row.lang.toUpperCase(),
        origen,
        message: row.message,
      })
    );

    const [applicant, internal] = await Promise.all([
      resend.emails.send({
        from,
        to: row.email,
        subject: row.lang === "en" ? "Your application to Ruella" : "Tu solicitud en Ruella",
        html: applicantHtml,
      }),
      resend.emails.send({
        from,
        to: inbox,
        replyTo: row.email,
        subject: `Acceso · ${row.name} — ${row.roleLabel}`,
        html: internalHtml,
      }),
    ]);

    if (applicant.error) console.error("[access] applicant email error", applicant.error);
    if (internal.error) console.error("[access] internal email error", internal.error);
    return applicant.error && internal.error ? "fail" : "ok";
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

  // Honeypot: bot llenó el campo oculto → 200 sin procesar.
  if (str(body.company, 200)) {
    return NextResponse.json({ ok: true });
  }

  const name = str(body.name, 160);
  const email = str(body.email, 200);
  const phone = str(body.phone, 40);
  const roleKey = str(body.role, 32);
  const message = str(body.message, 4000);
  const lang = str(body.lang, 4) === "en" ? "en" : "es";
  const consent = body.consent === true || body.consent === "on";
  const ref = str(body.ref, 120);

  if (
    !name ||
    !EMAIL_RE.test(email) ||
    !PHONE_RE.test(phone) ||
    !ROLES.has(roleKey) ||
    !message ||
    !consent
  ) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  // Turnstile (si está configurado). Token inválido → 403.
  if (!(await turnstileOk(str(body.turnstileToken, 3000), ip))) {
    return NextResponse.json({ ok: false, error: "challenge_failed" }, { status: 403 });
  }

  const row: Row = {
    timestamp: mexicoCityTimestamp(),
    name,
    email,
    phone,
    roleKey,
    roleLabel: ROLE_LABEL[roleKey] ?? roleKey,
    message,
    lang,
    ref,
  };

  // Token de aplicación (14 días) → enlace del Correo 1.
  const token = createToken({ name, email, role: roleKey as "investor" | "broker" | "developer", lang });
  const actionUrl = `${SITE_URL}/aplicacion?token=${encodeURIComponent(token)}`;

  const [sheet, emails] = await Promise.all([appendToAdmisiones(row), sendEmails(row, actionUrl)]);

  const configured = [sheet, emails].filter((r) => r !== "skip");
  const anyOk = sheet === "ok" || emails === "ok";
  if (configured.length > 0 && !anyOk) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sheet: sheet === "ok", emails: emails === "ok" });
}
