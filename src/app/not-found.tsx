import TransitionLink from "@/components/layout/TransitionLink";
import { BRAND } from "@/data/site";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="not-found-glow" aria-hidden="true" />
      <p className="not-found-code" aria-hidden="true">
        404
      </p>
      <h1 className="not-found-title">
        This page isn&apos;t on the{" "}
        <span className="not-found-accent">roadmap</span>.
      </h1>
      <p className="not-found-copy">
        The link may be outdated, or the page moved. Head back to {BRAND} and
        we&apos;ll get you where you need to go.
      </p>
      <div className="not-found-actions">
        <TransitionLink href="/" className="btn btn-primary">
          Back to Home
        </TransitionLink>
        <TransitionLink href="/contact" className="btn not-found-secondary">
          Contact Us
        </TransitionLink>
      </div>
    </main>
  );
}
