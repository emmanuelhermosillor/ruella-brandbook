export type Consent = "granted" | "denied" | null;

const KEY = "ruella-consent";
export const CONSENT_EVENT = "ruella-consent-change";

/** Current analytics consent, or null if the visitor hasn't chosen yet. */
export function getConsent(): Consent {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(KEY);
  return v === "granted" || v === "denied" ? v : null;
}

/** Persist the choice and notify listeners (banner + analytics) live. */
export function setConsent(v: "granted" | "denied") {
  try {
    localStorage.setItem(KEY, v);
  } catch {
    /* storage blocked — the choice simply won't persist across reloads */
  }
  window.dispatchEvent(new Event(CONSENT_EVENT));
}
