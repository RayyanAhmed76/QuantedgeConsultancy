"use client";

import { useState, type ReactNode } from "react";
import TransitionLink from "@/components/layout/TransitionLink";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import OptimizedImage from "@/components/OptimizedImage";

const ICONS = {
  roadmapping: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M9 4v16M15 4v16M5 8h4M15 16h4M9 12h6"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  ),
  revenue: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M4 17 10 9l4 4 6-8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M16 5h4v4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  expansion: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M14 4h6v6M10 20H4v-6M20 4l-7 7M4 20l7-7"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  review: (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M20 12a8 8 0 1 1-2.2-5.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M20 5v5h-5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
} as const;

const APPROACH_STEPS: {
  id: keyof typeof ICONS;
  title: string;
  copy: string;
  image: string;
  icon: ReactNode;
}[] = [
  {
    id: "roadmapping",
    title: "Strategic Roadmapping",
    copy: "We build a clear, prioritized plan for where your business should go next, based on your actual capabilities and market position, not generic growth theory.",
    image: "/assets/strategic roadmapping.webp",
    icon: ICONS.roadmapping,
  },
  {
    id: "revenue",
    title: "Revenue Optimization",
    copy: "We look at your pricing, costs, and sales process to find where you're leaving money on the table, then give you specific, practical changes to fix it.",
    image: "/assets/revenue optimization.webp",
    icon: ICONS.revenue,
  },
  {
    id: "expansion",
    title: "Expansion Strategy",
    copy: "We help you decide whether and how to expand, new locations, new offerings, new segments, based on your financial position. The deep market research and competitor analysis behind that decision lives under Market & Customer Intelligence, this stays focused on the strategic go/no-go call.",
    image: "/assets/expansion strategy.webp",
    icon: ICONS.expansion,
  },
  {
    id: "review",
    title: "Roadmap Review & Adjustment",
    copy: "As your business changes, we revisit the roadmap with you and adjust the strategy, not the day-to-day dashboards (that's BI & Decision Support), but the bigger-picture direction.",
    image: "/assets/roadmap review & adjustment.webp",
    icon: ICONS.review,
  },
];

export default function AdvisoryApproach() {
  const [activeId, setActiveId] = useState(APPROACH_STEPS[0].id);
  const active =
    APPROACH_STEPS.find((step) => step.id === activeId) ?? APPROACH_STEPS[0];

  return (
    <section className="approach-section" aria-labelledby="approach-heading">
      <ServiceBlobs side="right" />
      <header className="approach-header">
        <p className="approach-eyebrow">
          <span aria-hidden="true">✦</span> Our approach
        </p>
        <h2 id="approach-heading">
          Turn Business Challenges Into{" "}
          <span className="approach-accent">Better Decisions.</span>
        </h2>
        <p className="approach-lead">
          We help leadership navigate growth, expansion, and high-stakes calls,
          grounded in real analysis of your numbers and market, not guesswork.
        </p>
      </header>

      <div className="approach-layout">
        <article
          className="approach-panel approach-panel--content"
          aria-live="polite"
        >
          {APPROACH_STEPS.map((step, index) => {
            const isActive = step.id === activeId;
            return (
              <div
                key={step.id}
                className={`approach-panel-slide${isActive ? " is-active" : ""}`}
                aria-hidden={!isActive}
              >
                <div className="approach-panel-copy">
                  <p className="approach-panel-index">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                </div>
                <span className="approach-panel-deco" aria-hidden="true">
                  {step.icon}
                </span>
              </div>
            );
          })}
        </article>

        <div className="approach-panel approach-panel--nav">
          <div className="approach-panel-top">
            <span className="approach-spark" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none">
                <path
                  d="M24 4v8M24 36v8M4 24h8M36 24h8M9.5 9.5l5.5 5.5M33 33l5.5 5.5M38.5 9.5 33 15M15 33l-5.5 5.5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            <OptimizedImage
              key={active.image}
              className="approach-thumb"
              src={active.image}
              alt=""
              width={280}
              height={210}
            />
          </div>

          <div className="approach-panel-bottom">
            <ul
              className="approach-list"
              role="tablist"
              aria-label="Advisory approach steps"
            >
              {APPROACH_STEPS.map((step, index) => {
                const isActive = step.id === activeId;
                return (
                  <li key={step.id} role="presentation">
                    <button
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      className={`approach-list-btn${isActive ? " is-active" : ""}`}
                      onClick={() => setActiveId(step.id)}
                    >
                      <span className="approach-list-marker" aria-hidden="true">
                        {isActive
                          ? "→"
                          : `${String(index + 1).padStart(2, "0")}.`}
                      </span>
                      <span>{step.title}</span>
                    </button>
                  </li>
                );
              })}
            </ul>

            <TransitionLink
              href="/contact"
              className="approach-cta"
              aria-label="Book a consultation"
            >
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M7 17 17 7M9 7h8v8"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </div>
    </section>
  );
}
