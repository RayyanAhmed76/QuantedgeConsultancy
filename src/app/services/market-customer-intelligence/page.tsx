import type { Metadata } from "next";
import TransitionLink from "@/components/layout/TransitionLink";
import MarketCovers from "@/components/services/MarketCovers";
import MarketHowWeWork from "@/components/services/MarketHowWeWork";
import MarketDifferent from "@/components/services/MarketDifferent";
import Faqs from "@/components/Faqs";
import LetsTalk from "@/components/LetsTalk";
import OptimizedImage from "@/components/OptimizedImage";
import { MARKET_INTELLIGENCE_FAQS } from "@/data/site";

export const metadata: Metadata = {
  title: "Market & Customer Intelligence",
  description:
    "Original research on markets, competitors, and customers, tied to the specific decision you need to make.",
};

export default function Page() {
  return (
    <main className="service-detail">
      <section className="service-hero service-hero--left service-hero--market">
        <div className="service-hero-media" aria-hidden="true">
          <OptimizedImage
            className="service-hero-img"
            src="/assets/market-customer-intelligence-hero.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="service-hero-content">
          <h1>
            Turn Market Noise Into{" "}
            <span className="service-hero-accent">
              Clear Competitive Advantage
            </span>
          </h1>
          <p className="service-hero-lead">
            We help you understand your market, outpace your competitors, and
            connect with what your customers actually want, so growth decisions
            are backed by evidence, not assumption.
          </p>
          <TransitionLink
            href="/contact"
            className="btn btn-primary service-hero-cta"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </section>

      <MarketCovers />
      <MarketHowWeWork />
      <MarketDifferent />
      <Faqs items={MARKET_INTELLIGENCE_FAQS} />
      <LetsTalk />
    </main>
  );
}
