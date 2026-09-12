"use client";

import { useEffect, useRef, useState } from "react";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import { PROCESS_OPTIMIZATION_HOW_WE_WORK } from "@/data/site";

export default function HowWeWork() {
  const steps = PROCESS_OPTIMIZATION_HOW_WE_WORK;
  const [active, setActive] = useState<number | null>(0);
  const [inView, setInView] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const canHover = useRef(false);

  useEffect(() => {
    canHover.current = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;

    const mq = window.matchMedia("(max-width: 860px)");
    const syncMobile = () => setIsMobile(mq.matches);
    syncMobile();
    mq.addEventListener("change", syncMobile);
    return () => mq.removeEventListener("change", syncMobile);
  }, []);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.28 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  const progress = isMobile
    ? 100
    : active === null
      ? 0
      : ((active + 1) / steps.length) * 100;

  return (
    <section
      ref={sectionRef}
      className={`howwork-section${inView ? " is-inview" : ""}${isMobile ? " howwork-section--mobile-open" : ""}`}
      aria-labelledby="howwork-heading"
      onMouseLeave={() => {
        if (!isMobile && canHover.current) setActive(0);
      }}
    >
      <ServiceBlobs side="left" />
      <div className="howwork-shell">
        <header className="howwork-header">
          <p className="howwork-eyebrow">
            <span aria-hidden="true">✦</span> Sequential process
          </p>
          <h2 id="howwork-heading">
            How We <span>Work</span>
          </h2>
        </header>

        <div className="howwork-stage">
          <div className="howwork-spine" aria-hidden="true">
            <span className="howwork-spine-track" />
            <span
              className="howwork-spine-fill"
              style={{ height: `${progress}%` }}
            />
          </div>

          <ol className="howwork-track">
            {steps.map((step, index) => {
              const isActive = isMobile || index === active;
              const side = index % 2 === 0 ? "left" : "right";

              return (
                <li
                  key={step.number}
                  className={`howwork-step howwork-step--${side}${isActive ? " is-active" : ""}`}
                  style={{ ["--howwork-i" as string]: index }}
                  onMouseEnter={() => {
                    if (!isMobile && canHover.current) setActive(index);
                  }}
                >
                  <button
                    type="button"
                    className="howwork-step-btn"
                    aria-expanded={isActive}
                    aria-controls={`howwork-panel-${step.number}`}
                    tabIndex={isMobile ? -1 : undefined}
                    onFocus={() => {
                      if (!isMobile) setActive(index);
                    }}
                    onClick={() => {
                      if (isMobile) return;
                      if (canHover.current) {
                        setActive(index);
                        return;
                      }
                      setActive((current) =>
                        current === index ? null : index,
                      );
                    }}
                  >
                    <span className="howwork-node" aria-hidden="true">
                      <span className="howwork-node-ring" />
                      <span className="howwork-node-core" />
                    </span>

                    <span className="howwork-step-content">
                      <span className="howwork-num">{step.number}</span>
                      <span className="howwork-title">{step.title}</span>
                      <span
                        id={`howwork-panel-${step.number}`}
                        className="howwork-copy"
                        role="region"
                      >
                        <span className="howwork-copy-inner">{step.copy}</span>
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </div>

        {!isMobile ? (
          <div className="howwork-progress" aria-hidden="true">
            {steps.map((step, index) => (
              <span
                key={step.number}
                className={`howwork-progress-tick${index === active ? " is-on" : ""}`}
              />
            ))}
          </div>
        ) : null}
      </div>
    </section>
  );
}
