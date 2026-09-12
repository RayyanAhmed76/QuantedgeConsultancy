"use client";

import OptimizedImage from "@/components/OptimizedImage";
import { REGULATION_COMPLIANCE_HANDLES } from "@/data/site";

const ICONS = {
  shield: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3.5 5.5 6v5.2c0 4.2 2.8 7.4 6.5 8.8 3.7-1.4 6.5-4.6 6.5-8.8V6L12 3.5Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="m9.2 12.2 1.9 1.9 3.7-3.8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  document: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M8 4h5l4 4v12H8V4Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M13 4v4h4M10 12h5M10 15h4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  handshake: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="8.5" cy="8" r="2.2" stroke="currentColor" strokeWidth="1.7" />
      <circle
        cx="15.5"
        cy="8"
        r="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path
        d="M4.5 18.5c.7-2.3 2.5-3.5 4-3.5.9 0 1.7.3 2.4.9.7-.6 1.5-.9 2.4-.9 1.5 0 3.3 1.2 4 3.5"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
  building: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 20V7.5L12 4l7 3.5V20"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 20v-5h6v5M10 10h1M13 10h1M10 13h1M13 13h1"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  ),
} as const;

function HandleCard({
  item,
}: {
  item: (typeof REGULATION_COMPLIANCE_HANDLES)[number];
}) {
  return (
    <article className="rchandles-card">
      <span className="rchandles-icon" aria-hidden="true">
        {ICONS[item.icon]}
      </span>
      <p className="rchandles-card-copy">
        <strong>{item.title}</strong> {item.copy}
      </p>
    </article>
  );
}

export default function ComplianceHandles() {
  const [topLeft, topRight, bottomLeft, bottomRight] =
    REGULATION_COMPLIANCE_HANDLES;

  return (
    <section className="rchandles-section" aria-labelledby="rchandles-heading">
      <div className="rchandles-shell">
        <header className="rchandles-header">
          <p className="service-eyebrow">
            <span aria-hidden="true">✦</span> Who handles this
          </p>
          <h2 id="rchandles-heading">
            Real Regulatory Expertise, <span>Not Guesswork</span>
          </h2>
          <p className="rchandles-lead">
            This service is delivered in partnership with QuantEdgeDataSolutions,
            ensuring every recommendation is grounded in genuine legal and
            regulatory experience, not general business advice applied to a legal
            question.
          </p>
        </header>

        <div className="rchandles-layout">
          <div className="rchandles-col">
            <HandleCard item={topLeft} />
            <HandleCard item={bottomLeft} />
          </div>

          <aside className="rchandles-media" aria-hidden="true">
            <OptimizedImage
              src="/assets/regulation & compliance 2.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </aside>

          <div className="rchandles-col">
            <HandleCard item={topRight} />
            <HandleCard item={bottomRight} />
          </div>
        </div>
      </div>
    </section>
  );
}
