"use client";

import Script from "next/script";
import { useEffect, useState } from "react";
import {
  COOKIE_CONSENT_CHANGE_EVENT,
  GA_MEASUREMENT_ID,
  analyticsAllowed,
  readCookieConsent,
  type CookieConsentValue,
} from "@/lib/cookie-consent";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export default function GoogleAnalytics() {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const sync = (value?: CookieConsentValue | null) => {
      setEnabled(analyticsAllowed(value ?? readCookieConsent()));
    };

    sync();

    const onChange = (event: Event) => {
      const detail = (event as CustomEvent<CookieConsentValue>).detail;
      sync(detail ?? readCookieConsent());
    };

    window.addEventListener(COOKIE_CONSENT_CHANGE_EVENT, onChange);
    return () => window.removeEventListener(COOKIE_CONSENT_CHANGE_EVENT, onChange);
  }, []);

  if (!enabled || !GA_MEASUREMENT_ID) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', { anonymize_ip: true });
        `}
      </Script>
    </>
  );
}
