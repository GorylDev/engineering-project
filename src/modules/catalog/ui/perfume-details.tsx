import Link from "next/link";
import { concentrations, families, occasions, type PerfumePreview } from "../preview-types";
import { PerfumeArtwork } from "./perfume-card";

export function PerfumeDetails({
  perfume,
  familyHref,
}: {
  perfume: PerfumePreview;
  familyHref: string;
}) {
  return (
    <>
      <section className="perfume-details" aria-labelledby="perfume-title">
        <PerfumeArtwork family={perfume.family} />
        <div>
          <p className="eyebrow">Profil demonstracyjny</p>
          <h1 id="perfume-title">{perfume.name}</h1>
          <p className="page-intro">{perfume.description}</p>
          <dl className="perfume-facts">
            <div>
              <dt>Rodzina</dt>
              <dd>{families[perfume.family]}</dd>
            </div>
            <div>
              <dt>Koncentracja</dt>
              <dd>{concentrations[perfume.concentration]}</dd>
            </div>
            <div>
              <dt>Okazje</dt>
              <dd>{perfume.occasions.map((occasion) => occasions[occasion]).join(", ")}</dd>
            </div>
          </dl>
          <Link className="text-link" href={familyHref}>
            Zobacz tę rodzinę w katalogu <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>
      <section className="home-section" aria-labelledby="notes-title">
        <div className="section-heading">
          <h2 id="notes-title">Jak rozwija się zapach</h2>
        </div>
        <dl className="guide-grid detail-notes">
          <div className="guide-card">
            <dt>Otwarcie</dt>
            <dd>{perfume.notes.opening}</dd>
          </div>
          <div className="guide-card">
            <dt>Serce</dt>
            <dd>{perfume.notes.heart}</dd>
          </div>
          <div className="guide-card">
            <dt>Baza</dt>
            <dd>{perfume.notes.base}</dd>
          </div>
        </dl>
      </section>
      <section className="home-section detail-offers" aria-labelledby="detail-offers-title">
        <div>
          <h2 id="detail-offers-title">Gdzie kupić?</h2>
          <p>Ten profil jest fikcyjny, dlatego nie ma powiązanych ofert.</p>
        </div>
        <Link className="text-link" href="/#oferty">
          Jak będzie działać porównanie? <span aria-hidden="true">→</span>
        </Link>
      </section>
    </>
  );
}
