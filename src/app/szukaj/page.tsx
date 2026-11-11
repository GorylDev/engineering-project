import type { Metadata } from "next";
import Link from "next/link";
import { ViewTransition } from "@/components/motion-ui";
import { previewPerfumes } from "@/modules/catalog/demo/preview-perfumes";
import { families, occasions } from "@/modules/catalog/preview-types";
import { PerfumeCard } from "@/modules/catalog/ui/perfume-card";
import {
  filterKeys,
  filterPerfumePreviews,
  previewSearchHref,
  readPreviewFilters,
  type PreviewFilters,
} from "@/modules/search/preview-search";
import { PreviewFiltersPanel } from "@/modules/search/ui/preview-filters";

export const metadata: Metadata = { title: "Wyszukiwanie zaawansowane" };

function getFilterLabels(filters: PreviewFilters): Record<keyof PreviewFilters, string> {
  return {
    q: `Szukano: ${filters.q}`,
    family: filters.family ? families[filters.family] : "",
    occasion: filters.occasion ? occasions[filters.occasion] : "",
    concentration: filters.concentration.toUpperCase(),
    note: `Z nutą: ${filters.note}`,
    exclude: `Bez nuty: ${filters.exclude}`,
  };
}

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const filters = readPreviewFilters(await searchParams);
  const perfumes = filterPerfumePreviews(previewPerfumes, filters);
  const labels = getFilterLabels(filters);
  const active = filterKeys.filter((key) => filters[key]);
  const queryKey = previewSearchHref(filters);

  return (
    <main id="tresc" tabIndex={-1} className="shell inner-page">
      <p className="eyebrow">Katalog demonstracyjny</p>
      <h1>Wyszukiwanie zaawansowane</h1>
      <p className="page-intro">
        Zawęź fikcyjne profile według nazwy, nut, okazji i rodziny zapachowej.
      </p>
      <div className="search-layout">
        <PreviewFiltersPanel key={queryKey} filters={filters} activeCount={active.length} />
        <section className="search-results" aria-labelledby="results-title">
          <div className="results-heading">
            <h2 id="results-title">Wyniki</h2>
            <p role="status">Liczba wyników: {perfumes.length}</p>
          </div>
          {active.length > 0 && (
            <ul className="filter-chips" aria-label="Aktywne warunki">
              {active.map((key) => (
                <li key={key}>
                  <Link
                    href={previewSearchHref({ ...filters, [key]: "" })}
                    aria-label={`Usuń warunek ${labels[key]}`}
                  >
                    {labels[key]} <span aria-hidden="true">×</span>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          <ViewTransition key={queryKey}>
            {perfumes.length > 0 ? (
              <div className="perfume-grid results-grid">
                {perfumes.map((perfume) => (
                  <PerfumeCard key={perfume.slug} perfume={perfume} />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>Brak pasujących zapachów</h3>
                <p>Sprawdź pisownię albo usuń jeden z aktywnych warunków.</p>
                <Link href="/szukaj" className="text-link">
                  Wyczyść wszystkie filtry <span aria-hidden="true">→</span>
                </Link>
              </div>
            )}
          </ViewTransition>
        </section>
      </div>
    </main>
  );
}
