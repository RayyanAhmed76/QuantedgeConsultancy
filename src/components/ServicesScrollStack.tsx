"use client";

import TransitionLink from "@/components/layout/TransitionLink";
import OptimizedImage from "@/components/OptimizedImage";
import Reveal from "@/components/Reveal";
import { HOME_SERVICES } from "@/data/site";

export default function ServicesScrollStack() {
  return (
    <section
      className="services-feature-section"
      aria-labelledby="services-index-dir-heading"
    >
      <div className="services-feature-shell">
        <Reveal as="header" className="services-feature-header">
          <h2 id="services-index-dir-heading">
            Where we can <span>help</span>
          </h2>
          <p>
            Explore each area below. When you&apos;re ready, talk to us.
            We&apos;ll help you figure out the right starting point.
          </p>
        </Reveal>

        <div className="services-feature-list">
          {HOME_SERVICES.map((service, index) => (
            <Reveal
              key={service.href}
              as="article"
              className={
                index % 2 === 1
                  ? "services-feature-row services-feature-row--flip"
                  : "services-feature-row"
              }
              delay={index * 60}
            >
              <div className="services-feature-media">
                <OptimizedImage
                  src={service.image}
                  alt=""
                  width={960}
                  height={720}
                  sizes="(max-width: 900px) 100vw, 50vw"
                  priority={index < 2}
                  className="services-feature-img"
                  style={{ objectFit: "cover", objectPosition: "center" }}
                />
              </div>

              <div className="services-feature-copy">
                <p className="services-feature-eyebrow">
                  <span aria-hidden="true">✦</span>{" "}
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="reveal-text">{service.title}</h3>
                <p className="services-feature-text reveal-text reveal-text--late">
                  {service.copy}
                </p>
                <TransitionLink
                  href={service.href}
                  className="btn btn-primary services-feature-cta reveal-text reveal-text--later"
                >
                  Learn more
                </TransitionLink>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
