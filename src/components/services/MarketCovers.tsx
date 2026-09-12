"use client";

import { useEffect, useState } from "react";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import OptimizedImage from "@/components/OptimizedImage";
import { MARKET_INTELLIGENCE_COVERS } from "@/data/site";

function isMobileCoversView() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(max-width: 900px)").matches
  );
}

function canHoverDesktop() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    !isMobileCoversView()
  );
}

export default function MarketCovers() {
  const [openIds, setOpenIds] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 900px)");
    const sync = () => {
      const mobile = mq.matches;
      setIsMobile(mobile);
      setOpenIds((ids) => {
        if (mobile) return [];
        return ids.length === 0 ? [0] : [ids[0]];
      });
    };
    sync();
    mq.addEventListener("change", sync);
    return () => mq.removeEventListener("change", sync);
  }, []);

  return (
    <section className="mcovers-section" aria-labelledby="mcovers-heading">
      <ServiceBlobs side="right" />
      <header className="mcovers-header">
        <p className="service-eyebrow">
          <span aria-hidden="true">✦</span> What we cover
        </p>
        <h2 id="mcovers-heading">
          What Market & Customer Intelligence <span>Covers</span>
        </h2>
      </header>

      <div className="mcovers-card">
        <div className="mcovers-panel">
          <ul className="mcovers-list">
            {MARKET_INTELLIGENCE_COVERS.map((item, index) => {
              const isOpen = openIds.includes(index);
              return (
                <li
                  key={item.number}
                  className={`mcovers-item${isOpen ? " is-open" : ""}`}
                  onMouseEnter={() => {
                    if (canHoverDesktop()) {
                      setOpenIds([index]);
                    }
                  }}
                >
                  <button
                    type="button"
                    className="mcovers-trigger"
                    aria-expanded={isOpen}
                    onClick={() => {
                      if (isMobile || isMobileCoversView()) {
                        setOpenIds((ids) =>
                          ids.includes(index)
                            ? ids.filter((id) => id !== index)
                            : [...ids, index],
                        );
                        return;
                      }
                      setOpenIds([index]);
                    }}
                  >
                    <span className="mcovers-trigger-main">
                      <span className="mcovers-num">{item.number}.</span>
                      <span className="mcovers-title">{item.title}</span>
                    </span>
                    <span className="mcovers-chevron" aria-hidden="true">
                      <svg viewBox="0 0 16 16" fill="none">
                        <path
                          d="M4 6.5 8 10.5 12 6.5"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                  </button>

                  <div className="mcovers-body">
                    <div className="mcovers-body-inner">
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

        <aside className="mcovers-media" aria-hidden="true">
          <OptimizedImage
            src="/assets/marketing & intelligence customer 2.webp"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </aside>
      </div>
    </section>
  );
}
