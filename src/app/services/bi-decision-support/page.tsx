import type { Metadata } from "next";
import TransitionLink from "@/components/layout/TransitionLink";
import BiProblem from "@/components/services/BiProblem";
import BiCovers from "@/components/services/BiCovers";
import BiHowWeWork from "@/components/services/BiHowWeWork";
import BiDifferent from "@/components/services/BiDifferent";
import Faqs from "@/components/Faqs";
import LetsTalk from "@/components/LetsTalk";
import OptimizedImage from "@/components/OptimizedImage";
import { BI_FAQS } from "@/data/site";

export const metadata: Metadata = {
  title: "BI & Decision Support",
  description:
    "Define the right KPIs and reporting structure so leadership gets clarity over noise when decisions matter.",
};

export default function Page() {
  return (
    <main className="service-detail">
      <section className="service-hero service-hero--left service-hero--bi">
        <div className="service-hero-media" aria-hidden="true">
          <OptimizedImage
            className="service-hero-img"
            src="/assets/Bi& descision support hero.webp"
            alt=""
            fill
            sizes="100vw"
          />
          <div className="service-hero-grade" />
          <div className="service-hero-overlay" />
        </div>

        <div className="service-hero-content">
          <h1>
            Clarity on the Metrics That{" "}
            <span className="service-hero-accent">
              Actually Matter to Your Business
            </span>
          </h1>
          <p className="service-hero-lead">
            We help leadership identify what to track and how to read it,
            clarity over noise, so decisions are based on signal, not guesswork.
          </p>
          <TransitionLink
            href="/contact"
            className="btn btn-primary service-hero-cta"
          >
            Book a Consultation
          </TransitionLink>
        </div>
      </section>

      <BiProblem />
      <BiCovers />
      <BiHowWeWork />
      <BiDifferent />
      <Faqs items={BI_FAQS} />
      <LetsTalk />
    </main>
  );
}
