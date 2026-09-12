import type { Metadata } from "next";
import TransitionLink from "@/components/layout/TransitionLink";
import HowWeWork from "@/components/services/HowWeWork";
import Faqs from "@/components/Faqs";
import LetsTalk from "@/components/LetsTalk";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import OptimizedImage from "@/components/OptimizedImage";
import {
  PROCESS_OPTIMIZATION_COVERS,
  PROCESS_OPTIMIZATION_FAQS,
} from "@/data/site";

export const metadata: Metadata = {
  title: "Process Optimization",
  description:
    "Map workflows, cut friction, and roll out practical process improvements so your team moves faster with less waste.",
};

export default function Page() {
  return (
    <main className="service-detail">
      <section className="service-hero service-hero--left service-hero--process">
        <div className="service-hero-media" aria-hidden="true">
          <OptimizedImage
            className="service-hero-img"
            src="/assets/process optimization 3.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="service-hero-content">
          <h1>
            Turn Slow, Broken
            <br />
            Processes Into{" "}
            <span className="service-hero-accent">
              Work That Actually Moves
            </span>
          </h1>
          <p className="service-hero-lead">
            We find where time and money are leaking out of your day-to-day
            operations, then help you fix it, without disrupting the business
            while you do.
          </p>
          <TransitionLink
            href="/contact"
            className="btn btn-primary service-hero-cta"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </section>

      <section className="covers-section" aria-labelledby="covers-heading">
        <ServiceBlobs side="right" />
        <div className="covers-shell">
          <header className="covers-header">
            <p className="covers-eyebrow">
              <span aria-hidden="true">✦</span> What we cover
            </p>
            <h2 id="covers-heading">
              What Process Optimization <span>Covers</span>
            </h2>
          </header>

          <div className="covers-layout">
            <ol className="covers-rail">
              {PROCESS_OPTIMIZATION_COVERS.map((item, index) => (
                <li
                  key={item.number}
                  className="covers-step"
                  style={{ animationDelay: `${120 + index * 110}ms` }}
                >
                  <div className="covers-step-index" aria-hidden="true">
                    <span className="covers-step-dot" />
                    <span className="covers-step-num">{item.number}</span>
                  </div>
                  <div className="covers-step-body">
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ol>

            <aside className="covers-media" aria-hidden="true">
              <OptimizedImage
                className="covers-media-img"
                src="/assets/process optimization 4.webp"
                alt=""
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
              />
            </aside>
          </div>
        </div>
      </section>

      <HowWeWork />
      <Faqs items={PROCESS_OPTIMIZATION_FAQS} />
      <LetsTalk />
    </main>
  );
}
