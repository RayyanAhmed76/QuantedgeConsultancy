import type { ReactNode } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import { BI_COVERS } from "@/data/site";

const ICONS: ReactNode[] = [
  <svg key="kpi" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 19V9M10 19V5M15 19v-7M20 19V8"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="reporting" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 4h7l3 3v13H8V4Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M10 11h6M10 15h4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="dashboard" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <rect
      x="4"
      y="5"
      width="16"
      height="14"
      rx="2"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path d="M4 10h16M10 10v9" stroke="currentColor" strokeWidth="1.7" />
  </svg>,
  <svg key="cadence" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 8v4.5L15 15"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function BiCovers() {
  return (
    <section className="bicovers-section" aria-labelledby="bicovers-heading">
      <ServiceBlobs side="right" />
      <header className="bicovers-header">
        <h2 id="bicovers-heading">
          What BI & Decision Support <span>Covers</span>
        </h2>
        <p className="bicovers-lead">
          Four ways we help you find signal in your numbers, before anyone
          builds a single dashboard.
        </p>
        <TransitionLink href="/contact" className="btn bicovers-cta">
          Talk to Us About Your Metrics
        </TransitionLink>
      </header>

      <div className="bicovers-cards">
        <div className="bicovers-grid">
          {BI_COVERS.map((item, index) => (
            <article key={item.title} className="bicovers-card">
              <span className="bicovers-icon" aria-hidden="true">
                {ICONS[index]}
              </span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
