"use client";

import dynamic from "next/dynamic";
import TransitionLink from "@/components/layout/TransitionLink";

const PrismaticBurst = dynamic(() => import("@/components/PrismaticBurst"), {
  ssr: false,
  loading: () => (
    <div className="services-hero-burst-fallback" aria-hidden="true" />
  ),
});

const BURST_COLORS = ["#d2ff00", "#d2ff00", "#111111"];

export default function ServicesHero() {
  return (
    <section className="service-hero services-index-hero">
      <div className="service-hero-media" aria-hidden="true">
        <div className="services-hero-burst">
          <PrismaticBurst
            animationType="rotate3d"
            intensity={1.15}
            speed={0.4}
            distort={0}
            paused={false}
            offset={{ x: 0, y: 0 }}
            hoverDampness={0}
            rayCount={0}
            mixBlendMode="normal"
            renderScale={0.5}
            maxFps={28}
            colors={BURST_COLORS}
          />
        </div>
        <div className="service-hero-overlay services-hero-burst-overlay" />
      </div>

      <div className="service-hero-content services-index-hero-content">
        <h1>
          One team,{" "}
          <span className="services-index-accent">
            every <span className="services-hero-lime">decision</span> you need
            help making.
          </span>
        </h1>
        <p className="service-hero-lead">
          Strategy, research, operations, and compliance. One advisory team
          when the call in front of you actually matters.
        </p>
        <TransitionLink
          href="/contact"
          className="btn btn-primary service-hero-cta"
        >
          Book a Consultation
        </TransitionLink>
      </div>
    </section>
  );
}
