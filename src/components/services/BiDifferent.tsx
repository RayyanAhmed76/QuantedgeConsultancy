import TransitionLink from "@/components/layout/TransitionLink";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import OptimizedImage from "@/components/OptimizedImage";
import { BI_DIFFERENT } from "@/data/site";

export default function BiDifferent() {
  return (
    <section className="bidiff-section" aria-labelledby="bidiff-heading">
      <ServiceBlobs side="left" />

      <div className="bidiff-shell">
        <div className="bidiff-layout">
          <header className="bidiff-header">
            <p className="service-eyebrow">
              <span aria-hidden="true">✦</span> Selected results
            </p>
            <h2 id="bidiff-heading">
              What makes our approach <span>different</span>
            </h2>
          </header>

          <aside className="bidiff-media" aria-hidden="true">
            <OptimizedImage
              src="/assets/Bi & decision support 4.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </aside>

          <ul className="bidiff-list">
            {BI_DIFFERENT.map((item) => (
              <li key={item.number} className="bidiff-item">
                <h3 className="bidiff-title">
                  <span className="bidiff-num">{item.number}.</span>{" "}
                  {item.title}
                </h3>
                <p className="bidiff-copy">{item.copy}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="bidiff-cta-wrap">
          <TransitionLink
            href="/contact"
            className="btn btn-primary bidiff-cta"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </div>
    </section>
  );
}
