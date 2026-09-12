const COOKIE_CONSENT_KEY = "qeds-cookie-consent";
export const COOKIE_CONSENT_OPEN_EVENT = "qeds:cookie-consent-open";
export const COOKIE_CONSENT_CHANGE_EVENT = "qeds:cookie-consent-change";

export type CookieConsentValue = "accepted" | "rejected" | "essential";

export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_ID?.trim() || "G-1VQ1BXKQFW";

export function readCookieConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  try {
    const value = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (value === "accepted" || value === "rejected" || value === "essential") {
      return value;
    }
  } catch {
    /* private mode / blocked storage */
  }
  return null;
}

export function writeCookieConsent(value: CookieConsentValue) {
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, value);
  } catch {
    /* ignore */
  }
  window.dispatchEvent(
    new CustomEvent(COOKIE_CONSENT_CHANGE_EVENT, { detail: value }),
  );
}

export function openCookieConsent() {
  window.dispatchEvent(new Event(COOKIE_CONSENT_OPEN_EVENT));
}

export function analyticsAllowed(value: CookieConsentValue | null) {
  return value === "accepted";
}
