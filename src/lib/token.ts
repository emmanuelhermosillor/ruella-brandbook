import crypto from "crypto";

/**
 * Application token — a stateless magic-link credential (no database).
 * Format: base64url(payload) + "." + base64url(HMAC-SHA256(secret, payloadB64)).
 * Verified purely by signature + expiry. Carries the little the survey step needs.
 *
 * Note: `name` is included beyond {email, role, lang, exp} so Correo 3 and the
 * "Aplicaciones" row can show who applied without a lookup. It is the applicant's
 * own data in their own emailed link (standard magic-link practice).
 */
export type TokenPayload = {
  name: string;
  email: string;
  role: "investor" | "broker" | "developer";
  lang: "es" | "en";
  exp: number; // epoch ms
};

const SECRET =
  process.env.TOKEN_SECRET || "ruella-dev-secret-change-me-in-prod";
const TTL_MS = 14 * 24 * 60 * 60 * 1000; // 14 días

function b64url(input: Buffer | string): string {
  return Buffer.from(input).toString("base64url");
}

function sign(bodyB64: string): string {
  return crypto.createHmac("sha256", SECRET).update(bodyB64).digest("base64url");
}

export function createToken(p: Omit<TokenPayload, "exp"> & { exp?: number }): string {
  const payload: TokenPayload = { ...p, exp: p.exp ?? Date.now() + TTL_MS };
  const body = b64url(JSON.stringify(payload));
  return `${body}.${sign(body)}`;
}

export function verifyToken(token: unknown): TokenPayload | null {
  if (typeof token !== "string" || !token.includes(".")) return null;
  const [body, sig] = token.split(".");
  if (!body || !sig) return null;

  const expected = sign(body);
  const a = Buffer.from(sig);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;

  try {
    const p = JSON.parse(Buffer.from(body, "base64url").toString()) as TokenPayload;
    if (!p || typeof p.exp !== "number" || Date.now() > p.exp) return null;
    if (!p.email || !p.role) return null;
    return p;
  } catch {
    return null;
  }
}
