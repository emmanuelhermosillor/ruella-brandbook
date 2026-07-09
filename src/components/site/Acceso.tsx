"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { Section } from "@/components/Section";
import { copy, type Lang } from "@/content/copy";
import { pinned, countries, defaultDial } from "@/lib/countries";
import { blur } from "@/lib/blur";
import { Turnstile } from "./Turnstile";

type Role = "investor" | "broker" | "developer";

/**
 * Atmósfera del gate: una imagen quieta y fija durante los 6 pasos; al llegar al
 * éxito, crossfade (500ms) a una imagen más cálida. La foto acompaña, no compite.
 */
function GateAtmosphere({ lang, done, variant }: { lang: Lang; done: boolean; variant: "desktop" | "mobile" }) {
  const wrap =
    variant === "desktop"
      ? "relative hidden h-full min-h-[560px] w-full overflow-hidden border border-linea md:block"
      : "relative h-[150px] w-full overflow-hidden border border-linea md:hidden";
  const sizes = variant === "desktop" ? "40vw" : "100vw";
  return (
    <figure className={wrap}>
      <Image
        src="/img/gate.jpg"
        alt={copy.figs.gate.alt[lang]}
        fill
        placeholder="blur"
        blurDataURL={blur.gate}
        sizes={sizes}
        className={`object-cover transition-opacity duration-500 ${done ? "opacity-0" : "opacity-100"}`}
        style={{ objectPosition: "center" }}
      />
      <Image
        src="/img/gate-success.jpg"
        alt={copy.figs.gateSuccess.alt[lang]}
        fill
        placeholder="blur"
        blurDataURL={blur.gateSuccess}
        sizes={sizes}
        className={`object-cover transition-opacity duration-500 ${done ? "opacity-100" : "opacity-0"}`}
        style={{ objectPosition: "center" }}
      />
      {/* Velo nácar sutil para que el caption y el borde respiren. */}
      <div className="pointer-events-none absolute inset-0" aria-hidden style={{ background: "linear-gradient(0deg, rgba(237,235,228,0.35) 0%, rgba(237,235,228,0) 45%)" }} />
      <figcaption className="absolute bottom-5 left-5 z-10 font-mono text-[10px] uppercase tracking-[0.22em] text-galeria/85 mix-blend-difference">
        {done ? copy.figs.gateSuccess.caption[lang] : copy.figs.gate.caption[lang]}
      </figcaption>
    </figure>
  );
}
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STEPS = ["name", "email", "phone", "role", "message", "consent"] as const;
type StepKey = (typeof STEPS)[number];
const ROLE_KEYS: Role[] = ["investor", "broker", "developer"];

const inputCls =
  "w-full border-b border-piedra bg-transparent pb-3 font-display text-[clamp(1.5rem,3vw,2rem)] font-light text-grafito outline-none transition-colors placeholder:text-piedra/70 focus-visible:border-grafito";
const noteCls = "mt-4 font-mono text-[11px] uppercase tracking-[0.18em] text-grafito/45";
const errorCls = "mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-salvia-dark";

export function Acceso({ lang, defaultRole }: { lang: Lang; defaultRole?: Role }) {
  const t = copy.acceso;
  const [step, setStep] = useState(0);
  const [done, setDone] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [dial, setDial] = useState(defaultDial(lang));
  const [phoneNat, setPhoneNat] = useState("");
  const [role, setRole] = useState<Role | "">(defaultRole ?? "");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");

  const companyRef = useRef<HTMLInputElement>(null); // honeypot
  const refRef = useRef<string>("");
  const started = useRef(false);
  const digits = phoneNat.replace(/\D/g, "");

  // Captura de referencia (?ref= / utm_*), primer valor visto, en sessionStorage.
  useEffect(() => {
    try {
      const p = new URL(window.location.href).searchParams;
      let ref = (p.get("ref") || "").trim();
      if (!ref && (p.get("utm_source") || p.get("utm_medium") || p.get("utm_campaign"))) {
        ref = `utm:${p.get("utm_source") || ""}/${p.get("utm_medium") || ""}/${p.get("utm_campaign") || ""}`;
      }
      const existing = sessionStorage.getItem("ruella-ref");
      if (existing) refRef.current = existing;
      else if (ref) {
        const v = ref.slice(0, 120);
        sessionStorage.setItem("ruella-ref", v);
        refRef.current = v;
      }
    } catch {
      /* no-op */
    }
  }, []);

  // Foco en el campo primario al cambiar de paso.
  const stageRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (done) return;
    const el = stageRef.current?.querySelector<HTMLElement>("[data-autofocus]");
    el?.focus();
  }, [step, done]);

  const markStart = useCallback(() => {
    if (!started.current) {
      started.current = true;
      track("gate_start");
    }
  }, []);

  function validate(i: number): string {
    const k: StepKey = STEPS[i];
    if (k === "name") return name.trim() ? "" : t.steps.name.error[lang];
    if (k === "email") return EMAIL_RE.test(email.trim()) ? "" : t.steps.email.error[lang];
    if (k === "phone") return dial && digits.length >= 8 && digits.length <= 15 ? "" : t.steps.phone.error[lang];
    if (k === "role") return role ? "" : t.steps.role.error[lang];
    if (k === "message") return message.trim() ? "" : t.steps.message.error[lang];
    if (k === "consent") return consent ? "" : t.steps.consent.error[lang];
    return "";
  }

  function goNext() {
    const err = validate(step);
    if (err) return setError(err);
    setError("");
    const ns = step + 1;
    setStep(ns);
    track("gate_step", { step: ns + 1 });
  }
  function goBack() {
    setError("");
    if (step > 0) setStep(step - 1);
  }

  async function submit() {
    const err = validate(STEPS.length - 1);
    if (err) return setError(err);
    setStatus("loading");
    setError("");
    track("gate_submit");
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          phone: `${dial}${digits}`,
          role,
          message: message.trim(),
          consent: true,
          lang,
          company: companyRef.current?.value || "",
          turnstileToken,
          ref: refRef.current || undefined,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
      track("gate_success");
    } catch {
      setStatus("error");
      setError(t.retry[lang]);
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== "Enter") return;
    const tag = (e.target as HTMLElement).tagName;
    if (tag === "TEXTAREA") return; // message: Enter = salto de línea
    e.preventDefault();
    if (step === STEPS.length - 1) submit();
    else goNext();
  }

  const isLast = step === STEPS.length - 1;
  const counter = `${String(step + 1).padStart(2, "0")} / ${String(STEPS.length).padStart(2, "0")}`;

  return (
    <Section id="acceso" className="border-t border-linea">
      <div className="grid gap-14 md:grid-cols-[1fr_0.68fr] md:items-stretch md:gap-20">
        {/* IZQUIERDA — la ceremonia, intacta. Banda de atmósfera solo en móvil. */}
        <div>
          <GateAtmosphere lang={lang} done={done} variant="mobile" />
          <div className="mt-10 max-w-[440px] md:mt-0">
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-grafito/50">{t.label[lang]}</p>
            <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight">
              {t.title[lang]}
            </h2>
            <p className="mt-7 font-body text-[16px] font-light leading-relaxed text-grafito/70">{t.body[lang]}</p>
          </div>

          <div className="mt-12 w-full max-w-[560px]">
          {done ? (
            <div className="gate-step self-start">
              <h3 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-medium leading-tight tracking-tight">
                {t.success.title[lang]}
              </h3>
              <p className="mt-6 max-w-[420px] font-body text-[17px] font-light leading-relaxed text-grafito/75">
                {t.success.body[lang]}
              </p>
            </div>
          ) : (
            <form
              onKeyDown={onKeyDown}
              onFocusCapture={markStart}
              onSubmit={(e) => e.preventDefault()}
              data-clarity-mask="true"
              className="min-h-[340px]"
            >
              {/* Honeypot: fuera de pantalla, nunca display:none */}
              <div aria-hidden style={{ position: "absolute", left: -9999, width: 1, height: 1, overflow: "hidden" }}>
                <label>
                  Company
                  <input ref={companyRef} type="text" name="company" tabIndex={-1} autoComplete="off" />
                </label>
              </div>

              <p className="font-mono text-[11px] tracking-[0.28em] text-piedra">{counter}</p>

              <div ref={stageRef} key={step} className="gate-step mt-8">
                {STEPS[step] === "name" && (
                  <>
                    <label htmlFor="g-name" className="block font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
                      {t.steps.name.q[lang]}
                    </label>
                    <input
                      id="g-name" data-autofocus name="name" autoComplete="name" data-clarity-mask="true"
                      value={name} onChange={(e) => setName(e.target.value)}
                      placeholder={t.steps.name.placeholder[lang]} className={`mt-8 ${inputCls}`}
                    />
                    <p className={noteCls}>{t.steps.name.note[lang]}</p>
                  </>
                )}

                {STEPS[step] === "email" && (
                  <>
                    <label htmlFor="g-email" className="block font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
                      {t.steps.email.q[lang]}
                    </label>
                    <input
                      id="g-email" data-autofocus name="email" type="email" inputMode="email" autoComplete="email" data-clarity-mask="true"
                      value={email} onChange={(e) => setEmail(e.target.value)}
                      placeholder={t.steps.email.placeholder[lang]} className={`mt-8 ${inputCls}`}
                    />
                    <p className={noteCls}>{t.steps.email.note[lang]}</p>
                  </>
                )}

                {STEPS[step] === "phone" && (
                  <>
                    <p className="block font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
                      {t.steps.phone.q[lang]}
                    </p>
                    <div className="mt-8 flex items-end gap-4">
                      <select
                        aria-label={t.form.country[lang]} value={dial} onChange={(e) => setDial(e.target.value)}
                        className="border-b border-piedra bg-transparent pb-3 font-body text-[16px] text-grafito outline-none transition-colors focus-visible:border-grafito"
                      >
                        {pinned.map((ct) => (
                          <option key={`p-${ct.iso}`} value={ct.dial}>{`${ct.dial}  ${ct[lang]}`}</option>
                        ))}
                        <option disabled>──────────</option>
                        {countries.map((ct) => (
                          <option key={ct.iso} value={ct.dial}>{`${ct.dial}  ${ct[lang]}`}</option>
                        ))}
                      </select>
                      <input
                        id="g-phone" data-autofocus name="phone" type="tel" inputMode="tel" autoComplete="tel-national" data-clarity-mask="true"
                        value={phoneNat} onChange={(e) => setPhoneNat(e.target.value)}
                        placeholder={t.steps.phone.placeholder[lang]} className={`flex-1 ${inputCls}`}
                      />
                    </div>
                    <p className={noteCls}>{t.steps.phone.note[lang]}</p>
                  </>
                )}

                {STEPS[step] === "role" && (
                  <>
                    <p className="block font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
                      {t.steps.role.q[lang]}
                    </p>
                    <div role="radiogroup" aria-label={t.form.role[lang]} className="mt-8 flex flex-col">
                      {ROLE_KEYS.map((r, i) => {
                        const selected = role === r;
                        return (
                          <button
                            key={r} type="button" role="radio" aria-checked={selected}
                            data-autofocus={i === 0 ? true : undefined}
                            onClick={() => { setRole(r); setError(""); }}
                            className={`flex items-center gap-4 border-t border-linea py-5 text-left transition-colors last:border-b focus-visible:outline-none ${
                              selected ? "text-grafito" : "text-grafito/55 hover:text-grafito"
                            }`}
                          >
                            <span className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full border border-grafito transition-colors ${selected ? "bg-grafito" : "bg-transparent"}`} />
                            <span className="font-display text-[1.4rem] font-medium leading-none">{t.steps.role.options[r][lang]}</span>
                          </button>
                        );
                      })}
                    </div>
                  </>
                )}

                {STEPS[step] === "message" && (
                  <>
                    <label htmlFor="g-message" className="block font-display text-[clamp(1.7rem,3.2vw,2.4rem)] font-medium leading-tight tracking-tight">
                      {t.steps.message.q[lang]}
                    </label>
                    <textarea
                      id="g-message" data-autofocus name="message" rows={3} data-clarity-mask="true"
                      value={message} onChange={(e) => setMessage(e.target.value)}
                      className="mt-8 w-full resize-none border-b border-piedra bg-transparent pb-3 font-body text-[18px] font-light leading-relaxed text-grafito outline-none transition-colors placeholder:text-piedra/70 focus-visible:border-grafito"
                    />
                    <p className={noteCls}>{t.steps.message.note[lang]}</p>
                  </>
                )}

                {STEPS[step] === "consent" && (
                  <>
                    <p className="block font-display text-[clamp(1.5rem,2.6vw,2rem)] font-medium leading-snug tracking-tight">
                      {t.title[lang]}
                    </p>
                    <button
                      type="button" role="checkbox" aria-checked={consent} data-autofocus
                      onClick={() => { setConsent((v) => !v); setError(""); }}
                      className="mt-8 flex items-start gap-4 text-left focus-visible:outline-none"
                    >
                      <span className={`mt-[2px] inline-flex h-5 w-5 shrink-0 items-center justify-center border transition-colors ${consent ? "border-grafito bg-grafito" : "border-piedra bg-transparent"}`}>
                        {consent && (
                          <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden>
                            <path d="M2.5 6.2 5 8.5l4.5-5" stroke="#F6F5F1" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        )}
                      </span>
                      <span className="font-body text-[15px] font-light leading-relaxed text-grafito/75">
                        {t.steps.consent.text[lang]}
                      </span>
                    </button>
                    <a
                      href="/privacidad" target="_blank" rel="noopener noreferrer"
                      className="mt-4 inline-block font-mono text-[11px] uppercase tracking-[0.18em] text-grafito/55 underline decoration-linea underline-offset-4 transition-colors hover:text-grafito"
                    >
                      {t.steps.consent.privacyLink[lang]}
                    </a>
                    <Turnstile onToken={setTurnstileToken} />
                  </>
                )}

                {error && <p className={errorCls}>{error}</p>}
              </div>

              <div className="mt-12 flex items-center gap-8">
                {step > 0 && (
                  <button type="button" onClick={goBack} className="font-mono text-[11px] uppercase tracking-[0.18em] text-grafito/50 transition-colors hover:text-grafito">
                    {t.stepNav.back[lang]}
                  </button>
                )}
                {isLast ? (
                  <button
                    type="button" onClick={submit} disabled={status === "loading"}
                    className="inline-block bg-salvia px-[26px] py-[14px] font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-salvia-dark disabled:opacity-60"
                  >
                    {t.stepNav.submit[lang]}
                  </button>
                ) : (
                  <button
                    type="button" onClick={goNext}
                    className="border border-grafito/25 px-[22px] py-[13px] font-mono text-[11px] uppercase tracking-[0.18em] text-grafito transition-colors hover:border-grafito hover:bg-grafito hover:text-galeria"
                  >
                    {t.stepNav.next[lang]}
                  </button>
                )}
              </div>
            </form>
          )}
          </div>
        </div>

        {/* DERECHA — fotografía vertical fija (desktop); crossfade cálido en el éxito. */}
        <GateAtmosphere lang={lang} done={done} variant="desktop" />
      </div>
    </Section>
  );
}
