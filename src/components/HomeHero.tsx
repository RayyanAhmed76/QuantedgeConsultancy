"use client";

import dynamic from "next/dynamic";
import TransitionLink from "@/components/layout/TransitionLink";

const Beams = dynamic(() => import("@/components/Beams"), {
  ssr: false,
  loading: () => <div className="home-hero-beams-fallback" aria-hidden="true" />,
});

export default function HomeHero() {
  return (
    <section className="home-hero">
      <div className="home-hero-media" aria-hidden="true">
        <div className="home-hero-beams">
          <Beams
            beamWidth={3.7}
            beamHeight={30}
            beamNumber={13}
            lightColor="#d2ff00"
            speed={2.8}
            noiseIntensity={1.45}
            scale={0.2}
            rotation={30}
            beamColor="#111111"
            backgroundColor="#000000"
          />
        </div>
        <div className="home-hero-overlay" />
      </div>

      <div className="home-hero-content">
        <h1>
          Turn Business Challenges Into{" "}
          <span className="home-hero-accent">Better Decisions.</span>
        </h1>
        <p>
          We help businesses understand their customers, optimize their
          processes, and use data to make faster, more confident decisions.
        </p>
        <TransitionLink href="/about" className="btn btn-primary home-hero-cta">
          See How We Help
        </TransitionLink>
      </div>
    </section>
  );
}
