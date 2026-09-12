import type { Metadata } from "next";
import TransitionLink from "@/components/layout/TransitionLink";
import Faqs from "@/components/Faqs";
import LetsTalk from "@/components/LetsTalk";
import ComplianceCovers from "@/components/services/ComplianceCovers";
import ComplianceHandles from "@/components/services/ComplianceHandles";
import ComplianceHowWeWork from "@/components/services/ComplianceHowWeWork";
import OptimizedImage from "@/components/OptimizedImage";
import { REGULATION_COMPLIANCE_FAQS } from "@/data/site";

export const metadata: Metadata = {
  title: "Regulation & Compliance",
  description:
    "Practical guidance on what applies, what does not, and how to stay aligned without turning compliance into a distraction.",
};

export default function Page() {
  return (
    <main className="service-detail">
      <section className="service-hero service-hero--left service-hero--compliance">
        <div className="service-hero-media" aria-hidden="true">
          <OptimizedImage
            className="service-hero-img"
            src="/assets/regulation & compliance.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="service-hero-overlay" />
        </div>

        <div className="service-hero-content">
          <h1>
            <span className="service-hero-line">Navigate Regulation With</span>{" "}
            <span className="service-hero-accent">
              Confidence, Not Guesswork
            </span>
          </h1>
          <p className="service-hero-lead">
            GDPR and DORA compliance handled by real regulatory expertise, so
            your business meets its obligations without the risk of getting it
            wrong.
          </p>
          <TransitionLink
            href="/contact"
            className="btn btn-primary service-hero-cta"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </section>

      <ComplianceCovers />
      <ComplianceHandles />
      <ComplianceHowWeWork />
      <Faqs items={REGULATION_COMPLIANCE_FAQS} />
      <LetsTalk />
    </main>
  );
}
