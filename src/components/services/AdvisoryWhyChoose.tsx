"use client";

import { useState } from "react";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import OptimizedImage from "@/components/OptimizedImage";

const WHY_ITEMS = [
  {
    id: "access",
    title: "Direct access, not account layers",
    points: [
      "You work directly with the person doing the analysis",
      "No hand-offs to junior staff or account managers",
      "Straight answers, not filtered through a middleman",
    ],
  },
  {
    id: "built",
    title: "Built around your business, not a generic framework",
    points: [
      "Every recommendation is based on your actual numbers and market",
      "No copy-paste playbooks reused across clients",
      "Clear, practical next steps, not theory",
    ],
  },
  {
    id: "scope",
    title: "Transparent scope and process",
    points: [
      "You'll know exactly what's included before we start",
      "No surprise invoices or scope creep",
      "Clear reporting throughout, not just at the end",
    ],
  },
];

function isMobileWhyView() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 980px)").matches
  );
}

function canHoverDesktop() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !isMobileWhyView()
  );
}

export default function AdvisoryWhyChoose() {
  const [openIds, setOpenIds] = useState<string[]>(
    WHY_ITEMS[1]?.id ? [WHY_ITEMS[1].id] : [],
  );

  return (
    <section className="why-section" aria-labelledby="why-heading">
      <ServiceBlobs side="left" />
      <div className="why-layout">
        <div className="why-media">
          <div className="why-media-shape">
            <OptimizedImage
              src="/assets/why choose us.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
              style={{ objectFit: "contain" }}
            />
          </div>
        </div>

        <div className="why-content">
          <p className="why-eyebrow">
            <span aria-hidden="true">✦</span> Why choose us
          </p>
          <h2 id="why-heading">
            Turn hard decisions into clear direction with{" "}
            <span className="why-accent">real advisory work</span>
          </h2>

          <ul className="why-list">
            {WHY_ITEMS.map((item) => {
              const isOpen = openIds.includes(item.id);
              return (
                <li
                  key={item.id}
                  className={`why-item${isOpen ? " is-open" : ""}`}
                  onMouseEnter={() => {
                    if (canHoverDesktop()) {
                      setOpenIds([item.id]);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="why-item-trigger"
                    aria-expanded={isOpen}
                    onClick={() => {
                      if (isMobileWhyView()) {
                        setOpenIds((ids) =>
                          ids.includes(item.id)
                            ? ids.filter((id) => id !== item.id)
                            : [...ids, item.id],
                        );
                        return;
                      }
                      setOpenIds((ids) =>
                        ids.length === 1 && ids[0] === item.id
                          ? []
                          : [item.id],
                      );
                    }}
                  >
                    <span>{item.title}</span>
                    <span
                      className="why-item-arrow why-item-arrow--desktop"
                      aria-hidden="true"
                    >
                      {isOpen ? "↙" : "↗"}
                    </span>
                    <span
                      className="why-item-arrow why-item-arrow--mobile"
                      aria-hidden="true"
                    >
                      <svg viewBox="0 0 24 24" fill="none">
                        <path
                          d="m9 6 6 6-6 6"
                          stroke="currentColor"
                          strokeWidth="1.8"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>
                  <div className="why-item-body">
                    <div className="why-item-body-inner">
                      <ul>
                        {item.points.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
