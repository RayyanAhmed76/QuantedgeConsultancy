import type { Metadata } from "next";
import TransitionLink from "@/components/layout/TransitionLink";
import AdvisoryApproach from "@/components/services/AdvisoryApproach";
import AdvisoryWhyChoose from "@/components/services/AdvisoryWhyChoose";
import Faqs from "@/components/Faqs";
import LetsTalk from "@/components/LetsTalk";
import OptimizedImage from "@/components/OptimizedImage";
import { BUSINESS_ADVISORY_FAQS } from "@/data/site";

export const metadata: Metadata = {
  title: "Business Advisory",
  description:
    "Strategic advice for growth, expansion, and high-stakes decisions, grounded in real analysis of your numbers and market.",
};

export default function Page() {
  return (
    <main className="service-detail">
      <section className="service-hero service-hero--advisory">
        <div className="service-hero-media" aria-hidden="true">
          <OptimizedImage
            className="service-hero-img"
            src="/assets/business advisory main.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="service-hero-content">
          <h1>
            Strategic Advice for{" "}
            <span className="service-hero-accent">
              Complex Business Decisions
            </span>
          </h1>
          <p className="service-hero-lead">
            We help leadership navigate growth, expansion, and high-stakes
            calls, grounded in real analysis of your numbers and market, not
            guesswork.
          </p>
          <TransitionLink
            href="/contact"
            className="btn btn-primary service-hero-cta"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </section>

      <AdvisoryApproach />
      <AdvisoryWhyChoose />
      <Faqs items={BUSINESS_ADVISORY_FAQS} />
      <LetsTalk />
    </main>
  );
}
