import TransitionLink from "@/components/layout/TransitionLink";
import ServiceBlobs from "@/components/services/ServiceBlobs";
import OptimizedImage from "@/components/OptimizedImage";
import { MARKET_INTELLIGENCE_DIFFERENT } from "@/data/site";

const ICONS = [
  // Original research
  <svg key="research" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M8 4h7l3 3v13H8V4Z"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinejoin="round"
    />
    <path
      d="M10 11h6M10 15h4"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>,
  // Tied to decision
  <svg key="decision" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.7" />
    <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.7" />
    <path
      d="M12 4v2.5M12 17.5V20M4 12h2.5M17.5 12H20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>,
  // Objective
  <svg key="objective" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M7 12h10"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M12 5v14"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M7 12c0-3.5 2.2-6 5-6s5 2.5 5 6-2.2 6-5 6-5-2.5-5-6Z"
      stroke="currentColor"
      strokeWidth="1.7"
    />
  </svg>,
  // Clear synthesis
  <svg key="synthesis" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path
      d="M5 17 10 9l3.5 4L19 6"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>,
];

export default function MarketDifferent() {
  return (
    <section className="mdiff-section" aria-labelledby="mdiff-heading">
      <ServiceBlobs side="left" />
      <div className="mdiff-shell">
        <header className="mdiff-header">
          <p className="service-eyebrow">
            <span aria-hidden="true">✦</span> Why choose us
          </p>
          <h2 id="mdiff-heading">
            What Makes Our Research <span>Different</span>
          </h2>
        </header>

        <div className="mdiff-layout">
          <div className="mdiff-list-wrap">
            <ul className="mdiff-list">
              {MARKET_INTELLIGENCE_DIFFERENT.map((item, index) => (
                <li key={item.number} className="mdiff-item">
                  <span className="mdiff-icon" aria-hidden="true">
                    {ICONS[index]}
                  </span>
                  <div className="mdiff-copy">
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </div>
                </li>
              ))}
            </ul>

            <TransitionLink
              href="/contact"
              className="btn btn-primary mdiff-cta"
            >
              Book a Consultation
            </TransitionLink>
          </div>

          <div className="mdiff-media">
            <span className="mdiff-media-card" aria-hidden="true" />
            <OptimizedImage
              src="/assets/why choose us service 3.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
