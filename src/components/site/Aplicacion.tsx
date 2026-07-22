"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { track } from "@vercel/analytics";
import { useLang } from "@/lib/useLang";
import { copy, type Lang } from "@/content/copy";
import { blur } from "@/lib/blur";
import { surveys, type SurveyQuestion } from "@/content/surveys";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

type Role = "investor" | "broker" | "developer";
type Answer = { value?: string; other?: string; text?: string };

// Micro-etiqueta funcional del control "Otra" (no vive en el deck; neutra, bilingüe).
const OTHER = { es: "Otra", en: "Other" };

function needsOther(q: SurveyQuestion, a: Answer): boolean {
  return (q.allowOther === true && a.value === "__other__") || a.value === "agencia";
}

export function Aplicacion({
  token,
  role,
  tokenLang,
}: {
  token?: string;
  role?: Role;
  tokenLang?: Lang;
}) {
  const [lang, setLang] = useLang();

  // Al abrir desde el correo, mostrar en el idioma del token (el toggle sigue vivo).
  const seeded = useRef(false);
  useEffect(() => {
    if (!seeded.current && tokenLang) {
      seeded.current = true;
      setLang(tokenLang);
    }
  }, [tokenLang, setLang]);

  if (!role || !token) {
    return (
      <>
        <Nav lang={lang} setLang={setLang} />
        <main>
          <section className="pt-[168px] pb-[160px]">
            <div className="mx-auto max-w-[1240px] px-6 md:px-12">
              <div className="max-w-[560px]">
                <p className="font-mono text-[11px] uppercase tracking-label text-grafito/50">{copy.aplicacion.label[lang]}</p>
                <p className="mt-8 font-display text-[clamp(1.7rem,3.4vw,2.4rem)] font-medium leading-snug tracking-tight">
                  {copy.aplicacion.invalidToken[lang]}
                </p>
              </div>
            </div>
          </section>
        </main>
        <Footer lang={lang} />
      </>
    );
  }

  return <SurveyForm token={token} role={role} lang={lang} setLang={setLang} />;
}

function SurveyForm({
  token,
  role,
  lang,
  setLang,
}: {
  token: string;
  role: Role;
  lang: Lang;
  setLang: (l: Lang) => void;
}) {
  const questions = surveys[role];
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "error">("idle");
  const [done, setDone] = useState(false);

  useEffect(() => {
    track("survey_open", { role });
  }, [role]);

  const set = (id: string, patch: Answer) =>
    setAnswers((prev) => ({ ...prev, [id]: { ...prev[id], ...patch } }));

  function invalid(q: SurveyQuestion, a: Answer | undefined): boolean {
    if (q.optional) return false;
    const ans = a ?? {};
    if (q.kind === "text") return !(ans.text || "").trim();
    if (!ans.value) return true;
    if (needsOther(q, ans)) return !(ans.other || "").trim();
    return false;
  }

  function readable(q: SurveyQuestion, a: Answer): string {
    if (q.kind === "text") return (a.text || "").trim();
    if (a.value === "__other__") return (a.other || "").trim();
    const opt = q.options?.find((o) => o.value === a.value);
    let label = opt ? opt[lang] : "";
    if (a.value === "agencia" && (a.other || "").trim()) {
      label = `${label.split("—")[0].trim()} — ${(a.other || "").trim()}`;
    }
    return label;
  }

  async function submit() {
    const errs: Record<string, boolean> = {};
    questions.forEach((q) => {
      if (invalid(q, answers[q.id])) errs[q.id] = true;
    });
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.querySelector<HTMLElement>("[data-invalid='true']")?.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    setStatus("loading");
    track("survey_submit", { role });
    const payload = questions
      .map((q) => ({ q: q.q[lang], a: readable(q, answers[q.id] ?? {}) }))
      .filter((it) => it.a);
    try {
      const res = await fetch("/api/application", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, answers: payload }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setDone(true);
    } catch {
      setStatus("error");
    }
  }

  return (
    <>
      <Nav lang={lang} setLang={setLang} />
      <main>
        <section className="pt-[168px] pb-[150px]">
          <div className="mx-auto max-w-[1240px] px-6 md:px-12" data-clarity-mask="true">
            {done ? (
              <div className="max-w-[560px]">
                <h1 className="font-display text-[clamp(2rem,4vw,2.8rem)] font-medium leading-tight tracking-tight">
                  {copy.aplicacion.done.title[lang]}
                </h1>
                <p className="mt-6 font-body text-[17px] font-light leading-relaxed text-grafito/75">
                  {copy.aplicacion.done.body[lang]}
                </p>
              </div>
            ) : (
              <>
                {/* Misma foto del gate — para que gate y aplicación sean una sola casa. */}
                <figure className="relative mb-16 aspect-[16/6] w-full max-w-[820px] overflow-hidden border border-linea">
                  <Image
                    src="/img/gate.jpg"
                    alt={copy.figs.gate.alt[lang]}
                    fill
                    placeholder="blur"
                    blurDataURL={blur.gate}
                    sizes="(min-width: 768px) 820px, 100vw"
                    className="object-cover"
                    style={{ objectPosition: "center 35%" }}
                  />
                  {/* Velo suave para que el pie se lea sobre cualquier foto. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-24"
        style={{ background: "linear-gradient(0deg, rgba(42,42,40,0.38) 0%, rgba(42,42,40,0) 100%)" }}
      />
      <figcaption className="absolute bottom-5 left-5 font-mono text-[10px] uppercase tracking-[0.22em] text-galeria">
                    {copy.figs.gate.caption[lang]}
                  </figcaption>
                </figure>
                <div className="max-w-[620px]">
                  <p className="font-mono text-[11px] uppercase tracking-label text-grafito/50">{copy.aplicacion.label[lang]}</p>
                  <p className="mt-7 font-body text-[17px] font-light leading-relaxed text-grafito/75">{copy.aplicacion.intro[lang]}</p>
                </div>

                <div className="mt-20 flex flex-col gap-16">
                  {questions.map((q) => {
                    const a = answers[q.id] ?? {};
                    const isInvalid = Boolean(errors[q.id]);
                    return (
                      <div key={q.id} data-invalid={isInvalid || undefined} className="max-w-[620px]">
                        <div className="flex items-baseline gap-3">
                          <h2 className="font-display text-[clamp(1.4rem,2.6vw,1.9rem)] font-medium leading-snug tracking-tight">
                            {q.q[lang]}
                          </h2>
                          {q.optional && (
                            <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-piedra">
                              {copy.aplicacion.optional[lang]}
                            </span>
                          )}
                        </div>

                        {q.kind === "select" ? (
                          <div role="radiogroup" className="mt-6 flex flex-col">
                            {q.options?.map((o) => {
                              const selected = a.value === o.value;
                              return (
                                <button
                                  key={o.value}
                                  type="button"
                                  role="radio"
                                  aria-checked={selected}
                                  onClick={() => { set(q.id, { value: o.value }); setErrors((e) => ({ ...e, [q.id]: false })); }}
                                  className={`flex items-center gap-4 border-t border-linea py-4 text-left transition-colors last:border-b focus-visible:outline-none ${
                                    selected ? "text-grafito" : "text-grafito/55 hover:text-grafito"
                                  }`}
                                >
                                  <span className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full border border-grafito transition-colors ${selected ? "bg-grafito" : "bg-transparent"}`} />
                                  <span className="font-body text-[16px]">{o[lang]}</span>
                                </button>
                              );
                            })}
                            {q.allowOther && (
                              <button
                                type="button"
                                role="radio"
                                aria-checked={a.value === "__other__"}
                                onClick={() => { set(q.id, { value: "__other__" }); setErrors((e) => ({ ...e, [q.id]: false })); }}
                                className={`flex items-center gap-4 border-t border-linea py-4 text-left transition-colors last:border-b focus-visible:outline-none ${
                                  a.value === "__other__" ? "text-grafito" : "text-grafito/55 hover:text-grafito"
                                }`}
                              >
                                <span className={`inline-block h-[7px] w-[7px] shrink-0 rounded-full border border-grafito transition-colors ${a.value === "__other__" ? "bg-grafito" : "bg-transparent"}`} />
                                <span className="font-body text-[16px]">{OTHER[lang]}</span>
                              </button>
                            )}
                            {needsOther(q, a) && (
                              <input
                                autoFocus
                                value={a.other || ""}
                                onChange={(e) => set(q.id, { other: e.target.value })}
                                data-clarity-mask="true"
                                className="mt-5 w-full max-w-[420px] border-b border-piedra bg-transparent pb-2 font-body text-[16px] text-grafito outline-none transition-colors focus-visible:border-grafito"
                              />
                            )}
                          </div>
                        ) : (
                          <input
                            value={a.text || ""}
                            onChange={(e) => { set(q.id, { text: e.target.value }); setErrors((el) => ({ ...el, [q.id]: false })); }}
                            data-clarity-mask="true"
                            className="mt-6 w-full max-w-[520px] border-b border-piedra bg-transparent pb-2 font-body text-[17px] font-light text-grafito outline-none transition-colors focus-visible:border-grafito"
                          />
                        )}

                        {isInvalid && (
                          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.16em] text-salvia-dark">
                            {copy.aplicacion.required[lang]}
                          </p>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-16 flex items-center gap-6">
                  <button
                    type="button"
                    onClick={submit}
                    disabled={status === "loading"}
                    className="inline-block bg-salvia px-[26px] py-[14px] font-mono text-[11px] uppercase tracking-[0.18em] text-white transition-colors hover:bg-salvia-dark disabled:opacity-60"
                  >
                    {copy.aplicacion.submit[lang]}
                  </button>
                  {status === "error" && (
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-grafito/60">{copy.aplicacion.error[lang]}</span>
                  )}
                </div>
              </>
            )}
          </div>
        </section>
      </main>
      <Footer lang={lang} />
    </>
  );
}
