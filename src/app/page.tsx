import type { Metadata } from "next";
import TransitionLink from "@/components/layout/TransitionLink";
import Faqs from "@/components/Faqs";
import HomeHero from "@/components/HomeHero";
import LetsTalk from "@/components/LetsTalk";
import OptimizedImage from "@/components/OptimizedImage";
import { HOME_DIFFERENTIATORS, HOME_SERVICES } from "@/data/site";

export const metadata: Metadata = {
  title: {
    absolute: "QuantEdgeDataSolutions",
  },
  description:
    "Strategic advisory, process optimization, market intelligence, BI decision support, and compliance guidance: clarity for leadership decisions.",
};

const OVERLAP_POINTS = [
  {
    copy: "We start with the full picture (your operations, your market, and the data behind both) before recommending anything.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 3.5 3.5" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    copy: "From there, we advise on the specific moves that matter: where to grow, what to fix, and what to track.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M4 19V9M10 19V5M16 19v-6M20 19V11" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    copy: "No generic playbook. Every recommendation is built around your business, your numbers, and where you actually want to go.",
    icon: (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        aria-hidden="true"
      >
        <path d="M12 19V5" strokeLinecap="round" />
        <path d="m8 9 4-4 4 4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M9 19h6" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HomePage() {
  return (
    <main className="home-page">
      <HomeHero />

      <section
        className="home-services"
        aria-labelledby="home-services-heading"
      >
        <header className="home-services-header">
          <h2 id="home-services-heading">
            Our <span className="home-heading-accent">Services</span>
          </h2>
          <p>Practical solutions that turn clarity into confident action.</p>
        </header>

        <div className="home-services-grid">
          {HOME_SERVICES.map((service) => (
            <article key={service.title} className="home-service-card">
              <OptimizedImage
                className="home-service-card-img"
                src={service.image}
                alt=""
                fill
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="home-service-card-shade" aria-hidden="true" />
              <div className="home-service-card-foot">
                <h3 className="home-service-card-title">{service.title}</h3>
                <span className="home-service-card-cta">Learn more</span>
              </div>
              <div className="home-service-card-panel">
                <h3 className="home-service-card-panel-title">
                  {service.title}
                </h3>
                <p>{service.copy}</p>
                <span className="home-service-card-btn">Learn More</span>
              </div>
              <TransitionLink
                href={service.href}
                className="home-service-card-link"
                aria-label={`Learn more about ${service.title}`}
              />
            </article>
          ))}
        </div>
      </section>

      <section
        className="home-services-overlap"
        aria-labelledby="home-overlap-heading"
      >
        <div className="home-services-overlap-inner">
          <div className="home-services-overlap-media">
            <OptimizedImage
              src="/assets/hero section part2.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
          </div>

          <div className="home-services-overlap-card">
            <div
              className="home-services-overlap-card-frame"
              aria-hidden="true"
            />
            <span
              className="home-services-overlap-corner home-services-overlap-corner--tr"
              aria-hidden="true"
            />
            <span
              className="home-services-overlap-corner home-services-overlap-corner--bl"
              aria-hidden="true"
            />

            <div className="home-services-overlap-card-body">
              <h2 id="home-overlap-heading">
                Growing a Business Is Exciting, But the{" "}
                <span>Decisions Get Harder.</span>
              </h2>
              <p className="home-services-overlap-lead">
                quantedgedatasolutions Advisory gives you the{" "}
                <strong>CLARITY AND CONFIDENCE</strong> to move forward with the
                right call.
              </p>

              <ul className="home-services-overlap-list">
                {OVERLAP_POINTS.map((point) => (
                  <li key={point.copy}>
                    <span className="home-services-overlap-icon">
                      {point.icon}
                    </span>
                    <div className="home-services-overlap-item">
                      <p>{point.copy}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="home-different"
        aria-labelledby="home-different-heading"
      >
        <header className="home-different-header">
          <h2 id="home-different-heading">
            What Makes Working With Us{" "}
            <span className="home-heading-accent">Different</span>
          </h2>
        </header>

        <div className="home-different-layout">
          <div className="home-different-media">
            <OptimizedImage
              src="/assets/hero 3.webp"
              alt=""
              fill
              sizes="(max-width: 900px) 100vw, 50vw"
            />
            <span className="home-different-media-corner" aria-hidden="true" />
          </div>

          <div className="home-different-grid">
            {HOME_DIFFERENTIATORS.map((item) => (
              <article key={item.number} className="home-different-card">
                <span
                  className="home-different-card-corner home-different-card-corner--tr"
                  aria-hidden="true"
                />
                <span
                  className="home-different-card-corner home-different-card-corner--bl"
                  aria-hidden="true"
                />
                <h3>
                  <span className="home-different-card-num">{item.number}</span>
                  <span className="home-different-card-title">
                    {item.title}
                  </span>
                </h3>
                <p>{item.copy}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="home-different-cta">
          <TransitionLink
            href="/contact"
            className="btn btn-primary home-different-btn"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </section>

      <Faqs />
      <LetsTalk />
    </main>
  );
}
