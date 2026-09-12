"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import { BRAND, CONTACT_DETAILS } from "@/data/site";
import Toast from "@/components/Toast";
import TransitionLink from "@/components/layout/TransitionLink";
import OptimizedImage from "@/components/OptimizedImage";
import {
  CONTACT_SERVICE_OPTIONS,
  readFormPayload,
  validateContactPayload,
  type FieldErrors,
} from "@/lib/contact-form";

function ContactIcon({ name }: { name: string }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.7,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true as const,
  };

  if (name === "email") {
    return (
      <svg {...common}>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m3 7 9 6 9-6" />
      </svg>
    );
  }
  if (name === "phone") {
    return (
      <svg {...common}>
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.81.36 1.6.68 2.34a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.74-1.25a2 2 0 0 1 2.11-.45c.74.32 1.53.55 2.34.68A2 2 0 0 1 22 16.92z" />
      </svg>
    );
  }
  if (name === "location") {
    return (
      <svg {...common}>
        <path d="M12 22s7-7.2 7-12a7 7 0 1 0-14 0c0 4.8 7 12 7 12z" />
        <circle cx="12" cy="10" r="2.5" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

export default function ContactForm() {
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const startedAt = useRef(Date.now());

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});
    setPending(true);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    formData.set("kind", "contact-page");
    formData.set("formStartedAt", String(startedAt.current));

    const local = validateContactPayload(
      readFormPayload(formData, "contact-page"),
    );
    if (!local.ok) {
      const { form: formMessage, ...fields } = local.errors;
      setFieldErrors(fields);
      // Only show a form-level message when there are no field errors.
      setError(Object.keys(fields).length ? "" : formMessage || "");
      setPending(false);
      return;
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      const data = (await response.json()) as {
        ok?: boolean;
        message?: string;
        errors?: FieldErrors;
      };

      if (!response.ok || !data.ok) {
        const errors = data.errors ?? {};
        const { form: formMessage, ...fields } = errors;
        setFieldErrors(fields);
        const summary = Object.keys(fields).length
          ? ""
          : formMessage || data.message || "Could not send. Please try again.";
        setError(summary);
        return;
      }

      formEl.reset();
      startedAt.current = Date.now();
      setToast(
        data.message ||
          "Thanks, we received your message. A teammate will be in touch shortly.",
      );
    } catch {
      setError("Could not send. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <main className="contact-page">
      <section className="contact-hero" aria-label="Contact Us">
        <OptimizedImage
          className="contact-hero-img"
          src="/assets/contact-us.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
        />
        <div className="contact-hero-overlay" aria-hidden="true" />
        <div className="contact-hero-fade" aria-hidden="true" />
        <h1 className="contact-hero-title">Contact Us</h1>
      </section>

      <div className="contact-page-inner">
        <div className="contact-page-form-card">
          <form
            className="contact-page-form"
            onSubmit={onSubmit}
            noValidate
            autoComplete="on"
          >
            <h2>
              Send us a <span className="contact-page-accent">message</span>.
            </h2>

            <label className="hp-field" aria-hidden="true">
              Company website
              <input
                name="company_website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
              />
            </label>

            <div className="contact-page-row">
              <label>
                First name
                <input
                  name="firstName"
                  type="text"
                  required
                  maxLength={60}
                  minLength={2}
                  autoComplete="given-name"
                  placeholder="Enter your first name"
                  aria-invalid={Boolean(fieldErrors.firstName)}
                />
                {fieldErrors.firstName ? (
                  <span className="field-error">{fieldErrors.firstName}</span>
                ) : null}
              </label>
              <label>
                Last name
                <input
                  name="lastName"
                  type="text"
                  required
                  maxLength={60}
                  minLength={2}
                  autoComplete="family-name"
                  placeholder="Enter your last name"
                  aria-invalid={Boolean(fieldErrors.lastName)}
                />
                {fieldErrors.lastName ? (
                  <span className="field-error">{fieldErrors.lastName}</span>
                ) : null}
              </label>
            </div>

            <label>
              Email
              <input
                name="email"
                type="email"
                required
                maxLength={120}
                autoComplete="email"
                inputMode="email"
                placeholder="yourname@gmail.com"
                aria-invalid={Boolean(fieldErrors.email)}
              />
              {fieldErrors.email ? (
                <span className="field-error">{fieldErrors.email}</span>
              ) : null}
            </label>

            <label>
              Phone number
              <input
                name="phone"
                type="tel"
                required
                maxLength={24}
                autoComplete="tel"
                inputMode="tel"
                placeholder="+1 234 567 890"
                aria-invalid={Boolean(fieldErrors.phone)}
              />
              {fieldErrors.phone ? (
                <span className="field-error">{fieldErrors.phone}</span>
              ) : null}
            </label>

            <label>
              Service
              <select
                name="service"
                required
                defaultValue=""
                aria-invalid={Boolean(fieldErrors.service)}
              >
                <option value="" disabled>
                  Select a service
                </option>
                {CONTACT_SERVICE_OPTIONS.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              {fieldErrors.service ? (
                <span className="field-error">{fieldErrors.service}</span>
              ) : null}
            </label>

            <label>
              Message
              <textarea
                name="message"
                required
                rows={5}
                maxLength={2000}
                minLength={10}
                placeholder="Enter your message"
                aria-invalid={Boolean(fieldErrors.message)}
              />
              {fieldErrors.message ? (
                <span className="field-error">{fieldErrors.message}</span>
              ) : null}
            </label>

            <label className="contact-page-check">
              <input name="privacy" type="checkbox" required value="true" />
              <span>
                I agree with the{" "}
                <TransitionLink href="/privacy" className="privacy-inline-link">
                  Privacy Policy
                </TransitionLink>{" "}
                of {BRAND}.
              </span>
            </label>
            {fieldErrors.privacy ? (
              <span className="field-error">{fieldErrors.privacy}</span>
            ) : null}

            {error ? <p className="form-error">{error}</p> : null}

            <button
              type="submit"
              className="btn btn-primary contact-page-submit"
              disabled={pending}
            >
              {pending ? "Sending…" : "Send"}
            </button>
          </form>
        </div>

        <aside className="contact-page-aside" aria-label="Contact details">
          {CONTACT_DETAILS.map((item) => (
            <article key={item.title} className="contact-info-card">
              <div className="contact-info-head">
                <span className="contact-info-icon">
                  <ContactIcon name={item.icon} />
                </span>
                <h2>{item.title}</h2>
              </div>
              {item.href ? (
                <a className="contact-info-value" href={item.href}>
                  {item.value}
                </a>
              ) : (
                <p className="contact-info-value">{item.value}</p>
              )}
              <p className="contact-info-note">{item.note}</p>
            </article>
          ))}
        </aside>
      </div>

      <Toast
        message={toast}
        open={Boolean(toast)}
        onClose={() => setToast("")}
      />
    </main>
  );
}
