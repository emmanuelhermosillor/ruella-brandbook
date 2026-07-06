import { NextResponse } from "next/server";
import { Resend } from "resend";

const ROLES = new Set(["investor", "broker", "developer"]);
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const ROLE_LABEL: Record<string, string> = {
  investor: "Inversionista / Investor",
  broker: "Broker",
  developer: "Desarrollador / Developer",
};

type Payload = {
  name?: unknown;
  email?: unknown;
  role?: unknown;
  message?: unknown;
  lang?: unknown;
};

function str(v: unknown, max = 2000): string {
  return typeof v === "string" ? v.trim().slice(0, max) : "";
}

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = str(body.name, 160);
  const email = str(body.email, 200);
  const role = str(body.role, 32);
  const message = str(body.message, 4000);
  const lang = str(body.lang, 4) || "es";

  if (!name || !EMAIL_RE.test(email) || !ROLES.has(role)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }

  const inbox = process.env.ACCESS_INBOX;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ACCESS_FROM || "Ruella <onboarding@resend.dev>";

  const text = [
    "Nueva solicitud de acceso — Ruella",
    "",
    `Nombre:  ${name}`,
    `Correo:  ${email}`,
    `Perfil:  ${ROLE_LABEL[role] ?? role}`,
    `Idioma:  ${lang}`,
    "",
    "Mensaje:",
    message || "—",
  ].join("\n");

  // No credentials configured (e.g. local dev): log and succeed so the flow works.
  if (!apiKey || !inbox) {
    console.warn("[access] RESEND_API_KEY / ACCESS_INBOX not set — request not emailed:\n" + text);
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to: inbox,
      replyTo: email,
      subject: `Acceso · Ruella — ${name} (${role})`,
      text,
    });
    if (error) {
      console.error("[access] resend error", error);
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[access] unexpected error", err);
    return NextResponse.json({ ok: false, error: "server_error" }, { status: 500 });
  }
}
