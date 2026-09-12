export const CONTACT_SERVICE_OPTIONS = [
  { value: "business-advisory", label: "Business Advisory" },
  { value: "process-optimization", label: "Process Optimization" },
  {
    value: "market-customer-intelligence",
    label: "Market & Customer Intelligence",
  },
  { value: "bi-decision-support", label: "BI & Decision Support" },
  { value: "regulation-compliance", label: "Regulation & Compliance" },
] as const;

export function serviceLabel(value: string): string {
  return (
    CONTACT_SERVICE_OPTIONS.find((option) => option.value === value)?.label ||
    value
  );
}

type ContactService = (typeof CONTACT_SERVICE_OPTIONS)[number]["value"];

export type ContactFormKind = "lets-talk" | "contact-page";

type ContactPayload = {
  kind: ContactFormKind;
  name?: string;
  firstName?: string;
  lastName?: string;
  email: string;
  phone: string;
  service?: string;
  message?: string;
  topic?: string;
  privacy?: boolean;
  company_website?: string;
  formStartedAt?: number;
};

export type FieldErrors = Record<string, string>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
const PHONE_RE = /^\+?[\d\s().-]{7,20}$/;
const NAME_RE = /^[\p{L}\p{M}'’.\- ]{2,80}$/u;

const LIMITS = {
  name: 80,
  firstName: 60,
  lastName: 60,
  email: 120,
  phone: 24,
  message: 2000,
  topic: 2000,
} as const;

/** Minimum time a real user would need to fill the form (ms). */
const MIN_SUBMIT_MS = 1800;

function sanitizeText(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, max);
}

function sanitizeMultiline(value: unknown, max: number): string {
  if (typeof value !== "string") return "";
  return value
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "")
    .replace(/<[^>]*>/g, "")
    .replace(/\r\n/g, "\n")
    .trim()
    .slice(0, max);
}

function isService(value: string): value is ContactService {
  return CONTACT_SERVICE_OPTIONS.some((option) => option.value === value);
}

export function validateContactPayload(raw: ContactPayload): {
  ok: boolean;
  errors: FieldErrors;
  data?: {
    kind: ContactFormKind;
    name: string;
    email: string;
    phone: string;
    service: ContactService;
    message: string;
  };
} {
  const errors: FieldErrors = {};

  // Honeypot: bots fill this; humans never see it.
  if (sanitizeText(raw.company_website, 200)) {
    return { ok: false, errors: { form: "Unable to submit right now." } };
  }

  const startedAt =
    typeof raw.formStartedAt === "number" ? raw.formStartedAt : Number(raw.formStartedAt);
  if (
    !Number.isFinite(startedAt) ||
    Date.now() - startedAt < MIN_SUBMIT_MS ||
    Date.now() - startedAt > 1000 * 60 * 60 * 6
  ) {
    return { ok: false, errors: { form: "Please take a moment and try again." } };
  }

  const kind = raw.kind === "contact-page" ? "contact-page" : "lets-talk";

  let name = "";
  if (kind === "lets-talk") {
    name = sanitizeText(raw.name, LIMITS.name);
    if (!NAME_RE.test(name)) {
      errors.name = "Enter your full name (letters only, 2–80 characters).";
    }
  } else {
    const firstName = sanitizeText(raw.firstName, LIMITS.firstName);
    const lastName = sanitizeText(raw.lastName, LIMITS.lastName);
    if (!NAME_RE.test(firstName)) {
      errors.firstName = "Enter a valid first name.";
    }
    if (!NAME_RE.test(lastName)) {
      errors.lastName = "Enter a valid last name.";
    }
    name = `${firstName} ${lastName}`.trim();
  }

  const email = sanitizeText(raw.email, LIMITS.email).toLowerCase();
  if (!EMAIL_RE.test(email)) {
    errors.email = "Enter a valid email address.";
  }

  const phone = sanitizeText(raw.phone, LIMITS.phone);
  const phoneDigits = phone.replace(/\D/g, "");
  if (!PHONE_RE.test(phone) || phoneDigits.length < 7 || phoneDigits.length > 15) {
    errors.phone = "Enter a valid phone number with country code if possible.";
  }

  const serviceRaw = sanitizeText(raw.service, 64);
  if (!isService(serviceRaw)) {
    errors.service = "Select a service option.";
  }

  const message =
    kind === "lets-talk"
      ? sanitizeMultiline(raw.topic, LIMITS.topic)
      : sanitizeMultiline(raw.message, LIMITS.message);

  if (message.length < 10) {
    errors.message =
      kind === "lets-talk"
        ? "Tell us a bit more about what you're working through (at least 10 characters)."
        : "Enter a message of at least 10 characters.";
  }

  if (raw.privacy !== true) {
    errors.privacy = "Please agree to the Privacy Policy to continue.";
  }

  if (Object.keys(errors).length > 0) {
    return { ok: false, errors };
  }

  return {
    ok: true,
    errors: {},
    data: {
      kind,
      name,
      email,
      phone,
      service: serviceRaw as ContactService,
      message,
    },
  };
}

export function readFormPayload(
  form: FormData,
  kind: ContactFormKind,
): ContactPayload {
  const bool = (key: string) => form.get(key) === "on" || form.get(key) === "true";
  const num = (key: string) => {
    const v = form.get(key);
    return typeof v === "string" ? Number(v) : NaN;
  };

  return {
    kind,
    name: String(form.get("name") ?? ""),
    firstName: String(form.get("firstName") ?? ""),
    lastName: String(form.get("lastName") ?? ""),
    email: String(form.get("email") ?? ""),
    phone: String(form.get("phone") ?? ""),
    service: String(form.get("service") ?? ""),
    message: String(form.get("message") ?? ""),
    topic: String(form.get("topic") ?? ""),
    privacy: bool("privacy"),
    company_website: String(form.get("company_website") ?? ""),
    formStartedAt: num("formStartedAt"),
  };
}
