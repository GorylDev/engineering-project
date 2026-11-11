"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main id="tresc" className="mx-auto max-w-3xl px-6 py-24">
      <p className="mb-5 text-sm font-semibold text-leaf">Olfunara</p>
      <h1 className="font-serif text-4xl">Nie możemy teraz wczytać katalogu</h1>
      <p className="mt-6 max-w-xl leading-7 text-muted">
        Spróbuj ponownie za chwilę. Jeśli problem się powtarza, wróć do nas później.
      </p>
      <button
        onClick={reset}
        className="mt-8 cursor-pointer rounded-full bg-ink px-7 py-3 text-white"
      >
        Spróbuj ponownie
      </button>
    </main>
  );
}
