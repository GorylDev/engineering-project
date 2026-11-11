import type { Metadata } from "next";
import { listDemonstrationPerfumes } from "@/modules/catalog/server/queries";

export const metadata: Metadata = { title: "Katalog PostgreSQL", robots: { index: false } };
export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function DatabaseCatalogPage() {
  const perfumes = await listDemonstrationPerfumes();

  return (
    <main id="tresc" tabIndex={-1} className="shell inner-page">
      <h1>Katalog PostgreSQL</h1>
      <p className="page-intro">Rekordy demonstracyjne odczytane po stronie serwera.</p>
      {perfumes.length === 0 ? (
        <p className="empty-state">Nie ma jeszcze wpisów do wyświetlenia.</p>
      ) : (
        <ul className="guide-grid">
          {perfumes.map((perfume) => (
            <li key={perfume.slug} className="guide-card">
              <p className="eyebrow">Wpis demonstracyjny</p>
              <h2>{perfume.name}</h2>
              <p>{perfume.description}</p>
              <p>Pochodzenie: {perfume.sourceLabel}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
