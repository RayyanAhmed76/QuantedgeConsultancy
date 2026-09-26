"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import Toast from "@/components/Toast";
import { BRAND } from "@/data/site";
import {
  CONTACT_SERVICE_OPTIONS,
  readFormPayload,
  validateContactPayload,
  type FieldErrors,
} from "@/lib/contact-form";

export default function LetsTalk() {
  const [toast, setToast] = useState("");
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [pending, setPending] = useState(false);
  const startedAt = useRef(Date.now());
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    startedAt.current = Date.now();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // React can miss the muted DOM property; browsers require it for autoplay.
    video.muted = true;
    video.defaultMuted = true;
    video.playsInline = true;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      video.pause();
      return;
    }

    const play = () => {
      video.play().catch(() => {
        /* autoplay blocked until interaction */
      });
    };

    play();
    video.addEventListener("loadeddata", play);
    return () => video.removeEventListener("loadeddata", play);
  }, []);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setFieldErrors({});
    setPending(true);

    const formEl = event.currentTarget;
    const formData = new FormData(formEl);
    formData.set("kind", "lets-talk");
    formData.set("formStartedAt", String(startedAt.current));

    const local = validateContactPayload(
      readFormPayload(formData, "lets-talk"),
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
      const response = await fetch("/consultancy/api/contact", {
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
          "Thanks, we received your note. A teammate will be in touch shortly.",
      );
    } catch {
      setError("Could not send. Please try again.");
    } finally {
      setPending(false);
    }
  }

  return (
    <section className="contact-section" id="contact">
      <div className="contact-media" aria-hidden="true">
        <video
          ref={videoRef}
          className="contact-bg contact-bg-video"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/assets/contact-bg.webp"
        >
          <source src="/assets/contact-bg.mp4" type="video/mp4" />
        </video>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="contact-bg contact-bg-fallback"
          src="/assets/contact-bg.webp"
          alt=""
        />
        <div className="contact-overlay" />
      </div>

      <div className="contact-inner">
        <div className="contact-copy">
          <p className="eyebrow">GET IN TOUCH</p>
          <h2 className="contact-heading">
            Let&apos;s{" "}
            <span className="contact-accent">talk.</span>
          </h2>
          <p className="contact-lead">
            Tell us what you&apos;re working through, whether it&apos;s a growth
            decision, a process problem, or a question about your numbers.
          </p>
          <div className="contact-points">
            <article className="contact-point">
              <h3>Quick response.</h3>
              <p>
                If you&apos;re weighing a decision, we&apos;d love to help you
                think it through.
              </p>
            </article>
            <article className="contact-point">
              <h3>Clear next steps.</h3>
              <p>
                After we talk, you&apos;ll get a clear recommendation and a
                realistic sense of what it would take to act on it.
              </p>
            </article>
          </div>
        </div>

        <div className="contact-card">
          <div className="contact-card-inner">
            <form
              className="contact-form"
              onSubmit={onSubmit}
              noValidate
              autoComplete="on"
            >
              <h3 className="contact-form-title">
                Have a decision to{" "}
                <span className="contact-accent">work through</span>
                ?
              </h3>

              <label className="full hp-field" aria-hidden="true">
                Company website
                <input
                  name="company_website"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </label>

              <label className="full">
                Tell us what you&apos;re working through
                <textarea
                  name="topic"
                  required
                  rows={5}
                  maxLength={2000}
                  minLength={10}
                  placeholder="Tell us what you're working through."
                  aria-invalid={Boolean(fieldErrors.message)}
                />
                {fieldErrors.message ? (
                  <span className="field-error">{fieldErrors.message}</span>
                ) : null}
              </label>

              <label className="full">
                Your name*
                <input
                  name="name"
                  type="text"
                  required
                  maxLength={80}
                  minLength={2}
                  autoComplete="name"
                  placeholder="John Doe"
                  aria-invalid={Boolean(fieldErrors.name)}
                />
                {fieldErrors.name ? (
                  <span className="field-error">{fieldErrors.name}</span>
                ) : null}
              </label>

              <label className="full">
                E-mail*
                <input
                  name="email"
                  type="email"
                  required
                  maxLength={120}
                  autoComplete="email"
                  inputMode="email"
                  placeholder="hello@site.com"
                  aria-invalid={Boolean(fieldErrors.email)}
                />
                {fieldErrors.email ? (
                  <span className="field-error">{fieldErrors.email}</span>
                ) : null}
              </label>

              <label className="full">
                Phone Number*
                <input
                  name="phone"
                  type="tel"
                  required
                  maxLength={24}
                  autoComplete="tel"
                  inputMode="tel"
                  placeholder="+1 703-701-9964"
                  aria-invalid={Boolean(fieldErrors.phone)}
                />
                {fieldErrors.phone ? (
                  <span className="field-error">{fieldErrors.phone}</span>
                ) : null}
              </label>

              <label className="full">
                What kind of guidance are you looking for?
                <select
                  name="service"
                  required
                  defaultValue=""
                  aria-invalid={Boolean(fieldErrors.service)}
                >
                  <option value="" disabled>
                    Select an option
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

              <label className="contact-check full">
                <input name="privacy" type="checkbox" required value="true" />
                <span>
                  I agree with the{" "}
                  <TransitionLink
                    href="/privacy"
                    className="privacy-inline-link"
                    onClick={(event) => event.stopPropagation()}
                  >
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
                className="btn btn-primary contact-submit"
                disabled={pending}
              >
                {pending ? "Sending…" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      <Toast
        message={toast}
        open={Boolean(toast)}
        onClose={() => setToast("")}
      />
    </section>
  );
}
