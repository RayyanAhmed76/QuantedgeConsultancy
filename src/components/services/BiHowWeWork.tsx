import TransitionLink from "@/components/layout/TransitionLink";
import { BI_HOW_WE_WORK } from "@/data/site";

export default function BiHowWeWork() {
  return (
    <section className="biprocess-section" aria-labelledby="biprocess-heading">
      <div className="biprocess-shell">
        <aside className="biprocess-intro">
          <div className="biprocess-title-row">
            <h2 id="biprocess-heading">
              Our <span>Process</span>
            </h2>
            <span className="biprocess-star" aria-hidden="true">
              ✦
            </span>
          </div>
          <p className="biprocess-lead">
            A structured approach that turns leadership decisions into the
            metrics and reporting structure your business actually needs.
          </p>
          <TransitionLink href="/contact" className="biprocess-link">
            <span className="biprocess-link-arrow" aria-hidden="true">
              ↳
            </span>
            Get in touch
          </TransitionLink>
        </aside>

        <ol className="biprocess-list">
          {BI_HOW_WE_WORK.map((step) => (
            <li key={step.number} className="biprocess-step">
              <span className="biprocess-num">{step.number}</span>
              <div className="biprocess-body">
                <span className="biprocess-corner" aria-hidden="true" />
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
