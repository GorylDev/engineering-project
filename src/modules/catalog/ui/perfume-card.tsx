import Link from "next/link";
import { families, type PerfumePreview } from "../preview-types";

export function PerfumeArtwork({ family }: { family: PerfumePreview["family"] }) {
  return (
    <div className="perfume-art" data-family={family} aria-hidden="true">
      <span className="perfume-art-shadow" />
      <span className="perfume-bottle">
        <span>o.</span>
      </span>
    </div>
  );
}

export function PerfumeCard({ perfume }: { perfume: PerfumePreview }) {
  return (
    <article className="perfume-card">
      <Link href={`/perfumy/${perfume.slug}`} className="perfume-card-link">
        <PerfumeArtwork family={perfume.family} />
        <div className="perfume-card-copy">
          <p className="eyebrow">
            {families[perfume.family]} · {perfume.concentration.toUpperCase()}
          </p>
          <h3>
            {perfume.name}
            <span className="card-arrow" aria-hidden="true">
              ↗
            </span>
          </h3>
          <p className="perfume-card-notes">
            {perfume.notes.opening} · {perfume.notes.heart}
          </p>
        </div>
      </Link>
    </article>
  );
}
