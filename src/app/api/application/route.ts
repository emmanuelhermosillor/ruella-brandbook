import { NextResponse } from "next/server";
import { Resend } from "resend";
import { render } from "@react-email/render";
import { verifyToken } from "@/lib/token";
import { InternalSurvey } from "@/emails/InternalSurvey";

const ROLE_LABEL: Record<string, string> = {
  investor: "Inversionista",
  broker: "Broker / Asesor",
  developer: "Desarrollador",
};

function mexicoCityTimestamp(): string {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Mexico_City",
    year: "numeric", month: "2-digit", day: "2-digit",
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false,
  }).formatToParts(new Date());
  const get = (t: string) => parts.find((p) => p.type === t)?.value ?? "";
  return `${get("year")}-${get("month")}-${get("day")} ${get("hour")}:${get("minute")}:${get("second")}`;
}

// Rate limit básico por IP.
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 8;
const hits = new Map<string, { count: number; start: number }>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const e = hits.get(ip);
  if (!e || now - e.start > WINDOW_MS) {
    hits.set(ip, { count: 1, start: now });
    return false;
  }
  e.count += 1;
  return e.count > MAX_PER_WINDOW;
}

type Answer = { q: string; a: string };
type Delivery = "ok" | "fail" | "skip";

async function appendSurvey(payload: object): Promise<Delivery> {
  const url = process.env.SHEETS_WEBHOOK_URL;
  if (!url) {
    console.warn("[application] SHEETS_WEBHOOK_URL not set — survey not appended");
    return "skip";
  }
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });
    if (!res.ok) {
      console.error("[application] sheets webhook responded", res.status);
      return "fail";
    }
    return "ok";
  } catch (err) {
    console.error("[application] sheets webhook error", err);
    return "fail";
  }
}

async function emailSurvey(args: {
  name: string; email: string; roleLabel: string; answers: Answer[];
}): Promise<Delivery> {
  const inbox = process.env.ACCESS_INBOX;
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.ACCESS_FROM || "Ruella <onboarding@resend.dev>";
  if (!apiKey || !inbox) {
    console.warn("[application] RESEND_API_KEY / ACCESS_INBOX not set — email not sent");
    return "skip";
  }
  try {
    const resend = new Resend(apiKey);
    const html = await render(InternalSurvey(args));
    const { error } = await resend.emails.send({
      from,
      to: inbox,
      replyTo: args.email,
      subject: `Aplicación completa · ${args.name} — ${args.roleLabel}`,
      html,
    });
    if (error) {
      console.error("[application] resend error", error);
      return "fail";
    }
    return "ok";
  } catch (err) {
    console.error("[application] resend unexpected error", err);
    return "fail";
  }
}

export async function POST(req: Request) {
  const ip = (req.headers.get("x-forwarded-for") ?? "unknown").split(",")[0].trim();
  if (rateLimited(ip)) {
    return NextResponse.json({ ok: false, error: "rate_limited" }, { status: 429 });
  }

  let body: { token?: unknown; answers?: unknown };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const payload = verifyToken(body.token);
  if (!payload) {
    return NextResponse.json({ ok: false, error: "invalid_token" }, { status: 403 });
  }

  if (!Array.isArray(body.answers)) {
    return NextResponse.json({ ok: false, error: "invalid_fields" }, { status: 422 });
  }
  const answers: Answer[] = body.answers
    .slice(0, 6)
    .map((it) => ({
      q: typeof (it as Answer)?.q === "string" ? (it as Answer).q.slice(0, 300) : "",
      a: typeof (it as Answer)?.a === "string" ? (it as Answer).a.slice(0, 1000) : "",
    }))
    .filter((it) => it.q);

  const roleLabel = ROLE_LABEL[payload.role] ?? payload.role;

  const [sheet, email] = await Promise.all([
    appendSurvey({
      kind: "survey",
      timestamp: mexicoCityTimestamp(),
      name: payload.name,
      email: payload.email,
      role: roleLabel,
      lang: payload.lang,
      answers,
    }),
    emailSurvey({ name: payload.name, email: payload.email, roleLabel, answers }),
  ]);

  const configured = [sheet, email].filter((r) => r !== "skip");
  const anyOk = sheet === "ok" || email === "ok";
  if (configured.length > 0 && !anyOk) {
    return NextResponse.json({ ok: false, error: "delivery_failed" }, { status: 502 });
  }
  return NextResponse.json({ ok: true, sheet: sheet === "ok", email: email === "ok" });
}
