"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import { HOME_FAQS } from "@/data/site";

type FaqItem = { q: string; a: string };

export default function Faqs({ items = HOME_FAQS }: { items?: FaqItem[] }) {
  const [open, setOpen] = useState(0);

  if (!items?.length) return null;

  return (
    <section className="faq-section" id="faq">
      <div className="faq-wrap">
        <Reveal className="faq-intro">
          <h2 className="faq-heading">FAQ.</h2>
          <p className="faq-sub">
            Got questions? We&apos;ve got answers. Here&apos;s everything you
            need to know about working with us.
          </p>
        </Reveal>

        <div className="faq-list">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal
                key={item.q}
                className="faq-reveal"
                delay={Math.min(i * 50, 200)}
              >
                <div
                  className={`faq-item${isOpen ? " open" : ""}`}
                  data-no-reveal
                >
                  <button
                    type="button"
                    className="faq-q"
                    aria-expanded={isOpen}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                  >
                    <span>{item.q}</span>
                    <span className="faq-icon" aria-hidden="true">
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>
                  <div className="faq-a">
                    <p>{item.a}</p>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
