import type { Metadata } from "next";
import { ABOUT_STATEMENTS, BRAND } from "@/data/site";
import LetsTalk from "@/components/LetsTalk";
import OptimizedImage from "@/components/OptimizedImage";

export const metadata: Metadata = {
  title: "About",
  description:
    "Learn what makes QuantEdgeDataSolutions different, our mission, values, and goal.",
};

export default function AboutPage() {
  return (
    <main className="about-page">
      <div className="about-content">
        <h1>
          What makes us <span className="about-heading-accent">different</span>
        </h1>
        <p className="about-copy">
          We don&apos;t just tell you what&apos;s wrong, we help you fix it.{" "}
          {BRAND} combines strategy, research, operations, and compliance so
          every recommendation ties back to a real decision, explained plainly,
          and you work directly with the person doing the analysis.
        </p>
      </div>

      <div className="about-banner">
        <OptimizedImage
          className="about-banner-img"
          src="/assets/about-us.webp"
          alt=""
          fill
          sizes="100vw"
        />
      </div>

      <section className="about-statements" aria-label="Mission, values, and goal">
        {ABOUT_STATEMENTS.map((item, index) => {
          const isEdge = index === 0 || index === ABOUT_STATEMENTS.length - 1;
          return (
            <article
              key={item.accent}
              className={[
                "about-statement",
                isEdge ? "about-statement--bleed" : "about-statement--inset",
                index % 2 === 1 ? "about-statement--title-right" : "",
              ].join(" ")}
            >
              <div className="about-statement-inner">
                <h2 className="about-statement-title">
                  <span className="about-statement-lead">{item.lead}</span>{" "}
                  <span className="about-statement-accent">{item.accent}</span>
                </h2>
                <p className="about-statement-copy">{item.copy}</p>
              </div>
            </article>
          );
        })}
      </section>

      <LetsTalk />
    </main>
  );
}
