"use client";

import { useState } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import { REGULATION_COMPLIANCE_COVERS } from "@/data/site";

function ArrowIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ComplianceCovers() {
  const [active, setActive] = useState(0);

  return (
    <section className="rccovers-section" aria-labelledby="rccovers-heading">
      <div className="rccovers-shell">
        <header className="rccovers-header">
          <div className="rccovers-header-copy">
            <p className="service-eyebrow">
              <span aria-hidden="true">✦</span> What we cover
            </p>
            <h2 id="rccovers-heading">
              What Regulatory &amp; Compliance <span>Covers</span>
            </h2>
            <p className="rccovers-lead">
              Real regulatory expertise, applied to what your business actually
              needs, from day-to-day data handling to board-level risk
              oversight.
            </p>
          </div>

          <TransitionLink
            href="/contact"
            className="btn btn-primary rccovers-cta"
          >
            Book a Consultation
          </TransitionLink>
        </header>

        <div className="rccovers-grid-wrap">
          <span
            className="rccovers-divider rccovers-divider--v"
            aria-hidden="true"
          />
          <span
            className="rccovers-divider rccovers-divider--h"
            aria-hidden="true"
          />

          <ul className="rccovers-grid">
            {REGULATION_COMPLIANCE_COVERS.map((item, index) => (
              <li
                key={item.number}
                className={`rccovers-cell${active === index ? " is-active" : ""}`}
                onMouseEnter={() => setActive(index)}
              >
                <h3>{item.title}</h3>
                <div className="rccovers-cell-foot">
                  <p>{item.copy}</p>
                  <span className="rccovers-arrow" aria-hidden="true">
                    <ArrowIcon />
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
