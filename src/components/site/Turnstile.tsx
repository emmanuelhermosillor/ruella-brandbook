"use client";
import { useEffect, useRef } from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
export const turnstileEnabled = Boolean(SITE_KEY);

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    turnstile?: any;
  }
}

const SRC = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

/**
 * Cloudflare Turnstile (managed/invisible). Env-gated: with no site key it
 * renders nothing and the gate submits without a token — dev stays unblocked.
 */
export function Turnstile({ onToken }: { onToken: (token: string) => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const rendered = useRef(false);
  const cb = useRef(onToken);
  cb.current = onToken;

  useEffect(() => {
    if (!SITE_KEY) return;
    let interval: ReturnType<typeof setInterval> | undefined;

    const render = () => {
      if (rendered.current || !ref.current || !window.turnstile) return;
      rendered.current = true;
      window.turnstile.render(ref.current, {
        sitekey: SITE_KEY,
        appearance: "interaction-only",
        callback: (token: string) => cb.current(token),
        "error-callback": () => cb.current(""),
        "expired-callback": () => cb.current(""),
      });
    };

    if (window.turnstile) {
      render();
    } else {
      if (!document.querySelector(`script[src="${SRC}"]`)) {
        const s = document.createElement("script");
        s.src = SRC;
        s.async = true;
        s.defer = true;
        document.head.appendChild(s);
      }
      interval = setInterval(() => {
        if (window.turnstile) {
          clearInterval(interval);
          render();
        }
      }, 150);
    }
    return () => interval && clearInterval(interval);
  }, []);

  if (!SITE_KEY) return null;
  return <div ref={ref} className="mt-2" />;
}
