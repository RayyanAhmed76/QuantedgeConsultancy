import { BRAND } from "@/data/site";
import OptimizedImage from "@/components/OptimizedImage";

export default function BiProblem() {
  return (
    <section className="biproblem-section" aria-labelledby="biproblem-heading">
      <header className="biproblem-header">
        <p className="biproblem-badge">
          <span aria-hidden="true">✦</span> THE PROBLEM
        </p>
        <h2 id="biproblem-heading">
          <span className="biproblem-heading-lead">
            Tracking everything but understanding nothing is
          </span>
          <span className="biproblem-heading-accent">
            how businesses fly blind.
          </span>
        </h2>
        <p className="biproblem-lead">
          A dashboard with 40 metrics and no clear priority. Reports nobody
          reads because they don&apos;t tie to a real decision. Data that&apos;s
          technically there, but never actually used. Every unused metric is
          noise you&apos;re paying attention to instead of signal that matters.
        </p>
      </header>

      <div className="biproblem-compare">
        <article className="biproblem-card biproblem-card--old">
          <p className="biproblem-card-label">The old way</p>
          <h3>Endless metrics. No clarity.</h3>
        </article>

        <div className="biproblem-media" aria-hidden="true">
          <OptimizedImage
            src="/assets/BI & decision support 3.webp"
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
          />
        </div>

        <article className="biproblem-card biproblem-card--new">
          <p className="biproblem-card-label">{BRAND}&apos;s way</p>
          <h3>The right metrics. Clear signal.</h3>
        </article>
      </div>
    </section>
  );
}
