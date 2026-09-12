import type { ReactNode } from "react";
import OptimizedImage from "@/components/OptimizedImage";
import { MARKET_INTELLIGENCE_HOW_WE_WORK } from "@/data/site";

const ICONS: ReactNode[] = [
  <svg key="define" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <circle cx="14" cy="14" r="8" stroke="currentColor" strokeWidth="2" />
    <path
      d="M20 20 27 27"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="gather" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <rect
      x="6"
      y="8"
      width="20"
      height="16"
      rx="2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M10 13h12M10 17h8M10 21h10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="analyze" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M7 24V14M13 24V10M19 24V16M25 24V8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
  <svg key="deliver" viewBox="0 0 32 32" fill="none" aria-hidden="true">
    <path
      d="M8 8h12l4 4v12a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2Z"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M11 17h10M11 21h7"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>,
];

type Tile =
  | { kind: "media"; number: string; image: string }
  | {
      kind: "copy";
      number: string;
      title: string;
      copy: string;
      icon: ReactNode;
    };

/** Checkerboard / diagonal order (same idea as the reference mosaic). */
function buildMosaicTiles(): Tile[] {
  const tiles: Tile[] = [];

  MARKET_INTELLIGENCE_HOW_WE_WORK.forEach((step, index) => {
    const media: Tile = {
      kind: "media",
      number: step.number,
      image: step.image,
    };
    const copy: Tile = {
      kind: "copy",
      number: step.number,
      title: step.title,
      copy: step.copy,
      icon: ICONS[index],
    };

    // Even steps: image left, text right
    // Odd steps: text left, image right  → images sit on the diagonal
    if (index % 2 === 0) {
      tiles.push(media, copy);
    } else {
      tiles.push(copy, media);
    }
  });

  return tiles;
}

export default function MarketHowWeWork() {
  const tiles = buildMosaicTiles();

  return (
    <section className="mwork-section" aria-labelledby="mwork-heading">
      <header className="mwork-header">
        <p className="service-eyebrow">
          <span aria-hidden="true">✦</span> Our process
        </p>
        <h2 id="mwork-heading">
          How We <span>Work</span>
        </h2>
      </header>

      <div className="mwork-mosaic">
        {tiles.map((tile, index) => {
          if (tile.kind === "media") {
            return (
              <div
                key={`media-${tile.number}-${index}`}
                className="mwork-cell mwork-cell--media"
              >
                <OptimizedImage
                  src={tile.image}
                  alt=""
                  fill
                  sizes="(max-width: 700px) 100vw, 50vw"
                />
              </div>
            );
          }

          return (
            <div
              key={`copy-${tile.number}`}
              className="mwork-cell mwork-cell--copy"
            >
              <span className="mwork-icon">{tile.icon}</span>
              <h3>
                <span className="mwork-num">{tile.number}.</span> {tile.title}
              </h3>
              <p>{tile.copy}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
