import Link from "next/link";

export default function NotFoundPage() {
  return (
    <main id="tresc" className="mx-auto max-w-3xl px-6 py-24">
      <p className="text-sm text-muted">404</p>
      <h1 className="mt-4 font-serif text-4xl">Nie znaleźliśmy tej strony</h1>
      <p className="mt-6 text-muted">Sprawdź adres lub wróć do strony głównej.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-ink px-7 py-3 text-white">
        Wróć do Olfunara
      </Link>
    </main>
  );
}
