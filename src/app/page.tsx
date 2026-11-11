import { listDemonstrationPerfumes } from "@/modules/catalog/server/queries";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export default async function HomePage() {
  const perfumes = await listDemonstrationPerfumes();
  return (
    <main id="tresc" className="mx-auto max-w-6xl px-6 sm:px-10">
      <section className="grid gap-10 py-16 sm:py-24 lg:grid-cols-[1.4fr_1fr] lg:items-center">
        <div>
          <p className="mb-5 text-xs font-semibold tracking-[0.2em] text-leaf uppercase">
            Odkrywanie zaczyna się od ciekawości
          </p>
          <h1 className="max-w-2xl font-serif text-5xl leading-[1.1] tracking-tight sm:text-7xl">
            Poznaj swój świat zapachów.
          </h1>
          <p className="mt-7 max-w-lg text-lg leading-8 text-muted">
            Każdy zapach to inna opowieść. Poznawaj perfumy we własnym tempie i szukaj tego, co jest
            bliskie Tobie.
          </p>
          <a
            href="#katalog"
            className="mt-9 inline-flex rounded-full bg-ink px-7 py-3.5 text-sm font-semibold text-white hover:bg-leaf"
          >
            Zobacz przykładowy wpis{" "}
            <span className="ml-5" aria-hidden="true">
              ↗
            </span>
          </a>
        </div>
        <div
          aria-hidden="true"
          className="relative mx-auto hidden h-80 w-72 items-center justify-center overflow-hidden rounded-t-full border border-line bg-[#edf0e4] lg:flex"
        >
          <div className="absolute top-10 left-9 h-44 w-32 -rotate-35 rounded-[100%_0_100%_0] border border-[#b0bf9c]" />
          <div className="absolute right-8 bottom-7 h-48 w-28 rotate-20 rounded-[100%_0_100%_0] border border-[#a0b18f]" />
          <span className="z-10 font-serif text-[8rem] leading-none text-[#536d50]">o.</span>
        </div>
      </section>
      <section
        id="katalog"
        aria-labelledby="catalog-heading"
        className="border-t border-line pt-10"
      >
        <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
          <h2 id="catalog-heading" className="font-serif text-3xl">
            Pierwsze spojrzenie
          </h2>
          <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">
            Dane demonstracyjne
          </span>
        </div>
        {perfumes.length === 0 ? (
          <p className="rounded-2xl border border-line bg-white p-7 text-muted">
            Nie ma jeszcze wpisów do wyświetlenia.
          </p>
        ) : (
          <ul className="grid gap-5 md:grid-cols-2">
            {perfumes.map((perfume) => (
              <li
                key={perfume.slug}
                className="rounded-2xl border border-line bg-white/70 p-7 sm:p-9"
              >
                <p className="mb-4 text-xs font-semibold tracking-[0.1em] text-leaf uppercase">
                  Wpis demonstracyjny
                </p>
                <h3 className="font-serif text-2xl">{perfume.name}</h3>
                <p className="mt-4 leading-7 text-muted">{perfume.description}</p>
                <p className="mt-6 border-t border-line pt-4 text-xs leading-5 text-muted">
                  Pochodzenie: {perfume.sourceLabel}
                </p>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
