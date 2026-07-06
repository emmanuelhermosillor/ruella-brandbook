"use client";
import { useState } from "react";
import { Section } from "@/components/Section";
import { Button } from "@/components/Button";
import { copy, type Lang } from "@/content/copy";

type Status = "idle" | "loading" | "sent" | "error";
const fieldCls =
  "w-full border-b border-linea bg-transparent py-3 font-body text-[15px] text-grafito outline-none transition-colors placeholder:text-piedra focus:border-grafito";
const fieldLabelCls = "font-mono text-[10px] uppercase tracking-[0.2em] text-grafito/50";

export function Acceso({ lang }: { lang: Lang }) {
  const t = copy.acceso;
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());
    setStatus("loading");
    try {
      const res = await fetch("/api/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, lang }),
      });
      if (!res.ok) throw new Error("bad response");
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="acceso" className="border-t border-linea">
      <div className="grid gap-16 md:grid-cols-[0.9fr_1.1fr] md:gap-24">
        <div className="max-w-[420px]">
          <p className={fieldLabelCls}>{t.label[lang]}</p>
          <h2 className="mt-6 font-display text-[clamp(2rem,4vw,3rem)] font-medium leading-[1.1] tracking-tight">
            {t.title[lang]}
          </h2>
          <p className="mt-7 font-body text-[16px] font-light leading-relaxed text-grafito/70">
            {t.body[lang]}
          </p>
        </div>

        {status === "sent" ? (
          <p className="self-center font-display text-[1.6rem] font-medium leading-snug text-grafito">
            {t.form.success[lang]}
          </p>
        ) : (
          <form onSubmit={onSubmit} className="w-full max-w-[520px]">
            <fieldset disabled={status === "loading"} className="grid gap-8">
              <div className="grid gap-2">
                <label htmlFor="name" className={fieldLabelCls}>{t.form.name[lang]}</label>
                <input id="name" name="name" required autoComplete="name" className={fieldCls} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="email" className={fieldLabelCls}>{t.form.email[lang]}</label>
                <input id="email" name="email" type="email" required autoComplete="email" className={fieldCls} />
              </div>
              <div className="grid gap-2">
                <label htmlFor="role" className={fieldLabelCls}>{t.form.role[lang]}</label>
                <select id="role" name="role" required defaultValue="" className={`${fieldCls} appearance-none`}>
                  <option value="" disabled hidden></option>
                  <option value="investor">{t.form.roles.investor[lang]}</option>
                  <option value="broker">{t.form.roles.broker[lang]}</option>
                  <option value="developer">{t.form.roles.developer[lang]}</option>
                </select>
              </div>
              <div className="grid gap-2">
                <label htmlFor="message" className={fieldLabelCls}>{t.form.message[lang]}</label>
                <textarea id="message" name="message" rows={3} className={`${fieldCls} resize-none`} />
              </div>
              <div className="mt-2 flex items-center gap-5">
                <Button type="submit">{t.form.submit[lang]}</Button>
                {status === "loading" && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-piedra">…</span>
                )}
                {status === "error" && (
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-grafito/60">
                    {lang === "es" ? "Intenta de nuevo" : "Please try again"}
                  </span>
                )}
              </div>
            </fieldset>
          </form>
        )}
      </div>
    </Section>
  );
}
