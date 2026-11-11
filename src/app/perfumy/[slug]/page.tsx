import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { previewPerfumes } from "@/modules/catalog/demo/preview-perfumes";
import { PerfumeDetails } from "@/modules/catalog/ui/perfume-details";
import { previewSearchHref } from "@/modules/search/preview-search";

type PerfumePageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return previewPerfumes.map(({ slug }) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: PerfumePageProps): Promise<Metadata> {
  const { slug } = await params;
  const perfume = previewPerfumes.find((entry) => entry.slug === slug);
  return perfume ? { title: perfume.name, description: perfume.description } : {};
}

export default async function PerfumePage({ params }: PerfumePageProps) {
  const { slug } = await params;
  const perfume = previewPerfumes.find((entry) => entry.slug === slug);
  if (!perfume) notFound();

  return (
    <main id="tresc" tabIndex={-1} className="shell inner-page">
      <Link className="text-link back-link" href="/szukaj">
        <span aria-hidden="true">←</span> Katalog demonstracyjny
      </Link>
      <PerfumeDetails
        perfume={perfume}
        familyHref={previewSearchHref({ family: perfume.family })}
      />
    </main>
  );
}
