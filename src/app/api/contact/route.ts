import { NextResponse } from "next/server";
import {
  readFormPayload,
  serviceLabel,
  validateContactPayload,
  type ContactFormKind,
} from "@/lib/contact-form";

export const runtime = "nodejs";

type Bucket = { count: number; resetAt: number };

const RATE_WINDOW_MS = 15 * 60 * 1000;
const RATE_MAX = 5;
/** Reject oversized multipart bodies early (bytes). */
const MAX_BODY_BYTES = 64 * 1024;
const buckets = new Map<string, Bucket>();

function clientKey(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  const ip =
    forwarded?.split(",")[0]?.trim() ||
    request.headers.get("x-real-ip") ||
    "unknown";
  return ip.slice(0, 64);
}

function takeRateLimit(key: string): { ok: boolean; retryAfterSec: number } {
  const now = Date.now();
  const current = buckets.get(key);

  if (!current || current.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return { ok: true, retryAfterSec: 0 };
  }

  if (current.count >= RATE_MAX) {
    return {
      ok: false,
      retryAfterSec: Math.max(1, Math.ceil((current.resetAt - now) / 1000)),
    };
  }

  current.count += 1;
  buckets.set(key, current);
  return { ok: true, retryAfterSec: 0 };
}

function jsonError(
  status: number,
  message: string,
  errors?: Record<string, string>,
  headers?: HeadersInit,
) {
  return NextResponse.json(
    { ok: false, message, errors: errors ?? {} },
    { status, headers },
  );
}

/** Server-only config — never use NEXT_PUBLIC_ for the site key in production. */
function quantEdgeConfig() {
  const apiBase = (
    process.env.API_BASE_URL ||
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    ""
  )
    .trim()
    .replace(/\/$/, "");
  // Prefer SITE_KEY / CONSULTANCY_SITE_KEY. NEXT_PUBLIC_SITE_KEY is local-dev only.
  const siteKey = (
    process.env.SITE_KEY ||
    process.env.CONSULTANCY_SITE_KEY ||
    (process.env.NODE_ENV !== "production"
      ? process.env.NEXT_PUBLIC_SITE_KEY
      : "") ||
    ""
  ).trim();
  return { apiBase, siteKey };
}

function requestOrigin(request: Request): string | null {
  const origin = request.headers.get("origin");
  if (origin) return origin;
  const referer = request.headers.get("referer");
  if (!referer) return null;
  try {
    return new URL(referer).origin;
  } catch {
    return null;
  }
}

function allowedOrigins(): Set<string> {
  const origins = new Set<string>();
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "").trim();
  if (siteUrl) {
    try {
      origins.add(new URL(siteUrl).origin);
    } catch {
      /* ignore bad SITE_URL */
    }
  }
  // Local Next defaults
  origins.add("http://localhost:3000");
  origins.add("http://127.0.0.1:3000");
  return origins;
}

function isAllowedOrigin(request: Request): boolean {
  const origin = requestOrigin(request);
  if (!origin) return false;
  return allowedOrigins().has(origin);
}

function contentLengthOk(request: Request): boolean {
  const raw = request.headers.get("content-length");
  if (!raw) return true;
  const size = Number(raw);
  if (!Number.isFinite(size) || size < 0) return false;
  return size <= MAX_BODY_BYTES;
}

/** Forward validated consultancy form to modal-clone admin inbox API. */
async function forwardToQuantEdge(data: {
  kind: ContactFormKind;
  name: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}): Promise<{ ok: true; id?: string } | { ok: false; message: string }> {
  const { apiBase, siteKey } = quantEdgeConfig();

  if (!apiBase || !siteKey) {
    console.error("[contact] Missing API_BASE_URL or SITE_KEY");
    return {
      ok: false,
      message: "Form delivery is not configured. Please try again later.",
    };
  }

  const url = `${apiBase}/api/submissions/consultancy`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-Site-Key": siteKey,
        "X-Source-Path":
          data.kind === "contact-page" ? "/contact" : "/#lets-talk",
      },
      body: JSON.stringify({
        name: data.name,
        email: data.email,
        phone: data.phone,
        service: serviceLabel(data.service),
        message: data.message,
        privacy: true,
      }),
    });

    const body = (await response.json().catch(() => ({}))) as {
      id?: string;
      error?: string;
    };

    if (!response.ok) {
      console.error("[contact] upstream error", response.status);
      return {
        ok: false,
        message: "Could not deliver your message. Please try again shortly.",
      };
    }

    return { ok: true, id: body.id };
  } catch (err) {
    console.error("[contact] upstream unreachable", err);
    return {
      ok: false,
      message: "Could not deliver your message. Please try again shortly.",
    };
  }
}

export async function POST(request: Request) {
  if (!isAllowedOrigin(request)) {
    return jsonError(403, "Forbidden.", { form: "Forbidden." });
  }

  const contentType = request.headers.get("content-type") || "";
  if (!contentType.toLowerCase().includes("multipart/form-data") &&
      !contentType.toLowerCase().includes("application/x-www-form-urlencoded")) {
    return jsonError(415, "Unsupported media type.", {
      form: "Unsupported media type.",
    });
  }

  if (!contentLengthOk(request)) {
    return jsonError(413, "Request too large.", { form: "Request too large." });
  }

  const rate = takeRateLimit(clientKey(request));
  if (!rate.ok) {
    return jsonError(
      429,
      "Too many submissions. Please wait and try again.",
      { form: "Too many submissions. Please wait and try again." },
      { "Retry-After": String(rate.retryAfterSec) },
    );
  }

  let kind: ContactFormKind = "lets-talk";
  let payload;

  try {
    const form = await request.formData();
    kind =
      String(form.get("kind") ?? "") === "contact-page"
        ? "contact-page"
        : "lets-talk";
    payload = readFormPayload(form, kind);
  } catch {
    return jsonError(400, "Invalid request body.", {
      form: "Invalid request body.",
    });
  }

  const result = validateContactPayload(payload);
  if (!result.ok || !result.data) {
    // Honeypot / timing failures look like success to bots.
    if (result.errors.form === "Unable to submit right now.") {
      return NextResponse.json({ ok: true });
    }
    return jsonError(400, result.errors.form || "", result.errors);
  }

  const delivered = await forwardToQuantEdge(result.data);
  if (!delivered.ok) {
    return jsonError(502, delivered.message, { form: delivered.message });
  }

  console.info("[contact] forwarded", {
    kind: result.data.kind,
    service: result.data.service,
    id: delivered.id,
  });

  return NextResponse.json({
    ok: true,
    message:
      "Thanks, we received your message. A teammate will be in touch shortly.",
  });
}

/** Reject non-POST probes. */
export function GET() {
  return jsonError(405, "Method not allowed.", { form: "Method not allowed." });
}
